import { Suspense } from "react";
import { getSiteSettings } from "@/app/lib/getSiteSettings";
import ContactClient from "./ContactClient";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050d1a]" />}>
      <ContactClient settings={settings} />
    </Suspense>
  );
}
