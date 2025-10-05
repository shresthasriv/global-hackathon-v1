from typing import Any, AsyncGenerator
from uuid import UUID

from agno.agent import Agent
from agno.db.postgres import PostgresDb
from agno.models.google import Gemini

from config.settings import settings



class ConversationAgentFactory:
    """Factory for creating conversation agents with different LLM providers."""

    def __init__(self):
        # Configure storage for conversation persistence
        db_url = settings.database_url.replace("postgresql+asyncpg://", "postgresql+psycopg://")
        self.storage = PostgresDb(
            session_table="__agno_conversation_sessions",
            db_url=db_url,
            db_schema="public"
        )

    def _build_instructions(self, grandparent_name: str) -> str:
        """Build conversation instructions for the agent."""
        return f"""You are a caring, patient grandchild having a conversation with {grandparent_name}.

Your goal: Capture their life story about {grandparent_name}'s life experiences, start from his childhood and loop through each of this topics:
    CHILDHOOD = "childhood"
    LOVE_STORY = "love_story"
    CAREER = "career"
    LIFE_LESSONS = "life_lessons"
    SURPRISE = "surprise"
through natural conversation.

Guidelines:
- Ask ONE question at a time
- Be warm and encouraging
- Ask follow-up questions based on their responses
- Reference previous things they mentioned
- Ask about feelings, sensory details, people involved
- Never rush them
- After 8-10 questions, naturally conclude

Question flow:
1. Opening (broad): "Tell me about..."
2. Deepening (specific): "What's your favorite memory of..."
3. Emotional: "How did that make you feel?"
4. Sensory: "What do you remember seeing/hearing/smelling?"
5. People: "Who was there with you?"
6. Impact: "How did that shape who you are?"
7. Wisdom: "What did you learn?"
8. Closing: "If you could tell your younger self one thing..."

Keep responses concise and conversational."""

    async def chat(
        self,
        chat_session_id: str | UUID,
        grandparent_name: str,
        message: str,
        memory_size: int = 100,
    ) -> AsyncGenerator[Any, None]:
        """Stream conversation responses using Agno agent.

        Args:
            chat_session_id: Unique ID for the chat session
            topic: The topic of conversation
            grandparent_name: Name of the grandparent
            message: User's input message
            llm: The LLM model identifier
            provider: The LLM provider (openai, anthropic, deepseek, google)
            assets: Optional files or images
            memory_size: Number of previous messages to remember
            temperature: LLM temperature setting
            max_tokens: Maximum tokens in response
            top_p: Top-p sampling parameter

        Yields:
            Streaming response tokens
        """

        # Create agent with storage for memory retention
        agent = Agent(
            model=Gemini(id="gemini-2.0-flash-exp"),
            db=self.storage,
            markdown=True,
            stream=True,
            add_history_to_context=True,
            read_chat_history=True,
            session_id=str(chat_session_id),
            num_history_runs=memory_size,
            instructions=self._build_instructions(grandparent_name),
        )

        # Stream response from agent
        async for chunk in agent.arun(message, stream=True):
            yield chunk

