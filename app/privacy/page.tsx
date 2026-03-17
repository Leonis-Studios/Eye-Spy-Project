import { getSiteSettings } from "../lib/getSiteSettings";
import PrivacyClient from "./PrivacyClient";

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  return <PrivacyClient settings={settings} />;
}
