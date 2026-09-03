import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blogPosts";

const SITE_URL = "https://www.scaliify.com";
const LOCALES = ["en", "de"] as const;

function localizedUrls(
  path: string,
  opts: { lastModified?: Date; changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number }
): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency ?? "monthly",
    priority: opts.priority ?? 0.7,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    ...localizedUrls("", { changeFrequency: "weekly", priority: 1.0 }),
    ...localizedUrls("/tool-finder", { changeFrequency: "weekly", priority: 0.9 }),
    ...localizedUrls("/blog", { changeFrequency: "weekly", priority: 0.8 }),
    ...localizedUrls("/about", { changeFrequency: "monthly", priority: 0.8 }),
    ...localizedUrls("/services/hr-it-selection", { changeFrequency: "monthly", priority: 0.8 }),
    ...localizedUrls("/services/implementation-optimisation", { changeFrequency: "monthly", priority: 0.8 }),
    ...localizedUrls("/services/hr-it-integrations", { changeFrequency: "monthly", priority: 0.8 }),
    ...localizedUrls("/services/interim-management", { changeFrequency: "monthly", priority: 0.8 }),
    ...localizedUrls("/services/outsourced-hr", { changeFrequency: "monthly", priority: 0.8 }),
    ...localizedUrls("/services/hr-advisory", { changeFrequency: "monthly", priority: 0.8 }),
    ...localizedUrls("/case-studies", { changeFrequency: "weekly", priority: 0.8 }),
    ...localizedUrls("/insights/guides", { changeFrequency: "weekly", priority: 0.8 }),
    ...localizedUrls("/insights/resources", { changeFrequency: "weekly", priority: 0.8 }),
    ...localizedUrls("/contact", { changeFrequency: "monthly", priority: 0.6 }),
    ...localizedUrls("/lets-talk", { changeFrequency: "monthly", priority: 0.7 }),
    ...localizedUrls("/privacy", { changeFrequency: "monthly", priority: 0.5 }),
    ...localizedUrls("/terms", { changeFrequency: "monthly", priority: 0.5 }),
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.flatMap((post) =>
    localizedUrls(`/blog/${post.slug}`, {
      lastModified: new Date(post.dateISO),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticPages, ...blogPages];
}
