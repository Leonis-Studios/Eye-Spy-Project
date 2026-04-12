"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ShieldCheck, Clock, Wrench, HeadphonesIcon } from "lucide-react";
import { siteConfig } from "../config/site";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: {}, // container itself doesn't animate — just controls children timing
    visible: {
      transition: {
        staggerChildren: 0.1, // each child starts 100ms after the previous
        delayChildren: 0.1, // wait 100ms before starting the first child
      },
    },
  };

  // Item variant — applied to each individual card/item inside the container.
  // Each item starts invisible and 20px below, then rises up to full opacity.
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
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />
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
          {benefits.map((benefit) => (
            <motion.div key={benefit.title} variants={itemVariants}>
              <div className="group p-8 rounded-sm border border-white/5 hover:border-brand-accent/20 bg-brand-card hover:bg-brand-card/80 transition-all duration-300 h-full">
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
