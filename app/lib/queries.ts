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
