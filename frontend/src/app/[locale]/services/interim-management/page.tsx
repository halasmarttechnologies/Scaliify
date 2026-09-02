import type { Metadata } from "next";
import { InterimManagementClient } from "@/components/services/interim-management/InterimManagementClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Interim HR Management — Senior Leadership Placed at Short Notice",
  description:
    "Senior interim HR leadership placed immediately. Accountable for organizational outcomes during leadership transitions, parental leaves, rapid scaling, and M&A integrations.",
  path: "/services/interim-management",
});

export default function InterimManagementPage() {
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
