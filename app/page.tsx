import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import Benefits from "./components/Benefits";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ";
import EstimateForm from "./components/EstimateForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <Benefits />
      <Services />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <FAQ />
      <EstimateForm />
    </main>
  );
}
