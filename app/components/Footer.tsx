"use client";

import React from "react";
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Star,
} from "lucide-react";
import { siteConfig } from "../config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  // new Date() creates a JavaScript Date object for right now.
  // .getFullYear() extracts the 4-digit year.
  // Storing it in a variable means the copyright year updates automatically
  // every year without anyone touching the code.

  return (
    <footer className="relative bg-[#030912] overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00c8ff]/20 to-transparent" />

      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 opacity-10"
        style={{
          background: "radial-gradient(ellipse, #00c8ff 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />

      {/* ── MAIN FOOTER CONTENT ─────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-16">
        {/* Four column grid on desktop, single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* ── COLUMN 1: Brand ─────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <ShieldCheck
                className="text-[#00c8ff]"
                size={20}
                strokeWidth={2.2}
              />
              <span
                className="text-white font-semibold tracking-widest text-sm uppercase"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  letterSpacing: "0.18em",
                }}
              >
                {siteConfig.name}
              </span>
            </a>
            <p
              className="text-slate-500 text-sm leading-relaxed mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {siteConfig.description}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                // target="_blank" opens in a new tab.
                // rel="noopener noreferrer" is a security best practice —
                // prevents the new tab from accessing the original page via window.opener.
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-[#00c8ff] hover:border-[#00c8ff]/30 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-[#00c8ff] hover:border-[#00c8ff]/30 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href={siteConfig.social.google}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-[#00c8ff] hover:border-[#00c8ff]/30 transition-all duration-200"
                aria-label="Google Reviews"
              >
                <Star size={14} />
              </a>
            </div>
          </div>

          {/* ── COLUMN 2: Navigation ────────────────────────────────────── */}
          <div>
            <h3
              className="text-white text-xs uppercase tracking-widest mb-6"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {siteConfig.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-500 hover:text-white text-sm transition-colors duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COLUMN 3: Services ──────────────────────────────────────── */}
          <div>
            <h3
              className="text-white text-xs uppercase tracking-widest mb-6"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {siteConfig.services.map((service) => (
                <li key={service.value}>
                  <a
                    href="/#services"
                    className="text-slate-500 hover:text-white text-sm transition-colors duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COLUMN 4: Contact ───────────────────────────────────────── */}
          <div>
            <h3
              className="text-white text-xs uppercase tracking-widest mb-6"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-start gap-3 text-slate-500 hover:text-white transition-colors duration-200 group"
                >
                  <Phone
                    size={14}
                    className="mt-0.5 shrink-0 text-[#00c8ff]/50 group-hover:text-[#00c8ff] transition-colors duration-200"
                  />
                  <span
                    className="text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {siteConfig.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="flex items-start gap-3 text-slate-500 hover:text-white transition-colors duration-200 group"
                >
                  <Mail
                    size={14}
                    className="mt-0.5 shrink-0 text-[#00c8ff]/50 group-hover:text-[#00c8ff] transition-colors duration-200"
                  />
                  <span
                    className="text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {siteConfig.email}
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-500">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0 text-[#00c8ff]/50"
                  />
                  <span
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {siteConfig.address}
                  </span>
                </div>
              </li>
              <li className="pt-2">
                <div
                  className="text-slate-600 text-xs leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <p>{siteConfig.hours.weekdays}</p>
                  <p>{siteConfig.hours.saturday}</p>
                  <p>{siteConfig.hours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ──────────────────────────────────────────────────── */}
      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-slate-600 text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          <p
            className="text-slate-600 text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {siteConfig.serviceArea}
          </p>
        </div>
      </div>
    </footer>
  );
}
