"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface WizardIntroProps {
  onStart: () => void;
}

export function WizardIntro({ onStart }: WizardIntroProps) {
  const t = useTranslations("toolFinder");
  return (
    <div id="tool-finder-tool" className="w-full bg-brand-dark text-white rounded-2xl border border-white/10 p-8 sm:p-12 lg:p-16 flex flex-col items-center text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4 max-w-2xl">
        {t("wizardIntro.heading")}
      </h2>

      <p className="text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed mb-10">
        {t("wizardIntro.subtitle")}
      </p>

      {/* 3 Value Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-10 text-left">
        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
          <span className="font-bold text-white text-sm block mb-1">01. Unbiased Matching</span>
          <span className="text-xs text-gray-300 leading-relaxed block">
            Independent scoring based strictly on your functional requirements and team size.
          </span>
        </div>

        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
          <span className="font-bold text-white text-sm block mb-1">02. 2-Minute Flow</span>
          <span className="text-xs text-gray-300 leading-relaxed block">
            Quick, intuitive multi-choice questionnaire designed by veteran HR architects.
          </span>
        </div>

        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
          <span className="font-bold text-white text-sm block mb-1">03. Instant Fit Scores</span>
          <span className="text-xs text-gray-300 leading-relaxed block">
            Ranked recommendations with match percentages and qualitative rationale.
          </span>
        </div>
      </div>

      <button
        onClick={onStart}
        className="inline-flex items-center justify-center gap-3 bg-brand-teal text-black hover:bg-white font-bold px-8 py-3.5 rounded-xl text-sm sm:text-base transition-colors group cursor-pointer w-full sm:w-auto shadow-md"
      >
        <span>{t("wizardIntro.startButton")}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-black" />
      </button>
    </div>
  );
}
