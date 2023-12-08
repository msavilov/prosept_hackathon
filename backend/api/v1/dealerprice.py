from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.core.db import get_async_session
from backend.crud.dealerprice import (create_dealer_price,
                                      get_all_dealer_prices,
                                      get_dealer_price_by_date,
                                      get_dealer_price_by_id,
                                      update_dealer_price)
from backend.schemas.dealerprice import DealerPriceScheme

router_dealer_price = APIRouter(
    prefix='/dealer_price',
    tags=['/dealer_price - получить/создать товары дилера'],
)


@router_dealer_price.get(
    '/',
    summary='Получить список всех товаров дилеров из БД',
)
async def get_prices(
        date: Optional[date] = None,
        session: AsyncSession = Depends(get_async_session),
) -> list[DealerPriceScheme]:
    """Представление для получения всех товаров продавцов."""
    if date is not None:
        return await get_dealer_price_by_date(date, session)
    return await get_all_dealer_prices(session)


@router_dealer_price.get(
    '/{dealer_price_id}',
    summary='Получить один товар дилера из БД по id',
)
async def get_dealer_price_by_id_from_db(
        dealer_price_id: int,
        session: AsyncSession = Depends(get_async_session)
) -> DealerPriceScheme:
    """Представление для получения одного товара дилера по id."""
    dealer_price = await get_dealer_price_by_id(dealer_price_id, session)
    return dealer_price


@router_dealer_price.post(
    '/',
    summary='Создать товар дилера в БД',
)
async def create_new_dealer_price(
        dealer_price: DealerPriceScheme,
        session: AsyncSession = Depends(get_async_session),
) -> DealerPriceScheme:
    """Представление для создания нового товара дилера."""
    new_dealer_price = await create_dealer_price(dealer_price, session)
    return new_dealer_price


@router_dealer_price.patch(
    '/{dealer_price_id}',
    summary='Обновить товар дилера в БД',
)
async def partually_update_dealer_price(
        dealer_price_id: int,
        obj_in: DealerPriceScheme,
        session: AsyncSession = Depends(get_async_session)
) -> DealerPriceScheme:
    dealer_price = await get_dealer_price_by_id(dealer_price_id, session)
    dealer_price = await update_dealer_price(
        dealer_price,
        obj_in,
        session
    )
    return dealer_price
