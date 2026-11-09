"use client";

import { useEffect } from "react";

// 1) <html data-scrolled> — header qorong'i fonga o'tadi va ixchamlanadi.
// 2) --sp — yuqoridagi scroll progress chizig'i.
// 3) .reveal / .reveal-3d / .stagger / .section-head ekranga kirganda "in" klassini oladi.
export default function ScrollState() {
  useEffect(() => {
    const html = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = html.scrollHeight - window.innerHeight;
      html.toggleAttribute("data-scrolled", window.scrollY > 24);
      html.style.setProperty("--sp", String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal, .reveal-3d, .stagger, .section-head").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="scroll-progress" aria-hidden="true" />;
}
