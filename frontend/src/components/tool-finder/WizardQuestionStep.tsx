"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { AssessmentAnswers } from "@/lib/api";
import { TOOL_FINDER_QUESTIONS } from "@/data/toolFinderQuestions";

interface TranslatedOption {
  title: string;
  sub: string;
}

interface TranslatedQuestion {
  badge: string;
  stepIndicator: string;
  title: string;
  subtitle: string;
  options: TranslatedOption[];
}

interface WizardQuestionStepProps {
  currentStep: number;
  answers: AssessmentAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<AssessmentAnswers>>;
  toggleArrayItem: (key: keyof AssessmentAnswers, value: string) => void;
}

export function WizardQuestionStep({ currentStep, answers, setAnswers, toggleArrayItem }: WizardQuestionStepProps) {
  const t = useTranslations("toolFinder");
  const activeQuestion = TOOL_FINDER_QUESTIONS.find((q) => q.step === currentStep);

  if (!activeQuestion) return null;

  // Get translated question data (text/labels), keep option IDs from the data file
  const translatedQuestions = t.raw("questions") as TranslatedQuestion[];
  const translatedQuestion = translatedQuestions[currentStep - 1] as TranslatedQuestion | undefined;

  const displayBadge = translatedQuestion?.badge ?? activeQuestion.badge;
  const displayStepIndicator = translatedQuestion?.stepIndicator ?? activeQuestion.stepIndicator;
  const displayTitle = translatedQuestion?.title ?? activeQuestion.title;
  const displaySubtitle = translatedQuestion?.subtitle ?? activeQuestion.subtitle;

  return (
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
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">{displayBadge}</span>
          <span className="text-xs text-gray-400 font-semibold">{displayStepIndicator}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          {displayTitle}
        </h3>
        <p className="text-gray-300 text-xs sm:text-sm mt-1">
          {displaySubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {activeQuestion.options.map((opt, optIdx) => {
          const selected = activeQuestion.isMultiSelect
            ? (answers[activeQuestion.field] as string[]).includes(opt.id)
            : answers[activeQuestion.field] === opt.id;

          // Use translated option labels if available, fall back to data file
          const translatedOpt = translatedQuestion?.options?.[optIdx];
          const displayOptTitle = translatedOpt?.title ?? opt.title;
          const displayOptSub = translatedOpt?.sub ?? opt.sub;

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
                  ? "bg-white text-brand-dark border-white"
                  : "bg-white/5 text-white border-white/15 hover:border-white/40"
              }`}
            >
              <div>
                <p className="font-bold text-base leading-tight">{displayOptTitle}</p>
                <p className={`text-xs mt-1.5 leading-relaxed ${selected ? "text-brand-dark/80" : "text-gray-300"}`}>
                  {displayOptSub}
                </p>
              </div>
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  selected ? "bg-brand-dark border-brand-dark text-white" : "border-white/40 bg-transparent"
                }`}
              >
                {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      {currentStep === 4 && (
        <div className="mt-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs text-gray-300">
          <span className="text-brand-teal font-bold text-sm leading-none">*</span>
          <span>
            {t("step4Footnote")}
          </span>
        </div>
      )}
    </motion.div>
  );
}
