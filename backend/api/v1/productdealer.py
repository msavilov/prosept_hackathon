from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession

from backend.core.db import get_async_session
from backend.crud.productdealer import create_product_dealer, get_product_dealers_by_dealer_price_key
from backend.schemas.productdealer import ProductDealerScheme

router_product_dealer = APIRouter(
    prefix='/product_dealer',
    tags=['/product_dealer - получение/создание результатов матчига "товар дилера" - "товары производителя"'],
)


@router_product_dealer.get(
    '/{dealer_price_key}',
    summary='Получить список всех матчигов товара дилера с товарами производителя ',
)
async def get_match_product_dealer(
        dealer_price_key: int,
        session: AsyncSession = Depends(get_async_session),
):
    """Представление для получения результата матчига по ключу товара дилера."""
    product_dealer_list = await get_product_dealers_by_dealer_price_key(
        dealer_price_key,
        session,
    )
    return product_dealer_list


@router_product_dealer.post(
    '/',
    summary='Создать экземпляр матчинга "1 товар дилера - 1 товар производителя',
)
async def create_match(
        product_dealer: ProductDealerScheme,
        session: AsyncSession = Depends(get_async_session),
):
    """Представление для создания в БД результата матчинга."""
    new_product_dealer = await create_product_dealer(product_dealer, session)
    return new_product_dealer
