from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.models import DealerPrice
from backend.schemas.dealerprice import DealerPriceScheme





async def get_all_dealer_prices(
        session: AsyncSession,
) -> list[DealerPrice]:
    """Получение из БД списка товаров дилеров."""
    db_prices_list = await session.execute(
        select(DealerPrice)
    )
    db_prices_list = db_prices_list.scalar().all()
    return db_prices_list


