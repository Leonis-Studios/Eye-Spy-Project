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
import JsonLd from "../components/JsonLd";
import { getSiteSettings } from "../lib/getSiteSettings";
import { getServices } from "../lib/getServices";
import { sanityFetch } from "../lib/sanity";
import { testimonialsQuery, faqQuery, homePageQuery } from "../lib/queries";
import { type Testimonial, type FaqItem, type HomePageData } from "../lib/types";
import { howItWorksSteps } from "../config/howItWorks";
import { siteConfig } from "../config/site";

export default async function Home() {
  const [settings, testimonials, faqItems, services, homePage] = await Promise.all([
    getSiteSettings(),
    sanityFetch<Testimonial[]>(testimonialsQuery),
    sanityFetch<FaqItem[]>(faqQuery),
    getServices(),
    sanityFetch<HomePageData | null>(homePageQuery),
  ]);

  const faqPageSchema = faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  const activeSteps = homePage?.howItWorksSteps?.length
    ? homePage.howItWorksSteps
    : howItWorksSteps;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Get a Security System Installed",
    description: homePage?.howItWorksSubheading ?? "Our simple process to get you up and running quickly.",
    step: activeSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
    provider: {
      "@type": "LocalBusiness",
      "@id": `${siteConfig.seo.url}/#business`,
    },
  };

  return (
    <main className="bg-brand-base">
      {faqPageSchema && <JsonLd schema={faqPageSchema} />}
      <JsonLd schema={howToSchema} />
      <Hero settings={settings} services={services} />
      <CableSeparator variant="patch-panel" topColor="#050d1a" bottomColor="#070f1e" />
      <SocialProof settings={settings} />
      <CableSeparator variant="switch" topColor="#070f1e" bottomColor="#070f1e" />
      <Benefits
        benefits={homePage?.benefits}
        eyebrow={homePage?.benefitsEyebrow}
        heading={homePage?.benefitsHeading}
        subheading={homePage?.benefitsSubheading}
      />
      <CableSeparator variant="cable-tray" topColor="#070f1e" bottomColor="#070f1e" />
      <Services services={services} />
      <CableSeparator variant="router" topColor="#070f1e" bottomColor="#050d1a" />
      <HowItWorks
        steps={homePage?.howItWorksSteps}
        eyebrow={homePage?.howItWorksEyebrow}
        heading={homePage?.howItWorksHeading}
        subheading={homePage?.howItWorksSubheading}
      />
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
