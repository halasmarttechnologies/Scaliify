"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NavBrandLogo } from "./NavBrandLogo";
import { NavDesktopMenu } from "./NavDesktopMenu";
import { NavMobileDrawer } from "./NavMobileDrawer";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("navigation");
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
        className={`w-full lg:w-fit flex items-center justify-between lg:justify-start gap-2 lg:gap-4 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all duration-300 pointer-events-auto border shadow-lg ${
          isScrolled
            ? "bg-brand-dark/95 backdrop-blur-md border-white/20 text-white shadow-xl"
            : "bg-white text-gray-900 border-gray-200/80 shadow-md"
        } relative`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* Brand Logo */}
        <NavBrandLogo isScrolled={isScrolled} />

        {/* Center Desktop Navigation + Dropdowns */}
        <NavDesktopMenu
          isScrolled={isScrolled}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Switcher (Desktop) */}
          <LanguageSwitcher isScrolled={isScrolled} variant="desktop" />

          <Link
            href="/lets-talk"
            className="group relative hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-brand-dark bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_2px_15px_rgba(129,216,208,0.55)] border border-white/70 hover:shadow-[0_4px_22px_rgba(129,216,208,0.85)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden"
          >
            {/* Top Glossy Specular Reflection */}
            <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
            <span className="relative z-10 tracking-tight font-extrabold">{t("letsTalk")}</span>
            <ArrowRight className="relative z-10 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen((prev) => !prev);
            }}
            aria-label={t("openMenu")}
            className={`lg:hidden p-2 rounded-xl transition-colors cursor-pointer pointer-events-auto z-10 ${
              isScrolled ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Overlay */}
      <NavMobileDrawer
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileSubView={mobileSubView}
        setMobileSubView={setMobileSubView}
      />
    </header>
  );
}
