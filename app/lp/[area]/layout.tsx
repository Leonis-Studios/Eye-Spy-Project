import { serviceAreas } from "../../config/areas";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  const areaData = serviceAreas.find((a) => a.slug === area);
  if (!areaData) return { title: "SecurTech" };
  return {
    title: `Security Systems in ${areaData.name} | SecurTech`,
    description: areaData.description,
  };
}

export default function AreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
