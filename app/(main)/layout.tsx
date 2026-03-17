// app/(main)/layout.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSiteSettings } from "../lib/getSiteSettings";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar settings={settings} />
      {children}
      <Footer settings={settings} />
    </>
  );
}
