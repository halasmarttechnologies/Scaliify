"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  FileCheck,
  Target,
  LineChart,
  Clock,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

type ModuleKey = "admin" | "recruiting" | "performance" | "time";

export function ToolFinderAreasCovered() {
  const [activeTab, setActiveTab] = useState<ModuleKey>("admin");
  const [emailInput, setEmailInput] = useState("");
  const [submitted, setSubmitted] = useState(false);


  const scrollToAssessment = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById("tool-finder-tool");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && emailInput.includes("@")) {
      setSubmitted(true);
    }
  };

  const moduleData = {
    admin: {
      title: "HR Admin / Core",
      question: "How does HR Admin & Core centralize team data?",
      answer: "Eliminate scattered spreadsheets with encrypted digital personnel files, automated on/offboarding task checklists for IT and HR, legally compliant e-signatures, dynamic organizational hierarchy charts, and centralized document archiving.",
      chartLabel: "Administrative Work Hours Saved",
      bars: [35, 58, 74, 86, 95],
      metric: "+95% Process Automation",
    },
    recruiting: {
      title: "Recruiting & ATS",
      question: "How does an integrated ATS accelerate hiring?",
      answer: "Automate 1-click job multiposting across 50+ European boards (LinkedIn, StepStone, Indeed), manage structured interview scorecards, schedule candidate interviews in seconds, and maintain GDPR-compliant talent pools.",
      chartLabel: "Time-to-Hire Reduction",
      bars: [20, 45, 65, 80, 92],
      metric: "-48% Time-to-Hire",
    },
    performance: {
      title: "Performance & OKRs",
      question: "How do structured review cycles drive alignment?",
      answer: "Run seamless 360° review cycles (peer, manager, upward, and self), track company & department OKR alignment trees, conduct documented 1:1 check-ins, and benchmark EU pay transparency compliance.",
      chartLabel: "Review Completion & Engagement",
      bars: [40, 60, 75, 88, 98],
      metric: "+92% Review Engagement",
    },
    time: {
      title: "Time & Attendance",
      question: "How is German BAG & EU working time compliance enforced?",
      answer: "Tamper-proof digital clock-in/out timestamps complying with German Federal Labor Court (BAG) rulings, automated vacation & sickness approval workflows, statutory holiday sync, and flexible shift rota planning.",
      chartLabel: "BAG Legal Compliance Rate",
      bars: [50, 70, 85, 95, 100],
      metric: "100% BAG-Compliant",
    },
  };

  const currentModule = moduleData[activeTab];

  return (
    <section className="w-full relative overflow-hidden bg-white">
      {/* 1. Top Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 text-center max-w-4xl mx-auto flex flex-col items-center"
      >
        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-3">
          AREAS COVERED
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold tracking-tight text-gray-900 leading-[1.15] mb-4">
          HR Admin. Recruiting. <br />
          Performance. Time & Attendance.
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-6">
          Scaliify benchmarks all 4 essential pillars of your people technology ecosystem to build a seamlessly integrated, fully compliant European HR stack.
        </p>
        <button
          onClick={scrollToAssessment}
          className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#0C241D] hover:text-[#185343] transition-colors group cursor-pointer"
        >
          <span>Benchmark all 4 areas in 2 minutes</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* 2. Deep Gradient Backdrop with Central Interactive Assistant & Tree Showcase */}
      <div className="w-full bg-gradient-to-b from-white via-[#164E43] to-[#0C241D] pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-[1240px] mx-auto flex flex-col items-center">
          
          {/* Mobile Module Switcher (Visible on < lg screens) */}
          <div className="flex lg:hidden items-center justify-start sm:justify-center gap-2 overflow-x-auto w-full max-w-[460px] pb-4 mb-2 select-none">
            {[
              { key: "admin" as const, label: "01. Core HR" },
              { key: "recruiting" as const, label: "02. Recruiting" },
              { key: "performance" as const, label: "03. Performance" },
              { key: "time" as const, label: "04. Time" },
            ].map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                    active
                      ? "bg-white text-gray-900 shadow-md font-bold"
                      : "bg-white/15 text-white border border-white/20"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Central Interactive Card with Tree Connector Lines */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative w-full max-w-4xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 my-2 sm:my-4"
          >
            
            {/* Main Interactive Card Container */}
            <div className="relative w-full max-w-[460px] bg-white rounded-3xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100 shrink-0">
              
              {/* Floating Top Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-[11px] font-bold shadow-md tracking-wide">
                Try the demo
              </div>

              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-100 mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#0C241D] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-[#81D8D0]" />
                  </div>
                  <span className="font-bold text-gray-900 text-xs sm:text-sm tracking-tight truncate">
                    {currentModule.title} Overview
                  </span>
                </div>
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold shrink-0">
                  ×
                </div>
              </div>

              {/* Question Chat Bubble (Right aligned) */}
              <div className="flex justify-end mb-3">
                <div className="bg-[#0C241D] text-white text-[11px] sm:text-xs font-semibold px-3.5 sm:px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[95%] sm:max-w-[90%] leading-snug">
                  {currentModule.question}
                </div>
              </div>

              {/* Answer Response Bubble (Left aligned) */}
              <div className="bg-[#FAFBFB] border border-gray-100 p-3 sm:p-3.5 rounded-2xl text-[11px] sm:text-xs text-gray-700 leading-relaxed mb-3 sm:mb-4">
                <p>{currentModule.answer}</p>
              </div>

              {/* Chart / Analytics Display */}
              <div className="bg-[#FAFBFB] rounded-2xl p-3.5 sm:p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-[11px] font-bold text-gray-800 uppercase tracking-wider">
                    {currentModule.chartLabel}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-[#0C241D] bg-white border border-gray-200 px-2 py-0.5 rounded-md shrink-0">
                    {currentModule.metric}
                  </span>
                </div>

                {/* 5-Bar Graph */}
                <div className="h-24 sm:h-28 flex items-end justify-between gap-2 sm:gap-3 pt-3 sm:pt-4 px-1 sm:px-2">
                  {currentModule.bars.map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 sm:gap-1.5 h-full justify-end">
                      <div
                        className="w-full bg-[#7C3AED] rounded-t-md transition-all duration-500"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-[9px] sm:text-[10px] font-bold text-gray-400">
                        {2022 + i}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Tree Branch Connectors (Visible on desktop) */}
            <div className="hidden lg:flex flex-col justify-center gap-3.5 relative pl-4">
              
              {/* Circuit SVG line backdrop */}
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-64 pointer-events-none opacity-40">
                <svg className="w-full h-full text-white" fill="none" viewBox="0 0 48 256">
                  <path d="M0 128 C 24 128, 24 24, 48 24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M0 128 C 24 128, 24 76, 48 76" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M0 128 C 24 128, 24 128, 48 128" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M0 128 C 24 128, 24 180, 48 180" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M0 128 C 24 128, 24 232, 48 232" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>

              {[
                { key: "admin" as const, label: "01. Core HR Admin", desc: "Digital files & e-Signatures" },
                { key: "recruiting" as const, label: "02. Recruiting & ATS", desc: "Multiposting & Scorecards" },
                { key: "performance" as const, label: "03. Performance & OKRs", desc: "360° Reviews & Continuous 1:1s" },
                { key: "time" as const, label: "04. Time & Attendance", desc: "BAG Timestamps & Absence Rota" },
                { key: "admin" as const, label: "05. Payroll Integration", desc: "Native DATEV & Global Sync" },
              ].map((item, idx) => {
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(item.key)}
                    className={`border px-5 py-3 rounded-2xl text-left transition-all cursor-pointer select-none shadow-md min-w-[230px] ${
                      isActive
                        ? "bg-[#0C241D] border-2 border-white text-white shadow-xl ring-2 ring-white/20"
                        : "bg-[#0C241D]/85 hover:bg-[#0C241D] border-white/20 text-white"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide block mb-1">
                      {item.label}
                    </span>
                    <span className="text-xs text-gray-200 block font-medium">
                      {item.desc}
                    </span>
                  </button>
                );
              })}

            </div>

          </motion.div>

          {/* 3. 5-Feature Indicators Strip (Deep dive into all covered areas) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-4 w-full max-w-5xl mt-14 mb-14 pt-10 border-t border-white/15"
          >
            
            <div className="flex flex-col items-start text-left">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center mb-2.5">
                <FileCheck className="w-3.5 h-3.5 text-[#81D8D0]" />
              </div>
              <h4 className="text-xs font-bold text-white mb-1">HR Admin / Core</h4>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Centralized employee master files, automated on/offboarding, and compliant e-signatures.
              </p>
            </div>

            <div className="flex flex-col items-start text-left">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center mb-2.5">
                <Target className="w-3.5 h-3.5 text-[#81D8D0]" />
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Recruiting & ATS</h4>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                1-click job multiposting across 50+ channels, structured kits, and talent pools.
              </p>
            </div>

            <div className="flex flex-col items-start text-left">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center mb-2.5">
                <LineChart className="w-3.5 h-3.5 text-[#81D8D0]" />
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Performance & OKRs</h4>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Automated 360° feedback, company-wide OKRs, 1:1 check-ins, and compensation bands.
              </p>
            </div>

            <div className="flex flex-col items-start text-left">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center mb-2.5">
                <Clock className="w-3.5 h-3.5 text-[#81D8D0]" />
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Time & Attendance</h4>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                German BAG-compliant clocking, absence & vacation approvals, and shift planning.
              </p>
            </div>

            <div className="flex flex-col items-start text-left col-span-2 sm:col-span-1">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center mb-2.5">
                <CreditCard className="w-3.5 h-3.5 text-[#81D8D0]" />
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Payroll & DATEV</h4>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Seamless gross salary data exports to your Steuerberater and global EOR partners.
              </p>
            </div>

          </motion.div>

          {/* 4. Bottom Dual Action CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full max-w-5xl">
            
            {/* Left Card: Personalized Consultation (7 cols) */}
            <div className="md:col-span-7 bg-[#C5E8E1] text-[#0C241D] rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-lg">
              <div>
                <span className="inline-block bg-[#F89C6B] text-[#0C241D] px-3.5 py-1 rounded-full text-xs font-bold tracking-wide mb-3">
                  Expert run, 30 minute tour
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0C241D] mb-4">
                  Book your personalised demo
                </h3>
              </div>

              {submitted ? (
                <div className="bg-white/80 p-4 rounded-2xl border border-[#0C241D]/10 flex items-center gap-3 text-sm font-semibold text-[#0C241D]">
                  <CheckCircle2 className="w-5 h-5 text-[#0C241D] shrink-0" />
                  <span>Thank you! Our advisory team will reach out promptly.</span>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row items-center gap-2 bg-white rounded-full p-1.5 shadow-sm border border-[#0C241D]/10 w-full mt-4">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="What's your work email? *"
                    className="w-full bg-transparent px-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto shrink-0 bg-black text-white hover:bg-gray-800 text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-colors cursor-pointer"
                  >
                    Request free demo
                  </button>
                </form>
              )}
            </div>

            {/* Right Card: Interactive Product Tour (5 cols) */}
            <div className="md:col-span-5 bg-[#17463D] text-white rounded-3xl p-7 sm:p-9 flex flex-col justify-between border border-white/10 shadow-lg">
              <div>
                <span className="inline-block bg-white text-[#0C241D] px-3.5 py-1 rounded-full text-xs font-bold tracking-wide mb-3">
                  Takes 2 minutes
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6 leading-snug">
                  Take an interactive <br className="hidden sm:inline" />
                  product tour
                </h3>
              </div>

              <button
                onClick={scrollToAssessment}
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-b from-[#A8F5EE] via-[#81D8D0] to-[#5BC7BC] text-[#0C241D] font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-white/70 shadow-[0_3px_16px_rgba(129,216,208,0.55)] hover:shadow-[0_4px_22px_rgba(129,216,208,0.85)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer self-start w-full sm:w-auto overflow-hidden"
              >
                <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
                <span className="relative z-10">Take a product tour</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
