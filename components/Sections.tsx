import { clinic, doctor, faq, nav, reviews, services, steps } from "@/lib/site";
import { Icon, Stars } from "./Icon";
import { Brand, Mark } from "./Logo";
import BookingForm from "./BookingForm";

const BLUE = "#0250B5";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Brand />
        <nav className="nav-links" aria-label="Asosiy menyu">
          {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <div className="nav-cta">
          <a className="nav-phone" href={`tel:${clinic.phone}`}>{clinic.phoneDisplay}</a>
          <a className="btn btn-primary" href="#aloqa">Qabulga yozilish</a>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{clinic.slogan}</p>
          <h1 id="hero-title">Aniq tashxis. Og‘riqsiz davolash. <em>Ishonchli tabassum.</em></h1>
          <p className="hero-lead">Terapiya, ortopediya, jarrohlik, implantatsiya va ortodontiya — barchasi bir klinikada. Har bir qadamni oldindan ko‘rasiz va narxni oldindan bilasiz.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#aloqa">Qabulga yozilish</a>
            <a className="btn btn-ghost" href="#xizmatlar">Xizmatlar va narxlar</a>
          </div>
          <dl className="hero-facts">
            <div><dt>10 yil</dt><dd>amaliy tajriba</dd></div>
            <div><dt>1 000+</dt><dd>bemor</dd></div>
            <div><dt>5</dt><dd>yo‘nalish bir joyda</dd></div>
          </dl>
        </div>
        <div className="hero-visual">
          {/* Haqiqiy surat qo'yilganda: <Image src="/hero.jpg" alt="..." fill priority sizes="(max-width:860px) 100vw, 45vw" /> */}
          <div className="hero-photo">[Surat: shifokor bemor bilan — yorug‘ kabinet, tabiiy yorug‘lik]</div>
          <Mark className="hero-rosette" />
          <div className="hero-badge">
            <div className="dot"><Icon name="clock" size={22} color={BLUE} /></div>
            <div><b>Qabul vaqti</b><span>{clinic.hours.days}, [{clinic.hours.open}–{clinic.hours.close}]</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Trust() {
  const items = [
    { icon: "shield", label: "To‘liq sterillik" },
    { icon: "heart", label: "Og‘riqsiz davolash" },
    { icon: "receipt", label: "Oldindan aniq narx" },
    { icon: "medal", label: "Ishga kafolat" },
    { icon: "clock", label: "10 yillik tajriba" },
    { icon: "sparkle", label: "5 yo‘nalish bir joyda" },
  ] as const;
  return (
    <div className="trust">
      <ul className="wrap trust-grid">
        {items.map((t) => <li key={t.label} className="trust-item"><Icon name={t.icon} color={BLUE} />{t.label}</li>)}
      </ul>
    </div>
  );
}

export function Services() {
  return (
    <section className="section" id="xizmatlar" aria-labelledby="services-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Xizmatlar</p>
            <h2 id="services-title">Bir klinikada — butun oila uchun</h2>
          </div>
          <p>Murakkab so‘zlarsiz: nima qilamiz, sizga nima beradi va qancha turadi.</p>
        </div>
        <div className="services">
          {services.map((s) => (
            <article className="service" key={s.slug} id={s.slug}>
              <div className="ico"><Icon name={s.icon} size={26} color={BLUE} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
              <div className="foot"><span className="price">{s.price}</span><a href="#aloqa">Yozilish →</a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Digital() {
  return (
    <section className="section digital" id="texnologiya" aria-labelledby="digital-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Raqamli yondashuv</p>
            <h2 id="digital-title">Davolashdan oldin natijani ko‘rasiz</h2>
          </div>
          <p>Taxmin emas, aniq o‘lchov: har bir bemor uchun reja raqamli ma’lumot asosida tuziladi.</p>
        </div>
        <ol className="steps">
          {steps.map((s) => (
            <li className="step" key={s.n}>
              <span className="num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="tag">{s.tag}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Doctor() {
  return (
    <section className="section" id="shifokor" aria-labelledby="doctor-title">
      <div className="wrap doctor">
        <div className="doctor-photo">[Surat: shifokor portreti — oq xalatda, kameraga qaragan]</div>
        <div className="doctor-copy">
          <p className="eyebrow">Shifokorimiz bilan tanishing</p>
          <h2 id="doctor-title">Dr. {doctor.name}</h2>
          <p className="doctor-role">{doctor.title}</p>
          <blockquote className="doctor-quote">“{doctor.quote}”</blockquote>
          <dl className="hero-facts doctor-stats">
            {doctor.stats.map((s) => <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}
          </dl>
          <ul className="creds">
            {doctor.creds.map((c) => <li key={c}><Icon name="check" size={20} strokeWidth={2.2} color={BLUE} />{c}</li>)}
          </ul>
          <div><a className="btn btn-primary" href="#aloqa">Shifokor qabuliga yozilish</a></div>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  if (reviews.length === 0) return null;
  return (
    <section className="section reviews-bg" id="sharhlar" aria-labelledby="reviews-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Bemorlarimiz fikri</p>
            <h2 id="reviews-title">Bizga ishongan bemorlar nima deydi</h2>
          </div>
          <div className="rating">
            <div className="score">[4.9]</div>
            <div><Stars /><span>Google Maps’da [X] ta sharh</span></div>
          </div>
        </div>
        <div className="reviews">
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
    <section className="section" id="savollar" aria-labelledby="faq-title">
      <div className="wrap faq">
        <div>
          <p className="eyebrow">Savol-javob</p>
          <h2 id="faq-title" className="faq-title">Ko‘p beriladigan savollar</h2>
        </div>
        <div className="faq-list">
          {faq.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Booking() {
  return (
    <section className="section booking-sec" id="aloqa" aria-labelledby="booking-title">
      <div className="wrap">
        <div className="booking">
          <Mark className="booking-rosette" />
          <div className="booking-info">
            <p className="eyebrow">Qabulga yozilish</p>
            <h2 id="booking-title">Tabassumingiz uchun birinchi qadam</h2>
            <p className="booking-lead">Formani to‘ldiring — administratorimiz qo‘ng‘iroq qilib, sizga qulay kun va vaqtni kelishib oladi.</p>
            <a className="call-card" href={`tel:${clinic.phone}`}>
              <span className="call-ico"><Icon name="phone" size={22} /></span>
              <span><small>Yoki hoziroq qo‘ng‘iroq qiling</small><strong>{clinic.phoneDisplay}</strong></span>
            </a>
            <address className="booking-meta">
              <div><Icon name="pin" size={20} /><span><b>Manzil</b>{clinic.address.city} sh., {clinic.address.district}, {clinic.address.street}</span></div>
              <div><Icon name="clock" size={20} /><span><b>Ish vaqti</b>{clinic.hours.days}, [{clinic.hours.open} – {clinic.hours.close}]</span></div>
            </address>
            <a className="map-link" href={clinic.mapUrl} target="_blank" rel="noopener noreferrer">Xaritada ko‘rish →</a>
          </div>
          <BookingForm />
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
          <Brand label="Prisma Dental" />
          <div className="footer-cols">
            <div><b>Klinika</b><a href="#xizmatlar">Xizmatlar</a><a href="#texnologiya">Texnologiya</a><a href="#shifokor">Shifokor</a></div>
            <div><b>Bog‘lanish</b><a href={`tel:${clinic.phone}`}>{clinic.phoneDisplay}</a><a href={clinic.telegram} rel="noopener">Telegram</a><a href={clinic.instagram} rel="noopener">Instagram</a></div>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Prisma Dental · Toshkent</span><span>[Litsenziya raqami]</span></div>
      </div>
    </footer>
  );
}
