"use client";

import Link from "next/link";
import Image from "next/image";

interface NavBrandLogoProps {
  isScrolled: boolean;
}

export function NavBrandLogo({ isScrolled }: NavBrandLogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center">
        {/* White logo for dark / scrolled navbar background */}
        <Image
          src="/company logo/whitelogo.png"
          alt="Scaliify Logo"
          fill
          unoptimized
          className={`object-contain transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          priority
        />
        {/* Standard colored/dark logo for white navbar */}
        <Image
          src="/company logo/logo.png"
          alt="Scaliify Logo"
          fill
          unoptimized
          className={`object-contain transition-opacity duration-300 ${
            isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          priority
        />
      </div>
      <span
        className={`font-extrabold text-base sm:text-lg tracking-tight transition-colors ${
          isScrolled
            ? "text-white group-hover:text-brand-teal"
            : "text-gray-900 group-hover:text-brand-dark"
        }`}
      >
        Scaliify
      </span>
    </Link>
  );
}
