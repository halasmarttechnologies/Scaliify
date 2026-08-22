"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { CompanyLogo } from "./TrustedCompanies";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.fromTo(
        leftContentRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
      );

      // Stacked sticky scroll effect: scale back & fade hero content on scroll
      if (contentRef.current && heroRef.current) {
        gsap.to(contentRef.current, {
          scale: 0.92,
          opacity: 0.4,
          y: -40,
          ease: "power1.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=600",
            scrub: 0.5,
          },
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="w-full relative bg-[#FAF9F6]">


      {/* Main Content wrapper */}
      <section ref={contentRef} className="relative z-10 w-full overflow-hidden">
        <Navbar />
        
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-10 pb-20 lg:pt-16 lg:pb-32 relative">
          <div className="flex flex-col items-center justify-center relative z-10 text-center">
            
            {/* ONLY COLUMN: Text */}
            <div ref={leftContentRef} className="flex flex-col items-center gap-6 lg:gap-8 max-w-3xl mx-auto">
              {/* Kicker */}
              <div className="flex items-center justify-center gap-4 w-full">
                <div className="h-px bg-gray-300 w-12 hidden sm:block"></div>
                <span className="text-[11px] font-bold tracking-widest text-[#81D8D0] uppercase">Strategic HR. Measurable Impact.</span>
                <div className="h-px bg-gray-300 w-12 hidden sm:block"></div>
              </div>

              {/* Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-medium text-gray-900 leading-[1.05] tracking-tight whitespace-nowrap">
                Transforming HR <br />
                Through <span className="italic text-[#0C241D]">Strategy.</span>
              </h1>

              {/* Paragraph */}
              <p className="text-gray-700 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                Scaliify is your strategic partner for all things HR. From selecting and implementing the right HR technology, to expert interim management and holistic advisory, we optimize your people operations for the future.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link href="/contact" className="inline-flex items-center gap-3 bg-[#0C241D] text-white hover:bg-gray-800 font-medium px-8 py-3.5 rounded-full transition-all group shadow-md">
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link href="/services" className="inline-flex items-center gap-3 bg-white border border-gray-300 text-gray-900 hover:border-gray-400 font-medium px-6 py-3.5 rounded-full transition-all group shadow-sm">
                  <div className="w-6 h-6 rounded-full border border-gray-900 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    <Play className="w-2.5 h-2.5 ml-0.5 fill-current" />
                  </div>
                  <span>See How We Help</span>
                </Link>
              </div>

              {/* Trusted Logos */}
              <div className="pt-12 lg:pt-20 w-full flex flex-col items-center">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6 text-center">
                  Trusted by forward-thinking organizations
                </p>
                <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="flex items-center gap-2">
                    <CompanyLogo id="softwareone" />
                    <span className="font-bold text-gray-700 text-[15px] tracking-tight">SoftwareOne</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CompanyLogo id="westbridge" />
                    <span className="font-bold text-gray-700 text-[15px] tracking-tight">Westbridge<br/><span className="text-[9px] font-normal uppercase tracking-widest text-gray-500 leading-none block">Advisory</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Fallback for Krones since we don't have exact SVG */}
                    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4l16 16M4 20L20 4" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="font-bold text-gray-700 text-[15px] tracking-wide">KRONES</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CompanyLogo id="symrise" />
                    <span className="font-bold text-gray-700 text-[15px] tracking-tight">symrise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CompanyLogo id="tiemeyer" />
                    <span className="font-bold text-gray-700 text-[15px] tracking-tight">TIEMEYER<br/><span className="text-[9px] font-normal text-gray-500 leading-none block">We mobilize.</span></span>
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
