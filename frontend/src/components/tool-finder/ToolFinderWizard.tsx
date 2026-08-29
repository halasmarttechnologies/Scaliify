"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { AssessmentAnswers } from "@/lib/api";
import { useToolFinderPersistence } from "@/hooks/useToolFinderPersistence";
import { WizardIntro } from "./WizardIntro";
import { WizardQuestionStep } from "./WizardQuestionStep";
import { WizardLeadForm } from "./WizardLeadForm";
import { WizardResults } from "./WizardResults";

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

  if (isLoading) {
    return (
      <div id="tool-finder-tool" className="w-full bg-brand-dark text-white rounded-2xl border border-white/10 p-12 sm:p-16 flex flex-col items-center justify-center min-h-[420px] text-center shadow-lg">
        <div className="w-10 h-10 border-3 border-white/20 border-t-white rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-gray-300">Restoring assessment session...</p>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div id="tool-finder-tool" className="w-full bg-brand-dark text-white rounded-2xl border border-white/10 p-12 sm:p-16 flex flex-col items-center justify-center min-h-[420px] text-center shadow-lg">
        <div className="w-12 h-12 border-3 border-white/20 border-t-brand-teal rounded-full animate-spin mb-5" />
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Calculating Ranked Recommendations...</h3>
        <p className="text-xs sm:text-sm text-gray-300 max-w-md">Benchmarking your organization requirements against 20+ verified HRIS, ATS, and Payroll platforms.</p>
      </div>
    );
  }

  if (currentStep === 0) {
    return <WizardIntro onStart={() => setCurrentStep(1)} />;
  }

  if (currentStep === 11 && results) {
    return <WizardResults results={results} onRetake={retakeAssessment} />;
  }

  return (
    <div id="tool-finder-tool" className="w-full flex flex-col gap-4">
      {/* Step Progress Tab Strip */}
      <div className="w-full bg-brand-dark rounded-2xl border border-white/10 p-2.5 sm:p-3 overflow-x-auto select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                    ? "group relative bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep text-brand-dark font-extrabold border border-white/70 shadow-[0_2px_14px_rgba(129,216,208,0.6)] overflow-hidden scale-[1.03]"
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
                {isCompleted && <Check className="w-3 h-3 text-brand-teal shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="w-full bg-brand-dark text-white rounded-2xl border border-white/10 p-5 sm:p-7 md:p-10 flex flex-col justify-between min-h-[480px]">
        <AnimatePresence mode="wait">
          {currentStep >= 1 && currentStep <= 9 && (
            <WizardQuestionStep
              currentStep={currentStep}
              answers={answers}
              setAnswers={setAnswers}
              toggleArrayItem={toggleArrayItem}
            />
          )}
          {currentStep === 10 && (
            <WizardLeadForm lead={lead} setLead={setLead} />
          )}
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="pt-8 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex items-center justify-center sm:justify-start">
            {errorMsg ? (
              <span className="text-red-400 text-xs font-bold bg-red-900/40 px-3 py-1.5 rounded-lg border border-red-500/40">
                {errorMsg}
              </span>
            ) : (
              <span className="text-gray-400 text-xs font-semibold">Your data is strictly confidential.</span>
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
              className="inline-flex items-center gap-2 bg-brand-teal text-black hover:bg-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl transition-colors cursor-pointer w-full justify-center sm:w-auto shadow-md"
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
