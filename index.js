const TelegramApi = require("node-telegram-bot-api");

const token = "1826953714:AAFSy6SkCgsc8LV2DuLxUXA7wnbzpsh5cxY";

const bot = new TelegramApi(token, { polling: true });

bot.on("message", (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  if (text == "/start") {
    bot.sendMessage(
      chatId,
      `
    Добро пожаловать в телеграмм бота profi01
    Welcome to telegram bot profi01
    `
    );
  }
  if (text == "/start") {
    bot.sendMessage(
      chatId,
      `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`
    );
  }
  bot.sendMessage(chatId, `Ты написал мне ${text}`);
});
