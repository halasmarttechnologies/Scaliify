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

import { setRequestLocale } from "next-intl/server";

export default async function ResourcesPage({
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
          { name: "HR Resources", path: "/resources" },
        ]}
      />
      <ResourcesClient />
    </>
  );
}
