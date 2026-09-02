import type { Metadata } from "next";
import { GuidesClient } from "@/components/resources/GuidesClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Guides & Checklists — HR Playbooks & Software Implementation Guides",
  description:
    "Free, actionable HR guides, vendor selection scorecards, DATEV payroll cutover checklists, and compliance playbooks from Scaliify.",
  path: "/insights/guides",
});

export default function GuidesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/blog" },
          { name: "Guides & Checklists", path: "/insights/guides" },
        ]}
      />
      <GuidesClient />
    </>
  );
}
