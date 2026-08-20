import { sanityFetch } from "@/app/lib/sanity";
import { getAllServicesQuery, allPostsQuery } from "@/app/lib/queries";
import { getSiteSettings } from "@/app/lib/getSiteSettings";
import { type Service, type BlogPost } from "@/app/lib/types";

export const revalidate = 3600;

export async function GET() {
  const [settings, services, posts] = await Promise.all([
    getSiteSettings(),
    sanityFetch<Service[]>(getAllServicesQuery),
    sanityFetch<BlogPost[]>(allPostsQuery),
  ]);

  const serviceLines = services
    .map((s) => `- ${s.title} — /services/${s.slug}`)
    .join("\n");

  const postLines = posts
    .slice(0, 20)
    .map((p) => `- ${p.title} — /blog/${p.slug}: ${p.excerpt ?? ""}`)
    .join("\n");

  const body = `# ${settings.siteName}

> ${settings.description}

${settings.siteName} installs and services security systems for residential and commercial properties.

## Services
${serviceLines}

See /services for the full list and /pricing for pricing details.

## Content
${postLines}
- /about — company background
- /contact — contact form and business information

## Service area
${settings.serviceArea ?? "We serve the surrounding metro area and nearby communities"}; see /lp for location-specific pages. Not sure if we cover your area? Contact us to check.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
