const TelegramBot = require("node-telegram-bot-api");
import { News } from "../models/news";

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, { polling: true });

export const sendNews = (news: News) => {
  const message = `📰 ${news.title}\n\n${news.description}\nSource: ${news.source}`;
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID!, message);
};
