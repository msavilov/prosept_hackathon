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
