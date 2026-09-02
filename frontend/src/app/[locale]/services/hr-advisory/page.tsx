import type { Metadata } from "next";
import { HrAdvisoryClient } from "@/components/services/hr-advisory/HrAdvisoryClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "HR Advisory — On-Demand Expert Input Without a Full Consultancy",
  description:
    "Strategic HR advisory combining management consulting rigor with hands-on People operations. Restructuring, compensation frameworks, performance design, works council topics, and employment law on flexible terms.",
  path: "/services/hr-advisory",
});

export default function HrAdvisoryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/hr-advisory" },
          {
            name: "HR Advisory",
            path: "/services/hr-advisory",
          },
        ]}
      />
      <ServiceJsonLd
        name="HR Advisory"
        description="On-demand strategic HR advisory without retaining a full consultancy. Strategy consulting plus real-world HR operations covering restructuring, comp & ben, org design, and works councils."
        path="/services/hr-advisory"
      />
      <HrAdvisoryClient />
    </>
  );
}
