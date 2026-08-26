"use client";

import { useEffect, useRef } from "react";
import { companies } from "@/data/companies";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CompanyLogo } from "@/components/ui/CompanyLogo";

export { CompanyLogo };

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
    <section ref={sectionRef} id="companies" className="w-full bg-[#fafafa] py-10 sm:py-16 px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Heading matching screenshot */}
        <h2 
          ref={headingRef}
          className="text-xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 text-center mb-6 sm:mb-12 px-2"
        >
          Trusted by growing teams worldwide
        </h2>

        {/* Clean Logo Grid - 15 cards (3 rows of 5 on desktop) */}
        <div ref={gridRef} className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 max-w-[1240px]">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 hover:border-gray-300 transition-colors py-3 px-3 sm:py-4 sm:px-5 flex items-center gap-2 sm:gap-3 cursor-default select-none group min-h-[54px] sm:min-h-[64px]"
            >
              <CompanyLogo id={company.id} />
              <span className="font-semibold text-xs sm:text-[15px] text-gray-900 tracking-tight group-hover:text-black transition-colors truncate">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
