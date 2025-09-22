const TelegramBot = require("node-telegram-bot-api");

// ganti TOKEN dengan token bot kamu dari BotFather
const TOKEN = "8235116120:AAHl2DHiADEqDYwZTVj629bd_mDrk5neskY";

// polling artinya bot akan terus berjalan & baca pesan baru
const bot = new TelegramBot(TOKEN, { polling: true });

// Command /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Halo ${msg.from.first_name}! 👋\nKetik /secret untuk coba menu rahasia 😈`);
});

// Command /secret
bot.onText(/\/secret/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Menu Rahasia 😈", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "⠀", callback_data: "secret" }] // tombol kosong
      ]
    }
  });
});

// Handle callback tombol
bot.on("callback_query", (callbackQuery) => {
  const data = callbackQuery.data;

  if (data === "secret") {
    bot.answerCallbackQuery(callbackQuery.id, {
      text: "Kamu menemukan tombol rahasia 🔥",
      show_alert: true, // tampil popup alert
    });

    // optional: kirim pesan tambahan
    bot.sendMessage(callbackQuery.message.chat.id, "⚡ Kamu berhasil membuka menu rahasia!");
  }
});
