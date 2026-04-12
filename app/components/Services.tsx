"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Link from "next/link";
import { type Service } from "@/app/lib/types";

export default function Services({ services }: { services: Service[] }) {
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

  return (
    <section
      id="services"
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
          What We Offer
        </p>
        <h2
          className="text-4xl md:text-6xl font-bold text-text-primary"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Our Services
        </h2>
        <p
          className="text-text-secondary mt-4 text-lg max-w-2xl"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Everything we install, built to last.
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {services.map((service) => (
            <motion.div key={service._id} variants={itemVariants}>
              <div className="group p-8 rounded-sm border border-white/5 hover:border-brand-accent/20 bg-brand-card hover:bg-brand-card/80 transition-all duration-300 h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-block text-brand-accent text-xs uppercase tracking-widest bg-brand-accent/10 px-2.5 py-0.5 rounded-sm mb-4 hover:underline hover:opacity-80 transition-opacity duration-200"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {service.title}
                </Link>
                {service.icon && (
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-accent/10 text-brand-accent mb-4 group-hover:bg-brand-accent/20 transition-colors duration-300 text-xl">
                    {service.icon}
                  </span>
                )}
                <h3
                  className="text-xl font-bold text-text-primary mb-2"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-text-secondary text-base leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {service.shortDescription}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
