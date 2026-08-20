import { MetadataRoute } from "next";
import { siteConfig } from "./config/site";

// Explicit per-bot rules for AI search/citation crawlers, in addition to the
// wildcard allow — some of these respect a named user-agent block even when
// "*" already allows everything, so we document the intent explicitly here.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio", "/api"] },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteConfig.seo.url}/sitemap.xml`,
  };
}
