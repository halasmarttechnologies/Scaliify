import { Metadata } from "next";
import { ToolFinderHero } from "@/components/tool-finder/ToolFinderHero";
import { ToolFinderWizard } from "@/components/tool-finder/ToolFinderWizard";
import { ToolFinderPlatformOverview } from "@/components/tool-finder/ToolFinderPlatformOverview";
import { ToolFinderAreasCovered } from "@/components/tool-finder/ToolFinderAreasCovered";
import { ToolFinderIntegrationsMarquee } from "@/components/tool-finder/ToolFinderIntegrationsMarquee";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { BlogSection } from "@/components/home/BlogSection";

export const metadata: Metadata = {
  title: "HR Tool Finder - Independent Software Advisory | Scaliify",
  description: "Benchmark 20+ top European and global HR software systems with Scaliify's independent recommendation and scoring engine.",
};

export default function ToolFinderPage() {
  return (
    <main className="w-full min-h-screen relative">
      <ToolFinderHero />

      <div className="w-full relative bg-[#FAFBFB]">
        {/* Section A: The Interactive Tool Assessment */}
        <section id="tool-finder-tool" className="w-full pt-12 sm:pt-16 pb-12 sm:pb-16 bg-white">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-3">
                Independent HR Tool Assessment
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Answer 9 quick questions to benchmark and calculate your top 3 HR platform matches.
              </p>
            </div>

            {/* Interactive Assessment Workspace */}
            <ToolFinderWizard />
          </div>
        </section>

        {/* Section B: 200+ Integrations Marquee (Positioned directly below the Assessment Form) */}
        <ToolFinderIntegrationsMarquee />

        {/* Section C: Platform Overview (Clear Upfront Promise: How long it takes, What you get, 100% Free & Independent) */}
        <ToolFinderPlatformOverview />

        {/* Section D: Areas Covered (The 4 Pillars: HR Admin / Core, Recruiting, Performance, Time & Attendance) */}
        <ToolFinderAreasCovered />

        {/* Section E: Teams Like Yours (Testimonials) */}
        <Testimonials />

        {/* Section F: Frequently Asked Questions */}
        <FAQ />

        {/* Section G: Latest Insights & Blog Articles */}
        <BlogSection />
      </div>
    </main>
  );
}
