from datetime import datetime, timezone
from uuid import UUID
import json

from fastapi import Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from database.postgres import get_db
from libs.conversation_agent.agent import ConversationAgentFactory
from models import (
    ConversationSession,
    ConversationMessage,
    MemorySpace,
    TopicEnum,
    SessionStatus,
)
from models.conversation_message import MessageRole
from services.__base.acquire import Acquire
from services.conversations.schema import (
    ConversationStartRequest,
    ConversationRespondResponse,
    ConversationHistoryResponse,
    MessageDetail,
)


class ConversationsService:
    """Service for managing conversations with Agno agents."""

    http_exposed = [
        "post=chat",
        "get=get_history",
    ]

    def __init__(self, acquire: Acquire):
        """Initialize service."""
        self.acquire = acquire
        self.agent_factory = ConversationAgentFactory()

    async def post_chat(
        self,
        request: ConversationStartRequest,
        session: AsyncSession = Depends(get_db),
    ) -> StreamingResponse:
        """Chat with the AI agent. Creates session on first call, continues on subsequent calls.
        
        Args:
            request: Chat request with memory_space_id, topic, and optional session_id
            session: Database session
            
        Returns:
            Streaming response with AI tokens
        """
        # Check if session exists
        conversation_session = None
        if hasattr(request, 'session_id') and request.session_id:
            query = select(ConversationSession).where(ConversationSession.id == request.session_id)
            result = await session.execute(query)
            conversation_session = result.scalar_one_or_none()

        # Create new session if doesn't exist
        if not conversation_session:
            # Verify memory space exists
            query = select(MemorySpace).where(MemorySpace.id == request.memory_space_id)
            result = await session.execute(query)
            memory_space = result.scalar_one_or_none()

            if not memory_space:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Memory space not found",
                )

            # Create conversation session with default topic
            conversation_session = ConversationSession(
                memory_space_id=request.memory_space_id,
                topic=TopicEnum.CHILDHOOD,  # Default topic
                status=SessionStatus.IN_PROGRESS,
                input_mode="text",  # Default to text
                started_at=datetime.now(timezone.utc),
                question_count=0,
            )
            session.add(conversation_session)
            await session.flush()
        else:
            # Get memory space
            query = select(MemorySpace).where(MemorySpace.id == conversation_session.memory_space_id)
            result = await session.execute(query)
            memory_space = result.scalar_one_or_none()

        # Use provided grandparent name or get from memory space
        grandparent_name = request.grandparent_name if request.grandparent_name else memory_space.grandparent_name
        
        # Increment question count
        conversation_session.question_count += 1
        
        # Check if user explicitly wants to end conversation
        is_complete = False
        should_ask_to_continue = False
        
        if request.end_conversation:
            # User explicitly ended the conversation
            conversation_session.status = SessionStatus.COMPLETED
            conversation_session.completed_at = datetime.now(timezone.utc)
            is_complete = True
        elif conversation_session.question_count > 0 and conversation_session.question_count % 10 == 0:
            # Every 10 questions, flag to ask if they want to continue
            should_ask_to_continue = True

        await session.commit()
        
        # Stream AI response
        session_id = conversation_session.id
        question_count = conversation_session.question_count
        
        async def generate():
            try:
                # Send initial metadata
                metadata = {
                    "type": "metadata",
                    "session_id": str(session_id),
                    "question_count": question_count,
                    "is_complete": is_complete,
                    "should_ask_to_continue": should_ask_to_continue,
                }
                yield f"data: {json.dumps(metadata)}\n\n"
                
                # Prepare user message
                user_msg = request.user_message if request.user_message else "Start the conversation with a warm greeting and your first question."
                
                # Get current message count for sequence numbers
                count_query = select(func.count(ConversationMessage.id)).where(
                    ConversationMessage.session_id == session_id
                )
                count_result = await session.execute(count_query)
                current_message_count = count_result.scalar() or 0
                
                # Save user message to database
                user_message = ConversationMessage(
                    session_id=session_id,
                    role=MessageRole.USER.value,  # Use .value to get string
                    content=user_msg,
                    sequence_number=current_message_count + 1,
                )
                session.add(user_message)
                await session.commit()
                
                # If ending conversation, add a closing message
                if request.end_conversation:
                    user_msg = f"{user_msg}\n\nPlease provide a warm closing message thanking {grandparent_name} for sharing their memories."
                
                # Collect AI response while streaming
                ai_response_parts = []
                
                async for token in self.agent_factory.chat(
                    chat_session_id=session_id,
                    grandparent_name=grandparent_name,
                    message=user_msg,
                ):
                    # Extract content from token event
                    if hasattr(token, 'content') and token.content:
                        ai_response_parts.append(token.content)
                        token_data = {
                            "type": "token",
                            "content": token.content,
                        }
                        yield f"data: {json.dumps(token_data)}\n\n"
                
                # Save AI response to database
                ai_response = "".join(ai_response_parts)
                assistant_message = ConversationMessage(
                    session_id=session_id,
                    role=MessageRole.ASSISTANT.value,  # Use .value to get string
                    content=ai_response,
                    sequence_number=current_message_count + 2,
                )
                session.add(assistant_message)
                
                # If should ask to continue, add a continuation prompt
                if should_ask_to_continue and not is_complete:
                    continuation_text = "\n\nWe've covered quite a bit! Would you like to continue sharing more memories, or shall we catch up another time?"
                    # Append to AI response in database
                    assistant_message.content += continuation_text
                    
                    continue_prompt = {
                        "type": "token",
                        "content": continuation_text,
                    }
                    yield f"data: {json.dumps(continue_prompt)}\n\n"
                
                await session.commit()
                
                # Send completion marker
                completion = {
                    "type": "done",
                    "session_id": str(session_id),
                    "question_count": question_count,
                    "is_complete": is_complete,
                    "should_ask_to_continue": should_ask_to_continue,
                }
                yield f"data: {json.dumps(completion)}\n\n"
                
            except Exception as e:
                # Send error event
                error_data = {
                    "type": "error",
                    "message": str(e),
                }
                yield f"data: {json.dumps(error_data)}\n\n"
        
        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        )

    async def get_get_history(
        self,
        session_id: UUID,
        session: AsyncSession = Depends(get_db),
    ) -> ConversationHistoryResponse:
        """Get conversation history.
        
        Args:
            session_id: Conversation session ID
            session: Database session
            
        Returns:
            ConversationHistoryResponse with all messages
        """
        # Get conversation session
        query = select(ConversationSession).where(ConversationSession.id == session_id)
        result = await session.execute(query)
        conversation_session = result.scalar_one_or_none()

        if not conversation_session:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Conversation session not found",
            )

        # Get all messages
        messages_query = (
            select(ConversationMessage)
            .where(ConversationMessage.session_id == session_id)
            .order_by(ConversationMessage.sequence_number)
        )
        messages_result = await session.execute(messages_query)
        messages = messages_result.scalars().all()

        return ConversationHistoryResponse(
            session_id=conversation_session.id,
            topic=conversation_session.topic.value,
            status=conversation_session.status.value,
            started_at=conversation_session.started_at.isoformat(),
            completed_at=conversation_session.completed_at.isoformat() if conversation_session.completed_at else None,
            messages=[
                MessageDetail(
                    role=msg.role.value,
                    content=msg.content,
                    sequence_number=msg.sequence_number,
                    created_at=msg.created_at.isoformat(),
                )
                for msg in messages
            ],
        )
