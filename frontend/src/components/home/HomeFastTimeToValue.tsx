"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  ShieldCheck,
  Briefcase,
  Users,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

// Specialist Avatars for the 21-dot network grid
const specialistAvatars = [
  { src: "/avatars/bente.jpg", alt: "Specialist 1" },
  { src: "/avatars/catherine.jpg", alt: "Specialist 2" },
  { src: "/avatars/felix.jpg", alt: "Specialist 3" },
  { src: "/avatars/max.jpg", alt: "Specialist 4" },
  { src: "/avatars/mo.jpg", alt: "Specialist 5" },
  { src: "/avatars/pim.jpg", alt: "Specialist 6" },
  { src: "/avatars/silvia.jpg", alt: "Specialist 7" },
  { src: "/avatars/catherine.jpg", alt: "Specialist 8" },
  { src: "/avatars/bente.jpg", alt: "Specialist 9" },
  { src: "/avatars/mo.jpg", alt: "Specialist 10" },
  { src: "/avatars/silvia.jpg", alt: "Specialist 11" },
  { src: "/avatars/felix.jpg", alt: "Specialist 12" },
  { src: "/avatars/max.jpg", alt: "Specialist 13" },
  { src: "/avatars/pim.jpg", alt: "Specialist 14" },
  { src: "/avatars/felix.jpg", alt: "Specialist 15" },
  { src: "/avatars/silvia.jpg", alt: "Specialist 16" },
  { src: "/avatars/bente.jpg", alt: "Specialist 17" },
  { src: "/avatars/catherine.jpg", alt: "Specialist 18" },
  { src: "/avatars/mo.jpg", alt: "Specialist 19" },
  { src: "/avatars/pim.jpg", alt: "Specialist 20" },
  { src: "/avatars/max.jpg", alt: "Specialist 21" },
];

export function HomeFastTimeToValue() {
  const t = useTranslations("fastTimeToValue");
  return (
    <section className="w-full bg-gradient-to-b from-white via-[#81D8D0]/15 to-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100 relative overflow-hidden">
      {/* Soft Tiffany Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[radial-gradient(circle,rgba(129,216,208,0.30)_0%,transparent_70%)] pointer-events-none blur-3xl -z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] mb-3">
            {t("kicker")}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 leading-tight mb-3">
            {t("headingPart1")}<br className="hidden sm:inline" /> {t("headingPart2")}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Timeline Badges with Horizontal Progress Connector */}
        <div className="relative mb-6 hidden md:block max-w-4xl mx-auto">
          {/* Background Track Line */}
          <div className="absolute top-1/2 left-16 right-16 -translate-y-1/2 h-[2px] bg-gray-200 -z-0" />
          {/* Active Progress Gradient Line in Brand Teal */}
          <div className="absolute top-1/2 left-16 right-16 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#81D8D0]/40 via-[#5BC7BC] to-[#05434B] -z-0" />

          <div className="grid grid-cols-3 gap-6 text-center relative z-10">
            {/* Glossy Shiny Tiffany Blue Pill 1 */}
            <div className="flex justify-center">
              <span className="relative inline-flex items-center justify-center px-6 py-1.5 rounded-full text-xs font-extrabold text-[#05434B] bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_4px_16px_rgba(129,216,208,0.55)] border border-white/80 overflow-hidden">
                <span className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
                <span className="relative z-10 font-extrabold tracking-tight">Week 1</span>
              </span>
            </div>

            {/* Glossy Shiny Tiffany Blue Pill 2 */}
            <div className="flex justify-center">
              <span className="relative inline-flex items-center justify-center px-6 py-1.5 rounded-full text-xs font-extrabold text-[#05434B] bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_4px_16px_rgba(129,216,208,0.55)] border border-white/80 overflow-hidden">
                <span className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
                <span className="relative z-10 font-extrabold tracking-tight">Week 2</span>
              </span>
            </div>

            {/* Glossy Shiny Tiffany Blue Pill 3 */}
            <div className="flex justify-center">
              <span className="relative inline-flex items-center justify-center px-6 py-1.5 rounded-full text-xs font-extrabold text-[#05434B] bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_4px_16px_rgba(129,216,208,0.55)] border border-white/80 overflow-hidden">
                <span className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
                <span className="relative z-10 font-extrabold tracking-tight">Week 10</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-10">
          {/* Card 1: Hit the ground running */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 hover:border-[#81D8D0]/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[420px] transition-all duration-300">
            <div>
              <div className="md:hidden mb-3">
                <span className="relative inline-flex items-center justify-center px-4 py-0.5 rounded-full text-[11px] font-extrabold text-[#05434B] bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-xs border border-white/80">
                  Week 1
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-950 mb-5">
                {t("card1Heading")}
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-[13px] text-gray-700 leading-relaxed font-medium">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#81D8D0]/30 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t("card1Check1")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#81D8D0]/30 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t("card1Check2")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#81D8D0]/30 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t("card1Check3")}</span>
                </li>
              </ul>
            </div>

            {/* Bottom Visual: 21 Specialist Avatar Dots Grid */}
            <div className="pt-8 border-t border-gray-100 mt-6">
              <div className="grid grid-cols-7 gap-1.5 justify-items-center">
                {specialistAvatars.map((avatar, idx) => (
                  <div
                    key={idx}
                    className="w-7 h-7 rounded-full overflow-hidden relative border border-gray-200 bg-gray-100 shrink-0 shadow-2xs"
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Implement together */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 hover:border-[#81D8D0]/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[420px] transition-all duration-300">
            <div>
              <div className="md:hidden mb-3">
                <span className="relative inline-flex items-center justify-center px-4 py-0.5 rounded-full text-[11px] font-extrabold text-[#05434B] bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-xs border border-white/80">
                  Week 2
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-950 mb-5">
                {t("card2Heading")}
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-[13px] text-gray-700 leading-relaxed font-medium">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#81D8D0]/30 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t("card2Check1")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#81D8D0]/30 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t("card2Check2")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#81D8D0]/30 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t("card2Check3")}</span>
                </li>
              </ul>
            </div>

            {/* Bottom Visual: Leader Avatar + Professional Action Icons */}
            <div className="pt-8 border-t border-gray-100 mt-6 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-white shadow-sm shrink-0">
                <Image
                  src="/avatars/silvia.jpg"
                  alt="Senior People Lead"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#5BC7BC] via-[#81D8D0] to-[#A8F5EE] text-[#05434B] flex items-center justify-center shadow-xs border border-white/60">
                <Briefcase className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#5BC7BC] via-[#81D8D0] to-[#A8F5EE] text-[#05434B] flex items-center justify-center shadow-xs border border-white/60">
                <Users className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#5BC7BC] via-[#81D8D0] to-[#A8F5EE] text-[#05434B] flex items-center justify-center shadow-xs border border-white/60">
                <BarChart3 className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>
          </div>

          {/* Card 3: Launch with confidence (Deep Brand Dark Spruce) */}
          <div className="bg-gradient-to-br from-[#05434B] via-[#032e35] to-[#011e23] text-white rounded-3xl p-6 sm:p-7 shadow-[0_12px_35px_rgba(5,67,75,0.25)] border border-[#81D8D0]/25 flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="md:hidden mb-3">
                <span className="relative inline-flex items-center justify-center px-4 py-0.5 rounded-full text-[11px] font-extrabold text-[#05434B] bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-xs border border-white/80">
                  Week 10
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-5">
                {t("card3Heading")}
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-[13px] text-gray-100 leading-relaxed font-medium">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#81D8D0]/25 text-[#81D8D0] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t("card3Check1")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#81D8D0]/25 text-[#81D8D0] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t("card3Check2")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#81D8D0]/25 text-[#81D8D0] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t("card3Check3")}</span>
                </li>
              </ul>
            </div>

            {/* Bottom Visual: Leader Avatar + Clean Professional Status Badge */}
            <div className="pt-8 border-t border-white/15 mt-6 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden relative border border-white/40 shadow-xs shrink-0">
                <Image
                  src="/avatars/max.jpg"
                  alt="Operations Lead"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="bg-white text-gray-900 rounded-full px-4 py-1.5 text-xs font-bold flex items-center gap-2 shadow-sm border border-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#05434B] stroke-[2.5]" />
                <span>{t("opsStable")}</span>
                <span className="text-gray-500 font-medium text-[11px] hidden xl:inline">{t("payAsYouGo")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pill Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-[#81D8D0]/20 text-[#05434B] border border-[#81D8D0]/50 px-4 py-1.5 rounded-full text-xs font-bold shadow-2xs">
            <div className="w-4 h-4 rounded-full bg-[#05434B] text-[#81D8D0] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-2.5 h-2.5" />
            </div>
            <span>{t("bottomBadge")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
