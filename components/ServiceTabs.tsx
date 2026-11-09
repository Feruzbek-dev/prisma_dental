"use client";

import { useState } from "react";
import { serviceTabs, type Service, type TabId } from "@/lib/site";

// Barcha panellar HTML'da bor (SEO), faqat faol tab ko'rinadi.
export default function ServiceTabs({ services }: { services: Service[] }) {
  const [active, setActive] = useState<TabId>(serviceTabs[0].id);

  function onKey(e: React.KeyboardEvent, i: number) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    const next = serviceTabs[(i + dir + serviceTabs.length) % serviceTabs.length].id;
    setActive(next);
    document.getElementById(`tab-${next}`)?.focus();
  }

  return (
    <>
      <div className="svc-tabs reveal" role="tablist" aria-label="Xizmat turlari">
        {serviceTabs.map((t, i) => (
          <button
            key={t.id} id={`tab-${t.id}`} type="button" role="tab"
            className={`svc-tab${active === t.id ? " active" : ""}`}
            aria-selected={active === t.id} aria-controls={`panel-${t.id}`} tabIndex={active === t.id ? 0 : -1}
            onClick={() => setActive(t.id)} onKeyDown={(e) => onKey(e, i)}
          >{t.label}</button>
        ))}
      </div>
      {serviceTabs.map((t) => (
        <div key={t.id} id={`panel-${t.id}`} role="tabpanel" aria-labelledby={`tab-${t.id}`} className={`svc-panel${active === t.id ? " active" : ""}`}>
          <div className="price-grid">
            {services.filter((s) => s.tab === t.id).map((s) => (
              <article className={`price-card${s.featured ? " featured" : ""}`} key={s.slug} id={s.slug}>
                {s.badge && <span className="pc-badge">{s.badge}</span>}
                <h3 className="pc-name">{s.name}</h3>
                <p className="pc-sub">{s.title}</p>
                <p className="pc-meta">{s.meta}</p>
                <p className="pc-price">{s.price} {s.unit && <span>{s.unit}</span>}</p>
                <div className="pc-block">
                  <p className="pc-block-title"><span className="facet" aria-hidden="true" />Nima kiradi</p>
                  <ul>{s.items.map((i) => <li key={i}><span className="facet" aria-hidden="true" />{i}</li>)}</ul>
                </div>
                <div className="pc-block">
                  <p className="pc-block-title"><span className="facet" aria-hidden="true" />Kimga mos</p>
                  <p>{s.fit}</p>
                </div>
                <a className="pc-btn" href="#aloqa">Yozilish →</a>
              </article>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
