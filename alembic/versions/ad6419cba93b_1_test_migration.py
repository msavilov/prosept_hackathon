"""1 Test migration

Revision ID: ad6419cba93b
Revises: 
Create Date: 2023-11-26 17:56:49.069266

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ad6419cba93b'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('dealer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('article', sa.String(), nullable=True),
    sa.Column('ean_13', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('cost', sa.Float(), nullable=True),
    sa.Column('recommended_price', sa.Float(), nullable=True),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.Column('ozon_name', sa.String(), nullable=True),
    sa.Column('name_1c', sa.String(), nullable=True),
    sa.Column('wb_name', sa.String(), nullable=True),
    sa.Column('ozon_article', sa.Integer(), nullable=True),
    sa.Column('wb_article', sa.Integer(), nullable=True),
    sa.Column('ym_article', sa.String(), nullable=True),
    sa.Column('wb_article_td', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('dealerprice',
    sa.Column('product_key', sa.Integer(), nullable=False),
    sa.Column('price', sa.Float(), nullable=True),
    sa.Column('product_url', sa.String(), nullable=True),
    sa.Column('product_name', sa.String(), nullable=True),
    sa.Column('date', sa.Date(), nullable=True),
    sa.Column('dealer_id', sa.Integer(), nullable=True),
    sa.Column('is_marked', sa.Boolean(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['dealer_id'], ['dealer.id'], ),
    sa.PrimaryKeyConstraint('product_key', 'id')
    )
    op.create_table('productdealer',
    sa.Column('key', sa.Integer(), nullable=True),
    sa.Column('dealer_id', sa.Integer(), nullable=True),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.Column('create_dt', sa.Date(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['key'], ['dealerprice.product_key'], ),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('productdealer')
    op.drop_table('dealerprice')
    op.drop_table('product')
    op.drop_table('dealer')
    # ### end Alembic commands ###
