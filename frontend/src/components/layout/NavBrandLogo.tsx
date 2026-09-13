"use client";

import Link from "next/link";

interface NavBrandLogoProps {
  isScrolled: boolean;
}

export function NavBrandLogo({ isScrolled }: NavBrandLogoProps) {
  return (
    <Link href="/" className="flex items-center group shrink-0">
      <span
        className={`font-extrabold text-lg sm:text-xl tracking-tight transition-colors ${
          isScrolled
            ? "text-white group-hover:text-brand-teal"
            : "text-gray-900 group-hover:text-brand-dark"
        }`}
      >
        scaliify
      </span>
    </Link>
  );
}

