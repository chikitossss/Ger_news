// src/bot/newsBot.ts
import TelegramBot from "node-telegram-bot-api";
import { fetchAllNews as fetchNewsAPI } from "./newsapiService";
import { fetchAllNews as fetchGuardianNews } from "./guardianService";
import dotenv from "dotenv";
import { Translate } from "@google-cloud/translate/build/src/v2";
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, { polling: false });
const chatId = process.env.TELEGRAM_CHAT_ID!;

// Настройка Google Translate
const translate = new Translate({
  projectId: process.env.GOOGLE_PROJECT_ID,
  key: process.env.GOOGLE_API_KEY,
});

// Функция перевода
async function translateText(text: string, target: string = "ru") {
  try {
    const [translation] = await translate.translate(text, target);
    return translation;
  } catch (err) {
    console.error("Ошибка перевода:", err);
    return text; // если перевод не удался — возвращаем оригинал
  }
}

// Форматирование новости
function formatMessage(title: string, description: string, url: string) {
  return `<b>${title}</b>\n${description}\n\n` +
         `<a href="${url}">Оригинал</a> | ` +
         `<a href="https://t.me/your_channel">Подписаться</a> | ` +
         `<a href="https://yourwebsite.com">Наш сайт</a>`;
}

// Отправка новости в Telegram
async function sendNews(news: { title: string; description: string; url: string; imageUrl?: string }) {
  const translatedDescription = await translateText(news.description);

  const message = formatMessage(news.title, translatedDescription, news.url);

  try {
    if (news.imageUrl) {
      await bot.sendPhoto(chatId, news.imageUrl, { parse_mode: "HTML", caption: message });
    } else {
      await bot.sendMessage(chatId, message, { parse_mode: "HTML" });
    }
    console.log(`✅ Новость отправлена: ${news.title}`);
  } catch (err) {
    console.error("❌ Ошибка отправки новости:", err);
  }
}

// Основная функция
async function main() {
  console.log("🚀 Бот запущен");

  // Альтернируем источники
  let toggle = true;

  setInterval(async () => {
    try {
      let newsList;
      if (toggle) {
        newsList = await fetchNewsAPI(); // первая новость из NewsAPI
      } else {
        newsList = await fetchGuardianNews(); // следующая из Guardian
      }
      toggle = !toggle;

      if (newsList.length > 0) {
        // Map the provider-specific NewsItem to the shape expected by sendNews
        const first = newsList[0] as any;
        const mapped = {
          title: first.title || first.webTitle || "Без заголовка",
          description:
            first.description ||
            first.summary ||
            (first.fields && (first.fields.trailText || first.fields.body)) ||
            "",
          url:
            first.url ||
            first.link ||
            first.webUrl ||
            (first.fields && first.fields.shortUrl) ||
            "",
          imageUrl:
            first.imageUrl ||
            first.image ||
            (first.fields && (first.fields.thumbnail || first.fields.main)) ||
            undefined,
        };
        await sendNews(mapped); // отправляем первую новость
      }
    } catch (err) {
      console.error("Ошибка получения новостей:", err);
    }
  }, 10 * 60 * 1000); // каждые 10 минут

  // Обновление очереди новостей раз в час (для примера)
  setInterval(async () => {
    try {
      await fetchNewsAPI();
      await fetchGuardianNews();
    } catch (err) {
      console.error("Ошибка обновления новостей:", err);
    }
  }, 60 * 60 * 1000);
}

main();
