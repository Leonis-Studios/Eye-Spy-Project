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
  label: string;
  value: string;
}

// ─── SERVICE AREA ─────────────────────────────────────────────────────────────
export interface ServiceArea {
  name: string;
  slug: string;
  region: string;
  description: string;
  nearbyAreas: string[];
}
