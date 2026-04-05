import Hero from "../components/Hero";
import SocialProof from "../components/SocialProof";
import Benefits from "../components/Benefits";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import EstimateForm from "../components/EstimateForm";
import { getSiteSettings } from "../lib/getSiteSettings";
import { getServices } from "../lib/getServices";
import { sanityFetch } from "../lib/sanity";
import { testimonialsQuery, faqQuery } from "../lib/queries";
import { type Testimonial, type FaqItem } from "../lib/types";

export default async function Home() {
  const [settings, testimonials, faqItems, services] = await Promise.all([
    getSiteSettings(),
    sanityFetch<Testimonial[]>(testimonialsQuery),
    sanityFetch<FaqItem[]>(faqQuery),
    getServices(),
  ]);

  return (
    <main>
      <Hero settings={settings} services={services} />
      <SocialProof settings={settings} />
      <Benefits />
      <Services services={services} />
      <HowItWorks />
      <Testimonials testimonials={testimonials} />
      <CTA settings={settings} />
      <FAQ items={faqItems} />
      <EstimateForm services={services} />
    </main>
  );
}
