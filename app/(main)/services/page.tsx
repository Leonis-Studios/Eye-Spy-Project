import { getServices } from "@/app/lib/getServices";
import { siteConfig } from "@/app/config/site";
import { getSiteSettings } from "@/app/lib/getSiteSettings";
import JsonLd from "@/app/components/JsonLd";
import ServicesIndexClient from "./ServicesIndexClient";

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);

  const siteUrl = settings.siteUrl || siteConfig.seo.url;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Security System Installation Services",
    description: `Professional security services offered by ${settings.siteName}`,
    url: `${siteUrl}/services`,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `${siteUrl}/services/${s.slug}`,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.shortDescription,
        url: `${siteUrl}/services/${s.slug}`,
        provider: {
          "@type": "LocalBusiness",
          "@id": `${siteUrl}/#business`,
        },
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
    ],
  };

  return (
    <>
      <JsonLd schema={itemListSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <ServicesIndexClient services={services} />
    </>
  );
}
