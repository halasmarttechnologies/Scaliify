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
  BookOpen,
  FileText,
  Calculator,
  BarChart3,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubView, setMobileSubView] = useState<"platform" | "solutions" | "resources" | "about" | null>(null);
  const [activeMenu, setActiveMenu] = useState<"platform" | "resources" | null>(null);

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
    <header
      className={`w-full fixed top-0 left-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-[#0C241D]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3 sm:py-3.5"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div 
        className="w-full max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-10 lg:px-12 relative"
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#81D8D0] flex items-center justify-center text-[#0c241d]">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="7" cy="7" r="4" />
              <circle cx="17" cy="7" r="4" fillOpacity="0.75" />
              <circle cx="7" cy="17" r="4" fillOpacity="0.75" />
              <circle cx="17" cy="17" r="4" />
            </svg>
          </div>
          <span className="font-bold text-xl sm:text-2xl tracking-tight text-white group-hover:text-[#81D8D0] transition-colors">
            Scaliify
          </span>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-gray-300">
          
          {/* 1. Platform Mega Dropdown Trigger */}
          <div
            className="py-2"
            onMouseEnter={() => setActiveMenu("platform")}
          >
            <button
              onClick={() => setActiveMenu(activeMenu === "platform" ? null : "platform")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-200 focus:outline-none ${
                activeMenu === "platform"
                  ? "bg-white text-gray-900 font-bold shadow-md scale-[1.02]"
                  : "text-gray-200 hover:text-white font-medium hover:bg-white/10"
              }`}
            >
              <span>Platform</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  activeMenu === "platform" ? "rotate-180 text-gray-900" : "text-gray-400"
                }`}
              />
            </button>
          </div>

          {/* 2. Solutions */}
          <Link
            href="/services"
            className="hover:text-white transition-colors px-2 py-1"
            onMouseEnter={() => setActiveMenu(null)}
          >
            Solutions
          </Link>

          {/* 3. HR Tool Finder */}
          <Link
            href="/tool-finder"
            className="hover:text-white transition-colors px-2 py-1"
            onMouseEnter={() => setActiveMenu(null)}
          >
            HR Tool Finder
          </Link>

          {/* 4. Resources Mega Dropdown Trigger */}
          <div
            className="py-2"
            onMouseEnter={() => setActiveMenu("resources")}
          >
            <button
              onClick={() => setActiveMenu(activeMenu === "resources" ? null : "resources")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-200 focus:outline-none ${
                activeMenu === "resources"
                  ? "bg-white text-gray-900 font-bold shadow-md scale-[1.02]"
                  : "text-gray-200 hover:text-white font-medium hover:bg-white/10"
              }`}
            >
              <span>Resources</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  activeMenu === "resources" ? "rotate-180 text-gray-900" : "text-gray-400"
                }`}
              />
            </button>
          </div>

          {/* 5. About */}
          <Link
            href="/about"
            className="hover:text-white transition-colors px-2 py-1"
            onMouseEnter={() => setActiveMenu(null)}
          >
            About
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex text-xs lg:text-sm font-medium text-gray-200 hover:text-white transition-colors px-2"
          >
            Login
          </Link>

          <Link
            href="/contact"
            className="hidden lg:flex items-center gap-2 bg-[#81D8D0] text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-white transition-all shadow-sm"
          >
            <span>Book your demo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP MEGA DROPDOWN 1: PLATFORM (CLEAN 3-COLUMN LAYOUT) */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {activeMenu === "platform" && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[840px] xl:w-[880px] max-w-[calc(100vw-32px)] bg-white text-gray-900 rounded-3xl border border-gray-100/90 shadow-[0_25px_70px_rgba(0,0,0,0.20)] p-7 z-50 origin-top"
              onMouseEnter={() => setActiveMenu("platform")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="grid grid-cols-3 gap-7 items-stretch">
                
                {/* Column 1: Core HR */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900 tracking-tight">
                      Core HR
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 mb-3">
                      Your foundation for HR productivity
                    </p>
                    <div className="h-px bg-gray-100 mb-3.5" />

                    <div className="space-y-2.5 text-[13px] font-medium text-gray-700">
                      <Link
                        href="/services/hr-it-selection"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Onboarding & Offboarding
                      </Link>
                      <Link
                        href="/services/implementation-optimisation"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Time Tracking
                      </Link>
                      <Link
                        href="/services/hr-it-audit"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Absence Management
                      </Link>
                      <Link
                        href="/services/hr-it-integrations"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        People Analytics
                      </Link>
                      <Link
                        href="/tool-finder"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        AI Assistant
                      </Link>
                      <Link
                        href="/services/implementation-optimisation"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Workflow Automation
                      </Link>
                      <Link
                        href="/services/hr-it-selection"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Documents & e-Signatures
                      </Link>
                    </div>
                  </div>

                  <Link
                    href="/services/hr-it-selection"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#81D8D0] hover:text-[#0C241D] transition-colors mt-6 pt-2 border-t border-gray-50"
                  >
                    <span>Explore Core HR</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Column 2: + Grow your platform */}
                <div className="flex flex-col justify-between border-l border-gray-100 pl-6">
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900 tracking-tight flex items-center gap-1">
                      <span className="text-gray-400 font-normal">+</span>
                      <span>Grow your platform</span>
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 mb-3">
                      Add the tools you need to scale
                    </p>
                    <div className="h-px bg-gray-100 mb-3.5" />

                    {/* Sub-section: Talent Management */}
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      TALENT MANAGEMENT
                    </div>
                    <div className="space-y-2 text-[13px] font-medium text-gray-700">
                      <Link
                        href="/services/hr-it-selection"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Recruiting
                      </Link>
                      <Link
                        href="/services/implementation-optimisation"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Performance & Development
                      </Link>
                      <Link
                        href="/services/hr-advisory"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Compensation Management
                      </Link>
                      <Link
                        href="/services/outsourced-hr"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Surveys
                      </Link>
                    </div>

                    {/* Sub-section: Governance & Global Reach */}
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-3.5 mb-2">
                      GOVERNANCE & GLOBAL REACH
                    </div>
                    <div className="space-y-2 text-[13px] font-medium text-gray-700">
                      <Link
                        href="/services/scheinselbststaendigkeit"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Whistleblowing
                      </Link>
                      <Link
                        href="/services/interim-management"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Employer of Record
                      </Link>
                    </div>
                  </div>

                  <Link
                    href="/services"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#81D8D0] hover:text-[#0C241D] transition-colors mt-6 pt-2 border-t border-gray-50"
                  >
                    <span>Explore all Apps</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Column 3: + Pay your people */}
                <div className="flex flex-col justify-between border-l border-gray-100 pl-6">
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900 tracking-tight flex items-center gap-1">
                      <span className="text-gray-400 font-normal">+</span>
                      <span>Pay your people</span>
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 mb-3">
                      Run payroll with accurate, connected data
                    </p>
                    <div className="h-px bg-gray-100 mb-3.5" />

                    <div className="space-y-2.5 text-[13px] font-medium text-gray-700">
                      <Link
                        href="/services/outsourced-hr"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Preliminary Payroll
                      </Link>
                      <Link
                        href="/services/implementation-optimisation"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Personio / Scaliify Payroll
                      </Link>
                      <Link
                        href="/services/hr-it-integrations"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Xero & DATEV Sync
                      </Link>
                      <Link
                        href="/services/interim-management"
                        onClick={() => setActiveMenu(null)}
                        className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                      >
                        Sage 50 & Local EU
                      </Link>
                    </div>
                  </div>

                  <Link
                    href="/services/hr-it-audit"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#81D8D0] hover:text-[#0C241D] transition-colors mt-6 pt-2 border-t border-gray-50"
                  >
                    <span>Explore Payroll</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* DESKTOP MEGA DROPDOWN 2: RESOURCES (CLEAN 2-COLUMN LAYOUT) */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {activeMenu === "resources" && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[640px] xl:w-[680px] max-w-[calc(100vw-32px)] bg-white text-gray-900 rounded-3xl border border-gray-100/90 shadow-[0_25px_70px_rgba(0,0,0,0.20)] p-7 z-50 origin-top"
              onMouseEnter={() => setActiveMenu("resources")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="grid grid-cols-2 gap-7 items-stretch">
                
                {/* Column 1: Learn & Insights */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900 tracking-tight">
                      Learn & Insights
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 mb-3">
                      Guides, blogs, and industry research
                    </p>
                    <div className="h-px bg-gray-100 mb-3.5" />

                    <div className="space-y-3 text-[13px] font-medium text-gray-700">
                      <Link
                        href="/insights/blog"
                        onClick={() => setActiveMenu(null)}
                        className="flex items-start gap-2.5 group hover:text-[#0C241D] transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-[#81D8D0]/20 group-hover:text-[#0C241D] transition-colors">
                          <BookOpen className="w-3.5 h-3.5 text-gray-500 group-hover:text-black" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 leading-tight group-hover:text-[#0C241D]">HR Tech Blog</div>
                          <div className="text-[11px] text-gray-500 font-normal mt-0.5">Strategy & workflow automation</div>
                        </div>
                      </Link>

                      <Link
                        href="/insights/guides"
                        onClick={() => setActiveMenu(null)}
                        className="flex items-start gap-2.5 group hover:text-[#0C241D] transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-[#81D8D0]/20 group-hover:text-[#0C241D] transition-colors">
                          <FileText className="w-3.5 h-3.5 text-gray-500 group-hover:text-black" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 leading-tight group-hover:text-[#0C241D]">Buyer&apos;s Guides</div>
                          <div className="text-[11px] text-gray-500 font-normal mt-0.5">Software selection roadmaps</div>
                        </div>
                      </Link>

                      <Link
                        href="/case-studies"
                        onClick={() => setActiveMenu(null)}
                        className="flex items-start gap-2.5 group hover:text-[#0C241D] transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-[#81D8D0]/20 group-hover:text-[#0C241D] transition-colors">
                          <BarChart3 className="w-3.5 h-3.5 text-gray-500 group-hover:text-black" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 leading-tight group-hover:text-[#0C241D]">Case Studies</div>
                          <div className="text-[11px] text-gray-500 font-normal mt-0.5">Client transformation stories</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <Link
                    href="/insights/blog"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#81D8D0] hover:text-[#0C241D] transition-colors mt-6 pt-2 border-t border-gray-50"
                  >
                    <span>Explore all Articles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Column 2: Tools & Free Resources */}
                <div className="flex flex-col justify-between border-l border-gray-100 pl-6">
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900 tracking-tight flex items-center gap-1">
                      <span className="text-gray-400 font-normal">+</span>
                      <span>Tools & Templates</span>
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 mb-3">
                      Calculators, RFP sheets, and checklists
                    </p>
                    <div className="h-px bg-gray-100 mb-3.5" />

                    <div className="space-y-3 text-[13px] font-medium text-gray-700">
                      <Link
                        href="/tool-finder"
                        onClick={() => setActiveMenu(null)}
                        className="flex items-start gap-2.5 group hover:text-[#0C241D] transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-[#81D8D0]/20 group-hover:text-[#0C241D] transition-colors">
                          <Sparkles className="w-3.5 h-3.5 text-gray-500 group-hover:text-black" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 leading-tight group-hover:text-[#0C241D]">HR Tool Finder</div>
                          <div className="text-[11px] text-gray-500 font-normal mt-0.5">Benchmark 20+ HR systems in 2 min</div>
                        </div>
                      </Link>

                      <Link
                        href="/insights/resources"
                        onClick={() => setActiveMenu(null)}
                        className="flex items-start gap-2.5 group hover:text-[#0C241D] transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-[#81D8D0]/20 group-hover:text-[#0C241D] transition-colors">
                          <Calculator className="w-3.5 h-3.5 text-gray-500 group-hover:text-black" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 leading-tight group-hover:text-[#0C241D]">RFP Decision Matrix</div>
                          <div className="text-[11px] text-gray-500 font-normal mt-0.5">Vendor scoring spreadsheet</div>
                        </div>
                      </Link>

                      <Link
                        href="/services/scheinselbststaendigkeit"
                        onClick={() => setActiveMenu(null)}
                        className="flex items-start gap-2.5 group hover:text-[#0C241D] transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-[#81D8D0]/20 group-hover:text-[#0C241D] transition-colors">
                          <ShieldCheck className="w-3.5 h-3.5 text-gray-500 group-hover:text-black" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 leading-tight group-hover:text-[#0C241D]">EU Compliance Checklist</div>
                          <div className="text-[11px] text-gray-500 font-normal mt-0.5">Freelancer & audit safety</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <Link
                    href="/insights/resources"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#81D8D0] hover:text-[#0C241D] transition-colors mt-6 pt-2 border-t border-gray-50"
                  >
                    <span>Download Free Resources</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ========================================================================= */}
      {/* FULL-SCREEN MOBILE OVERLAY (MATCHING EXACT PERSONIO DRILL-DOWN DESIGN) */}
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
                {/* ROOT MENU (SCREENSHOT 1) */}
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
                    {/* Platform Drill-down */}
                    <button
                      onClick={() => setMobileSubView("platform")}
                      className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 text-left hover:text-[#0C241D] transition-colors group cursor-pointer"
                    >
                      <span>Platform</span>
                      <ChevronRight className="w-5 h-5 text-gray-900 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Solutions Drill-down */}
                    <button
                      onClick={() => setMobileSubView("solutions")}
                      className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 text-left hover:text-[#0C241D] transition-colors group cursor-pointer"
                    >
                      <span>Solutions</span>
                      <ChevronRight className="w-5 h-5 text-gray-900 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Resources Drill-down */}
                    <button
                      onClick={() => setMobileSubView("resources")}
                      className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 text-left hover:text-[#0C241D] transition-colors group cursor-pointer"
                    >
                      <span>Resources</span>
                      <ChevronRight className="w-5 h-5 text-gray-900 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* About Drill-down */}
                    <button
                      onClick={() => setMobileSubView("about")}
                      className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 text-left hover:text-[#0C241D] transition-colors group cursor-pointer"
                    >
                      <span>About</span>
                      <ChevronRight className="w-5 h-5 text-gray-900 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Login Link */}
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 hover:text-[#0C241D] transition-colors"
                    >
                      <span>Login</span>
                    </Link>

                    {/* Language Switcher */}
                    <div className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 cursor-pointer">
                      <span>EN · English</span>
                      <ChevronRight className="w-5 h-5 text-gray-900 stroke-[2]" />
                    </div>
                  </motion.div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* SUB-VIEW: RESOURCES (SCREENSHOT 2) */}
                {/* ----------------------------------------------------------------- */}
                {mobileSubView === "resources" && (
                  <motion.div
                    key="resources-subview"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="py-4"
                  >
                    {/* Purple Banner Header */}
                    <div className="text-xl font-bold text-[#5c2d91] pb-3 border-b border-gray-100 mb-6">
                      Resources
                    </div>

                    {/* Section 1: Connect & Learn */}
                    <div className="mb-7">
                      <h4 className="text-base font-bold text-gray-900 pb-2 border-b border-[#5c2d91]/50 mb-3">
                        Connect & Learn
                      </h4>
                      <div className="space-y-3.5 text-[15px] font-medium text-gray-900">
                        <Link
                          href="/insights/blog"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#5c2d91] transition-colors"
                        >
                          HR Tech Blog & Insights
                        </Link>
                        <Link
                          href="/insights/guides"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#5c2d91] transition-colors"
                        >
                          Buyer&apos;s Guides & Checklists
                        </Link>
                        <Link
                          href="/case-studies"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#5c2d91] transition-colors"
                        >
                          Client Transformation Stories
                        </Link>
                        <Link
                          href="/insights/resources"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#5c2d91] transition-colors"
                        >
                          European HR Market Benchmark
                        </Link>
                      </div>
                    </div>

                    {/* Section 2: HR Knowledge Centre */}
                    <div>
                      <h4 className="text-base font-bold text-gray-900 pb-2 border-b border-[#5c2d91]/50 mb-3">
                        HR Knowledge Centre
                      </h4>
                      <div className="space-y-3.5 text-[15px] font-medium text-gray-900">
                        <Link
                          href="/tool-finder"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#5c2d91] transition-colors"
                        >
                          Interactive HR Tool Finder
                        </Link>
                        <Link
                          href="/insights/resources"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#5c2d91] transition-colors"
                        >
                          RFP Decision Matrix Template
                        </Link>
                        <Link
                          href="/services/scheinselbststaendigkeit"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#5c2d91] transition-colors"
                        >
                          EU Compliance & Labor Check
                        </Link>
                        <Link
                          href="/contact"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block hover:text-[#5c2d91] transition-colors"
                        >
                          ROI & Software Savings Calculator
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* SUB-VIEW: PLATFORM */}
                {/* ----------------------------------------------------------------- */}
                {mobileSubView === "platform" && (
                  <motion.div
                    key="platform-subview"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="py-4"
                  >
                    <div className="text-xl font-bold text-[#5c2d91] pb-3 border-b border-gray-100 mb-6">
                      Platform
                    </div>

                    {/* Section 1: Core HR */}
                    <div className="mb-7">
                      <h4 className="text-base font-bold text-gray-900 pb-2 border-b border-[#5c2d91]/50 mb-3">
                        Core HR
                      </h4>
                      <div className="space-y-3.5 text-[15px] font-medium text-gray-900">
                        <Link href="/services/hr-it-selection" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Onboarding & Offboarding</Link>
                        <Link href="/services/implementation-optimisation" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Time Tracking</Link>
                        <Link href="/services/hr-it-audit" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Absence Management</Link>
                        <Link href="/services/hr-it-integrations" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">People Analytics</Link>
                        <Link href="/tool-finder" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">AI Assistant</Link>
                        <Link href="/services/implementation-optimisation" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Workflow Automation</Link>
                        <Link href="/services/hr-it-selection" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Documents & e-Signatures</Link>
                      </div>
                    </div>

                    {/* Section 2: Grow your platform */}
                    <div className="mb-7">
                      <h4 className="text-base font-bold text-gray-900 pb-2 border-b border-[#5c2d91]/50 mb-3">
                        + Grow your platform
                      </h4>
                      <div className="space-y-3.5 text-[15px] font-medium text-gray-900">
                        <Link href="/services/hr-it-selection" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Recruiting & ATS</Link>
                        <Link href="/services/implementation-optimisation" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Performance & Development</Link>
                        <Link href="/services/hr-advisory" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Compensation Management</Link>
                        <Link href="/services/outsourced-hr" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Employee Surveys</Link>
                        <Link href="/services/scheinselbststaendigkeit" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Whistleblowing</Link>
                        <Link href="/services/interim-management" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Employer of Record</Link>
                      </div>
                    </div>

                    {/* Section 3: Pay your people */}
                    <div>
                      <h4 className="text-base font-bold text-gray-900 pb-2 border-b border-[#5c2d91]/50 mb-3">
                        + Pay your people
                      </h4>
                      <div className="space-y-3.5 text-[15px] font-medium text-gray-900">
                        <Link href="/services/outsourced-hr" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Preliminary Payroll</Link>
                        <Link href="/services/implementation-optimisation" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Personio / Scaliify Payroll</Link>
                        <Link href="/services/hr-it-integrations" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Xero & DATEV Sync</Link>
                        <Link href="/services/interim-management" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Sage 50 & Local EU</Link>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* SUB-VIEW: SOLUTIONS */}
                {/* ----------------------------------------------------------------- */}
                {mobileSubView === "solutions" && (
                  <motion.div
                    key="solutions-subview"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="py-4"
                  >
                    <div className="text-xl font-bold text-[#5c2d91] pb-3 border-b border-gray-100 mb-6">
                      Solutions
                    </div>

                    <div className="mb-7">
                      <h4 className="text-base font-bold text-gray-900 pb-2 border-b border-[#5c2d91]/50 mb-3">
                        HR Technology
                      </h4>
                      <div className="space-y-3.5 text-[15px] font-medium text-gray-900">
                        <Link href="/services/hr-it-selection" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">HR IT Selection</Link>
                        <Link href="/services/implementation-optimisation" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Implementation & Optimisation</Link>
                        <Link href="/services/hr-it-integrations" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">HR IT Integrations</Link>
                        <Link href="/services/hr-it-audit" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">HR IT Audit</Link>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-gray-900 pb-2 border-b border-[#5c2d91]/50 mb-3">
                        Advisory & Leadership
                      </h4>
                      <div className="space-y-3.5 text-[15px] font-medium text-gray-900">
                        <Link href="/services/interim-management" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Interim Management</Link>
                        <Link href="/services/outsourced-hr" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Outsourced HR Management</Link>
                        <Link href="/services/hr-advisory" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">HR Advisory</Link>
                        <Link href="/services/scheinselbststaendigkeit" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Scheinselbstständigkeit</Link>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* SUB-VIEW: ABOUT */}
                {/* ----------------------------------------------------------------- */}
                {mobileSubView === "about" && (
                  <motion.div
                    key="about-subview"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="py-4"
                  >
                    <div className="text-xl font-bold text-[#5c2d91] pb-3 border-b border-gray-100 mb-6">
                      About
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-gray-900 pb-2 border-b border-[#5c2d91]/50 mb-3">
                        Company
                      </h4>
                      <div className="space-y-3.5 text-[15px] font-medium text-gray-900">
                        <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">About Scaliify</Link>
                        <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Our Methodology</Link>
                        <Link href="/case-studies" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Client Case Studies</Link>
                        <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#5c2d91]">Contact Our Team</Link>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* 3. Fixed Bottom Sticky CTA Button (Matching Screenshot) */}
            <div className="p-6 pt-3 bg-white border-t border-gray-100 shrink-0">
              <Link
                href="/contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileSubView(null);
                }}
                className="w-full bg-black text-white font-bold py-4 rounded-2xl flex items-center justify-center text-base hover:bg-gray-900 active:scale-[0.99] transition-transform shadow-md"
              >
                Book your demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
