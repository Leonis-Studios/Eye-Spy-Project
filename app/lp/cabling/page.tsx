import { getSiteSettings } from "@/app/lib/getSiteSettings";
import { sanityFetch } from "@/app/lib/sanity";
import { testimonialsQuery, servicesQuery } from "@/app/lib/queries";
import { type Testimonial, type Service } from "@/app/lib/types";
import { siteConfig } from "@/app/config/site";
import CablingClient from "./CablingClient";

export default async function CablingLandingPage() {
  const [settings, testimonials, sanityServices] = await Promise.all([
    getSiteSettings(),
    sanityFetch<Testimonial[]>(testimonialsQuery),
    sanityFetch<Service[]>(servicesQuery),
  ]);

  // Fall back to siteConfig.services if no services exist in Sanity yet
  const services =
    sanityServices && sanityServices.length > 0
      ? sanityServices
      : siteConfig.services;

  return (
    <CablingClient
      settings={settings}
      testimonials={testimonials}
      services={services}
    />
  );
}
