"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BLOG_POSTS, BlogCategory } from "@/data/blogPosts";
import { BlogCard, BlogFilter } from "./blog";

export function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("All");

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") {
      return BLOG_POSTS;
    }
    return BLOG_POSTS.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="blog"
      className="w-full bg-[#fafafa] py-16 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto flex flex-col">
        {/* 1. Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-3">
              Blog
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl leading-relaxed">
              Stay informed and inspired with Scaliify&apos;s HR blog — your source for need-to-know trends, strategic insights, and helpful resources.
            </p>
          </div>
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-dark hover:text-brand-teal transition-colors shrink-0 whitespace-nowrap"
          >
            <span>Explore all articles &rarr;</span>
          </a>
        </div>

        {/* 2. Interactive Category Filters */}
        <BlogFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 3. Horizontal Section Separator (Matching Screenshot) */}
        <div className="w-full h-px bg-gray-200 mb-10 sm:mb-12" />

        {/* 4. 3-Column Responsive Blog Cards Grid (Instant static rendering, no pop-in animation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-y-14">
          {filteredPosts.map((post) => (
            <div key={post.id}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        {/* Empty state if filtered category has no posts */}
        {filteredPosts.length === 0 && (
          <div className="w-full py-16 text-center text-gray-500 text-sm">
            No articles found in &ldquo;{selectedCategory}&rdquo;. Check back soon!
          </div>
        )}
      </div>
    </section>
  );
}
