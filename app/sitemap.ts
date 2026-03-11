import { MetadataRoute } from "next";
import { posts } from "./config/posts";
import { siteConfig } from "./config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.seo.url;

  // Static pages
  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: "monthly" as const },
    {
      url: `${baseUrl}/about`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      url: `${baseUrl}/contact`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      url: `${baseUrl}/blog`,
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
  ];

  // Dynamic blog posts
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...blogPages];
}
