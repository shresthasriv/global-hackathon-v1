from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.models import CRUD


class MemorySpace(CRUD):
    __tablename__ = "memory_spaces"

    grandparent_name: Mapped[str] = mapped_column(String, nullable=False)
    grandparent_photo_url: Mapped[str] = mapped_column(String, nullable=True)
    relation: Mapped[str] = mapped_column(String, nullable=False)
    access_token: Mapped[str] = mapped_column(String, unique=True, nullable=False)

    family_members = relationship("FamilyMember", back_populates="memory_space")
    sessions = relationship("ConversationSession", back_populates="memory_space")
    stories = relationship("Story", back_populates="memory_space")
