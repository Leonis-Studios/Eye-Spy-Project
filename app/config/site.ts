// ─── SITE CONFIG ─────────────────────────────────────────────────────────────
// This is the single source of truth for all client-facing content.
// When anything changes — phone number, address, services, social links —
// update it HERE and it automatically reflects everywhere on the site.
// Never hardcode this information directly in components.

export const siteConfig = {
  // ─── BRAND ───────────────────────────────────────────────────────────────
  name: "SecurTech",
  tagline: "Security Systems Built to Protect.",
  description:
    "Licensed security system installation for homes and businesses. Cameras, alarms, access control. Get a free estimate today.",

  // ─── CONTACT ─────────────────────────────────────────────────────────────
  phone: "(555) 000-0000",
  phoneHref: "tel:+15550000000", // used in href attributes
  email: "info@securtech.com",
  emailHref: "mailto:info@securtech.com",

  // ─── LOCATION ────────────────────────────────────────────────────────────
  address: "123 Main St, City, State 00000",
  serviceArea: "Serving the greater [City] area within 50 miles",

  // ─── BUSINESS HOURS ──────────────────────────────────────────────────────
  hours: {
    weekdays: "Mon – Fri: 8am – 6pm",
    saturday: "Sat: 9am – 4pm",
    sunday: "Sun: Closed",
  },

  // ─── STATS ───────────────────────────────────────────────────────────────
  // Used in Hero and SocialProof sections
  stats: {
    installs: "2,400+",
    years: "15+",
    rating: "4.9★",
    satisfaction: "98%",
  },

  // ─── SERVICES ────────────────────────────────────────────────────────────
  // Used in the Services section and the estimate form dropdown
  services: [
    { value: "cameras", label: "CCTV & Camera Systems" },
    { value: "alarms", label: "Alarm Systems" },
    { value: "access", label: "Access Control" },
    { value: "monitoring", label: "24/7 Monitoring" },
    { value: "consultation", label: "Security Consultation" },
    { value: "other", label: "Other / Not Sure" },
  ],

  // ─── NAVIGATION ──────────────────────────────────────────────────────────
  // Used in Navbar and Footer
  navLinks: [
    { label: "Services", href: "/#services" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  // ─── SOCIAL ──────────────────────────────────────────────────────────────
  social: {
    facebook: "https://facebook.com/securtech",
    instagram: "https://instagram.com/securtech",
    google: "https://g.page/securtech",
  },

  // ─── SEO ─────────────────────────────────────────────────────────────────
  // Used in layout.tsx metadata
  seo: {
    title: "SecurTech | Security System Installation",
    description:
      "Licensed security system installation for homes and businesses in [City]. Cameras, alarms, access control. Get a free estimate today.",
    keywords:
      "security system installation, CCTV cameras, alarm systems, access control, [City]",
    url: "https://www.securtech.com",
  },
};
