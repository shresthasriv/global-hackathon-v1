"""04_conversation_messages

Revision ID: 04
Revises: 03
Create Date: 2025-10-04

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = '04'
down_revision: Union[str, None] = '03'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'conversation_messages',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('session_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('role', sa.String(), nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('audio_url', sa.String(), nullable=True),
        sa.Column('sequence_number', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['session_id'], ['conversation_sessions.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_conversation_messages_session_id'), 'conversation_messages', ['session_id'], unique=False)
    op.create_index(op.f('ix_conversation_messages_sequence_number'), 'conversation_messages', ['session_id', 'sequence_number'], unique=False)
    op.create_index(op.f('ix_conversation_messages_role'), 'conversation_messages', ['role'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_conversation_messages_role'), table_name='conversation_messages')
    op.drop_index(op.f('ix_conversation_messages_sequence_number'), table_name='conversation_messages')
    op.drop_index(op.f('ix_conversation_messages_session_id'), table_name='conversation_messages')
    op.drop_table('conversation_messages')
