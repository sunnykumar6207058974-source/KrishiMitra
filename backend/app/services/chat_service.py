"""
KrishiMitra Chat & Conversation Service
Handles database persistence for conversations and messages.
"""
import uuid
import json
from datetime import datetime
from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session
from app.models.entities import Conversation, ChatMessage

class ChatService:
    @staticmethod
    def get_or_create_conversation(
        db: Session,
        conversation_id: Optional[str] = None,
        user_id: Optional[int] = None,
        language: str = "en",
        title: Optional[str] = None
    ) -> Conversation:
        """Find existing conversation or create a new persistent conversation."""
        if conversation_id:
            conv = db.query(Conversation).filter(Conversation.id == conversation_id).first()
            if conv:
                if user_id and not conv.user_id:
                    conv.user_id = user_id
                    db.commit()
                return conv

        # Create new conversation with UUID
        new_id = uuid.uuid4().hex[:16]
        new_conv = Conversation(
            id=new_id,
            user_id=user_id,
            title=title or "Farming Consultation",
            language=language,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        db.add(new_conv)
        db.commit()
        db.refresh(new_conv)
        return new_conv

    @staticmethod
    def add_message(
        db: Session,
        conversation_id: str,
        role: str,
        content: str,
        sources: Optional[List[Dict[str, Any]]] = None
    ) -> ChatMessage:
        """Persist a user or assistant chat message."""
        sources_blob = json.dumps(sources) if sources else None
        msg = ChatMessage(
            conversation_id=conversation_id,
            role=role,
            content=content,
            sources_json=sources_blob,
            created_at=datetime.utcnow()
        )
        db.add(msg)
        
        # Touch conversation updated_at
        conv = db.query(Conversation).filter(Conversation.id == conversation_id).first()
        if conv:
            conv.updated_at = datetime.utcnow()
            # Set title from first user message if default
            if role == "user" and (conv.title == "Farming Consultation" or not conv.title):
                conv.title = content[:40] + "..." if len(content) > 40 else content

        db.commit()
        db.refresh(msg)
        return msg

    @staticmethod
    def get_history(db: Session, conversation_id: str) -> Optional[Conversation]:
        """Fetch full conversation history with all messages."""
        return db.query(Conversation).filter(Conversation.id == conversation_id).first()

chat_service = ChatService()
