"""create users table

Revision ID: 2c7f47b2c303
Revises: 
Create Date: 2022-02-28 21:05:32.749648

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2c7f47b2c303'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('firstName', sa.String(
                        length=40), nullable=True),
                    sa.Column('lastName', sa.String(length=40), nullable=True),
                    sa.Column('username', sa.String(
                        length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###
