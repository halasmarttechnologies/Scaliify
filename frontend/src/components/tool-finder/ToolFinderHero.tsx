"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Clock,
  Calendar,
  FileText,
  Building,
  Zap,
  BarChart2,
  Users,
  Briefcase,
  TrendingUp,
  CreditCard,
  ClipboardList,
  Home as HomeIcon,
  Inbox as InboxIcon,
  Bot,
  ChevronRight,
  ChevronDown,
  Eye,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Download,
  RotateCcw,
} from "lucide-react";

import { CompanyLogo } from "@/components/ui/CompanyLogo";

const rotatingCompanies = [
  { name: "LUSH", type: "text", className: "font-black tracking-tight text-white text-xs sm:text-sm" },
  { name: "SoftwareOne", type: "logo", id: "softwareone" },
  { name: "orderbird", type: "orderbird" },
  { name: "Westbridge", type: "logo", id: "westbridge" },
  { name: "statista", type: "text", className: "font-bold tracking-tight text-white text-xs sm:text-sm lowercase" },
  { name: "KRONES AG", type: "logo", id: "krones" },
  { name: "polaroid", type: "text", className: "font-bold tracking-tight text-white text-xs sm:text-sm lowercase" },
  { name: "symrise", type: "logo", id: "symrise" },
  { name: "SPENDESK", type: "spendesk" },
  { name: "TIEMEYER", type: "logo", id: "tiemeyer" },
];

export function ToolFinderHero() {
  const [email, setEmail] = useState("");
  const [companyIndex, setCompanyIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCompanyIndex((prev) => (prev + 1) % rotatingCompanies.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    const elem = document.getElementById("tool-finder-tool");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Clean professional headshot for Catherine Muller
  const profileImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80";

  return (
    <div className="w-full min-h-screen relative bg-[#0C241D] text-white overflow-hidden flex flex-col justify-between">
      {/* Top spacing to account for compact floating navbar */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 flex flex-col items-center">
        
        {/* 1. Main Headline (H1) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white text-center tracking-tight leading-[1.12] max-w-4xl mx-auto">
          Find the Right HR Stack For Your Organization
        </h1>

        {/* 2. Subheading */}
        <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-300 text-center max-w-2xl mx-auto font-normal leading-relaxed">
          Benchmark 20+ top HR platforms against your team size, workflows, and DATEV payroll in under 2 minutes.
        </p>

        {/* 3. Single Clean Input with Tiffany Blue Border Beam & Glossy Tiffany Blue CTA Button */}
        <div className="mt-7 sm:mt-8 w-full max-w-sm sm:max-w-md relative p-[2px] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(129,216,208,0.35)]">
          {/* Animated Tiffany Blue Border Beam Running in Continuous Loop */}
          <div
            className="absolute -inset-[200%] animate-border-beam pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, transparent 0deg 270deg, #81D8D0 320deg, #A8F5EE 345deg, #FFFFFF 360deg)",
            }}
          />

          <form
            onSubmit={scrollToAssessment}
            className="relative z-10 bg-white rounded-[14px] p-1.5 pl-4 sm:pl-5 flex items-center justify-between transition-all"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="What's your work email? *"
              className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm font-medium focus:outline-none pr-2"
              required
            />
            <button
              type="submit"
              className="group relative bg-gradient-to-b from-[#A8F5EE] via-[#81D8D0] to-[#5BC7BC] text-[#0C241D] text-xs sm:text-sm font-extrabold px-4 sm:px-5 py-2.5 rounded-xl border border-white/70 shadow-[0_2px_14px_rgba(129,216,208,0.55)] hover:shadow-[0_4px_22px_rgba(129,216,208,0.85)] hover:scale-[1.03] active:scale-[0.98] transition-all shrink-0 cursor-pointer whitespace-nowrap overflow-hidden"
            >
              {/* Glossy Top Specular Sheen */}
              <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-xl pointer-events-none" />
              <span className="relative z-10">Start free assessment</span>
            </button>
          </form>
        </div>

        {/* 4. Trust Statement with Rotating Animated Logo */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-gray-300 flex-wrap text-center">
          <span>Trusted by</span>
          <span className="font-bold text-[#81D8D0]">1.6M+</span>
          <span>employees at over</span>
          <span className="font-bold text-[#81D8D0]">16,000</span>
          <span>organisations:</span>
          
          <div className="inline-flex items-center min-w-[95px] h-6 overflow-hidden align-middle">
            <AnimatePresence mode="wait">
              <motion.div
                key={companyIndex}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="inline-flex items-center gap-1 font-bold text-white whitespace-nowrap"
              >
                {rotatingCompanies[companyIndex].type === "logo" && (
                  <>
                    <CompanyLogo id={rotatingCompanies[companyIndex].id!} className="w-4 h-4" />
                    <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                      {rotatingCompanies[companyIndex].name}
                    </span>
                  </>
                )}
                {rotatingCompanies[companyIndex].type === "text" && (
                  <span className={rotatingCompanies[companyIndex].className}>
                    {rotatingCompanies[companyIndex].name}
                  </span>
                )}
                {rotatingCompanies[companyIndex].type === "orderbird" && (
                  <span className="font-black text-xs sm:text-sm tracking-tight text-white flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    orderbird
                  </span>
                )}
                {rotatingCompanies[companyIndex].type === "spendesk" && (
                  <span className="font-black text-xs sm:text-sm tracking-tight text-white flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    SPENDESK
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 5. Main Dashboard Mockup Card with Continuous Tiffany Blue Border Beam & Scaled Miniature Preview on Mobile */}
        <div className="mt-12 sm:mt-16 w-full max-w-5xl relative p-[2px] sm:p-[2.5px] rounded-[24px] sm:rounded-[34px] overflow-hidden shadow-[0_0_50px_rgba(129,216,208,0.3)]">
          {/* Animated Tiffany Blue Border Beam Running in Continuous Loop */}
          <div
            className="absolute -inset-[200%] animate-border-beam pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, transparent 0deg 270deg, #81D8D0 320deg, #A8F5EE 345deg, #FFFFFF 360deg)",
            }}
          />

          {/* Frosted Glass Inner Frame */}
          <div className="relative z-10 w-full p-2 sm:p-3 rounded-[24px] sm:rounded-[34px] bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden">
            {/* Auto-scaling container for mobile/tablet to preserve authentic full desktop layout without vertical stretching or cutoff */}
            <div className="w-full flex justify-center items-start overflow-hidden h-[170px] min-[360px]:h-[180px] min-[390px]:h-[200px] min-[430px]:h-[220px] sm:h-[345px] md:h-[420px] lg:h-auto">
              <div className="w-[840px] md:w-[920px] lg:w-full shrink-0 origin-top scale-[0.32] min-[360px]:scale-[0.34] min-[390px]:scale-[0.38] min-[430px]:scale-[0.42] min-[520px]:scale-[0.52] sm:scale-[0.66] md:scale-[0.84] lg:scale-100">
                <div className="w-full bg-[#FAF9FF] rounded-[28px] sm:rounded-[32px] border border-gray-200/80 text-gray-900 overflow-hidden shadow-lg">
                  <div className="flex flex-row bg-white rounded-[28px] sm:rounded-[32px] overflow-hidden">
                    
                    {/* Sidebar */}
                    <div className="w-48 sm:w-52 bg-[#F6F8F7] p-3 sm:p-4 flex flex-col justify-between shrink-0 border-r border-gray-200">
                      <div className="space-y-3.5">
                        {/* Brand */}
                        <div className="flex items-center gap-2 px-1 py-0.5">
                          <div className="w-6 h-6 rounded-full bg-black text-[#81D8D0] flex items-center justify-center font-bold text-xs shadow-xs">
                            S
                          </div>
                          <span className="font-bold text-gray-900 text-xs sm:text-sm tracking-tight">Scaliify Matcher</span>
                        </div>

                        {/* Top Nav Group */}
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-700 hover:bg-white text-xs font-medium transition-colors">
                            <HomeIcon className="w-3.5 h-3.5 text-gray-500" />
                            <span>All Systems</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-700 hover:bg-white text-xs font-medium transition-colors">
                            <InboxIcon className="w-3.5 h-3.5 text-gray-500" />
                            <span>Comparisons</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-700 hover:bg-white text-xs font-medium transition-colors">
                            <Bot className="w-3.5 h-3.5 text-gray-500" />
                            <span>Scoring Engine</span>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 my-1.5" />

                        {/* Secondary Nav Group (Assessment Active) */}
                        <div className="space-y-1 max-h-52 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                          {[
                            { label: "Core HRIS (20+)", icon: Building },
                            { label: "DATEV & Payroll", icon: CreditCard },
                            { label: "ATS & Recruiting", icon: Users },
                            { label: "Time & Attendance", icon: Clock },
                            { label: "Workflow Engines", icon: Zap },
                            { label: "Performance & OKRs", icon: TrendingUp },
                            { label: "Active Match Matrix", icon: Sliders, active: true },
                            { label: "Compliance & Security", icon: ShieldCheck },
                            { label: "Cost Benchmarks", icon: Briefcase },
                            { label: "Evaluation Reports", icon: FileText },
                          ].map((item, idx) => {
                            const ItemIcon = item.icon;
                            return (
                              <div
                                key={idx}
                                className={`group relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap overflow-hidden ${
                                  item.active
                                    ? "bg-gradient-to-b from-[#A8F5EE] via-[#81D8D0] to-[#5BC7BC] text-[#0C241D] font-extrabold border border-white/70 shadow-[0_2px_12px_rgba(129,216,208,0.55)]"
                                    : "text-gray-600 hover:bg-white hover:text-gray-900"
                                }`}
                              >
                                {item.active && (
                                  <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-lg pointer-events-none" />
                                )}
                                <ItemIcon className={`relative z-10 w-3.5 h-3.5 ${item.active ? "text-[#0C241D]" : "text-gray-500"}`} />
                                <span className="relative z-10">{item.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* User Profile with Avatar at Bottom of Sidebar */}
                      <div className="pt-2.5 border-t border-gray-200 flex items-center gap-2 px-1">
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 shrink-0">
                          <Image
                            src={profileImage}
                            alt="Catherine Muller"
                            width={24}
                            height={24}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[11px] font-bold text-gray-800 truncate whitespace-nowrap">Catherine Muller</span>
                      </div>
                    </div>

                    {/* Main Workspace Area (Assessment Visuals View) */}
                    <div className="flex-1 p-3.5 sm:p-5 flex flex-col space-y-3 bg-white min-w-0">
                      
                      {/* Header: Title + Action Buttons */}
                      <div className="flex flex-row items-center justify-between gap-2.5 pb-1">
                        <div>
                          <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight whitespace-nowrap">
                            HR Tool Assessment Matrix
                          </h2>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button 
                            onClick={() => {
                              const elem = document.getElementById("tool-finder-tool");
                              if (elem) elem.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="bg-white hover:bg-gray-50 text-black text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 transition-colors shadow-2xs flex items-center gap-1.5 whitespace-nowrap"
                          >
                            <RotateCcw className="w-3 h-3 text-gray-500" />
                            <span>Recalculate Fit</span>
                          </button>
                          <button 
                            onClick={() => {
                              const elem = document.getElementById("tool-finder-tool");
                              if (elem) elem.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="group relative bg-gradient-to-b from-[#A8F5EE] via-[#81D8D0] to-[#5BC7BC] text-[#0C241D] text-xs font-extrabold px-3.5 py-1.5 rounded-lg border border-white/70 shadow-[0_2px_12px_rgba(129,216,208,0.5)] hover:shadow-[0_3px_16px_rgba(129,216,208,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden flex items-center gap-1.5 whitespace-nowrap"
                          >
                            <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-lg pointer-events-none" />
                            <Download className="relative z-10 w-3 h-3" />
                            <span className="relative z-10">Export Match PDF</span>
                          </button>
                        </div>
                      </div>

                      {/* Performance Sub-Navigation Tabs */}
                      <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-[13px] border-b border-gray-200 overflow-x-auto [scrollbar-width:none] pb-1">
                        <button className="font-bold text-[#0C241D] border-b-2 border-[#81D8D0] pb-1.5 -mb-1 px-1 whitespace-nowrap">
                          Top Matched Platforms (3)
                        </button>
                        <button className="text-gray-500 hover:text-gray-900 pb-1.5 px-1 whitespace-nowrap font-medium transition-colors">
                          Feature Benchmark
                        </button>
                        <button className="text-gray-500 hover:text-gray-900 pb-1.5 px-1 whitespace-nowrap font-medium transition-colors">
                          Pricing & TCO
                        </button>
                        <button className="text-gray-500 hover:text-gray-900 pb-1.5 px-1 flex items-center gap-1.5 whitespace-nowrap font-medium transition-colors">
                          <span>Integration Health</span>
                          <span className="bg-[#D6EBE3] text-[#0C241D] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            100%
                          </span>
                        </button>
                      </div>

                      {/* Filter Controls Row */}
                      <div className="flex items-center justify-between gap-2 text-xs text-gray-600 flex-wrap">
                        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                          <div className="flex items-center gap-1 font-semibold text-gray-900 cursor-pointer hover:text-black whitespace-nowrap">
                            <span>Size: 50-250 empl.</span>
                            <ChevronDown className="w-3 h-3 text-gray-500" />
                          </div>
                          <div className="flex items-center gap-1 font-medium text-gray-600 cursor-pointer hover:text-black whitespace-nowrap">
                            <span>Region: DACH & EU</span>
                            <ChevronDown className="w-3 h-3 text-gray-500" />
                          </div>
                          <div className="flex items-center gap-1 font-medium text-gray-600 cursor-pointer hover:text-black whitespace-nowrap">
                            <span>Payroll: DATEV</span>
                            <ChevronDown className="w-3 h-3 text-gray-500" />
                          </div>
                          <div className="flex items-center gap-1 font-medium text-gray-600 cursor-pointer hover:text-black whitespace-nowrap">
                            <span>Budget: Standard</span>
                            <ChevronDown className="w-3 h-3 text-gray-500" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Search className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Two-Column Grid Content (Exact Desktop Layout Preserved & Scaled) */}
                      <div className="grid grid-cols-12 gap-3 pt-0.5">
                        
                        {/* Left Column: Top Matched Platforms Assessment */}
                        <div className="col-span-8 space-y-2.5 min-w-0">
                          
                          {/* Card 1: #1 Matched System (Personio) */}
                          <div className="bg-[#F8FAF9] rounded-xl p-3.5 sm:p-4 border border-gray-200">
                            <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-gray-200">
                              <div className="flex items-start gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-black text-[#81D8D0] font-bold text-xs flex items-center justify-center shrink-0">
                                  #1
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 truncate whitespace-nowrap">
                                    Personio (All-in-One Core HRIS)
                                  </h4>
                                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5 whitespace-nowrap">
                                    <span className="flex items-center gap-1 shrink-0">
                                      <Building className="w-2.5 h-2.5 text-gray-400" /> 20-500 team
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1 shrink-0">
                                      <CreditCard className="w-2.5 h-2.5 text-gray-400" /> DATEV Native Sync
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <span className="group relative bg-gradient-to-b from-[#A8F5EE] via-[#81D8D0] to-[#5BC7BC] text-[#0C241D] font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-white/70 shadow-[0_2px_10px_rgba(129,216,208,0.5)] shrink-0 overflow-hidden whitespace-nowrap">
                                <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
                                <span className="relative z-10">96% Compatibility Match</span>
                              </span>
                            </div>

                            {/* Criteria Score Breakdown Rows */}
                            <div className="divide-y divide-gray-100 text-xs mt-1.5">
                              {[
                                { module: "Core HR & Employee Records", fit: "100% Match", note: "DACH Labor Compliant", color: "bg-emerald-100 text-emerald-900" },
                                { module: "German Payroll / DATEV API", fit: "98% Match", note: "Native Monthly Export", color: "bg-blue-100 text-blue-900" },
                                { module: "Time Off & Shift Attendance", fit: "95% Match", note: "Self-Service Approvals", color: "bg-purple-100 text-purple-900" },
                                { module: "Applicant Tracking & Recruiting", fit: "92% Match", note: "Multi-Job Board Sync", color: "bg-amber-100 text-amber-900" },
                              ].map((item, idx) => (
                                <div key={idx} className="py-1.5 flex items-center justify-between hover:bg-white px-1 rounded transition-colors gap-2">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <div className={`w-4 h-4 rounded-full ${item.color} font-bold text-[8px] flex items-center justify-center shrink-0`}>
                                      ✓
                                    </div>
                                    <span className="font-semibold text-gray-800 text-[11px] truncate whitespace-nowrap">{item.module}</span>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-[10px] text-gray-400 hidden sm:inline whitespace-nowrap">{item.note}</span>
                                    <span className="text-[10px] font-bold text-[#0C241D] bg-[#D6EBE3] px-1.5 py-0.5 rounded whitespace-nowrap">
                                      {item.fit}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Card 2: Runner-up Match (Deel) */}
                          <div className="bg-[#F8FAF9] rounded-xl p-3 sm:p-3.5 border border-gray-200">
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-6 h-6 rounded-lg bg-gray-200 text-gray-900 font-bold text-[10px] flex items-center justify-center shrink-0">
                                  #2
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-xs font-bold text-gray-900 truncate whitespace-nowrap">Deel (Global Payroll & Contractor Mgmt)</h4>
                                  <div className="flex items-center gap-2 text-[9px] text-gray-500 whitespace-nowrap">
                                    <span>91% Fit</span>
                                    <span>•</span>
                                    <span>International hiring</span>
                                  </div>
                                </div>
                              </div>
                              <span className="text-[10px] font-bold text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200 shrink-0 whitespace-nowrap">
                                Runner Up
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-700 leading-relaxed pl-8">
                              Strongest choice if your organization plans to scale contractors or entities across 150+ countries alongside DACH operations in 2026.
                            </p>
                          </div>

                        </div>

                        {/* Right Column: Organization Profile, Projected ROI, Connectors */}
                        <div className="col-span-4 space-y-2.5 min-w-0">
                          
                          {/* Organization Assessment Card */}
                          <div className="bg-[#F8FAF9] rounded-xl p-3 border border-gray-200 flex items-center gap-2.5">
                            <div className="w-11 h-11 rounded-xl overflow-hidden border border-gray-200 shrink-0 shadow-2xs">
                              <Image
                                src={profileImage}
                                alt="Catherine Muller Profile"
                                width={44}
                                height={44}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="truncate">
                              <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">Catherine Muller</h4>
                              <p className="text-[9px] text-gray-500 truncate mt-0.5 flex items-center gap-1">
                                <Building className="w-2.5 h-2.5 text-gray-400" />
                                <span>140 Team • DACH</span>
                              </p>
                              <p className="text-[9px] text-gray-500 truncate flex items-center gap-1 mt-0.5">
                                <Clock className="w-2.5 h-2.5 text-gray-400" />
                                <span>Target: Q3 2026 Go-Live</span>
                              </p>
                            </div>
                          </div>

                          {/* Projected ROI & Automation Score */}
                          <div className="bg-[#F8FAF9] rounded-xl p-3 border border-gray-200">
                            <h4 className="text-[11px] font-bold text-gray-900 mb-1.5">Projected Stack Efficiency</h4>
                            <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-100 text-center mb-2">
                              <span className="text-base font-black text-emerald-900 tracking-tight block">
                                -68% Admin Hours
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] text-gray-600">
                              <div className="w-3.5 h-3.5 rounded-full bg-[#81D8D0] text-[#0C241D] font-bold text-[7px] flex items-center justify-center shrink-0">
                                ✓
                              </div>
                              <span className="truncate">~€32,400 saved annually in admin overhead</span>
                            </div>
                          </div>

                          {/* Verified Connectors Card */}
                          <div className="bg-[#F8FAF9] rounded-xl p-3 border border-gray-200">
                            <div className="flex items-center justify-between text-[11px] font-bold text-gray-900 mb-2">
                              <span>Verified Integrations</span>
                              <span className="text-[9px] text-gray-500 font-normal flex items-center gap-0.5 cursor-pointer">
                                Active <ChevronDown className="w-2.5 h-2.5" />
                              </span>
                            </div>

                            <div className="space-y-1.5 text-xs">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-900 font-bold text-[8px] flex items-center justify-center shrink-0">
                                  D
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold text-gray-800">DATEV Lodas</p>
                                  <p className="text-[8px] text-gray-400">Direct Native API</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[8px] flex items-center justify-center shrink-0">
                                  S
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold text-gray-800">Slack & Google SSO</p>
                                  <p className="text-[8px] text-gray-400">Automated Bot</p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-2 pt-1.5 border-t border-gray-200 text-left">
                              <span 
                                onClick={() => {
                                  const elem = document.getElementById("tool-finder-tool");
                                  if (elem) elem.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="text-[9px] font-bold text-gray-600 hover:text-black cursor-pointer flex items-center gap-1"
                              >
                                See all 45+ connectors <ChevronRight className="w-2.5 h-2.5" />
                              </span>
                            </div>
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Bottom Trusted Companies Metrics Bar */}
        <div className="mt-14 sm:mt-16 w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 pt-8 border-t border-white/10 text-center">
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <CompanyLogo id="softwareone" className="w-5 h-5" />
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">SoftwareOne</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">1000+ employees</p>
            <p className="text-[11px] text-[#81D8D0]">80% faster onboarding</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <CompanyLogo id="westbridge" className="w-5 h-5" />
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">Westbridge</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">450+ employees</p>
            <p className="text-[11px] text-[#81D8D0]">Zero payroll errors</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <CompanyLogo id="krones" className="w-5 h-5" />
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">KRONES AG</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">750+ employees</p>
            <p className="text-[11px] text-[#81D8D0]">70% admin cut</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <CompanyLogo id="symrise" className="w-5 h-5" />
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">symrise</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">DACH & Global</p>
            <p className="text-[11px] text-[#81D8D0]">Modern HRIS stack</p>
          </div>

          <div className="flex flex-col items-center col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-1">
              <CompanyLogo id="tiemeyer" className="w-5 h-5" />
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">TIEMEYER</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">200+ employees</p>
            <p className="text-[11px] text-[#81D8D0]">Interim leadership</p>
          </div>

        </div>

      </div>
    </div>
  );
}
