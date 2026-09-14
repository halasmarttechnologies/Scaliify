"use client";

import { Link } from "@/i18n/navigation";
import { BlogPost } from "@/data/blogPosts";
import { BlogCoverGraphic } from "./BlogCoverGraphic";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col justify-between h-full select-none cursor-default">
      <div className="flex flex-col flex-1">
        {/* Cover Graphic / Thumbnail */}
        <BlogCoverGraphic post={post} />

        {/* Date */}
        <time className="text-xs sm:text-[13px] text-gray-500 font-medium mt-4 mb-2">
          {post.date}
        </time>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight leading-snug mb-4 line-clamp-3">
          {post.title}
        </h3>

        {/* Category Pill Tag */}
        <div className="mt-auto pt-1">
          <span className="inline-block px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium border border-gray-200/90 text-gray-700 bg-white">
            {post.category}
          </span>
        </div>
      </div>

      {/* Card Bottom Divider Line (Matching Screenshot) */}
      <div className="w-full h-px bg-gray-900/70 mt-6" />
    </article>
  );
}
