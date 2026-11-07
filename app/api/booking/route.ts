import { NextResponse } from "next/server";

// Onlayn yozilish so'rovini klinikaning Telegram chatiga yuboradi.
// .env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

const hits = new Map<string, number[]>(); // oddiy rate-limit: IP boshiga 5 daqiqada 5 ta so'rov

const clean = (v: unknown, max = 300) =>
  String(v ?? "").replace(/[<>]/g, "").trim().slice(0, max);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 5 * 60_000);
  if (recent.length >= 5) return NextResponse.json({ ok: false, error: "too_many" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 20);
  if (!name || phone.replace(/\D/g, "").length < 12) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const service = clean(body.service, 60);
  const time = clean(body.time, 40);
  const note = clean(body.note, 600);

  const token = process.env.TELEGRAM_BOT_TOKEN;
  // Bir nechta qabul qiluvchi: TELEGRAM_CHAT_ID=111,222
  const chatIds = (process.env.TELEGRAM_CHAT_ID || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!token || chatIds.length === 0) {
    console.error("[booking] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID sozlanmagan");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const text = [
    "🦷 Yangi onlayn yozilish — Prisma Dental",
    `Ism: ${name}`,
    `Telefon: ${phone}`,
    `Xizmat: ${service || "—"}`,
    `Qulay vaqt: ${time || "—"}`,
    note ? `Izoh: ${note}` : null,
  ].filter(Boolean).join("\n");

  // Hech bo'lmasa bitta chatga yetib borsa — so'rov qabul qilingan hisoblanadi.
  const results = await Promise.all(chatIds.map(async (chatId) => {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    }).catch(() => null);
    if (!tg?.ok) console.error("[booking] Telegram xatosi", chatId, tg?.status, await tg?.text());
    return !!tg?.ok;
  }));
  if (!results.some(Boolean)) return NextResponse.json({ ok: false }, { status: 502 });
  return NextResponse.json({ ok: true });
}
