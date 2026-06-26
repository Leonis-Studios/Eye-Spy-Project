import type { Metadata } from "next";
import { siteConfig } from "@/app/config/site";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name}. Call, email, or send us a message to schedule your free security estimate.`,
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
