import type { Metadata } from "next";
import { sanityFetch } from "@/app/lib/sanity";
import { pricingPageQuery, pricingServicesQuery } from "@/app/lib/queries";
import { getServices } from "@/app/lib/getServices";
import { type PricingPage, type PricingService } from "@/app/lib/types";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing | EyeSpy Cabling",
  description:
    "Transparent pricing for CCTV, alarm systems, access control, and cabling. No hidden fees — get a free estimate today.",
};

export default async function PricingPage() {
  const [pricingData, pricingServices, services] = await Promise.all([
    sanityFetch<PricingPage | null>(pricingPageQuery),
    sanityFetch<PricingService[]>(pricingServicesQuery),
    getServices(),
  ]);

  return (
    <PricingPageClient
      pricingData={pricingData}
      pricingServices={pricingServices}
      services={services}
    />
  );
}
