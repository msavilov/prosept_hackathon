from datetime import date

from pydantic import BaseModel


class DealerPriceScheme(BaseModel):
    """Pydantic-схема для модели DealerPrice"""
    product_key: int
    price: float
    product_url: str
    product_name: str
    date: date
    dealer_id: int
    is_marked: bool
