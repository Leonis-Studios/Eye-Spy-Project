import { getSiteSettings } from "@/app/lib/getSiteSettings";
import { sanityFetch } from "@/app/lib/sanity";
import { singleAreaQuery, testimonialsQuery } from "@/app/lib/queries";
import { type ServiceArea, type Testimonial } from "@/app/lib/types";
import AreaLandingClient from "./AreaLandingClient";

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
  return (
    <AreaLandingClient
      settings={settings}
      areaData={areaData ?? undefined}
      testimonials={testimonials}
    />
  );
}
