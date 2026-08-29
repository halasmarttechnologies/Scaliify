"use client";

import { BlogCategory, BLOG_CATEGORIES } from "@/data/blogPosts";

interface BlogFilterProps {
  selectedCategory: BlogCategory;
  onSelectCategory: (category: BlogCategory) => void;
}

export function BlogFilter({ selectedCategory, onSelectCategory }: BlogFilterProps) {
  return (
    <div className="w-full flex flex-col items-start mb-8">
      {/* Small "Categories" title */}
      <h3 className="text-sm sm:text-base font-bold text-gray-950 mb-3 tracking-tight">
        Categories
      </h3>

      {/* Category Pills List */}
      <div className="w-full flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {BLOG_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-xs sm:text-[13px] transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                isSelected
                  ? "bg-[#D6EBE3] text-gray-950 font-semibold border-[#B8DDD3] shadow-2xs"
                  : "bg-white text-gray-700 hover:text-black border-gray-200/90 hover:border-gray-300 font-medium"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
