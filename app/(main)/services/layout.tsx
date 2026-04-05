import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | EyeSpy Cabling",
  description:
    "Licensed security system installation services including CCTV, alarm systems, access control, and data cabling. Get a free estimate today.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
