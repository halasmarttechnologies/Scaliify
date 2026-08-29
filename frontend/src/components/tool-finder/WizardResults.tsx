"use client";

import React from "react";
import {
  Check,
  RotateCcw,
  ExternalLink,
  CalendarCheck,
} from "lucide-react";
import Link from "next/link";
import { ToolRecommendation } from "@/lib/api";
import type { ToolFinderResponse } from "@/lib/api";

interface WizardResultsProps {
  results: NonNullable<ToolFinderResponse["data"]>;
  onRetake: () => void;
}

export function WizardResults({ results, onRetake }: WizardResultsProps) {
  return (
    <div id="tool-finder-tool" className="w-full bg-white text-gray-900 rounded-2xl border border-gray-200 p-5 sm:p-8 lg:p-12 flex flex-col gap-8 shadow-sm">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
            BENCHMARK RESULTS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Top Ranked Platform Matches
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Calculated independently based on your company size, DACH & global payroll model, and ATS requirements.
          </p>
        </div>

        <button
          onClick={onRetake}
          className="shrink-0 inline-flex items-center justify-center gap-2 text-xs font-bold bg-brand-section text-gray-900 hover:bg-gray-100 border border-gray-200 px-5 py-2.5 rounded-xl transition-colors cursor-pointer w-full sm:w-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake Assessment</span>
        </button>
      </div>

      {/* 3 Ranked Recommendation Cards */}
      <div className="flex flex-col gap-5">
        {results.topRecommendations.map((tool: ToolRecommendation, index: number) => (
          <div
            key={tool.toolId}
            className="bg-white text-gray-900 rounded-2xl border border-gray-200 p-5 sm:p-8 flex flex-col justify-between shadow-sm"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-dark text-white flex items-center justify-center font-bold text-sm shrink-0">
                  #{index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                      {tool.name}
                    </h3>
                    <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-brand-section border border-gray-200 text-gray-800">
                      {tool.categoryLabel}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-1">
                    {tool.badge}
                  </p>
                </div>
              </div>

              <div className="flex items-baseline gap-1.5 self-start sm:self-auto bg-brand-section border border-gray-200 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl">
                <span className="text-2xl sm:text-3xl font-black text-brand-dark">
                  {tool.matchPercentage}%
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Match
                </span>
              </div>
            </div>

            {/* Rationale */}
            <div className="py-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Why it fits your setup</p>
              <p className="text-xs sm:text-base text-gray-800 leading-relaxed">
                {tool.whyRecommended}
              </p>
            </div>

            {/* Capabilities Checklist */}
            <div className="bg-brand-section rounded-xl p-4 sm:p-5 border border-gray-100 mb-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">Key Matched Capabilities</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {tool.matchedFeatures.map((feat: string, fIdx: number) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                    <div className="w-4 h-4 rounded-full bg-brand-dark text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-black transition-colors py-2"
              >
                <span>Visit {tool.name} Official Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-teal text-black hover:bg-[#6ec2ba] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors text-center shadow-sm"
              >
                <CalendarCheck className="w-4 h-4 text-black" />
                <span>Book Implementation Call</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Scaliify Advisory CTA */}
      <div className="bg-white text-gray-900 rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm">
        <div>
          <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-1">
            Need assistance evaluating, negotiating, or rolling out?
          </h4>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
            Scaliify advisors conduct vendor RFP negotiations, manage data migration from spreadsheets, and oversee end-to-end rollouts.
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 bg-brand-teal text-black hover:bg-[#6ec2ba] font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl transition-colors w-full sm:w-auto text-center shadow-sm"
        >
          Speak with an Advisor
        </Link>
      </div>
    </div>
  );
}
