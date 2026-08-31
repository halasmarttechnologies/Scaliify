import type { Metadata } from "next";
import { HrItSelectionClient } from "@/components/services/hr-it-selection/HrItSelectionClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "HR IT Selection — Independent & Vendor-Neutral",
  description:
    "Independent, vendor-neutral HR software selection. Scaliify builds harmonious, silo-free HR IT architectures that scale with your growing company.",
  path: "/services/hr-it-selection",
});

export default function HrItSelectionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/hr-it-selection" },
          { name: "HR IT Selection", path: "/services/hr-it-selection" },
        ]}
      />
      <ServiceJsonLd
        name="HR IT Selection"
        description="Independent, vendor-neutral HR software selection service. Benchmarking 20+ platforms to build harmonious, silo-free HR IT architectures."
        path="/services/hr-it-selection"
      />
      <HrItSelectionClient />
    </>
  );
}
