"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { CompanyLogo } from "@/components/ui/CompanyLogo";

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


    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="w-full h-full relative bg-[#0C241D] text-white">


      {/* Main Content wrapper */}
      <section ref={contentRef} className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        <Navbar />
        
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-24 pb-20 lg:pt-32 lg:pb-32 relative min-h-[85vh] flex flex-col justify-center">
          <div className="flex flex-col items-center justify-center relative z-10 text-center mt-4 lg:mt-6">
            
            {/* ONLY COLUMN: Text */}
            <div ref={leftContentRef} className="flex flex-col items-center gap-6 lg:gap-8 max-w-4xl mx-auto">

              {/* Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-bold text-white leading-[1.1] tracking-tight whitespace-nowrap">
                Transforming HR <br />
                Through Strategy.
              </h1>

              {/* Paragraph */}
              <p className="text-gray-200 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed text-center">
                Scaliify is your strategic partner for all things HR.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link href="/contact" className="inline-flex items-center gap-3 bg-[#81D8D0] text-black hover:bg-white font-bold px-8 py-3.5 rounded-full transition-all group shadow-md">
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trusted Logos */}
              <div className="pt-5 lg:pt-8 w-full flex flex-col items-center pb-10">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">
                  Trusted by forward-thinking organizations
                </p>
                <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap w-full opacity-100 transition-all duration-500 text-white fill-white">
                  <div className="flex items-center gap-2">
                    <CompanyLogo id="softwareone" />
                    <span className="font-bold text-white text-[15px] tracking-tight">SoftwareOne</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CompanyLogo id="westbridge" />
                    <span className="font-bold text-white text-[15px] tracking-tight">Westbridge<br/><span className="text-[9px] font-normal uppercase tracking-widest text-gray-400 leading-none block">Advisory</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Fallback for Krones since we don't have exact SVG */}
                    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4l16 16M4 20L20 4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="font-bold text-white text-[15px] tracking-wide">KRONES</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CompanyLogo id="symrise" />
                    <span className="font-bold text-white text-[15px] tracking-tight">symrise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CompanyLogo id="tiemeyer" />
                    <span className="font-bold text-white text-[15px] tracking-tight">TIEMEYER<br/><span className="text-[9px] font-normal text-gray-400 leading-none block">We mobilize.</span></span>
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
