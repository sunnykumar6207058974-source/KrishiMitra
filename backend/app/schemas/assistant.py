from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class KnowledgeSourceInfo(BaseModel):
    title: str
    organization: str
    document_type: str
    source_url: Optional[str] = None
    relevance_snippet: Optional[str] = None

class AssistantChatRequest(BaseModel):
    message: str = Field(..., min_length=1, description="Farmer query or question")
    conversation_id: Optional[str] = Field(None, description="Existing conversation UUID")
    language: Optional[str] = Field("en", description="Language code: en, hi, as")
    location: Optional[str] = Field(None, description="Farmer location or district, e.g. Cachar, Assam")
    crop: Optional[str] = Field(None, description="Crop name, e.g. Sali Paddy, Mustard")

class AssistantChatResponse(BaseModel):
    conversation_id: str
    answer: str
    sources: List[KnowledgeSourceInfo]
    language: str
    status: str = "success"
    disclaimer: str
    suggested_followups: List[str] = []

class AssistantHistoryItem(BaseModel):
    id: int
    role: str
    content: str
    sources: Optional[List[Dict[str, Any]]] = None
    created_at: str

class AssistantHistoryResponse(BaseModel):
    conversation_id: str
    title: str
    language: str
    messages: List[AssistantHistoryItem]

class AssistantHealthResponse(BaseModel):
    status: str
    rag_indexed_chunks: int
    llm_provider: str
    provider_configured: bool
    supported_languages: List[str]
    regional_focus: str
