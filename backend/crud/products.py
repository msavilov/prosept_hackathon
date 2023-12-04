from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.models import Product
from backend.schemas.products import ProductScheme


async def create_product(
        new_product: ProductScheme,
        session: AsyncSession
) -> Product:
    """Создание в БД нового продукта производителя."""
    new_product_data = new_product.model_dump()
    db_product = Product(**new_product_data)
    session.add(db_product)
    await session.commit()
    await session.refresh(db_product)
    return db_product


async def get_all_products(
        session: AsyncSession
) -> list[Product]:
    """Получение из БД списка товаров производителя."""
    db_product_list = await session.execute(
        select(Product)
    )
    db_product_list = db_product_list.scalars().all()
    return db_product_list
