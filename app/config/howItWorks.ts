// ─── HOW IT WORKS STEPS ───────────────────────────────────────────────────────
// Fallback data used when Sanity homePage document has no howItWorksSteps set.
// HowItWorks.tsx and page.tsx prefer Sanity data over these values.
import { type HowItWorksStep } from "../lib/types";

export { type HowItWorksStep };

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
