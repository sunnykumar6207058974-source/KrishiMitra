"""
KrishiMitra AI Assistant High-Level Interface
"""
from typing import Dict, Any, List, Optional
from app.ai.rag_pipeline import rag_pipeline

def generate_assistant_response(
    message: str,
    conversation_context: Optional[List[Dict[str, str]]] = None,
    language: str = "en",
    location: Optional[str] = None,
    crop: Optional[str] = None
) -> Dict[str, Any]:
    """Generates an accurate, source-grounded response for the farmer."""
    return rag_pipeline.run(
        query=message,
        conversation_context=conversation_context,
        language=language,
        location=location,
        crop=crop
    )
