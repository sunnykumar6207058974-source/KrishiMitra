from typing import List, Optional
from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "en"  # en, hi, as
    crop_context: Optional[str] = None

class ChatResponse(BaseModel):
    reply: str
    sources: List[dict]
    suggested_actions: List[str]
    safety_disclaimer: str
    language: str

class ChatHistoryItem(BaseModel):
    id: int
    role: str
    message: str
    language: str
    created_at: str

    class Config:
        from_attributes = True
