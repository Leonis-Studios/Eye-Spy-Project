import { getSiteSettings } from "@/app/lib/getSiteSettings";
import ContactClient from "./ContactClient";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return <ContactClient settings={settings} />;
}
