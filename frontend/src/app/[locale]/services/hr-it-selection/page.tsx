import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HrItSelectionClient } from "@/components/services/hr-it-selection/HrItSelectionClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services.hrItSelection" });
  return buildMetadata({ title: t("title"), description: t("description"), path: "/services/hr-it-selection" });
}

export default async function HrItSelectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/hr-it-selection" },
          { name: "HR IT Selection", path: "/services/hr-it-selection" },
        ]}
      />
      <ServiceJsonLd
        name="HR IT Selection"
        description="Independent, vendor-neutral HR software selection service. Benchmarking 20+ platforms to build harmonious, silo-free HR IT architectures."
        path="/services/hr-it-selection"
      />
      <HrItSelectionClient />
    </>
  );
}
