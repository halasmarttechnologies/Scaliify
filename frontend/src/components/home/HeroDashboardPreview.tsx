"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Folder,
  Sliders,
  Sparkles,
  Database,
  ArrowRight,
  Zap,
  ShieldCheck,
  Building,
  CreditCard,
  Users,
  Check,
  Layers,
  FileCheck,
} from "lucide-react";

export const HeroDashboardPreview = React.memo(function HeroDashboardPreview() {
  const t = useTranslations("heroDashboard");
  return (
    <div className="mt-12 sm:mt-16 w-full max-w-5xl relative p-[2px] sm:p-[2.5px] rounded-[24px] sm:rounded-[34px] overflow-hidden shadow-2xl">
      {/* Animated Tiffany Blue Border Beam Running in Continuous Loop */}
      <div
        className="absolute -inset-[200%] animate-border-beam pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg 270deg, #81D8D0 320deg, #A8F5EE 345deg, #FFFFFF 360deg)",
        }}
      />

      {/* Frosted Glass Outer Container */}
      <div className="relative z-10 w-full p-2 sm:p-3 rounded-[24px] sm:rounded-[34px] bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden">
        
        {/* Auto-scaling container for mobile/tablet to preserve authentic full desktop layout without vertical stretching or cutoff */}
        <div className="w-full flex justify-center items-start overflow-hidden h-[180px] min-[360px]:h-[195px] min-[390px]:h-[210px] min-[430px]:h-[235px] sm:h-[355px] md:h-[430px] lg:h-auto">
          <div className="w-[840px] md:w-[920px] lg:w-full shrink-0 origin-top scale-[0.32] min-[360px]:scale-[0.35] min-[390px]:scale-[0.39] min-[430px]:scale-[0.43] min-[520px]:scale-[0.52] sm:scale-[0.66] md:scale-[0.84] lg:scale-100">
            
            {/* Main Canvas with Dot Grid Background */}
            <div className="w-full bg-[#FAFBFC] rounded-[22px] sm:rounded-[30px] border border-gray-200/90 text-gray-900 overflow-hidden relative">
              
              {/* Dot Grid Background Pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage: "radial-gradient(#94a3b8 1.1px, transparent 1.1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Top Canvas Bar */}
              <div className="flex items-center justify-center px-4 sm:px-6 py-3 border-b border-gray-200/80 bg-white/90 backdrop-blur-sm relative z-20">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 text-center">
                  {t("canvasTitle")}
                </h3>
              </div>

              {/* Canvas Interactive Node Graph Body */}
              <div className="relative p-4 sm:p-6 lg:p-8 overflow-x-auto min-w-[780px] lg:min-w-0">
                
                {/* Scoped CSS Animation for Continuously Running Wireframes */}
                <style>{`
                  @keyframes wireRunning {
                    from {
                      stroke-dashoffset: 24;
                    }
                    to {
                      stroke-dashoffset: 0;
                    }
                  }
                  .wire-running {
                    stroke-dasharray: 6 6;
                    animation: wireRunning 1.2s linear infinite;
                  }
                  .wire-running-fast {
                    stroke-dasharray: 6 6;
                    animation: wireRunning 0.9s linear infinite;
                  }
                `}</style>

                {/* SVG Connector Bezier Curves Linking All Sequential Steps */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Curve 1: Node 1 (Client Request) -> Node 3 (Selection & Strategy) */}
                  <path d="M 270 120 C 330 120, 330 120, 390 120" fill="none" stroke="#E5E7EB" strokeWidth="2" />
                  <path
                    d="M 270 120 C 330 120, 330 120, 390 120"
                    fill="none"
                    stroke="#00D2C4"
                    strokeWidth="2.5"
                    className="wire-running"
                  />

                  {/* Curve 2: Node 1 (Client Request) -> Node 4 (Implementation & Integrations) */}
                  <path d="M 270 120 C 340 120, 320 290, 390 290" fill="none" stroke="#E5E7EB" strokeWidth="2" />
                  <path
                    d="M 270 120 C 340 120, 320 290, 390 290"
                    fill="none"
                    stroke="#00D2C4"
                    strokeWidth="2.5"
                    className="wire-running"
                  />

                  {/* Curve 3: Node 2 (HR IT Audit) -> Node 4 (Implementation & Integrations) */}
                  <path d="M 270 290 C 330 290, 330 290, 390 290" fill="none" stroke="#E5E7EB" strokeWidth="2" />
                  <path
                    d="M 270 290 C 330 290, 330 290, 390 290"
                    fill="none"
                    stroke="#00D2C4"
                    strokeWidth="2.5"
                    className="wire-running-fast"
                  />

                  {/* Curve 4: Node 3 (Selection & Strategy) -> Node 5 (Single Source of Truth) */}
                  <path d="M 640 120 C 690 120, 680 120, 730 120" fill="none" stroke="#E5E7EB" strokeWidth="2" />
                  <path
                    d="M 640 120 C 690 120, 680 120, 730 120"
                    fill="none"
                    stroke="#00D2C4"
                    strokeWidth="2.5"
                    className="wire-running"
                  />

                  {/* Curve 5: Node 4 (Implementation & Integrations) -> Node 6 (Impact & ROI) */}
                  <path d="M 640 290 C 690 290, 680 290, 730 290" fill="none" stroke="#E5E7EB" strokeWidth="2" />
                  <path
                    d="M 640 290 C 690 290, 680 290, 730 290"
                    fill="none"
                    stroke="#00D2C4"
                    strokeWidth="2.5"
                    className="wire-running-fast"
                  />

                  {/* Curve 6: Node 3 -> Node 6 Branching */}
                  <path d="M 640 120 C 690 120, 670 290, 730 290" fill="none" stroke="#E5E7EB" strokeWidth="1.5" />
                  <path
                    d="M 640 120 C 690 120, 670 290, 730 290"
                    fill="none"
                    stroke="#76D8C8"
                    strokeWidth="2"
                    className="wire-running"
                  />
                </svg>

                {/* 3-Column Node Canvas Grid */}
                <div className="grid grid-cols-12 gap-6 sm:gap-8 items-start relative z-10">

                  {/* ======================================================== */}
                  {/* COLUMN 1: CLIENT ENTRY & DISCOVERY (Left)                */}
                  {/* ======================================================== */}
                  <div className="col-span-4 space-y-6">

                    {/* Node 1: Client Enters / Project Kickoff Card */}
                    <div className="relative bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 group">
                      {/* Top Cyan Tab Header */}
                      <div className="absolute -top-3.5 left-4 bg-[#00D2C4] text-[#05434B] text-[10.5px] font-black uppercase tracking-wider px-3 py-0.5 rounded-t-lg rounded-b-xs flex items-center gap-1.5 shadow-2xs">
                        <Folder className="w-3 h-3 fill-current" />
                        <span>{t("clientRequest")}</span>
                      </div>

                      {/* Clean Right Node Connector Point */}
                      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00D2C4] border-2 border-white shadow-2xs" />

                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0">
                              <Image
                                src="/avatars/catherine.jpg"
                                alt="Client Lead"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-950 leading-tight">{t("scaleupPeopleLead")}</p>
                              <p className="text-[10px] text-gray-500">{t("employeeInfo")}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60 shrink-0">
                            {t("newProject")}
                          </span>
                        </div>

                        {/* Central Box */}
                        <div className="bg-[#f4faf8] rounded-xl p-3 border border-[#76D8C8]/40 mb-3 text-center">
                          <div className="w-9 h-9 mx-auto rounded-xl bg-[#5BC7BC] text-[#05434B] flex items-center justify-center mb-1.5 shadow-2xs">
                            <Layers className="w-4 h-4 stroke-[2.5]" />
                          </div>
                          <p className="text-xs font-extrabold text-black leading-snug">
                            {t("hrTransformationMandate")}
                          </p>
                          <p className="text-[10px] text-gray-600 mt-0.5 leading-snug">
                            {t("mandateDesc")}
                          </p>
                        </div>

                        <Link
                          href="/lets-talk"
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-[#00D2C4] hover:bg-[#76D8C8] text-[#05434B] text-xs font-extrabold py-2 px-3 rounded-xl transition-colors active:scale-95 shadow-2xs"
                        >
                          <span>{t("discoveryCall")}</span>
                        </Link>
                      </div>
                    </div>

                    {/* Node 2: HR IT Landscape & Process Audit Card */}
                    <div className="relative bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 group">
                      {/* Top Purple Tab Header */}
                      <div className="absolute -top-3.5 left-4 bg-purple-600 text-white text-[10.5px] font-black uppercase tracking-wider px-3 py-0.5 rounded-t-lg rounded-b-xs flex items-center gap-1.5 shadow-2xs">
                        <Database className="w-3 h-3" />
                        <span>{t("hrItAudit")}</span>
                      </div>

                      {/* Clean Right Node Connector Point */}
                      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00D2C4] border-2 border-white shadow-2xs" />

                      <div className="pt-2">
                        <h4 className="text-xs font-bold text-gray-900 mb-2.5">
                          {t("systemMapping")}
                        </h4>

                        <div className="space-y-1.5 text-[11px] mb-3.5">
                          <div className="flex items-center gap-2 bg-[#F0FDF4] text-emerald-900 px-2.5 py-1 rounded-lg border border-emerald-100 font-semibold leading-tight">
                            <Check className="w-3 h-3 text-emerald-600 stroke-[3] shrink-0" />
                            <span>{t("auditCheck1")}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-[#F0FDF4] text-emerald-900 px-2.5 py-1 rounded-lg border border-emerald-100 font-semibold leading-tight">
                            <Check className="w-3 h-3 text-emerald-600 stroke-[3] shrink-0" />
                            <span>{t("auditCheck2")}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200 font-semibold leading-tight">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                            <span>{t("auditCheck3")}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-bold text-[#05434B] pt-2 border-t border-gray-100">
                          <span>{t("auditReportReady")}</span>
                          <span className="text-[#4FB8AA]">{t("auditScore")}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* ======================================================== */}
                  {/* COLUMN 2: STRATEGY & IMPLEMENTATION (Middle)             */}
                  {/* ======================================================== */}
                  <div className="col-span-4 space-y-6">

                    {/* Node 3: Vendor-Neutral Selection Matrix */}
                    <div className="relative bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 group">
                      {/* Clean Left & Right Connector Dots */}
                      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00D2C4] border-2 border-white shadow-2xs" />
                      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00D2C4] border-2 border-white shadow-2xs" />

                      {/* Top Pink Tab Header */}
                      <div className="absolute -top-3.5 left-4 bg-pink-500 text-white text-[10.5px] font-black uppercase tracking-wider px-3 py-0.5 rounded-t-lg rounded-b-xs flex items-center gap-1.5 shadow-2xs">
                        <Sliders className="w-3 h-3" />
                        <span>{t("selectionStrategy")}</span>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-xs font-bold text-gray-900 mb-2">
                          {t("independentToolSelection")}
                        </h4>

                        <div className="space-y-1.5 mb-3 text-[10.5px]">
                          <div className="flex items-center justify-between bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200">
                            <span className="font-bold text-gray-900">{t("coreHrisMatch")}</span>
                            <span className="text-brand-dark font-extrabold bg-[#76D8C8]/30 px-2 py-0.5 rounded">
                              {t("coreHrisValue")}
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200">
                            <span className="font-bold text-gray-900">{t("recruitingAts")}</span>
                            <span className="text-gray-700 font-semibold">{t("recruitingValue")}</span>
                          </div>
                          <div className="flex items-center justify-between bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200">
                            <span className="font-bold text-gray-900">{t("payrollEngine")}</span>
                            <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                              {t("payrollValue")}
                            </span>
                          </div>
                        </div>

                        <div className="bg-[#eaf7f2] rounded-xl p-2.5 text-center border border-[#76D8C8]/40">
                          <p className="text-[10px] font-extrabold text-[#05434B]">
                            {t("processRedesign")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Node 4: Rollout & Integration Pipeline Card */}
                    <div className="relative bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 group">
                      {/* Clean Left & Right Connector Dots */}
                      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00D2C4] border-2 border-white shadow-2xs" />
                      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00D2C4] border-2 border-white shadow-2xs" />

                      {/* Top Blue Tab Header */}
                      <div className="absolute -top-3.5 left-4 bg-blue-600 text-white text-[10.5px] font-black uppercase tracking-wider px-3 py-0.5 rounded-t-lg rounded-b-xs flex items-center gap-1.5 shadow-2xs">
                        <Zap className="w-3 h-3" />
                        <span>{t("implementation")}</span>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-xs font-bold text-gray-900 mb-1">
                          {t("executionIntegrations")}
                        </h4>
                        <p className="text-[11px] text-gray-600 leading-relaxed mb-2.5">
                          {t("implementationDesc")}
                        </p>

                        <div className="bg-[#FAF9FF] rounded-xl p-2.5 border border-gray-200 space-y-1 text-[10px] font-medium text-gray-700 mb-3">
                          <div className="flex items-center justify-between">
                            <span>{t("dataMigration")}</span>
                            <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>{t("datevPipeline")}</span>
                            <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>{t("interimHrLead")}</span>
                            <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-bold text-[#05434B]">
                          <span>{t("seniorSpecialists")}</span>
                          <span className="text-emerald-700">● {t("liveRollout")}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* ======================================================== */}
                  {/* COLUMN 3: OUTCOME & LIVE ADVISORY (Right)                */}
                  {/* ======================================================== */}
                  <div className="col-span-4 space-y-6">

                    {/* Node 5: Single Source of Truth Card */}
                    <div className="relative bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 group overflow-hidden">
                      {/* Clean Left Connector Dot */}
                      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00D2C4] border-2 border-white shadow-2xs" />

                      {/* Top Green Tab Header */}
                      <div className="absolute -top-3.5 left-4 bg-emerald-600 text-white text-[10.5px] font-black uppercase tracking-wider px-3 py-0.5 rounded-t-lg rounded-b-xs flex items-center gap-1.5 shadow-2xs">
                        <Sparkles className="w-3 h-3" />
                        <span>{t("singleSourceOfTruth")}</span>
                      </div>

                      <div className="pt-2">
                        <div className="bg-gradient-to-br from-[#81D8D0]/20 via-white to-[#A8F5EE]/30 rounded-xl p-3.5 border border-[#76D8C8]/60 mb-2">
                          <p className="text-xs font-black text-[#05434B] leading-tight mb-1">
                            {t("dataIntegrityAchieved")}
                          </p>
                          <p className="text-[11px] text-gray-700 leading-relaxed font-medium">
                            {t("dataIntegrityDesc")}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{t("euPayTransparency")}</span>
                        </div>
                      </div>
                    </div>

                    {/* Node 6: Real-Time Impact & Continuous Advisory Queue */}
                    <div className="relative bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 group">
                      {/* Clean Left Connector Dot */}
                      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00D2C4] border-2 border-white shadow-2xs" />

                      {/* Top Amber Tab Header */}
                      <div className="absolute -top-3.5 left-4 bg-amber-500 text-white text-[10.5px] font-black uppercase tracking-wider px-3 py-0.5 rounded-t-lg rounded-b-xs flex items-center gap-1.5 shadow-2xs">
                        <FileCheck className="w-3 h-3" />
                        <span>{t("advisoryRoi")}</span>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-3xl font-black text-black tracking-tight">
                            {t("savedPerMonth")}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                            {t("savedLabel")}
                          </span>
                        </div>

                        {/* Progress Visual Dots */}
                        <div className="grid grid-cols-3 gap-1.5 text-center text-[9.5px] font-bold mb-3">
                          <div className="bg-[#eaf7f2] p-1.5 rounded-lg border border-[#76D8C8]/40 text-[#05434B]">
                            <span>{t("onTimeRollout")}</span>
                            <p className="text-[8px] text-gray-500 font-normal">{t("onTimeLabel")}</p>
                          </div>
                          <div className="bg-[#eaf7f2] p-1.5 rounded-lg border border-[#76D8C8]/40 text-[#05434B]">
                            <span>{t("manualCsvs")}</span>
                            <p className="text-[8px] text-gray-500 font-normal">{t("manualCsvsLabel")}</p>
                          </div>
                          <div className="bg-[#eaf7f2] p-1.5 rounded-lg border border-[#76D8C8]/40 text-[#05434B]">
                            <span>{t("userAdoption")}</span>
                            <p className="text-[8px] text-gray-500 font-normal">{t("userAdoptionLabel")}</p>
                          </div>
                        </div>

                        <Link
                          href="/lets-talk"
                          className="w-full inline-flex items-center justify-center gap-1 text-xs font-bold text-[#05434B] hover:text-[#4FB8AA] transition-colors group cursor-pointer pt-1"
                        >
                          <span>{t("scaleOperations")} &rarr;</span>
                        </Link>
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
});
