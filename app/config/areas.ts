// ─── AREAS CONFIG ─────────────────────────────────────────────────────────────
// This is the single source of truth for all service areas.
// Each area gets its own landing page automatically at /lp/[area-slug]
// Add or remove areas here and the pages update automatically.
//
// CHECKLIST FOR A NEW AREA:
//   1. slug        — lowercase, hyphens, no special chars (becomes the URL)
//   2. name        — display name used in headings and copy
//   3. region      — broader area description used in subheadings
//   4. description — 1-2 sentences of hyper-local copy for SEO
//   5. nearbyAreas — 2-3 neighboring areas (for internal linking later)

export interface ServiceArea {
  slug: string;
  name: string;
  region: string;
  description: string;
  nearbyAreas: string[];
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: "downtown",
    name: "Downtown",
    region: "City Centre",
    description:
      "Professional security system installation for Downtown homes, condos, and businesses. Licensed and insured with same-week availability.",
    nearbyAreas: ["Midtown", "North End", "Westside"],
  },
  {
    slug: "north-end",
    name: "North End",
    region: "North City",
    description:
      "Trusted security camera and alarm installation across the North End. Serving residential and commercial properties for over 15 years.",
    nearbyAreas: ["Downtown", "Eastside", "Northgate"],
  },
  {
    slug: "westside",
    name: "Westside",
    region: "West District",
    description:
      "SecurTech provides licensed security system installation throughout the Westside. Free estimates with no obligation.",
    nearbyAreas: ["Downtown", "South End", "Lakeside"],
  },
  {
    slug: "eastside",
    name: "Eastside",
    region: "East District",
    description:
      "Eastside homeowners and businesses trust SecurTech for professional camera and alarm system installation.",
    nearbyAreas: ["North End", "Downtown", "Riverside"],
  },
  {
    slug: "south-end",
    name: "South End",
    region: "South City",
    description:
      "Reliable security installation across the South End. We survey your property and recommend exactly what you need.",
    nearbyAreas: ["Westside", "Downtown", "Lakeside"],
  },
];

// Helper — find a single area by slug
export function getArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((a) => a.slug === slug);
}
