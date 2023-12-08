from typing import Optional

from pydantic import BaseModel, Field


class ProductScheme(BaseModel):
    id: int
    article: str
    ean_13: Optional[int] = Field(None)
    name: str
    cost: float
    recommended_price: float
    category_id: Optional[int] = Field(None)
    ozon_name: Optional[str] = Field(None)
    name_1c: Optional[str] = Field(None)
    wb_name: Optional[str] = Field(None)
    ozon_article: Optional[str] = Field(None)
    wb_article: Optional[str] = Field(None)
    ym_article: Optional[str] = Field(None)

    class Config:
        title = 'Схема матчинга "Товар дилера" - "Товар производителя"'
