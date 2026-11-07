import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prisma Dental",
    short_name: "Prisma Dental",
    description: "Raqamli stomatologiya, Toshkent",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0250B5",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
