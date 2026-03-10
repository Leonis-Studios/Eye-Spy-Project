"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  type Variants,
  AnimatePresence,
} from "framer-motion";
import { siteConfig } from "@/config/site";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The team was professional and efficient. Our cameras were installed in a single afternoon and the quality is outstanding. I can monitor everything from my phone.",
    name: "James R.",
    location: "Homeowner",
    rating: 5,
  },
  {
    quote:
      "We had SecurTech install a full access control system across our warehouse. The process was seamless and they walked us through everything. Highly recommend.",
    name: "Maria T.",
    location: "Business Owner",
    rating: 5,
  },
  {
    quote:
      "Quick response, fair pricing, and they cleaned up after themselves. The alarm system has already caught one attempted break-in. Worth every penny.",
    name: "David K.",
    location: "Homeowner",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // useState tracks which testimonial is currently visible.
  // active = current index (0, 1, or 2), setActive = function to update it.
  // When setActive is called, React re-renders with the new value.
  const [active, setActive] = useState<number>(0);

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  // quoteVariants has an "exit" state — this only works with AnimatePresence.
  // exit runs when the element is removed from the DOM before it disappears.
  const quoteVariants: Variants = {
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      y: -16,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#070f1e] py-24 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,200,255,0.04) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00c8ff]/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00c8ff]/15 to-transparent" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative max-w-4xl mx-auto px-6 md:px-16 flex flex-col items-center text-center"
      >
        <p
          className="text-[#00c8ff] text-xs uppercase tracking-widest mb-12"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          What Our Clients Say
        </p>

        {/* AnimatePresence enables exit animations when elements are removed.
            mode="wait" — waits for the exit animation to finish before playing the enter.
            key={active} — changing the key tells React this is a new element,
            which triggers the exit/enter animation cycle when active changes. */}
        <div className="relative w-full min-h-50 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center"
            >
              <span
                className="text-8xl text-[#00c8ff]/10 leading-none mb-2 select-none"
                style={{ fontFamily: "Georgia, serif" }}
                aria-hidden
              >
                "
              </span>

              <p
                className="text-white/80 text-xl md:text-2xl leading-relaxed max-w-2xl mb-8"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {testimonials[active].quote}
              </p>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonials[active].rating }).map(
                  (_, i) => (
                    <span key={i} className="text-[#00c8ff] text-lg">
                      ★
                    </span>
                  ),
                )}
              </div>

              <p
                className="text-white font-semibold tracking-wide"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                {testimonials[active].name}
              </p>
              <p
                className="text-slate-500 text-sm mt-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {testimonials[active].location}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots — one per testimonial.
            Ternary operator applies different styles to the active dot vs inactive:
            condition ? styleIfTrue : styleIfFalse */}
        <div className="flex items-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-8 bg-[#00c8ff]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Prev/next arrows — functional state update pattern:
            setActive((prev) => ...) uses the previous state value directly.
            Safer than setActive(active - 1) when React batches updates.
            Wraps around at both ends using a ternary. */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() =>
              setActive((prev) =>
                prev === 0 ? testimonials.length - 1 : prev - 1,
              )
            }
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:border-[#00c8ff]/40 hover:text-[#00c8ff] transition-all duration-200"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button
            onClick={() =>
              setActive((prev) =>
                prev === testimonials.length - 1 ? 0 : prev + 1,
              )
            }
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:border-[#00c8ff]/40 hover:text-[#00c8ff] transition-all duration-200"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </motion.div>
    </section>
  );
}
