import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HrItIntegrationsClient } from "@/components/services/hr-it-integrations/HrItIntegrationsClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services.hrItIntegrations" });
  return buildMetadata({ title: t("title"), description: t("description"), path: "/services/hr-it-integrations" });
}

export default async function HrItIntegrationsPage({
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
          {
            name: "Integrations",
            path: "/services/hr-it-integrations",
          },
        ]}
      />
      <ServiceJsonLd
        name="HR IT Integrations & System Architecture"
        description="Seamless HR system integrations establishing a single source of truth without duplicate entries across HRIS, payroll, ATS, and ERP systems."
        path="/services/hr-it-integrations"
      />
      <HrItIntegrationsClient />
    </>
  );
}
