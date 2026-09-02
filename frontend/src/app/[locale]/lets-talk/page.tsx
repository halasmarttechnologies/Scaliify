import type { Metadata } from "next";
import { LetsTalkClient } from "@/components/lets-talk/LetsTalkClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Book a Demo",
  description:
    "Book a personalised HR technology demo with Scaliify. Tell us about your needs and we'll build a tailored walkthrough aligned to your exact goals.",
  path: "/lets-talk",
});

export default function LetsTalkPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Book a Demo", path: "/lets-talk" },
        ]}
      />
      <LetsTalkClient />
    </>
  );
}
