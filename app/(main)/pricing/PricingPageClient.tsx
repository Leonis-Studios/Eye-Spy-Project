"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { CheckCircle, ArrowRight, Plus, Minus } from "lucide-react";
import Link from "next/link";
import EstimateForm from "@/app/components/EstimateForm";
import {
  type PricingPage,
  type PricingCard,
  type PricingFaqItem,
  type Service,
} from "@/app/lib/types";

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

// Cards stagger after cables finish drawing (~1.3s)
const cardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1.3,
    },
  },
};

// ─── RJ45 PORT SYMBOL ─────────────────────────────────────────────────────────

function RJ45Port() {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      className="mb-4 opacity-40"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="26"
        height="18"
        rx="1"
        stroke="#EF6B4D"
        strokeWidth="1"
        fill="none"
      />
      {[3, 5, 8, 11, 14, 17, 20, 23].map((x) => (
        <line
          key={x}
          x1={x}
          y1="4"
          x2={x}
          y2="17"
          stroke="#EF6B4D"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  );
}

// ─── INDIVIDUAL PRICING CARD ──────────────────────────────────────────────────

function PricingCardItem({
  card,
  index,
}: {
  card: PricingCard;
  index: number;
}) {
  return (
    <motion.div variants={itemVariants} className="h-full">
      <div
        className={`relative group p-6 rounded-sm border h-full flex flex-col transition-all duration-300
          ${
            card.featured
              ? "border-brand-accent/40 bg-brand-accent/[0.03] hover:bg-brand-accent/[0.05]"
              : "border-white/5 hover:border-brand-accent/20 bg-brand-card hover:bg-brand-card/80"
          }
          md:border-l-0 border-l-2 border-l-brand-accent/30
        `}
      >
        {/* "Most Popular" badge */}
        {card.featured && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <div className="inline-flex items-center gap-1 border border-brand-accent/40 bg-brand-base px-3 py-0.5 rounded-sm">
              <span
                className="text-brand-accent font-mono text-[9px] tracking-widest uppercase"
              >
                Most Popular
              </span>
            </div>
          </div>
        )}

        {/* RJ45 port symbol */}
        <RJ45Port />

        {/* Port label tag */}
        <div className="inline-flex items-center gap-1 mb-4 border border-brand-accent/40 bg-brand-accent/5 px-2 py-0.5 rounded-sm self-start">
          <span className="text-brand-accent/80 font-mono text-[9px] tracking-widest uppercase">
            SVC / {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Service icon */}
        {card.service?.icon && (
          <span className="text-2xl mb-2 block">{card.service.icon}</span>
        )}

        {/* Service title — links to service detail page */}
        {card.service && (
          <Link href={`/services/${card.service.slug}`}>
            <h3
              className="text-xl font-bold text-white mb-2 hover:text-brand-accent transition-colors duration-200"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              {card.service.title}
            </h3>
          </Link>
        )}

        {/* Price label */}
        <p
          className="text-3xl font-bold text-brand-accent mb-1"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          {card.priceLabel}
        </p>

        {/* Price note */}
        {card.priceNote && (
          <p
            className="text-slate-500 text-xs mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {card.priceNote}
          </p>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-4" />

        {/* Highlights checklist */}
        {card.highlights && card.highlights.length > 0 && (
          <ul className="space-y-2 flex-1 mb-6">
            {card.highlights.map((h, hi) => (
              <li
                key={hi}
                className="flex items-start gap-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <CheckCircle
                  size={14}
                  className="text-brand-accent mt-0.5 shrink-0"
                />
                <span className="text-slate-300 text-sm leading-relaxed">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA button — links to service page's estimate form anchor */}
        {card.service && (
          <Link
            href={`/services/${card.service.slug}#estimate-form`}
            className={`group mt-auto flex items-center justify-center gap-2 font-bold px-5 py-3 rounded-sm text-xs uppercase tracking-widest transition-colors duration-200
              ${
                card.featured
                  ? "bg-brand-accent text-brand-base hover:bg-white"
                  : "border border-brand-accent/40 text-brand-accent hover:bg-brand-accent hover:text-brand-base"
              }
            `}
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            {card.ctaLabel ?? "Get a Quote"}
            <ArrowRight
              size={13}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ─── CABLE OVERLAY ────────────────────────────────────────────────────────────
// Renders animated SVG cable lines that drop from the top of the section
// to each card. Desktop only (hidden md:block).

function CableOverlay({
  cardRefs,
  sectionRef,
  isInView,
  cardCount,
}: {
  cardRefs: React.RefObject<HTMLDivElement | null>[];
  sectionRef: React.RefObject<HTMLDivElement | null>;
  isInView: boolean;
  cardCount: number;
}) {
  const [paths, setPaths] = useState<string[]>([]);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const section = sectionRef.current;
    const sectionRect = section.getBoundingClientRect();
    const svgWidth = sectionRect.width;
    const svgHeight = sectionRect.height;

    const newPaths: string[] = [];

    cardRefs.forEach((ref) => {
      if (!ref.current) return;
      const cardRect = ref.current.getBoundingClientRect();
      const cx = cardRect.left - sectionRect.left + cardRect.width / 2;
      const cy = cardRect.top - sectionRect.top;
      // Right-angle path: drop from top, horizontal run to card mid-x, then down
      const startY = 0;
      const midY = Math.max(cy - 32, 20);
      const path = `M ${cx} ${startY} L ${cx} ${midY} L ${cx} ${cy}`;
      newPaths.push(path);
    });

    setPaths(newPaths);
    setDims({ width: svgWidth, height: svgHeight });
  }, [isInView, cardRefs, sectionRef, cardCount]);

  if (paths.length === 0) return null;

  return (
    <svg
      className="hidden md:block absolute inset-0 pointer-events-none"
      width={dims.width}
      height={dims.height}
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <g key={i}>
          {/* Glow halo */}
          <motion.path
            d={d}
            stroke="#EF6B4D"
            strokeWidth={4}
            strokeOpacity={0.07}
            strokeLinecap="square"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
          {/* Main cable */}
          <motion.path
            d={d}
            stroke="#EF6B4D"
            strokeWidth={1.5}
            strokeOpacity={0.25}
            strokeLinecap="square"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
          {/* Terminus dot */}
          {paths[i] && (() => {
            const parts = paths[i].split(" ");
            const tx = parseFloat(parts[parts.length - 2]);
            const ty = parseFloat(parts[parts.length - 1]);
            return (
              <motion.circle
                cx={tx}
                cy={ty}
                r={3}
                fill="#EF6B4D"
                fillOpacity={0.5}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.2,
                  delay: i * 0.15 + 0.7,
                }}
              />
            );
          })()}
        </g>
      ))}
    </svg>
  );
}

// ─── FAQ ACCORDION ────────────────────────────────────────────────────────────

function FaqAccordion({ items, title }: { items: PricingFaqItem[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative bg-brand-base py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />
      <div className="max-w-3xl mx-auto px-6 md:px-16" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-brand-accent text-xs uppercase tracking-widest text-center mb-3"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Questions & Answers
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          {title ?? "Pricing FAQs"}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-3"
        >
          {items.map((item, i) => (
            <motion.div
              key={item._key}
              variants={itemVariants}
              className="border border-white/5 rounded-sm overflow-hidden"
            >
              {/* Question row */}
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group hover:bg-brand-accent/5 transition-colors duration-200"
              >
                {/* Port tag */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="shrink-0 font-mono text-[9px] tracking-widest uppercase text-brand-accent/60 border border-brand-accent/30 px-1.5 py-0.5 rounded-sm">
                    Q-{String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-white font-semibold text-sm leading-snug group-hover:text-brand-accent transition-colors duration-200"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {item.question}
                  </span>
                </div>
                <span className="shrink-0 text-brand-accent/60">
                  {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              {/* Answer */}
              {openIndex === i && (
                <div className="px-5 pb-5 border-t border-white/5">
                  <p
                    className="text-slate-400 text-sm leading-relaxed pt-4"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.answer}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />
    </section>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

export default function PricingPageClient({
  pricingData,
  services,
}: {
  pricingData: PricingPage | null;
  services: Service[];
}) {
  const cards = pricingData?.pricingCards ?? [];
  const hasFaq =
    !!pricingData?.faqItems && pricingData.faqItems.length > 0;
  const hasCards = cards.length > 0;

  // Refs for cable overlay measurement
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<React.RefObject<HTMLDivElement | null>[]>(
    Array.from({ length: cards.length }, () =>
      React.createRef<HTMLDivElement>()
    )
  );

  const cardsInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Rebuild card refs if card count changes
  if (cardRefs.current.length !== cards.length) {
    cardRefs.current = Array.from({ length: cards.length }, () =>
      React.createRef<HTMLDivElement>()
    );
  }

  return (
    <main className="min-h-screen bg-brand-base">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(239,107,77,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 md:px-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-brand-accent text-xs uppercase tracking-widest mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Pricing
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            <span
              style={{
                background:
                  "linear-gradient(90deg, #EF6B4D 0%, #f08060 60%, #f4a080 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {pricingData?.pageTitle ?? "Transparent Pricing"}
            </span>
          </motion.h1>

          {(pricingData?.pageSubtitle) && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-white/80 text-xl font-semibold mb-4"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              {pricingData.pageSubtitle}
            </motion.p>
          )}

          {(pricingData?.introText) && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {pricingData.introText}
            </motion.p>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />

      {/* ── Pricing Cards Grid ───────────────────────────────────────────────── */}
      {hasCards && (
        <section
          ref={sectionRef}
          className="relative bg-brand-surface py-24 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />

          <div className="max-w-6xl mx-auto px-6 md:px-16 relative">
            {/* Section label */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-brand-accent text-xs uppercase tracking-widest text-center mb-3"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Service Tiers
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Choose Your Service
            </motion.h2>

            {/* Cable overlay — desktop only, positioned relative to the grid */}
            <div className="relative">
              <CableOverlay
                cardRefs={cardRefs.current}
                sectionRef={sectionRef}
                isInView={cardsInView}
                cardCount={cards.length}
              />

              {/* Cards grid */}
              <motion.div
                variants={cardContainerVariants}
                initial="hidden"
                animate={cardsInView ? "visible" : "hidden"}
                className={`grid gap-6 ${
                  cards.length === 1
                    ? "grid-cols-1 max-w-sm mx-auto"
                    : cards.length === 2
                    ? "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto"
                    : "grid-cols-1 md:grid-cols-3"
                }`}
              >
                {cards.map((card, i) => (
                  <div key={card._key} ref={cardRefs.current[i]}>
                    <PricingCardItem card={card} index={i} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Disclaimer */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center text-slate-600 text-xs mt-10"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              All prices are estimates. Final pricing depends on site conditions and scope. Contact us for an exact quote.
            </motion.p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />
        </section>
      )}

      {/* ── FAQ Section ──────────────────────────────────────────────────────── */}
      {hasFaq && (
        <FaqAccordion
          items={pricingData!.faqItems!}
          title={pricingData?.faqTitle}
        />
      )}

      {/* ── Bottom CTA + Estimate Form ───────────────────────────────────────── */}
      <div className={`${hasFaq ? "bg-brand-surface" : "bg-brand-base"} pt-12`}>
        {hasFaq && (
          <div className="h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />
        )}
        <div className="max-w-3xl mx-auto px-6 md:px-16 text-center mb-0 pt-12">
          <p
            className="text-brand-accent text-xs uppercase tracking-widest mb-3"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Ready to Get Started?
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            {pricingData?.bottomCtaHeading ?? "Get Your Free Estimate"}
          </h2>
          {pricingData?.bottomCtaText && (
            <p
              className="text-slate-400 mt-4 text-base leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {pricingData.bottomCtaText}
            </p>
          )}
        </div>
        <EstimateForm services={services} />
      </div>
    </main>
  );
}
