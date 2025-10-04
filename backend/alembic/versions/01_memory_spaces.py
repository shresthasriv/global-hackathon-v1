"""01_memory_spaces

Revision ID: 01
Revises: 
Create Date: 2025-10-04

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = '01'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'memory_spaces',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('grandparent_name', sa.String(), nullable=False),
        sa.Column('grandparent_photo_url', sa.String(), nullable=True),
        sa.Column('relation', sa.String(), nullable=False),
        sa.Column('access_token', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('access_token')
    )
    op.create_index(op.f('ix_memory_spaces_access_token'), 'memory_spaces', ['access_token'], unique=True)
    op.create_index(op.f('ix_memory_spaces_created_at'), 'memory_spaces', ['created_at'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_memory_spaces_created_at'), table_name='memory_spaces')
    op.drop_index(op.f('ix_memory_spaces_access_token'), table_name='memory_spaces')
    op.drop_table('memory_spaces')
