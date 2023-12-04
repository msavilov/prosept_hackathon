from pydantic import BaseModel


class DealerScheme(BaseModel):
    """Pydantic-схема дилера."""
    id: int
    name: str

    class Config:
        title = 'Схема дилера'
        json_schema_extra = {
            'example': {
                'id': 1,
                'name': 'Akson'
            }
        }
