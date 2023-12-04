from pydantic import BaseModel


class ProductScheme(BaseModel):
    id: int
    article: str
    ean_13: int
    name: str
    cost: float
    recommended_price: float
    category_id: int
    ozon_name: str
    name_1c: str
    wb_name: str
    ozon_article: str
    wb_article: str
    ym_article: str
    wb_article_td: str
