import { sanityFetch } from "./sanity";
import { siteSettingsQuery } from "./queries";
import { type SiteSettings } from "./types";
import { siteConfig } from "../config/site";

// ─── FALLBACK ─────────────────────────────────────────────────────────────────
// Used when Sanity returns null (e.g. document not yet created in Studio).
// Values mirror siteConfig so the site always renders with real content.
const fallback: SiteSettings = {
  siteName: siteConfig.name,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  phone: siteConfig.phone,
  email: siteConfig.email,
  address: siteConfig.address,
  serviceArea: siteConfig.serviceArea,
  hours: siteConfig.hours,
  stats: siteConfig.stats,
  social: siteConfig.social,
};

// ─── HELPER ───────────────────────────────────────────────────────────────────
// Fetch site settings from Sanity, falling back to siteConfig if not found.
// Call this at the top of any async server component that needs dynamic content.
// Usage: const settings = await getSiteSettings();
export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<SiteSettings | null>(siteSettingsQuery);
  return data ?? fallback;
}
