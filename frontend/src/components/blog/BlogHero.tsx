"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface BlogHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function BlogHero({ searchQuery, setSearchQuery }: BlogHeroProps) {
  return (
    <div className="w-full bg-black text-white pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Tiffany Blue Glow */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[450px] bg-[radial-gradient(ellipse_at_bottom,rgba(129,216,208,0.18),transparent_70%)]" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-brand-teal mb-6 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
          Scaliify Insights & Knowledge Hub
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] max-w-3xl"
        >
          Need-to-know HR trends & <span className="text-brand-teal">strategic insights</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed"
        >
          Explore expert analysis on EU labor regulations, automated People Ops workflows, and independent software benchmarks for growing European businesses.
        </motion.p>

        {/* Live Search Input Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 sm:mt-10 w-full max-w-md relative"
        >
          <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-1.5 shadow-lg focus-within:border-brand-teal/80 transition-colors">
            <Search className="w-5 h-5 text-gray-400 ml-3.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, regulations, tools..."
              className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-gray-400 hover:text-white px-3 py-1 font-medium cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
