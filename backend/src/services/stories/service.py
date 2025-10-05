from datetime import datetime, timezone
from uuid import UUID

from fastapi import Depends, HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from database.postgres import get_db
from libs.story_agent.agent import StoryAgentFactory
from libs.utils import extract_excerpt
from models import (
    Story,
    ConversationSession,
    ConversationMessage,
    SessionStatus,
    StoryStatus,
)
from services.__base.acquire import Acquire
from services.stories.schema import (
    StoryGenerateRequest,
    StoryGenerateResponse,
    StoryDetail,
    StoryListItem,
    StoriesListResponse,
    UserStoryItem,
    UserStoriesResponse,
)


class StoriesService:
    """Service for generating and managing stories from conversations."""

    http_exposed = [
        "post=generate",
        "get=get_by_id",
        "get=get_by_memory_space",
        "get=get_by_email",
    ]

    def __init__(self, acquire: Acquire):
        """Initialize service."""
        self.acquire = acquire
        self.story_agent = StoryAgentFactory()

    async def post_generate(
        self,
        request: StoryGenerateRequest,
        session: AsyncSession = Depends(get_db),
    ) -> StoryGenerateResponse:
        """Generate a story from a conversation session.
        
        Args:
            request: Story generation request
            session: Database session
            
        Returns:
            StoryGenerateResponse with story_id and details
        """
        # Get conversation session
        query = select(ConversationSession).where(
            ConversationSession.id == request.session_id
        )
        result = await session.execute(query)
        conversation_session = result.scalar_one_or_none()

        if not conversation_session:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Conversation session not found",
            )

        # Check if session is completed
        if conversation_session.status != SessionStatus.COMPLETED:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot generate story from incomplete conversation",
            )

        # Check if story already exists for this session
        existing_query = select(Story).where(Story.session_id == request.session_id)
        existing_result = await session.execute(existing_query)
        existing_story = existing_result.scalar_one_or_none()

        if existing_story:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Story already generated for this conversation",
            )

        # Get all messages from the conversation
        messages_query = (
            select(ConversationMessage)
            .where(ConversationMessage.session_id == request.session_id)
            .order_by(ConversationMessage.sequence_number)
        )
        messages_result = await session.execute(messages_query)
        messages = messages_result.scalars().all()

        # Format transcript for story generation
        transcript_lines = []
        for msg in messages:
            role = "Grandchild" if msg.role.value == "assistant" else "Grandparent"
            transcript_lines.append(f"{role}: {msg.content}")
        
        transcript = "\n\n".join(transcript_lines)

        # Generate story using story agent
        story_content = self.story_agent.generate_story(transcript)

        # Extract title from content (assuming first line or heading is title)
        lines = story_content.strip().split("\n")
        title = lines[0].strip().strip("#").strip() if lines else "Untitled Story"
        
        # Remove title from content if it's in the first line
        if lines and (lines[0].startswith("#") or len(lines[0]) < 100):
            content = "\n".join(lines[1:]).strip()
        else:
            content = story_content

        # Create story record
        now = datetime.now(timezone.utc)
        story = Story(
            memory_space_id=conversation_session.memory_space_id,
            session_id=request.session_id,
            title=title,
            content=content,
            topic=conversation_session.topic.value,
            style="narrative",
            status=StoryStatus.GENERATED,
            generated_at=now,
            updated_at=now,
        )
        session.add(story)
        await session.commit()
        await session.refresh(story)

        # Create excerpt
        excerpt = extract_excerpt(content, words=50)

        return StoryGenerateResponse(
            story_id=story.id,
            title=story.title,
            excerpt=excerpt,
            status=story.status.value,
        )

    async def get_get_by_id(
        self,
        story_id: UUID,
        session: AsyncSession = Depends(get_db),
    ) -> StoryDetail:
        """Get a specific story by ID.
        
        Args:
            story_id: Story ID
            session: Database session
            
        Returns:
            StoryDetail with complete story information
        """
        query = select(Story).where(Story.id == story_id)
        result = await session.execute(query)
        story = result.scalar_one_or_none()

        if not story:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Story not found",
            )

        return StoryDetail(
            id=story.id,
            title=story.title,
            content=story.content,
            topic=story.topic,
            style=story.style,
            status=story.status.value,
            generated_at=story.generated_at.isoformat(),
            memory_space_id=story.memory_space_id,
            session_id=story.session_id,
        )

    async def get_get_by_memory_space(
        self,
        space_id: UUID,
        session: AsyncSession = Depends(get_db),
    ) -> StoriesListResponse:
        """Get all stories for a memory space.
        
        Args:
            space_id: Memory space ID
            session: Database session
            
        Returns:
            StoriesListResponse with list of stories
        """
        # Get all stories for the memory space
        query = (
            select(Story)
            .where(Story.memory_space_id == space_id)
            .order_by(Story.generated_at.desc())
        )
        result = await session.execute(query)
        stories = result.scalars().all()

        # Get total count
        count_query = select(func.count(Story.id)).where(
            Story.memory_space_id == space_id
        )
        count_result = await session.execute(count_query)
        total = count_result.scalar()

        return StoriesListResponse(
            stories=[
                StoryListItem(
                    id=story.id,
                    title=story.title,
                    excerpt=extract_excerpt(story.content, words=50),
                    topic=story.topic,
                    status=story.status.value,
                    generated_at=story.generated_at.isoformat(),
                )
                for story in stories
            ],
            total=total,
        )

    async def get_get_by_email(
        self,
        email: str,
        session: AsyncSession = Depends(get_db),
    ) -> UserStoriesResponse:
        """Get all memory blogs for a user by their email.
        
        Args:
            email: User's email address
            session: Database session
            
        Returns:
            UserStoriesResponse with list of stories including full content
        """
        from models import FamilyMember, MemorySpace
        
        # Find all memory spaces where user is a family member
        query = select(FamilyMember.memory_space_id).where(FamilyMember.email == email)
        result = await session.execute(query)
        memory_space_ids = [row[0] for row in result.all()]

        if not memory_space_ids:
            return UserStoriesResponse(stories=[])

        # Get all stories for these memory spaces with memory space details
        query = (
            select(Story, MemorySpace)
            .join(MemorySpace, Story.memory_space_id == MemorySpace.id)
            .where(Story.memory_space_id.in_(memory_space_ids))
            .order_by(Story.generated_at.desc())
        )
        result = await session.execute(query)
        rows = result.all()

        return UserStoriesResponse(
            stories=[
                UserStoryItem(
                    id=story.id,
                    title=story.title,
                    content=story.content,  # Full markdown content
                    grandparent_name=memory_space.grandparent_name,
                    topic=story.topic,
                    generated_at=story.generated_at.isoformat(),
                )
                for story, memory_space in rows
            ],
        )
