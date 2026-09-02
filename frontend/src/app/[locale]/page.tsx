import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { CoreFeatures } from "@/components/home/CoreFeatures";
import { HomeFastTimeToValue } from "@/components/home/HomeFastTimeToValue";
import { TrustedCompanies } from "@/components/home/TrustedCompanies";
import { SoftwareStack } from "@/components/home/SoftwareStack";
import { SupportFromDayOne } from "@/components/common/SupportFromDayOne";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";
import { buildMetadata } from "@/lib/seo";
import { FAQPageJsonLd } from "@/components/seo/JsonLd";
import { FAQ_ITEMS } from "@/data/faq";

export const metadata: Metadata = buildMetadata({
  title: "Scaliify — Independent HR Technology Consultancy",
  description:
    "Vendor-neutral HR software selection, implementation, and integrations for European businesses. Benchmark 20+ platforms and find the right HR tech stack.",
  path: "/",
});

export default function Home() {
  return (
    <main className="w-full min-h-screen relative bg-white">
      <FAQPageJsonLd questions={FAQ_ITEMS} />
      <Hero />
      <ServicesOverview />
      <CoreFeatures />
      <HomeFastTimeToValue />
      <TrustedCompanies />
      <SoftwareStack />
      <SupportFromDayOne />
      <Testimonials />
      <FAQ />
      <BookingLeadSection />
      <BlogSection />
    </main>
  );
}
