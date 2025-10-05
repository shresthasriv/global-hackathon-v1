from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, Field


# Request Schemas
class StoryGenerateRequest(BaseModel):
    """Schema for generating a story from a conversation."""
    session_id: UUID


# Response Schemas
class StoryGenerateResponse(BaseModel):
    """Response after generating a story."""
    story_id: UUID
    title: str
    excerpt: str
    status: str


class StoryDetail(BaseModel):
    """Detailed story information."""
    id: UUID
    title: str
    content: str
    topic: str
    style: str
    status: str
    generated_at: str
    memory_space_id: UUID
    session_id: UUID
    
    class Config:
        from_attributes = True


class StoryListItem(BaseModel):
    """Story list item."""
    id: UUID
    title: str
    excerpt: str
    topic: str
    status: str
    generated_at: str
    
    class Config:
        from_attributes = True


class UserStoryItem(BaseModel):
    """Story item with grandparent info for user queries."""
    id: UUID
    title: str
    content: str  # Full content for user's blogs
    grandparent_name: str
    topic: str
    generated_at: str
    
    class Config:
        from_attributes = True


class StoriesListResponse(BaseModel):
    """Response with list of stories."""
    stories: List[StoryListItem]
    total: int


class UserStoriesResponse(BaseModel):
    """Response with user's stories including full content."""
    stories: List[UserStoryItem]
