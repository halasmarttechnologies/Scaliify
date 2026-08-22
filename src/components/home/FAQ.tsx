"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open like screenshot
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // FAQ Cards reveal
      if (listRef.current) {
        const cards = listRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef} 
      id="faq" 
      className="w-full bg-[#fafafa] py-12 md:py-16 px-8 sm:px-16 md:px-24 lg:px-36 xl:px-44"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Column: Heading */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <h2 
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.12]"
          >
            Got Questions?<br />
            We&apos;ve Got<br />
            Answers
          </h2>
        </div>

        {/* Right Column: FAQ Accordion List */}
        <div ref={listRef} className="lg:col-span-7 flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#f5f6f8] rounded-xl sm:rounded-2xl transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                >
                  <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4 group-hover:text-black transition-colors">
                    {faq.question}
                  </span>
                  <div className="text-gray-600 group-hover:text-black flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-5 h-5 stroke-[1.75]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[1.75]" />
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
                      <div className="px-5 sm:px-6 pb-5 pt-0 text-gray-600 text-xs sm:text-sm leading-relaxed">
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
