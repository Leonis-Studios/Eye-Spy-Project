"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  type Variants,
  AnimatePresence,
} from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { siteConfig } from "../config/site";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How long does a typical installation take?",
    answer:
      "Most residential installations are completed in a single day. Larger commercial projects may take 2–3 days depending on the scope. We'll give you a clear timeline during your free estimate.",
  },
  {
    question: "Do I need to be home during the installation?",
    answer:
      "Yes, we ask that an adult be present during the installation so we can walk you through the system and answer any questions on the spot.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We currently service the greater [City] area and surrounding communities within a 50-mile radius. Contact us to confirm your location.",
  },
  {
    question: "Do your systems require a monthly monitoring contract?",
    answer:
      "No. We install the hardware and you choose whether to add monitoring. We work with several monitoring providers and can recommend options, but there's no obligation.",
  },
  {
    question: "What warranty do you offer?",
    answer:
      "All installations come with a 1-year labor warranty. Equipment warranties vary by manufacturer, typically 2–5 years. We'll provide full warranty documentation after installation.",
  },
  {
    question: "Can you work with my existing system?",
    answer:
      "In many cases yes — we can assess your existing setup during the site survey and advise whether it can be expanded or upgraded rather than replaced entirely.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // openIndex tracks which FAQ item is currently expanded.
  // null means nothing is open. A number means that index is open.
  // Unlike Testimonials where active was always a number,
  // here we use "number | null" — a union type meaning it can be either.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Toggle logic — if the clicked item is already open, close it (set null).
  // If a different item is clicked, open that one instead.
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
      className="relative bg-[#080e1d] py-24 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 md:px-16">
        {/* Heading */}
        <div className="mb-14 flex flex-col items-center text-center">
          <p
            className="text-[#EF6B4D] text-xs uppercase tracking-widest mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Common Questions
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
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
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              variants={itemVariants}
              // Bottom border on each item except the last one
              className={`border-b ${i === faqs.length - 1 ? "border-transparent" : "border-white/5"}`}
            >
              {/* Question row — clicking this toggles the answer */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span
                  // Ternary — active question is white, inactive is slate
                  className={`text-base font-medium transition-colors duration-200 pr-8 ${
                    openIndex === i
                      ? "text-white"
                      : "text-slate-300 group-hover:text-white"
                  }`}
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "1.05rem",
                  }}
                >
                  {faq.question}
                </span>

                {/* Icon — shows Plus when closed, Minus when open.
                    Conditional rendering with a ternary:
                    openIndex === i ? <Minus /> : <Plus />
                    This renders a completely different element based on state. */}
                <span
                  className={`shrink-0 transition-colors duration-200 ${
                    openIndex === i
                      ? "text-[#EF6B4D]"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                >
                  {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              {/* Answer — AnimatePresence + conditional rendering.
                  {openIndex === i && <motion.div>} means:
                  only render this element when openIndex equals i.
                  When it becomes false, the element is removed — AnimatePresence
                  catches that removal and plays the exit animation first. */}
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    // Animate height from 0 to "auto" — this is how you animate
                    // an element expanding/collapsing without knowing its height.
                    // "auto" tells Framer Motion to measure the natural height.
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1] as [
                        number,
                        number,
                        number,
                        number,
                      ],
                    }}
                    // overflow-hidden is essential — without it the content would
                    // be visible even when height is 0 during animation
                    className="overflow-hidden"
                  >
                    <p
                      className="text-slate-400 text-base leading-relaxed pb-5"
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
