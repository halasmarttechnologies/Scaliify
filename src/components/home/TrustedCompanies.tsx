"use client";

import { useEffect, useRef } from "react";
import { companies } from "@/data/companies";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Custom SVG Logo Marks for each company
function CompanyLogo({ id }: { id: string }) {
  switch (id) {
    case "softwareone":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#6366F1" fillOpacity="0.15" stroke="#4F46E5" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 2v20M3 7l9 5 9-5" stroke="#4F46E5" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "westbridge":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 17C6 11 10 7 12 7s6 4 9 10" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <path d="M7 17C9 13 11 11 12 11s3 2 5 6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="5" r="1.5" fill="#059669" />
        </svg>
      );
    case "krones":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="12" r="6" stroke="#2563EB" strokeWidth="1.8" />
          <circle cx="15" cy="12" r="6" stroke="#1D4ED8" strokeWidth="1.8" strokeDasharray="3 2" />
          <circle cx="12" cy="12" r="2" fill="#2563EB" />
        </svg>
      );
    case "symrise":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C8.5 7.5 5 11.5 5 15a7 7 0 0014 0c0-3.5-3.5-7.5-7-12z" fill="#F43F5E" fillOpacity="0.2" stroke="#E11D48" strokeWidth="1.5" />
          <path d="M12 8c-2 2.5-4 4.8-4 7a4 4 0 008 0c0-2.2-2-4.5-4-7z" fill="#E11D48" />
        </svg>
      );
    case "tiemeyer":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="3" stroke="#DC2626" strokeWidth="1.6" />
          <path d="M7 10h10M12 10v6" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "tscnet":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" fill="#0891B2" fillOpacity="0.15" />
          <path d="M13 3L6 14h5l-1 7 7-11h-5l1-7z" fill="#0891B2" />
        </svg>
      );
    case "takkt":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="7" height="7" rx="1.5" fill="#4F46E5" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" fill="#818CF8" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" fill="#818CF8" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" fill="#4F46E5" />
        </svg>
      );
    case "think-cell":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="12" width="3.5" height="8" rx="1" fill="#0D9488" />
          <rect x="10.25" y="8" width="3.5" height="12" rx="1" fill="#14B8A6" />
          <rect x="16.5" y="4" width="3.5" height="16" rx="1" fill="#2DD4BF" />
        </svg>
      );
    case "idnow":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3l7 3.5v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10v-5L12 3z" fill="#7C3AED" fillOpacity="0.15" stroke="#7C3AED" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9.5 12l2 2 3.5-3.5" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "trb-chemedica":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="#0284C7" strokeWidth="1.5" />
          <path d="M12 7v10M7 12h10" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "icig":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4l6 3.5v7L12 18l-6-3.5v-7L12 4z" stroke="#334155" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="12" cy="11" r="2.5" fill="#334155" />
        </svg>
      );
    case "harrer":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19L12 5l8 14H4z" stroke="#D97706" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8 15h8M12 9v6" stroke="#D97706" strokeWidth="1.4" />
        </svg>
      );
    case "amsilk":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 18C8 12 10 6 12 6s4 6 6 12" stroke="#C026D3" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 14c2-3 3-5 4-5s2 2 4 5" stroke="#E879F9" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="18" r="1.5" fill="#C026D3" />
        </svg>
      );
    case "st-engineering":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 14l8-9 8 9-8 4-8-4z" fill="#1E40AF" fillOpacity="0.15" stroke="#1E40AF" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 5v13M7 12l5 2 5-2" stroke="#1E40AF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "armedangels":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4c-3 3-7 5-9 6 3 2 6 3 9 3s6-1 9-3c-2-1-6-3-9-6z" fill="#18181B" />
          <circle cx="12" cy="17" r="2" fill="#18181B" />
        </svg>
      );
    default:
      return (
        <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-gray-700">
          •
        </div>
      );
  }
}

export function TrustedCompanies() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Staggered logo cards reveal
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.035,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="companies" className="w-full bg-[#fafafa] py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Heading matching screenshot */}
        <h2 
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 text-center mb-8 sm:mb-12"
        >
          Trusted by growing teams worldwide
        </h2>

        {/* Clean Logo Grid - 15 cards (3 rows of 5 on desktop) */}
        <div ref={gridRef} className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-[1240px]">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-2xl border border-gray-200/80 hover:border-gray-300 transition-colors py-4 px-4 sm:px-5 flex items-center gap-3 cursor-default select-none group min-h-[64px]"
            >
              <CompanyLogo id={company.id} />
              <span className="font-semibold text-sm sm:text-[15px] text-gray-900 tracking-tight group-hover:text-black transition-colors truncate">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
