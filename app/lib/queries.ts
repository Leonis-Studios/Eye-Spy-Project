// ─── SITE SETTINGS ───────────────────────────────────────────────────────────
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0]{
    siteName,
    tagline,
    description,
    phone,
    email,
    address,
    serviceArea,
    hours,
    stats,
    social
  }
`;

// ─── BLOG POSTS ───────────────────────────────────────────────────────────────
export const allPostsQuery = `
  *[_type == "blogPost"] | order(date desc){
    "slug": slug.current,
    title,
    excerpt,
    category,
    readTime,
    date,
    featured
  }
`;

export const singlePostQuery = `
  *[_type == "blogPost" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    excerpt,
    category,
    readTime,
    date,
    featured,
    content
  }
`;

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
export const testimonialsQuery = `
  *[_type == "testimonial"]{
    quote,
    name,
    location,
    rating
  }
`;

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const faqQuery = `
  *[_type == "faqItem"] | order(order asc){
    question,
    answer
  }
`;

// ─── TEAM ─────────────────────────────────────────────────────────────────────
export const teamQuery = `
  *[_type == "teamMember"] | order(order asc){
    name,
    role,
    years,
    bio,
    photo
  }
`;

// ─── SERVICES ─────────────────────────────────────────────────────────────────
export const servicesQuery = `
  *[_type == "service"] | order(order asc){
    label,
    value
  }
`;

// Single source of truth for all service consumers (Hero, Services grid, EstimateForm).
// Queries servicePage — the canonical service document type.
export const getAllServicesQuery = `
  *[_type == "servicePage"] | order(order asc, title asc){
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    order
  }
`;

// ─── SERVICE AREAS ────────────────────────────────────────────────────────────
export const allAreasQuery = `
  *[_type == "serviceArea"]{
    name,
    "slug": slug.current,
    region,
    description,
    nearbyAreas
  }
`;

export const singleAreaQuery = `
  *[_type == "serviceArea" && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    region,
    description,
    nearbyAreas
  }
`;

// ─── SERVICE PAGES ────────────────────────────────────────────────────────────
export const allServicePageSlugsQuery = `
  *[_type == "servicePage"]{ "slug": slug.current }
`;

export const allServicePagesQuery = `
  *[_type == "servicePage"] | order(title asc){
    "slug": slug.current,
    title,
    shortDescription,
    icon
  }
`;

export const singleServicePageQuery = `
  *[_type == "servicePage" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    shortDescription,
    longDescription,
    icon,
    images[]{ asset, alt },
    features,
    metaTitle,
    metaDescription
  }
`;

// ─── PRICING PAGE ─────────────────────────────────────────────────────────────
// Singleton — returns [0] directly, not wrapped in array.
// service-> dereferences the reference and projects only the fields needed.
// "slug": slug.current flattens the slug object to a plain string, consistent
// with every other query in this file.
export const pricingPageQuery = `
  *[_type == "pricingPage"][0]{
    pageTitle,
    pageSubtitle,
    introText,
    pricingCards[]{
      _key,
      "service": service->{
        _id,
        title,
        "slug": slug.current,
        icon,
        shortDescription
      },
      priceLabel,
      priceNote,
      highlights,
      ctaLabel,
      featured
    },
    bottomCtaHeading,
    bottomCtaText,
    faqTitle,
    faqItems[]{
      _key,
      question,
      answer
    }
  }
`;
