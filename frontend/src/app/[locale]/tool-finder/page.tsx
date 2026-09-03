import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.toolFinder" });
  return buildMetadata({ title: t("title"), description: t("description"), path: "/tool-finder" });
}

export default async function ToolFinderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "toolFinder" });

  return (
    <main className="w-full min-h-screen relative bg-white">
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

      <div className="w-full relative bg-white">
        {/* Section A: The Interactive Tool Assessment */}
        <section id="tool-finder-tool" className="w-full pt-12 sm:pt-16 pb-12 sm:pb-16 bg-white">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-3">
                {t("assessmentTitle")}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {t("assessmentSubtitle")}
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
