import type { Metadata } from "next";

export const SITE_URL = "https://www.scaliify.com";
export const SITE_NAME = "Scaliify";
export const SITE_DESCRIPTION =
  "Independent HR technology consultancy: vendor-neutral software selection, implementation, integrations, and People Ops advisory for European businesses.";

export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export function buildMetadata({
  title,
  description,
  path,
  ogType = "website",
  ogImage,
  noIndex = false,
  article,
}: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  ogImage?: string;
  noIndex?: boolean;
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    authors: string[];
    section: string;
  };
}): Metadata {
  const canonical = `${SITE_URL}${path}`;
  const image = ogImage || OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: ogType,
      locale: "en_GB",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(article && ogType === "article"
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: article.authors,
            section: article.section,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
