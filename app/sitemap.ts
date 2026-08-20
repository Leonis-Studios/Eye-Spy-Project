import { MetadataRoute } from "next";
import { siteConfig } from "./config/site";
import { sanityFetch } from "./lib/sanity";
import {
  allServicePageSlugsQuery,
  allPostsQuery,
  allAreaSlugsQuery,
  allServiceLandingPageSlugsQuery,
  sitemapSingletonsQuery,
} from "./lib/queries";

export const revalidate = 3600;

type SlugEntry = { slug: string; _updatedAt?: string; noindex?: boolean };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.seo.url;

  const [servicePageSlugs, posts, areaSlugs, lpSlugs, singletons] = await Promise.all([
    sanityFetch<SlugEntry[]>(allServicePageSlugsQuery),
    sanityFetch<SlugEntry[]>(allPostsQuery),
    sanityFetch<SlugEntry[]>(allAreaSlugsQuery),
    sanityFetch<SlugEntry[]>(allServiceLandingPageSlugsQuery),
    sanityFetch<{
      home: { _updatedAt?: string } | null;
      about: { _updatedAt?: string } | null;
      contact: { _updatedAt?: string } | null;
      pricing: { _updatedAt?: string } | null;
    }>(sitemapSingletonsQuery),
  ]);

  const notNoindexed = (entry: SlugEntry) => !entry.noindex;
  const lastModified = (entry: { _updatedAt?: string }) =>
    entry._updatedAt ? new Date(entry._updatedAt) : undefined;

  // Static pages — Sanity-backed singletons get lastModified from their document.
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1.0, changeFrequency: "monthly", lastModified: lastModified(singletons.home ?? {}) },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: "monthly", lastModified: lastModified(singletons.about ?? {}) },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: "monthly", lastModified: lastModified(singletons.contact ?? {}) },
    { url: `${baseUrl}/blog`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/services`, priority: 0.85, changeFrequency: "monthly" },
    { url: `${baseUrl}/pricing`, priority: 0.75, changeFrequency: "monthly", lastModified: lastModified(singletons.pricing ?? {}) },
  ];

  const blogPages: MetadataRoute.Sitemap = posts
    .filter(notNoindexed)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: lastModified(post),
    }));

  const servicePages: MetadataRoute.Sitemap = servicePageSlugs
    .filter(notNoindexed)
    .map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: lastModified(service),
    }));

  // /lp/[slug] merges serviceLandingPage + serviceArea slugs (serviceLandingPage
  // takes priority when a slug exists in both, matching app/lp/[area]/page.tsx).
  const lpBySlug = new Map<string, SlugEntry>();
  for (const area of areaSlugs.filter(notNoindexed)) lpBySlug.set(area.slug, area);
  for (const lp of lpSlugs.filter(notNoindexed)) lpBySlug.set(lp.slug, lp);

  const lpPages: MetadataRoute.Sitemap = Array.from(lpBySlug.values()).map((entry) => ({
    url: `${baseUrl}/lp/${entry.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: lastModified(entry),
  }));

  return [...staticPages, ...blogPages, ...servicePages, ...lpPages];
}
