import type { Metadata } from "next";
import { ImplementationOptimisationClient } from "@/components/services/implementation-optimisation/ImplementationOptimisationClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "HR IT Implementation & Optimisation",
  description:
    "Expert HR software implementation, data migration, and system optimisation. Scaliify guides technical rollout and change management to maximise adoption and ROI.",
  path: "/services/implementation-optimisation",
});

export default function ImplementationOptimisationPage() {
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
