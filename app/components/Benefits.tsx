"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ShieldCheck, Clock, Wrench, HeadphonesIcon } from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface CablePath {
  d: string;
  termX: number;
  termY: number;
}

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cablePaths, setCablePaths] = useState<CablePath[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Measure card positions relative to section and compute cable paths
  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const computePaths = () => {
      if (!sectionRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const paths = cardRefs.current.map((card, i) => {
        if (!card) return null;
        const rect = card.getBoundingClientRect();
        const relTop   = rect.top   - sectionRect.top;
        const relLeft  = rect.left  - sectionRect.left;
        const relRight = rect.right - sectionRect.left;
        const cardMidY = relTop + rect.height / 2;
        const isLeft   = i % 2 === 0; // 0,2 = left column; 1,3 = right column
        const entryY   = cardMidY - 20; // slight offset above card center

        if (isLeft) {
          // Cable enters from left edge, runs right, drops to card mid, plugs in
          return {
            d: `M 0,${entryY} L ${relLeft - 20},${entryY} L ${relLeft - 20},${cardMidY} L ${relLeft},${cardMidY}`,
            termX: relLeft,
            termY: cardMidY,
          };
        } else {
          // Cable enters from right edge, runs left, drops to card mid, plugs in
          const W = sectionRect.width;
          return {
            d: `M ${W},${entryY} L ${relRight + 20},${entryY} L ${relRight + 20},${cardMidY} L ${relRight},${cardMidY}`,
            termX: relRight,
            termY: cardMidY,
          };
        }
      });
      setCablePaths(paths.filter(Boolean) as CablePath[]);
    };

    computePaths();
    window.addEventListener("resize", computePaths);
    return () => {
      window.removeEventListener("resize", computePaths);
    };
  }, [isInView]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: prefersReducedMotion ? 0.1 : 1.3, // wait for cables to finish drawing
      },
    },
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

  // Cable draw animation — pathLength 0→1 with per-cable stagger via custom prop
  const cableVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: prefersReducedMotion ? 0 : 0.7,
          delay: i * 0.15,
          ease: "easeInOut",
        },
        opacity: { duration: 0.01, delay: i * 0.15 },
      },
    }),
  };

  // Port connector dot pops in after its cable finishes drawing
  const dotVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: prefersReducedMotion ? 0 : i * 0.15 + 0.7,
      },
    }),
  };

  const benefits: Benefit[] = [
    {
      icon: <ShieldCheck size={22} />,
      title: "Secure & Reliable",
      description:
        "Your data is protected with enterprise-grade security measures.",
    },
    {
      icon: <Clock size={22} />,
      title: "Time-Efficient",
      description:
        "Save hours with our streamlined workflow and automation features.",
    },
    {
      icon: <Wrench size={22} />,
      title: "Easy to Use",
      description: "Intuitive interface designed for seamless user experience.",
    },
    {
      icon: <HeadphonesIcon size={22} />,
      title: "24/7 Support",
      description: "Our dedicated support team is always ready to assist you.",
    },
  ];

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="scroll-mt-20 relative bg-brand-surface py-24 overflow-hidden"
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

      {/* Cable SVG overlay — desktop only, purely decorative */}
      {cablePaths.length > 0 && (
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            width="100%"
            height="100%"
            style={{ position: "absolute", inset: 0, overflow: "visible" }}
          >
            {cablePaths.map((cable, i) => (
              <React.Fragment key={i}>
                {/* Glow halo — wide, low opacity, behind the main line */}
                <motion.path
                  d={cable.d}
                  stroke="#EF6B4D"
                  strokeOpacity="0.12"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="square"
                  variants={cableVariants}
                  custom={i}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                />
                {/* Main cable line */}
                <motion.path
                  d={cable.d}
                  stroke="#EF6B4D"
                  strokeOpacity="0.40"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="square"
                  variants={cableVariants}
                  custom={i}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                />
                {/* Port connector dot at cable terminus */}
                <motion.circle
                  cx={cable.termX}
                  cy={cable.termY}
                  r="3"
                  fill="#EF6B4D"
                  fillOpacity="0.8"
                  variants={dotVariants}
                  custom={i}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                />
              </React.Fragment>
            ))}
          </svg>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
        <p
          className="text-brand-accent text-xs uppercase tracking-widest mb-4"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Why We're Different
        </p>
        <h2
          className="text-4xl md:text-6xl font-bold text-text-primary"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Why choose SecurTech?
        </h2>
        <p
          className="text-text-secondary mt-4 text-lg max-w-2xl"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Everything you need from a security company - done right, the first
          time.
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={benefit.title} variants={itemVariants}>
              <div
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="group p-8 rounded-sm border border-white/5 hover:border-brand-accent/20 bg-brand-card hover:bg-brand-card/80 transition-all duration-300 h-full"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-accent/10 text-brand-accent mb-4 group-hover:bg-brand-accent/20 transition-colors duration-300">
                  {benefit.icon}
                </span>
                <h3
                  className="text-xl font-bold text-text-primary mb-2"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {benefit.title}
                </h3>
                <p
                  className="text-text-secondary text-base leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
