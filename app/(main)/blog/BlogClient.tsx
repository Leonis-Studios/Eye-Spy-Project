"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, Clock, Tag, X } from "lucide-react";
import { type BlogPost } from "@/app/lib/types";

// All unique categories — used for the filter buttons

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const postsRef = useRef<HTMLElement>(null);
  const postsInView = useInView(postsRef, { once: true, amount: 0.05 });

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category))),
  ];
  // Array.from(new Set(...)) removes duplicates — Set only stores unique values,
  // Array.from converts it back to an array we can map over.

  // activeCategory filters which posts are shown
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // for "Load More" pagination

  // When the user searches or changes category, reset back to showing 6
  React.useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, activeCategory]);

  // Derived state — filter posts based on activeCategory.
  // No useState needed — this recalculates every render automatically.
  // "derived state" means a value computed from existing state, not stored separately.
  const filteredPosts = posts
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter((p) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const words = q.trim().split(/\s+/);
      const searchable = `${p.title} ${p.excerpt} ${p.category}`.toLowerCase();
      return words.every((word) => searchable.includes(word));
    });

  // Visible slice — only show up to visibleCount posts
  const visiblePosts = filteredPosts.slice(0, visibleCount);

  // Whether there are more posts to show
  const hasMore = visibleCount < filteredPosts.length;

  // Featured post only shows when not searching
  const featuredPost = !searchQuery ? posts.find((p) => p.featured) : null;

  // Grid always excludes the featured post to avoid duplication
  const gridPosts = visiblePosts.filter((p) => !p.featured || !!searchQuery);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <main className="bg-[#050d1a]">
      {/* ── HERO BANNER ───────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,180,255,0.08) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[#EF6B4D] text-xs uppercase tracking-widest mb-6"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Security Insights
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            The SecurTech
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg, #EF6B4D 0%, #38bdf8 60%, #7dd3fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Blog
            </span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-slate-400 text-lg max-w-xl leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Practical security advice, buyer's guides, and industry insights
            from the team at SecurTech.
          </motion.p>
        </div>
      </section>

      {/* ── POSTS ─────────────────────────────────────────────────────────── */}
      <section
        ref={postsRef}
        className="relative bg-[#070f1e] py-24 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <div className="relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full md:w-80 bg-[#0a1628] border border-white/5 focus:border-[#EF6B4D]/50 px-4 py-3 rounded-sm text-white text-sm outline-none transition-colors duration-200 placeholder:text-slate-600"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors duration-200"
              >
                <X size={14} />
              </button>
            )}
          </div>
          {/* Category filter buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-sm text-xs uppercase tracking-widest transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#EF6B4D] text-[#050d1a] font-bold"
                    : "border border-white/10 text-slate-400 hover:border-[#EF6B4D]/30 hover:text-white"
                }`}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post — larger card, only shows when "All" is selected */}
          {featuredPost && activeCategory === "All" && (
            <motion.a
              href={`/blog/${posts[0].slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={
                postsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="group block p-8 md:p-10 rounded-sm border border-white/5 hover:border-[#EF6B4D]/20 bg-[#0a1628] hover:bg-[#0a1628]/80 transition-all duration-300 mb-6"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="px-3 py-1 rounded-full bg-[#EF6B4D]/10 text-[#EF6B4D] text-xs uppercase tracking-widest"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      Featured
                    </span>
                    <span
                      className="px-3 py-1 rounded-full border border-white/10 text-slate-500 text-xs uppercase tracking-widest"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      {posts[0].category}
                    </span>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#EF6B4D] transition-colors duration-200"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {posts[0].title}
                  </h2>
                  <p
                    className="text-slate-400 leading-relaxed mb-4 max-w-2xl"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-slate-600 text-xs">
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} /> {posts[0].readTime}
                    </span>
                    <span>{posts[0].date}</span>
                  </div>
                </div>
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full border border-white/10 group-hover:border-[#EF6B4D]/30 group-hover:text-[#EF6B4D] text-slate-500 transition-all duration-200">
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                  />
                </div>
              </div>
            </motion.a>
          )}

          {/* Regular post grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={postsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {gridPosts.map((post) => (
              <motion.a
                key={post.slug}
                href={`/blog/${post.slug}`}
                variants={itemVariants}
                className="group flex flex-col p-6 rounded-sm border border-white/5 hover:border-[#EF6B4D]/20 bg-[#0a1628] hover:bg-[#0a1628]/80 transition-all duration-300"
              >
                {/* Category tag */}
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={11} className="text-[#EF6B4D]/60" />
                  <span
                    className="text-[#EF6B4D]/80 text-xs uppercase tracking-widest"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {post.category}
                  </span>
                </div>

                <h3
                  className="text-lg font-bold text-white mb-3 group-hover:text-[#EF6B4D] transition-colors duration-200 leading-snug"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {post.title}
                </h3>

                <p
                  className="text-slate-400 text-sm leading-relaxed mb-6 flex-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {post.excerpt}
                </p>

                {/* Meta row at the bottom */}
                <div className="flex items-center justify-between text-slate-600 text-xs mt-auto">
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} /> {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
          {/* Result count */}
          <p
            className="text-slate-600 text-xs text-center mt-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Showing {gridPosts.length} of{" "}
            {filteredPosts.filter((p) => !p.featured || !!searchQuery).length}{" "}
            articles
            {searchQuery && ` for "${searchQuery}"`}
          </p>

          {/* Load More button — only shows if there are more posts */}
          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="border border-white/10 hover:border-[#EF6B4D]/30 text-slate-400 hover:text-white px-8 py-3 rounded-sm text-xs uppercase tracking-widest transition-all duration-200"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Load More Articles
              </button>
            </div>
          )}

          {/* No results state */}
          {filteredPosts.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <p
                className="text-slate-500 text-lg mb-2"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                No articles found
              </p>
              <p
                className="text-slate-600 text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Try a different search term or category
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
