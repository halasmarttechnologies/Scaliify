"use client";

import Image from "next/image";
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
} from "lucide-react";

const avatars = {
  catherine: "/avatars/catherine.jpg",
  silvia: "/avatars/silvia.jpg",
  bente: "/avatars/bente.jpg",
  max: "/avatars/max.jpg",
  mo: "/avatars/mo.jpg",
  pim: "/avatars/pim.jpg",
  felix: "/avatars/felix.jpg",
};

export function HeroDashboardPreview() {
  return (
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
                          <div className="w-6 h-6 rounded-full bg-black text-brand-teal flex items-center justify-center font-bold text-xs shadow-xs">
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
                                    ? "bg-[#D6EBE3] text-brand-dark font-bold border-l-2 border-brand-teal"
                                    : "text-gray-600 hover:bg-white hover:text-gray-900"
                                }`}
                              >
                                <ItemIcon className={`w-3.5 h-3.5 ${item.active ? "text-brand-dark" : "text-gray-500"}`} />
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
                          <button className="group relative bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep text-brand-dark text-xs font-extrabold px-3.5 py-1.5 rounded-lg border border-white/70 shadow-[0_2px_12px_rgba(129,216,208,0.5)] hover:shadow-[0_3px_16px_rgba(129,216,208,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden">
                            <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-lg pointer-events-none" />
                            <span className="relative z-10">Give feedback</span>
                          </button>
                        </div>
                      </div>

                      {/* Performance Sub-Navigation Tabs */}
                      <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-[13px] border-b border-gray-200/80 overflow-x-auto [scrollbar-width:none] pb-1">
                        <button className="font-bold text-brand-dark border-b-2 border-brand-teal pb-1.5 -mb-1 px-1 whitespace-nowrap">
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
                          <span className="bg-[#D6EBE3] text-brand-dark text-[10px] font-bold px-1.5 py-0.5 rounded-full">
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
  );
}
