import type { Metadata } from "next";
import { PrivacyPolicyClient } from "@/components/legal/PrivacyPolicyClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy — Scaliify Data Protection & GDPR Notice",
  description:
    "Learn how Scaliify handles, stores, and protects personal data in accordance with the EU General Data Protection Regulation (GDPR) and international privacy laws.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />
      <PrivacyPolicyClient />
    </>
  );
}
