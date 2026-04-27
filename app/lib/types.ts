// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
export interface AboutPageValue {
  iconName?: string;
  title: string;
  description?: string;
}

export interface AboutPageData {
  heroEyebrow?: string;
  heroHeadingLine1?: string;
  heroHeadingLine2?: string;
  heroSubtitle?: string;
  storyEyebrow?: string;
  storyHeading?: string;
  storyParagraphs?: string[];
  valuesEyebrow?: string;
  valuesHeading?: string;
  values?: AboutPageValue[];
  ctaEyebrow?: string;
  ctaHeading?: string;
  ctaBody?: string;
  ctaButtonLabel?: string;
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
export interface ContactPageData {
  heroEyebrow?: string;
  heroHeadingLine1?: string;
  heroHeadingLine2?: string;
  heroSubtitle?: string;
  formHeading?: string;
  successHeading?: string;
  successBody?: string;
  infoHeading?: string;
  serviceAreaLabel?: string;
  serviceAreaNote?: string;
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
}

// ─── BENEFITS ─────────────────────────────────────────────────────────────────
export interface BenefitItem {
  iconName: string;
  title: string;
  description: string;
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
export interface HomePageData {
  benefitsEyebrow?: string;
  benefitsHeading?: string;
  benefitsSubheading?: string;
  benefits?: BenefitItem[];
  howItWorksEyebrow?: string;
  howItWorksHeading?: string;
  howItWorksSubheading?: string;
  howItWorksSteps?: HowItWorksStep[];
}

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────
export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  serviceArea: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  stats: {
    installs: string;
    years: string;
    rating: string;
    satisfaction: string;
  };
  social: {
    facebook: string;
    instagram: string;
    google: string;
  };
}

// ─── BLOG ─────────────────────────────────────────────────────────────────────
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featured: boolean;
  content?: any[];
}

// ─── TESTIMONIAL ──────────────────────────────────────────────────────────────
export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  rating: number;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export interface FaqItem {
  question: string;
  answer: string;
}

// ─── TEAM ─────────────────────────────────────────────────────────────────────
export interface TeamMember {
  name: string;
  role: string;
  years: string;
  bio: string;
  photo?: any;
}

// ─── SERVICE ──────────────────────────────────────────────────────────────────
export interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  icon?: string;
  order?: number;
}

// ─── SERVICE AREA ─────────────────────────────────────────────────────────────
export interface ServiceArea {
  name: string;
  slug: string;
  region: string;
  description: string;
  nearbyAreas: string[];
}

// ─── SERVICE PAGE ─────────────────────────────────────────────────────────────
export interface ServicePage {
  slug: string;
  title: string;
  shortDescription?: string;
  longDescription?: any[]; // Sanity block content — matches BlogPost.content convention
  icon?: string;
  images?: { asset: any; alt?: string }[];
  features?: string[];
  metaTitle?: string;
  metaDescription?: string;
  // Pricing fields — optional; only present when priceLabel is set
  priceLabel?: string;
  priceNote?: string;
  pricingHighlights?: string[];
  pricingCtaLabel?: string;
  pricingFeatured?: boolean;
  order?: number;
}

// ─── PRICING PAGE ─────────────────────────────────────────────────────────────

// Represents a servicePage document with pricing data, as returned by pricingServicesQuery.
// priceLabel is guaranteed non-empty by the GROQ filter.
export interface PricingService {
  _id: string;
  title: string;
  slug: string;
  icon?: string;
  shortDescription?: string;
  priceLabel: string;
  priceNote?: string;
  pricingHighlights?: string[];
  pricingCtaLabel?: string;
  pricingFeatured?: boolean;
  order?: number;
}

export interface PricingFaqItem {
  _key: string;
  question: string;
  answer: string;
}

export interface PricingPage {
  pageTitle: string;
  pageSubtitle?: string;
  introText?: string;
  bottomCtaHeading?: string;
  bottomCtaText?: string;
  faqTitle?: string;
  faqItems?: PricingFaqItem[];
}
