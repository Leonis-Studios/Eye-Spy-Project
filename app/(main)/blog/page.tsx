import type { Metadata } from "next";
import { sanityFetch } from "@/app/lib/sanity";
import { allPostsQuery } from "@/app/lib/queries";
import { type BlogPost } from "@/app/lib/types";
import { getSiteSettings } from "@/app/lib/getSiteSettings";
import { siteConfig } from "@/app/config/site";
import { buildMetadata } from "@/app/lib/seo";
import BlogClient from "./BlogClient";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings.siteName || siteConfig.name;
  const siteUrl = settings.siteUrl || siteConfig.seo.url;

  return buildMetadata({
    title: `Blog | ${siteName}`,
    description: `Security tips, buyer's guides, and industry insights from ${siteName}.`,
    path: "/blog",
    siteUrl,
    siteName,
  });
}

export default async function BlogPage() {
  const posts = await sanityFetch<BlogPost[]>(allPostsQuery);

  return <BlogClient posts={posts} />;
}
