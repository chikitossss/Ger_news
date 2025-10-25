import TelegramBot from "node-telegram-bot-api";

// Local NewsItem type and a simple fetchAllNews stub to avoid missing-module compile errors.
// Replace this stub with the real implementation or restore the service module when available.
export interface NewsItem {
  id: string;
  title: string;
  description?: string;
  photo?: string;
  video?: string;
}

export async function fetchAllNews(): Promise<NewsItem[]> {
  // TODO: implement actual fetching from your backend; returning empty array to satisfy types for now.
  return [];
}

// ===== Настройки =====
const TOKEN = "8431433486:AAEg6PX6MnnXn7dB_n8redyKXk9YPDlCK_0";
const CHAT_ID = "-1002964146420"; // ваш канал
const OUR_SITE = "https://ваш-сайт.com";
const SUBSCRIBE_LINK = "https://t.me/wichtigernews";

// ===== Инициализация бота =====
const bot = new TelegramBot(TOKEN, { polling: false });

// ===== Очередь и история =====
let newsQueue: NewsItem[] = [];
const sentNewsIds = new Set<string>();

// ===== Функция отправки новости =====
async function sendNews(news: NewsItem) {
  const caption = `<b>${news.title}</b>\n${news.description || ""}\n\n` +
                  `<a href="${SUBSCRIBE_LINK}">Подписаться</a> | ` +
                  `<a href="${OUR_SITE}">Наш сайт</a>`;

  try {
    // Если есть видео — отправляем его
    if (news.video && news.video.startsWith("http")) {
      await bot.sendVideo(CHAT_ID, news.video, { parse_mode: "HTML", caption });
      console.log(`✅ Отправлено видео: ${news.title.slice(0, 50)}...`);
    }
    // Если видео нет, но есть фото — отправляем фото
    else if (news.photo && news.photo.startsWith("http")) {
      await bot.sendPhoto(CHAT_ID, news.photo, { parse_mode: "HTML", caption });
      console.log(`✅ Отправлено фото: ${news.title.slice(0, 50)}...`);
    }
    // Если нет ни фото, ни видео — отправляем текст
    else {
      await bot.sendMessage(CHAT_ID, caption, { parse_mode: "HTML" });
      console.log(`✅ Отправлено текстом: ${news.title.slice(0, 50)}...`);
    }

    sentNewsIds.add(news.id);
  } catch (err) {
    console.error("❌ Ошибка отправки новости:", err);
  }
}

// ===== Подгрузка новостей с бекенда =====
async function loadNews() {
  try {
    const allNews = await fetchAllNews();
    const newArticles = allNews.filter((n: NewsItem) => !sentNewsIds.has(n.id));
    newsQueue.push(...newArticles);
    console.log(`📥 Загружено новых новостей: ${newArticles.length}`);
  } catch (err) {
    console.error("❌ Ошибка при загрузке новостей:", err);
  }
}

// ===== Отправка следующей новости =====
async function sendNextNews() {
  if (newsQueue.length === 0) {
    await loadNews();
  }

  if (newsQueue.length > 0) {
    const next = newsQueue.shift()!;
    await sendNews(next);
  } else {
    console.log("🕒 Нет новых новостей для отправки");
  }
}

// ===== Планировщик =====
setInterval(sendNextNews, 15 * 60 * 1000); // каждые 15 минут

// ===== Старт =====
console.log("🚀 Бот запущен. Новости будут отправляться каждые 15 минут.");
loadNews().then(() => sendNextNews());
