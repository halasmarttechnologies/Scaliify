"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

type MobileSubView = "services" | "insights" | null;

interface NavMobileDrawerProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  mobileSubView: MobileSubView;
  setMobileSubView: Dispatch<SetStateAction<MobileSubView>>;
}

export function NavMobileDrawer({
  mobileMenuOpen,
  setMobileMenuOpen,
  mobileSubView,
  setMobileSubView,
}: NavMobileDrawerProps) {
  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-4%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-4%" }}
          transition={{ type: "spring", stiffness: 400, damping: 32, mass: 0.5 }}
          className="fixed inset-0 z-[200] bg-white text-gray-900 flex flex-col justify-between overflow-hidden pointer-events-auto will-change-transform"
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
                <div className="relative w-8 h-8 shrink-0">
                  <Image
                    src="/company logo/logo.png"
                    alt="Scaliify Logo"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                  Scaliify
                </span>
              </Link>
            ) : (
              /* Sub-View Header with Back button */
              <button
                type="button"
                onClick={() => setMobileSubView(null)}
                className="flex items-center gap-2 text-base font-bold text-gray-900 hover:text-black py-1 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                <span>Back</span>
              </button>
            )}

            {/* Close (X) Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(false);
                setMobileSubView(null);
              }}
              className="p-2 -mr-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
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
                    className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 text-left hover:text-brand-dark transition-colors group cursor-pointer"
                  >
                    <span>Services</span>
                    <ChevronRight className="w-5 h-5 text-gray-900 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* HR Tool Finder Direct Link */}
                  <Link
                    href="/tool-finder"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 hover:text-brand-dark transition-colors"
                  >
                    <span>HR Tool Finder</span>
                  </Link>

                  {/* Case Studies Direct Link */}
                  <Link
                    href="/case-studies"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 hover:text-brand-dark transition-colors"
                  >
                    <span>Case Studies</span>
                  </Link>

                  {/* About Us Direct Link */}
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 hover:text-brand-dark transition-colors"
                  >
                    <span>About Us</span>
                  </Link>

                  {/* Insights Drill-down */}
                  <button
                    onClick={() => setMobileSubView("insights")}
                    className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 text-left hover:text-brand-dark transition-colors group cursor-pointer"
                  >
                    <span>Insights</span>
                    <ChevronRight className="w-5 h-5 text-gray-900 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Contact Direct Link */}
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 hover:text-brand-dark transition-colors"
                  >
                    <span>Contact</span>
                  </Link>

                  {/* Language Switcher */}
                  <button
                    type="button"
                    className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-base font-bold text-gray-900 cursor-pointer text-left"
                  >
                    <span>EN · English</span>
                    <ChevronRight className="w-5 h-5 text-gray-900 stroke-[2]" />
                  </button>
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
                  <div className="text-xl font-bold text-brand-dark pb-3 border-b border-gray-100 mb-6">
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
                        className="block hover:text-brand-teal transition-colors"
                      >
                        HR IT Selection
                      </Link>
                      <Link
                        href="/services/implementation-optimisation"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block hover:text-brand-teal transition-colors"
                      >
                        Implementation & Optimisation
                      </Link>
                      <Link
                        href="/services/hr-it-integrations"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block hover:text-brand-teal transition-colors"
                      >
                        HR IT Integrations
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
                        className="block hover:text-brand-teal transition-colors"
                      >
                        Interim Management
                      </Link>
                      <Link
                        href="/services/outsourced-hr"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block hover:text-brand-teal transition-colors"
                      >
                        Outsourced HR Management
                      </Link>
                      <Link
                        href="/services/hr-advisory"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block hover:text-brand-teal transition-colors"
                      >
                        HR Advisory
                      </Link>
                      <a
                        href="https://keine-scheinselbststaendigkeit.de/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block hover:text-brand-teal transition-colors"
                      >
                        Scheinselbstständigkeit ↗
                      </a>
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
                  <div className="text-xl font-bold text-brand-dark pb-3 border-b border-gray-100 mb-6">
                    Insights
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-gray-900 pb-2 border-b-2 border-gray-900 mb-3">
                      Knowledge & Resources
                    </h4>
                    <div className="space-y-3.5 text-[15px] font-medium text-gray-900">
                      <Link
                        href="/blog"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block hover:text-brand-teal transition-colors"
                      >
                        Blog
                      </Link>
                      <Link
                        href="/insights/guides"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block hover:text-brand-teal transition-colors"
                      >
                        Guides & Checklists
                      </Link>
                      <Link
                        href="/insights/resources"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block hover:text-brand-teal transition-colors"
                      >
                        HR Resources
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* 3. Fixed Bottom Sticky: Language Switcher + CTA */}
          <div className="p-6 pt-3 bg-white border-t border-gray-100 shrink-0 space-y-3">
            {/* Language Toggle */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Language:</span>
              <LanguageSwitcher variant="mobile" />
            </div>

            <Link
              href="/lets-talk"
              onClick={() => {
                setMobileMenuOpen(false);
                setMobileSubView(null);
              }}
              className="group relative w-full bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep text-brand-dark font-extrabold py-3.5 rounded-2xl flex items-center justify-center text-base border border-white/70 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(129,216,208,0.6)] overflow-hidden"
            >
              <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-2xl pointer-events-none" />
              <span className="relative z-10">Let&apos;s Talk</span>
              <ArrowRight className="relative z-10 w-4 h-4 ml-2" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
