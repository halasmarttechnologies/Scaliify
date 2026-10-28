import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PartnershipsClient } from "@/components/partnerships/PartnershipsClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.partnerships" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/partnerships",
  });
}

export default async function PartnershipsPage({
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
          { name: "Partnerships", path: "/partnerships" },
        ]}
      />
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <PartnershipsClient />
      </Suspense>
    </>
  );
}
