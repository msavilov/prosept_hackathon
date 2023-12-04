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

    class Config:
        title = 'Схема матчинга "Товар дилера" - "Товар производителя"'
        json_schema_extra = {
            'example': {
                "ean_13": 1234567891234,
                "name": "Антисептик",
                "cost": 195.95,
                "category_id": 20,
                "name_1c": "Антисептик",
                "ozon_article": "Антисептик",
                "ym_article": "Антисептик",
                "article": "0001-01 g",
                "id": 101,
                "recommended_price": 749.95,
                "ozon_name": "Антисептик",
                "wb_name": "Антисептик",
                "wb_article": "Антисептик"
            }
        }
