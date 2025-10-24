import TelegramBot from "node-telegram-bot-api";
import { News } from "../models/news";

const token = process.env.TELEGRAM_TOKEN || "";
const chatId = process.env.TELEGRAM_CHAT_ID || "";
const bot = token ? new TelegramBot(token) : null;

export const sendNews = (news: News) => {
  if (!bot || !chatId) return;
  const message = `📰 *${news.title}*\n${news.description}\n[Read more](${news.link})`;
  bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
};
