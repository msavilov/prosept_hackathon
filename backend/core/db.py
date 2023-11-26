"""Временное решение для разработки."""
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import Column, Integer
from sqlalchemy.orm import declared_attr

from backend.core.config import settings
# from backend.models.base_model import Base


class Base:
    """
    Базовая модель. Название таблицы создается по названию модели.
    Определено по умолчанию наличие поля ID с primary_key=True.
    """

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    id = Column(Integer, primary_key=True)


Base = declarative_base(cls=Base)

engine = create_async_engine(settings.database_url)

async_session = AsyncSession(engine)

AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession)
