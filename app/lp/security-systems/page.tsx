import { getSiteSettings } from "@/app/lib/getSiteSettings";
import { sanityFetch } from "@/app/lib/sanity";
import { testimonialsQuery } from "@/app/lib/queries";
import { type Testimonial } from "@/app/lib/types";
import SecuritySystemsClient from "./SecuritySystemsClient";

export default async function SecuritySystemsLandingPage() {
  const [settings, testimonials] = await Promise.all([
    getSiteSettings(),
    sanityFetch<Testimonial[]>(testimonialsQuery),
  ]);
  return <SecuritySystemsClient settings={settings} testimonials={testimonials} />;
}
