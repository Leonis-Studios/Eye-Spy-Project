import { MetadataRoute } from "next";
import { siteConfig } from "./config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050d1a",
    theme_color: "#ef6b4d",
    icons: [
      { src: "/favicons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
