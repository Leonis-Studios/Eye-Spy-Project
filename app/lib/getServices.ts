import { cache } from "react";
import { sanityFetch } from "./sanity";
import { getAllServicesQuery } from "./queries";
import { type Service } from "./types";
import { FALLBACK_SERVICES } from "../config/site";

// ─── HELPER ───────────────────────────────────────────────────────────────────
// Fetch all service pages from Sanity for use in lists, grids, and dropdowns.
// Falls back to FALLBACK_SERVICES if Sanity returns an empty array.
// Call this at the top of any async server component that needs the services list.
// Usage: const services = await getServices();
// Wrapped in React cache() — root layout and page-level calls dedupe into a
// single Sanity round trip per request instead of one per call site.
export const getServices = cache(async (): Promise<Service[]> => {
  const data = await sanityFetch<Service[]>(getAllServicesQuery);
  return data.length > 0 ? data : FALLBACK_SERVICES;
});
