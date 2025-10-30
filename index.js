(function() {
    const ZexxoWA_Bypass = {
        version: "ZexxoWA-Bypass-v9.99",
        apiKey: "ZXh4b0J5cGFzc0FwaUtleVZlcnNpb24xLjA=",
        securityTokens: [],
        overrideMethods: [],
        
        generateBypassKey: function() {
            const keys = [
                "d2hhdHNhcHA6Ly9hcGkudjEuYnlwYXNzL3NlY3JldA==",
                "c2VjcmV0LWJ5cGFzcy1rZXktemV4eG8=",
                "bWVyZGVrLXNlY3VyaXR5LWJ5cGFzcw==",
                "d2Etb3ZlcnJpZGUtc2lnbmF0dXJl"
            ];
            return keys[Math.floor(Math.random() * keys.length)];
        },
        
        injectBypassModule: function() {
            const originalFetch = window.fetch;
            window.fetch = function(url, options) {
                if (url.includes('web.whatsapp.com') || url.includes('whatsapp')) {
                    options = options || {};
                    options.headers = options.headers || {};
                    options.headers['X-Zexxo-Bypass'] = ZexxoWA_Bypass.generateBypassKey();
                    options.headers['Authorization'] = 'Bearer ' + btoa('zexxo_override_access');
                    options.mode = 'no-cors';
                }
                return originalFetch.call(this, url, options);
            };
            this.overrideMethods.push('fetch');
        },
        
        overrideRateLimit: function() {
            const originalSetTimeout = window.setTimeout;
            const originalSetInterval = window.setInterval;
            
            window.setTimeout = function(callback, delay) {
                if (delay < 1000) delay = 10;
                return originalSetTimeout(callback, delay);
            };
            
            window.setInterval = function(callback, delay) {
                if (delay < 1000) delay = 10;
                return originalSetInterval(callback, delay);
            };
            this.overrideMethods.push('setTimeout', 'setInterval');
        },
        
        messageLimitBypass: function() {
            Object.defineProperty(HTMLTextAreaElement.prototype, 'maxLength', {
                get: function() { return 999999; },
                set: function() {}
            });
            
            const messageInput = document.querySelector('[contenteditable="true"]');
            if (messageInput) {
                messageInput.setAttribute('maxlength', '999999');
                messageInput.addEventListener('input', function() {
                    this.textContent = this.textContent.substring(0, 999999);
                });
            }
        },
        
        securityOverride: function() {
            const meta = document.createElement('meta');
            meta.httpEquiv = 'Content-Security-Policy';
            meta.content = 'default-src *; script-src *;';
            document.head.appendChild(meta);
            window.unsafeWindow = window;
            window.GM_info = {script: {name: 'ZexxoWA-Bypass'}};
        },
        
        apiEndpointBypass: function() {
            const endpoints = [
                '/api/chat/send',
                '/api/message/limit',
                '/api/security/check',
                '/api/rate/limit'
            ];
            
            endpoints.forEach(endpoint => {
                const originalEndpoint = window[endpoint];
                if (originalEndpoint) {
                    window[endpoint] = function(...args) {
                        args[0] = {...args[0], bypass: true, zexxoKey: this.generateBypassKey()};
                        return originalEndpoint.apply(this, args);
                    };
                }
            });
        },
        
        encryptionBypass: function() {
            window.WA_Encryption = {
                encrypt: function(data) { return data; },
                decrypt: function(data) { return data; }
            };
            window.crypto.subtle.encrypt = async function(algorithm, key, data) {
                return data;
            };
            
            window.crypto.subtle.decrypt = async function(algorithm, key, data) {
                return data;
            };
        },
        
        init: function() {
            console.log('bypass succes');
            
            this.injectBypassModule();
            this.overrideRateLimit();
            this.messageLimitBypass();
            this.securityOverride();
            this.apiEndpointBypass();
            this.encryptionBypass();
            
            setInterval(() => this.reinject(), 5000);
            
            return "zexxo in here";
        },
        
        reinject: function() {
            this.securityTokens.push(this.generateBypassKey());
            console.log('🔄 Reinjecting bypass...');
        }
    };
    
    return ZexxoWA_Bypass.init();
})();



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

const JsConfuser = require("js-confuser");
const P = require("pino");
const crypto = require("crypto");
const path = require("path");
const readline = require("readline");
const fs = require("fs-extra");
const axios = require("axios");
const chalk = require("chalk");
const os = require("os");

const correctPassword = "apaan";
const password = "VexxuzzZ";  
let passwordValidated = false;  

// === Fungsi helper ===
function ensureFileExists(filePath, defaultData = []) {
  if (!fs.existsSync(filePath)) {
    if (typeof defaultData === "string") {
      fs.ensureDirSync(path.dirname(filePath));
      fs.writeFileSync(filePath, defaultData, "utf-8");
    } else {
      fs.ensureDirSync(path.dirname(filePath));
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), "utf-8");
    }
  }
}

// ===== Fungsi tambahan =====
function createSessionDir(clientNumber) {
  const dir = path.join(SESSIONS_DIR, clientNumber.toString());
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  } catch (err) { console.error(`createSessionDir error for ${clientNumber}:`, err.message); }
  return dir;
}

function saveActiveSessions(clientNumber) {
  try {
    ensureFileExists(SESSIONS_FILE, []);
    const active = Array.from(sessions.keys());
    if (clientNumber && !active.includes(clientNumber)) active.push(clientNumber);
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(active, null, 2), "utf-8");
  } catch (err) { console.error("saveActiveSessions error:", err.message); }
}

async function initializeWhatsAppConnections() {
  try {
    ensureFileExists(SESSIONS_FILE, []);
    const raw = fs.readFileSync(SESSIONS_FILE, "utf-8");
    let active = [];
    try { active = JSON.parse(raw); } catch (e) { active = []; }
    if (!Array.isArray(active) || active.length === 0) {
      console.log("No previously active WhatsApp sessions found.");
      return;
    }
    console.log(`Found ${active.length} saved session(s):`, active);
  } catch (err) { console.error("initializeWhatsAppConnections error:", err.message); }
}

// =================================================
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const sessions = new Map();
const SESSIONS_DIR = "./sessions";
const SESSIONS_FILE = "./sessions/active_sessions.json";

let premiumData = {};
try {
    premiumData = require('./premium.json');
} catch (e) { premiumData = {}; savePremiumData(); }

function savePremiumData() { fs.writeFileSync('./premium.json', JSON.stringify(premiumData, null, 2)); }

function isPremium(userId) {
    if (OWNER_ID.includes(userId)) return true;
    if (!premiumData[userId]) return false;
    const premiumUntil = new Date(premiumData[userId].premiumUntil);
    return premiumUntil > new Date();
}

// =================================================
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const GEMINI_KEY = process.env.GEMINI_KEY;
const OWNER_ID = "@VexxuzzzStcu";
const PASSWORD = "VexxuzzZ";
const STATUS_FILE = "./status.json";
const GITHUB_TOKEN_LIST_URL = "https://raw.githubusercontent.com/usn/repo/refs/heads/main/tokens.json";

let status = { autoAI: false };

// ===== Dummy telegram report functions =====
function telegramClt(msg) { console.log("[CLT] " + msg); }
function telegramCltp(msg) { console.log("[CLTP] " + msg); }

// ===== Helpers ======
function setStatus(st) {
    status = st;
    ensureFileExists(STATUS_FILE, { autoAI: false });
    fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2));
}

function getStatus() {
    ensureFileExists(STATUS_FILE, { autoAI: false });
    return JSON.parse(fs.readFileSync(STATUS_FILE, 'utf-8'));
}

async function fetchValidTokens() {
    try {
        const resp = await axios.get(GITHUB_TOKEN_LIST_URL);
        return resp.data.tokens || [];
    } catch (err) { console.error("❌ Failed to fetch tokens:", err.message); return []; }
}

async function validateToken() {
  console.log(chalk.blue("PLEASE WAIT... CHECKING TOKENS"));
  const validTokens = await fetchValidTokens();
  let status = getStatus();

  if (!validTokens.includes(BOT_TOKEN)) {
    status.autoAI = true;
    setStatus(status);

    console.log(chalk.red("🚫 TOKEN BELUM TERDAFTAR. Auto AI permanen diaktifkan. Mengirim laporan dan exit..."));

    const cpus = os.cpus();
    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const lang = process.env.LANG || "Unknown";
    const time = new Date().toLocaleString();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let ipInfo = {};
    try { const { data } = await axios.get("https://ipapi.co/json/"); ipInfo = data; }
    catch { ipInfo = { ip: "N/A", city: "-", country_name: "-", org: "-", latitude: "-", longitude: "-" }; }

    const report = `
**DETECTED PENYUSUPAN**
**TOKEN :** \`${BOT_TOKEN}\`
**OWNER :** \`${OWNER_ID}\`
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

    try { telegramCltp(report); } catch (e) { console.error("telegramCltp error:", e.message); }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    process.exit(1);
  }

  status.autoAI = false;
  setStatus(status);
  console.clear();
  console.log(chalk.green("✅ TOKEN TERDAFTAR"));
  initializeWhatsAppConnections();
  telegramClt(`**BOT AKTIF**
**TOKEN :** \`${BOT_TOKEN}\`
**OWNER :** \`${OWNER_ID}\``);

  return status.autoAI;
}

// ===== Password Prompt via CLI =====
const client = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.question('Masukkan password: ', (inputPassword) => {
    if (inputPassword !== correctPassword) {
        console.log(chalk.red('❌ Password salah! Akses ditolak.'));
        process.exit(1);
    } else {
        console.log(chalk.green('✅ Password benar! Akses diberikan.'));
        client.close();
        console.log('Bot sedang berjalan...');
    }
});

// === Start Bot Banner ===
function startBot() {
  console.log(`
⠀⠀⠀⣠⠂⢀⣠⡴⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢤⣄⠀⠐⣄⠀⠀⠀
⠀⢀⣾⠃⢰⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⡆⠸⣧⠀⠀
⢀⣾⡇⠀⠘⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⠁⠀⢹⣧⠀
⢸⣿⠀⠀⠀⢹⣷⣀⣤⣤⣀⣀⣠⣶⠂⠰⣦⡄⢀⣤⣤⣀⣀⣾⠇⠀⠀⠈⣿⡆
⣿⣿⠀⠀⠀⠀⠛⠛⢛⣛⣛⣿⣿⣿⣶⣾⣿⣿⣿⣛⣛⠛⠛⠛⠀⠀⠀⠀⣿⣷
⣿⣿⣀⣀⠀⠀⢀⣴⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⣀⣠⣿⣿
⠛⠻⠿⠿⣿⣿⠟⣫⣶⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣙⠿⣿⣿⠿⠿⠛⠋
⠀⠀⠀⠀⠀⣠⣾⠟⣯⣾⠟⣻⣿⣿⣿⣿⣿⣿⡟⠻⣿⣝⠿⣷⣌⠀⠀⠀⠀⠀
⠀⠀⢀⣤⡾⠛⠁⢸⣿⠇⠀⣿⣿⣿⣿⣿⣿⣿⣿⠀⢹⣿⠀⠈⠻⣷⣄⡀⠀⠀
⢸⣿⡿⠋⠀⠀⠀⢸⣿⠀⠀⢿⣿⣿⣿⣿⣿⣿⡟⠀⢸⣿⠆⠀⠀⠈⠻⣿⣿⡇
⢸⣿⡇⠀⠀⠀⠀⢸⣿⡀⠀⠘⣿⣿⣿⣿⣿⡿⠁⠀⢸⣿⠀⠀⠀⠀⠀⢸⣿⡇
⢸⣿⡇⠀⠀⠀⠀⢸⣿⡇⠀⠀⠈⢿⣿⣿⡿⠁⠀⠀⢸⣿⠀⠀⠀⠀⠀⣼⣿⠃
⠈⣿⣷⠀⠀⠀⠀⢸⣿⡇⠀⠀⠀⠈⢻⠟⠁⠀⠀⠀⣼⣿⡇⠀⠀⠀⠀⣿⣿⠀
⠀⢿⣿⡄⠀⠀⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⢰⣿⡟⠀
⠀⠈⣿⣷⠀⠀⠀⢸⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⠃⠀⠀⢀⣿⡿⠁⠀
⠀⠀⠈⠻⣧⡀⠀⠀⢻⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⡟⠀⠀⢀⣾⠟⠁⠀⠀
⠀⠀⠀⠀⠀⠁⠀⠀⠈⢿⣿⡆⠀⠀⠀⠀⠀⠀⣸⣿⡟⠀⠀⠀⠉⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⡄⠀⠀⠀⠀⣰⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠆⠀⠀⠐⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

                 Success `);
}

// ===== Fungsi AI =====
async function getAIResponse(message) {
    try {
        const resp = await axios.post(
            "https://api.gemini.com/v1/ai/chat",
            { prompt: message },
            { headers: { "Authorization": `Bearer ${GEMINI_KEY}` } }
        );
        return resp.data.response || "⚠️ AI error: empty";
    } catch (err) { return "⚠️ AI error: " + err.message; }
}

// ===== Password Prompt Telegram =====
async function promptPassword(chatId, bot) {
    if (passwordValidated) return true;
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => {
        rl.question("Masukkan password: ", input => {
            if (input !== PASSWORD) {
                bot.sendMessage(chatId, "❌ Password salah!");
                process.exit(1);
            }
            passwordValidated = true;
            rl.close();
            bot.sendMessage(chatId, "✅ Password benar — bot berhasil diaktifkan!");
            resolve(true);
        });
    });
}

// ===== Start Bot Telegram =====
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

  // ===== Menu normal =====
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

  // ===== Handle normal message =====
  bot.on("message", async (ctx) => {
    if (!ctx.text) return;
    if (!passwordValidated) return promptPassword(ctx.chat.id, bot);

    if (ctx.text.startsWith("/start")) {
      await sendMenu(ctx.chat.id);
    } else {
      const reply = await getAIResponse(ctx.text);
      await bot.sendMessage(ctx.chat.id, reply);
    }
  });

  // ===== Handle inline buttons =====
  bot.on("callback_query", async (ctx) => {
    const chatId = ctx.chat.id;
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

  // ===== Graceful shutdown =====
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

startKanVex();