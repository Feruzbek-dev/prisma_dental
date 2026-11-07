"use client";

import { useEffect, useRef, useState } from "react";
import { MARK_FILL, MARK_STROKES, WORD_DENTAL, WORD_LETTERS } from "@/lib/logo-paths";

const MIN_TIME = 2600; // intro animatsiya to'liq ko'rinishi uchun (ms)
const MAX_TIME = 10000; // sayt sekin bo'lsa ham shundan keyin yopiladi
export const PRELOADER_KEY = "pd-intro-seen";

/**
 * Logo animatsiyasi. Sessiyada faqat birinchi kirishda ko'rsatiladi —
 * keyingi sahifa ochilishlarida darhol yashiriladi (Core Web Vitals / LCP uchun).
 * Kontent HTML'da to'liq bor, shuning uchun Google uni preloader'dan qat'i nazar o'qiydi.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const closed = useRef(false);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("pl-skip")) {
      setGone(true);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const hide = () => {
      if (closed.current) return;
      closed.current = true;
      setDone(true);
      html.classList.remove("pl-lock");
      try { sessionStorage.setItem(PRELOADER_KEY, "1"); } catch {}
      setTimeout(() => setGone(true), 700);
    };
    const onLoaded = () => setTimeout(hide, Math.max(0, (reduce ? 400 : MIN_TIME) - (performance.now() - start)));
    if (document.readyState === "complete") onLoaded();
    else window.addEventListener("load", onLoaded, { once: true });
    const t = setTimeout(hide, MAX_TIME);
    return () => { clearTimeout(t); window.removeEventListener("load", onLoaded); };
  }, []);

  if (gone) return null;

  return (
    <div id="prisma-loader" className={done ? "is-done" : undefined} role="status" aria-label="Sahifa yuklanmoqda">
      <svg className="pl-mark" viewBox="1494 0 3115 3040" aria-hidden="true">
        <g className="pl-spin"><g className="pl-intro">
          <g transform="translate(0,3100) scale(.1,-.1)">
            <path className="pl-fill" d={MARK_FILL} />
            {MARK_STROKES.map((d, i) => <path key={i} className="pl-stroke" pathLength={1} d={d} />)}
          </g>
        </g></g>
      </svg>
      <svg className="pl-word" viewBox="0 3679 6104 2022" aria-hidden="true">
        <g transform="translate(0,3600)"><g transform="translate(0,1250) scale(.1,-.1)">
          {WORD_LETTERS.map((d, i) => <path key={i} className="pl-letter" style={{ ["--i" as string]: i }} d={d} />)}
        </g></g>
        <g className="pl-dental" transform="translate(0,5150)"><g transform="translate(0,551) scale(.1,-.1)">
          {WORD_DENTAL.map((d, i) => <path key={i} d={d} />)}
        </g></g>
      </svg>
    </div>
  );
}
