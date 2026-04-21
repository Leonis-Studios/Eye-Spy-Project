import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "./config/site";
import { getSiteSettings } from "./lib/getSiteSettings";
import JsonLd from "./components/JsonLd";

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.seo.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  metadataBase: new URL(siteConfig.seo.url),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SecurityService"],
    "@id": `${siteConfig.seo.url}/#business`,
    name: settings.siteName,
    alternateName: "SecurTech",
    description: settings.description,
    url: siteConfig.seo.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.seo.url}/logopng.png`,
    },
    image: `${siteConfig.seo.url}/logopng.png`,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressStreet,
      addressLocality: siteConfig.addressCity,
      addressRegion: siteConfig.addressRegion,
      postalCode: siteConfig.addressPostal,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.addressCity,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "124",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Security System Installation Services",
      itemListElement: siteConfig.services
        .filter((s) => s.value !== "other")
        .map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.label,
            url: `${siteConfig.seo.url}/services/${s.value}`,
          },
        })),
    },
    sameAs: [
      settings.social.facebook,
      settings.social.instagram,
      settings.social.google,
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.seo.url}/#organization`,
    name: settings.siteName,
    alternateName: "SecurTech",
    url: siteConfig.seo.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.seo.url}/logopng.png`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings.phone,
      contactType: "customer service",
      availableLanguage: "English",
    },
    sameAs: [
      settings.social.facebook,
      settings.social.instagram,
      settings.social.google,
    ],
  };

  return (
    <html lang="en">
      <head>
        <JsonLd schema={localBusinessSchema} />
        <JsonLd schema={organizationSchema} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
