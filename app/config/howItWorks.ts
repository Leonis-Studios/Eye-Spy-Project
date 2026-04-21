// ─── HOW IT WORKS STEPS ───────────────────────────────────────────────────────
// Single source of truth for the 3-step process.
// Imported by:
//   - HowItWorks.tsx (client component, for rendering)
//   - app/(main)/page.tsx (server component, for HowTo JSON-LD schema)
// Keep step titles and descriptions here in sync with any UI copy changes.

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: "01",
    title: "Request a Free Estimate",
    description:
      "Contact us to discuss your project and receive a no-obligation quote.",
  },
  {
    step: "02",
    title: "We Survey Your Property",
    description:
      "Our team will visit your location to assess the scope of the project.",
  },
  {
    step: "03",
    title: "We Install Your System",
    description:
      "Our experts will handle the installation process, ensuring everything is set up correctly.",
  },
];
