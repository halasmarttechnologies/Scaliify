"use client";

import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BLOG_POSTS, BlogCategory } from "@/data/blogPosts";
import { BlogCard, BlogFilter } from "./blog";

export function BlogSection() {
  const t = useTranslations("blogSection");
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("All");

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return BLOG_POSTS;
    return BLOG_POSTS.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="blog"
      className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-3">
              {t("heading")}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-dark hover:text-brand-teal transition-colors shrink-0 whitespace-nowrap"
          >
            <span>{t("exploreAll")} &rarr;</span>
          </a>
        </div>

        <BlogFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="w-full h-px bg-gray-200 mb-10 sm:mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-y-14">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="w-full py-16 text-center text-gray-500 text-sm">
            {t("noArticles", { category: selectedCategory })}
          </div>
        )}
      </div>
    </section>
  );
}
