import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | SecurTech Security Systems",
  description:
    "Get in touch with SecurTech. Call, email, or send us a message to schedule your free security estimate.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
