import { cache } from "react";
import { sanityFetch } from "./sanity";
import { homePageQuery } from "./queries";
import { type HomePageData } from "./types";

// ─── HELPER ───────────────────────────────────────────────────────────────────
// Fetch the singleton homePage document from Sanity.
// Wrapped in React cache() — generateMetadata() and the page component both
// need this, so this dedupes them into a single Sanity round trip per request.
// Usage: const homePage = await getHomePage();
export const getHomePage = cache(async (): Promise<HomePageData | null> => {
  return sanityFetch<HomePageData | null>(homePageQuery);
});
