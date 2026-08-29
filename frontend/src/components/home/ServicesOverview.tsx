"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus, ArrowRight, MonitorSmartphone, Target } from "lucide-react";
import { hrTechnologyServices, advisoryServices } from "@/data/services";
import { motion, AnimatePresence } from "framer-motion";
import { TextRoll } from "@/components/ui/TextRoll";

export function ServicesOverview() {
  const [openTech, setOpenTech] = useState<number | null>(null);
  const [openAdvisory, setOpenAdvisory] = useState<number | null>(null);

  const toggleTech = (index: number) => {
    setOpenTech(openTech === index ? null : index);
  };

  const toggleAdvisory = (index: number) => {
    setOpenAdvisory(openAdvisory === index ? null : index);
  };

  return (
    <section id="services" className="w-full bg-transparent relative z-20">
      <div className="w-full bg-[#fafafa] text-gray-900 py-10 sm:py-16 md:py-20 px-3.5 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-8 sm:mb-14 md:mb-20 px-2"
        >
          <div className="bg-brand-teal text-brand-dark font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-4 sm:mb-8 select-none">
            Our Services
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-3 sm:mb-6 flex flex-col items-center gap-1">
            <span>Tailored services.</span>
            <span>Scaliify does it perfectly.</span>
          </h2>
          <p className="text-gray-500 max-w-2xl text-xs sm:text-base md:text-lg lg:text-xl px-2 sm:px-0">
            Scaliify works wherever you need growth. Any platform, device, or market.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full bg-white rounded-[20px] sm:rounded-[32px] md:rounded-[40px] border border-gray-200 shadow-sm p-4 sm:p-8 lg:p-14 mb-8 sm:mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
            
            {/* Column 1: HR Technology */}
            <div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 sm:pb-6 mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-3xl font-semibold tracking-tight">HR Technology</h3>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#05434b] hover:bg-gray-50 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-teal flex items-center justify-center text-[#05434b] hover:brightness-105 transition-colors">
                    <MonitorSmartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col">
                {hrTechnologyServices.map((service, idx) => (
                  <div key={idx} className="border-b border-gray-200 last:border-0 overflow-hidden">
                    <button
                      onClick={() => toggleTech(idx)}
                      className={`w-full flex items-center justify-between py-4 sm:py-5 text-left font-medium transition-colors ${openTech === idx ? 'hidden' : 'text-[#05434b] hover:text-brand-teal'}`}
                    >
                      <span className="text-sm sm:text-lg">{service.title}</span>
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0 ml-2" />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {openTech === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                        >
                          <div 
                            onClick={() => toggleTech(idx)}
                            className="bg-brand-dark text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 my-3 sm:my-4 flex flex-col gap-3 sm:gap-4 shadow-xl cursor-pointer group/card"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-lg sm:text-xl font-bold">{service.title}</h4>
                              <button className="text-gray-400 group-hover/card:text-white transition-colors p-1">
                                <Minus className="w-5 h-5" />
                              </button>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-sm md:text-sm pr-4">
                              {service.description}
                            </p>
                            <Link 
                              href={service.link} 
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 text-brand-teal font-semibold text-xs uppercase tracking-wide hover:text-white transition-colors mt-4 w-fit"
                            >
                              Explore Page <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Advisory */}
            <div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 sm:pb-6 mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-3xl font-semibold tracking-tight">Advisory & Leadership</h3>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#05434b] hover:bg-gray-50 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-teal flex items-center justify-center text-[#05434b] hover:brightness-105 transition-colors">
                    <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col">
                {advisoryServices.map((service, idx) => (
                  <div key={idx} className="border-b border-gray-200 last:border-0 overflow-hidden">
                    <button
                      onClick={() => toggleAdvisory(idx)}
                      className={`w-full flex items-center justify-between py-4 sm:py-5 text-left font-medium transition-colors ${openAdvisory === idx ? 'hidden' : 'text-[#05434b] hover:text-brand-teal'}`}
                    >
                      <span className="text-sm sm:text-lg">{service.title}</span>
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0 ml-2" />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {openAdvisory === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                        >
                          <div 
                            onClick={() => toggleAdvisory(idx)}
                            className="bg-brand-dark text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 my-3 sm:my-4 flex flex-col gap-3 sm:gap-4 shadow-xl cursor-pointer group/card"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-base sm:text-xl font-bold">{service.title}</h4>
                              <button className="text-gray-400 group-hover/card:text-white transition-colors p-1">
                                <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                              </button>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm pr-2 sm:pr-4">
                              {service.description}
                            </p>
                            <Link 
                              href={service.link} 
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 text-brand-teal font-semibold text-xs uppercase tracking-wide hover:text-white transition-colors mt-2 sm:mt-4 w-fit"
                            >
                              Explore Page <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

          {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-brand-dark text-white rounded-3xl lg:rounded-full p-4 sm:p-5 lg:p-3 pl-4 lg:pl-6 flex flex-col lg:flex-row items-center justify-between gap-6 border border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:left mt-2 lg:mt-0">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
              <div className="w-4 h-4 border-2 border-gray-500 border-t-brand-teal rounded-full animate-spin" />
            </div>
            <p className="font-semibold text-sm md:text-base">
              Need reliable HR technology or strategic advisory? You&apos;re in the right place.
            </p>
          </div>
          <Link
            href="/contact"
            className="group relative w-full lg:w-auto flex-shrink-0 bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep text-brand-dark font-extrabold text-xs uppercase tracking-wide px-8 py-4 rounded-2xl lg:rounded-full text-center border border-white/70 shadow-[0_3px_18px_rgba(129,216,208,0.55)] hover:shadow-[0_4px_24px_rgba(129,216,208,0.85)] hover:scale-[1.03] active:scale-[0.98] transition-all overflow-hidden"
          >
            <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
            <span className="relative z-10">BOOK A CALL</span>
          </Link>
        </motion.div>

      </div>
      </div>
    </section>
  );
}
