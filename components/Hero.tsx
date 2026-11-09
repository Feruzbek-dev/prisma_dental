"use client";

import { useEffect, useState } from "react";
import { animate, motion, MotionConfig, type Variants } from "motion/react";
import { clinic } from "@/lib/site";
import { Icon } from "./Icon";
import { Mark } from "./Logo";

const EASE = [0.22, 0.61, 0.36, 1] as const;

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
  hidden: { opacity: 0, y: 22 },
  shown: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: d } }),
};

// Sarlavha qatorlari niqob ichidan ko'tariladi.
const line: Variants = {
  hidden: { y: "110%", opacity: 0 },
  shown: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: EASE, delay: 0.2 + i * 0.17 } }),
};

function CountUp({ to, run, suffix = "" }: { to: number; run: boolean; suffix?: string }) {
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to);
    setN(0);
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.9, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [run, to]);
  return <>{n.toLocaleString("ru-RU").replace(/\s/g, " ")}{suffix}</>;
}

export default function Hero() {
  const ready = useIntro();
  const state = ready ? "shown" : "hidden";

  return (
    <MotionConfig reducedMotion="user">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-atmo" aria-hidden="true">
          <div className="hero-grid-lines" />
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        {/* Logodagi rozetka — fonda sekin aylanadi */}
        <motion.div
          className="hero-rosette-wrap" aria-hidden="true"
          initial={{ opacity: 0, scale: 1.4, rotate: -90 }}
          animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <Mark className="hero-rosette" />
        </motion.div>
        <Mark className="hero-rosette small" />

        <div className="wrap hero-grid">
          <motion.div className="hero-copy" initial="hidden" animate={state}>
            <motion.p className="eyebrow" variants={rise} custom={0.1}><span className="facet" aria-hidden="true" />Terapiya · Implantatsiya · Ortodontiya · Raqamli stomatologiya</motion.p>
            <h1 id="hero-title">
              <span className="h1-line"><motion.span variants={line} custom={0}><span className="hl">Aniq tashxis</span>, og‘riqsiz</motion.span></span>
              <span className="h1-line"><motion.span variants={line} custom={1}>davolash — <span className="hl">ishonchli</span> tabassum.</motion.span></span>
            </h1>
            <motion.p className="lead" variants={rise} custom={0.6}>{clinic.slogan}</motion.p>
            <motion.div className="cta-row" variants={rise} custom={0.75}>
              <a className="btn btn-primary" href="#aloqa">Qabulga yozilish <Icon name="arrow" size={18} strokeWidth={2} /></a>
              <a className="btn btn-ghost" href="#xizmatlar">Xizmatlar va narxlar</a>
            </motion.div>
            <motion.dl className="stat-strip" variants={rise} custom={0.9}>
              <div className="stat"><dt className="n"><CountUp to={10} run={ready} />+</dt><dd className="l">yillik amaliy tajriba</dd></div>
              <div className="stat"><dt className="n"><CountUp to={1000} run={ready} />+</dt><dd className="l">mamnun bemor</dd></div>
              <div className="stat"><dt className="n">3D</dt><dd className="l">Raqamli diagnostika va rejalashtirish</dd></div>
              <div className="stat"><dt className="n"><CountUp to={5} run={ready} /></dt><dd className="l">yo‘nalish bir klinikada</dd></div>
            </motion.dl>
          </motion.div>

          <motion.div
            className="hero-video"
            initial={{ opacity: 0, y: 40, rotateY: -8 }}
            animate={ready ? { opacity: 1, y: 0, rotateY: 0 } : undefined}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          >
            <div className="video-halo" aria-hidden="true" />
            {/* Video qo'yilganda: <video src="/hero.mp4" autoPlay muted loop playsInline /> */}
            <div className="video-frame"><div className="video-ph">[Video yoki surat: klinikadagi ish jarayoni, vertikal 9:16]</div></div>
            <span className="vid-caption"><span className="facet" aria-hidden="true" />Klinikamizda ish jarayoni</span>
          </motion.div>
        </div>
        <div className="hero-fade" aria-hidden="true" />
      </section>
    </MotionConfig>
  );
}
