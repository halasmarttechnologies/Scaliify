"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  CalendarCheck,
} from "lucide-react";
import Link from "next/link";
import {
  AssessmentAnswers,
  ToolRecommendation,
} from "@/lib/api";
import { useToolFinderPersistence } from "@/hooks/useToolFinderPersistence";
import { TOOL_FINDER_QUESTIONS } from "@/data/toolFinderQuestions";

const TOTAL_STEPS = 10;

const STEP_METADATA = [
  { step: 1, label: "Scale" },
  { step: 2, label: "Region" },
  { step: 3, label: "Goal" },
  { step: 4, label: "Core HR" },
  { step: 5, label: "Payroll" },
  { step: 6, label: "Recruiting" },
  { step: 7, label: "Growth" },
  { step: 8, label: "Time" },
  { step: 9, label: "Stack" },
  { step: 10, label: "Results" },
];

export function ToolFinderWizard() {
  const {
    currentStep,
    setCurrentStep,
    answers,
    setAnswers,
    lead,
    setLead,
    results,
    isLoading,
    isSubmitting,
    errorMsg,
    handleNext,
    handleBack,
    submitAssessment,
    retakeAssessment,
  } = useToolFinderPersistence();

  const toggleArrayItem = (key: keyof AssessmentAnswers, value: string) => {
    const currentList = answers[key] as string[];
    if (currentList.includes(value)) {
      if (currentList.length > 1) {
        setAnswers({ ...answers, [key]: currentList.filter((item) => item !== value) });
      }
    } else {
      setAnswers({ ...answers, [key]: [...currentList, value] });
    }
  };

  // =========================================================================
  // VIEW: LOADING SKELETON (Prevents flash of step 0 during restoration)
  // =========================================================================
  if (isLoading) {
    return (
      <div id="tool-finder-tool" className="w-full bg-[#0C241D] text-white rounded-2xl border border-white/10 p-12 sm:p-16 flex flex-col items-center justify-center min-h-[420px] text-center shadow-lg">
        <div className="w-10 h-10 border-3 border-white/20 border-t-white rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-gray-300">
          Restoring assessment session...
        </p>
      </div>
    );
  }

  // =========================================================================
  // VIEW: SUBMISSION IN PROGRESS SPINNER
  // =========================================================================
  if (isSubmitting) {
    return (
      <div id="tool-finder-tool" className="w-full bg-[#0C241D] text-white rounded-2xl border border-white/10 p-12 sm:p-16 flex flex-col items-center justify-center min-h-[420px] text-center shadow-lg">
        <div className="w-12 h-12 border-3 border-white/20 border-t-[#81D8D0] rounded-full animate-spin mb-5" />
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Calculating Ranked Recommendations...
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 max-w-md">
          Benchmarking your organization requirements against 20+ verified HRIS, ATS, and Payroll platforms.
        </p>
      </div>
    );
  }

  // =========================================================================
  // VIEW 0: INTRO SCREEN
  // =========================================================================
  if (currentStep === 0) {
    return (
      <div id="tool-finder-tool" className="w-full bg-[#0C241D] text-white rounded-2xl border border-white/10 p-8 sm:p-12 lg:p-16 flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4 max-w-2xl">
          Evaluate & Benchmark Your Next HR Software
        </h2>

        <p className="text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed mb-10">
          Walk through our 9-step guided assessment to uncover the ideal HRIS, ATS, Performance, and Payroll software platforms matching your exact organization.
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
          onClick={() => setCurrentStep(1)}
          className="inline-flex items-center justify-center gap-3 bg-[#81D8D0] text-black hover:bg-white font-bold px-8 py-3.5 rounded-xl text-sm sm:text-base transition-colors group cursor-pointer w-full sm:w-auto shadow-md"
        >
          <span>Start Assessment</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-black" />
        </button>
      </div>
    );
  }

  // =========================================================================
  // VIEW 11: RESULTS SCREEN (PURE WHITE UI + CLEAN TYPOGRAPHY)
  // =========================================================================
  if (currentStep === 11 && results) {
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
            onClick={retakeAssessment}
            className="shrink-0 inline-flex items-center justify-center gap-2 text-xs font-bold bg-[#FAFBFB] text-gray-900 hover:bg-gray-100 border border-gray-200 px-5 py-2.5 rounded-xl transition-colors cursor-pointer w-full sm:w-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
        </div>

        {/* 3 Ranked Recommendation Cards (Pure White UI) */}
        <div className="flex flex-col gap-5">
          {results.topRecommendations.map((tool: ToolRecommendation, index: number) => (
            <div
              key={tool.toolId}
              className="bg-white text-gray-900 rounded-2xl border border-gray-200 p-5 sm:p-8 flex flex-col justify-between shadow-sm"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0C241D] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#FAFBFB] border border-gray-200 text-gray-800">
                        {tool.categoryLabel}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-1">
                      {tool.badge}
                    </p>
                  </div>
                </div>

                <div className="flex items-baseline gap-1.5 self-start sm:self-auto bg-[#FAFBFB] border border-gray-200 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl">
                  <span className="text-2xl sm:text-3xl font-black text-[#0C241D]">
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
              <div className="bg-[#FAFBFB] rounded-xl p-4 sm:p-5 border border-gray-100 mb-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">Key Matched Capabilities</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {tool.matchedFeatures.map((feat: string, fIdx: number) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <div className="w-4 h-4 rounded-full bg-[#0C241D] text-white flex items-center justify-center shrink-0">
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
                  className="inline-flex items-center justify-center gap-2 bg-[#81D8D0] text-black hover:bg-[#6ec2ba] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors text-center shadow-sm"
                >
                  <CalendarCheck className="w-4 h-4 text-black" />
                  <span>Book Implementation Call</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Scaliify Advisory CTA (Pure White UI) */}
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
            className="shrink-0 bg-[#81D8D0] text-black hover:bg-[#6ec2ba] font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl transition-colors w-full sm:w-auto text-center shadow-sm"
          >
            Speak with an Advisor
          </Link>
        </div>
      </div>
    );
  }

  // Active question for steps 1..9
  const activeQuestion = TOOL_FINDER_QUESTIONS.find((q) => q.step === currentStep);

  // =========================================================================
  // VIEW 1..10: QUESTIONS WORKSPACE (HERO COLOR BG + SUBTLE ROUND CORNERS)
  // =========================================================================
  return (
    <div id="tool-finder-tool" className="w-full flex flex-col gap-4">
      {/* Top Steps Progress Tab Strip */}
      <div className="w-full bg-[#0C241D] rounded-2xl border border-white/10 p-2.5 sm:p-3 overflow-x-auto select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 min-w-max">
          {STEP_METADATA.map((meta) => {
            const isCompleted = meta.step < currentStep;
            const isCurrent = meta.step === currentStep;

            return (
              <button
                key={meta.step}
                type="button"
                onClick={() => isCompleted && setCurrentStep(meta.step)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? "group relative bg-gradient-to-b from-[#A8F5EE] via-[#81D8D0] to-[#5BC7BC] text-[#0C241D] font-extrabold border border-white/70 shadow-[0_2px_14px_rgba(129,216,208,0.6)] overflow-hidden scale-[1.03]"
                    : isCompleted
                    ? "bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                    : "text-gray-400 bg-white/5 opacity-60 cursor-default"
                }`}
              >
                {isCurrent && (
                  <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
                )}
                <span className="relative z-10 font-bold">{meta.step < 10 ? `0${meta.step}` : meta.step}</span>
                <span className="relative z-10">{meta.label}</span>
                {isCompleted && <Check className="w-3 h-3 text-[#81D8D0] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card Container */}
      <div className="w-full bg-[#0C241D] text-white rounded-2xl border border-white/10 p-5 sm:p-7 md:p-10 flex flex-col justify-between min-h-[480px]">
        <AnimatePresence mode="wait">
          {/* STEPS 1..9: Data-driven Question Renderer */}
          {activeQuestion && (
            <motion.div
              key={`step-${activeQuestion.step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">{activeQuestion.badge}</span>
                  <span className="text-xs text-gray-400 font-semibold">{activeQuestion.stepIndicator}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  {activeQuestion.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mt-1">
                  {activeQuestion.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeQuestion.options.map((opt) => {
                  const selected = activeQuestion.isMultiSelect
                    ? (answers[activeQuestion.field] as string[]).includes(opt.id)
                    : answers[activeQuestion.field] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        if (activeQuestion.isMultiSelect) {
                          toggleArrayItem(activeQuestion.field, opt.id);
                        } else {
                          setAnswers((prev) => ({ ...prev, [activeQuestion.field]: opt.id }));
                        }
                      }}
                      className={`p-5 rounded-xl border-2 text-left transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                        selected
                          ? "bg-white text-[#0C241D] border-white"
                          : "bg-white/5 text-white border-white/15 hover:border-white/40"
                      }`}
                    >
                      <div>
                        <p className="font-bold text-base leading-tight">{opt.title}</p>
                        <p className={`text-xs mt-1.5 leading-relaxed ${selected ? "text-[#0C241D]/80" : "text-gray-300"}`}>
                          {opt.sub}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          selected ? "bg-[#0C241D] border-[#0C241D] text-white" : "border-white/40 bg-transparent"
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 10: Lead Capture */}
          {currentStep === 10 && (
            <motion.div
              key="step-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Step 10 | Final Step</span>
                  <span className="text-xs text-gray-400 font-semibold">10 of 10</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Where should we send your results?
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mt-1">
                  We will calculate your personalized software matches instantly on the next screen.
                </p>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">First Name *</label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                      placeholder="Jane"
                      value={lead.firstName}
                      onChange={(e) => setLead({ ...lead, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Last Name *</label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                      placeholder="Doe"
                      value={lead.lastName}
                      onChange={(e) => setLead({ ...lead, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Work Email *</label>
                    <input
                      type="email"
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                      placeholder="jane@company.com"
                      value={lead.email}
                      onChange={(e) => setLead({ ...lead, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                      placeholder="+49 151 12345678"
                      value={lead.phone}
                      onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Company Name *</label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                      placeholder="Acme Corp GmbH"
                      value={lead.companyName}
                      onChange={(e) => setLead({ ...lead, companyName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Job Title *</label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                      placeholder="Head of HR"
                      value={lead.jobTitle}
                      onChange={(e) => setLead({ ...lead, jobTitle: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Navigation Area */}
        <div className="pt-8 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex items-center justify-center sm:justify-start">
            {errorMsg ? (
              <span className="text-red-400 text-xs font-bold bg-red-900/40 px-3 py-1.5 rounded-lg border border-red-500/40">
                {errorMsg}
              </span>
            ) : (
              <span className="text-gray-400 text-xs font-semibold">
                Your data is strictly confidential.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center justify-center w-12 h-12 bg-white/5 border border-white/20 text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={currentStep === TOTAL_STEPS ? submitAssessment : handleNext}
              className="inline-flex items-center gap-2 bg-[#81D8D0] text-black hover:bg-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl transition-colors cursor-pointer w-full justify-center sm:w-auto shadow-md"
            >
              <span>{currentStep === TOTAL_STEPS ? "Calculate Recommendations" : "Continue"}</span>
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
