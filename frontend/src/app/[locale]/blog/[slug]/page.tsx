import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blogPosts";
import { BlogPostDetail } from "@/components/blog/BlogPostDetail";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  BreadcrumbJsonLd,
  BlogPostingJsonLd,
} from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article Not Found | Scaliify" };
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogType: "article",
    ogImage: post.imageUrl
      ? `${SITE_URL}${post.imageUrl}`
      : undefined,
    article: {
      publishedTime: post.dateISO,
      authors: ["Scaliify"],
      section: post.category,
    },
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <BlogPostingJsonLd
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        datePublished={post.dateISO}
        author="Scaliify"
        image={post.imageUrl}
        category={post.category}
      />
      <BlogPostDetail post={post} />
    </>
  );
}
