"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";

type MenuType = "services" | "insights" | null;

interface NavDesktopMenuProps {
  isScrolled: boolean;
  activeMenu: MenuType;
  setActiveMenu: Dispatch<SetStateAction<MenuType>>;
}

export function NavDesktopMenu({ isScrolled, activeMenu, setActiveMenu }: NavDesktopMenuProps) {
  const t = useTranslations("navigation");
  return (
    <>
      {/* Center Desktop Navigation */}
      <nav className={`hidden lg:flex items-center gap-1 xl:gap-2 text-[11px] xl:text-[12px] font-semibold transition-colors ${
        isScrolled ? "text-gray-300" : "text-gray-700"
      }`}>

        {/* 1. Services Dropdown Trigger */}
        <div
          className="py-1"
          onMouseEnter={() => setActiveMenu("services")}
        >
          <button
            onClick={() => setActiveMenu(activeMenu === "services" ? null : "services")}
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 focus:outline-none ${
              activeMenu === "services"
                ? isScrolled
                  ? "bg-white text-gray-900 font-bold shadow-xs scale-[1.02]"
                  : "bg-brand-dark text-white font-bold shadow-xs scale-[1.02]"
                : isScrolled
                ? "text-gray-200 hover:text-white hover:bg-white/10"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span>{t("services")}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                activeMenu === "services"
                  ? isScrolled ? "rotate-180 text-gray-900" : "rotate-180 text-white"
                  : isScrolled ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </button>
        </div>

        {/* 2. HR Tool Finder */}
        <Link
          href="/tool-finder"
          className={`whitespace-nowrap transition-colors px-1.5 py-1 ${
            isScrolled ? "hover:text-white" : "hover:text-gray-900 hover:text-brand-dark"
          }`}
          onMouseEnter={() => setActiveMenu(null)}
        >
          {t("hrToolFinder")}
        </Link>

        {/* 3. Case Studies */}
        <Link
          href="/case-studies"
          className={`whitespace-nowrap transition-colors px-1.5 py-1 ${
            isScrolled ? "hover:text-white" : "hover:text-gray-900 hover:text-brand-dark"
          }`}
          onMouseEnter={() => setActiveMenu(null)}
        >
          {t("caseStudies")}
        </Link>

        {/* 4. About Us */}
        <Link
          href="/about"
          className={`whitespace-nowrap transition-colors px-1.5 py-1 ${
            isScrolled ? "hover:text-white" : "hover:text-gray-900 hover:text-brand-dark"
          }`}
          onMouseEnter={() => setActiveMenu(null)}
        >
          {t("aboutUs")}
        </Link>

        {/* 5. Insights Dropdown Trigger */}
        <div
          className="py-1"
          onMouseEnter={() => setActiveMenu("insights")}
        >
          <button
            onClick={() => setActiveMenu(activeMenu === "insights" ? null : "insights")}
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 focus:outline-none ${
              activeMenu === "insights"
                ? isScrolled
                  ? "bg-white text-gray-900 font-bold shadow-xs scale-[1.02]"
                  : "bg-brand-dark text-white font-bold shadow-xs scale-[1.02]"
                : isScrolled
                ? "text-gray-200 hover:text-white hover:bg-white/10"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span>{t("insights")}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                activeMenu === "insights"
                  ? isScrolled ? "rotate-180 text-gray-900" : "rotate-180 text-white"
                  : isScrolled ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </button>
        </div>

        {/* 6. Contact */}
        <Link
          href="/contact"
          className={`whitespace-nowrap transition-colors px-1.5 py-1 ${
            isScrolled ? "hover:text-white" : "hover:text-gray-900 hover:text-brand-dark"
          }`}
          onMouseEnter={() => setActiveMenu(null)}
        >
          {t("contact")}
        </Link>
      </nav>

      {/* ========================================================================= */}
      {/* DESKTOP DROPDOWN 1: SERVICES (SCALIIFY SERVICES - 2 BALANCED COLUMNS) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeMenu === "services" && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[720px] xl:w-[760px] max-w-[calc(100vw-32px)] bg-white text-gray-900 rounded-3xl border border-gray-100/90 shadow-[0_25px_70px_rgba(0,0,0,0.20)] p-7 z-50 origin-top"
            onMouseEnter={() => setActiveMenu("services")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="grid grid-cols-2 gap-8 items-stretch">

              {/* Column 1: HR Technology */}
              <div className="flex flex-col justify-between">
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 tracking-tight">
                    {t("hrTechnology")}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 mb-3">
                    {t("hrTechnologySub")}
                  </p>
                  <div className="h-px bg-gray-100 mb-3.5" />

                  <div className="space-y-2.5 text-[13px] font-medium text-gray-700">
                    <Link
                      href="/services/hr-it-selection"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      {t("hrItSelection")}
                    </Link>
                    <Link
                      href="/services/implementation-optimisation"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      {t("implementationOptimisation")}
                    </Link>
                    <Link
                      href="/services/hr-it-integrations"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      {t("hrItIntegrations")}
                    </Link>
                  </div>
                </div>

                <Link
                  href="/services/hr-it-selection"
                  onClick={() => setActiveMenu(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-brand-dark transition-colors mt-6 pt-2 border-t border-gray-50"
                >
                  <span>{t("exploreHrTech")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Column 2: Advisory & Leadership */}
              <div className="flex flex-col justify-between border-l border-gray-100 pl-8">
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 tracking-tight">
                    {t("advisoryLeadership")}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 mb-3">
                    {t("advisoryLeadershipSub")}
                  </p>
                  <div className="h-px bg-gray-100 mb-3.5" />

                  <div className="space-y-2.5 text-[13px] font-medium text-gray-700">
                    <Link
                      href="/services/interim-management"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      {t("interimManagement")}
                    </Link>
                    <Link
                      href="/services/outsourced-hr"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      {t("outsourcedHr")}
                    </Link>
                    <Link
                      href="/services/hr-advisory"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      {t("hrAdvisory")}
                    </Link>
                    <a
                      href="https://keine-scheinselbststaendigkeit.de/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      {t("scheinselbststaendigkeit")} ↗
                    </a>
                  </div>
                </div>

                <Link
                  href="/services"
                  onClick={() => setActiveMenu(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-brand-dark transition-colors mt-6 pt-2 border-t border-gray-50"
                >
                  <span>{t("exploreAdvisory")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* DESKTOP DROPDOWN 2: INSIGHTS (SCALIIFY INSIGHTS) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeMenu === "insights" && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[340px] bg-white text-gray-900 rounded-3xl border border-gray-100/90 shadow-[0_25px_70px_rgba(0,0,0,0.20)] p-5 z-50 origin-top"
            onMouseEnter={() => setActiveMenu("insights")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="space-y-1 text-[13px] font-medium text-gray-700">
              <Link
                href="/blog"
                onClick={() => setActiveMenu(null)}
                className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 hover:text-brand-dark transition-colors"
              >
                <div className="font-semibold text-gray-900">{t("blog")}</div>
                <div className="text-[11px] text-gray-500 font-normal mt-0.5">{t("blogSub")}</div>
              </Link>
              <Link
                href="/insights/guides"
                onClick={() => setActiveMenu(null)}
                className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 hover:text-brand-dark transition-colors"
              >
                <div className="font-semibold text-gray-900">{t("guidesChecklists")}</div>
                <div className="text-[11px] text-gray-500 font-normal mt-0.5">{t("guidesChecklistsSub")}</div>
              </Link>
              <Link
                href="/insights/resources"
                onClick={() => setActiveMenu(null)}
                className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 hover:text-brand-dark transition-colors"
              >
                <div className="font-semibold text-gray-900">{t("hrResources")}</div>
                <div className="text-[11px] text-gray-500 font-normal mt-0.5">{t("hrResourcesSub")}</div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
