from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel


# Request Schemas
class ConversationStartRequest(BaseModel):
    """Schema for chatting with AI agent."""
    memory_space_id: UUID
    session_id: Optional[UUID] = None  # Optional - creates new if not provided
    user_message: Optional[str] = None  # Optional - generates greeting if not provided
    grandparent_name: Optional[str] = None  # Optional - grandparent name
    end_conversation: Optional[bool] = False  # Set to true to mark conversation as complete


# Response Schemas


class ConversationRespondResponse(BaseModel):
    """Response from AI agent."""
    session_id: UUID
    ai_response: str
    question_count: int
    is_complete: bool = False


class MessageDetail(BaseModel):
    """Individual message detail."""
    role: str
    content: str
    sequence_number: int
    created_at: str
    
    class Config:
        from_attributes = True


class ConversationHistoryResponse(BaseModel):
    """Response with conversation history."""
    session_id: UUID
    topic: str
    status: str
    started_at: str
    completed_at: Optional[str]
    messages: List[MessageDetail]
