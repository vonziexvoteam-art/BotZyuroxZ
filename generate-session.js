// generate-session.js
// Usage: node generate-session.js
// Requires: npm install telegram input

const fs = require('fs');
const path = require('path');
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');

// Optional: input package to prompt in terminal
// npm install input
const input = require('input');

async function run() {
  try {
      // Ambil dari env jika kamu sudah set, kalau belum akan minta input
          const apiId = process.env.TELEGRAM_API_ID ? Number(process.env.TELEGRAM_API_ID) : await input.text('Masukkan API ID (angka): ');
              const apiHash = process.env.TELEGRAM_API_HASH || await input.text('Masukkan API HASH: ');

                  // Pastikan apiId numeric
                      const apiIdNum = Number(apiId);
                          if (!apiIdNum || !apiHash) {
                                console.error('API ID dan API HASH wajib diisi (dari my.telegram.org).');
                                      process.exit(1);
                                          }

                                              // Inisialisasi StringSession kosong
                                                  const stringSession = new StringSession('');

                                                      console.log('\nMencoba login ke Telegram. Kamu akan diminta nomor & kode OTP.');
                                                          const client = new TelegramClient(stringSession, apiIdNum, apiHash, {
                                                                connectionRetries: 5,
                                                                    });

                                                                        await client.start({
                                                                              phoneNumber: async () => await input.text('Masukkan nomor telepon (contoh: +628123...): '),
                                                                                    phoneCode: async () => await input.text('Masukkan kode OTP yang dikirim Telegram: '),
                                                                                          password: async () => await input.text('Masukkan password 2FA (jika ada), atau kosongkan: '),
                                                                                                onError: (err) => console.error('Error saat login:', err),
                                                                                                    });

                                                                                                        // Dapatkan string session yang valid
                                                                                                            const saved = client.session.save();
                                                                                                                console.log('\n=== StringSession berhasil dibuat ===\n');
                                                                                                                    console.log(saved);
                                                                                                                        console.log('\n=====================================');

                                                                                                                            // Opsi: simpan ke file .session (opsional)
                                                                                                                                const outFile = path.join(process.cwd(), 'telegram_session.txt');
                                                                                                                                    fs.writeFileSync(outFile, saved, { encoding: 'utf8' });
                                                                                                                                        console.log(`\nStringSession juga disimpan di: ${outFile}\n`);

                                                                                                                                            // Tutup client
                                                                                                                                                await client.disconnect();
                                                                                                                                                    process.exit(0);
                                                                                                                                                      } catch (err) {
                                                                                                                                                          console.error('Gagal membuat session:', err);
                                                                                                                                                              process.exit(1);
                                                                                                                                                                }
                                                                                                                                                                }

                                                                                                                                                                run();
