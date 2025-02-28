export const metadata = {
  title: "Home - Open PRO",
  description: "Page description",
};

import PageIllustration from "../_components/page-illustration";
import Hero from "../_components/hero-home";
import Workflows from "../_components/workflows";
import Features from "../_components/features";
import Cta from "../_components/cta";

export default async function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] selection:bg-blue-500/20 selection:text-blue-200">
      <main>
        <PageIllustration />
        <Hero />
        <Workflows />
        <Features />
        <Cta />
      </main>
    </div>
  );
}
