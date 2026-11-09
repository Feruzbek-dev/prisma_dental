import { cases, clinic, doctor, faq, nav, reviews, services, steps } from "@/lib/site";
import { Icon, Stars } from "./Icon";
import { Brand, Mark } from "./Logo";
import BookingForm from "./BookingForm";
import FaqList from "./FaqList";
import ServiceTabs from "./ServiceTabs";
import OpenStatus from "./OpenStatus";

const address = `${clinic.address.district}, ${clinic.address.street}`;
const hours = `${clinic.hours.days} · ${clinic.hours.open}–${clinic.hours.close}`;

// Romb belgi — sarlavha va ro'yxatlardagi "prizma" qirrasi.
export const Facet = () => <span className="facet" aria-hidden="true" />;

function Head({ eyebrow, title, id, text, line = true }: { eyebrow: string; title: string; id: string; text?: string; line?: boolean }) {
  return (
    <div className="section-head reveal">
      <p className="eyebrow"><Facet />{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {text && <p>{text}</p>}
      {line && <div className="accent-line" />}
    </div>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <div className="hcol left">
          <a className="addr" href={clinic.mapUrl} target="_blank" rel="noopener noreferrer"><Icon name="pin" size={16} />{address}</a>
          <a className="ph" href={`tel:${clinic.phone}`}><Icon name="phone" size={16} />{clinic.phoneDisplay}</a>
        </div>
        <div className="hcol center"><Brand /></div>
        <div className="hcol right">
          <div className="hours">{hours}</div>
          <OpenStatus />
        </div>
      </div>
    </header>
  );
}

export function About() {
  return (
    <section className="about" id="klinika" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div className="about-left reveal">
          <p className="eyebrow"><Facet />Klinika</p>
          <h2 className="about-title" id="about-title">{clinic.name}<span className="accent" /></h2>
        </div>
        <div className="about-right reveal" style={{ transitionDelay: ".15s" }}>
          <p className="about-body">
            {clinic.name} — Toshkentdagi stomatologiya klinikasi. Terapiya, ortopediya, og‘iz bo‘shlig‘i jarrohligi, dental implantatsiya va ortodontiya — barchasi bir joyda.
            Davolashdan oldin <strong>3D tomografiya</strong> va <strong>raqamli skaner</strong> yordamida aniq reja tuzamiz, uni siz bilan birga ko‘rib chiqamiz va <strong>narxni oldindan</strong> aytamiz.
            Har bir bemorga shoshilmasdan, o‘z yaqinimizdek yondashamiz.
          </p>
          <div className="about-cta"><a className="btn btn-primary" href="#aloqa">Qabulga yozilish <Icon name="arrow" size={18} strokeWidth={2} /></a></div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="section section-white" id="xizmatlar" aria-labelledby="services-title">
      <div className="wrap">
        <Head eyebrow="Xizmatlar" id="services-title" title="Bizning xizmatlarimiz" text="Oddiy davolashdan to‘liq tiklashgacha — barcha bosqichlar bir klinikada. Narxlar oldindan aniq." />
        <ServiceTabs services={services} />

        <div className="aftercare reveal">
          <div className="ic"><Icon name="shield" size={30} /></div>
          <div className="ac-body">
            <span className="ac-badge">Bizning mas’uliyatimiz</span>
            <h3>Ishimizga kafolat beramiz</h3>
            <p>Bajarilgan ishga <strong>[X] yil kafolat</strong> beramiz. Davolashni boshlashdan oldin <strong>to‘liq narxni</strong> aytamiz va reja o‘zgarsa, avval siz bilan kelishamiz.</p>
            <details className="ac-details">
              <summary>Batafsil ma’lumot</summary>
              <div className="ac-detail-body">
                <p><strong>Implant qo‘yilgan bemorlar uchun:</strong> to‘g‘ri parvarish va muntazam ko‘rikda implant ko‘p yillar xizmat qiladi — nazorat ko‘riklarini rejalashtirib boramiz.</p>
                <p><strong>Barcha bemorlar uchun:</strong> yiliga ikki marta professional tozalash va ko‘rik tavsiya qilinadi.</p>
              </div>
            </details>
          </div>
          <div className="ac-seal" aria-hidden="true">
            <svg className="shield" viewBox="0 0 114 126" fill="none"><path d="M57 4 108 22v38c0 32-22 54-51 62C28 114 6 92 6 60V22z" stroke="currentColor" strokeWidth="2" /><path d="M57 14 98 29v31c0 26-17 44-41 51C33 104 16 86 16 60V29z" stroke="currentColor" strokeOpacity=".4" /></svg>
            <span className="s-num">[X] yil</span><span className="s-lbl">kafolat</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Tech() {
  const items = [
    ...steps.map((s, i) => ({ icon: (["sparkle", "receipt", "check"] as const)[i], title: s.title, text: s.text, tag: s.tag })),
    { icon: "shield" as const, title: "To‘liq sterillik", text: "Asboblar va kabinet qat’iy sterillik standartlari bo‘yicha tayyorlanadi.", tag: "" },
  ];
  const chips = ["To‘liq sterillik", "Og‘riqsiz davolash", "Oldindan aniq narx", "Ishga kafolat", "10 yillik tajriba", "5 yo‘nalish bir joyda", "3D tomografiya", "Raqamli skaner"];
  return (
    <section className="section tech" id="texnologiya" aria-labelledby="tech-title">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="wrap">
        <Head eyebrow="Texnologiya" id="tech-title" title="Davolashdan oldin natijani ko‘rasiz" text="Taxmin emas, aniq o‘lchov: har bir bemor uchun reja raqamli ma’lumot asosida tuziladi." line={false} />
        <ul className="tech-grid stagger">
          {items.map((t) => (
            <li className="tech-item" key={t.title}>
              <div className="ic"><Icon name={t.icon} size={24} /></div>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
              {t.tag && <span className="tag">{t.tag}</span>}
            </li>
          ))}
        </ul>
        <div className="tech-logos reveal">
          <p className="ll">Nega {clinic.name}</p>
          <div className="marquee">
            {/* Ikki nusxa — cheksiz aylanish uchun; ikkinchisi ekran o'quvchilardan yashirilgan */}
            <div className="marquee-track">
              {[...chips, ...chips].map((c, i) => <div className="logo-chip" key={i} aria-hidden={i >= chips.length || undefined}>{c}</div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Cases() {
  if (cases.length === 0) return null;
  return (
    <section className="section section-white" id="natijalar" aria-labelledby="cases-title">
      <div className="wrap">
        <Head eyebrow="Ishlarimiz" id="cases-title" title="Natijalar — oldin va keyin" text="Haqiqiy bemorlarimizning natijalari." />
        <div className="cases-grid">
          {cases.map((c, i) => (
            <figure className="case reveal-3d" key={c.title} style={{ transitionDelay: `${(i % 2) * 0.1}s` }}>
              <div className="case-pair">
                {(["Oldin", "Keyin"] as const).map((tag) => {
                  const src = tag === "Oldin" ? c.before : c.after;
                  return (
                    <div className="case-shot" key={tag}>
                      <span className="case-tag">{tag}</span>
                      {src ? <img src={src} alt={`${c.title} — ${tag.toLowerCase()}`} loading="lazy" /> : <div className="case-ph">[Surat: {tag.toLowerCase()}]</div>}
                    </div>
                  );
                })}
              </div>
              <figcaption><Facet />{c.title}</figcaption>
            </figure>
          ))}
        </div>
        <div className="cases-more reveal">
          <p>Ko‘proq natijalar bilan tanishmoqchimisiz?</p>
          <a className="btn btn-outline" href={clinic.instagram} target="_blank" rel="noopener noreferrer">Instagram sahifamiz →</a>
        </div>
      </div>
    </section>
  );
}

export function Doctor() {
  return (
    <section className="section section-paper" id="shifokor" aria-labelledby="doctor-title">
      <div className="wrap">
        <Head eyebrow="Jamoa" id="doctor-title" title="Sizni kim davolaydi" />
        <div className="team">
          <article className="doc-card reveal-3d">
            {/* Haqiqiy surat: <img className="doc-photo" src="/doctor.jpg" alt={doctor.fullName} /> */}
            <div className="doc-photo-wrap"><div className="doc-photo">[Surat: shifokor portreti — oq xalatda, kameraga qaragan]</div></div>
            <div className="doc-body">
              <h3 className="doc-name">Dr. {doctor.name}</h3>
              <p className="doc-spec">{doctor.title}</p>
              <p className="doc-exp"><Facet />{doctor.stats[0].value} tajriba</p>
            </div>
          </article>
          <div className="doc-detail reveal" style={{ transitionDelay: ".15s" }}>
            <blockquote className="doctor-quote">“{doctor.quote}”</blockquote>
            <dl className="doc-stats">
              {doctor.stats.map((s) => <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}
            </dl>
            <ul className="creds">
              {doctor.creds.map((c) => <li key={c}><Facet />{c}</li>)}
            </ul>
            <div><a className="btn btn-primary" href="#aloqa">Shifokor qabuliga yozilish <Icon name="arrow" size={18} strokeWidth={2} /></a></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  if (reviews.length === 0) return null;
  return (
    <section className="section section-white" id="sharhlar" aria-labelledby="reviews-title">
      <div className="wrap">
        <Head eyebrow="Bemorlarimiz fikri" id="reviews-title" title="Bizga ishongan bemorlar nima deydi" />
        <div className="reviews stagger">
          {reviews.map((r, i) => (
            <figure className="review" key={i}>
              <Stars />
              <blockquote>“{r.text}”</blockquote>
              <figcaption><div className="avatar">{r.initial}</div><div><b>{r.name}</b>{r.service} · {r.source}</div></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="section section-paper" id="savollar" aria-labelledby="faq-title">
      <div className="wrap faq">
        <Head eyebrow="Savol-javob" id="faq-title" title="Ko‘p beriladigan savollar" />
        <div className="reveal"><FaqList items={faq} /></div>
      </div>
    </section>
  );
}

export function Booking() {
  const info = [
    { icon: "pin" as const, label: "Manzil", value: `${clinic.address.city} sh., ${address}`, href: clinic.mapUrl, ext: true },
    { icon: "phone" as const, label: "Telefon", value: clinic.phoneDisplay, href: `tel:${clinic.phone}` },
    { icon: "clock" as const, label: "Ish vaqti", value: hours },
    { icon: "telegram" as const, label: "Telegram", value: "Telegram orqali yozish", href: clinic.telegram, ext: true },
    { icon: "instagram" as const, label: "Instagram", value: "Instagram sahifamiz", href: clinic.instagram, ext: true },
  ];
  return (
    <section className="section section-white" id="aloqa" aria-labelledby="booking-title">
      <div className="wrap">
        <Head eyebrow="Aloqa" id="booking-title" title="Qabulga yozilish" text="Ma’lumotlaringizni qoldiring — administratorimiz qo‘ng‘iroq qilib, sizga qulay kun va vaqtni kelishib oladi." />
        <div className="contact-grid">
          <address className="contact-info stagger">
            {info.map((c) => (
              <div className="ci-item" key={c.label}>
                <span className="ic"><Icon name={c.icon} size={20} /></span>
                <div>
                  <div className="lbl">{c.label}</div>
                  {c.href
                    ? <a className="val" href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{c.value}</a>
                    : <span className="val">{c.value}</span>}
                </div>
              </div>
            ))}
          </address>
          <div className="reveal-3d"><BookingForm /></div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand label={clinic.name} />
            <p>Terapiya, ortopediya, jarrohlik, implantatsiya va ortodontiya. Raqamli stomatologiya, {clinic.city}.</p>
            <div className="footer-social">
              <a href={clinic.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon name="instagram" size={18} /></a>
              <a href={clinic.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram"><Icon name="telegram" size={18} /></a>
              <a href={`tel:${clinic.phone}`} aria-label="Qo‘ng‘iroq qilish"><Icon name="phone" size={18} /></a>
            </div>
          </div>
          <nav className="footer-col" aria-label="Bo‘limlar">
            <h4>Bo‘limlar</h4>
            {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
          <div className="footer-col">
            <h4>Aloqa</h4>
            <a href={clinic.mapUrl} target="_blank" rel="noopener noreferrer">{clinic.address.city} sh.,<br />{address}</a>
            <a href={`tel:${clinic.phone}`}>{clinic.phoneDisplay}</a>
            <span className="fi">{hours}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {clinic.name}. Barcha huquqlar himoyalangan.</span>
          <span>[Litsenziya raqami] · {clinic.city}, O‘zbekiston</span>
        </div>
      </div>
      <Mark className="footer-rosette" />
    </footer>
  );
}
