"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "../config/site";
import { type SiteSettings } from "../lib/types";

export default function CTA({ settings }: { settings: SiteSettings }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const variants: Variants = {
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

  const scrollToForm = () => {
    document
      .getElementById("estimate-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050d1a] py-32 overflow-hidden"
    >
      {/* Multi-layer background — stronger glow than other sections
          since this is a high-attention conversion moment */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(8, 124, 167, 0.09) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Accent lines — top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FA8334]/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FA8334]/25 to-transparent" />

      {/* Corner accents — purely decorative geometric detail */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-[#087ca7]/20" />
      <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-[#087ca7]/20" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-[#087ca7]/20" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-[#087ca7]/20" />

      {/* Main content — centered */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
        <motion.p
          custom={0}
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-[#9ceaef] text-xs uppercase tracking-widest mb-6"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Get Started Today
        </motion.p>

        <motion.h2
          custom={1}
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Ready to Secure
          <br />
          <span
            style={{
              background:
                "linear-gradient(90deg, #087ca7 0%, #68d8d6 70%, #fa8334 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Your Property?
          </span>
        </motion.h2>

        <motion.p
          custom={2}
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-slate-400 text-lg max-w-xl leading-relaxed mb-10"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Get a no-obligation estimate from our team. We'll assess your property
          and recommend the right system for your needs and budget.
        </motion.p>

        <motion.div
          custom={3}
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={scrollToForm}
            className="group flex items-center gap-3 bg-[#FA8334] text-[#050d1a] font-bold px-10 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Get a Free Estimate
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
          <a
            href={siteConfig.phoneHref}
            className="text-slate-400 hover:text-white text-sm tracking-wide transition-colors duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            or call{" "}
            <span className="text-white font-medium">{settings.phone}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
