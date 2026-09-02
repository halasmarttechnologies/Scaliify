import type { Metadata } from "next";
import { CaseStudiesClient } from "@/components/case-studies/CaseStudiesClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies — Real Outcomes for Scaling European Businesses",
  description:
    "Explore how European scaleups and mid-market companies achieved seamless HR operations, zero payroll errors, and strategic organizational clarity with Scaliify.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ]}
      />
      <CaseStudiesClient />
    </>
  );
}
