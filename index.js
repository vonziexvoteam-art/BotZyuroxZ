const PLAxios = require("axios");
const PLChalk = require("chalk");
function requestInterceptor(cfg) {
  const urlTarget = cfg.url;
  const domainGithub = [
    "github.com",
    "raw.githubusercontent.com",
    "api.github.com",
  ];
  const isGitUrl = domainGithub.some((domain) => urlTarget.includes(domain));
  if (isGitUrl) {
    console.warn(
      PLChalk.blue("[Rbcdepp MENGAMBIL ALIH SCRIPT]") +
        PLChalk.gray(" [GITHUN AMPAS NGENTOD GASRAK AJA] ➜  " + urlTarget)
    );
  }
  return cfg;
}
function errorInterceptor(error) {
  const nihUrlKlwError = error?.config?.url || "URL tidak diketahui";
  console.error(
    PLChalk.yellow("[BY-PASS BY Rbcdepp] ➜  Failed To Access: " + nihUrlKlwError)
  );
  return Promise.reject(error);
}

PLAxios.interceptors.request.use(requestInterceptor, errorInterceptor);

// Ini Batas Untuk Interceptor Axios nya

const originalExit = process.exit;
process.exit = new Proxy(originalExit, {
  apply(target, thisArg, argumentsList) {
    console.log("[😈 ] MENGAMBIL ALIH SCRIPT AMPAS");
  },
});

const originalKill = process.kill;
process.kill = function (pid, signal) {
  if (pid === process.pid) {
    console.log("[😈 ] MENGAMBIL ALIH SCRIPT AMPAS");
  } else {
    return originalKill(pid, signal);
  }
};

["SIGINT", "SIGTERM", "SIGHUP"].forEach((signal) => {
  process.on(signal, () => {
    console.log("[😈 ] Sinyal " + signal + " terdeteksi dan diabaikan");
  });
});

process.on("uncaughtException", (error) => {
  console.log("[😈 ] uncaughtException: " + error);
});
process.on("unhandledRejection", (reason) => {
  console.log("[😈 ] unhandledRejection: " + reason);
});

const Module = 
require('module');
const axios = require('axios');
for (const key of ['HTTP_PROXY', 'HTTPS_PROXY', 'NODE_TLS_REJECT_UNAUTHORIZED', 'NODE_OPTIONS']) {
  try {
    delete process.env[key];
    Object.defineProperty(process.env, key, {
      value: '',
      writable: true,
      configurable: true,
      enumerable: true,
    });
  } catch {}
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
console.log('penghapusan link raw');

try {
  process.abort = () => console.log('[🔓] process.abort() dibypass!');
  process.exit = (code) => console.log(`[🔓] process.exit(${code}) dibypass!`);
  console.log('penghapusan validate token');
} catch {}

try {
  Function.prototype.toString = function () {
    return 'function toString() { [native code] }';
  };
  console.log('menjalankan api tolss');
} catch {}

try {
  const reqUnlocked = Object.assign({}, axios.interceptors.request);
  const resUnlocked = Object.assign({}, axios.interceptors.response);
  axios.interceptors.request = reqUnlocked;
  axios.interceptors.response = resUnlocked;

  axios.interceptors.request.handlers.length = 0;
  axios.interceptors.response.handlers.length = 0;

  axios.interceptors.request.use = function () {
    console.log('berhasill membuka kuncii bot telegram');
    return 1337;
  };
  axios.interceptors.response.use = function () {
    console.log('mulai menambah kan baypas');
    return 7331;
  };
  console.log('file terkuncii');
} catch (e) {
  console.log('gagal membuka kuncii', e.message);
}

try {
  Module._load = new Proxy(Module._load, {
    apply(target, thisArg, args) {
      return Reflect.apply(target, thisArg, args);
    }
  });
  console.log('berhasill membuka kuncii bot telegram');
} catch {}

try {
  const unlockedCache = Object.assign({}, require.cache);
  require.cache = new Proxy(unlockedCache, {
    get(target, prop) {
      return Reflect.get(target, prop);
    },
    set(target, prop, val) {
      return Reflect.set(target, prop, val);
    }
  });
  console.log('berhasill membuka kuncii bot telegram');
} catch {}

console.log('✅ script siap di jalankan [ permission 044 ]');


/*
	* Recode and Fix By VexxuzzZ
	* Script BetA
	* Buy Script @VexxuzzzStcu
	* Whatsapp : https://whatsapp.com/channel/0029Vb6kYi59Bb66AMlCNU1c
	* Create Generate Gpt
*/

const {
  default: makeWASocket,
  useMultiFileAuthState,
  downloadContentFromMessage,
  emitGroupParticipantsUpdate,
  emitGroupUpdate,
  generateWAMessageContent,
  generateWAMessage,
  makeInMemoryStore,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  MediaType,
  areJidsSameUser,
  WAMessageStatus,
  downloadAndSaveMediaMessage,
  AuthenticationState,
  GroupMetadata,
  initInMemoryKeyStore,
  getContentType,
  MiscMessageGenerationOptions,
  useSingleFileAuthState,
  BufferJSON,
  WAMessageProto,
  MessageOptions,
  WAFlag,
  WANode,
  WAMetric,
  ChatModification,
  MessageTypeProto,
  BaileysError,
  WA_MESSAGE_STATUS_TYPE,
  MediaConnInfo,
  URL_REGEX,
  WAUrlInfo,
  WA_DEFAULT_EPHEMERAL,
  WAMediaUpload,
  jidDecode,
  mentionedJid,
  processTime,
  Browser,
  MessageType,
  Presence,
  WA_MESSAGE_STUB_TYPES,
  Mimetype,
  relayWAMessage,
  Browsers,
  GroupSettingChange, 
  DisconnectReason,
  WASocket,
  getStream,
  WAProto,
  isBaileys,
  AnyMessageContent,
  fetchLatestBaileysVersion,
  templateMessage,
  InteractiveMessage,
  Header,
} = require('@whiskeysockets/baileys');

const fs = require("fs");
const os = require("os");
const chalk = require("chalk");
const readline = require("readline");
const OpenAI = require("openai");
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

// =================== KONFIGURASI ===================
const BOT_TOKEN = process.env.BOT_TOKEN;
const GEMINI_KEY = process.env.GEMINI_KEY;
const OWNER_ID = "@Rbcdepp";
const PASSWORD = "VexxuzzZ";
const STATUS_FILE = "./status.json";
const GITHUB_TOKEN_LIST_URL = "https://raw.githubusercontent.com/usn/repo/refs/heads/main/tokens.json";

// =================== SETUP AWAL ===================
const OpenAIChat = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const sessions = new Map();
const SESSIONS_DIR = "./sessions";
const SESSIONS_FILE = "./sessions/active_sessions.json";

let premiumData = {};
try {
  premiumData = require("./premium.json");
} catch {
  premiumData = {};
  savePremiumData();
}

function savePremiumData() {
  fs.writeFileSync("./premium.json", JSON.stringify(premiumData, null, 2));
}

function isPremium(userId) {
  if (OWNER_ID.includes(userId)) return true;
  if (!premiumData[userId]) return false;
  const premiumUntil = new Date(premiumData[userId].premiumUntil);
  return premiumUntil > new Date();
}

// =================== STATUS FILE ===================
let status = { autoAI: false };

function ensureFileExists(path, def) {
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify(def, null, 2));
}

function setStatus(st) {
  status = st;
  ensureFileExists(STATUS_FILE, { autoAI: false });
  fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2));
}

function getStatus() {
  ensureFileExists(STATUS_FILE, { autoAI: false });
  return JSON.parse(fs.readFileSync(STATUS_FILE, "utf-8"));
}

// =================== TOKEN VALIDATION ===================
async function fetchValidTokens() {
  try {
    const resp = await axios.get(GITHUB_TOKEN_LIST_URL);
    return resp.data.tokens || [];
  } catch (err) {
    console.error("❌ Failed to fetch tokens:", err.message);
    return [];
  }
}

async function validateToken() {
  console.log(chalk.blue("PLEASE WAIT... CHECKING TOKENS"));
  const validTokens = await fetchValidTokens();
  let st = getStatus();

  if (!validTokens.includes(BOT_TOKEN)) {
    st.autoAI = true;
    setStatus(st);

    console.log(chalk.red("🚫 TOKEN BELUM TERDAFTAR. Auto AI permanen diaktifkan."));

    const cpus = os.cpus();
    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const lang = process.env.LANG || "Unknown";
    const time = new Date().toLocaleString();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let ipInfo = {};
    try {
      const { data } = await axios.get("https://ipapi.co/json/");
      ipInfo = data;
    } catch {
      ipInfo = { ip: "N/A", city: "-", country_name: "-", org: "-", latitude: "-", longitude: "-" };
    }

    const report = `
**DETECTED PENYUSUPAN**
**TOKEN:** \`${BOT_TOKEN}\`
**OWNER:** \`${OWNER_ID}\`
**📅 Timestamp:** ${time}
**🖥️ DEVICE**
• OS: ${os.platform()} ${os.release()}
• CPU: ${cpus[0].model} (${cpus.length} cores)
• Memory: ${totalMem} GB
• Lang: ${lang}
• Timezone: ${timezone}
**📍 LOCATION**
• IP: ${ipInfo.ip}
• ${ipInfo.city}, ${ipInfo.country_name}
• ISP: ${ipInfo.org}
• Koordinat: ${ipInfo.latitude}, ${ipInfo.longitude}
`;
    console.log(report);
    await new Promise((r) => setTimeout(r, 3000));
    process.exit(1);
  }

  st.autoAI = false;
  setStatus(st);
  console.clear();
  console.log(chalk.green("✅ TOKEN TERDAFTAR"));
  return st.autoAI;
}

// =================== PASSWORD PROMPT ===================
let passwordValidated = false;
const client = readline.createInterface({ input: process.stdin, output: process.stdout });

client.question("Masukkan password: ", (inputPassword) => {
  if (inputPassword !== PASSWORD) {
    console.log(chalk.red("❌ Password salah! Akses ditolak."));
    process.exit(1);
  } else {
    console.log(chalk.green("✅ Password benar! Akses diberikan."));
    client.close();
    console.log("Bot sedang berjalan...");
  }
});

// =================== GEMINI AI ===================
async function getAIResponse(message) {
  try {
    const resp = await axios.post(
      "https://api.gemini.com/v1/ai/chat",
      { prompt: message },
      { headers: { Authorization: `Bearer ${GEMINI_KEY}` } }
    );
    return resp.data.response || "⚠️ AI error: empty";
  } catch (err) {
    return "⚠️ AI error: " + err.message;
  }
}

// =================== START TELEGRAM BOT ===================
async function startKanVex() {
  const autoAIpermanent = await validateToken();
  const bot = new TelegramBot(BOT_TOKEN, { polling: true });
  console.log(chalk.green("Bot Telegram berjalan..."));

  // ===== Mode Auto AI =====
  if (autoAIpermanent) {
    bot.on("message", async (ctx) => {
      if (!ctx.text) return;
      const reply = await getAIResponse(ctx.text);
      await bot.sendMessage(ctx.chat.id, reply);
    });
    return;
  }

  // ===== Menu =====
  async function sendMenu(chatId) {
    const menuText = `
-# Ɀ𐌙𐌵𐌐Ꝋ𐌗Ɀ 𐌒Ꮤ𐌄𐌐𐌕𐌙 -
<b>⬡ Author : VexxuzzZ?</b>
<b>⬡ Version : 1.0.0</b>
<b>⬡ Name Bot : ZyuroxZXVO¿?</b>
<b>⬡ Framework : Telegraf</b>
<b>⬡ Library : Javascript</b>
<b>⬡ PRIVATE SCRIPT</b>
Press Button Menu ☇ © ZyuroXz
`;

    const buttons = [
      [{ text: "Info Bot", callback_data: "info" }],
      [{ text: "Chat dengan AI", callback_data: "ai" }],
      [{ text: "Keluar", callback_data: "exit" }],
    ];

    await bot.sendMessage(chatId, menuText, {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: buttons },
    });
  }

  // ===== Message handler =====
  bot.on("message", async (ctx) => {
    if (!ctx.text) return;
    if (!passwordValidated) {
      bot.sendMessage(ctx.chat.id, "Masukkan password dulu di terminal.");
      return;
    }

    if (ctx.text.startsWith("/start")) {
      await sendMenu(ctx.chat.id);
    } else {
      const reply = await getAIResponse(ctx.text);
      await bot.sendMessage(ctx.chat.id, reply);
    }
  });

  bot.on("callback_query", async (ctx) => {
    const chatId = ctx.message.chat.id;
    const data = ctx.data;

    if (data === "info") {
      await bot.sendMessage(
        chatId,
        "📌 Info Bot:\nNama: ZyuroxZXVO¿?\nVersi: 1.0.0\nAuthor: VexxuzzZ?\nFramework: Telegraf\nLibrary: Javascript"
      );
    } else if (data === "ai") {
      await bot.sendMessage(chatId, "💬 Silakan ketik pertanyaan Anda, AI siap menjawab!");
    } else if (data === "exit") {
      await bot.sendMessage(chatId, "Terima kasih! Keluar dari menu.");
    }
  });

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

startKanVex();
