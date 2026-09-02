import type { Metadata } from "next";
import { TermsClient } from "@/components/legal/TermsClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions — Scaliify Consulting",
  description:
    "Review the Terms and Conditions governing Scaliify's HR technology selection, implementation, interim management, and strategic advisory services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Terms and Conditions", path: "/terms" },
        ]}
      />
      <TermsClient />
    </>
  );
}
