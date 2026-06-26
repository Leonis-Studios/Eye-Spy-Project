import type { Metadata } from "next";
import { siteConfig } from "@/app/config/site";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: `Meet the ${siteConfig.name} team. Professional security system installation for homes and businesses. Licensed, insured, and locally owned.`,
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
