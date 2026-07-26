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
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
