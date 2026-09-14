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
          <path d="M7 6.5h5.4c2.8 0 4.6 1.7 4.6 4.3 0 2.7-1.8 4.4-4.6 4.4H9.6V18H7V6.5zm5.1 6.3c1.3 0 2.1-.8 2.1-1.9 0-1.1-.8-1.9-2.1-1.9H9.6v3.8h2.5z" fill="#FFFFFF" />
          <circle cx="17" cy="7" r="1.5" fill="#38BDF8" />
        </svg>
      );
    case "deel":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#11244E" />
          <path d="M6.5 17.5V6.5h5.2c3.4 0 5.8 2.3 5.8 5.5s-2.4 5.5-5.8 5.5H6.5zm3.1-2.7h2.1c1.8 0 2.9-1.2 2.9-2.8s-1.1-2.8-2.9-2.8H9.6v5.6z" fill="#2CD5C4" />
        </svg>
      );
    case "factorial":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#FF385C" />
          <circle cx="12" cy="12" r="2.2" fill="#FFFFFF" />
          <circle cx="12" cy="6.8" r="1.8" fill="#FFFFFF" />
          <circle cx="12" cy="17.2" r="1.8" fill="#FFFFFF" />
          <circle cx="7.5" cy="9.4" r="1.8" fill="#FFFFFF" />
          <circle cx="16.5" cy="9.4" r="1.8" fill="#FFFFFF" />
          <circle cx="7.5" cy="14.6" r="1.8" fill="#FFFFFF" />
          <circle cx="16.5" cy="14.6" r="1.8" fill="#FFFFFF" />
        </svg>
      );
    case "flair":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#6C47FF" />
          <path d="M12 4.5c0 4.1-3.4 7.5-7.5 7.5 4.1 0 7.5 3.4 7.5 7.5 0-4.1 3.4-7.5 7.5-7.5-4.1 0-7.5-3.4-7.5-7.5z" fill="#FFFFFF" />
        </svg>
      );
    case "leapsome":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#00C48C" />
          <path d="M8.5 8.5C6.6 8.5 5 10.1 5 12s1.6 3.5 3.5 3.5c1.4 0 2.6-.8 3.1-2h.8c.5 1.2 1.7 2 3.1 2 1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5c-1.4 0-2.6.8-3.1 2h-.8c-.5-1.2-1.7-2-3.1-2zm0 2c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5S7 12.8 7 12s.7-1.5 1.5-1.5zm7 0c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z" fill="#FFFFFF" />
        </svg>
      );
    case "shapes":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#18181B" />
          <path d="M8 16.5L12 7l4 9.5H8z" fill="#81D8D0" />
          <circle cx="15.5" cy="10" r="2" fill="#F59E0B" />
        </svg>
      );
    case "tellent-manage":
    case "tellent-grow":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#5B21B6" />
          <path d="M6.5 8.5h11v2.5h-4.2V17h-2.6v-6H6.5V8.5z" fill="#FFFFFF" />
          <circle cx="16.5" cy="15.5" r="1.8" fill="#81D8D0" />
        </svg>
      );
    case "rippling":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#F59E0B" />
          <path d="M6 10.5c2-2.5 5-2.5 7 0s5 2.5 7 0" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M6 14.5c2-2.5 5-2.5 7 0s5 2.5 7 0" stroke="#B45309" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "bayzat":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#0E7490" />
          <path d="M7 16c0-4.5 3.5-8 8-8" stroke="#38BDF8" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="11" cy="13.5" r="2.5" fill="#F43F5E" />
        </svg>
      );
    case "d-vinci":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#1E3A8A" />
          <path d="M8 7v10c0 1.5 1.5 2 3.5 2s4.5-1.5 4.5-4.5-2-4.5-4.5-4.5H9.5" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "greenhouse":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#047857" />
          <circle cx="12" cy="14" r="4.5" fill="#34D399" />
          <path d="M12 6.5C12 9.5 9.5 12 6.5 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 6.5v8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "tellent-recruitee":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#0284C7" />
          <circle cx="12" cy="12" r="5.5" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M9.5 12h5M12 9.5v5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "teamtailor":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#EC4899" />
          <path d="M7 8.5h10M10 8.5v8M14 8.5v8" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "ashby":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#EA580C" />
          <path d="M6.5 17.5l5.5-11 5.5 11h-3.2l-2.3-4.8-2.3 4.8H6.5z" fill="#FFFFFF" />
        </svg>
      );
    case "hrcast":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#7C3AED" />
          <circle cx="12" cy="13.5" r="2.5" fill="#FFFFFF" />
          <path d="M7.5 9a6 6 0 019 0" stroke="#DDD6FE" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5.5 6.5a9 9 0 0113 0" stroke="#DDD6FE" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "gradar":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#2563EB" />
          <rect x="6.5" y="12.5" width="2.5" height="4.5" rx="0.8" fill="#DBEAFE" />
          <rect x="10.7" y="9.5" width="2.5" height="7.5" rx="0.8" fill="#DBEAFE" />
          <rect x="15" y="6.5" width="2.5" height="10.5" rx="0.8" fill="#FFFFFF" />
        </svg>
      );
    case "hr-autopilot":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#0891B2" />
          <path d="M5.5 14.5l13-6-6 10-2-4.5-5 .5z" fill="#A5F3FC" />
        </svg>
      );
    case "workmotion":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#0F172A" />
          <path d="M6.5 9.5l3.5 6 2-3 2 3 3.5-6" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "zep":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#D97706" />
          <circle cx="12" cy="12.5" r="5.5" stroke="#FEF3C7" strokeWidth="1.8" />
          <path d="M12 9.5v3l2.5 1.5" stroke="#FEF3C7" strokeWidth="1.8" strokeLinecap="round" />
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
