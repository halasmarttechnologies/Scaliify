import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

// ── Critical above-the-fold components (loaded immediately) ───────────────────
import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";

// ── Below-fold components (dynamically loaded, reduces initial JS bundle) ──────
const CoreFeatures = dynamic(() =>
  import("@/components/home/CoreFeatures").then((m) => m.CoreFeatures)
);
const HomeFastTimeToValue = dynamic(() =>
  import("@/components/home/HomeFastTimeToValue").then((m) => m.HomeFastTimeToValue)
);
const TrustedCompanies = dynamic(() =>
  import("@/components/home/TrustedCompanies").then((m) => m.TrustedCompanies)
);
const SoftwareStack = dynamic(() =>
  import("@/components/home/SoftwareStack").then((m) => m.SoftwareStack)
);
const SupportFromDayOne = dynamic(() =>
  import("@/components/common/SupportFromDayOne").then((m) => m.SupportFromDayOne)
);
const Testimonials = dynamic(() =>
  import("@/components/home/Testimonials").then((m) => m.Testimonials)
);
const FAQ = dynamic(() =>
  import("@/components/home/FAQ").then((m) => m.FAQ)
);
const BookingLeadSection = dynamic(() =>
  import("@/components/common/BookingLeadSection").then((m) => m.BookingLeadSection)
);
const BlogSection = dynamic(() =>
  import("@/components/home/BlogSection").then((m) => m.BlogSection)
);

// ── SEO ───────────────────────────────────────────────────────────────────────
import { buildMetadata } from "@/lib/seo";
import { FAQPageJsonLd } from "@/components/seo/JsonLd";
import { FAQ_ITEMS } from "@/data/faq";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/",
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="w-full min-h-screen relative bg-white">
      <FAQPageJsonLd questions={FAQ_ITEMS} />

      {/* Above fold — critical, always eagerly loaded */}
      <Hero />
      <ServicesOverview />

      {/* Below fold — lazy loaded in separate JS chunks */}
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
