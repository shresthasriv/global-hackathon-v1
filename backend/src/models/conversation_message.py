import enum
from sqlalchemy import String, Text, Integer, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from database.models import CRUD


class MessageRole(str, enum.Enum):
    USER = "user"
    ASSISTANT = "assistant"


class ConversationMessage(CRUD):
    __tablename__ = "conversation_messages"

    session_id: Mapped[UUID] = mapped_column(ForeignKey("conversation_sessions.id", ondelete="CASCADE"), nullable=False)
    role: Mapped[MessageRole] = mapped_column(Enum(MessageRole), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    audio_url: Mapped[str] = mapped_column(String, nullable=True)
    sequence_number: Mapped[int] = mapped_column(Integer, nullable=False)

    session = relationship("ConversationSession", back_populates="messages")
