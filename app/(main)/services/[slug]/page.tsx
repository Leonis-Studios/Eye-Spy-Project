import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/app/lib/sanity";
import {
  singleServicePageQuery,
  allServicePageSlugsQuery,
} from "@/app/lib/queries";
import { type ServicePage } from "@/app/lib/types";
import { getServices } from "@/app/lib/getServices";
import { siteConfig } from "@/app/config/site";
import JsonLd from "@/app/components/JsonLd";
import ServicePageClient from "./ServicePageClient";

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(allServicePageSlugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await sanityFetch<ServicePage | null>(
    singleServicePageQuery,
    { slug }
  );

  if (!service) return { title: "Service Not Found | EyeSpy Cabling" };

  return {
    title: service.metaTitle ?? `${service.title} | EyeSpy Cabling`,
    description: service.metaDescription ?? service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, services] = await Promise.all([
    sanityFetch<ServicePage | null>(singleServicePageQuery, { slug }),
    getServices(),
  ]);

  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.seo.url}/services/${slug}#service`,
    name: service.title,
    description: service.metaDescription ?? service.shortDescription ?? service.title,
    url: `${siteConfig.seo.url}/services/${slug}`,
    serviceType: service.title,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${siteConfig.seo.url}/#business`,
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.addressCity,
    },
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
        name: "Services",
        item: `${siteConfig.seo.url}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${siteConfig.seo.url}/services/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <ServicePageClient service={service} services={services} />
    </>
  );
}
