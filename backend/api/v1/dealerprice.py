from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession

from backend.core.db import get_async_session
from backend.crud.dealerprice import get_all_dealer_prices
from backend.models.models import DealerPrice
from backend.schemas.dealerprice import DealerPriceScheme

router = APIRouter(
    prefix='/dealer_price',
)


@router.get(
    '/',
)
async def get_all_prices(
        session: AsyncSession = Depends(get_async_session),
):
    """Представление для получения всех товаров продавцов."""
    dealer_price_list = await get_all_dealer_prices(session)
    return dealer_price_list
