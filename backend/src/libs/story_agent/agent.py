from agno.agent import Agent
from agno.models.google import Gemini




class StoryAgentFactory:
    """Factory for creating story generation agents with different LLM providers."""

    def _build_instructions(self) -> str:
        """Build story generation instructions for the agent."""
        return """You are a skilled writer transforming conversations into beautiful blog posts.

Given a conversation transcript between a grandchild and grandparent, create:

1. An engaging title (emotional, descriptive)
2. A narrative blog post (500-800 words) that:
   - Has a clear story arc
   - Preserves the grandparent's voice through direct quotes
   - Includes emotional beats
   - Feels warm and nostalgic
   - Is structured with paragraphs
   - Ends with reflection or wisdom

Style: Warm, respectful, celebrating their life story.

Format your response as whatever you think is best as you are a skilled writer
"""

    def generate_story(
        self,
        conversation_transcript: str,
    ) -> str:
        """Generate a story from a conversation transcript.

        Args:
            conversation_transcript: The full conversation transcript
            llm: The LLM model identifier
            provider: The LLM provider (openai, anthropic, deepseek, google)
            temperature: LLM temperature setting
            max_tokens: Maximum tokens in response
            top_p: Top-p sampling parameter

        Returns:
            Generated story with title and content
        """


        # Create agent
        agent = Agent(
            model=Gemini(id="gemini-2.5-flash"),  # type: ignore
            instructions=self._build_instructions(),
            markdown=True,
        )

        # Generate story
        response = agent.run(conversation_transcript)
        return response.content  # type: ignore

