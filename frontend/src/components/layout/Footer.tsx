"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  const servicesLinks = [
    { key: "hrItSelection", href: "/services/hr-it-selection" },
    { key: "implementationOptimisation", href: "/services/implementation-optimisation" },
    { key: "hrItIntegrations", href: "/services/hr-it-integrations" },
    { key: "interimManagement", href: "/services/interim-management" },
    { key: "outsourcedHr", href: "/services/outsourced-hr" },
    { key: "hrAdvisory", href: "/services/hr-advisory" },
  ] as const;

  const companyLinks = [
    { key: "aboutUs", href: "/about" },
    { key: "contactUs", href: "/contact" },
    { key: "letsTalk", href: "/lets-talk" },
    { key: "careers", href: "/contact" },
    { key: "blogInsights", href: "/blog" },
    { key: "pressKit", href: "/contact" },
    { key: "partners", href: "/#companies" },
  ] as const;

  const resourceLinks = [
    { key: "guidesChecklists", href: "/insights/guides" },
    { key: "hrResources", href: "/insights/resources" },
    { key: "caseStudies", href: "/case-studies" },
    { key: "hrToolFinder", href: "/tool-finder" },
    { key: "blogInsights", href: "/blog" },
  ] as const;
  return (
    <footer className="w-full bg-black text-white pt-16 sm:pt-20 pb-12 px-4 sm:px-8 lg:px-16 border-t border-white/10 relative overflow-hidden">
      {/* Background Graphic Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/3.png"
          alt=""
          fill
          className="object-cover object-top opacity-80 mix-blend-screen"
          priority={false}
        />
        {/* Subtle dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85 pointer-events-none" />
      </div>

      <div className="max-w-[1360px] mx-auto flex flex-col relative z-10">
        
        {/* Main Call-To-Action (CTA) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-12 sm:mb-24 md:mb-28 px-2"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-5 leading-tight text-center">
            {t("readySimplify")}
          </h2>
          <p className="text-gray-400 text-xs sm:text-base md:text-lg max-w-xl mb-6 sm:mb-10 leading-relaxed px-2 sm:px-0">
            {t("joinThousands")}
          </p>

          {/* CTA Pill Button (Glossy Tiffany Blue Let's Talk Style) */}
          <Link
            href="/lets-talk"
            className="group relative inline-flex items-center gap-3.5 bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep text-brand-dark font-extrabold text-sm sm:text-base pl-7 sm:pl-8 pr-3 sm:pr-3.5 py-3 rounded-full border border-white/70 shadow-[0_4px_22px_rgba(129,216,208,0.6)] hover:shadow-[0_6px_28px_rgba(129,216,208,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
          >
            {/* Top Glossy Specular Sheen */}
            <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
            <span className="relative z-10">{t("startFreeTrial")}</span>
            <div className="relative z-10 w-8 h-8 rounded-full bg-brand-dark text-brand-teal flex items-center justify-center group-hover:bg-white group-hover:text-brand-dark transition-colors shadow-xs">
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </Link>
        </motion.div>

        {/* 3. Divider Line */}
        <div className="w-full h-px bg-white/10 mb-12 sm:mb-16 md:mb-20" />

        {/* 4. Footer Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16"
        >
          
          {/* Brand Column (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-12">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 mb-6 group">
              <div className="relative h-8 sm:h-9 w-[15px] sm:w-[17px] shrink-0">
                <Image
                  src="/2(1).png"
                  alt="scaliify Logo"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white group-hover:text-brand-teal transition-colors">
                scaliify
              </span>
            </Link>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm">
              {t("tagline")}
            </p>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-white text-sm sm:text-base mb-5">{t("product")}</h3>
            <ul className="flex flex-col gap-3.5">
              {servicesLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-brand-teal transition-colors"
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white text-sm sm:text-base mb-5">{t("company")}</h3>
            <ul className="flex flex-col gap-3.5">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-brand-teal transition-colors"
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-white text-sm sm:text-base mb-5">{t("resources")}</h3>
            <ul className="flex flex-col gap-3.5">
              {resourceLinks.map((link) => (
                <li key={`res-${link.key}`}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-brand-teal transition-colors"
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </motion.div>

        {/* 5. Connect with Us Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full flex flex-col sm:flex-row items-center justify-between gap-5 mb-10 py-2"
        >
          <span className="text-white font-medium text-sm sm:text-base text-center sm:text-left">
            {t("connectWithUs")}
          </span>
          <div className="flex items-center gap-3">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/scaliify/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-black hover:bg-brand-teal hover:border-brand-teal transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/scaliify/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-black hover:bg-brand-teal hover:border-brand-teal transition-all"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* 6. Copyright & Legal Policies */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-500 text-center md:text-left">
          <p>{t("allRightsReserved", { year: new Date().getFullYear() })}</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              {t("privacyPolicy")}
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              {t("termsOfService")}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
