import type { Metadata } from "next";
import { siteConfig } from "@/app/config/site";

export const metadata: Metadata = {
  title: `Security Blog | ${siteConfig.name}`,
  description: `Practical security advice, buyer's guides, and industry insights from the ${siteConfig.name} installation team.`,
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
