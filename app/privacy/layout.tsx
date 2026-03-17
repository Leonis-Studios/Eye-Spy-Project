import type { Metadata } from "next";
import { getSiteSettings } from "../lib/getSiteSettings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `Privacy Policy | ${settings.siteName}`,
    description: `Privacy policy for ${settings.siteName}. Learn how we collect, use, and protect your personal information.`,
  };
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
