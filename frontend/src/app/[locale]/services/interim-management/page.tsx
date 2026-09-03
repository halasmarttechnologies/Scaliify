import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { InterimManagementClient } from "@/components/services/interim-management/InterimManagementClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services.interimManagement" });
  return buildMetadata({ title: t("title"), description: t("description"), path: "/services/interim-management" });
}

export default async function InterimManagementPage({
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
          { name: "Services", path: "/services/interim-management" },
          {
            name: "Interim Management",
            path: "/services/interim-management",
          },
        ]}
      />
      <ServiceJsonLd
        name="Interim HR Management"
        description="Senior HR leadership placed at short notice. Immediate deployment of seasoned CPOs, VPs of People, and Heads of HR backed by a network of 100+ HR specialists."
        path="/services/interim-management"
      />
      <InterimManagementClient />
    </>
  );
}
