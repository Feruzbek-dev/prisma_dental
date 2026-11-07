"use client";

import { useState } from "react";
import { motion } from "motion/react";

type Item = { q: string; a: string };

// Javoblar HTML'da doim bor (SEO); yopiq holatda balandligi 0 va `inert`.
export default function FaqList({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className="faq-item" key={f.q} data-open={isOpen || undefined}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{f.q}</span>
                <motion.span className="faq-sign" aria-hidden="true" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 26 }}>+</motion.span>
              </button>
            </h3>
            <motion.div
              id={`faq-${i}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
              className="faq-answer"
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ height: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }, opacity: { duration: 0.25, delay: isOpen ? 0.08 : 0 } }}
              inert={!isOpen}
            >
              <p>{f.a}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
