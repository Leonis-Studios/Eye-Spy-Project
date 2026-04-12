"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { siteConfig } from "../config/site";

interface Step {
  step: string;
  title: string;
  description: string;
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
      className="scroll-mt-20 realtive bg-brand-base py-24 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />
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
        <div className="relative mt-16">
          <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-brand-accent/30 to-transparent" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {steps.map((step) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <div>
                  <span
                    className="text-7xl font-bold text-brand-accent/10 mb-4 block"
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
