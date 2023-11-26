"""Временное решение для разработки."""
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from backend.core.config import settings
from backend.models.base import Base

Base = declarative_base(cls=Base)

engine = create_async_engine(settings.database_url)

async_session = AsyncSession(engine)

AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession)
