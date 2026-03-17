import { getSiteSettings } from "@/app/lib/getSiteSettings";
import { sanityFetch } from "@/app/lib/sanity";
import { singleAreaQuery } from "@/app/lib/queries";
import { type ServiceArea } from "@/app/lib/types";
import AreaLandingClient from "./AreaLandingClient";

export default async function AreaLandingPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const [settings, areaData] = await Promise.all([
    getSiteSettings(),
    sanityFetch<ServiceArea | null>(singleAreaQuery, { slug: area }),
  ]);
  return <AreaLandingClient settings={settings} areaData={areaData ?? undefined} />;
}
