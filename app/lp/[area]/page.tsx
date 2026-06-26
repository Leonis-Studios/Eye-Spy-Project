import { notFound } from "next/navigation";
import { getSiteSettings } from "@/app/lib/getSiteSettings";
import { sanityFetch } from "@/app/lib/sanity";
import {
  singleAreaQuery,
  singleServiceLandingPageQuery,
  allAreaSlugsQuery,
  allServiceLandingPageSlugsQuery,
  testimonialsQuery,
  getAllServicesQuery,
} from "@/app/lib/queries";
import {
  type ServiceArea,
  type ServiceLandingPage,
  type Testimonial,
  type Service,
} from "@/app/lib/types";
import { siteConfig } from "@/app/config/site";
import JsonLd from "@/app/components/JsonLd";
import AreaLandingClient from "./AreaLandingClient";
import ServiceLandingClient from "./ServiceLandingClient";

export async function generateStaticParams() {
  const [lpSlugs, areaSlugs] = await Promise.all([
    sanityFetch<{ slug: string }[]>(allServiceLandingPageSlugsQuery),
    sanityFetch<{ slug: string }[]>(allAreaSlugsQuery),
  ]);
  return [...lpSlugs, ...areaSlugs].map(({ slug }) => ({ area: slug }));
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;

  const [settings, serviceLP, areaData, testimonials, services] = await Promise.all([
    getSiteSettings(),
    sanityFetch<ServiceLandingPage | null>(singleServiceLandingPageQuery, { slug: area }),
    sanityFetch<ServiceArea | null>(singleAreaQuery, { slug: area }),
    sanityFetch<Testimonial[]>(testimonialsQuery),
    sanityFetch<Service[]>(getAllServicesQuery),
  ]);

  // Service LP takes priority over area LP
  if (serviceLP) {
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceLP.heroHeading,
      description: serviceLP.heroSubheading ?? serviceLP.metaDescription,
      provider: {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.seo.url}/#business`,
        name: settings.siteName,
        telephone: settings.phone,
      },
      url: `${siteConfig.seo.url}/lp/${area}`,
    };

    return (
      <>
        <JsonLd schema={serviceSchema} />
        <ServiceLandingClient
          page={serviceLP}
          settings={settings}
          testimonials={testimonials}
          services={services}
        />
      </>
    );
  }

  if (areaData) {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "SecurityService"],
      "@id": `${siteConfig.seo.url}/lp/${area}#business`,
      name: `${settings.siteName} — ${areaData.name} Security Systems`,
      description: areaData.description,
      url: `${siteConfig.seo.url}/lp/${area}`,
      telephone: settings.phone,
      email: settings.email,
      areaServed: { "@type": "City", name: areaData.name },
      parentOrganization: {
        "@type": "Organization",
        "@id": `${siteConfig.seo.url}/#organization`,
      },
      sameAs: [settings.social.facebook, settings.social.instagram, settings.social.google],
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.seo.url },
        {
          "@type": "ListItem",
          position: 2,
          name: `Security Systems in ${areaData.name}`,
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
          areaData={areaData}
          testimonials={testimonials}
          services={services}
        />
      </>
    );
  }

  notFound();
}
