import type { Metadata } from "next";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Blog & Insights",
  description:
    "HR trends, strategic software benchmarks, and People Ops insights from Scaliify. Stay ahead with expert analysis on hiring, compliance, and HR technology.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <BlogIndexClient />
    </>
  );
}
