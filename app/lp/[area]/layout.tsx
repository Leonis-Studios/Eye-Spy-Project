import type { Metadata } from "next";
import { sanityFetch } from "@/app/lib/sanity";
import { singleServiceLandingPageQuery, singleAreaQuery } from "@/app/lib/queries";
import { type ServiceLandingPage, type ServiceArea } from "@/app/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;

  const [serviceLP, areaData] = await Promise.all([
    sanityFetch<ServiceLandingPage | null>(singleServiceLandingPageQuery, { slug: area }),
    sanityFetch<ServiceArea | null>(singleAreaQuery, { slug: area }),
  ]);

  if (serviceLP) {
    return {
      title: serviceLP.metaTitle ?? serviceLP.heroHeading,
      description: serviceLP.metaDescription ?? serviceLP.heroSubheading,
    };
  }

  if (areaData) {
    return {
      title: `Security Systems in ${areaData.name}`,
      description: areaData.description,
    };
  }

  return { title: "Landing Page" };
}

export default function AreaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
