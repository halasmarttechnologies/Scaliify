import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/providers/ErrorBoundary";
import { ToolFinderHero } from "@/components/tool-finder/ToolFinderHero";
import { ToolFinderWizard } from "@/components/tool-finder/ToolFinderWizard";
import { ToolFinderPlatformOverview } from "@/components/tool-finder/ToolFinderPlatformOverview";
import { ToolFinderAreasCovered } from "@/components/tool-finder/ToolFinderAreasCovered";
import { ToolFinderIntegrationsMarquee } from "@/components/tool-finder/ToolFinderIntegrationsMarquee";
import { SupportFromDayOne } from "@/components/common/SupportFromDayOne";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { BlogSection } from "@/components/home/BlogSection";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "HR Tool Finder — Independent Software Advisory",
  description:
    "Benchmark 20+ European and global HR software platforms with Scaliify's independent recommendation engine. Get vendor-neutral, scored results in minutes.",
  path: "/tool-finder",
});

export default function ToolFinderPage() {
  return (
    <main className="w-full min-h-screen relative">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "HR Tool Finder", path: "/tool-finder" },
        ]}
      />
      <ServiceJsonLd
        name="HR Tool Finder"
        description="Independent HR software recommendation engine that benchmarks 20+ platforms based on company size, industry, region, and requirements."
        path="/tool-finder"
      />
      <ToolFinderHero />

      <div className="w-full relative bg-brand-section">
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
            <ErrorBoundary>
              <ToolFinderWizard />
            </ErrorBoundary>
          </div>
        </section>

        {/* Section B: 200+ Integrations Marquee (Positioned directly below the Assessment Form) */}
        <ToolFinderIntegrationsMarquee />

        {/* Section C: Platform Overview (Clear Upfront Promise: How long it takes, What you get, 100% Free & Independent) */}
        <ToolFinderPlatformOverview />

        {/* Section D: Areas Covered (The 4 Pillars: HR Admin / Core, Recruiting, Performance, Time & Attendance) */}
        <ToolFinderAreasCovered />

        {/* Section E: Seamless Support Bento (Support from day one.) */}
        <SupportFromDayOne />

        {/* Section F: Teams Like Yours (Testimonials) */}
        <Testimonials />

        {/* Section G: Frequently Asked Questions */}
        <FAQ />

        {/* Section H: Latest Insights & Blog Articles */}
        <BlogSection />
      </div>
    </main>
  );
}
