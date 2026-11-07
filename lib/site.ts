// Klinika ma'lumotlari — saytdagi matnlar, SEO metadata va JSON-LD shu yerdan olinadi.
// [ ... ] bilan belgilanganlarni haqiqiy ma'lumot bilan almashtiring.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://prismadental.uz").replace(/\/$/, "");

export const clinic = {
  name: "Prisma Dental",
  city: "Toshkent",
  tagline: "Raqamli stomatologiya",
  slogan: "Sizning ishonchingiz — bizning maqsadimiz!",
  specialties: ["Terapiya", "Ortopediya", "Og‘iz bo‘shlig‘i jarrohligi", "Dental implantatsiya", "Ortodontiya"],
  description:
    "Prisma Dental — Toshkentdagi stomatologiya klinikasi: terapiya, ortopediya, og‘iz bo‘shlig‘i jarrohligi, dental implantatsiya va ortodontiya. Tishlarni professional tozalash, karies davolash, implant, breket va elaynerlar, vinir va protezlar. Oldindan aniq narx.",
  phone: "+998504044404",
  phoneDisplay: "+998 50 404 44 04",
  telegram: "https://t.me/[telegram_username]",
  instagram: "https://instagram.com/[instagram_username]",
  mapUrl: "https://yandex.uz/maps/-/[havola]",
  address: {
    street: "[ko‘cha, uy]",
    district: "[tuman]",
    city: "Toshkent",
    postalCode: "[100000]",
    country: "UZ",
  },
  geo: { lat: 41.2995, lng: 69.2401 }, // [klinikaning aniq koordinatalari]
  hours: { days: "Du – Sha", open: "09:00", close: "19:00" },
  priceRange: "$$",
};

export const doctor = {
  name: "Dostonbek Ibragimov",
  fullName: "Ibragimov Dostonbek Rustamjon o‘g‘li",
  title: "Jarroh-implantolog, ortoped",
  quote:
    "Har bir bemorni o‘z yaqinimdek qabul qilaman: shoshilmayman, hamma narsani tushuntiraman va faqat haqiqatan kerakli davolashni tavsiya qilaman.",
  stats: [
    { value: "10 yil", label: "umumiy tajriba" },
    { value: "7 yil", label: "mustaqil amaliyot" },
    { value: "1 000+", label: "bemor" },
  ],
  creds: [
    "Toshkent davlat stomatologiya instituti — bakalavriat (2020)",
    "Toshkent davlat stomatologiya instituti — magistratura (2022)",
    "Malaka oshirish: xirurgik stomatologiya (2026)",
    "Malaka oshirish: dental implantologiya (2026, davom etmoqda)",
    "Dental implantologiya, ortodontiya va ortopediya bo‘yicha kurslar sertifikatlari",
  ],
};

export type Service = { slug: string; icon: IconName; title: string; short: string; text: string; items: string[]; price: string };
export type IconName = "heart" | "implant" | "sparkle" | "crown" | "braces" | "drop";

export const services: Service[] = [
  { slug: "tozalash", icon: "drop", title: "Tishlarni professional tozalash", short: "Tozalash", text: "Tish toshi va karashni tozalaymiz, milklarni sog‘lomlashtiramiz. Yiliga ikki marta tavsiya qilinadi.", items: ["Tish toshini olib tashlash", "Karash va dog‘larni tozalash, polirovka"], price: "400 000 – 800 000 so‘m" },
  { slug: "karies", icon: "heart", title: "Kariyes va uning asoratlarini davolash", short: "Kariyes davolash", text: "Og‘riq, qora dog‘ yoki tushib ketgan plomba — tishni imkon qadar saqlab, og‘riqsiz davolaymiz.", items: ["Kariyes va plomba", "Ildiz kanallarini davolash"], price: "400 000 – 1 000 000 so‘m" },
  { slug: "implantatsiya", icon: "implant", title: "Implantatsiya", short: "Implantatsiya", text: "Yo‘qolgan tish o‘rniga tabiiy ko‘rinishdagi, uzoq xizmat qiladigan implant. Implantni jarroh-implantolog o‘zi o‘rnatadi.", items: ["Bitta tishdan to‘liq qatorgacha", "Bosqichma-bosqich kuzatuv"], price: "2 – 8 mln so‘m" },
  { slug: "ortodontiya", icon: "braces", title: "Breket va elaynerlar", short: "Breket / elayner", text: "Qiyshiq tishlar va noto‘g‘ri tishlov breket tizimlari yoki shaffof elaynerlar bilan to‘g‘rilanadi.", items: ["Breket tizimlari", "Shaffof elaynerlar"], price: "3 – 20 mln so‘m" },
  { slug: "protezlash", icon: "crown", title: "Vinirlar va tish protezlari", short: "Vinir / protez", text: "Singan, shakli yoki rangi o‘zgargan tishlarni vinir, koronka va protezlar bilan tiklaymiz. Rang tabiiy tishga moslanadi.", items: ["Vinirlar", "Koronka va protezlar"], price: "700 000 – 3 000 000 so‘m" },
  { slug: "reabilitatsiya", icon: "sparkle", title: "Tish qatorini to‘liq tiklash", short: "To‘liq tiklash", text: "Ko‘p tishlar yo‘qolgan yoki shikastlangan holatda — chaynash funksiyasini va tabassum estetikasini birga tiklaymiz.", items: ["Funksional reabilitatsiya", "Estetik reabilitatsiya"], price: "Ko‘rikdan so‘ng individual" },
];

export const steps = [
  { n: "01 — Tashxis", title: "3D tomografiya", text: "Jag‘ va tishlarni barcha tomondan ko‘ramiz. Oddiy rentgenda ko‘rinmaydigan muammolar ham aniqlanadi.", tag: "[KT apparati modeli]" },
  { n: "02 — Rejalashtirish", title: "Raqamli skaner", text: "Noqulay qolip massasi o‘rniga tishlar bir necha daqiqada skanerlanadi. Reja ekranda birga ko‘rib chiqiladi.", tag: "[Intraoral skaner modeli]" },
  { n: "03 — Davolash", title: "Aniq bajarish", text: "Implant, koronka va vinirlar raqamli reja bo‘yicha tayyorlanadi — kamroq tashrif, aniqroq natija.", tag: "[Uskuna / laboratoriya]" },
];

// Faqat haqiqiy sharhlarni qo'ying (Google Maps, Instagram, Telegram).
// Ro'yxat bo'sh bo'lsa "Sharhlar" bo'limi va menyu bandi saytda ko'rinmaydi.
// Namuna: { initial: "A", name: "Aziza", service: "Implantatsiya", source: "Google", text: "..." }
export type Review = { initial: string; name: string; service: string; source: string; text: string };
export const reviews: Review[] = [];

export const faq = [
  { q: "Davolash og‘riydimi?", a: "Yo‘q. Zamonaviy mahalliy og‘riqsizlantirishdan foydalanamiz, ko‘pchilik bemorlar ukol qilinganini ham deyarli sezmaydi. Xavotiringiz bo‘lsa, oldindan ayting — shoshilmasdan ishlaymiz." },
  { q: "Birinchi qabulda nima bo‘ladi?", a: "Tishlaringizni ko‘rikdan o‘tkazamiz, kerak bo‘lsa rentgen yoki 3D tasvir olamiz, holatni oddiy tilda tushuntiramiz va narxi bilan aniq davolash rejasini beramiz." },
  { q: "Narxni oldindan bilsam bo‘ladimi?", a: "Ha. Davolashni boshlashdan oldin to‘liq narxni aytamiz va reja o‘zgarsa, avval siz bilan kelishamiz." },
  { q: "Bo‘lib to‘lash imkoniyati bormi?", a: "[Klinika siyosatiga qarab javob: bo‘lib to‘lash yoki muddatli to‘lov shartlari.]" },
  { q: "Implant qancha vaqt xizmat qiladi?", a: "To‘g‘ri parvarish va muntazam ko‘rikda implant ko‘p yillar xizmat qiladi. Bajarilgan ishga [X] yil kafolat beramiz." },
];

export const nav = [
  { href: "#xizmatlar", label: "Xizmatlar" },
  { href: "#texnologiya", label: "Texnologiya" },
  { href: "#shifokor", label: "Shifokor" },
  { href: "#sharhlar", label: "Sharhlar" },
  { href: "#savollar", label: "Savollar" },
  { href: "#aloqa", label: "Aloqa" },
].filter((n) => n.href !== "#sharhlar" || reviews.length > 0);

export const bookingServices = ["Ko‘rik va maslahat", ...services.map((s) => s.short)];
export const bookingTimes = ["Ertalab", "Tushdan keyin", "Kechqurun"];
