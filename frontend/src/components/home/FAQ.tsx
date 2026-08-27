"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Scaliify?",
    answer:
      "Scaliify is your strategic consultancy partner for all things HR. We help organizations select and implement the right HR software, optimize people operations, and provide high-impact interim HR leadership and advisory.",
  },
  {
    question: "How do you help with HR software selection?",
    answer:
      "We conduct an independent analysis of your requirements, benchmark top market solutions (Personio, Deel, Factorial, Greenhouse, etc.), and guide your vendor evaluation to find the ideal fit with maximum ROI.",
  },
  {
    question: "Can Scaliify assist with HR system integrations?",
    answer:
      "Yes, we specialize in connecting your entire HR tech ecosystem—linking your core HRIS, applicant tracking, payroll, and performance tools into automated, error-free workflows.",
  },
  {
    question: "Do you offer interim HR management?",
    answer:
      "Absolutely. Whether you are scaling rapidly, managing organizational change, or bridging an executive gap, our senior HR leaders step in immediately to run and elevate your HR operations.",
  },
  {
    question: "How does the consultation process work?",
    answer:
      "We start with a tailored discovery session to understand your current challenges and goals. We then provide a clear action plan and work directly alongside your team through implementation.",
  },
  {
    question: "Is Scaliify suitable for international and remote teams?",
    answer:
      "Yes. We support companies across Europe, MENA, and worldwide with distributed workforce setups, global HR tech rollouts, and compliance advisory.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="w-full bg-[#fafafa] py-10 sm:py-16 px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-start">

        {/* Left Column: Heading */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.15]"
          >
            Got Questions?<br className="hidden sm:inline" />{" "}
            We&apos;ve Got<br className="hidden sm:inline" />{" "}
            Answers
          </motion.h2>
        </div>

        {/* Right Column: FAQ Accordion List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col gap-2.5 sm:gap-3"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#f5f6f8] rounded-xl sm:rounded-2xl transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-3.5 sm:py-5 px-4 sm:px-6 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                >
                  <span className="font-semibold text-gray-900 text-xs sm:text-base pr-3 group-hover:text-black transition-colors">
                    {faq.question}
                  </span>
                  <div className="text-gray-600 group-hover:text-black flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0 text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
