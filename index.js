const TelegramApi = require("node-telegram-bot-api");
const tokens = require("./token");

// name is a member of myModule due to the export above
const token = tokens.token;

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "1", callback_data: "1" },
        { text: "2", callback_data: "2" },
        { text: "3", callback_data: "3" },
      ],
      [
        { text: "4", callback_data: "4" },
        { text: "5", callback_data: "5" },
        { text: "6", callback_data: "6" },
      ],
      [
        { text: "7", callback_data: "7" },
        { text: "8", callback_data: "8" },
        { text: "9", callback_data: "9" },
      ],
      [{ text: "0", callback_data: "0" }],
    ],
  }),
};

const againOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Играть еще раз", callback_data: "/again" }]],
  }),
};

const startGame = async (chatId) => {
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, `Угадай число от 0 до 9`, gameOptions);
};

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
      return startGame(chatId);
    }
    return bot.sendMessage(
      chatId,
      `Я тебя не понимаю попробуй ввести сущесвующую команду`
    );
  });
  bot.on("callback_query", (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/again") {
      return startGame(chatId);
    }
    if (data === chats[chatId]) {
      return bot.sendMessage(chatId, `Верно!`, againOptions);
    } else {
      return bot.sendMessage(
        chatId,
        `Ты не угадал, это была цифра ${chats[chatId]}.`,
        againOptions
      );
    }
  });
};

start();
