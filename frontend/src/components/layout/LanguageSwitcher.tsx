"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { useTransition } from "react";

interface LanguageSwitcherProps {
  isScrolled?: boolean;
  variant?: "desktop" | "mobile";
}

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  de: "DE",
};

export function LanguageSwitcher({ isScrolled = false, variant = "desktop" }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2">
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => switchLocale(l)}
            disabled={isPending}
            className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              locale === l
                ? "bg-[#05434B] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {LOCALE_LABELS[l]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`hidden lg:flex items-center rounded-full border p-0.5 gap-0.5 transition-colors ${
        isScrolled
          ? "border-white/20 bg-white/5"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          disabled={isPending}
          aria-label={`Switch to ${l.toUpperCase()}`}
          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide transition-all cursor-pointer ${
            locale === l
              ? isScrolled
                ? "bg-white text-gray-900 shadow-xs"
                : "bg-[#05434B] text-white shadow-xs"
              : isScrolled
              ? "text-gray-300 hover:text-white"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
