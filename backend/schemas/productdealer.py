from datetime import date

from pydantic import BaseModel, Field


class ProductDealerScheme(BaseModel):
    id: int
    key: int
    dealer_id: int
    product_id: int
    create_dt: date = Field(
        date.today()
    )

    class Config:
        title = 'Схема матчинга "Товар дилера" - "Товар производителя"'
        json_schema_extra = {
            'example': {
                "product_id": 1,
                "id": 1,
                "key": 111222,
                "dealer_id": 1,
                "create_dt": "2023-12-04",
            }
        }
