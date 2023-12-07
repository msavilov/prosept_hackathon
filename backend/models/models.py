from sqlalchemy import Boolean, Column, Date, Float, ForeignKey, Integer, BigInteger, String

from backend.core.db import Base


class Product(Base):
    """Модель продукта производителя."""
    id = Column(Integer, primary_key=True)
    article = Column(String)
    ean_13 = Column(BigInteger, nullable=True)
    name = Column(String)
    cost = Column(Float)
    recommended_price = Column(Float)
    category_id = Column(BigInteger, nullable=True)
    ozon_name = Column(String, nullable=True)
    name_1c = Column(String, nullable=True)
    wb_name = Column(String, nullable=True)
    ozon_article = Column(String, nullable=True)
    wb_article = Column(String, nullable=True)
    ym_article = Column(String, nullable=True)


class Dealer(Base):
    """Модель дилера."""
    id = Column(Integer, primary_key=True)
    name = Column(String)


class DealerPrice(Base):
    """Модель продукта дилера."""
    id = Column(Integer)
    product_key = Column(BigInteger, primary_key=True)
    price = Column(Float)
    product_url = Column(String)
    product_name = Column(String)
    date = Column(Date)
    dealer_id = Column(BigInteger, ForeignKey('dealer.id'))
    is_marked = Column(Boolean, nullable=True)


class ProductDealer(Base):
    """Модель сопоставления продукта производителя и продуктов дилера."""
    id = Column(Integer, primary_key=True)
    key = Column(BigInteger, ForeignKey('dealerprice.product_key'))
    dealer_id = Column(Integer, ForeignKey('dealer.id'))
    product_id = Column(Integer, ForeignKey('product.id'))
    create_dt = Column(Date)
