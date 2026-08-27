"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubView, setMobileSubView] = useState<"services" | "insights" | null>(null);
  const [activeMenu, setActiveMenu] = useState<"services" | "insights" | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setMobileSubView(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-6 sm:top-8 left-0 right-0 z-[100] px-3 sm:px-4 pointer-events-none flex justify-center">
      <div 
        className={`w-full max-w-4xl flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 pointer-events-auto border shadow-lg ${
          isScrolled
            ? "bg-[#0C241D]/95 backdrop-blur-md border-white/20 text-white shadow-xl"
            : "bg-white text-gray-900 border-gray-200/80 shadow-md"
        } relative`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#81D8D0] flex items-center justify-center text-[#0C241D] shadow-xs">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="7" cy="7" r="4" />
              <circle cx="17" cy="7" r="4" fillOpacity="0.75" />
              <circle cx="7" cy="17" r="4" fillOpacity="0.75" />
              <circle cx="17" cy="17" r="4" />
            </svg>
          </div>
          <span className={`font-bold text-base sm:text-lg tracking-tight transition-colors ${
            isScrolled ? "text-white group-hover:text-[#81D8D0]" : "text-gray-900 group-hover:text-[#0C241D]"
          }`}>
            Scaliify
          </span>
        </Link>

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
                    : "bg-[#0C241D] text-white font-bold shadow-xs scale-[1.02]"
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
              isScrolled ? "hover:text-white" : "hover:text-gray-900 hover:text-[#0C241D]"
            }`}
            onMouseEnter={() => setActiveMenu(null)}
          >
            HR Tool Finder
          </Link>

          {/* 3. Case Studies */}
          <Link
            href="/case-studies"
            className={`transition-colors px-1.5 py-1 ${
              isScrolled ? "hover:text-white" : "hover:text-gray-900 hover:text-[#0C241D]"
            }`}
            onMouseEnter={() => setActiveMenu(null)}
          >
            Case Studies
          </Link>

          {/* 4. About Us */}
          <Link
            href="/about"
            className={`transition-colors px-1.5 py-1 ${
              isScrolled ? "hover:text-white" : "hover:text-gray-900 hover:text-[#0C241D]"
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
                    : "bg-[#0C241D] text-white font-bold shadow-xs scale-[1.02]"
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

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Link
            href="/contact"
            className="group relative hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-[#0C241D] bg-gradient-to-b from-[#A8F5EE] via-[#81D8D0] to-[#5BC7BC] shadow-[0_2px_15px_rgba(129,216,208,0.55)] border border-white/70 hover:shadow-[0_4px_22px_rgba(129,216,208,0.85)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden"
          >
            {/* Top Glossy Specular Reflection */}
            <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
            <span className="relative z-10 tracking-tight font-extrabold">Let&apos;s Talk</span>
            <ArrowRight className="relative z-10 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            className={`lg:hidden p-1.5 rounded-lg transition-colors ${
              isScrolled ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

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
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all py-0.5"
                      >
                        HR IT Selection
                      </Link>
                      <Link
                        href="/services/implementation-optimisation"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all py-0.5"
                      >
                        Implementation & Optimisation
                      </Link>
                      <Link
                        href="/services/hr-it-integrations"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all py-0.5"
                      >
                        HR IT Integrations
                      </Link>
                      <Link
                        href="/services/hr-it-audit"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all py-0.5"
                      >
                        HR IT Audit
                      </Link>
                    </div>
                  </div>

                  <Link
                    href="/services/hr-it-selection"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#81D8D0] hover:text-[#0C241D] transition-colors mt-6 pt-2 border-t border-gray-50"
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
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all py-0.5"
                      >
                        Interim Management
                      </Link>
                      <Link
                        href="/services/outsourced-hr"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all py-0.5"
                      >
                        Outsourced HR Management
                      </Link>
                      <Link
                        href="/services/hr-advisory"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all py-0.5"
                      >
                        HR Advisory
                      </Link>
                      <Link
                        href="/services/scheinselbststaendigkeit"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all py-0.5"
                      >
                        Scheinselbstständigkeit
                      </Link>
                    </div>
                  </div>

                  <Link
                    href="/services"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#81D8D0] hover:text-[#0C241D] transition-colors mt-6 pt-2 border-t border-gray-50"
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
                  className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 hover:text-[#0C241D] transition-colors"
                >
                  <div className="font-semibold text-gray-900">Blog</div>
                  <div className="text-[11px] text-gray-500 font-normal mt-0.5">Articles & trends on modern HR</div>
                </Link>
                <Link
                  href="/insights/guides"
                  onClick={() => setActiveMenu(null)}
                  className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 hover:text-[#0C241D] transition-colors"
                >
                  <div className="font-semibold text-gray-900">Guides & Checklists</div>
                  <div className="text-[11px] text-gray-500 font-normal mt-0.5">HR playbooks & software guides</div>
                </Link>
                <Link
                  href="/insights/resources"
                  onClick={() => setActiveMenu(null)}
                  className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 hover:text-[#0C241D] transition-colors"
                >
                  <div className="font-semibold text-gray-900">HR Resources</div>
                  <div className="text-[11px] text-gray-500 font-normal mt-0.5">RFP templates & decision frameworks</div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ========================================================================= */}
      {/* FULL-SCREEN MOBILE OVERLAY (MATCHING EXACT DRILL-DOWN DESIGN WITH SCALIIFY CONTENT) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[200] bg-white text-gray-900 flex flex-col justify-between overflow-hidden"
          >
            {/* 1. Mobile Header Bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              {mobileSubView === null ? (
                /* Root Header */
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                    Scaliify
                  </span>
                </Link>
              ) : (
                /* Sub-View Header with Back button */
                <button
                  onClick={() => setMobileSubView(null)}
                  className="flex items-center gap-2 text-base font-bold text-gray-900 hover:text-black py-1"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                  <span>Back</span>
                </button>
              )}

              {/* Close (X) Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileSubView(null);
                }}
                className="p-2 -mr-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X className="w-7 h-7 stroke-[1.75]" />
              </button>
            </div>

            {/* 2. Scrollable Body Content */}
            <div className="flex-grow overflow-y-auto px-6 py-2">
              <AnimatePresence mode="wait">
                
                {/* ----------------------------------------------------------------- */}
                {/* ROOT MENU (SCALIIFY CONTENT) */}
                {/* ----------------------------------------------------------------- */}
                {mobileSubView === null && (
                  <motion.div
                    key="root-menu"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col"
                  >
                    {/* Services Drill-down */}
                    <button
                      onClick={() => setMobileSubView("services")}
                      className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 text-left hover:text-[#0C241D] transition-colors group cursor-pointer"
                    >
                      <span>Services</span>
                      <ChevronRight className="w-5 h-5 text-gray-900 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* HR Tool Finder Direct Link */}
                    <Link
                      href="/tool-finder"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 hover:text-[#0C241D] transition-colors"
                    >
                      <span>HR Tool Finder</span>
                    </Link>

                    {/* Case Studies Direct Link */}
                    <Link
                      href="/case-studies"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 hover:text-[#0C241D] transition-colors"
                    >
                      <span>Case Studies</span>
                    </Link>

                    {/* About Us Direct Link */}
                    <Link
                      href="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 hover:text-[#0C241D] transition-colors"
                    >
                      <span>About Us</span>
                    </Link>

                    {/* Insights Drill-down */}
                    <button
                      onClick={() => setMobileSubView("insights")}
                      className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 text-left hover:text-[#0C241D] transition-colors group cursor-pointer"
                    >
                      <span>Insights</span>
                      <ChevronRight className="w-5 h-5 text-gray-900 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Language Switcher */}
                    <div className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 cursor-pointer">
                      <span>EN · English</span>
                      <ChevronRight className="w-5 h-5 text-gray-900 stroke-[2]" />
                    </div>
                  </motion.div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* SUB-VIEW: SERVICES (SCALIIFY CONTENT) */}
                {/* ----------------------------------------------------------------- */}
                {mobileSubView === "services" && (
                  <motion.div
                    key="services-subview"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="py-4"
                  >
                    {/* Header Title */}
                    <div className="text-xl font-bold text-[#0C241D] pb-3 border-b border-gray-100 mb-6">
                      Services
                    </div>

                    {/* Section 1: HR Technology */}
                    <div className="mb-7">
                      <h4 className="text-base font-bold text-gray-900 pb-2 border-b-2 border-gray-900 mb-3">
                        HR Technology
                      </h4>
                      <div className="space-y-3.5 text-[15px] font-medium text-gray-900">
                        <Link
                          href="/services/hr-it-selection"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#81D8D0] transition-colors"
                        >
                          HR IT Selection
                        </Link>
                        <Link
                          href="/services/implementation-optimisation"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#81D8D0] transition-colors"
                        >
                          Implementation & Optimisation
                        </Link>
                        <Link
                          href="/services/hr-it-integrations"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#81D8D0] transition-colors"
                        >
                          HR IT Integrations
                        </Link>
                        <Link
                          href="/services/hr-it-audit"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#81D8D0] transition-colors"
                        >
                          HR IT Audit
                        </Link>
                      </div>
                    </div>

                    {/* Section 2: Advisory & Leadership */}
                    <div>
                      <h4 className="text-base font-bold text-gray-900 pb-2 border-b-2 border-gray-900 mb-3">
                        Advisory & Leadership
                      </h4>
                      <div className="space-y-3.5 text-[15px] font-medium text-gray-900">
                        <Link
                          href="/services/interim-management"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#81D8D0] transition-colors"
                        >
                          Interim Management
                        </Link>
                        <Link
                          href="/services/outsourced-hr"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#81D8D0] transition-colors"
                        >
                          Outsourced HR Management
                        </Link>
                        <Link
                          href="/services/hr-advisory"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#81D8D0] transition-colors"
                        >
                          HR Advisory
                        </Link>
                        <Link
                          href="/services/scheinselbststaendigkeit"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#81D8D0] transition-colors"
                        >
                          Scheinselbstständigkeit
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* SUB-VIEW: INSIGHTS (SCALIIFY CONTENT) */}
                {/* ----------------------------------------------------------------- */}
                {mobileSubView === "insights" && (
                  <motion.div
                    key="insights-subview"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="py-4"
                  >
                    <div className="text-xl font-bold text-[#0C241D] pb-3 border-b border-gray-100 mb-6">
                      Insights
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-gray-900 pb-2 border-b-2 border-gray-900 mb-3">
                        Knowledge & Resources
                      </h4>
                      <div className="space-y-3.5 text-[15px] font-medium text-gray-900">
                        <Link
                          href="/insights/blog"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#81D8D0] transition-colors"
                        >
                          Blog
                        </Link>
                        <Link
                          href="/insights/guides"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#81D8D0] transition-colors"
                        >
                          Guides & Checklists
                        </Link>
                        <Link
                          href="/insights/resources"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#81D8D0] transition-colors"
                        >
                          HR Resources
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* 3. Fixed Bottom Sticky CTA Button */}
            <div className="p-6 pt-3 bg-white border-t border-gray-100 shrink-0">
              <Link
                href="/contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileSubView(null);
                }}
                className="group relative w-full bg-gradient-to-b from-[#A8F5EE] via-[#81D8D0] to-[#5BC7BC] text-[#0C241D] font-extrabold py-3.5 rounded-2xl flex items-center justify-center text-base border border-white/70 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(129,216,208,0.6)] overflow-hidden"
              >
                <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-2xl pointer-events-none" />
                <span className="relative z-10">Let&apos;s Talk</span>
                <ArrowRight className="relative z-10 w-4 h-4 ml-2" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
