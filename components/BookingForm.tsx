"use client";

import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { bookingServices, bookingTimes, clinic } from "@/lib/site";
import { Icon } from "./Icon";

type Status = { kind: "idle" | "sending" | "ok" | "error"; text?: string };

export default function BookingForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [time, setTime] = useState(bookingTimes[0]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const name = (data.name || "").trim();
    const digits = (data.phone || "").replace(/\D/g, "");
    if (!name || digits.length < 9) {
      setStatus({ kind: "error", text: "Iltimos, ismingiz va to‘liq telefon raqamingizni kiriting." });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, name, phone: "+998" + digits.slice(-9) }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ kind: "ok", text: `Rahmat, ${name}! So‘rovingiz qabul qilindi — tez orada qo‘ng‘iroq qilamiz.` });
      form.reset();
      setTime(bookingTimes[0]);
    } catch {
      setStatus({ kind: "error", text: `So‘rovni yuborib bo‘lmadi. Iltimos, ${clinic.phoneDisplay} raqamiga qo‘ng‘iroq qiling.` });
    }
  }

  return (
    // Karta dizayni tashqi div'da: ba'zi brauzer kengaytmalari <form> padding/radius'ini !important bilan nolga tushiradi.
    <MotionConfig reducedMotion="user">
    <div className="form">
    <form className="form-body" onSubmit={onSubmit} noValidate>
      <div className="form-head">
        <h3>Onlayn yozilish</h3>
        <span className="form-time">≈ 1 daqiqa</span>
      </div>

      <div className="field">
        <label htmlFor="f-name">Ismingiz</label>
        <input id="f-name" name="name" type="text" autoComplete="name" placeholder="Masalan, Dilnoza" required />
      </div>

      <div className="field">
        <label htmlFor="f-phone">Telefon raqamingiz</label>
        <div className="phone">
          <span className="phone-code">+998</span>
          <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="90 123 45 67" required />
        </div>
      </div>

      <fieldset className="field">
        <legend>Qaysi xizmat kerak?</legend>
        <div className="chips">
          {bookingServices.map((s, i) => (
            <label className="chip" key={s}><input type="radio" name="service" value={s} defaultChecked={i === 0} /><span>{s}</span></label>
          ))}
        </div>
      </fieldset>

      <fieldset className="field">
        <legend>Qulay vaqt</legend>
        <div className="segment">
          {bookingTimes.map((t) => (
            <label key={t}>
              <input type="radio" name="time" value={t} checked={time === t} onChange={() => setTime(t)} />
              {time === t && <motion.i className="segment-pill" layoutId="segment-pill" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="f-note">Nima bezovta qilyapti? <span>(ixtiyoriy)</span></label>
        <textarea id="f-note" name="note" rows={3} placeholder="Masalan: pastki tishim sovuqqa sezgir bo‘lib qoldi" />
      </div>

      <button className="btn btn-primary btn-submit" type="submit" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Yuborilmoqda…" : "Qabulga yozilish"} <Icon name="arrow" size={18} strokeWidth={2} />
      </button>
      <div role="status" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {status.text && (
            <motion.p
              key={status.kind + status.text}
              className={`form-ok${status.kind === "error" ? " is-error" : ""}`}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            >
              {status.kind === "ok" && (
                <svg className="form-ok-check" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <motion.circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                  <motion.path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, delay: 0.4 }} />
                </svg>
              )}
              <span>{status.text}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <p className="form-note"><Icon name="lock" size={14} strokeWidth={2} />Ma’lumotlaringiz faqat qabulni belgilash uchun ishlatiladi.</p>
    </form>
    </div>
    </MotionConfig>
  );
}
