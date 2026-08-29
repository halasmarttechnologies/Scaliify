import { Metadata } from "next";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";

export const metadata: Metadata = {
  title: "Blog & Insights | Scaliify",
  description: "Stay informed with need-to-know HR trends, strategic software benchmarks, and People Ops insights from Scaliify.",
};

export default function InsightsBlogPage() {
  return <BlogIndexClient />;
}
