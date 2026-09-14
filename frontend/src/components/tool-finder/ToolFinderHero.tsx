"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

import { HeroAuraWaves } from "@/components/ui/HeroAuraWaves";

export function ToolFinderHero() {
  const t = useTranslations("toolFinder");
  const tHero = useTranslations("hero");

  const scrollToAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    const elem = document.getElementById("tool-finder-tool");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Clean professional headshot for Catherine Muller
  const profileImage = "/avatars/catherine.jpg";

  return (
    <div className="w-full min-h-screen relative bg-black text-white overflow-hidden flex flex-col justify-between">
      {/* Rising Space Aura Waves Background Effect */}
      <HeroAuraWaves />

      {/* Top spacing to account for compact floating navbar */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 flex flex-col items-center relative z-10">
        
        {/* 1. Main Headline (H1) - 2 lines */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white text-center tracking-tight leading-[1.12] max-w-4xl mx-auto">
          <span>{t("heroHeadingLine1")}</span>
          <br />
          <span>{t("heroHeadingLine2")}</span>
        </h1>

        {/* 2. Subheading */}
        <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-300 text-center max-w-2xl mx-auto font-normal leading-relaxed">
          {t("heroSubtitle")}
        </p>

        {/* 3. Glossy Tiffany Blue CTA Button */}
        <div className="mt-7 sm:mt-8 flex justify-center">
          <button
            type="button"
            onClick={scrollToAssessment}
            className="group relative bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep text-brand-dark text-sm sm:text-base font-extrabold px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl border border-white/70 shadow-[0_4px_20px_rgba(129,216,208,0.55)] hover:shadow-[0_6px_28px_rgba(129,216,208,0.85)] hover:scale-[1.03] active:scale-[0.98] transition-all shrink-0 cursor-pointer whitespace-nowrap overflow-hidden"
          >
            {/* Glossy Top Specular Sheen */}
            <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-2xl pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">
              <span>{t("startAssessment")}</span>
              <ChevronDown className="w-4 h-4 text-brand-dark" />
            </span>
          </button>
        </div>

        {/* 4. Trust Statement */}
        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-300 flex items-center justify-center gap-1.5 flex-wrap text-center tracking-tight">
          <span>{tHero("trustedBy")}</span>
          <span className="font-bold text-brand-teal">{tHero("employeeStat")}</span>
          <span>{tHero("employeesAtOver")}</span>
          <span className="font-bold text-brand-teal">{tHero("orgCount")}</span>
          <span>{tHero("organisations")}</span>
        </p>
      </div>
    </div>
  );
}
