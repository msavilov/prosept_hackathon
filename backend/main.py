import uvicorn
from fastapi import FastAPI
from fastapi.responses import ORJSONResponse

from backend.api.v1.dealerprice import router
from backend.core import config

app = FastAPI(
    default_response_class=ORJSONResponse,
)

app.include_router(router)

app.mount("/v1", app)


if __name__ == '__main__':
    uvicorn.run(
        'main:app',
    )
