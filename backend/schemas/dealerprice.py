from datetime import date
from typing import Optional

from pydantic import BaseModel, Field


class DealerPriceScheme(BaseModel):
    """Pydantic-схема для модели DealerPrice"""
    id: int
    product_key: int
    price: float
    product_url: str
    product_name: str
    date: date
    dealer_id: int
    is_marked: Optional[bool] = Field(None)

    class Config:
        title = 'Схема товара дилера'
