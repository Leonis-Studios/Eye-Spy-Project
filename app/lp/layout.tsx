// app/lp/layout.tsx
// Overrides the root layout for all landing pages —
// removes the main Navbar and Footer so they don't appear
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
