"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Cctv, CableCar, Heater, NavigationOff } from "lucide-react";
import { siteConfig } from "../config/site";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Services() {
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

  const services: Service[] = [
    {
      icon: <Cctv size={22} />,
      title: "Surveillance Systems",
      description:
        "State-of-the-art CCTV solutions for comprehensive security coverage.",
    },
    {
      icon: <CableCar size={22} />,
      title: "Alarm Systems",
      description:
        "State-of-the-art alarm solutions for comprehensive security coverage.",
    },
    {
      icon: <Heater size={22} />,
      title: "Heating Systems",
      description:
        "Energy-efficient heating solutions for residential and commercial properties.",
    },
    {
      icon: <NavigationOff size={22} />,
      title: "Security Consulting",
      description:
        "Expert advice and strategies for comprehensive security management.",
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="scroll-mt-20 relative bg-[#070f1e] py-24 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />
      <div className="max-w-6xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
        <p
          className="text-[#EF6B4D] text-xs uppercase tracking-widest mb-4"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          What We Offer
        </p>
        <h2
          className="text-4xl md:text-6xl font-bold text-white"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Our Services
        </h2>
        <p
          className="text-slate-400 mt-4 text-lg max-w-2xl"
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
            <motion.div key={service.title} variants={itemVariants}>
              <div className="group p-8 rounded-sm border border-white/5 hover:border-[#EF6B4D]/20 bg-[#0a1628] hover:bg-[#0a1628]/80 transition-all duration-300 h-full">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#EF6B4D]/10 text-[#EF6B4D] mb-4 group-hover:bg-[#EF6B4D]/20 transition-colors duration-300">
                  {service.icon}
                </span>
                <h3
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-slate-400 text-base leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
