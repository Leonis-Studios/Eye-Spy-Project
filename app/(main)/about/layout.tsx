import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SecurTech Security Systems",
  description:
    "Meet the SecurTech team. 15 years of professional security system installation for homes and businesses. Licensed, insured, and locally owned.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
