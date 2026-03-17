import { getSiteSettings } from "@/app/lib/getSiteSettings";
import SecuritySystemsClient from "./SecuritySystemsClient";

export default async function SecuritySystemsLandingPage() {
  const settings = await getSiteSettings();
  return <SecuritySystemsClient settings={settings} />;
}
