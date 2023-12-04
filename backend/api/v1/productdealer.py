from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession

from backend.core.db import get_async_session
from backend.crud.productdealer import create_product_dealer, get_product_dealers_by_dealer_price_key
from backend.schemas.productdealer import ProductDealerScheme

router_product_dealer = APIRouter(
    prefix='/product_dealer',
)


@router_product_dealer.get(
    '/',
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
)
async def create_match(
        product_dealer: ProductDealerScheme,
        session: AsyncSession = Depends(get_async_session),
):
    """Представление для создания в БД результата матчинга."""
    new_product_dealer = await create_product_dealer(product_dealer, session)
