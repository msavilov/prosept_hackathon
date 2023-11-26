import uvicorn
from fastapi import FastAPI
from fastapi.responses import ORJSONResponse

from core import config


app = FastAPI(
    title=config.PROJECT_NAME,
    docs_url='/api/openapi',
    openapi_url='/api/openapi.json',
    default_response_class=ORJSONResponse,
)


@app.get('/index')
def index():
    return {'Hello': 'Developer'}


if __name__ == '__main__':
    uvicorn.run(
        'main:app',
    )
