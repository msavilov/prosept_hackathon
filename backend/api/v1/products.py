from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession

from backend.core.db import get_async_session
from backend.crud.products import create_product, get_all_products
from backend.schemas.products import ProductScheme

router_products = APIRouter(
    prefix='/products',
)


@router_products.get(
    '/',
)
async def get_all_products_from_db(
        session: AsyncSession = Depends(get_async_session),
):
    """Представление для получения всех товаров производителя."""
    product_list = await get_all_products(session)
    return product_list


@router_products.post(
    '/',
)
async def create_product_in_db(
        product: ProductScheme,
        session: AsyncSession = Depends(get_async_session),
):
    """Представление для создания нового продукта производителя."""
    new_product = await create_product(product, session)
    return new_product
