from pydantic import BaseModel


class DealerPriceScheme(BaseModel):
    product_key: int
    price: float
    product_url: str
    product_name: str
    date: str
    dealer_id: int
    is_marked: bool
