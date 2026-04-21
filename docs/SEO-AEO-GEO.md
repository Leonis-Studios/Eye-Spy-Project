# SEO / AEO / GEO Reference — EyeSpy Cabling / SecurTech

This document is the single source of truth for all structured data, answer engine optimization, and generative engine optimization on this site. Read it before adding any new page or content type.

---

## 1. Concepts

### Traditional SEO
Optimizes for keyword rankings in Google/Bing. Core tools: title tags, meta descriptions, keyword density, backlinks, page speed.

### AEO — Answer Engine Optimization
Optimizes for **featured snippets, voice search answers, and AI answer boxes** (Google's "People also ask", Alexa, Siri). The engine extracts a direct answer from your page and surfaces it without the user clicking through.

Key techniques:
- **FAQPage schema** — marks up Q&A pairs so engines can display them as expandable dropdowns
- **HowTo schema** — marks up numbered process steps for "how do I…" queries
- **Answer-first writing** — lead with the direct answer in the first sentence of any FAQ or section
- **Concise answer text** — keep `acceptedAnswer.text` under 300 characters where possible

### GEO — Generative Engine Optimization
Optimizes for **AI-generated summaries** (ChatGPT browsing, Perplexity, Google AI Overviews / SGE). These systems read your structured data to build a *knowledge graph* of your business and cite you as a source.

Key techniques:
- **Entity linking via `@id`** — every schema on every page references back to a canonical `/#business` or `/#organization` entity. This lets AI systems recognize that all these pages belong to the same real-world company.
- **Organization schema** — establishes your business as a named entity with a logo, contact, and social presence
- **Article schema** — makes blog content citable with author, publisher, and date signals
- **Consistent naming** — `name` and `alternateName` must match everywhere
- **`sameAs` social links** — confirms identity across platforms

---

## 2. Schema Inventory

| Page | Schema Types | `@id` values |
|------|-------------|--------------|
| All pages (root `layout.tsx`) | `LocalBusiness` + `SecurityService`, `Organization` | `/#business`, `/#organization` |
| Homepage (`/`) | `FAQPage`, `HowTo` | _(no @id needed — page-level)_ |
| `/services/[slug]` | `Service`, `BreadcrumbList` | `/services/[slug]#service` |
| `/blog/[slug]` | `Article`, `BreadcrumbList` | `/blog/[slug]#article` |
| `/lp/[area]` | `LocalBusiness` + `SecurityService`, `BreadcrumbList` | `/lp/[area]#business` |
| `/pricing` | _(planned — add FAQPage for pricing FAQs)_ | — |
| `/about` | _(planned — add Person schemas for team members)_ | — |

---

## 3. Canonical Schema Templates

Use these as copy-paste starting points for new pages. Replace `[DYNAMIC: ...]` placeholders with actual values.

### 3.1 LocalBusiness + SecurityService (root layout — global)

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SecurityService"],
  "@id": "https://www.securtech.com/#business",
  "name": "[DYNAMIC: settings.siteName]",
  "alternateName": "SecurTech",
  "description": "[DYNAMIC: settings.description]",
  "url": "https://www.securtech.com",
  "logo": { "@type": "ImageObject", "url": "https://www.securtech.com/logopng.png" },
  "image": "https://www.securtech.com/logopng.png",
  "telephone": "[DYNAMIC: settings.phone]",
  "email": "[DYNAMIC: settings.email]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[siteConfig.addressStreet]",
    "addressLocality": "[siteConfig.addressCity]",
    "addressRegion": "[siteConfig.addressRegion]",
    "postalCode": "[siteConfig.addressPostal]",
    "addressCountry": "US"
  },
  "areaServed": { "@type": "City", "name": "[siteConfig.addressCity]" },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "16:00" }
  ],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "124", "bestRating": "5", "worstRating": "1" },
  "hasOfferCatalog": { "@type": "OfferCatalog", "name": "Security System Installation Services", "itemListElement": [...] },
  "sameAs": ["[facebook]", "[instagram]", "[google]"]
}
```

### 3.2 Organization (root layout — global)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.securtech.com/#organization",
  "name": "[DYNAMIC: settings.siteName]",
  "alternateName": "SecurTech",
  "url": "https://www.securtech.com",
  "logo": { "@type": "ImageObject", "url": "https://www.securtech.com/logopng.png" },
  "contactPoint": { "@type": "ContactPoint", "telephone": "[DYNAMIC: settings.phone]", "contactType": "customer service", "availableLanguage": "English" },
  "sameAs": [...]
}
```

### 3.3 FAQPage (homepage, pricing page, any page with Q&A)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[DYNAMIC: faqItem.question]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[DYNAMIC: faqItem.answer]"
      }
    }
  ]
}
```

### 3.4 HowTo (homepage — "How It Works" section)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get a Security System Installed",
  "description": "Our simple 3-step process to get you up and running quickly.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "[DYNAMIC: step.title]", "text": "[DYNAMIC: step.description]" }
  ],
  "provider": { "@type": "LocalBusiness", "@id": "https://www.securtech.com/#business" }
}
```

### 3.5 Service (service detail pages `/services/[slug]`)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.securtech.com/services/[slug]#service",
  "name": "[DYNAMIC: service.title]",
  "description": "[DYNAMIC: service.shortDescription]",
  "url": "https://www.securtech.com/services/[slug]",
  "serviceType": "[DYNAMIC: service.title]",
  "provider": { "@type": "LocalBusiness", "@id": "https://www.securtech.com/#business" },
  "areaServed": { "@type": "City", "name": "[siteConfig.addressCity]" }
}
```

### 3.6 BreadcrumbList (all pages except homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.securtech.com" },
    { "@type": "ListItem", "position": 2, "name": "[Section]", "item": "https://www.securtech.com/[section]" },
    { "@type": "ListItem", "position": 3, "name": "[Page Title]", "item": "https://www.securtech.com/[section]/[slug]" }
  ]
}
```

### 3.7 Article (blog posts `/blog/[slug]`)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://www.securtech.com/blog/[slug]#article",
  "headline": "[DYNAMIC: post.title]",
  "description": "[DYNAMIC: post.excerpt]",
  "datePublished": "[DYNAMIC: parseMonthYearToISO(post.date)]",
  "dateModified": "[DYNAMIC: parseMonthYearToISO(post.date)]",
  "url": "https://www.securtech.com/blog/[slug]",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.securtech.com/blog/[slug]" },
  "articleSection": "[DYNAMIC: post.category]",
  "author": { "@type": "Organization", "@id": "https://www.securtech.com/#organization", "name": "EyeSpy Cabling" },
  "publisher": {
    "@type": "Organization",
    "@id": "https://www.securtech.com/#organization",
    "name": "EyeSpy Cabling",
    "logo": { "@type": "ImageObject", "url": "https://www.securtech.com/logopng.png" }
  }
}
```

### 3.8 LocalBusiness — area variant (`/lp/[area]`)

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SecurityService"],
  "@id": "https://www.securtech.com/lp/[area]#business",
  "name": "[siteName] — [areaName] Security Systems",
  "description": "[DYNAMIC: areaData.description]",
  "url": "https://www.securtech.com/lp/[area]",
  "telephone": "[DYNAMIC: settings.phone]",
  "email": "[DYNAMIC: settings.email]",
  "areaServed": { "@type": "City", "name": "[DYNAMIC: areaData.name]" },
  "parentOrganization": { "@type": "Organization", "@id": "https://www.securtech.com/#organization" },
  "sameAs": [...]
}
```

---

## 4. Entity Graph — `@id` Relationships

```
/#organization  (Organization)
    └── is publisher/author of → /blog/[slug]#article  (Article)
    └── is parentOrganization of → /lp/[area]#business  (LocalBusiness area)

/#business  (LocalBusiness + SecurityService)
    └── is provider of → /services/[slug]#service  (Service)
    └── is provider of → HowTo on homepage
```

**Rule:** Every schema that represents something EyeSpy Cabling *does* or *provides* must link back to `/#business` or `/#organization` via `provider`, `author`, `publisher`, or `parentOrganization`.

---

## 5. Rules for New Pages

### Every new page MUST have:
- A `BreadcrumbList` schema (unless it is the homepage or a no-index page)
- The correct `@type` for its content (see table below)

### Page type → required schemas

| Page type | Required schemas |
|-----------|-----------------|
| Service / product page | `Service` + `BreadcrumbList` |
| Blog / article page | `Article` + `BreadcrumbList` |
| Page with FAQ section | `FAQPage` |
| Page with step-by-step process | `HowTo` |
| Location / area landing page | `LocalBusiness` (area variant) + `BreadcrumbList` |
| About / team page | `BreadcrumbList` (+ optional `Person` schemas for team members) |

### How to use the JsonLd component

`JsonLd` is a server component in `app/components/JsonLd.tsx`. Only use it inside **server components** (`page.tsx`, `layout.tsx`). Never import it into a `"use client"` component.

```tsx
// In a server component (page.tsx):
import JsonLd from "@/app/components/JsonLd";

const mySchema = { "@context": "https://schema.org", "@type": "...", ... };

return (
  <>
    <JsonLd schema={mySchema} />
    <MyPageContent />
  </>
);
```

### `@id` convention

- Always use **absolute URLs + fragment**: `https://www.securtech.com/services/cameras#service`
- Use `siteConfig.seo.url` as the base — never hardcode the domain
- Fragment suffixes: `#business`, `#organization`, `#article`, `#service`
- Area pages use the area slug: `/lp/downtown#business`

### Address fields

Never hardcode address values in schemas. Always use `siteConfig.addressStreet`, `siteConfig.addressCity`, `siteConfig.addressRegion`, `siteConfig.addressPostal`. Update those values in `app/config/site.ts` when the business address changes.

---

## 6. AEO Checklist — for new content

- [ ] Does the page answer a direct question? → Add a `FAQPage` schema
- [ ] Does the page describe a process? → Add a `HowTo` schema with `HowToStep[]`
- [ ] Are FAQ answers written answer-first (direct answer in the first sentence)?
- [ ] Is the `acceptedAnswer.text` concise (under ~300 characters ideally)?
- [ ] Are question `name` values written as natural full questions (not fragments)?
- [ ] If adding a new FAQ section to the homepage, does `faqQuery` in `lib/queries.ts` return it?

---

## 7. GEO Checklist — for new content

- [ ] Does every schema link back to `/#business` or `/#organization` via `provider`, `author`, `publisher`, or `parentOrganization`?
- [ ] Is the `Organization` schema present on every page? (Yes — it's in root `layout.tsx`)
- [ ] Is the business name consistent everywhere? (`name: settings.siteName`, `alternateName: "SecurTech"`)
- [ ] Are `sameAs` social URLs current in `app/lib/getSiteSettings.ts` fallback and Sanity siteSettings?
- [ ] Is `datePublished` ISO 8601 on all `Article` schemas? (Use `parseMonthYearToISO()` from `app/lib/utils.ts`)
- [ ] Does the page copy mention the city/area name in the first 100 words?
- [ ] Is the new page URL included in the sitemap? (Check `app/sitemap.ts`)
- [ ] If adding a new page type, does it have its own `generateMetadata` in `page.tsx`?

---

## 8. Common Mistakes to Avoid

| Mistake | Why it fails | Fix |
|---------|-------------|-----|
| Two `FAQPage` or `LocalBusiness` blocks on the same page without distinct `@id` | Google treats them as conflicting claims | Always set a unique `@id` per entity instance |
| Hardcoding `"Your City"` or `"123 Main St"` in schemas | Stale data gets indexed and cited by AI | Always read from `siteConfig.addressCity` etc. |
| `datePublished: "March 2026"` | Schema.org requires ISO 8601; Google silently ignores invalid dates | Use `parseMonthYearToISO()` from `app/lib/utils.ts` |
| `BreadcrumbList` position starting at 0 | Google expects positions to start at 1 | First item is `position: 1` |
| Adding `"use client"` to `JsonLd.tsx` | Makes schema invisible to crawlers at render time | `JsonLd.tsx` must stay a server component |
| Using `sameAs: ["@securtech"]` | Must be full URLs, not social handles | Use full profile URLs |
| Putting JSON-LD inside a client component | Schema won't be in the server-rendered HTML | Move all `<JsonLd>` calls to `page.tsx` (server component) |
| Duplicate `generateMetadata` in both `layout.tsx` and `page.tsx` of the same route | Next.js uses the most specific one, but the intent is ambiguous | Keep `generateMetadata` only in `page.tsx` for dynamic routes |

---

## 9. Testing Structured Data

After any schema change, validate before deploying:

1. **Google Rich Results Test** — https://search.google.com/test/rich-results
   - Test the homepage for: FAQPage, HowTo, LocalBusiness
   - Test a service page for: Service (shown as "Unparsed Types"), BreadcrumbList
   - Test a blog post for: Article, BreadcrumbList

2. **Schema Markup Validator** — https://validator.schema.org/
   - Paste the page URL or raw JSON-LD to check for errors and warnings

3. **Local testing**
   ```bash
   npx next build && npx next start
   ```
   Then right-click → View Source on any page and search for `application/ld+json` to verify all schemas are present in the HTML.

4. **Sitemap check** — Visit `/sitemap.xml` and confirm all expected URLs appear including `/pricing` and `/lp/[area]` entries.

---

## 10. Sanity Content and Schema Interaction

| Schema field | Sanity source | Notes |
|-------------|---------------|-------|
| `FAQPage.mainEntity` | `faqItem` documents | Empty array = FAQPage schema not rendered (guarded in `page.tsx`) |
| `Article.datePublished` | `blogPost.date` | Must be `"Month YYYY"` format in Sanity; `parseMonthYearToISO()` converts it |
| `Article.headline` | `blogPost.title` | — |
| `LocalBusiness area.name` | `serviceArea.name` | Falls back to URL slug if Sanity returns null |
| `LocalBusiness.telephone` | `siteSettings.phone` | Falls back to `siteConfig.phone` via `getSiteSettings()` |
| `hasOfferCatalog` | `siteConfig.services` | Hardcoded — update if service slugs change in Sanity |

When Sanity returns `null` for optional fields, schemas either omit the field or fall back to `siteConfig` values. The `FAQPage` schema on the homepage is skipped entirely if `faqItems` is an empty array.
