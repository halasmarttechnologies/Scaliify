"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FADE_UP } from "@/lib/motion";

export function CTA() {
  const t = useTranslations("cta");

  return (
    <section className="w-full py-32 sm:py-40 px-4 md:px-8 bg-black text-white text-center flex flex-col items-center justify-center relative overflow-hidden">
      {/* Soft radial background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        {...FADE_UP}
        whileInView={FADE_UP.animate}
        viewport={FADE_UP.viewport}
        className="max-w-4xl flex flex-col items-center gap-8"
      >
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight">
          {t("headingPart1")} <br />
          {t("headingPart2")}
          <span className="text-brand-teal">{t("headingPart3")}</span>
        </h2>
        <p className="text-lg sm:text-2xl text-gray-400 max-w-2xl leading-relaxed">
          {t("subtitle")}
        </p>
        <Link
          href="/contact"
          className="group relative inline-flex items-center justify-center mt-4 px-10 sm:px-12 h-14 sm:h-16 rounded-full bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep text-brand-dark text-base sm:text-xl font-extrabold border border-white/70 shadow-[0_2px_15px_rgba(129,216,208,0.55)] hover:shadow-[0_4px_24px_rgba(129,216,208,0.85)] hover:scale-[1.03] active:scale-[0.98] transition-all overflow-hidden"
        >
          <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
          <span className="relative z-10">{t("button")}</span>
        </Link>
      </motion.div>
    </section>
  );
}
