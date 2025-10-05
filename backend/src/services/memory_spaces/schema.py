from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field, EmailStr


# Request Schemas
class MemorySpaceCreate(BaseModel):
    """Schema for creating a new memory space."""
    grandparent_name: str = Field(..., min_length=1, max_length=200)
    relation: str = Field(..., min_length=1, max_length=100)
    creator_email: EmailStr = Field(..., description="Creator's email")
    photo_url: Optional[str] = None


# Response Schemas
class MemorySpaceCreateResponse(BaseModel):
    """Response after creating a memory space."""
    memory_space_id: UUID
    user_id: UUID


class MemorySpaceDetail(BaseModel):
    """Detailed memory space information."""
    id: UUID
    grandparent_name: str
    grandparent_photo_url: Optional[str]
    relation: str
    created_at: str
    
    class Config:
        from_attributes = True
