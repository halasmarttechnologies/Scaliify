"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Folder,
  Sliders,
  Sparkles,
  Zap,
  Check,
  Layers,
  ArrowRight,
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
        
        {/* Main Canvas Container */}
        <div className="w-full bg-[#FAFBFC] rounded-[20px] sm:rounded-[28px] border border-gray-200/90 text-gray-900 overflow-hidden relative">
          
          {/* Dot Grid Background Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: "radial-gradient(#94a3b8 1.1px, transparent 1.1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Top Canvas Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-200/80 bg-white/90 backdrop-blur-sm relative z-20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                Scaliify Client Journey
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 text-center">
              {t("canvasTitle")}
            </h3>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-brand-dark bg-[#81D8D0]/30 px-2.5 py-0.5 rounded-full">
              <span>4-Step Workflow</span>
            </div>
          </div>

          {/* Canvas Linear 4-Column Flow */}
          <div className="relative p-4 sm:p-6 lg:p-7 overflow-x-auto">
            
            {/* Scoped CSS Animation for Running Wire Connectors */}
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
            `}</style>

            {/* SVG Connecting Horizontal Wire (Visible on desktop) */}
            <div className="hidden lg:block absolute left-0 right-0 top-1/2 -translate-y-4 pointer-events-none z-0 px-8">
              <svg className="w-full h-8 overflow-visible" xmlns="http://www.w3.org/2000/svg">
                <line x1="12%" y1="50%" x2="88%" y2="50%" stroke="#E5E7EB" strokeWidth="2" />
                <line
                  x1="12%"
                  y1="50%"
                  x2="88%"
                  y2="50%"
                  stroke="#00D2C4"
                  strokeWidth="2.5"
                  className="wire-running"
                />
              </svg>
            </div>

            {/* 4-Step Bite-Sized Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch relative z-10 min-w-[680px] lg:min-w-0">

              {/* Step 1: Transformation Mandate */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-xs flex flex-col justify-between relative group hover:border-[#81D8D0] transition-all duration-200">
                {/* Step Pill */}
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-[#00D2C4] text-[#05434B] text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Folder className="w-2.5 h-2.5 fill-current" />
                    <span>Step 1</span>
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                    {t("newProject")}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-200 shrink-0">
                    <Image
                      src="/avatars/catherine.jpg"
                      alt="Client Lead"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-950 leading-tight">{t("scaleupPeopleLead")}</p>
                    <p className="text-[9px] text-gray-500">{t("employeeInfo")}</p>
                  </div>
                </div>

                <div className="bg-[#f4faf8] rounded-xl p-2.5 border border-[#76D8C8]/40 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-[#5BC7BC] text-[#05434B] flex items-center justify-center mb-1">
                    <Layers className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <p className="text-[11px] font-bold text-black leading-snug">
                    {t("hrTransformationMandate")}
                  </p>
                  <p className="text-[9.5px] text-gray-600 mt-0.5 leading-snug line-clamp-2">
                    {t("mandateDesc")}
                  </p>
                </div>

                <Link
                  href="/lets-talk"
                  className="w-full inline-flex items-center justify-center gap-1 bg-[#00D2C4] hover:bg-[#76D8C8] text-[#05434B] text-[11px] font-extrabold py-2 px-2.5 rounded-xl transition-colors active:scale-95 shadow-2xs"
                >
                  <span>{t("discoveryCall")}</span>
                </Link>
              </div>

              {/* Step 2: Tool Selection */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-xs flex flex-col justify-between relative group hover:border-[#81D8D0] transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-pink-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sliders className="w-2.5 h-2.5" />
                    <span>Step 2</span>
                  </span>
                  <span className="text-[10px] font-extrabold text-[#05434B] bg-[#76D8C8]/30 px-2 py-0.5 rounded-full">
                    0% Bias
                  </span>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-gray-900 mb-2">
                    {t("independentToolSelection")}
                  </h4>

                  <div className="space-y-1.5 mb-3 text-[10px]">
                    <div className="flex items-center justify-between bg-gray-50 px-2 py-1 rounded-lg border border-gray-200/80">
                      <span className="font-bold text-gray-800">HRIS:</span>
                      <span className="text-[#05434B] font-extrabold bg-[#76D8C8]/25 px-1.5 py-0.2 rounded">
                        Personio / HiBob
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 px-2 py-1 rounded-lg border border-gray-200/80">
                      <span className="font-bold text-gray-800">ATS:</span>
                      <span className="text-gray-700 font-semibold">Greenhouse</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 px-2 py-1 rounded-lg border border-gray-200/80">
                      <span className="font-bold text-gray-800">Payroll:</span>
                      <span className="text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                        DATEV
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#eaf7f2] rounded-xl p-2 text-center border border-[#76D8C8]/40">
                  <p className="text-[9.5px] font-extrabold text-[#05434B]">
                    {t("processRedesign")}
                  </p>
                </div>
              </div>

              {/* Step 3: Data Quality & Implementation */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-xs flex flex-col justify-between relative group hover:border-[#81D8D0] transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5" />
                    <span>Step 3</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Execution
                  </span>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-gray-900 mb-1">
                    {t("executionIntegrations")}
                  </h4>
                  <p className="text-[9.5px] text-gray-600 leading-snug mb-2.5">
                    Data migration, custom configuration & automated payroll sync.
                  </p>

                  <div className="bg-[#FAF9FF] rounded-xl p-2 border border-gray-200/80 space-y-1 text-[9.5px] font-medium text-gray-700 mb-3">
                    <div className="flex items-center justify-between">
                      <span>{t("dataMigration")}</span>
                      <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{t("datevPipeline")}</span>
                      <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{t("interimHrLead")}</span>
                      <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9.5px] font-bold text-[#05434B] pt-1 border-t border-gray-100">
                  <span>&gt;100 Network</span>
                  <span className="text-emerald-700">● {t("liveRollout")}</span>
                </div>
              </div>

              {/* Step 4: Single Source of Truth & Ongoing Advisory */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-xs flex flex-col justify-between relative group hover:border-[#81D8D0] transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Step 4</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Live
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-2xl font-black text-black tracking-tight">
                      {t("savedPerMonth")}
                    </span>
                    <span className="text-[9.5px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {t("savedLabel")}
                    </span>
                  </div>

                  <div className="bg-gradient-to-br from-[#81D8D0]/20 via-white to-[#A8F5EE]/30 rounded-xl p-2.5 border border-[#76D8C8]/60 mb-2.5">
                    <p className="text-[11px] font-black text-[#05434B] leading-tight mb-0.5">
                      {t("singleSourceOfTruth")}
                    </p>
                    <p className="text-[9.5px] text-gray-700 leading-snug">
                      Automated workflows & zero payroll discrepancies.
                    </p>
                  </div>
                </div>

                <Link
                  href="/lets-talk"
                  className="w-full inline-flex items-center justify-center gap-1 text-[11px] font-bold text-[#05434B] hover:text-[#4FB8AA] transition-colors pt-1"
                >
                  <span>{t("scaleOperations")}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
});
