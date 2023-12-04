from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession

from backend.core.db import get_async_session
from backend.crud.dealerprice import create_dealer_price, get_all_dealer_prices
from backend.models.models import DealerPrice
from backend.schemas.dealerprice import DealerPriceScheme

router_dealer_price = APIRouter(
    prefix='/dealer_price',
)


@router_dealer_price.get(
    '/',
)
async def get_all_prices(
        session: AsyncSession = Depends(get_async_session),
):
    """Представление для получения всех товаров продавцов."""
    dealer_price_list = await get_all_dealer_prices(session)
    return dealer_price_list


@router_dealer_price.post(
    '/'
)
async def create_new_dealer_price(
        dealer_price: DealerPriceScheme,
        session: AsyncSession = Depends(get_async_session),
):
    """Представление для создания нового товара дилера."""
    new_dealer_price = await create_dealer_price(dealer_price, session)
    return new_dealer_price
