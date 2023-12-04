from fastapi import APIRouter, Body, Depends

from sqlalchemy.ext.asyncio import AsyncSession

from backend.core.db import get_async_session
from backend.crud.dealerprice import create_dealer_price, get_all_dealer_prices, get_dealer_price_by_id
from backend.schemas.dealerprice import DealerPriceScheme

from backend.schemas.request_examples import request_examples

router_dealer_price = APIRouter(
    prefix='/dealer_price',
    tags=['/dealer_price - получить/создать товары дилера (по ТЗ полученные из парсера'],
)


@router_dealer_price.get(
    '/',
    summary='Получить список всех товаров дилеров из БД',
)
async def get_all_prices(
        session: AsyncSession = Depends(get_async_session),
):
    """Представление для получения всех товаров продавцов."""
    dealer_price_list = await get_all_dealer_prices(session)
    return dealer_price_list


@router_dealer_price.get(
    '/{dealer_price_id}',
    summary='Получить один товар дилера из БД по id',
)
async def get_dealer_price_by_id_from_db(
        dealer_price_id: int,
        session: AsyncSession = Depends(get_async_session)
):
    """Представление для получения одного товара дилера по id."""
    dealer_price = await get_dealer_price_by_id(dealer_price_id, session)
    return dealer_price


@router_dealer_price.post(
    '/',
    summary='Создать товар производителя в БД',
)
async def create_new_dealer_price(
        dealer_price: DealerPriceScheme = Body(
            ...,
            examples=[request_examples['dealer_price_post']]
        ),
        session: AsyncSession = Depends(get_async_session),
):
    """Представление для создания нового товара дилера."""
    new_dealer_price = await create_dealer_price(dealer_price, session)
    return new_dealer_price
