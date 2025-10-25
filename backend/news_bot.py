import requests
import schedule
import time
from deep_translator import GoogleTranslator

# ===== Настройки =====
TOKEN = "8431433486:AAEg6PX6MnnXn7dB_n8redyKXk9YPDlCK_0"
CHAT_ID = "-1002964146420"
NEWSAPI_KEY = "6c439059003f4af2a86bb7df0a23dbf4"
GNEWS_API_KEY = "dc07c25ee0dddace48c7e0f9d08fc769"
OUR_SITE = "https://ваш-сайт.com"
SUBSCRIBE_LINK = "https://t.me/wichtigernews"

news_queue = []  # Очередь новостей

# ===== Функция отправки новости =====
def send_news(title, description, link, photo_url):
    caption = f"<b>{title}</b>\n{description}\n\n" \
              f"<a href='{SUBSCRIBE_LINK}'>Подписаться</a> | " \
              f"<a href='{link}'>Оригинальная новость</a> | " \
              f"<a href='{OUR_SITE}'>Наш сайт</a>"

    payload = {
        "chat_id": CHAT_ID,
        "caption": caption,
        "photo": photo_url or "https://via.placeholder.com/600x400",
        "parse_mode": "HTML"
    }

    r = requests.post(f"https://api.telegram.org/bot{TOKEN}/sendPhoto", data=payload)
    print(f"Отправлено: {title[:30]}..., статус: {r.status_code}")

# ===== Получение новостей из NewsAPI =====
def get_news_newsapi():
    countries = ["us", "de", "ru", "ua", "gb"]  # США, Германия, Россия, Украина, Великобритания
    all_articles = []
    for country in countries:
        url = "https://newsapi.org/v2/top-headlines"
        params = {"country": country, "pageSize": 5, "apiKey": NEWSAPI_KEY}
        response = requests.get(url, params=params).json()
        articles = response.get("articles", [])
        all_articles.extend(articles)
    return all_articles

# ===== Получение новостей из GNews =====
def get_news_gnews():
    url = "https://gnews.io/api/v4/top-headlines"
    params = {"lang": "en", "max": 5, "apikey": GNEWS_API_KEY}
    response = requests.get(url, params=params).json()
    return response.get("articles", [])

# ===== Загрузка новостей в очередь =====
def load_news():
    news_queue.clear()
    # NewsAPI
    articles1 = get_news_newsapi()
    for article in articles1:
        title = article.get("title")
        description = article.get("description", "")
        link = article.get("url")
        photo_url = article.get("urlToImage")
        if title and link:
            # Перевод на русский
            title_ru = GoogleTranslator(source='auto', target='ru').translate(title)
            description_ru = GoogleTranslator(source='auto', target='ru').translate(description)
            news_queue.append((title_ru, description_ru, link, photo_url))
    # GNews
    articles2 = get_news_gnews()
    for article in articles2:
        title = article.get("title")
        description = article.get("description", "")
        link = article.get("url")
        photo_url = article.get("image")
        if title and link:
            title_ru = GoogleTranslator(source='auto', target='ru').translate(title)
            description_ru = GoogleTranslator(source='auto', target='ru').translate(description)
            news_queue.append((title_ru, description_ru, link, photo_url))
    print(f"Загружено новостей в очередь: {len(news_queue)}")

# ===== Отправка одной новости =====
def send_next_news():
    if not news_queue:
        load_news()
    if news_queue:
        news = news_queue.pop(0)
        send_news(*news)

# ===== Планировщик =====
schedule.every(15).minutes.do(send_next_news)

print("Бот запущен. Новости будут отправляться каждые 15 минут.")

# ===== Инициализация очереди =====
load_news()

# ===== Бесконечный цикл =====
while True:
    schedule.run_pending()
    time.sleep(1)
