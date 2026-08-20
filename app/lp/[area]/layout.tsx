// generateMetadata intentionally omitted here — app/lp/[area]/page.tsx already
// provides the full metadata (title, description, canonical, OG, Twitter) for
// this route via buildMetadata(). See docs/SEO-AEO-GEO.md §8 Common Mistakes.
export default function AreaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
