"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Search,
  Clock,
  FileText,
  Building,
  Zap,
  Users,
  Briefcase,
  TrendingUp,
  CreditCard,
  Home as HomeIcon,
  Inbox as InboxIcon,
  Bot,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Download,
  RotateCcw,
} from "lucide-react";

import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { HeroAuraWaves } from "@/components/ui/HeroAuraWaves";
import { ROTATING_COMPANIES, COMPANY_ROTATION_INTERVAL_MS } from "@/lib/constants";
import { HeroTrustBar } from "@/components/home/HeroTrustBar";

export function ToolFinderHero() {
  const t = useTranslations("toolFinder");
  const tHero = useTranslations("hero");
  const tTrustBar = useTranslations("heroTrustBar");
  const [email, setEmail] = useState("");
  const [companyIndex, setCompanyIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCompanyIndex((prev) => (prev + 1) % ROTATING_COMPANIES.length);
    }, COMPANY_ROTATION_INTERVAL_MS);
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
  const profileImage = "/avatars/catherine.jpg";

  return (
    <div className="w-full min-h-screen relative bg-black text-white overflow-hidden flex flex-col justify-between">
      {/* Rising Space Aura Waves Background Effect */}
      <HeroAuraWaves />

      {/* Top spacing to account for compact floating navbar */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 flex flex-col items-center relative z-10">
        
        {/* 1. Main Headline (H1) - 2 lines */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white text-center tracking-tight leading-[1.12] max-w-4xl mx-auto">
          <span>{t("heroHeadingLine1")}</span>
          <br />
          <span>{t("heroHeadingLine2")}</span>
        </h1>

        {/* 2. Subheading */}
        <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-300 text-center max-w-2xl mx-auto font-normal leading-relaxed">
          {t("heroSubtitle")}
        </p>

        {/* 3. Clean Input with Glossy Tiffany Blue CTA Button */}
        <div className="mt-7 sm:mt-8 w-full max-w-sm sm:max-w-md relative p-[1px] rounded-2xl bg-white/20 border border-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <form
            onSubmit={scrollToAssessment}
            className="relative z-10 bg-white rounded-[15px] p-1.5 pl-4 sm:pl-5 flex items-center justify-between transition-all"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={tHero("emailPlaceholder")}
              aria-label={tHero("emailAriaLabel")}
              className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm font-medium focus:outline-none pr-2"
              required
            />
            <button
              type="submit"
              className="group relative bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep text-brand-dark text-xs sm:text-sm font-extrabold px-4 sm:px-5 py-2.5 rounded-xl border border-white/70 shadow-[0_2px_14px_rgba(129,216,208,0.55)] hover:shadow-[0_4px_22px_rgba(129,216,208,0.85)] hover:scale-[1.03] active:scale-[0.98] transition-all shrink-0 cursor-pointer whitespace-nowrap overflow-hidden"
            >
              {/* Glossy Top Specular Sheen */}
              <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-xl pointer-events-none" />
              <span className="relative z-10">{t("startAssessment")}</span>
            </button>
          </form>
        </div>

        {/* 4. Trust Statement with Rotating Animated Logo */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-gray-300 flex-wrap text-center">
          <span>{tHero("trustedBy")}</span>
          <span className="font-bold text-brand-teal">{tHero("employeeStat")}</span>
          <span>{tHero("employeesAtOver")}</span>
          <span className="font-bold text-brand-teal">{tHero("orgCount")}</span>
          <span>{tHero("organisations")}</span>
          
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
                {ROTATING_COMPANIES[companyIndex].type === "logo" && (
                  <>
                    <CompanyLogo id={ROTATING_COMPANIES[companyIndex].id!} className="w-4 h-4" />
                    <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                      {ROTATING_COMPANIES[companyIndex].name}
                    </span>
                  </>
                )}
                {ROTATING_COMPANIES[companyIndex].type === "text" && (
                  <span className={ROTATING_COMPANIES[companyIndex].className}>
                    {ROTATING_COMPANIES[companyIndex].name}
                  </span>
                )}
                {ROTATING_COMPANIES[companyIndex].type === "orderbird" && (
                  <span className="font-extrabold tracking-tighter text-xs sm:text-sm text-white flex items-center gap-0.5">
                    <span className="text-white text-base leading-none">›</span>
                    <span>orderbird</span>
                  </span>
                )}
                {ROTATING_COMPANIES[companyIndex].type === "spendesk" && (
                  <span className="font-black tracking-widest text-[11px] sm:text-xs text-white uppercase">
                    SPENDESK
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Trusted Companies Bar (no descriptions) */}
        <HeroTrustBar />
      </div>
    </div>
  );
}
