import uvicorn
from fastapi import FastAPI
from fastapi.responses import ORJSONResponse

from backend.api.v1.dealerprice import router_dealer_price
from backend.api.v1.productdealer import router_product_dealer
from backend.api.v1.products import router_products
from backend.api.v1.dealers import router_dealers
from backend.core import config


app = FastAPI(
    default_response_class=ORJSONResponse,
)

app.include_router(router_dealer_price)
app.include_router(router_product_dealer)
app.include_router(router_products)
app.include_router(router_dealers)

app.mount("/v1", app)


if __name__ == '__main__':
    uvicorn.run(
        'main:app',
    )
