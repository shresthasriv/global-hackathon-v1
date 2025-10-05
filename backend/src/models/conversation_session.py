import enum
from datetime import datetime
from sqlalchemy import String, Integer, Enum, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from database.models import CRUD


class TopicEnum(str, enum.Enum):
    CHILDHOOD = "childhood"
    LOVE_STORY = "love_story"
    CAREER = "career"
    LIFE_LESSONS = "life_lessons"
    SURPRISE = "surprise"


class SessionStatus(str, enum.Enum):
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    ABANDONED = "abandoned"


class ConversationSession(CRUD):
    __tablename__ = "conversation_sessions"

    memory_space_id: Mapped[UUID] = mapped_column(ForeignKey("memory_spaces.id"), nullable=False)
    topic: Mapped[TopicEnum] = mapped_column(Enum(TopicEnum), nullable=False)
    status: Mapped[SessionStatus] = mapped_column(Enum(SessionStatus), default=SessionStatus.IN_PROGRESS)
    input_mode: Mapped[str] = mapped_column(String, nullable=False)
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    completed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    question_count: Mapped[int] = mapped_column(Integer, default=0)

    memory_space = relationship("MemorySpace", back_populates="sessions")
    messages = relationship("ConversationMessage", back_populates="session")
    story = relationship("Story", back_populates="session", uselist=False)
