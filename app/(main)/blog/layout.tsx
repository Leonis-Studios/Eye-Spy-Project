import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Blog | SecurTech",
  description:
    "Practical security advice, buyer's guides, and industry insights from the SecurTech installation team.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
