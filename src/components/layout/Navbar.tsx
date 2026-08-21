"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);

  return (
    <header className="w-full bg-transparent text-white z-50">
      <div className="w-full flex items-center justify-between px-6 sm:px-10 lg:px-14 py-6">
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
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-200">
          {/* Services Dropdown */}
          <div className="relative group py-2">
            <button className="flex items-center gap-1.5 hover:text-[#81D8D0] transition-colors focus:outline-none">
              <span>Services</span>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#81D8D0] group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="absolute top-full left-0 w-72 bg-white text-gray-900 rounded-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 p-3 mt-1 shadow-none z-50">
              <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                HR Technology
              </div>
              <Link
                href="/services/hr-it-selection"
                className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
              >
                HR IT Selection
              </Link>
              <Link
                href="/services/implementation-optimisation"
                className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
              >
                Implementation & Optimisation
              </Link>
              <Link
                href="/services/hr-it-integrations"
                className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
              >
                HR IT Integrations
              </Link>
              <Link
                href="/services/hr-it-audit"
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
                className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
              >
                Interim Management
              </Link>
              <Link
                href="/services/outsourced-hr"
                className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
              >
                Outsourced HR Management
              </Link>
              <Link
                href="/services/hr-advisory"
                className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
              >
                HR Advisory
              </Link>
              <Link
                href="/services/scheinselbststaendigkeit"
                className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
              >
                Scheinselbstständigkeit
              </Link>
            </div>
          </div>

          <Link href="/tool-finder" className="hover:text-[#81D8D0] transition-colors">
            HR Tool Finder
          </Link>

          <Link href="/case-studies" className="hover:text-[#81D8D0] transition-colors">
            Case Studies
          </Link>

          <Link href="/about" className="hover:text-[#81D8D0] transition-colors">
            About Us
          </Link>

          {/* Insights Dropdown */}
          <div className="relative group py-2">
            <button className="flex items-center gap-1.5 hover:text-[#81D8D0] transition-colors focus:outline-none">
              <span>Insights</span>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#81D8D0] group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="absolute top-full left-0 w-56 bg-white text-gray-900 rounded-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 p-3 mt-1 shadow-none z-50">
              <Link
                href="/insights/blog"
                className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/insights/guides"
                className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
              >
                Guides & Checklists
              </Link>
              <Link
                href="/insights/resources"
                className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-[#0c241d] transition-colors"
              >
                HR Resources
              </Link>
            </div>
          </div>
        </nav>

        {/* Right CTA / Auth area matching screenshot */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-200 hover:text-white transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#81D8D0] text-[#0c241d] hover:bg-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-150"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-200 hover:text-[#81D8D0] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a1f18] border-t border-white/10 px-6 py-6 space-y-4 rounded-b-2xl">
          <div>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center justify-between w-full text-left font-semibold text-gray-100 py-2"
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="pl-4 mt-2 space-y-2 border-l border-white/10 text-sm text-gray-300">
                <div className="text-xs uppercase tracking-wider text-[#81D8D0] font-bold pt-1">HR Technology</div>
                <Link href="/services/hr-it-selection" className="block py-1">HR IT Selection</Link>
                <Link href="/services/implementation-optimisation" className="block py-1">Implementation & Optimisation</Link>
                <Link href="/services/hr-it-integrations" className="block py-1">HR IT Integrations</Link>
                <Link href="/services/hr-it-audit" className="block py-1">HR IT Audit</Link>
                <div className="text-xs uppercase tracking-wider text-[#81D8D0] font-bold pt-2">Advisory</div>
                <Link href="/services/interim-management" className="block py-1">Interim Management</Link>
                <Link href="/services/outsourced-hr" className="block py-1">Outsourced HR</Link>
                <Link href="/services/hr-advisory" className="block py-1">HR Advisory</Link>
                <Link href="/services/scheinselbststaendigkeit" className="block py-1">Scheinselbstständigkeit</Link>
              </div>
            )}
          </div>

          <Link href="/tool-finder" className="block font-semibold text-gray-100 py-2">
            HR Tool Finder
          </Link>
          <Link href="/case-studies" className="block font-semibold text-gray-100 py-2">
            Case Studies
          </Link>
          <Link href="/about" className="block font-semibold text-gray-100 py-2">
            About Us
          </Link>

          <div>
            <button
              onClick={() => setInsightsOpen(!insightsOpen)}
              className="flex items-center justify-between w-full text-left font-semibold text-gray-100 py-2"
            >
              <span>Insights</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${insightsOpen ? "rotate-180" : ""}`} />
            </button>
            {insightsOpen && (
              <div className="pl-4 mt-2 space-y-2 border-l border-white/10 text-sm text-gray-300">
                <Link href="/insights/blog" className="block py-1">Blog</Link>
                <Link href="/insights/guides" className="block py-1">Guides & Checklists</Link>
                <Link href="/insights/resources" className="block py-1">HR Resources</Link>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/login"
              className="text-center font-medium text-gray-200 py-2 hover:text-white"
            >
              Log In
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full bg-[#81D8D0] text-[#0c241d] font-semibold py-3 rounded-full text-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
