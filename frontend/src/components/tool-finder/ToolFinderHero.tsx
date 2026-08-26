"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { CompanyLogo } from "@/components/ui/CompanyLogo";

export function ToolFinderHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
      }
      if (logosRef.current) {
        gsap.fromTo(
          logosRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
        );
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollToAssessment = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById("tool-finder-tool");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={heroRef} className="w-full h-full relative bg-[#0C241D] text-white">
      {/* Main Content wrapper matching Home Hero */}
      <section ref={contentRef} className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        <Navbar />

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-20 pb-12 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-32 relative min-h-[85vh] flex flex-col justify-center">
          <div className="flex flex-col items-center justify-center relative z-10 text-center mt-2 sm:mt-4 lg:mt-6">
            <div ref={textRef} className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto w-full">
              
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-white leading-[1.15] sm:leading-[1.1] tracking-tight">
                Find the Right HR Stack <br className="hidden sm:inline" />
                For Your Organization.
              </h1>

              {/* Concise Subtitle */}
              <p className="text-gray-200 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed text-center px-2">
                Benchmark 20+ top HR platforms against your team size and payroll in under 2 minutes.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto px-4 sm:px-0">
                <button
                  onClick={scrollToAssessment}
                  className="inline-flex items-center justify-center gap-3 bg-white text-[#0C241D] hover:bg-gray-100 font-bold px-6 sm:px-8 py-3.5 rounded-full transition-all group cursor-pointer shadow-md text-sm sm:text-base w-full sm:w-auto"
                >
                  <span>Start Free Assessment</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform text-[#0C241D]" />
                </button>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-transparent text-white hover:text-[#81D8D0] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full border border-white/20 hover:border-[#81D8D0] transition-colors w-full sm:w-auto text-center"
                >
                  <span>Book Advisory Session</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trusted Logos Strip */}
              <div ref={logosRef} className="pt-4 sm:pt-6 lg:pt-8 w-full flex flex-col items-center pb-4 sm:pb-6">
                <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 sm:mb-6 text-center">
                  Trusted by forward-thinking organizations
                </p>
                <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-10 flex-wrap w-full opacity-100 transition-all duration-500 text-white fill-white">
                  <div className="flex items-center gap-2">
                    <CompanyLogo id="softwareone" />
                    <span className="font-bold text-white text-xs sm:text-[15px] tracking-tight">SoftwareOne</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CompanyLogo id="westbridge" />
                    <span className="font-bold text-white text-xs sm:text-[15px] tracking-tight">
                      Westbridge<br/>
                      <span className="text-[8px] sm:text-[9px] font-normal uppercase tracking-widest text-gray-400 leading-none block">Advisory</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4l16 16M4 20L20 4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="font-bold text-white text-xs sm:text-[15px] tracking-wide">KRONES</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CompanyLogo id="symrise" />
                    <span className="font-bold text-white text-xs sm:text-[15px] tracking-tight">symrise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CompanyLogo id="tiemeyer" />
                    <span className="font-bold text-white text-xs sm:text-[15px] tracking-tight">
                      TIEMEYER<br/>
                      <span className="text-[8px] sm:text-[9px] font-normal text-gray-400 leading-none block">We mobilize.</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
