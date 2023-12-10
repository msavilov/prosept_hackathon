## 'Хакатон Просепт х Практикум ноябрь-декабрь’23'

### Задача

Разработка решения, которое автоматизирует процесс сопоставления товаров заказчика с размещаемыми товарами дилеров

### Команда

**Backend**

[Максим Савилов - developer](https://github.com/msavilov)

[Александр Петров - developer](https://github.com/AlexanderPAI)

**Frontend**

[Анна Матузная - developer](https://github.com/Anutka-bestiya)

[Наиля Казачук - developer](https://github.com/Nailusha)

### Технологии

- _[Python 3.11.6](https://www.python.org/downloads/release/python-3116/)_
- _[FastAPI 0.104.1](https://fastapi.tiangolo.com/#installation)_
- _[SQLAlchemy 2.0.23](https://docs.sqlalchemy.org/en/20/)_
- _[Pydantic 2.5.2](https://docs.pydantic.dev/latest/install/)_
- _[Alembic 1.12.1](https://alembic.sqlalchemy.org/en/latest/front.html)_
- _[Uvicorn ASGI 0.24.0.post1](https://www.uvicorn.org/)_
- _[Postgresql](https://hub.docker.com/_/postgres)-Docker-образ\_
- _[Docker and docker-compose](https://www.docker.com/get-started/)_
- _[Websockets 12.0](https://fastapi.tiangolo.com/advanced/websockets/)_

- _[React](https://react.dev/)_

### Описание:
В качестве фреймворка выбран FastAPI так как backend написан полностью с использование ассинхронного механизма.


### Архивы репозитория
- backend https://disk.yandex.ru/d/sstiVswuuoMgTQ
- 

### Инструкция по запуска backend'a.

**Без докера**

#### 1. Клонировать репозиторий.

В терминале (командной строке):

```bash
git clone git@github.com:msavilov/prosept_hackathon.git
```

#### 2. Перейти в корневой каталог приложения.

В терминале (командной строке):

```bash
cd prosept_hackathon
```

#### 3. Создать и активировать виртуальное окружение

В терминале в корневом каталоге приложения, находясь prosept_hackathon:

```bash
# Создать виртуальное окружение
python -m venv venv

# Если Windows:
.\venv\Script\activate

# Если Linux или Mac
source venv\bin\activate
```

#### 4. В активированном виртуальном окружении необходимо обновить менеджер пакетов pip и установить зависимости:

```bash
python -m pip install --upgrade pip
pip install -r backend\requirements.txt
```

#### 5. Далее нужно подготовить проект к запуску.

В корневом каталоге prosept_hackathon разместить файлы `.env`.

- `.env` - https://disk.yandex.ru/d/ZjidjYzHNi9_XA

#### 6. Запустить проект:

Находясь в корневом каталоге prosept_hackathon (это важно), в терминале:

```bash
uvicorn backend.main:app --reload
```

**В Docker**

Запустить контейнеры

```python
docker compose up --build
```

### Работа с документацией

- [Swagger](http://127.0.0.1:8000/docs)

## Важная условность

Эндпоинт
`http://127.0.0.1:8000/product_dealer/{dealer_price_product_key}`, который по документации будет возвращать результат ML - сейчас работает с заглушкой и будет возвращать 5 одних и тех же товаров производителя вне зависимости от товара дилера.
После подключения ML работать эндпоинт будет на выходе также, поменяется только код под капотом.
Это сделано, для того, чтобы у фронтов была возможность сейчас уже использовать данный эндпоинт для работы с главной страницей.

### Инструкция по запуску frontend

#### 1. Кллонирование репозитория

В терминале (командной строке):

```bash
gh repo clone msavilov/prosept_hackathon
```

#### 2. Переход в папку frontend

В терминале (командной строке):

```bash
cs frontend
```

#### 3. Установка зависимостей

В терминале (командной строке):

```bash
npm ci
```

#### 4. Создание оптимизированной сборки

В терминале (командной строке):

```bash
npm run build
```

#### 5. Запуск dev-режима

В терминале (командной строке):

```bash
npm run start
```

Приложение будет доступно по адресу http://localhost:3000.
