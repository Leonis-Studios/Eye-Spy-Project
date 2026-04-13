"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

interface Step {
  step: string;
  title: string;
  description: string;
}

interface JunctionPoint {
  x: number;
  y: number;
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerDivRef = useRef<HTMLDivElement>(null);
  const [connectionPath, setConnectionPath] = useState<string>("");
  const [junctionPoints, setJunctionPoints] = useState<JunctionPoint[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Measure step card positions and compute a routed cable path between them
  useEffect(() => {
    if (!isInView || !containerDivRef.current) return;
    const containerRect = containerDivRef.current.getBoundingClientRect();
    const rects = stepRefs.current.map((el) =>
      el ? el.getBoundingClientRect() : null
    );
    if (rects.some((r) => !r)) return;

    const [r0, r1, r2] = rects as DOMRect[];

    // Port connection points — right edge of card 0, left/right edges of card 1, left edge of card 2
    // All coordinates relative to the container div
    const p0x = r0.right  - containerRect.left; // exit of step 1
    const p3x = r2.left   - containerRect.left; // entry of step 3
    const midY = r0.top - containerRect.top + r0.height / 2; // vertical center of the port row

    // Cable routing: runs straight from step 1 → step 3 with a rectangular bump/dip
    // through the middle section (cable slack / routing loop)
    const bump = 18; // px downward detour in the middle third
    const seg1x = r1.left  - containerRect.left; // start of mid-step zone
    const seg2x = r1.right - containerRect.left; // end of mid-step zone

    const path = [
      `M ${p0x},${midY}`,
      `L ${seg1x},${midY}`,
      `L ${seg1x},${midY + bump}`,
      `L ${seg2x},${midY + bump}`,
      `L ${seg2x},${midY}`,
      `L ${p3x},${midY}`,
    ].join(" ");

    const junctions: JunctionPoint[] = [
      { x: p0x,  y: midY },
      { x: seg1x, y: midY },
      { x: seg2x, y: midY },
      { x: p3x,  y: midY },
    ];

    setConnectionPath(path);
    setJunctionPoints(junctions);
  }, [isInView]);

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

  // Cable draw — single continuous path
  const cableVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: prefersReducedMotion ? 0 : 0.9,
          delay: 0.3,
          ease: "easeInOut",
        },
        opacity: { duration: 0.01, delay: 0.3 },
      },
    },
  };

  // Junction dots pop in sequentially after the cable passes through each point
  const dotVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: prefersReducedMotion ? 0 : 0.8 + i * 0.1,
      },
    }),
  };

  const steps: Step[] = [
    {
      step: "01",
      title: "Request a Free Estimate",
      description:
        "Contact us to discuss your project and receive a no-obligation quote.",
    },
    {
      step: "02",
      title: "We Survey Your Property",
      description:
        "Our team will visit your location to assess the scope of the project.",
    },
    {
      step: "03",
      title: "We Install Your System",
      description:
        "Our experts will handle the installation process, ensuring everything is set up correctly.",
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="scroll-mt-20 relative bg-brand-base py-24 overflow-hidden"
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
          The Process
        </p>
        <h2
          className="text-4xl md:text-6xl font-bold text-text-primary"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          How It Works
        </h2>
        <p
          className="text-text-secondary mt-4 text-lg max-w-2xl"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Our simple 3-step process to get you up and running quickly.
        </p>

        {/* Step grid — position: relative so the cable SVG can sit inside it */}
        <div ref={containerDivRef} className="relative mt-16 w-full">

          {/* Routed cable SVG between steps — desktop only, decorative */}
          {connectionPath && (
            <div
              className="hidden md:block absolute inset-0 pointer-events-none"
              aria-hidden="true"
            >
              <svg
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
              >
                {/* Glow halo */}
                <motion.path
                  d={connectionPath}
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
                  d={connectionPath}
                  stroke="#EF6B4D"
                  strokeOpacity="0.40"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="square"
                  variants={cableVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                />
                {/* Junction dots at each routing point */}
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
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <div
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className="flex flex-col items-center text-center border-l-2 border-brand-accent/20 pl-4 md:border-l-0 md:pl-0"
                >
                  {/* RJ45 port symbol — visual cabling identifier */}
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

                  {/* Cable label tag — P-touch aesthetic */}
                  <div className="inline-flex items-center gap-1 mb-3 border border-brand-accent/40 bg-brand-accent/5 px-2 py-0.5 rounded-xs">
                    <span
                      className="text-brand-accent/80 font-mono text-[10px] tracking-widest uppercase"
                    >
                      PORT {step.step}
                    </span>
                  </div>

                  {/* Ghost step number — reduced opacity for patch panel bg feel */}
                  <span
                    className="text-7xl font-bold text-brand-accent/15 mb-4 block"
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
