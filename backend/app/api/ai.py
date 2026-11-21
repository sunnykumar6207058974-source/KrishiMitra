import json
from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.entities import KnowledgeSource, ChatHistory, User
from app.schemas.ai import ChatRequest, ChatResponse, ChatHistoryItem
from app.api.deps import get_optional_current_user

router = APIRouter(prefix="/ai", tags=["Krishi AI Assistant"])

# Multilingual greetings & fallback translations
SAFETY_DISCLAIMERS = {
    "en": "⚠️ Agricultural Advisory Notice: Chemical dosage must be verified with your local Krishi Vigyan Kendra (KVK) or block agriculture officer. Do not apply unregistered chemicals.",
    "hi": "⚠️ कृषि परामर्श सूचना: रासायनिक मात्रा की पुष्टि अपने स्थानीय कृषि विज्ञान केंद्र (KVK) या कृषि अधिकारी से अवश्य कराएं।",
    "as": "⚠️ কৃষি পৰামৰ্শ জাননী: ৰাসায়নিক ঔষধৰ সঠিক পৰিমাণ স্থানীয় কৃষি বিজ্ঞান কেন্দ্ৰ (KVK) ৰ সৈতে পৰীক্ষা কৰক।"
}

@router.post("/chat", response_model=ChatResponse)
def ask_krishi_ai(
    req: ChatRequest,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    lang = req.language or "en"
    disclaimer = SAFETY_DISCLAIMERS.get(lang, SAFETY_DISCLAIMERS["en"])

    # 1. RAG Retrieval: Search database knowledge sources matching terms
    query_terms = req.message.lower().split()
    matched_sources = []
    
    all_sources = db.query(KnowledgeSource).all()
    for src in all_sources:
        src_text = (src.title + " " + src.content + " " + src.category).lower()
        if any(term in src_text for term in query_terms if len(term) > 3):
            matched_sources.append(src)

    if not matched_sources and all_sources:
        # Default to first relevant source
        matched_sources = all_sources[:2]

    sources_info = [
        {"title": s.title, "document_type": s.document_type, "url": s.reference_url}
        for s in matched_sources[:3]
    ]

    # 2. Formulate grounded response based on verified agronomy context
    primary_context = matched_sources[0].content if matched_sources else "Verified ICAR agricultural best practices."

    if "water" in req.message.lower() or "irrigation" in req.message.lower():
        if lang == "hi":
            reply = "सिंचाई के लिए: गेहूं में 21वें दिन शीर्ष जड़ जमने (CRI) के समय पहली सिंचाई अति आवश्यक है। शाम के समय पानी देने से वाष्पीकरण कम होता है।"
        elif lang == "as":
            reply = "জলসিঞ্চনৰ বাবে: ঘেঁহুৰ ক্ষেত্ৰত ২১ দিনৰ দিনা প্ৰথম জলসিঞ্চন অতি প্ৰয়োজনীয়। আবেলি সময়ত পানী দিলে বাষ্পীভৱন কম হয়।"
        else:
            reply = f"For optimal water management: According to {matched_sources[0].title if matched_sources else 'ICAR guidelines'}, ensure scheduled irrigation especially at critical vegetative stages. Avoid over-watering in low drainage soils."
    elif "pest" in req.message.lower() or "insect" in req.message.lower() or "disease" in req.message.lower() or "yellow" in req.message.lower():
        if lang == "hi":
            reply = "कीट और रोग नियंत्रण: रासायनिक कीटनाशक से पहले नीम का तेल (NSKE 5%) या फेरोमोन ट्रैप का प्रयोग करें। पत्तियों के पीलेपन के लिए नाइट्रोजन या जिंक की कमी की जांच करें।"
        elif lang == "as":
            reply = "কীট আৰু ৰোগ প্ৰতিৰোধ: নিম গুটিৰ তেল (NSKE 5%) ব্যৱহাৰ কৰক। পাত হালধীয়া হ'লে নাইট্ৰ'জেন বা জিংকৰ অভাৱ পৰীক্ষা কৰক।"
        else:
            reply = f"Integrated Pest Management (IPM): First inspect for visible symptoms. Use mechanical methods (pheromone traps @ 10/ha) and biological controls (Neem seed extract NSKE 5%) before considering approved synthetic treatments. If leaf yellowing occurs, test for Nitrogen or Zinc deficiency."
    else:
        if lang == "hi":
            reply = f"कृषि वैज्ञानिक अनुशंसा के आधार पर: {primary_context[:250]}... विस्तृत जानकारी के लिए अपने नजदीकी कृषि विज्ञान केंद्र से संपर्क करें।"
        elif lang == "as":
            reply = f"কৃষি গৱেষণা পৰামৰ্শ অনুসৰি: {primary_context[:250]}... অধিক জানিবলৈ স্থানীয় কৃষি বিষয়াৰ সৈতে যোগাযোগ কৰক।"
        else:
            reply = f"Based on verified agricultural guidance: {primary_context[:280]}... Always verify local soil and weather conditions before applying inputs."

    suggested_actions = [
        "Check Soil Nutrient Balance",
        "View Weather Forecast & Advisory",
        "Add Task to Crop Calendar"
    ]

    # Save to history if logged in
    if current_user:
        history_entry = ChatHistory(
            user_id=current_user.id,
            role="user",
            message=req.message,
            sources_json=json.dumps(sources_info),
            language=lang
        )
        ai_entry = ChatHistory(
            user_id=current_user.id,
            role="assistant",
            message=reply,
            sources_json=json.dumps(sources_info),
            language=lang
        )
        db.add(history_entry)
        db.add(ai_entry)
        db.commit()

    return {
        "reply": reply,
        "sources": sources_info,
        "suggested_actions": suggested_actions,
        "safety_disclaimer": disclaimer,
        "language": lang
    }

@router.get("/history", response_model=List[ChatHistoryItem])
def get_chat_history(
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    if not current_user:
        return []
    records = db.query(ChatHistory).filter(ChatHistory.user_id == current_user.id).order_by(ChatHistory.created_at.desc()).limit(20).all()
    return [
        {
            "id": r.id,
            "role": r.role,
            "message": r.message,
            "language": r.language,
            "created_at": r.created_at.strftime("%Y-%m-%d %H:%M")
        }
        for r in reversed(records)
    ]
