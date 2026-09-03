import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HrAdvisoryClient } from "@/components/services/hr-advisory/HrAdvisoryClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services.hrAdvisory" });
  return buildMetadata({ title: t("title"), description: t("description"), path: "/services/hr-advisory" });
}

export default async function HrAdvisoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
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
