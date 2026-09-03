"use client";

import { useState, useMemo } from "react";
import { BLOG_POSTS, BLOG_CATEGORIES, BlogCategory } from "@/data/blogPosts";
import { BlogFilter } from "@/components/home/blog/BlogFilter";
import { BlogCard } from "@/components/home/blog/BlogCard";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function BlogIndexClient() {
  const t = useTranslations("blogIndex");
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtered list
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-white pt-28 sm:pt-36 pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-6xl mx-auto flex flex-col">
        
        {/* 1. Clean Start / Header Section with Neat Search Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-3">
              {t("heading")}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Clean Minimal Search Filter (No glow, no black background, no shadows) */}
          <div className="w-full md:w-72 sm:w-80 shrink-0">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3.5 py-2 transition-colors focus-within:border-gray-400">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full bg-transparent text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2. Interactive Category Filters */}
        <BlogFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 3. Horizontal Section Separator Line */}
        <div className="w-full h-px bg-gray-200 mb-10 sm:mb-12" />

        {/* 4. 3-Column Responsive Blog Cards Grid (Instant static rendering, no pop-in animation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-y-16">
          {filteredPosts.map((post) => (
            <div key={post.id}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        {/* Empty state if filtered category has no posts */}
        {filteredPosts.length === 0 && (
          <div className="w-full py-16 text-center text-gray-500 text-sm">
            {t("noResults", { query: searchQuery })}
          </div>
        )}

        {/* 5. Bottom HR Stack Benchmark Banner */}
        <div className="mt-16 sm:mt-24 w-full bg-brand-dark text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="relative z-10 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              {t("toolFinderBannerHeading")}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              {t("toolFinderBannerDesc")}
            </p>
          </div>

          <Link
            href="/tool-finder"
            className="group relative inline-flex items-center gap-2 bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep text-brand-dark font-extrabold text-sm px-6 py-3.5 rounded-full border border-white/70 shadow-[0_3px_16px_rgba(129,216,208,0.55)] hover:shadow-[0_4px_22px_rgba(129,216,208,0.85)] hover:scale-105 active:scale-95 transition-all shrink-0 overflow-hidden"
          >
            <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
            <span className="relative z-10">{t("launchToolFinder")}</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
