import { Metadata } from "next";
import { HrItSelectionClient } from "@/components/services/hr-it-selection/HrItSelectionClient";

export const metadata: Metadata = {
  title: "HR IT Selection | Independent & Vendor-Neutral | Scaliify",
  description:
    "Independent, vendor-neutral help choosing HR software. Scaliify builds harmonious, silo-free HR IT architectures that scale with your growing company.",
};

export default function HrItSelectionPage() {
  return <HrItSelectionClient />;
}
