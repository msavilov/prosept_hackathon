from pydantic import BaseModel


class DealerScheme(BaseModel):
    """Pydantic-схема дилера."""
    id: int
    name: str
