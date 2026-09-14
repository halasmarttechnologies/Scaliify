import type { Metadata } from "next";
import { GuidesClient } from "@/components/resources/GuidesClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Guides & Checklists — HR Playbooks & Software Implementation Guides",
  description:
    "Free, actionable HR guides, vendor selection scorecards, DATEV payroll cutover checklists, and compliance playbooks from Scaliify.",
  path: "/guides",
});

import { setRequestLocale } from "next-intl/server";

export default async function GuidesPage({
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
          { name: "Guides & Checklists", path: "/guides" },
        ]}
      />
      <GuidesClient />
    </>
  );
}
