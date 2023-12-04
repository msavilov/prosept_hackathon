from sqlalchemy import Boolean, Column, Date, Float, ForeignKey, Integer, String

from backend.core.db import Base


class Product(Base):
    """Модель продукта производителя."""
    id = Column(Integer, primary_key=True)
    article = Column(String)
    ean_13 = Column(Integer)
    name = Column(String)
    cost = Column(Float)
    recommended_price = Column(Float)
    category_id = Column(Integer)
    ozon_name = Column(String)
    name_1c = Column(String)
    wb_name = Column(String)
    ozon_article = Column(Integer)
    wb_article = Column(Integer)
    ym_article = Column(String)
    wb_article_td = Column(String)


class Dealer(Base):
    """Модель дилера."""
    id = Column(Integer, primary_key=True)
    name = Column(String)


class DealerPrice(Base):
    """Модель продукта дилера."""
    product_key = Column(Integer, primary_key=True)
    price = Column(Float)
    product_url = Column(String)
    product_name = Column(String)
    date = Column(Date)
    dealer_id = Column(Integer, ForeignKey('dealer.id'))
    is_marked = Column(Boolean)


class ProductDealer(Base):
    """Модель сопоставления продукта производителя и продуктов дилера."""
    id = Column(Integer, primary_key=True)
    key = Column(Integer, ForeignKey('dealerprice.product_key'))
    dealer_id = Column(Integer, ForeignKey('dealer.id'))
    product_id = Column(Integer, ForeignKey('product.id'))
    create_dt = Column(Date)
