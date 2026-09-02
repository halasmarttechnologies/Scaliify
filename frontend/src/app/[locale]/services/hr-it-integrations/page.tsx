import type { Metadata } from "next";
import { HrItIntegrationsClient } from "@/components/services/hr-it-integrations/HrItIntegrationsClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "HR IT Integrations & System Architecture",
  description:
    "Seamless HR system integrations establishing a single source of truth. Expert synchronisation for HRIS, payroll, ATS, ERP, and custom API connections.",
  path: "/services/hr-it-integrations",
});

export default function HrItIntegrationsPage() {
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
