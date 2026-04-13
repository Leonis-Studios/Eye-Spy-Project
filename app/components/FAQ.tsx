"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  type Variants,
  AnimatePresence,
} from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { type FaqItem } from "../lib/types";

export default function FAQ({ items }: { items: FaqItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-brand-surface py-24 overflow-hidden"
    >
      {/* Atmospheric glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,200,255,0.04) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div className="max-w-3xl mx-auto px-6 md:px-16">
        {/* Heading */}
        <div className="mb-14 flex flex-col items-center text-center">
          {/* Cable label tag */}
          <div className="inline-flex items-center gap-1 mb-4 border border-brand-accent/40 bg-brand-accent/5 px-2 py-0.5 rounded-xs" aria-hidden="true">
            <span className="text-brand-accent/80 font-mono text-[10px] tracking-widest uppercase">
              COMMON QUESTIONS
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-text-primary"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Frequently Asked
          </h2>
        </div>

        {/* FAQ list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col"
        >
          {items.map((faq, i) => (
            <motion.div
              key={faq.question}
              variants={itemVariants}
              className={`border-b ${i === items.length - 1 ? "border-transparent" : "border-white/5"}`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-4 py-5 text-left group"
              >
                {/* Port identifier — Q-XX label on the left of each row */}
                <span
                  className="font-mono text-[9px] tracking-widest text-brand-accent/60 uppercase shrink-0 hidden sm:block w-8"
                  aria-hidden="true"
                >
                  Q-{String(i + 1).padStart(2, "0")}
                </span>

                <span
                  className={`flex-1 text-base font-medium transition-colors duration-200 pr-4 ${
                    openIndex === i
                      ? "text-text-primary"
                      : "text-text-nav group-hover:text-text-primary"
                  }`}
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {faq.question}
                </span>

                {/* Toggle icon — port connection indicator styling */}
                <span
                  className={`shrink-0 flex items-center justify-center w-6 h-6 border transition-colors duration-200 ${
                    openIndex === i
                      ? "border-brand-accent/40 text-brand-accent"
                      : "border-white/10 text-text-muted group-hover:border-brand-accent/25 group-hover:text-text-nav"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  {openIndex === i ? <Minus size={12} /> : <Plus size={12} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                    }}
                    className="overflow-hidden"
                  >
                    {/* Left border on answer — patch panel aesthetic */}
                    <p
                      className="text-text-secondary text-base leading-relaxed pb-5 pl-4 sm:pl-12 border-l-2 border-brand-accent/35"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
