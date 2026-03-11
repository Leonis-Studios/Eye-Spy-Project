import type { Metadata } from "next";
import { posts } from "../../../config/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) return { title: "Post Not Found | SecurTech" };

  return {
    title: `${post.title} | SecurTech Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
