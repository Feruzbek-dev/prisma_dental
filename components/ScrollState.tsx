"use client";

import { useEffect } from "react";

// Sahifa pastga aylantirilganda <html data-scrolled> — header ixchamlanadi (CSS'da).
export default function ScrollState() {
  useEffect(() => {
    const html = document.documentElement;
    const update = () => html.toggleAttribute("data-scrolled", window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return null;
}
