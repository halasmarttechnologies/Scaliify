import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Scaliify's HR technology advisory team. Schedule a consultation, request a custom software benchmark, or ask about our services.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <ContactPageClient />
    </>
  );
}
