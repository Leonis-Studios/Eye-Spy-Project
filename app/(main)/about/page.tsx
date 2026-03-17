import { getSiteSettings } from "@/app/lib/getSiteSettings";
import { sanityFetch } from "@/app/lib/sanity";
import { teamQuery } from "@/app/lib/queries";
import { type TeamMember } from "@/app/lib/types";
import AboutClient from "./AboutClient";

export default async function AboutPage() {
  const [settings, team] = await Promise.all([
    getSiteSettings(),
    sanityFetch<TeamMember[]>(teamQuery),
  ]);
  return <AboutClient settings={settings} team={team} />;
}
