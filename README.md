# prosept_hackaton

# Интстукция по запуска backend'a.

Для запуска без Docker'a требуется, чтобы был установлен Python 3.11.6.
Взять можно здесь:
https://www.python.org/downloads/release/python-3116/

### 1. Клонировать ветку feature/branch_for_testing_frontend репозитория.
В терминале (командной строке):
```bash
git clone -b feature/branch_for_testing_frontend git@github.com:msavilov/prosept_hackathon.git
```

### 2. Перейти в корневой каталог приложения.
В терминале (командной строке):
```bash
cd prosept_hackathon
```

### 3. Создать и активировать виртуальное окружение
В терминале в корневом каталоге приложения, находясь prosept_hackathon:
```bash
# Создать виртуальное окружение
python -m venv venv

# Если Windows:
.\venv\Script\activate

# Если Linux или Mac
source venv\bin\activate
```

В командной строке будет отображено что-то типа:
```bash
(venv) C:\Dev\hakaton_prosept\prosept_hackathon>
```

### 4. В активированном виртуальном окружении необходимо обновить менеджер пакетов pip и установить зависимости:
```bash
python -m pip install --upgrade pip
pip install -r backend\requirements.txt
```

### 5. Далее нужно подготовить проект к запуску.
В корневом каталоге prosept_hackathon разместить файлы `.env` и `procept.db`.

- `.env` - https://disk.yandex.ru/d/iMwSFmYdBNMwGg
- `procept.db` - https://disk.yandex.ru/d/CA9kD0pc_c-jXg

В итоге должно получиться так:

![Структура](/docs/structure.png)

### 6. Запустить проект:
Находясь в корневом каталоге prosept_hackathon (это важно), в терминале:
```bash
uvicorn backend.main:app --reload
```

Если проект запустился, в терминале должно быть вот это:
![Терминал](/docs/terminal.png)

Документация по эндпоинтам доступа в двух форматах вот здесь:
- http://127.0.0.1:8000/docs
- http://127.0.0.1:8000/redoc

Когда Максим сделает docker-compose - запускаться все будет легче.

## Важная условность
Эндпоинт
`http://127.0.0.1:8000/product_dealer/{dealer_price_product_key}`, который по документации будет возвращать результат ML - сейчас работает с заглушкой и будет возвращать 5 одних и тех же товаров производителя вне зависимости от товара дилера.
После подключения ML работать эндпоинт будет на выходе также, поменяется только код под капотом.
Это сделано, для того, чтобы у фронтов была возможность сейчас уже использовать данный эндпоинт для работы с главной страницей.
