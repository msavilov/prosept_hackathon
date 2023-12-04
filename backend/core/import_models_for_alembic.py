"""Импорты класса Base и всех моделей для Alembic"""
from backend.core.db import Base  # noqa
from backend.models.models import (Dealer, DealerPrice, Product,  # noqa
                                   ProductDealer)
