import { sanityFetch } from "@/app/lib/sanity";
import { allPostsQuery } from "@/app/lib/queries";
import { type BlogPost } from "@/app/lib/types";
import BlogClient from "./BlogClient";

export default async function BlogPage() {
  const posts = await sanityFetch<BlogPost[]>(allPostsQuery);

  return <BlogClient posts={posts} />;
}
