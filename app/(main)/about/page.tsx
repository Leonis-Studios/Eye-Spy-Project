import { getSiteSettings } from "@/app/lib/getSiteSettings";
import { sanityFetch } from "@/app/lib/sanity";
import { teamQuery, aboutPageQuery } from "@/app/lib/queries";
import { type TeamMember, type AboutPageData } from "@/app/lib/types";
import AboutClient from "./AboutClient";

export default async function AboutPage() {
  const [settings, team, aboutData] = await Promise.all([
    getSiteSettings(),
    sanityFetch<TeamMember[]>(teamQuery),
    sanityFetch<AboutPageData | null>(aboutPageQuery),
  ]);
  return <AboutClient settings={settings} team={team} aboutData={aboutData ?? {}} />;
}
