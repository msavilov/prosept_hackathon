from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.models import Dealer
from backend.schemas.dealers import DealerScheme


async def create_dealer(
        new_dealer: DealerScheme,
        session: AsyncSession,
) -> Dealer:
    """Содание в БД дилера."""
    new_dealer_data = new_dealer.model_dump()
    db_dealer = Dealer(**new_dealer_data)
    session.add(db_dealer)
    await session.commit()
    await session.refresh(db_dealer)
    return db_dealer


async def get_all_dealers(
        session: AsyncSession,
) -> list[Dealer]:
    """Получение всех дилеров из БД."""
    db_dealers_list = await session.execute(
        select(Dealer)
    )
    db_dealers_list = db_dealers_list.scalars().all()
    return db_dealers_list
