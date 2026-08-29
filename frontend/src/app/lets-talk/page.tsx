import { Metadata } from "next";
import { LetsTalkClient } from "@/components/lets-talk/LetsTalkClient";

export const metadata: Metadata = {
  title: "Let's Talk | Scaliify",
  description: "Book a personalised HR tech session with Scaliify. Tell us about your needs and we'll build a tailored walkthrough for your team.",
};

export default function LetsTalkPage() {
  return <LetsTalkClient />;
}
