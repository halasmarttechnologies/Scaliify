import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LetsTalkClient } from "@/components/lets-talk/LetsTalkClient";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.letsTalk" });
  return buildMetadata({ title: t("title"), description: t("description"), path: "/lets-talk" });
}

export default async function LetsTalkPage({
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
          { name: "Book a Demo", path: "/lets-talk" },
        ]}
      />
      <LetsTalkClient />
    </>
  );
}
