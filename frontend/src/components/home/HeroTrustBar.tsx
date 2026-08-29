"use client";

import { CompanyLogo } from "@/components/ui/CompanyLogo";

export function HeroTrustBar() {
  return (
        <div className="mt-14 sm:mt-16 w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 pt-8 border-t border-white/10 text-center">

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <CompanyLogo id="softwareone" className="w-5 h-5" />
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">SoftwareOne</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">1000+ employees</p>
            <p className="text-[11px] text-brand-teal">80% faster onboarding</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <CompanyLogo id="westbridge" className="w-5 h-5" />
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">Westbridge</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">450+ employees</p>
            <p className="text-[11px] text-brand-teal">Zero payroll errors</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <CompanyLogo id="krones" className="w-5 h-5" />
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">KRONES AG</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">750+ employees</p>
            <p className="text-[11px] text-brand-teal">70% admin cut</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <CompanyLogo id="symrise" className="w-5 h-5" />
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">symrise</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">DACH & Global</p>
            <p className="text-[11px] text-brand-teal">Modern HRIS stack</p>
          </div>

          <div className="flex flex-col items-center col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-1">
              <CompanyLogo id="tiemeyer" className="w-5 h-5" />
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">TIEMEYER</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">200+ employees</p>
            <p className="text-[11px] text-brand-teal">Interim leadership</p>
          </div>

        </div>
  );
}
