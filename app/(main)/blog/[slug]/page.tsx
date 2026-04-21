import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/app/lib/sanity";
import { singlePostQuery, allPostsQuery } from "@/app/lib/queries";
import { type BlogPost } from "@/app/lib/types";
import { siteConfig } from "@/app/config/site";
import { parseMonthYearToISO } from "@/app/lib/utils";
import JsonLd from "@/app/components/JsonLd";
import BlogPostClient from "./BlogPostClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost | null>(singlePostQuery, { slug });

  if (!post) return { title: "Post Not Found | SecurTech" };

  return {
    title: `${post.title} | SecurTech Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post, allPosts] = await Promise.all([
    sanityFetch<BlogPost | null>(singlePostQuery, { slug }),
    sanityFetch<BlogPost[]>(allPostsQuery),
  ]);

  if (!post) notFound();

  // Find related posts — same category, excluding current post
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteConfig.seo.url}/blog/${slug}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: parseMonthYearToISO(post.date),
    dateModified: parseMonthYearToISO(post.date),
    url: `${siteConfig.seo.url}/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.seo.url}/blog/${slug}`,
    },
    articleSection: post.category,
    author: {
      "@type": "Organization",
      "@id": `${siteConfig.seo.url}/#organization`,
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.seo.url}/#organization`,
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.seo.url}/logopng.png`,
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.seo.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.seo.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.seo.url}/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={articleSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
