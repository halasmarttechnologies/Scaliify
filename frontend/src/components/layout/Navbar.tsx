"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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
        {/* Brand Logo matching screenshot style */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#81D8D0] flex items-center justify-center text-[#0c241d]">
            {/* 4-leaf geometric icon like reference */}
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
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
          {/* Services Dropdown */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none">
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${servicesOpen ? 'text-white rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className="absolute top-full left-0 w-72 bg-white text-gray-900 rounded-2xl border border-gray-200 p-3 mt-1 shadow-xl z-50 origin-top-left"
                >
                  <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    HR Technology
                  </div>
                  <Link
                    href="/services/hr-it-selection"
                    onClick={() => setServicesOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
                  >
                    HR IT Selection
                  </Link>
                  <Link
                    href="/services/implementation-optimisation"
                    onClick={() => setServicesOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
                  >
                    Implementation & Optimisation
                  </Link>
                  <Link
                    href="/services/hr-it-integrations"
                    onClick={() => setServicesOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
                  >
                    HR IT Integrations
                  </Link>
                  <Link
                    href="/services/hr-it-audit"
                    onClick={() => setServicesOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
                  >
                    HR IT Audit
                  </Link>

                  <div className="h-px bg-gray-200 my-2" />

                  <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Advisory & Leadership
                  </div>
                  <Link
                    href="/services/interim-management"
                    onClick={() => setServicesOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
                  >
                    Interim Management
                  </Link>
                  <Link
                    href="/services/outsourced-hr"
                    onClick={() => setServicesOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
                  >
                    Outsourced HR Management
                  </Link>
                  <Link
                    href="/services/hr-advisory"
                    onClick={() => setServicesOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
                  >
                    HR Advisory
                  </Link>
                  <Link
                    href="/services/scheinselbststaendigkeit"
                    onClick={() => setServicesOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
                  >
                    Scheinselbstständigkeit
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/tool-finder" className="hover:text-white transition-colors">
            HR Tool Finder
          </Link>

          <Link href="/case-studies" className="hover:text-white transition-colors">
            Case Studies
          </Link>

          <Link href="/about" className="hover:text-white transition-colors">
            About Us
          </Link>

          {/* Insights Dropdown */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setInsightsOpen(true)}
            onMouseLeave={() => setInsightsOpen(false)}
          >
            <button className="flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none">
              <span>Insights</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${insightsOpen ? 'text-white rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {insightsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className="absolute top-full left-0 w-56 bg-white text-gray-900 rounded-2xl border border-gray-200 p-3 mt-1 shadow-xl z-50 origin-top-left"
                >
                  <Link
                    href="/insights/blog"
                    onClick={() => setInsightsOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
                  >
                    Blog
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
                    HR Resources
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden lg:flex items-center gap-2 bg-[#81D8D0] text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-white transition-all shadow-sm"
          >
            <span>Let&apos;s Talk</span>
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

      {/* Mobile Drawer Menu with Smooth Framer Motion Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 px-5 sm:px-6 py-5 space-y-3.5 rounded-b-2xl sm:rounded-b-3xl overflow-y-auto max-h-[calc(100vh-80px)] shadow-2xl"
          >
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between w-full text-left font-semibold text-gray-900 py-2.5 text-base"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180 text-[#81D8D0]" : ""}`} />
              </button>
              {servicesOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200 text-sm text-gray-600">
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-bold pt-1">HR Technology</div>
                  <Link href="/services/hr-it-selection" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-gray-900 transition-colors">HR IT Selection</Link>
                  <Link href="/services/implementation-optimisation" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-gray-900 transition-colors">Implementation & Optimisation</Link>
                  <Link href="/services/hr-it-integrations" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-gray-900 transition-colors">HR IT Integrations</Link>
                  <Link href="/services/hr-it-audit" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-gray-900 transition-colors">HR IT Audit</Link>
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-bold pt-2">Advisory</div>
                  <Link href="/services/interim-management" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-gray-900 transition-colors">Interim Management</Link>
                  <Link href="/services/outsourced-hr" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-gray-900 transition-colors">Outsourced HR</Link>
                  <Link href="/services/hr-advisory" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-gray-900 transition-colors">HR Advisory</Link>
                  <Link href="/services/scheinselbststaendigkeit" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-gray-900 transition-colors">Scheinselbstständigkeit</Link>
                </div>
              )}
            </div>

            <Link href="/tool-finder" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-gray-900 py-2.5 text-base hover:text-gray-600 transition-colors">
              HR Tool Finder
            </Link>
            <Link href="/case-studies" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-gray-900 py-2.5 text-base hover:text-gray-600 transition-colors">
              Case Studies
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block font-semibold text-gray-900 py-2.5 text-base hover:text-gray-600 transition-colors">
              About Us
            </Link>

            <div>
              <button
                onClick={() => setInsightsOpen(!insightsOpen)}
                className="flex items-center justify-between w-full text-left font-semibold text-gray-900 py-2.5 text-base"
              >
                <span>Insights</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${insightsOpen ? "rotate-180 text-gray-900" : ""}`} />
              </button>
              {insightsOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200 text-sm text-gray-600">
                  <Link href="/insights/blog" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-gray-900 transition-colors">Blog</Link>
                  <Link href="/insights/guides" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-gray-900 transition-colors">Guides & Checklists</Link>
                  <Link href="/insights/resources" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-gray-900 transition-colors">HR Resources</Link>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center font-medium text-gray-600 py-2.5 hover:text-gray-900 text-base"
              >
                Log In
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#81D8D0] text-[#0c241d] font-bold py-3.5 rounded-full text-base active:scale-[0.98] transition-transform"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
