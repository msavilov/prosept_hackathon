from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.models import DealerPrice
from backend.schemas.dealerprice import DealerPriceScheme


async def create_dealer_price(
        new_dealer_price: DealerPriceScheme,
        session: AsyncSession,
) -> DealerPrice:
    """Создание в БД нового товара продавца."""
    new_dealer_price_data = new_dealer_price.model_dump()
    db_dealer_price = DealerPrice(**new_dealer_price_data)
    session.add(db_dealer_price)
    await session.commit()
    await session.refresh(db_dealer_price)
    return db_dealer_price


async def get_all_dealer_prices(
        session: AsyncSession,
) -> list[DealerPrice]:
    """Получение из БД списка товаров дилеров."""
    db_prices_list = await session.execute(
        select(DealerPrice)
    )
    db_prices_list = db_prices_list.scalars().all()
    return db_prices_list
