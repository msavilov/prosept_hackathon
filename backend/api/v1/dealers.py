from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.core.db import get_async_session
from backend.crud.dealers import create_dealer, get_all_dealers
from backend.schemas.dealers import DealerScheme

router_dealers = APIRouter(
    prefix='/dealers',
    tags=['/dealers - получение/создание дилеров'],
)


@router_dealers.get(
    '/',
    summary='Получить список всех дилеров из БД',
)
async def get_all_dealers_from_db(
        session: AsyncSession = Depends(get_async_session)
) -> list[DealerScheme]:
    """Представление для получения всех дилеров."""
    dealers = await get_all_dealers(session)
    return dealers


@router_dealers.post(
    '/',
    summary='Создать дилера в БД',
)
async def create_dealer_in_db(
        dealer: DealerScheme,
        session: AsyncSession = Depends(get_async_session),
) -> DealerScheme:
    """Представление для создания нового дилера."""
    new_dealer = await create_dealer(dealer, session)
    return new_dealer
