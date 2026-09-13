"use client";

import React from "react";
import { TextRoll } from "@/components/ui/TextRoll";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export interface SoftwareTool {
  id: string;
  name: string;
}

export const softwareList: SoftwareTool[] = [
  // HRIS
  { id: "personio", name: "Personio" },
  { id: "deel", name: "Deel" },
  { id: "factorial", name: "Factorial" },
  { id: "flair", name: "Flair" },
  { id: "leapsome", name: "Leapsome" },
  { id: "shapes", name: "Shapes" },
  { id: "tellent-manage", name: "Tellent HR Manage" },
  { id: "rippling", name: "Rippling" },
  { id: "bayzat", name: "Bayzat (MENA)" },

  // Recruiting
  { id: "d-vinci", name: "D.vinci" },
  { id: "greenhouse", name: "Greenhouse" },
  { id: "tellent-recruitee", name: "Tellent Recruitee" },
  { id: "teamtailor", name: "Teamtailor" },
  { id: "ashby", name: "Ashby" },

  // Performance
  { id: "tellent-grow", name: "Tellent HR Grow" },

  // Other (more to come!)
  { id: "hrcast", name: "HRCast" },
  { id: "gradar", name: "Gradar" },
  { id: "hr-autopilot", name: "HR Autopilot" },
  { id: "workmotion", name: "Workmotion" },
  { id: "zep", name: "ZEP" },
];

export const ToolLogo = React.memo(function ToolLogo({ id }: { id: string }) {
  switch (id) {
    case "personio":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#1B48E0" />
          <path d="M8 17V7h5c2.8 0 4.5 1.7 4.5 4s-1.7 4-4.5 4h-2.5v2H8zm3-5h2c1.1 0 1.8-.6 1.8-1.5s-.7-1.5-1.8-1.5h-2V12z" fill="#FFFFFF" />
        </svg>
      );
    case "deel":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#15357A" />
          <circle cx="12" cy="12" r="6" stroke="#2CD5C4" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.5" fill="#2CD5C4" />
        </svg>
      );
    case "factorial":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#FF3B5C" />
          <path d="M7 7h10v3h-6v2h5v3h-5v3H7V7z" fill="#FFFFFF" />
        </svg>
      );
    case "flair":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#6C47FF" />
          <circle cx="12" cy="12" r="4.5" stroke="#FFFFFF" strokeWidth="1.8" />
          <path d="M12 5v2.5M12 16.5V19M5 12h2.5M16.5 12H19" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "leapsome":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#00C48C" />
          <circle cx="9.5" cy="12" r="3.5" stroke="#FFFFFF" strokeWidth="1.6" />
          <circle cx="14.5" cy="12" r="3.5" stroke="#FFFFFF" strokeWidth="1.6" strokeDasharray="2 1.5" />
        </svg>
      );
    case "shapes":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#18181B" />
          <path d="M8 17l4-8 4 8H8z" fill="#81D8D0" />
          <circle cx="15" cy="11" r="2.5" fill="#F59E0B" />
        </svg>
      );
    case "tellent-manage":
    case "tellent-grow":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#5B21B6" />
          <path d="M7 8h10v2.5h-3.8v6.5h-2.4v-6.5H7V8z" fill="#C4B5FD" />
          <circle cx="16" cy="16" r="2" fill="#81D8D0" />
        </svg>
      );
    case "rippling":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#FBBF24" />
          <path d="M7 11.5c1.5-2.5 4-2.5 5.5 0s4 2.5 5.5 0" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7 15c1.5-2.5 4-2.5 5.5 0s4 2.5 5.5 0" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "bayzat":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#0E7490" />
          <path d="M7 17C7 11 12 7 17 7" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="10" cy="14" r="2.2" fill="#F43F5E" />
        </svg>
      );
    case "d-vinci":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#1E3A8A" />
          <path d="M8 8v8c0 1.5 1.5 2.5 3.5 2.5s5-1.5 5-4.5-2.2-4.5-5-4.5H9.5" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "greenhouse":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#047857" />
          <path d="M12 5.5c-3 3.5-5.5 6.5-5.5 9.5 0 2.8 2.5 5 5.5 5s5.5-2.2 5.5-5c0-3-2.5-6-5.5-9.5z" fill="#34D399" />
          <path d="M12 8v8" stroke="#047857" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "tellent-recruitee":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#0284C7" />
          <circle cx="12" cy="12" r="5.5" stroke="#FFFFFF" strokeWidth="1.8" />
          <path d="M9.5 12h5M12 9.5v5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "teamtailor":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#EC4899" />
          <path d="M8 8h8M12 8v8M10 12h4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "ashby":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#EA580C" />
          <path d="M7 18l5-11 5 11h-3l-2-4.5-2 4.5H7z" fill="#FFFFFF" />
        </svg>
      );
    case "hrcast":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#7C3AED" />
          <circle cx="12" cy="14" r="2" fill="#FFFFFF" />
          <path d="M8 9.5a5.5 5.5 0 018 0M6 7a8.5 8.5 0 0112 0" stroke="#DDD6FE" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "gradar":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#2563EB" />
          <path d="M7 17h2.5v-3.5H7V17zm4 0h2.5v-6H11V17zm4 0h2.5V8H15v9z" fill="#DBEAFE" />
        </svg>
      );
    case "hr-autopilot":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#0891B2" />
          <path d="M6 14l6-7 6 7-6-2.5L6 14z" fill="#A5F3FC" />
          <circle cx="12" cy="15.5" r="1.8" fill="#FFFFFF" />
        </svg>
      );
    case "workmotion":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#0F172A" />
          <path d="M7 10l3 5 2.5-3.5 2.5 3.5 3-5" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "zep":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#D97706" />
          <circle cx="12" cy="13" r="5.5" stroke="#FEF3C7" strokeWidth="1.6" />
          <path d="M12 10.5v3l2.5 1.5" stroke="#FEF3C7" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M10.5 6h3" stroke="#FEF3C7" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-gray-700">
          •
        </div>
      );
  }
});

export function SoftwareStack() {
  const t = useTranslations("softwareStack");
  return (
    <section id="software" className="w-full bg-white py-10 sm:py-16 px-3.5 sm:px-6 md:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-[1280px] mx-auto bg-brand-dark rounded-2xl sm:rounded-3xl lg:rounded-none text-white py-10 sm:py-16 md:py-24 px-4 sm:px-10 md:px-14 lg:px-16 flex flex-col items-center shadow-sm"
      >
        
        {/* Top Dot & Kicker */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-medium mb-3 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>{t("kicker")}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white text-center max-w-3xl leading-[1.15] mb-3 sm:mb-4 flex flex-col items-center justify-center mx-auto gap-1">
            <span>{t("headingPart1")}</span>
            <span>{t("headingPart2")}</span>
          </h2>

          <p className="text-gray-300 max-w-2xl text-center text-xs sm:text-base md:text-lg mb-8 sm:mb-12 leading-relaxed font-normal px-2 sm:px-0">
            {t("subtitle")}
          </p>
        </div>

        {/* Clean Logo Grid - 20 cards with logo & name */}
        <div
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5 max-w-5xl"
        >
          {softwareList.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-xl sm:rounded-2xl py-3 px-3 sm:py-3.5 sm:px-4 flex items-center gap-2 sm:gap-3 cursor-default select-none min-h-[52px] sm:min-h-[58px]"
            >
              <ToolLogo id={tool.id} />
              <span className="font-semibold text-xs sm:text-sm text-gray-900 tracking-tight truncate">
                {tool.name}
              </span>
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
