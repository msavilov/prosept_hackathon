from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_title: str = 'Prosept_Hackathon'
    # Временное решение для тестов aiosqlite=0.17.0
    database_url: str

    class Config:
        env_file = '.env'


settings = Settings()
