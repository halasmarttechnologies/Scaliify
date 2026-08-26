"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ToolFinderPlatformOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards Stagger Animation
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="platform-overview" 
      className="w-full bg-white py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-10 sm:mb-14">
          {/* Top Pill */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0C241D] tracking-wide mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0C241D]" />
            <span>Independent HR Advisory</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 max-w-3xl leading-[1.15]">
            Built for how HR really works
          </h2>
        </div>

        {/* 3-Column Features Grid */}
        <div 
          ref={cardsRef}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-[1140px]"
        >
          
          {/* Card 1: Fast & Independent Selection */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between border border-gray-200/70 shadow-sm min-h-[380px]">
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-gray-900 tracking-tight mb-3">
                Independent Tool Selection
              </h3>
              <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed mb-8">
                Clear promise up front: complete in under 2 minutes, get ranked fit scores across 20+ leading platforms, 100% free with zero vendor commissions.
              </p>

              {/* Slider Indicator Pill */}
              <div className="inline-flex items-center gap-1.5 bg-[#f0f2f5] px-3 py-1.5 rounded-full">
                <span className="w-3.5 h-1.5 rounded-full bg-[#0C241D]" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              </div>
            </div>

            {/* Big Stat at Bottom */}
            <div className="pt-8 border-t border-gray-100">
              <div className="text-5xl sm:text-6xl font-black text-gray-900 tracking-tighter leading-none mb-1">
                20+
              </div>
              <p className="text-gray-500 font-medium text-sm">
                Leading HR Systems Benchmarked
              </p>
            </div>
          </div>

          {/* Card 2: Simple Scenic Landscape Image with Metric Card */}
          <div className="relative rounded-3xl overflow-hidden min-h-[380px] flex flex-col justify-end p-5 shadow-sm">
            
            {/* Clean Photographic Background */}
            <Image
              src="/images/platform-overview-lake.jpg"
              alt="Serene Alpine Landscape"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            {/* Subtle dark gradient overlay for optimal text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

            {/* Overlaid White Metric Card */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/80 shadow-lg">
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-[13px] font-bold text-gray-900">Software Match Accuracy</span>
                <span className="text-gray-400 text-xs tracking-widest">•••</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                
                {/* Left: Score & Stars */}
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                    98.4%
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium">Fit Score Precision</p>
                  
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 stroke-none" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 ml-0.5">4.9/5</span>
                  </div>
                </div>

                {/* Right: SVG Semi-Circle Gauge */}
                <div className="w-20 h-12 relative flex items-center justify-center">
                  <svg viewBox="0 0 100 60" className="w-full h-full">
                    {/* Background Track */}
                    <path
                      d="M 10 50 A 40 40 0 0 1 90 50"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Active Track */}
                    <path
                      d="M 10 50 A 40 40 0 0 1 85 20"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Needle */}
                    <line
                      x1="50"
                      y1="50"
                      x2="76"
                      y2="22"
                      stroke="#111827"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="50" cy="50" r="4" fill="#111827" />
                  </svg>
                </div>

              </div>

              {/* Increase Badge */}
              <div className="mt-3 bg-[#E8F8F6] rounded-lg px-2.5 py-1 flex items-center justify-center border border-[#81D8D0]/30">
                <p className="text-[11px] font-semibold text-[#0C241D] text-center">
                  100% Free & Independent advisory engine
                </p>
              </div>

            </div>

          </div>

          {/* Card 3: Testimonial Card */}
          <div className="bg-[#f3f4f6] rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-gray-200/50 min-h-[380px]">
            
            {/* Top: Logo & Quote Marks */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#0C241D] flex items-center justify-center text-white font-bold text-xs">
                  S
                </div>
                <span className="font-bold text-gray-900 text-base">SoftwareOne</span>
              </div>
              
              {/* Huge quote mark */}
              <div className="text-gray-300 font-serif text-4xl leading-none select-none font-bold">
                “
              </div>
            </div>

            {/* Testimonial Quote */}
            <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed font-normal my-auto">
              Scaliify’s independent HR tool finder saved us 6 months of vendor demos. We found the exact right HRIS matching our DACH compliance and DATEV payroll workflow in under 2 minutes.
            </p>

            {/* Author */}
            <div className="pt-6 mt-4 border-t border-gray-200/60">
              <p className="font-bold text-gray-900 text-sm">Janina Becker</p>
              <p className="text-gray-500 text-xs mt-0.5">Head of People & Culture, SoftwareOne</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
