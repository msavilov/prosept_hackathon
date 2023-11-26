from sqlalchemy import Column, Integer
from sqlalchemy.orm import declared_attr


class Base:
    """
    Базовая модель. Название таблицы создается по названию модели.
    Определно поле ID.
    """
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    id = Column(Integer, primary_key=True)
