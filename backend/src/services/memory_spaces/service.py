from uuid import UUID, uuid4

from fastapi import Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.postgres import get_db
from models import MemorySpace, FamilyMember
from services.__base.acquire import Acquire
from services.memory_spaces.schema import (
    MemorySpaceCreate,
    MemorySpaceCreateResponse,
    MemorySpaceDetail,
)


class MemorySpacesService:
    """Service for managing memory spaces (grandparent profiles)."""

    http_exposed = [
        "post=create",
        "get=get_by_id",
    ]

    def __init__(self, acquire: Acquire):
        """Initialize service."""
        self.acquire = acquire

    async def post_create(
        self,
        space_data: MemorySpaceCreate,
        session: AsyncSession = Depends(get_db),
    ) -> MemorySpaceCreateResponse:
        """Create a new memory space (grandparent profile).
        
        Args:
            space_data: Memory space creation data
            session: Database session
            
        Returns:
            MemorySpaceCreateResponse with space_id and user_id
        """
        # Check if user exists by email, create if not
        query = select(FamilyMember).where(FamilyMember.email == space_data.creator_email)
        result = await session.execute(query)
        existing_user = result.scalar_one_or_none()

        # Create memory space
        memory_space = MemorySpace(
            grandparent_name=space_data.grandparent_name,
            grandparent_photo_url=space_data.photo_url,
            relation=space_data.relation,
            access_token=str(uuid4()),  # Generate unique token (not used for auth)
        )
        session.add(memory_space)
        await session.flush()  # Get the ID

        if existing_user:
            # Link existing user to this memory space
            user_id = existing_user.id
        else:
            # Create new family member (creator)
            family_member = FamilyMember(
                memory_space_id=memory_space.id,
                name=space_data.creator_email.split('@')[0],  # Use email username as name
                email=space_data.creator_email,
                role="creator",
            )
            session.add(family_member)
            await session.flush()
            user_id = family_member.id
        
        await session.commit()
        await session.refresh(memory_space)

        return MemorySpaceCreateResponse(
            memory_space_id=memory_space.id,
            user_id=user_id,
        )

    async def get_get_by_id(
        self,
        space_id: UUID,
        session: AsyncSession = Depends(get_db),
    ) -> MemorySpaceDetail:
        """Get memory space details by ID.
        
        Args:
            space_id: Memory space ID
            session: Database session
            
        Returns:
            MemorySpaceDetail with space information
        """
        query = select(MemorySpace).where(MemorySpace.id == space_id)
        result = await session.execute(query)
        memory_space = result.scalar_one_or_none()

        if not memory_space:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Memory space not found",
            )

        return MemorySpaceDetail(
            id=memory_space.id,
            grandparent_name=memory_space.grandparent_name,
            grandparent_photo_url=memory_space.grandparent_photo_url,
            relation=memory_space.relation,
            created_at=memory_space.created_at.isoformat(),
        )
