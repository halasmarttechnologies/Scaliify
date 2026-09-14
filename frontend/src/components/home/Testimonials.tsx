"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FADE_UP, FADE_UP_SLOW } from "@/lib/motion";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import type { ReactNode } from "react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
}

// ─────────────────────────────────────────────────────────────
// Company logo icons — data-driven with verified partners
// ─────────────────────────────────────────────────────────────

const COMPANY_ICONS: Record<string, ReactNode> = {
  Westbridge: <CompanyLogo id="westbridge" className="w-5 h-5" />,
  SoftwareOne: <CompanyLogo id="softwareone" className="w-5 h-5" />,
  "SoftwareOne Germany GmbH": <CompanyLogo id="softwareone" className="w-5 h-5" />,
  "SoftwareONE": <CompanyLogo id="softwareone" className="w-5 h-5" />,
  "Harrer Ingenieure": <CompanyLogo id="harrer" className="w-5 h-5" />,
  "Harrer Ingenieure GmbH": <CompanyLogo id="harrer" className="w-5 h-5" />,
  "TAKKT Group AG": <CompanyLogo id="takkt" className="w-5 h-5" />,
  "think-cell": <CompanyLogo id="think-cell" className="w-5 h-5" />,
  KRONES: <CompanyLogo id="krones" className="w-5 h-5" />,
  Symrise: <CompanyLogo id="symrise" className="w-5 h-5" />,
};

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function CompanyBadge({ company }: { company: string }) {
  const icon =
    COMPANY_ICONS[company] ??
    <CompanyLogo id={company.toLowerCase().replace(/[^a-z0-9]/g, "")} className="w-5 h-5" />;
  return (
    <div className="flex items-center gap-2.5 mb-5">
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="font-bold text-gray-900 tracking-tight text-[17px]">{company}</span>
    </div>
  );
}

function Avatar({ name, role }: { name: string; role: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div className="flex items-center gap-3.5 mt-auto pt-6">
      <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-600 font-semibold text-[15px] border border-gray-200">
        {initials}
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900 text-[15px] leading-tight">{name}</span>
        <span className="text-gray-500 text-sm leading-tight mt-0.5">{role}</span>
      </div>
    </div>
  );
}

function TestimonialCard({
  item,
  isLast,
}: {
  item: TestimonialItem;
  isLast: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col p-5 sm:p-8 lg:p-10",
        !isLast && "border-b md:border-b-0 md:border-r border-gray-100"
      )}
    >
      <CompanyBadge company={item.company} />
      <p className="text-gray-600 text-xs sm:text-[15px] leading-relaxed">
        &ldquo;{item.quote}&rdquo;
      </p>
      <Avatar name={item.author} role={item.title} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────

export function Testimonials() {
  const t = useTranslations("testimonials");

  const testimonials: TestimonialItem[] = (
    t.raw("items") as Array<{ quote: string; author: string; title: string; company: string }>
  ).map((item, i) => ({ id: String(i), ...item }));

  return (
    <section
      id="testimonials"
      className="w-full bg-white py-10 sm:py-16 px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          {...FADE_UP}
          whileInView={FADE_UP.animate}
          viewport={FADE_UP.viewport}
          className="flex flex-col items-center text-center mb-6 sm:mb-12 px-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-gray-900 mb-2 sm:mb-3">
            {t("heading")}
          </h2>
          <p className="text-gray-500 max-w-2xl text-xs sm:text-base">{t("subtitle")}</p>
        </motion.div>

        {/* Card grid */}
        <motion.div
          {...FADE_UP_SLOW}
          whileInView={FADE_UP_SLOW.animate}
          viewport={FADE_UP_SLOW.viewport}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-0 max-w-[1100px] bg-white rounded-2xl sm:rounded-3xl border border-gray-100 overflow-hidden shadow-sm"
        >
          {testimonials.map((item, index) => (
            <TestimonialCard
              key={item.id}
              item={item}
              isLast={index === testimonials.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
