import type { Metadata } from "next";
import { sanityFetch } from "@/app/lib/sanity";
import { pricingPageQuery } from "@/app/lib/queries";
import { getServices } from "@/app/lib/getServices";
import { type PricingPage } from "@/app/lib/types";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing | EyeSpy Cabling",
  description:
    "Transparent pricing for CCTV, alarm systems, access control, and cabling. No hidden fees — get a free estimate today.",
};

export default async function PricingPage() {
  const [pricingData, services] = await Promise.all([
    sanityFetch<PricingPage | null>(pricingPageQuery),
    getServices(),
  ]);

  return <PricingPageClient pricingData={pricingData} services={services} />;
}
