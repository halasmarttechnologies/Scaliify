import type { Metadata } from "next";
import { AboutUsClient } from "@/components/about/AboutUsClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "About Us — Our Story, Team & Vision",
  description:
    "Learn about Scaliify's mission to bridge the gap between ambitious growth and operational excellence. Meet partners Sarah Mittiga and Ben Böhmer and our global network of >100 specialists.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ]}
      />
      <AboutUsClient />
    </>
  );
}
