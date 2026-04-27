"use client";

import { Fragment, useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { howItWorksSteps } from "../config/howItWorks";
import { type HowItWorksStep } from "../lib/types";

interface JunctionPoint {
  x: number;
  y: number;
}

interface HowItWorksProps {
  steps?: HowItWorksStep[];
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}

export default function HowItWorks({
  steps: propSteps,
  eyebrow = "The Process",
  heading = "How It Works",
  subheading = "Our simple process to get you up and running quickly.",
}: HowItWorksProps) {
  const steps: HowItWorksStep[] = propSteps?.length ? propSteps : howItWorksSteps;

  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerDivRef = useRef<HTMLDivElement>(null);
  const [connectionPaths, setConnectionPaths] = useState<string[]>([]);
  const [junctionPoints, setJunctionPoints] = useState<JunctionPoint[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Compute cable paths between consecutive cards on the same row
  useEffect(() => {
    if (!isInView || !containerDivRef.current) return;

    const compute = () => {
      if (!containerDivRef.current) return;
      const containerRect = containerDivRef.current.getBoundingClientRect();
      const rects = stepRefs.current
        .slice(0, steps.length)
        .map((el) => (el ? el.getBoundingClientRect() : null));
      if (rects.some((r) => !r)) return;

      const newPaths: string[] = [];
      const newJunctions: JunctionPoint[] = [];

      for (let i = 0; i < rects.length - 1; i++) {
        const r0 = rects[i] as DOMRect;
        const r1 = rects[i + 1] as DOMRect;
        const midY0 = r0.top - containerRect.top + r0.height / 2;
        const midY1 = r1.top - containerRect.top + r1.height / 2;

        // Only connect cards on the same row (same vertical center within threshold)
        if (Math.abs(midY0 - midY1) < 30) {
          const x0 = r0.right - containerRect.left;
          const x1 = r1.left - containerRect.left;
          const y = midY0;
          newPaths.push(`M ${x0},${y} L ${x1},${y}`);
          newJunctions.push({ x: x0, y });
          newJunctions.push({ x: x1, y });
        }
      }

      setConnectionPaths(newPaths);
      setJunctionPoints(newJunctions);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [isInView, steps.length]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: prefersReducedMotion ? 0.1 : 0.5,
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

  const cableVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: prefersReducedMotion ? 0 : 0.8,
          delay: 0.3,
          ease: "easeInOut",
        },
        opacity: { duration: 0.01, delay: 0.3 },
      },
    },
  };

  const dotVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: prefersReducedMotion ? 0 : 0.8 + i * 0.08,
      },
    }),
  };

  // Static grid class strings so Tailwind includes them in its output
  const gridClass =
    steps.length <= 3
      ? "grid-cols-1 sm:grid-cols-3"
      : steps.length === 4
      ? "grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="scroll-mt-20 relative bg-brand-base py-16 md:py-24 overflow-hidden"
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

      <div className="max-w-6xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
        <p
          className="text-brand-accent text-xs uppercase tracking-widest mb-4"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          {eyebrow}
        </p>
        <h2
          className="text-4xl md:text-6xl font-bold text-text-primary"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          {heading}
        </h2>
        <p
          className="text-text-secondary mt-4 text-lg max-w-2xl"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {subheading}
        </p>

        {/* Step grid — position:relative for the cable SVG */}
        <div ref={containerDivRef} className="relative mt-12 md:mt-16 w-full">

          {/* Routed cable SVG — desktop only, decorative */}
          {connectionPaths.length > 0 && (
            <div
              className="hidden md:block absolute inset-0 pointer-events-none"
              aria-hidden="true"
            >
              <svg
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  overflow: "visible",
                }}
              >
                {connectionPaths.map((path, i) => (
                  <Fragment key={i}>
                    {/* Glow halo */}
                    <motion.path
                      d={path}
                      stroke="#EF6B4D"
                      strokeOpacity="0.12"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="square"
                      variants={cableVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                    />
                    {/* Main cable line */}
                    <motion.path
                      d={path}
                      stroke="#EF6B4D"
                      strokeOpacity="0.40"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="square"
                      variants={cableVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                    />
                  </Fragment>
                ))}
                {/* Junction dots */}
                {junctionPoints.map((pt, i) => (
                  <motion.circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r="3"
                    fill="#EF6B4D"
                    fillOpacity="0.8"
                    variants={dotVariants}
                    custom={i}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  />
                ))}
              </svg>
            </div>
          )}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`grid ${gridClass} gap-8 sm:gap-10 md:gap-12`}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <div
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className="flex flex-col items-center text-center w-full border-l-2 border-brand-accent/20 pl-4 sm:border-l-0 sm:pl-0"
                >
                  {/* RJ45 port symbol */}
                  <svg
                    width="28"
                    height="20"
                    viewBox="0 0 28 20"
                    fill="none"
                    aria-hidden="true"
                    className="mx-auto mb-3"
                  >
                    <rect
                      x="1" y="1" width="26" height="18" rx="1"
                      stroke="#EF6B4D" strokeOpacity="0.6" strokeWidth="1"
                    />
                    {[4, 6.5, 9, 11.5, 14, 16.5, 19, 21.5].map((x, i) => (
                      <line
                        key={i}
                        x1={x} y1="5" x2={x} y2="15"
                        stroke="#EF6B4D" strokeOpacity="0.7" strokeWidth="0.8"
                      />
                    ))}
                  </svg>

                  {/* Cable label tag */}
                  <div className="inline-flex items-center gap-1 mb-3 border border-brand-accent/40 bg-brand-accent/5 px-2 py-0.5 rounded-xs">
                    <span className="text-brand-accent/80 font-mono text-[10px] tracking-widest uppercase">
                      PORT {step.step}
                    </span>
                  </div>

                  {/* Ghost step number */}
                  <span
                    className="text-5xl sm:text-7xl font-bold text-brand-accent/15 mb-4 block leading-none"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {step.step}
                  </span>

                  <h3
                    className="text-lg font-bold text-text-primary mb-2"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-text-secondary text-sm leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
