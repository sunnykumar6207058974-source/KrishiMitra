"""
KrishiMitra RAG (Retrieval-Augmented Generation) Pipeline
Executes the full pipeline:
Farmer Question -> Input Validation -> Conversation Context -> Agricultural Knowledge Retrieval -> Relevant Document Selection -> AI Response Generation -> Source Attribution -> Response.
"""
from typing import Dict, Any, List, Optional
from app.ai.retriever import retriever
from app.ai.llm_provider import llm_service
from app.ai.prompts import SAFETY_DISCLAIMERS

class RAGPipeline:
    def __init__(self):
        self.retriever = retriever
        self.llm = llm_service

    def run(
        self,
        query: str,
        conversation_context: Optional[List[Dict[str, str]]] = None,
        language: str = "en",
        location: Optional[str] = None,
        crop: Optional[str] = None
    ) -> Dict[str, Any]:
        """Execute the end-to-end grounded RAG workflow."""
        # 1. Input Validation
        cleaned_query = query.strip()
        if not cleaned_query:
            raise ValueError("Query cannot be empty")

        # 2. Agricultural Knowledge Retrieval
        retrieved_docs = self.retriever.retrieve(
            query=cleaned_query,
            top_k=3,
            location=location,
            crop=crop
        )

        # 3. AI Response Generation (LLM or Verified Grounded Synthesis)
        response_data = self.llm.generate_response(
            query=cleaned_query,
            retrieved_sources=retrieved_docs,
            language=language,
            conversation_context=conversation_context
        )

        # 4. Source Attribution
        formatted_sources = [
            {
                "title": doc["title"],
                "organization": doc["organization"],
                "document_type": doc["document_type"],
                "source_url": doc.get("source_url"),
                "relevance_snippet": doc.get("relevance_snippet")
            }
            for doc in retrieved_docs
        ]

        # 5. Suggested Follow-up Questions based on topic
        followups = self._generate_followups(cleaned_query, language)

        # 6. Safety Advisory
        disclaimer = SAFETY_DISCLAIMERS.get(language, SAFETY_DISCLAIMERS["en"])

        return {
            "answer": response_data["text"],
            "sources": formatted_sources,
            "language": language,
            "status": "success",
            "disclaimer": disclaimer,
            "provider": response_data["provider"],
            "is_live_llm": response_data["is_live_llm"],
            "dev_notice": response_data.get("dev_notice"),
            "suggested_followups": followups
        }

    def _generate_followups(self, query: str, language: str) -> List[str]:
        q = query.lower()
        if "acid" in q or "ph" in q or "lime" in q:
            return [
                "How much lime is needed per Bigha for pH 5.2?",
                "Which fertilizer replaces DAP in acidic soil?",
                "How often should soil pH be tested?"
            ]
        elif "sali" in q or "paddy" in q or "rice" in q:
            return [
                "What are the best flood-tolerant paddy varieties?",
                "What is the recommended fertilizer schedule for Ranjit paddy?",
                "How to control yellow stem borer in rice?"
            ]
        elif "rain" in q or "flood" in q:
            return [
                "What crops can be sown after floodwaters recede?",
                "How to cultivate zero-tillage mustard post-flood?",
                "Can Swarna Sub-1 survive 14 days submergence?"
            ]
        elif "disease" in q or "pest" in q:
            return [
                "How to prepare neem seed kernel extract (NSKE 5%)?",
                "How to identify Brown Spot vs Rice Blast?",
                "Where is the nearest Krishi Vigyan Kendra in Assam?"
            ]
        else:
            return [
                "How should I manage soil acidity in my farm?",
                "What is the best sowing time for Sali Paddy in Assam?",
                "What crops are suitable for Assam winter season?"
            ]

rag_pipeline = RAGPipeline()
