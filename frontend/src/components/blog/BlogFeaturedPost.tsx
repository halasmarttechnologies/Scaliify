"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { BlogPost } from "@/data/blogPosts";
import { BlogCoverGraphic } from "@/components/home/blog/BlogCoverGraphic";
import { motion } from "framer-motion";

interface BlogFeaturedPostProps {
  post: BlogPost;
}

export function BlogFeaturedPost({ post }: BlogFeaturedPostProps) {
  const t = useTranslations("blogIndex");
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className="w-full bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 lg:p-10 mb-12 lg:mb-16 group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Cover Graphic (7 cols) */}
        <div className="lg:col-span-7">
          <Link href={`/insights/blog/${post.slug}`} className="block overflow-hidden rounded-2xl">
            <BlogCoverGraphic post={post} />
          </Link>
        </div>

        {/* Story Content (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            {/* Meta Tags */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-brand-dark text-brand-teal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {t("featuredStory")}
              </span>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <Link href={`/insights/blog/${post.slug}`}>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 leading-tight group-hover:text-brand-dark transition-colors mb-4">
                {post.title}
              </h2>
            </Link>

            {/* Excerpt */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              {post.excerpt}
            </p>
          </div>

          {/* Bottom Row: Read Time + Action */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {post.readTime}
              </span>
            </div>

            <Link
              href={`/insights/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 font-bold text-sm text-brand-dark group-hover:text-brand-teal transition-colors"
            >
              <span>{t("readArticle")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
