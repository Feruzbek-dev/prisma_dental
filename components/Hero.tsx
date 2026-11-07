"use client";

import { useEffect, useState } from "react";
import { animate, motion, MotionConfig, type Variants } from "motion/react";
import { clinic } from "@/lib/site";
import { Icon } from "./Icon";
import { Mark } from "./Logo";

const BLUE = "#0250B5";
const EASE = [0.2, 0.8, 0.2, 1] as const; // preloader harflari bilan bir xil egri

// Preloader yopila boshlaganini kutadi (yoki sessiyada u o'tkazib yuborilgan bo'lsa — darhol).
function useIntro() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (document.documentElement.classList.contains("pl-done")) return setReady(true);
    const go = () => setReady(true);
    window.addEventListener("pd:intro", go, { once: true });
    return () => window.removeEventListener("pd:intro", go);
  }, []);
  return ready;
}

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: d } }),
};

// Sarlavha qatorlari niqob ichidan ko'tariladi — preloaderdagi "PRISMA" harflari kabi.
const line: Variants = {
  hidden: { y: "105%" },
  shown: (i: number) => ({ y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.05 + i * 0.12 } }),
};

const H1_LINES = ["Aniq tashxis.", "Og‘riqsiz davolash.", "Ishonchli tabassum."];

function CountUp({ to, run, suffix = "" }: { to: number; run: boolean; suffix?: string }) {
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to);
    setN(0);
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.6, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [run, to]);
  return <>{n.toLocaleString("ru-RU").replace(/ /g, " ")}{suffix}</>;
}

export default function Hero() {
  const ready = useIntro();
  const state = ready ? "shown" : "hidden";

  return (
    <MotionConfig reducedMotion="user">
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <motion.div className="hero-copy" initial="hidden" animate={state}>
            <motion.p className="eyebrow" variants={rise} custom={0}>{clinic.slogan}</motion.p>
            <h1 id="hero-title">
              {H1_LINES.map((t, i) => (
                <span className="h1-line" key={t}>
                  <motion.span className={i === 2 ? "h1-accent" : undefined} variants={line} custom={i}>{t}</motion.span>
                </span>
              ))}
            </h1>
            <motion.p className="hero-lead" variants={rise} custom={0.45}>
              Terapiya, ortopediya, jarrohlik, implantatsiya va ortodontiya — barchasi bir klinikada. Har bir qadamni oldindan ko‘rasiz va narxni oldindan bilasiz.
            </motion.p>
            <motion.div className="hero-actions" variants={rise} custom={0.55}>
              <a className="btn btn-primary" href="#aloqa">Qabulga yozilish</a>
              <a className="btn btn-ghost" href="#xizmatlar">Xizmatlar va narxlar</a>
            </motion.div>
            <motion.dl className="hero-facts" variants={rise} custom={0.65}>
              <div><dt><CountUp to={10} run={ready} /> yil</dt><dd>amaliy tajriba</dd></div>
              <div><dt><CountUp to={1000} run={ready} suffix="+" /></dt><dd>bemor</dd></div>
              <div><dt><CountUp to={5} run={ready} /></dt><dd>yo‘nalish bir joyda</dd></div>
            </motion.dl>
          </motion.div>

          <div className="hero-visual">
            {/* Haqiqiy surat qo'yilganda: <Image src="/hero.jpg" alt="..." fill priority sizes="(max-width:860px) 100vw, 45vw" /> */}
            <motion.div
              className="hero-photo"
              initial={{ clipPath: "inset(12% 12% 12% 12% round 32px)", opacity: 0 }}
              animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 32px)", opacity: 1 } : undefined}
              transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
            >
              [Surat: shifokor bemor bilan — yorug‘ kabinet, tabiiy yorug‘lik]
            </motion.div>
            {/* Preloaderdagi rozetka shu yerga "qo'nadi": aylanib, kichrayib, xira fon belgisiga aylanadi. */}
            <motion.div
              className="hero-rosette-wrap"
              initial={{ opacity: 0, scale: 1.6, rotate: -90 }}
              animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
              transition={{ duration: 1.6, ease: EASE }}
            >
              <Mark className="hero-rosette" />
            </motion.div>
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, x: -24 }}
              animate={ready ? { opacity: 1, x: 0 } : undefined}
              transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.85 }}
            >
              <div className="dot"><Icon name="clock" size={22} color={BLUE} /></div>
              <div><b>Qabul vaqti</b><span>{clinic.hours.days}, [{clinic.hours.open}–{clinic.hours.close}]</span></div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
