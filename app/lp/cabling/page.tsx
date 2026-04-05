import { getSiteSettings } from "@/app/lib/getSiteSettings";
import { getServices } from "@/app/lib/getServices";
import { sanityFetch } from "@/app/lib/sanity";
import { testimonialsQuery } from "@/app/lib/queries";
import { type Testimonial } from "@/app/lib/types";
import CablingClient from "./CablingClient";

export default async function CablingLandingPage() {
  const [settings, testimonials, services] = await Promise.all([
    getSiteSettings(),
    sanityFetch<Testimonial[]>(testimonialsQuery),
    getServices(),
  ]);

  return (
    <CablingClient
      settings={settings}
      testimonials={testimonials}
      services={services}
    />
  );
}
