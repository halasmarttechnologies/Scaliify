"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ACCORDION_PANEL } from "@/lib/motion";

interface FAQItem {
  question: string;
  answer: string;
}

const PANEL_TRANSITION = { duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] as const };

export function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FAQItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <section
      id="faq"
      className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            {t("heading")}
          </h2>
        </div>

        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full py-5 sm:py-6 flex items-center justify-between text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50 rounded-sm"
                >
                  <span className="font-semibold text-gray-900 text-base sm:text-lg md:text-[19px] pr-6 group-hover:text-black leading-snug transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-gray-700 shrink-0 transition-transform duration-300 ease-in-out group-hover:text-black",
                      isOpen && "rotate-180 text-black"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      {...ACCORDION_PANEL}
                      transition={PANEL_TRANSITION}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 sm:pb-7 pr-8 text-gray-600 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
