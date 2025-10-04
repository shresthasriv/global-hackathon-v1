from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from src.database.models import CRUD


class FamilyMember(CRUD):
    __tablename__ = "family_members"

    memory_space_id: Mapped[UUID] = mapped_column(ForeignKey("memory_spaces.id"), nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=True)
    role: Mapped[str] = mapped_column(String, nullable=False)

    memory_space = relationship("MemorySpace", back_populates="family_members")
