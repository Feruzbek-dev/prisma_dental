import type { Metadata, Viewport } from "next";
// Shriftlar o'z serverimizdan beriladi (Google Fonts'ga so'rov yo'q — tezroq va GDPR'ga mos).
import "@fontsource/onest/latin-400.css";
import "@fontsource/onest/latin-500.css";
import "@fontsource/onest/latin-600.css";
import "@fontsource/onest/latin-700.css";
import "@fontsource/onest/cyrillic-400.css";
import "@fontsource/onest/cyrillic-600.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import { SITE_URL, clinic } from "@/lib/site";
import "./globals.css";

const title = "Prisma Dental — raqamli stomatologiya Toshkentda";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | Prisma Dental" },
  description: clinic.description,
  applicationName: "Prisma Dental",
  keywords: [
    "stomatologiya Toshkent", "stomatolog Toshkent", "tish davolash", "implantatsiya Toshkent",
    "tish oqartirish", "vinir", "koronka", "breket", "eleyner", "3D tomografiya tish",
    "стоматология Ташкент", "имплантация зубов Ташкент", "Prisma Dental",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "/",
    siteName: "Prisma Dental",
    title,
    description: clinic.description,
  },
  twitter: { card: "summary_large_image", title, description: clinic.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: true, address: true },
  category: "health",
  // Google Search Console tasdiqlash kodi: verification: { google: "..." },
};

export const viewport: Viewport = {
  themeColor: "#0250B5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Preloader sessiyada bir marta: birinchi kirishda scroll'ni qulflaydi, keyingilarda darhol yashiradi.
const preloaderBoot = `try{var h=document.documentElement;if(sessionStorage.getItem('pd-intro-seen')){h.classList.add('pl-skip')}else{h.classList.add('pl-lock')}}catch(e){document.documentElement.classList.add('pl-lock')}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloaderBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
