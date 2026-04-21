"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowLeft, CheckCircle, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/app/lib/sanity";
import EstimateForm from "@/app/components/EstimateForm";
import { type ServicePage, type Service } from "@/app/lib/types";

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

export default function ServicePageClient({
  service,
  services,
}: {
  service: ServicePage;
  services: Service[];
}) {
  const featuresRef = useRef<HTMLUListElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const galleryInView = useInView(galleryRef, { once: true, amount: 0.1 });

  const hasImages = service.images && service.images.length > 0;
  const hasFeatures = service.features && service.features.length > 0;
  const hasLongDescription =
    service.longDescription && service.longDescription.length > 0;

  return (
    <main className="min-h-screen bg-brand-base">
      <style>{`
        .service-body h2 {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .service-body h3 {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #e2e8f0;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .service-body p {
          font-family: 'DM Sans', sans-serif;
          color: #94a3b8;
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }
        .service-body blockquote {
          border-left: 3px solid #EF6B4D;
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          color: #cbd5e1;
          font-style: italic;
        }
        .service-body ul {
          list-style: disc;
          padding-left: 1.5rem;
          color: #94a3b8;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }
        .service-body ol {
          list-style: decimal;
          padding-left: 1.5rem;
          color: #94a3b8;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }
        .service-body strong { color: #ffffff; }
        .service-body em { color: #cbd5e1; }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(239,107,77,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <div className="flex items-center gap-4 mb-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <ArrowLeft size={16} /> Back to Services
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-brand-accent/70 hover:text-brand-accent text-sm transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Tag size={14} /> View Pricing
            </Link>
          </div>

          {service.icon && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent/10 text-3xl mb-6"
            >
              {service.icon}
            </motion.span>
          )}

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-brand-accent text-xs uppercase tracking-widest mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Our Services
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
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
              {service.title}
            </span>
          </motion.h1>

          {service.shortDescription && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-slate-400 text-lg leading-relaxed max-w-2xl"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {service.shortDescription}
            </motion.p>
          )}
        </div>
      </section>

      {/* ── Long Description ── */}
      {hasLongDescription && (
        <section className="relative bg-brand-surface py-16 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />
          <div className="max-w-3xl mx-auto px-6 md:px-16">
            <div className="service-body">
              <PortableText value={service.longDescription!} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />
        </section>
      )}

      {/* ── Image Gallery ── */}
      {hasImages && (
        <section className="py-20 bg-brand-base">
          <div className="max-w-6xl mx-auto px-6 md:px-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-brand-accent text-xs uppercase tracking-widest text-center mb-3"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Gallery
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Our Work
            </motion.h2>
            <motion.div
              ref={galleryRef}
              variants={containerVariants}
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {service.images!.map((img, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative aspect-4/3 rounded-sm overflow-hidden border border-white/5"
                >
                  <Image
                    src={urlFor(img.asset).width(800).url()}
                    alt={img.alt ?? service.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Features Checklist ── */}
      {hasFeatures && (
        <section className="relative bg-brand-surface py-20 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />
          <div className="max-w-3xl mx-auto px-6 md:px-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-brand-accent text-xs uppercase tracking-widest text-center mb-3"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              What&apos;s Included
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white text-center mb-10"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Key Features
            </motion.h2>
            <motion.ul
              ref={featuresRef}
              variants={containerVariants}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              {service.features!.map((feature, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    size={20}
                    className="text-brand-accent mt-0.5 shrink-0"
                  />
                  <span
                    className="text-slate-300 text-base leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {feature}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />
        </section>
      )}

      {/* ── Estimate Form ── */}
      <div className="bg-brand-base pt-12">
        <div className="max-w-3xl mx-auto px-6 md:px-16 text-center mb-0">
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
            Get a Quote for {service.title}
          </h2>
        </div>
        <EstimateForm services={services} initialService={service.slug} />
      </div>
    </main>
  );
}
