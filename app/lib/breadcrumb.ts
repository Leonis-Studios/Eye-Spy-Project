import type { BreadcrumbList, WithContext } from "schema-dts";

/**
 * Builds BreadcrumbList JSON-LD from a route's crumb list. `path` is relative
 * to siteUrl (e.g. "/services/cameras"); position is auto-incremented from 1.
 */
export function buildBreadcrumbSchema(
  items: { name: string; path: string }[],
  siteUrl: string,
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
