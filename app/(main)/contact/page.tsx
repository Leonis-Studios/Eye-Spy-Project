import { Suspense } from "react";
import { getSiteSettings } from "@/app/lib/getSiteSettings";
import { sanityFetch } from "@/app/lib/sanity";
import { contactPageQuery } from "@/app/lib/queries";
import { type ContactPageData } from "@/app/lib/types";
import ContactClient from "./ContactClient";

export default async function ContactPage() {
  const [settings, contactData] = await Promise.all([
    getSiteSettings(),
    sanityFetch<ContactPageData | null>(contactPageQuery),
  ]);
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-base" />}>
      <ContactClient settings={settings} contactData={contactData ?? {}} />
    </Suspense>
  );
}
