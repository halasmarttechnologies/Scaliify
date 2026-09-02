import type { Metadata } from "next";
import { ResourcesClient } from "@/components/resources/ResourcesClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "HR Resources — RFP Templates & Decision Frameworks",
  description:
    "Download free vendor-neutral HR RFP templates, software TCO calculators, contract addendums, and People operations decision frameworks.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "HR Resources", path: "/resources" },
        ]}
      />
      <ResourcesClient />
    </>
  );
}
