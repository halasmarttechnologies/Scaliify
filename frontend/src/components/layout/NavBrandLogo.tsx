"use client";

import Link from "next/link";

interface NavBrandLogoProps {
  isScrolled: boolean;
}

export function NavBrandLogo({ isScrolled }: NavBrandLogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-7 h-7 rounded-lg bg-brand-teal flex items-center justify-center text-brand-dark shadow-xs">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="7" cy="7" r="4" />
          <circle cx="17" cy="7" r="4" fillOpacity="0.75" />
          <circle cx="7" cy="17" r="4" fillOpacity="0.75" />
          <circle cx="17" cy="17" r="4" />
        </svg>
      </div>
      <span className={`font-bold text-base sm:text-lg tracking-tight transition-colors ${
        isScrolled ? "text-white group-hover:text-brand-teal" : "text-gray-900 group-hover:text-brand-dark"
      }`}>
        Scaliify
      </span>
    </Link>
  );
}
