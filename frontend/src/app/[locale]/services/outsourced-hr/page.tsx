import type { Metadata } from "next";
import { OutsourcedHrClient } from "@/components/services/outsourced-hr/OutsourcedHrClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Outsourced HR Management — Scaliify Runs Your HR Operations",
  description:
    "Scaliify runs your HR operations as a dedicated external team for companies with 10–100 employees. Standardized processes, recruiting, payroll preparation, and onboarding on a flexible pay-as-you-go model.",
  path: "/services/outsourced-hr",
});

export default function OutsourcedHrPage() {
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
