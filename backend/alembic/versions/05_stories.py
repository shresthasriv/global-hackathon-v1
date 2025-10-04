"""05_stories

Revision ID: 05
Revises: 04
Create Date: 2025-10-04

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = '05'
down_revision: Union[str, None] = '04'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'stories',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('memory_space_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('session_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('topic', sa.String(), nullable=False),
        sa.Column('style', sa.String(), server_default='narrative', nullable=False),
        sa.Column('status', sa.Enum('GENERATED', 'EDITED', 'PUBLISHED', name='storystatus'), server_default='GENERATED', nullable=False),
        sa.Column('generated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(['memory_space_id'], ['memory_spaces.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['session_id'], ['conversation_sessions.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_stories_memory_space_id'), 'stories', ['memory_space_id'], unique=False)
    op.create_index(op.f('ix_stories_session_id'), 'stories', ['session_id'], unique=False)
    op.create_index(op.f('ix_stories_topic'), 'stories', ['topic'], unique=False)
    op.create_index(op.f('ix_stories_status'), 'stories', ['status'], unique=False)
    op.create_index(op.f('ix_stories_generated_at'), 'stories', ['generated_at'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_stories_generated_at'), table_name='stories')
    op.drop_index(op.f('ix_stories_status'), table_name='stories')
    op.drop_index(op.f('ix_stories_topic'), table_name='stories')
    op.drop_index(op.f('ix_stories_session_id'), table_name='stories')
    op.drop_index(op.f('ix_stories_memory_space_id'), table_name='stories')
    op.drop_table('stories')
    op.execute('DROP TYPE storystatus')
