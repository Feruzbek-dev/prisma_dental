"use client";

import { useEffect, useState } from "react";
import { clinic } from "@/lib/site";

// Toshkent vaqti (UTC+5) bo'yicha klinika hozir ochiqmi. Du–Sha ishlaydi, yakshanba dam.
function isOpenNow() {
  const now = new Date(Date.now() + 5 * 3600_000);
  const day = now.getUTCDay();
  const mins = now.getUTCHours() * 60 + now.getUTCMinutes();
  const toMin = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  return day !== 0 && mins >= toMin(clinic.hours.open) && mins < toMin(clinic.hours.close);
}

export default function OpenStatus() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const tick = () => setOpen(isOpenNow());
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={`status ${open === null ? "" : open ? "open" : "closed"}`} aria-live="polite">
      <span className="dot" />
      <span>{open === null ? " " : open ? "Hozir ochiq" : "Hozir yopiq"}</span>
    </div>
  );
}
