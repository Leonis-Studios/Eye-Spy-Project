import Hero from "../components/Hero";
import SocialProof from "../components/SocialProof";
import Benefits from "../components/Benefits";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import EstimateForm from "../components/EstimateForm";
import CableSeparator from "../components/CableSeparator";
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
    <main className="bg-brand-base">
      <Hero settings={settings} services={services} />
      <CableSeparator variant="patch-panel" topColor="#050d1a" bottomColor="#070f1e" />
      <SocialProof settings={settings} />
      <CableSeparator variant="switch" topColor="#070f1e" bottomColor="#070f1e" />
      <Benefits />
      <CableSeparator variant="cable-tray" topColor="#070f1e" bottomColor="#070f1e" />
      <Services services={services} />
      <CableSeparator variant="router" topColor="#070f1e" bottomColor="#050d1a" />
      <HowItWorks />
      <CableSeparator variant="conduit" topColor="#050d1a" bottomColor="#070f1e" />
      <Testimonials testimonials={testimonials} />
      <CableSeparator variant="patch-panel" label="FEED-RISER" topColor="#070f1e" bottomColor="#050d1a" />
      <CTA settings={settings} />
      <CableSeparator variant="switch" label="SW-02" topColor="#050d1a" bottomColor="#070f1e" />
      <FAQ items={faqItems} />
      <CableSeparator variant="conduit" label="TERM-BLOCK" topColor="#070f1e" bottomColor="#050d1a" />
      <EstimateForm services={services} />
    </main>
  );
}
