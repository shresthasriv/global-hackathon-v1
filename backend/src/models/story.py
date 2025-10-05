import enum
from datetime import datetime
from sqlalchemy import String, Text, Enum, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from database.models import CRUD


class StoryStatus(str, enum.Enum):
    GENERATED = "generated"
    EDITED = "edited"
    PUBLISHED = "published"


class Story(CRUD):
    __tablename__ = "stories"

    memory_space_id: Mapped[UUID] = mapped_column(ForeignKey("memory_spaces.id"), nullable=False)
    session_id: Mapped[UUID] = mapped_column(ForeignKey("conversation_sessions.id"), nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    topic: Mapped[str] = mapped_column(String, nullable=False)
    style: Mapped[str] = mapped_column(String, default="narrative")
    status: Mapped[StoryStatus] = mapped_column(Enum(StoryStatus), default=StoryStatus.GENERATED)
    generated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    memory_space = relationship("MemorySpace", back_populates="stories")
    session = relationship("ConversationSession", back_populates="story")
