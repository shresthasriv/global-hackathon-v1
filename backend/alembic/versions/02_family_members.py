"""02_family_members

Revision ID: 02
Revises: 01
Create Date: 2025-10-04

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = '02'
down_revision: Union[str, None] = '01'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'family_members',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('memory_space_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=True),
        sa.Column('role', sa.String(), nullable=False),
        sa.ForeignKeyConstraint(['memory_space_id'], ['memory_spaces.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_family_members_memory_space_id'), 'family_members', ['memory_space_id'], unique=False)
    op.create_index(op.f('ix_family_members_email'), 'family_members', ['email'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_family_members_email'), table_name='family_members')
    op.drop_index(op.f('ix_family_members_memory_space_id'), table_name='family_members')
    op.drop_table('family_members')
