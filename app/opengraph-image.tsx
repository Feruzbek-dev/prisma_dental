import { ImageResponse } from "next/og";
import { MARK_FILL } from "@/lib/logo-paths";

export const alt = "Prisma Dental — raqamli stomatologiya, Toshkent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Ijtimoiy tarmoqlar va Telegram'da havola ulashilganda chiqadigan rasm.
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#0B2654", padding: "64px", gap: "56px" }}>
        <svg width="260" height="254" viewBox="1494 0 3115 3040">
          <g transform="translate(0,3100) scale(.1,-.1)"><path fill="#FFFFFF" d={MARK_FILL} /></g>
        </svg>
        <div style={{ display: "flex", flexDirection: "column", color: "#FFFFFF" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: "0.04em" }}>PRISMA DENTAL</div>
          <div style={{ fontSize: 40, color: "#C3D3EC", marginTop: 16 }}>Raqamli stomatologiya · Toshkent</div>
          <div style={{ fontSize: 34, color: "#FFFFFF", marginTop: 40, padding: "14px 28px", background: "#0250B5", borderRadius: 999, alignSelf: "flex-start" }}>+998 50 404 44 04</div>
        </div>
      </div>
    ),
    size
  );
}
