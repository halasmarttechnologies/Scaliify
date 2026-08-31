"use client";

import Link from "next/link";
import { BlogPost, BLOG_POSTS } from "@/data/blogPosts";
import { BlogCoverGraphic } from "@/components/home/blog/BlogCoverGraphic";
import { BlogCard } from "@/components/home/blog/BlogCard";
import { ArrowLeft, Calendar, Clock, Share2, CheckCircle2, User } from "lucide-react";
import { motion } from "framer-motion";

interface BlogPostDetailProps {
  post: BlogPost;
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
  // Related posts (excluding current post)
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <article className="w-full min-h-screen bg-[#fafafa] pt-28 sm:pt-36 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb + Back Button */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-dark hover:text-brand-teal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all articles</span>
          </Link>

          <span className="text-xs font-semibold text-gray-500 bg-white border border-gray-200/80 px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.2] mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-200 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-semibold text-gray-900">Scaliify Research Team</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {post.date}
              </span>
              <span className="text-gray-300">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {post.readTime}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Article link copied to clipboard!");
                  }
                }}
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-brand-dark transition-colors cursor-pointer"
                title="Copy Link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Featured Cover Graphic */}
        <div className="mb-10 sm:mb-14 overflow-hidden rounded-3xl shadow-sm">
          <BlogCoverGraphic post={post} />
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 md:p-14 shadow-2xs text-gray-800 leading-relaxed space-y-6 sm:space-y-8">
          {/* Executive Summary / Key Takeaways Box */}
          <div className="bg-brand-surface border border-brand-teal/30 rounded-2xl p-6 sm:p-8">
            <h2 className="text-base sm:text-lg font-bold text-brand-dark mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-teal" />
              Executive Summary & Key Takeaways
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              1. Strategic Context & Regulatory Shifts
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              As European labor markets grow increasingly competitive and regulated, HR leaders are pivoting from legacy, fragmented point solutions to unified digital architectures. Navigating changes in compliance, structured recruiting rubrics, and automated compensation transparency requires proactive strategy rather than reactive troubleshooting.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Organizations adopting modern People Ops frameworks report up to 40% reduction in administrative overhead, allowing talent partners to focus on high-impact strategic advisory and leadership retention.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              2. Core Implementation Principles for Modern Teams
            </h2>
            <ul className="space-y-3 text-sm sm:text-base text-gray-600 list-disc pl-5">
              <li>
                <strong className="text-gray-900">Audit your single source of truth:</strong> Ensure employee master records, salary bands, and payroll interfaces (e.g., DATEV, Personio, Deel) remain synchronized in real time.
              </li>
              <li>
                <strong className="text-gray-900">Automate recurring administrative workflows:</strong> Eliminate manual spreadsheets for PTO approvals, onboarding checklists, and device provisioning.
              </li>
              <li>
                <strong className="text-gray-900">Establish objective competency metrics:</strong> Implement structured interview scorecards to remove bias and accelerate time-to-hire.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              3. Next Steps & Recommended Software Assessment
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Selecting the ideal technology stack depends on headcount, geographic distribution, and compliance requirements. Utilizing independent benchmarking diagnostics guarantees unbiased evaluation across 20+ top European HR platforms.
            </p>
          </section>

          {/* Inline CTA Box */}
          <div className="bg-brand-dark text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-10">
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                Benchmark Your Organization&apos;s Stack
              </h4>
              <p className="text-xs sm:text-sm text-gray-300">
                Discover the best HR tools for your team in under 2 minutes.
              </p>
            </div>
            <Link
              href="/tool-finder"
              className="bg-brand-teal text-brand-dark font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full hover:brightness-105 transition-all shrink-0 whitespace-nowrap"
            >
              Start Free Assessment →
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 mb-8">
            Related Insights & Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((rPost) => (
              <BlogCard key={rPost.id} post={rPost} />
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}
