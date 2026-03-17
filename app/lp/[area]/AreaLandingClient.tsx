"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  Phone,
  ArrowRight,
  CheckCircle,
  Star,
  BadgeCheck,
  Clock,
  Users,
  MapPin,
} from "lucide-react";
import { siteConfig } from "../../config/site";
import { serviceAreas, type ServiceArea } from "../../config/areas";
import { type SiteSettings, type Testimonial } from "../../lib/types";
import Image from "next/image";
import Link from "next/link";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

// ─── STATIC DATA ──────────────────────────────────────────────────────────────

const includes = [
  "Free on-site property survey",
  "Written quote with no hidden fees",
  "Same-week availability",
  "No obligation — ever",
];

// ─── MINIMAL HEADER ───────────────────────────────────────────────────────────
function LandingHeader({ settings }: { settings: SiteSettings }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050d1a]/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-16 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={siteConfig.brand.logo}
            alt={siteConfig.brand.logoAlt}
            width={140}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
        <a
          href={siteConfig.phoneHref}
          className="flex items-center gap-2 text-white font-bold text-sm hover:text-[#EF6B4D] transition-colors duration-200"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          <Phone size={14} className="text-[#EF6B4D]" />
          {settings.phone}
        </a>
      </div>
    </header>
  );
}

// ─── MINIMAL FOOTER ───────────────────────────────────────────────────────────
function LandingFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-white/5 py-6 bg-[#030912]">
      <div className="max-w-6xl mx-auto px-6 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2">
          <ShieldCheck className="text-[#EF6B4D]" size={16} strokeWidth={2.2} />
          <span
            className="text-white text-xs font-semibold tracking-widest uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            {settings.siteName}
          </span>
        </a>
        <div className="flex items-center gap-6">
          <a
            href="/privacy"
            className="text-slate-600 text-xs hover:text-white transition-colors duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Privacy Policy
          </a>
          <span
            className="text-slate-600 text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── ESTIMATE FORM ────────────────────────────────────────────────────────────
function EstimateForm({ areaName }: { areaName: string }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    serviceType: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.serviceType)
      newErrors.serviceType = "Please select a service";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const inputClass = `w-full bg-[#050d1a] border px-4 py-3 rounded-sm text-white text-sm outline-none transition-colors duration-200 placeholder:text-slate-600 focus:border-[#EF6B4D]/50`;
  const labelClass = `block text-xs uppercase tracking-widest text-slate-400 mb-2`;

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center text-center py-10 gap-4">
        <CheckCircle className="text-[#EF6B4D]" size={44} />
        <h3
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Request Received!
        </h3>
        <p
          className="text-slate-400 leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Thanks {formData.name.split(" ")[0]} — we'll be in touch within 1
          business day to schedule your free estimate in {areaName}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="area-name"
            className={labelClass}
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Full Name
          </label>
          <input
            id="area-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
            className={`${inputClass} ${errors.name ? "border-red-500/50" : "border-white/5"}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="area-phone"
            className={labelClass}
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Phone Number
          </label>
          <input
            id="area-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            className={`${inputClass} ${errors.phone ? "border-red-500/50" : "border-white/5"}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="area-email"
          className={labelClass}
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Email Address
        </label>
        <input
          id="area-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className={`${inputClass} ${errors.email ? "border-red-500/50" : "border-white/5"}`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="area-address"
          className={labelClass}
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Property Address
        </label>
        <input
          id="area-address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder={`Your address in ${areaName}`}
          className={`${inputClass} ${errors.address ? "border-red-500/50" : "border-white/5"}`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
        {errors.address && (
          <p className="text-red-400 text-xs mt-1">{errors.address}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="area-service"
          className={labelClass}
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Service Needed
        </label>
        <select
          id="area-service"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className={`${inputClass} ${errors.serviceType ? "border-red-500/50" : "border-white/5"}`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <option value="" disabled>
            Select a service...
          </option>
          {siteConfig.services.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.serviceType && (
          <p className="text-red-400 text-xs mt-1">{errors.serviceType}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group flex items-center justify-center gap-3 bg-[#EF6B4D] text-[#050d1a] font-bold px-8 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            Submitting
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1 h-1 rounded-full bg-[#050d1a] animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
          </span>
        ) : (
          <>
            Get My Free Estimate
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </>
        )}
      </button>

      <p
        className="text-slate-600 text-xs text-center"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        No spam. No commitment. Response within 1 business day.
      </p>
    </form>
  );
}

// ─── CLIENT COMPONENT ─────────────────────────────────────────────────────────
export default function AreaLandingClient({
  settings,
  testimonials,
  areaData,
}: {
  settings: SiteSettings;
  testimonials: Testimonial[];
  areaData: ServiceArea | undefined;
}) {
  const trustBadges = [
    { icon: <BadgeCheck size={16} />, label: "Licensed & Insured" },
    { icon: <Clock size={16} />, label: `${settings.stats.years} Experience` },
    { icon: <Star size={16} />, label: `${settings.stats.rating} Google Rated` },
    { icon: <Users size={16} />, label: `${settings.stats.installs} Installs` },
  ];

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  if (!areaData) {
    return (
      <>
        <LandingHeader settings={settings} />
        <main className="bg-[#050d1a] min-h-screen flex items-center justify-center">
          <div className="text-center px-6">
            <h1
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Area Not Found
            </h1>
            <p
              className="text-slate-400 mb-8"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              We couldn't find that service area. View all areas we serve below.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {serviceAreas.map((a) => (
                <a
                  key={a.slug}
                  href={`/lp/${a.slug}`}
                  className="px-4 py-2 border border-white/10 text-slate-400 hover:text-white hover:border-[#EF6B4D]/30 rounded-sm text-sm transition-all duration-200"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {a.name}
                </a>
              ))}
            </div>
          </div>
        </main>
        <LandingFooter settings={settings} />
      </>
    );
  }

  return (
    <>
      <LandingHeader settings={settings} />

      <main className="bg-[#050d1a] pt-16">
        {/* ── HERO + FORM ─────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 20% 50%, rgba(0,180,255,0.07) 0%, transparent 60%)",
            }}
            aria-hidden
          />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />

          <div className="relative max-w-6xl mx-auto px-6 md:px-16 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            {/* Left — area-specific headline */}
            <div className="flex flex-col gap-8">
              <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-2 text-[#EF6B4D] text-xs uppercase tracking-widest"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                <MapPin size={12} />
                {areaData.region} · Licensed & Insured
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Security Systems for {areaData.name}
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #EF6B4D 0%, #38bdf8 60%, #7dd3fc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Homes & Businesses.
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-slate-400 text-lg leading-relaxed max-w-lg"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {areaData.description}
              </motion.p>

              <motion.ul
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-3"
              >
                {includes.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle
                      size={16}
                      className="text-[#EF6B4D] shrink-0"
                    />
                    <span
                      className="text-slate-300 text-sm"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </motion.ul>

              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-3"
              >
                {trustBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 px-3 py-2 rounded-sm border border-white/10 bg-white/5"
                  >
                    <span className="text-[#EF6B4D]">{badge.icon}</span>
                    <span
                      className="text-slate-300 text-xs"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      {badge.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — form card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="bg-[#070f1e] border border-white/10 rounded-sm p-8"
            >
              <div className="mb-6">
                <h2
                  className="text-2xl font-bold text-white mb-1"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Free Estimate in {areaData.name}
                </h2>
                <p
                  className="text-slate-500 text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  We'll respond within 1 business day.
                </p>
              </div>
              <EstimateForm areaName={areaData.name} />
            </motion.div>
          </div>
        </section>

        {/* ── STATS BAR ───────────────────────────────────────────────── */}
        <section className="relative bg-[#070f1e] py-12 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />
          <div className="max-w-6xl mx-auto px-6 md:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: settings.stats.installs, label: "Systems Installed" },
                { value: settings.stats.years, label: "Years Experience" },
                { value: settings.stats.rating, label: "Google Rating" },
                { value: settings.stats.satisfaction, label: "Satisfaction Rate" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    className="text-3xl font-bold text-white"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs uppercase tracking-widest text-slate-500"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
        <section className="relative bg-[#050d1a] py-20 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />
          <div className="max-w-6xl mx-auto px-6 md:px-16">
            <p
              className="text-[#EF6B4D] text-xs uppercase tracking-widest text-center mb-10"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              What {areaData.name} Customers Say
            </p>
            <div
              className={
                testimonials.length === 1
                  ? "grid grid-cols-1 gap-6 max-w-lg mx-auto"
                  : testimonials.length === 2
                    ? "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
                    : "grid grid-cols-1 md:grid-cols-3 gap-6"
              }
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="p-6 rounded-sm border border-white/5 bg-[#070f1e] flex flex-col gap-4"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="text-[#EF6B4D] fill-[#EF6B4D]"
                      />
                    ))}
                  </div>
                  <p
                    className="text-slate-300 text-sm leading-relaxed flex-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    "{t.quote}"
                  </p>
                  <div>
                    <p
                      className="text-white text-sm font-bold"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-slate-500 text-xs"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {t.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEARBY AREAS ────────────────────────────────────────────── */}
        <section className="relative bg-[#070f1e] py-16 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />
          <div className="max-w-6xl mx-auto px-6 md:px-16 flex flex-col items-center text-center gap-6">
            <p
              className="text-[#EF6B4D] text-xs uppercase tracking-widest"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              We Also Serve
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {areaData.nearbyAreas.map((nearby) => {
                const nearbyArea = serviceAreas.find((a) => a.name === nearby);
                return nearbyArea ? (
                  <a
                    key={nearby}
                    href={`/lp/${nearbyArea.slug}`}
                    className="flex items-center gap-2 px-4 py-2 border border-white/10 text-slate-400 hover:text-white hover:border-[#EF6B4D]/30 rounded-sm text-sm transition-all duration-200"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    <MapPin size={12} className="text-[#EF6B4D]" />
                    {nearby}
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ──────────────────────────────────────────────── */}
        <section className="relative bg-[#050d1a] py-20 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#EF6B4D]/15 to-transparent" />
          <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-[#EF6B4D]/20" />
          <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-[#EF6B4D]/20" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-[#EF6B4D]/20" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-[#EF6B4D]/20" />
          <div className="max-w-2xl mx-auto px-6 md:px-16">
            <div className="text-center mb-10">
              <p
                className="text-[#EF6B4D] text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Prefer to Talk First?
              </p>
              <h2
                className="text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Call Us Directly
              </h2>
              <p
                className="text-slate-400 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Have questions about security systems in {areaData.name}? Give
                us a call and we'll answer everything.
              </p>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 mt-6 text-[#EF6B4D] font-bold text-lg hover:text-white transition-colors duration-200"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                <Phone size={18} />
                {settings.phone}
              </a>
            </div>
            <div className="bg-[#070f1e] border border-white/10 rounded-sm p-8">
              <h3
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Or Request Your Free Estimate Online
              </h3>
              <EstimateForm areaName={areaData.name} />
            </div>
          </div>
        </section>
      </main>

      <LandingFooter settings={settings} />
    </>
  );
}
