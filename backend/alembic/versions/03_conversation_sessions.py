"""03_conversation_sessions

Revision ID: 03
Revises: 02
Create Date: 2025-10-04

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = '03'
down_revision: Union[str, None] = '02'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'conversation_sessions',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('memory_space_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('topic', sa.Enum('CHILDHOOD', 'LOVE_STORY', 'CAREER', 'LIFE_LESSONS', 'SURPRISE', name='topicenum'), nullable=False),
        sa.Column('status', sa.Enum('IN_PROGRESS', 'COMPLETED', 'ABANDONED', name='sessionstatus'), server_default='IN_PROGRESS', nullable=False),
        sa.Column('input_mode', sa.String(), nullable=False),
        sa.Column('started_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('question_count', sa.Integer(), server_default='0', nullable=False),
        sa.ForeignKeyConstraint(['memory_space_id'], ['memory_spaces.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_conversation_sessions_memory_space_id'), 'conversation_sessions', ['memory_space_id'], unique=False)
    op.create_index(op.f('ix_conversation_sessions_status'), 'conversation_sessions', ['status'], unique=False)
    op.create_index(op.f('ix_conversation_sessions_topic'), 'conversation_sessions', ['topic'], unique=False)
    op.create_index(op.f('ix_conversation_sessions_started_at'), 'conversation_sessions', ['started_at'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_conversation_sessions_started_at'), table_name='conversation_sessions')
    op.drop_index(op.f('ix_conversation_sessions_topic'), table_name='conversation_sessions')
    op.drop_index(op.f('ix_conversation_sessions_status'), table_name='conversation_sessions')
    op.drop_index(op.f('ix_conversation_sessions_memory_space_id'), table_name='conversation_sessions')
    op.drop_table('conversation_sessions')
    op.execute('DROP TYPE sessionstatus')
    op.execute('DROP TYPE topicenum')
