import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ImplementationOptimisationClient } from "@/components/services/implementation-optimisation/ImplementationOptimisationClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services.implementationOptimisation" });
  return buildMetadata({ title: t("title"), description: t("description"), path: "/services/implementation-optimisation" });
}

export default async function ImplementationOptimisationPage({
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
            name: "Implementation & Optimisation",
            path: "/services/implementation-optimisation",
          },
        ]}
      />
      <ServiceJsonLd
        name="HR IT Implementation & Optimisation"
        description="Expert HR software implementation, data migration, and system optimisation service for European businesses."
        path="/services/implementation-optimisation"
      />
      <ImplementationOptimisationClient />
    </>
  );
}
