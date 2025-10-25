import TelegramBot from "node-telegram-bot-api";

const token = "8431433486:AAEg6PX6MnnXn7dB_n8redyKXk9YPDlCK_0";
const chatId = "-1002964146420";

const bot = new TelegramBot(token, { polling: false });

bot.sendMessage(chatId, "Тестовое сообщение 🚀", { parse_mode: "HTML" })
  .then(() => console.log("Сообщение отправлено"))
  .catch(err => console.error("Ошибка при отправке:", err));

  