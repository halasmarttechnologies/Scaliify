import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OutsourcedHrClient } from "@/components/services/outsourced-hr/OutsourcedHrClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services.outsourcedHr" });
  return buildMetadata({ title: t("title"), description: t("description"), path: "/services/outsourced-hr" });
}

export default async function OutsourcedHrPage({
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
          { name: "Services", path: "/services/outsourced-hr" },
          {
            name: "Outsourced HR Management",
            path: "/services/outsourced-hr",
          },
        ]}
      />
      <ServiceJsonLd
        name="Outsourced HR Management"
        description="Scaliify runs your HR operations as an external team. Full-service HR management for 10-100 employees covering payroll prep, contracts, onboarding, recruiting, and people operations."
        path="/services/outsourced-hr"
      />
      <OutsourcedHrClient />
    </>
  );
}
