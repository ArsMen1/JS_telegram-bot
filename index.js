const TelegramApi = require("node-telegram-bot-api");

const token = "1826953714:AAFSy6SkCgsc8LV2DuLxUXA7wnbzpsh5cxY";

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/info", description: "Информация о пользователе" },
    { command: "/game", description: "Игра угадай число" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text == "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/5fb/e86/5fbe8646-6371-463c-ba7d-bbc08ab0b860/3.webp"
      );
      return bot.sendMessage(
        chatId,
        `
Добро пожаловать в телеграмм бота proffi01
Я личный помощник пользователя @proffi01

Welcome to telegram bot proffi01
I am the user's personal assistant @proffi01
`
      );
    }
    if (text == "/info") {
      return bot.sendMessage(
        chatId,
        `
Тебя зовут ${msg.from.first_name} ${msg.from.last_name}
А я личный помощник пользователя @proffi01
`
      );
    }
    if (text == "/game") {
      await bot.sendMessage(chatId, `Угадай какое число от 0 до 9 я загадал)`);
      const randomNumber = Math.floor(Math.random() * 10);
      chats[chatId] = randomNumber;
      return bot.sendMessage(chatId, `Отгадывай)`);
    }
    return bot.sendMessage(
      chatId,
      `Я тебя не понимаю попробуй ввести сущесвующую команду`
    );
    //bot.sendMessage(chatId, `Ты написал мне ${text}`);  Repeat
  });
};

start();
