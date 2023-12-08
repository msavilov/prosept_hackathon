"""Временное решение для разработки."""
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, declared_attr, sessionmaker

from backend.core.config import settings


class Base:
    """
    Базовая модель. Название таблицы создается по названию модели.
    """

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

# SQL Lite
# Base = declarative_base(cls=Base)
#
# engine = create_async_engine(settings.database_url)
#
# async_session = AsyncSession(engine)
#
# AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession)
#
#
# async def get_async_session():
#     async with AsyncSessionLocal() as async_session:
#         yield async_session


# Postgre SQL
Base = declarative_base(cls=Base)

engine = create_async_engine(
    settings.database_url,
    echo=True,
    future=True,
)

async_session = AsyncSession(engine)

AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession)


async def get_async_session():
    async with AsyncSessionLocal() as async_session:
        yield async_session
