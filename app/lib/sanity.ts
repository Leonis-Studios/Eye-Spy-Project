import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// ─── CLIENT ───────────────────────────────────────────────────────────────────
// This is the connection between Next.js and Sanity.
// Every fetch call to Sanity uses this client.
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
  // useCdn: true means responses are cached by Sanity's CDN.
  // Faster reads but up to 60 second delay on new content.
  // Set to false if you need instant updates.
  token: process.env.SANITY_API_TOKEN,
});

// ─── IMAGE BUILDER ────────────────────────────────────────────────────────────
// Sanity stores images in its own cloud storage.
// This builder generates optimized image URLs from Sanity image references.
// Usage: urlFor(image).width(800).url()
const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── FETCH HELPER ─────────────────────────────────────────────────────────────
// A typed wrapper around client.fetch() so every query is consistent.
// T is a TypeScript generic — it types the return value of each query.
// Usage: await sanityFetch<BlogPost[]>(query)
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return client.fetch<T>(query, params);
}
