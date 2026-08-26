"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Play,
  ShieldCheck,
  Compass,
  Megaphone,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);

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

  return (
    <header
      className={`w-full fixed top-0 left-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-[#0C241D]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3 sm:py-3.5"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-10 lg:px-12">
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
          
          {/* 1. Platform / Mega Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setPlatformOpen(true)}
            onMouseLeave={() => setPlatformOpen(false)}
          >
            <button
              onClick={() => setPlatformOpen(!platformOpen)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 focus:outline-none ${
                platformOpen
                  ? "bg-white text-gray-900 font-semibold shadow-sm"
                  : "text-gray-200 hover:text-white font-medium hover:bg-white/10"
              }`}
            >
              <span>Platform</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  platformOpen ? "rotate-180 text-gray-900" : "text-gray-400"
                }`}
              />
            </button>

            {/* Mega Dropdown Menu matching exact screenshot style */}
            <AnimatePresence>
              {platformOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[1000px] xl:w-[1060px] max-w-[95vw] bg-white text-gray-900 rounded-3xl border border-gray-100/90 shadow-[0_25px_70px_rgba(0,0,0,0.18)] p-7 mt-1.5 z-50 origin-top"
                >
                  <div className="grid grid-cols-12 gap-7 items-stretch">
                    
                    {/* Column 1: Core HR */}
                    <div className="col-span-3 flex flex-col justify-between">
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
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            Onboarding & Offboarding
                          </Link>
                          <Link
                            href="/services/implementation-optimisation"
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            Time Tracking
                          </Link>
                          <Link
                            href="/services/hr-it-audit"
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            Absence Management
                          </Link>
                          <Link
                            href="/services/hr-it-integrations"
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            People Analytics
                          </Link>
                          <Link
                            href="/tool-finder"
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            AI Assistant
                          </Link>
                          <Link
                            href="/services/implementation-optimisation"
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            Workflow Automation
                          </Link>
                          <Link
                            href="/services/hr-it-selection"
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            Documents & e-Signatures
                          </Link>
                        </div>
                      </div>

                      <Link
                        href="/services/hr-it-selection"
                        onClick={() => setPlatformOpen(false)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#81D8D0] hover:text-[#0C241D] transition-colors mt-6 pt-2 border-t border-gray-50"
                      >
                        <span>Explore Core HR</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Column 2: + Grow your platform */}
                    <div className="col-span-3 flex flex-col justify-between border-l border-gray-100 pl-6">
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
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            Recruiting
                          </Link>
                          <Link
                            href="/services/implementation-optimisation"
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            Performance & Development
                          </Link>
                          <Link
                            href="/services/hr-advisory"
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            Compensation Management
                          </Link>
                          <Link
                            href="/services/outsourced-hr"
                            onClick={() => setPlatformOpen(false)}
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
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            Whistleblowing
                          </Link>
                          <Link
                            href="/services/interim-management"
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            Employer of Record
                          </Link>
                        </div>
                      </div>

                      <Link
                        href="/services"
                        onClick={() => setPlatformOpen(false)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#81D8D0] hover:text-[#0C241D] transition-colors mt-6 pt-2 border-t border-gray-50"
                      >
                        <span>Explore all Apps</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Column 3: + Pay your people */}
                    <div className="col-span-3 flex flex-col justify-between border-l border-gray-100 pl-6">
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
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            Preliminary Payroll
                          </Link>
                          <Link
                            href="/services/implementation-optimisation"
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            Personio / Scaliify Payroll
                          </Link>
                          <Link
                            href="/services/hr-it-integrations"
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            Xero & DATEV Sync
                          </Link>
                          <Link
                            href="/services/interim-management"
                            onClick={() => setPlatformOpen(false)}
                            className="block hover:text-[#0C241D] hover:translate-x-0.5 transition-all"
                          >
                            Sage 50 & Local EU
                          </Link>
                        </div>
                      </div>

                      <Link
                        href="/services/hr-it-audit"
                        onClick={() => setPlatformOpen(false)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#81D8D0] hover:text-[#0C241D] transition-colors mt-6 pt-2 border-t border-gray-50"
                      >
                        <span>Explore Payroll</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Column 4: Platform highlights (Dark / Deep Card) */}
                    <div className="col-span-3 bg-gradient-to-br from-[#1C122C] via-[#141A24] to-[#0C241D] text-white rounded-2xl p-4.5 flex flex-col justify-between shadow-md">
                      <div>
                        <div className="text-xs font-bold text-white mb-3.5 tracking-wide">
                          Platform highlights
                        </div>

                        <div className="space-y-2">
                          {/* Highlight 1 */}
                          <Link
                            href="/tool-finder"
                            onClick={() => setPlatformOpen(false)}
                            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-2.5 text-xs font-semibold text-white transition-all group"
                          >
                            <div className="w-6 h-6 rounded-lg bg-[#81D8D0] text-black flex items-center justify-center shrink-0">
                              <Play className="w-3 h-3 fill-current ml-0.5" />
                            </div>
                            <span className="group-hover:text-[#81D8D0] transition-colors">
                              Take a 2 minute tour
                            </span>
                          </Link>

                          {/* Highlight 2 */}
                          <Link
                            href="/services/scheinselbststaendigkeit"
                            onClick={() => setPlatformOpen(false)}
                            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-2.5 text-xs font-semibold text-white transition-all group"
                          >
                            <ShieldCheck className="w-4 h-4 text-[#81D8D0] shrink-0" />
                            <span className="group-hover:text-[#81D8D0] transition-colors">
                              Security & Compliance
                            </span>
                          </Link>

                          {/* Highlight 3 */}
                          <Link
                            href="/services/hr-it-integrations"
                            onClick={() => setPlatformOpen(false)}
                            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-2.5 text-xs font-semibold text-white transition-all group"
                          >
                            <Compass className="w-4 h-4 text-[#81D8D0] shrink-0" />
                            <span className="group-hover:text-[#81D8D0] transition-colors">
                              Integrations & Marketplace
                            </span>
                          </Link>

                          {/* Highlight 4 */}
                          <Link
                            href="/insights/blog"
                            onClick={() => setPlatformOpen(false)}
                            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-2.5 text-xs font-semibold text-white transition-all group"
                          >
                            <Megaphone className="w-4 h-4 text-[#81D8D0] shrink-0" />
                            <span className="group-hover:text-[#81D8D0] transition-colors">
                              Quarterly Product Updates
                            </span>
                          </Link>

                          {/* Highlight 5 */}
                          <Link
                            href="/tool-finder"
                            onClick={() => setPlatformOpen(false)}
                            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-[#81D8D0]/40 rounded-xl p-2.5 text-xs font-semibold text-white transition-all group"
                          >
                            <Sparkles className="w-4 h-4 text-[#81D8D0] shrink-0" />
                            <span className="group-hover:text-[#81D8D0] transition-colors">
                              AI at Scaliify
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Solutions */}
          <Link
            href="/services"
            className="hover:text-white transition-colors px-2 py-1"
          >
            Solutions
          </Link>

          {/* 3. HR Tool Finder */}
          <Link
            href="/tool-finder"
            className="hover:text-white transition-colors px-2 py-1"
          >
            HR Tool Finder
          </Link>

          {/* 4. Resources / Insights Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setInsightsOpen(true)}
            onMouseLeave={() => setInsightsOpen(false)}
          >
            <button
              onClick={() => setInsightsOpen(!insightsOpen)}
              className="flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none px-2 py-1"
            >
              <span>Resources</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${
                  insightsOpen ? "text-white rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {insightsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                  className="absolute top-full left-0 w-60 bg-white text-gray-900 rounded-2xl border border-gray-100 shadow-xl p-3 mt-1 z-50 origin-top-left"
                >
                  <Link
                    href="/insights/blog"
                    onClick={() => setInsightsOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
                  >
                    Blog & Articles
                  </Link>
                  <Link
                    href="/insights/guides"
                    onClick={() => setInsightsOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
                  >
                    Guides & Checklists
                  </Link>
                  <Link
                    href="/insights/resources"
                    onClick={() => setInsightsOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
                  >
                    HR Resources & Templates
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 5. About */}
          <Link
            href="/about"
            className="hover:text-white transition-colors px-2 py-1"
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 px-4 sm:px-6 py-5 space-y-4 rounded-b-2xl sm:rounded-b-3xl overflow-y-auto max-h-[calc(100vh-80px)] shadow-2xl text-gray-900"
          >
            {/* Mobile Platform Dropdown Section */}
            <div className="border-b border-gray-100 pb-3">
              <button
                onClick={() => setPlatformOpen(!platformOpen)}
                className="flex items-center justify-between w-full text-left font-bold text-gray-900 py-2 text-base"
              >
                <span>Platform</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    platformOpen ? "rotate-180 text-[#81D8D0]" : ""
                  }`}
                />
              </button>

              {platformOpen && (
                <div className="mt-3 space-y-4 text-sm text-gray-700 pl-1">
                  {/* Core HR */}
                  <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
                    <div className="font-bold text-gray-900 text-[13px] mb-0.5">Core HR</div>
                    <div className="text-[11px] text-gray-500 mb-2">Your foundation for HR productivity</div>
                    <div className="space-y-1.5 pl-2 border-l border-gray-200 text-xs">
                      <Link href="/services/hr-it-selection" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">Onboarding & Offboarding</Link>
                      <Link href="/services/implementation-optimisation" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">Time Tracking</Link>
                      <Link href="/services/hr-it-audit" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">Absence Management</Link>
                      <Link href="/services/hr-it-integrations" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">People Analytics</Link>
                      <Link href="/tool-finder" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">AI Assistant</Link>
                    </div>
                  </div>

                  {/* Grow your platform */}
                  <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
                    <div className="font-bold text-gray-900 text-[13px] mb-0.5">+ Grow your platform</div>
                    <div className="text-[11px] text-gray-500 mb-2">Add the tools you need to scale</div>
                    <div className="space-y-1.5 pl-2 border-l border-gray-200 text-xs">
                      <div className="text-[10px] font-bold text-gray-400 uppercase pt-1">Talent Management</div>
                      <Link href="/services/hr-it-selection" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 hover:text-black">Recruiting</Link>
                      <Link href="/services/implementation-optimisation" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 hover:text-black">Performance & Development</Link>
                      <div className="text-[10px] font-bold text-gray-400 uppercase pt-1">Governance</div>
                      <Link href="/services/scheinselbststaendigkeit" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 hover:text-black">Whistleblowing</Link>
                      <Link href="/services/interim-management" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 hover:text-black">Employer of Record</Link>
                    </div>
                  </div>

                  {/* Pay your people */}
                  <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
                    <div className="font-bold text-gray-900 text-[13px] mb-0.5">+ Pay your people</div>
                    <div className="text-[11px] text-gray-500 mb-2">Run payroll with connected data</div>
                    <div className="space-y-1.5 pl-2 border-l border-gray-200 text-xs">
                      <Link href="/services/outsourced-hr" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">Preliminary Payroll</Link>
                      <Link href="/services/hr-it-integrations" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black">Xero & DATEV Sync</Link>
                    </div>
                  </div>

                  {/* Mobile Platform Highlights Card */}
                  <div className="bg-gradient-to-br from-[#1C122C] to-[#0C241D] text-white rounded-xl p-4 space-y-2">
                    <div className="text-xs font-bold text-white mb-2">Platform highlights</div>
                    <Link
                      href="/tool-finder"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 bg-white/10 rounded-lg p-2 text-xs font-semibold text-white"
                    >
                      <div className="w-5 h-5 rounded-md bg-[#81D8D0] text-black flex items-center justify-center">
                        <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                      </div>
                      <span>Take a 2 minute tour</span>
                    </Link>
                    <Link
                      href="/services/scheinselbststaendigkeit"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 bg-white/10 rounded-lg p-2 text-xs font-semibold text-white"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#81D8D0]" />
                      <span>Security & Compliance</span>
                    </Link>
                    <Link
                      href="/tool-finder"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 bg-white/10 rounded-lg p-2 text-xs font-semibold text-white"
                    >
                      <Sparkles className="w-4 h-4 text-[#81D8D0]" />
                      <span>AI at Scaliify</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-gray-900 py-2 text-base hover:text-gray-600 transition-colors"
            >
              Solutions
            </Link>

            <Link
              href="/tool-finder"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-gray-900 py-2 text-base hover:text-gray-600 transition-colors"
            >
              HR Tool Finder
            </Link>

            {/* Mobile Resources Dropdown */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setInsightsOpen(!insightsOpen)}
                className="flex items-center justify-between w-full text-left font-bold text-gray-900 py-2 text-base"
              >
                <span>Resources</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    insightsOpen ? "rotate-180 text-gray-900" : ""
                  }`}
                />
              </button>
              {insightsOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200 text-xs text-gray-600">
                  <Link href="/insights/blog" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-gray-900">Blog & Articles</Link>
                  <Link href="/insights/guides" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-gray-900">Guides & Checklists</Link>
                  <Link href="/insights/resources" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-gray-900">HR Resources</Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-gray-900 py-2 text-base hover:text-gray-600 transition-colors"
            >
              About
            </Link>

            {/* Bottom Mobile CTAs */}
            <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center font-semibold text-gray-700 py-2 hover:text-gray-900 text-sm"
              >
                Log In
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#81D8D0] text-black font-bold py-3.5 rounded-full text-sm active:scale-[0.98] transition-transform shadow-sm"
              >
                <span>Book your demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
