import os

# Название проекта
PROJECT_NAME = os.getenv('PROJECT_NAME', 'procept_hackathon')

# Корневой каталог
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
