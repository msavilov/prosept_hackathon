from datetime import date

from pydantic import BaseModel


class DealerPriceScheme(BaseModel):
    """Pydantic-схема для модели DealerPrice"""
    id: int
    product_key: int
    price: float
    product_url: str
    product_name: str
    date: date
    dealer_id: int
    is_marked: bool

    class Config:
        title = 'Схема товара дилера'
        json_schema_extra = {
            'example': {
                "id": 1,
                "product_url": "https://dealer.ru/goods/1/",
                "date": "2023-07-11",
                "is_marked": False,
                "product_key": 111222,
                "product_name": "Антисептик",
                "price": 195.95,
                "dealer_id": 1
            }
        }
