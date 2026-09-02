"use client";

import { useTranslations } from "next-intl";
import { CompanyLogo } from "@/components/ui/CompanyLogo";

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const COMPANIES = [
  { id: "softwareone", name: "SoftwareOne", colSpan: false },
  { id: "westbridge",  name: "Westbridge",  colSpan: false },
  { id: "krones",      name: "KRONES AG",   colSpan: false },
  { id: "symrise",     name: "symrise",     colSpan: false },
  { id: "tiemeyer",    name: "TIEMEYER",    colSpan: true  },
] as const;

type CompanyId = (typeof COMPANIES)[number]["id"];

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export function HeroTrustBar() {
  const t = useTranslations("heroTrustBar");

  return (
    <div className="mt-14 sm:mt-16 w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 pt-8 border-t border-white/10 text-center">
      {COMPANIES.map(({ id, name, colSpan }) => (
        <div
          key={id}
          className={colSpan ? "flex flex-col items-center col-span-2 sm:col-span-1" : "flex flex-col items-center"}
        >
          <div className="flex items-center gap-2 mb-1">
            <CompanyLogo id={id} className="w-5 h-5" />
            <span className="font-bold text-base sm:text-lg tracking-tight text-white">{name}</span>
          </div>
          <p className="text-xs text-gray-300 font-medium">
            {t(`${id}.employees` as `${CompanyId}.employees`)}
          </p>
          <p className="text-[11px] text-brand-teal">
            {t(`${id}.metric` as `${CompanyId}.metric`)}
          </p>
        </div>
      ))}
    </div>
  );
}
