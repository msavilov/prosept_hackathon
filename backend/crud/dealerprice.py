from datetime import date

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from fastapi.encoders import jsonable_encoder
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


async def get_dealer_price_by_id(
        dealer_price_id: int,
        session: AsyncSession,
) -> DealerPrice:
    db_dealer_price = await session.execute(
        select(DealerPrice).where(
            DealerPrice.id == dealer_price_id
        )
    )
    db_dealer_price = db_dealer_price.scalars().first()
    return db_dealer_price


async def get_dealer_price_by_key(
        dealer_price_key: int,
        session: AsyncSession,
) -> DealerPrice:
    db_dealer_price = await session.execute(
        select(DealerPrice).where(
            DealerPrice.product_key == dealer_price_key
        )
    )
    db_dealer_price = db_dealer_price.scalars().first()
    return db_dealer_price


async def get_dealer_price_by_date(
        filter_date: date,
        session: AsyncSession,
) -> list[DealerPrice]:
    db_dealer_prices = await session.execute(
        select(DealerPrice).where(
            DealerPrice.date == filter_date
        )
    )
    db_dealer_prices = db_dealer_prices.scalars().all()
    return db_dealer_prices


async def update_dealer_price(
        db_dealer_price: DealerPrice,
        dealer_price_in: DealerPriceScheme,
        session: AsyncSession,
) -> DealerPrice:
    obj_data = jsonable_encoder(db_dealer_price)
    update_data = dealer_price_in.model_dump(exclude_unset=True)

    for field in obj_data:
        if field in update_data:
            setattr(db_dealer_price, field, update_data[field])

    session.add(db_dealer_price)
    await session.commit()
    await session.refresh(db_dealer_price)
    return db_dealer_price
