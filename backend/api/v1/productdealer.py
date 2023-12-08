from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.core.db import get_async_session
from backend.crud.dealerprice import get_dealer_price_by_key
from backend.crud.productdealer import (create_product_dealer,
                                        get_all_product_dealers,
                                        get_products_by_list_id)
from backend.schemas.productdealer import ProductDealerScheme
from backend.schemas.products import ProductScheme

router_product_dealer = APIRouter(
    prefix='/product_dealer',
    tags=[('получение/создание результатов матчига "товар дилера"'
           ' - "товары производителя"')],
)


@router_product_dealer.get(
    '/',
    summary=('Получить список всех созданных матчингов "товар дилера"'
             ' - "товар производителя"'),
)
async def get_all_product_dealers_from_db(
        session: AsyncSession = Depends(get_async_session),
) -> list[ProductDealerScheme]:
    """
    Представление для получения результата матчигов по ключу товара дилера.
    """
    product_dealer_list = await get_all_product_dealers(session)
    return product_dealer_list


@router_product_dealer.get(
    '/{dealer_price_product_key}',
    summary='Получить из ML список совпадающих продуктов',
)
async def get_products_from_ml(
        dealer_price_product_key: int,
        session: AsyncSession = Depends(get_async_session)
) -> list[ProductScheme]:
    """Представление для получения из ML подходящих продуктов."""
    # Получаем товар дилера по dealer_price_key
    dealer_price = await get_dealer_price_by_key(
        dealer_price_product_key, session)
    # Здесь полученный dealer_price передается в ML.
    # В ответ получается список id подходящих товаров производителя
    products_id_list = [1, 2, 3, 4, 5]
    # Получаются из базы
    products = await get_products_by_list_id(products_id_list, session)
    return products


@router_product_dealer.post(
    '/',
    summary='Создать экземпляр матчинга "товар дилера - товар производителя',
)
async def create_match(
        product_dealer: ProductDealerScheme,
        session: AsyncSession = Depends(get_async_session),
) -> ProductDealerScheme:
    """Представление для создания в БД результата матчинга."""
    new_product_dealer = await create_product_dealer(product_dealer, session)
    return new_product_dealer
