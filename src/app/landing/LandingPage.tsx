export const metadata = {
  title: "Home - Open PRO",
  description: "Page description",
};

import PageIllustration from "../landing/_components/page-illustration";
import Hero from "../landing/_components/hero-home";
import Workflows from "../landing/_components/workflows";
import Features from "../landing/_components/features";
import Testimonials from "../landing/_components/testimonials";
import Cta from "../landing/_components/cta";

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
