import { getSiteSettings } from "@/app/lib/getSiteSettings";
import { sanityFetch } from "@/app/lib/sanity";
import { singleAreaQuery, testimonialsQuery } from "@/app/lib/queries";
import { type ServiceArea, type Testimonial } from "@/app/lib/types";
import { siteConfig } from "@/app/config/site";
import { serviceAreas } from "@/app/config/areas";
import JsonLd from "@/app/components/JsonLd";
import AreaLandingClient from "./AreaLandingClient";

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ area: a.slug }));
}

export default async function AreaLandingPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const [settings, areaData, testimonials] = await Promise.all([
    getSiteSettings(),
    sanityFetch<ServiceArea | null>(singleAreaQuery, { slug: area }),
    sanityFetch<Testimonial[]>(testimonialsQuery),
  ]);

  const areaName = areaData?.name ?? area;
  const areaDescription = areaData?.description ?? siteConfig.description;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SecurityService"],
    "@id": `${siteConfig.seo.url}/lp/${area}#business`,
    name: `${settings.siteName} — ${areaName} Security Systems`,
    description: areaDescription,
    url: `${siteConfig.seo.url}/lp/${area}`,
    telephone: settings.phone,
    email: settings.email,
    areaServed: {
      "@type": "City",
      name: areaName,
    },
    parentOrganization: {
      "@type": "Organization",
      "@id": `${siteConfig.seo.url}/#organization`,
    },
    sameAs: [
      settings.social.facebook,
      settings.social.instagram,
      settings.social.google,
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.seo.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `Security Systems in ${areaName}`,
        item: `${siteConfig.seo.url}/lp/${area}`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={localBusinessSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <AreaLandingClient
        settings={settings}
        areaData={areaData ?? undefined}
        testimonials={testimonials}
      />
    </>
  );
}
