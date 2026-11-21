"""
KrishiMitra AI Agricultural Assistant Endpoints
Routes:
  POST /api/assistant/chat
  GET  /api/assistant/history/{conversation_id}
  GET  /api/assistant/health
"""
import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.entities import User
from app.api.deps import get_optional_current_user
from app.schemas.assistant import (
    AssistantChatRequest,
    AssistantChatResponse,
    AssistantHistoryResponse,
    AssistantHistoryItem,
    AssistantHealthResponse,
    KnowledgeSourceInfo
)
from app.ai.rag_pipeline import rag_pipeline
from app.ai.llm_provider import llm_service
from app.ai.retriever import retriever
from app.services.chat_service import chat_service

router = APIRouter(prefix="/assistant", tags=["AI Farming Assistant"])

@router.post("/chat", response_model=AssistantChatResponse)
def chat_with_assistant(
    req: AssistantChatRequest,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    """
    Submit a farmer question to the Krishi AI Assistant.
    Retrieves verified ICAR and AAU agricultural knowledge, generates a grounded response,
    persists the conversation, and returns full source citations.
    """
    user_id = current_user.id if current_user else None
    language = req.language or "en"

    # 1. Get or create conversation session
    conversation = chat_service.get_or_create_conversation(
        db=db,
        conversation_id=req.conversation_id,
        user_id=user_id,
        language=language
    )

    # 2. Extract conversation context for multi-turn coherence
    context_msgs = []
    if conversation.messages:
        for m in conversation.messages[-4:]:
            context_msgs.append({"role": m.role, "content": m.content})

    # 3. Save incoming user message to database
    chat_service.add_message(
        db=db,
        conversation_id=conversation.id,
        role="user",
        content=req.message
    )

    # 4. Execute RAG Pipeline
    try:
        rag_result = rag_pipeline.run(
            query=req.message,
            conversation_context=context_msgs,
            language=language,
            location=req.location,
            crop=req.crop
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Agricultural RAG pipeline execution failed: {str(e)}"
        )

    # 5. Persist assistant response to database
    chat_service.add_message(
        db=db,
        conversation_id=conversation.id,
        role="assistant",
        content=rag_result["answer"],
        sources=rag_result["sources"]
    )

    # 6. Format source models
    sources_out = [
        KnowledgeSourceInfo(
            title=s["title"],
            organization=s["organization"],
            document_type=s["document_type"],
            source_url=s.get("source_url"),
            relevance_snippet=s.get("relevance_snippet")
        )
        for s in rag_result["sources"]
    ]

    return AssistantChatResponse(
        conversation_id=conversation.id,
        answer=rag_result["answer"],
        sources=sources_out,
        language=language,
        status="success",
        disclaimer=rag_result["disclaimer"],
        suggested_followups=rag_result.get("suggested_followups", [])
    )

@router.get("/history/{conversation_id}", response_model=AssistantHistoryResponse)
def get_chat_history(
    conversation_id: str,
    db: Session = Depends(get_db)
):
    """Retrieve full history of a farming consultation session."""
    conv = chat_service.get_history(db=db, conversation_id=conversation_id)
    if not conv:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Conversation session '{conversation_id}' not found."
        )

    items = []
    for m in conv.messages:
        sources_list = None
        if m.sources_json:
            try:
                sources_list = json.loads(m.sources_json)
            except Exception:
                sources_list = None

        items.append(
            AssistantHistoryItem(
                id=m.id,
                role=m.role,
                content=m.content,
                sources=sources_list,
                created_at=m.created_at.isoformat()
            )
        )

    return AssistantHistoryResponse(
        conversation_id=conv.id,
        title=conv.title or "Farming Consultation",
        language=conv.language or "en",
        messages=items
    )

@router.get("/health", response_model=AssistantHealthResponse)
def assistant_health_check():
    """Returns RAG knowledge base indexing status and configured LLM provider."""
    indexed_count = len(retriever.documents)
    return AssistantHealthResponse(
        status="operational",
        rag_indexed_chunks=indexed_count,
        llm_provider=llm_service.get_provider_name(),
        provider_configured=llm_service.is_configured(),
        supported_languages=["en", "hi", "as"],
        regional_focus="Assam, India & ICAR National Standards"
    )
