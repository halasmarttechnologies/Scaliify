"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { HeroDashboardPreview } from "@/components/home/HeroDashboardPreview";
import { HeroTrustBar } from "@/components/home/HeroTrustBar";

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
    <div className="w-full min-h-screen relative bg-brand-dark text-white overflow-hidden flex flex-col justify-between">
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
              className="group relative bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep text-brand-dark text-xs sm:text-sm font-extrabold px-4 sm:px-5 py-2.5 rounded-xl border border-white/70 shadow-[0_2px_14px_rgba(129,216,208,0.55)] hover:shadow-[0_4px_22px_rgba(129,216,208,0.85)] hover:scale-[1.03] active:scale-[0.98] transition-all shrink-0 cursor-pointer whitespace-nowrap overflow-hidden"
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
          <span className="font-bold text-brand-teal">1.6M+</span>
          <span>employees at over</span>
          <span className="font-bold text-brand-teal">16,000</span>
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

        {/* 5. Main Dashboard Mockup Card */}
        <HeroDashboardPreview />

        {/* 6. Bottom Trusted Companies Metrics Bar */}
        <HeroTrustBar />

      </div>
    </div>
  );
}
