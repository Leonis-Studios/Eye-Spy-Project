"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { type BlogPost } from "@/app/lib/types";

export default function BlogPostClient({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts: BlogPost[];
}) {
  return (
    <main className="bg-[#050d1a]">
      {/* ── ARTICLE HEADER ────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,180,255,0.07) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />

        <div className="relative max-w-3xl mx-auto px-6 md:px-16">
          {/* Back link */}
          <motion.a
            href="/blog"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-sm mb-10 transition-colors duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <ArrowLeft size={14} /> Back to Blog
          </motion.a>

          {/* Category + meta */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-4 mb-6"
          >
            <span
              className="flex items-center gap-2 text-[#EF6B4D] text-xs uppercase tracking-widest"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              <Tag size={11} /> {post.category}
            </span>
            <span
              className="flex items-center gap-1.5 text-slate-600 text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Clock size={11} /> {post.readTime}
            </span>
            <span
              className="text-slate-600 text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {post.date}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-lg leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {post.excerpt}
          </motion.p>
        </div>
      </section>

      {/* ── ARTICLE BODY ──────────────────────────────────────────────────── */}
      <section className="relative bg-[#070f1e] py-16 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          // prose styles — applied inline since we're not using Tailwind Typography plugin
          className="max-w-3xl mx-auto px-6 md:px-16"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#94a3b8", // slate-400
            lineHeight: "1.8",
            fontSize: "1rem",
          }}
        >
          {/* Override heading styles inside article body */}
          <style>{`
            .article-body h2 {
              font-family: 'Rajdhani', sans-serif;
              font-size: 1.75rem;
              font-weight: 700;
              color: white;
              margin-top: 2rem;
              margin-bottom: 0.75rem;
            }
            .article-body p {
              margin-bottom: 0;
            }
            .article-body a {
              color: #EF6B4D;
              text-decoration: underline;
            }
          `}</style>
          <div className="article-body">
            {post.content && <PortableText value={post.content} />}
          </div>
        </motion.div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#050d1a] py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />
        <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-[#EF6B4D]/20" />
        <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-[#EF6B4D]/20" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-[#EF6B4D]/20" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-[#EF6B4D]/20" />

        <div className="max-w-2xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
          <p
            className="text-[#EF6B4D] text-xs uppercase tracking-widest mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Ready to Take Action?
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Get a Free Security Assessment
          </h2>
          <p
            className="text-slate-400 mb-8 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Let our team walk your property and recommend exactly what you need
            — no pressure, no upsell.
          </p>
          <a
            href="/#estimate-form"
            className="group flex items-center gap-3 bg-[#EF6B4D] text-[#050d1a] font-bold px-8 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Request Free Estimate
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
        </div>
      </section>

      {/* ── RELATED POSTS ─────────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="relative bg-[#070f1e] py-20 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />
          <div className="max-w-6xl mx-auto px-6 md:px-16">
            <h2
              className="text-2xl font-bold text-white mb-8"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <a
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group p-6 rounded-sm border border-white/5 hover:border-[#EF6B4D]/20 bg-[#0a1628] transition-all duration-300"
                >
                  <span
                    className="text-[#EF6B4D]/70 text-xs uppercase tracking-widest mb-3 block"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {related.category}
                  </span>
                  <h3
                    className="text-lg font-bold text-white group-hover:text-[#EF6B4D] transition-colors duration-200 mb-2"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {related.title}
                  </h3>
                  <p
                    className="text-slate-500 text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {related.readTime} · {related.date}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
