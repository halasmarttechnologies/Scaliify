"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { FAQ_ITEMS } from "@/data/faq";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="w-full bg-[#fafafa] py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Centered Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
        </div>

        {/* Minimalist Line-Separated Accordion List */}
        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 sm:py-6 flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-gray-900 text-base sm:text-lg md:text-[19px] pr-6 group-hover:text-black leading-snug transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-700 shrink-0 transition-transform duration-300 ease-in-out group-hover:text-black ${
                      isOpen ? "rotate-180 text-black" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
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

