"use client";

import Link from "next/link";
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
  return (
    <>
      {/* Center Desktop Navigation */}
      <nav className={`hidden lg:flex items-center gap-3.5 xl:gap-5 text-xs sm:text-[13px] font-semibold transition-colors ${
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
            <span>Services</span>
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
          className={`transition-colors px-1.5 py-1 ${
            isScrolled ? "hover:text-white" : "hover:text-gray-900 hover:text-brand-dark"
          }`}
          onMouseEnter={() => setActiveMenu(null)}
        >
          HR Tool Finder
        </Link>

        {/* 3. Case Studies */}
        <Link
          href="/case-studies"
          className={`transition-colors px-1.5 py-1 ${
            isScrolled ? "hover:text-white" : "hover:text-gray-900 hover:text-brand-dark"
          }`}
          onMouseEnter={() => setActiveMenu(null)}
        >
          Case Studies
        </Link>

        {/* 4. About Us */}
        <Link
          href="/about"
          className={`transition-colors px-1.5 py-1 ${
            isScrolled ? "hover:text-white" : "hover:text-gray-900 hover:text-brand-dark"
          }`}
          onMouseEnter={() => setActiveMenu(null)}
        >
          About Us
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
            <span>Insights</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                activeMenu === "insights"
                  ? isScrolled ? "rotate-180 text-gray-900" : "rotate-180 text-white"
                  : isScrolled ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </button>
        </div>
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
                    HR Technology
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 mb-3">
                    Modern system selection, setup & integration
                  </p>
                  <div className="h-px bg-gray-100 mb-3.5" />

                  <div className="space-y-2.5 text-[13px] font-medium text-gray-700">
                    <Link
                      href="/services/hr-it-selection"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      HR IT Selection
                    </Link>
                    <Link
                      href="/services/implementation-optimisation"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      Implementation & Optimisation
                    </Link>
                    <Link
                      href="/services/hr-it-integrations"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      HR IT Integrations
                    </Link>
                    <Link
                      href="/services/hr-it-audit"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      HR IT Audit
                    </Link>
                  </div>
                </div>

                <Link
                  href="/services/hr-it-selection"
                  onClick={() => setActiveMenu(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-brand-dark transition-colors mt-6 pt-2 border-t border-gray-50"
                >
                  <span>Explore HR Tech Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Column 2: Advisory & Leadership */}
              <div className="flex flex-col justify-between border-l border-gray-100 pl-8">
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 tracking-tight">
                    Advisory & Leadership
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 mb-3">
                    Interim leadership & German labor compliance
                  </p>
                  <div className="h-px bg-gray-100 mb-3.5" />

                  <div className="space-y-2.5 text-[13px] font-medium text-gray-700">
                    <Link
                      href="/services/interim-management"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      Interim Management
                    </Link>
                    <Link
                      href="/services/outsourced-hr"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      Outsourced HR Management
                    </Link>
                    <Link
                      href="/services/hr-advisory"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      HR Advisory
                    </Link>
                    <Link
                      href="/services/scheinselbststaendigkeit"
                      onClick={() => setActiveMenu(null)}
                      className="block hover:text-brand-dark hover:translate-x-0.5 transition-all py-0.5"
                    >
                      Scheinselbstständigkeit
                    </Link>
                  </div>
                </div>

                <Link
                  href="/services"
                  onClick={() => setActiveMenu(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-brand-dark transition-colors mt-6 pt-2 border-t border-gray-50"
                >
                  <span>Explore Advisory Services</span>
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
                href="/insights/blog"
                onClick={() => setActiveMenu(null)}
                className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 hover:text-brand-dark transition-colors"
              >
                <div className="font-semibold text-gray-900">Blog</div>
                <div className="text-[11px] text-gray-500 font-normal mt-0.5">Articles & trends on modern HR</div>
              </Link>
              <Link
                href="/insights/guides"
                onClick={() => setActiveMenu(null)}
                className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 hover:text-brand-dark transition-colors"
              >
                <div className="font-semibold text-gray-900">Guides & Checklists</div>
                <div className="text-[11px] text-gray-500 font-normal mt-0.5">HR playbooks & software guides</div>
              </Link>
              <Link
                href="/insights/resources"
                onClick={() => setActiveMenu(null)}
                className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 hover:text-brand-dark transition-colors"
              >
                <div className="font-semibold text-gray-900">HR Resources</div>
                <div className="text-[11px] text-gray-500 font-normal mt-0.5">RFP templates & decision frameworks</div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
