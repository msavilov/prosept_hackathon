from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession

from backend.core.db import get_async_session
from backend.crud.products import create_product, get_all_products, get_product_by_id
from backend.schemas.products import ProductScheme

router_products = APIRouter(
    prefix='/products',
    tags=['/products - получение/создание товаров производителя'],
)


@router_products.get(
    '/',
    summary='Получить список всех товаров производителя из БД'
)
async def get_all_products_from_db(
        session: AsyncSession = Depends(get_async_session),
) -> list[ProductScheme]:
    """Представление для получения всех товаров производителя."""
    product_list = await get_all_products(session)
    return product_list


@router_products.get(
    '/{product_id}',
    summary='Получить один товар производителя по id.'
)
async def get_product_by_id_from_db(
        product_id: int,
        session: AsyncSession = Depends(get_async_session)
) -> ProductScheme:
    """Представление для получения одного товара производителя по id."""
    product = await get_product_by_id(product_id, session)
    return product


@router_products.post(
    '/',
    summary='Создать товар производителя в БД',
)
async def create_product_in_db(
        product: ProductScheme,
        session: AsyncSession = Depends(get_async_session),
) -> ProductScheme:
    """Представление для создания нового продукта производителя."""
    new_product = await create_product(product, session)
    return new_product
