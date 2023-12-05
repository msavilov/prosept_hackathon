from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.models import Product
from backend.models.models import ProductDealer
from backend.schemas.productdealer import ProductDealerScheme


async def create_product_dealer(
        new_product_dealer: ProductDealerScheme,
        session: AsyncSession,
) -> ProductDealer:
    """Создание в БД нового объекта результата матчинга (ProductDealer)."""
    new_product_dealer_data = new_product_dealer.model_dump()
    db_product_dealer = ProductDealer(**new_product_dealer_data)
    session.add(db_product_dealer)
    await session.commit()
    await session.refresh(db_product_dealer)
    return db_product_dealer


async def get_product_dealers_by_dealer_price_key(
        dealer_price_key: int,
        session: AsyncSession,
) -> list[ProductDealer]:
    db_product_dealer_list = await session.execute(
        select(ProductDealer).where(
            ProductDealer.key == dealer_price_key
        )
    )
    db_product_dealer_list = db_product_dealer_list.scalars().all()
    return db_product_dealer_list


async def get_products_by_product_dealer(
        dealer_price_key: int,
        session: AsyncSession,
) -> list[ProductDealer]:
    db_product_dealer_list = await session.execute(
        select(ProductDealer).where(
            ProductDealer.key == dealer_price_key
        )
    )
    db_product_dealer_list = db_product_dealer_list.scalars().all()
    products_ids = []
    # Получаем список idшников товаров
    for product_dealer in db_product_dealer_list:
        products_ids.append(product_dealer.product_id)
    # Достаем из БД все товары производителя с id из списка
    db_product_list = await session.execute(
        select(Product).where(
            Product.id.in_(products_ids)
        )
    )
    db_product_list = db_product_list.scalars().all()
    return db_product_list
