"use client";

import { useState, useEffect } from "react";
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
  ThumbsUp,
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

const avatars = {
  catherine: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
  silvia: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
  bente: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
  max: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
  mo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
  pim: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80",
  felix: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
};

export function Hero() {
  const [email, setEmail] = useState("");
  const [companyIndex, setCompanyIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCompanyIndex((prev) => (prev + 1) % rotatingCompanies.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen relative bg-[#0C241D] text-white overflow-hidden flex flex-col justify-between">
      {/* Top spacing to account for compact floating navbar */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 flex flex-col items-center">
        
        {/* 1. Main Headline (H1) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white text-center tracking-tight leading-[1.12] max-w-4xl mx-auto">
          One Stop HR for Modern Businesses
        </h1>

        {/* 2. Subheading */}
        <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-300 text-center max-w-2xl mx-auto font-normal leading-relaxed">
          Strategic HR & Automation for Growing Businesses
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
            onSubmit={(e) => {
              e.preventDefault();
              if (email) {
                window.location.href = `/tool-finder?email=${encodeURIComponent(email)}`;
              }
            }}
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
              <span className="relative z-10">Request free demo</span>
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
          <div className="relative z-10 w-full p-1.5 sm:p-3 rounded-[22px] sm:rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden">
            {/* Auto-scaling container for mobile/tablet to preserve authentic full desktop layout without vertical stretching */}
            <div className="w-full flex justify-center items-start overflow-hidden h-[185px] min-[375px]:h-[200px] min-[420px]:h-[235px] sm:h-[350px] md:h-[420px] lg:h-auto">
              <div className="w-[860px] md:w-[940px] lg:w-full shrink-0 origin-top scale-[0.35] min-[375px]:scale-[0.38] min-[420px]:scale-[0.44] min-[520px]:scale-[0.56] sm:scale-[0.68] md:scale-[0.85] lg:scale-100">
                <div className="w-full bg-[#FAF9FF] rounded-xl sm:rounded-2xl border border-gray-200/80 text-gray-900 overflow-hidden shadow-lg">
                  <div className="flex flex-row bg-white">
                    
                    {/* Sidebar */}
                    <div className="w-48 sm:w-52 bg-[#F6F8F7] p-3 sm:p-4 flex flex-col justify-between shrink-0 border-r border-gray-200">
                      <div className="space-y-3.5">
                        {/* Brand */}
                        <div className="flex items-center gap-2 px-1 py-0.5">
                          <div className="w-6 h-6 rounded-full bg-black text-[#81D8D0] flex items-center justify-center font-bold text-xs shadow-xs">
                            S
                          </div>
                          <span className="font-bold text-gray-900 text-xs sm:text-sm tracking-tight">Scaliify</span>
                        </div>

                        {/* Top Nav Group */}
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-700 hover:bg-white text-xs font-medium transition-colors">
                            <HomeIcon className="w-3.5 h-3.5 text-gray-500" />
                            <span>Overview</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-700 hover:bg-white text-xs font-medium transition-colors">
                            <InboxIcon className="w-3.5 h-3.5 text-gray-500" />
                            <span>Deliverables</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-700 hover:bg-white text-xs font-medium transition-colors">
                            <Bot className="w-3.5 h-3.5 text-gray-500" />
                            <span>AI Workflows</span>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 my-1.5" />

                        {/* Secondary Nav Group (HR Transformation Active) */}
                        <div className="space-y-0.5 max-h-52 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                          {[
                            { label: "Organization", icon: Building },
                            { label: "Automations", icon: Zap },
                            { label: "Time off & Attendance", icon: Clock },
                            { label: "Analytics", icon: BarChart2 },
                            { label: "Documents", icon: FileText },
                            { label: "Payroll", icon: CreditCard },
                            { label: "Planning", icon: Calendar },
                            { label: "Recruiting", icon: Users },
                            { label: "Performance", icon: TrendingUp, active: true },
                            { label: "Compensation", icon: Briefcase },
                            { label: "Surveys", icon: ClipboardList },
                          ].map((item, idx) => {
                            const ItemIcon = item.icon;
                            return (
                              <div
                                key={idx}
                                className={`flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                                  item.active
                                    ? "bg-[#D6EBE3] text-[#0C241D] font-bold border-l-2 border-[#81D8D0]"
                                    : "text-gray-600 hover:bg-white hover:text-gray-900"
                                }`}
                              >
                                <ItemIcon className={`w-3.5 h-3.5 ${item.active ? "text-[#0C241D]" : "text-gray-500"}`} />
                                <span>{item.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* User Profile with Avatar at Bottom of Sidebar */}
                      <div className="pt-2.5 border-t border-gray-200 flex items-center gap-2 px-1">
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 shrink-0">
                          <Image
                            src={avatars.catherine}
                            alt="Catherine Muller"
                            width={24}
                            height={24}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[11px] font-bold text-gray-800 truncate">Catherine Muller</span>
                      </div>
                    </div>

                    {/* Main Workspace Area (Exact Clean Layout from Screenshot) */}
                    <div className="flex-1 p-3.5 sm:p-5 flex flex-col space-y-3 bg-[#FAF9FD]">
                      
                      {/* Header: Title + Action Buttons */}
                      <div className="flex flex-row items-center justify-between gap-2.5 pb-1">
                        <div>
                          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                            Performance
                          </h2>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 transition-colors shadow-2xs">
                            Request feedback
                          </button>
                          <button className="group relative bg-gradient-to-b from-[#A8F5EE] via-[#81D8D0] to-[#5BC7BC] text-[#0C241D] text-xs font-extrabold px-3.5 py-1.5 rounded-lg border border-white/70 shadow-[0_2px_12px_rgba(129,216,208,0.5)] hover:shadow-[0_3px_16px_rgba(129,216,208,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden">
                            <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-lg pointer-events-none" />
                            <span className="relative z-10">Give feedback</span>
                          </button>
                        </div>
                      </div>

                      {/* Performance Sub-Navigation Tabs */}
                      <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-[13px] border-b border-gray-200/80 overflow-x-auto [scrollbar-width:none] pb-1">
                        <button className="font-bold text-[#0C241D] border-b-2 border-[#81D8D0] pb-1.5 -mb-1 px-1 whitespace-nowrap">
                          Your Performance
                        </button>
                        <button className="text-gray-500 hover:text-gray-900 pb-1.5 px-1 whitespace-nowrap font-medium transition-colors">
                          Team Performance
                        </button>
                        <button className="text-gray-500 hover:text-gray-900 pb-1.5 px-1 whitespace-nowrap font-medium transition-colors">
                          Review Cycles
                        </button>
                        <button className="text-gray-500 hover:text-gray-900 pb-1.5 px-1 flex items-center gap-1.5 whitespace-nowrap font-medium transition-colors">
                          <span>Tasks</span>
                          <span className="bg-[#D6EBE3] text-[#0C241D] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            8
                          </span>
                        </button>
                      </div>

                      {/* Filter Controls Row */}
                      <div className="flex items-center justify-between gap-2 text-xs text-gray-600 flex-wrap">
                        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                          <div className="flex items-center gap-1 font-bold text-gray-900 cursor-pointer hover:text-black">
                            <span>All content</span>
                            <ChevronDown className="w-3 h-3 text-gray-500" />
                          </div>
                          <div className="flex items-center gap-1 font-medium text-gray-700 cursor-pointer hover:text-black">
                            <span>You received</span>
                            <ChevronDown className="w-3 h-3 text-gray-500" />
                          </div>
                          <div className="flex items-center gap-1 font-medium text-gray-700 cursor-pointer hover:text-black">
                            <span>From anyone</span>
                            <ChevronDown className="w-3 h-3 text-gray-500" />
                          </div>
                          <div className="flex items-center gap-1 font-medium text-gray-700 cursor-pointer hover:text-black">
                            <span>All time</span>
                            <ChevronDown className="w-3 h-3 text-gray-500" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Search className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Two-Column Grid Content (Exact Desktop Layout Preserved & Scaled) */}
                      <div className="grid grid-cols-12 gap-3 pt-0.5">
                        
                        {/* Left Column: Reviews & Continuous Feedback Cards */}
                        <div className="col-span-8 space-y-2.5 min-w-0">
                          
                          {/* Card 1: Review Cycle Card */}
                          <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-100/90 shadow-xs">
                            <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-gray-100">
                              <div className="flex items-start gap-2.5">
                                <div className="relative">
                                  <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0">
                                    <Image
                                      src={avatars.catherine}
                                      alt="Review Cycle"
                                      width={32}
                                      height={32}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="absolute -bottom-0.5 -right-1 bg-rose-400 text-white font-bold text-[8px] px-1 rounded-full border border-white">
                                    +5
                                  </span>
                                </div>
                                <div>
                                  <h4 className="text-xs sm:text-[13px] font-bold text-gray-900">
                                    Reviews in Company Cycle H1 2026
                                  </h4>
                                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-2.5 h-2.5 text-gray-400" /> 1 Jun, 2026
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                      <Eye className="w-2.5 h-2.5 text-gray-400" /> You and supervisors
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="bg-[#E8F8F0] text-[#0E7A4A] font-semibold text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full shrink-0">
                                  Meets expectations
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                              </div>
                            </div>

                            {/* Reviewer Breakdown Rows */}
                            <div className="divide-y divide-gray-50 text-xs mt-1.5">
                              {[
                                { name: "Silvia Lopez", role: "Manager review", avatar: avatars.silvia },
                                { name: "Bente de Jong", role: "Peer review", avatar: avatars.bente },
                                { name: "Max Auer", role: "Peer review", avatar: avatars.max },
                                { name: "Catherine Muller", role: "Self review", avatar: avatars.catherine },
                              ].map((rev, idx) => (
                                <div key={idx} className="py-1.5 flex items-center justify-between hover:bg-gray-50/60 px-1 rounded-lg transition-colors">
                                  <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200 shrink-0">
                                      <Image
                                        src={rev.avatar}
                                        alt={rev.name}
                                        width={20}
                                        height={20}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <span className="font-bold text-gray-900 text-[11px]">{rev.name}</span>
                                  </div>
                                  <span className="text-[10px] text-gray-500 flex items-center gap-1 cursor-pointer hover:text-black font-medium">
                                    {rev.role} <ChevronRight className="w-2.5 h-2.5 text-gray-400" />
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Card 2: Continuous Feedback from Pim Martens */}
                          <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-gray-100/90 shadow-xs">
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200 shrink-0">
                                  <Image
                                    src={avatars.pim}
                                    alt="Pim Martens"
                                    width={28}
                                    height={28}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-gray-900">
                                    Continuous feedback from Pim Martens
                                  </h4>
                                  <div className="flex items-center gap-2 text-[9px] text-gray-500 mt-0.5">
                                    <span>1 Apr, 2026</span>
                                    <span>•</span>
                                    <span>You and supervisors</span>
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                            </div>
                            <p className="text-[11px] text-gray-700 leading-relaxed pl-9">
                              I&apos;m constantly inspired by your impact. The recent idea for our new customer milestone framework is a game-changer and helps us tackle challenges in such an innovative way.
                            </p>
                          </div>

                        </div>

                        {/* Right Column: Profile Card, Last Rating, Feedback Requests */}
                        <div className="col-span-4 space-y-2.5 min-w-0">
                          
                          {/* Card 1: User Profile Card */}
                          <div className="bg-white rounded-2xl p-3 border border-gray-100/90 shadow-xs flex items-center gap-2.5">
                            <div className="w-11 h-11 rounded-xl overflow-hidden border border-gray-200 shrink-0 bg-amber-50 shadow-2xs">
                              <Image
                                src={avatars.catherine}
                                alt="Catherine Muller"
                                width={44}
                                height={44}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="truncate">
                              <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">Catherine Muller</h4>
                              <p className="text-[9px] text-gray-500 truncate mt-0.5 flex items-center gap-1 font-medium">
                                <Calendar className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                                <span>Started on 01/01/2023</span>
                              </p>
                              <p className="text-[9px] text-gray-500 truncate mt-0.5 flex items-center gap-1 font-medium">
                                <Briefcase className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                                <span>Director of Marketing</span>
                              </p>
                            </div>
                          </div>

                          {/* Card 2: Last Rating Card (With Highlight Green Banner) */}
                          <div className="bg-white rounded-2xl p-3 border border-gray-100/90 shadow-xs">
                            <h4 className="text-[11px] font-bold text-gray-900 mb-1.5">Last rating</h4>
                            <div className="bg-[#F0FDF4] rounded-xl py-3 px-2.5 border border-emerald-100/70 text-center mb-2">
                              <span className="text-lg sm:text-xl font-bold text-[#065F46] tracking-tight block">
                                Meets expectations
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[9px] text-gray-700">
                              <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-200 shrink-0">
                                <Image
                                  src={avatars.silvia}
                                  alt="Silvia Lopez"
                                  width={16}
                                  height={16}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="truncate">
                                <span className="font-bold text-gray-900 block leading-tight">Manager review from Silvia Lopez</span>
                              </div>
                            </div>
                          </div>

                          {/* Card 3: Feedback Requests Card */}
                          <div className="bg-white rounded-2xl p-3 border border-gray-100/90 shadow-xs">
                            <div className="flex items-center justify-between text-[11px] font-bold text-gray-900 mb-2">
                              <span>Feedback requests</span>
                              <span className="text-[9px] text-gray-500 font-normal flex items-center gap-0.5 cursor-pointer">
                                For you <ChevronDown className="w-2.5 h-2.5" />
                              </span>
                            </div>

                            <div className="divide-y divide-gray-50 text-xs">
                              <div className="py-1.5 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200 shrink-0">
                                  <Image
                                    src={avatars.max}
                                    alt="Max Auer"
                                    width={20}
                                    height={20}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold text-gray-900 leading-tight">About Max Auer</p>
                                  <p className="text-[8px] text-gray-400 leading-tight mt-0.5">4 Jan, 2026</p>
                                </div>
                              </div>

                              <div className="py-1.5 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200 shrink-0">
                                  <Image
                                    src={avatars.bente}
                                    alt="Bente de Jong"
                                    width={20}
                                    height={20}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold text-gray-900 leading-tight">About Bente de Jong</p>
                                  <p className="text-[8px] text-gray-400 leading-tight mt-0.5">23 Feb, 2026</p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-1.5 pt-1.5 border-t border-gray-100 flex items-center justify-between text-left">
                              <span className="text-[10px] font-bold text-gray-600 hover:text-black cursor-pointer flex items-center gap-1">
                                See all <ChevronRight className="w-2.5 h-2.5 text-gray-400" />
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
