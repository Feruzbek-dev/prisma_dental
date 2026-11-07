import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import ScrollState from "@/components/ScrollState";
import { Booking, Digital, Doctor, Faq, Footer, Header, Reviews, Services, Trust } from "@/components/Sections";
import { SITE_URL, clinic, doctor, faq, services } from "@/lib/site";

// Google uchun tuzilgan ma'lumot (schema.org): klinika, shifokor, xizmatlar, FAQ.
function JsonLd() {
  const dentist = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE_URL}/#clinic`,
    name: clinic.name,
    description: clinic.description,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/opengraph-image`,
    telephone: clinic.phone,
    priceRange: clinic.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.district,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: clinic.geo.lat, longitude: clinic.geo.lng },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: clinic.hours.open,
      closes: clinic.hours.close,
    }],
    sameAs: [clinic.instagram, clinic.telegram].filter((u) => !u.includes("[")),
    slogan: clinic.slogan,
    medicalSpecialty: "Dentistry",
    employee: {
      "@type": "Person",
      name: doctor.name,
      jobTitle: doctor.title,
      alumniOf: { "@type": "CollegeOrUniversity", name: "Toshkent davlat stomatologiya instituti" },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Stomatologiya xizmatlari",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "MedicalProcedure", name: s.title, description: s.text },
      })),
    },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.filter((f) => !f.a.includes("[")).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dentist) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <Preloader />
      <ScrollState />
      <Header />
      <main id="top">
        <Hero />
        <Trust />
        <Services />
        <Digital />
        <Doctor />
        <Reviews />
        <Faq />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
