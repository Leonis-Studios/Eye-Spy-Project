import { notFound } from "next/navigation";
import { sanityFetch } from "@/app/lib/sanity";
import { singlePostQuery, allPostsQuery } from "@/app/lib/queries";
import { type BlogPost } from "@/app/lib/types";
import BlogPostClient from "./BlogPostClient";

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

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
