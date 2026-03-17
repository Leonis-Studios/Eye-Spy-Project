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
import { sanityFetch } from "../lib/sanity";
import { testimonialsQuery, faqQuery } from "../lib/queries";
import { type Testimonial, type FaqItem } from "../lib/types";

export default async function Home() {
  const [settings, testimonials, faqItems] = await Promise.all([
    getSiteSettings(),
    sanityFetch<Testimonial[]>(testimonialsQuery),
    sanityFetch<FaqItem[]>(faqQuery),
  ]);

  return (
    <main>
      <Hero settings={settings} />
      <SocialProof settings={settings} />
      <Benefits />
      <Services />
      <HowItWorks />
      <Testimonials testimonials={testimonials} />
      <CTA settings={settings} />
      <FAQ items={faqItems} />
      <EstimateForm />
    </main>
  );
}
