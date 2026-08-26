"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function CoreFeatures() {
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
            stagger: 0.1,
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
      id="core-features" 
      className="w-full bg-[#fafafa] py-10 sm:py-16 px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-16"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-8 sm:mb-14 px-2">
          {/* Top Pill / Dot */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0C241D] tracking-wide mb-3 sm:mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0C241D]" />
            <span>Strategic HR Consultancy</span>
          </div>

          {/* Main Title */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 max-w-3xl leading-[1.15]">
            Your One-Stop Shop for <br className="hidden sm:inline" />
            All Things HR Related
          </h2>
        </div>

        {/* 3-Column Features Grid matching screenshot */}
        <div 
          ref={cardsRef}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch max-w-[1140px]"
        >
          
          {/* Card 1: HR Tech & Process Optimisation */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 flex flex-col justify-between border border-gray-200/70 shadow-sm min-h-[340px] sm:min-h-[380px]">
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-gray-900 tracking-tight mb-2 sm:mb-3">
                HR Tech & Process Optimisation
              </h3>
              <p className="text-gray-500 text-xs sm:text-[15px] leading-relaxed mb-6 sm:mb-8">
                From independent HR software selection and implementation to end-to-end workflow automation and process optimisation.
              </p>

              {/* Slider Indicator Pill */}
              <div className="inline-flex items-center gap-1.5 bg-[#f0f2f5] px-3 py-1.5 rounded-full">
                <span className="w-3.5 h-1.5 rounded-full bg-[#0C241D]" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              </div>
            </div>

            {/* Big Stat at Bottom */}
            <div className="pt-6 sm:pt-8">
              <div className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter leading-none mb-1">
                100+
              </div>
              <p className="text-gray-500 font-medium text-xs sm:text-sm">
                HR Transformation Projects Delivered
              </p>
            </div>
          </div>

          {/* Card 2: Visual Mountain Graphic with Metric Card */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[400px] flex flex-col justify-end p-3.5 sm:p-5 shadow-sm">
            
            {/* Scenic Background (Mountain Landscape Gradient SVG) */}
            <div className="absolute inset-0 z-0">
              <svg 
                viewBox="0 0 400 600" 
                preserveAspectRatio="xMidYMid slice" 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Sky gradient */}
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#dbeafe" />
                    <stop offset="35%" stopColor="#fed7aa" />
                    <stop offset="60%" stopColor="#fbcfe8" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </linearGradient>
                  {/* Distant mountain */}
                  <linearGradient id="mountGrad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#64748b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                  {/* Foreground mountain */}
                  <linearGradient id="mountGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#skyGrad)" />
                {/* Sun Glow */}
                <circle cx="200" cy="220" r="140" fill="#fff" opacity="0.4" filter="blur(30px)" />
                {/* Distant Mountains */}
                <path d="M0 320 L110 200 L210 290 L320 180 L400 270 L400 600 L0 600 Z" fill="url(#mountGrad1)" />
                {/* Foreground Left Mountain Ridge */}
                <path d="M-20 600 L-20 220 L160 380 L230 600 Z" fill="url(#mountGrad2)" opacity="0.95" />
                {/* Foreground Right Mountain Ridge */}
                <path d="M420 600 L420 240 L260 390 L180 600 Z" fill="url(#mountGrad2)" />
              </svg>
            </div>

            {/* Overlaid White Metric Card */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/80 shadow-lg">
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-[13px] font-bold text-gray-900">HR Operations Efficiency</span>
                <span className="text-gray-400 text-xs tracking-widest">•••</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                
                {/* Left: Score & Stars */}
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                    94%
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium">Efficiency & Satisfaction</p>
                  
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
                      d="M 10 50 A 40 40 0 0 1 82 20"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Needle */}
                    <line
                      x1="50"
                      y1="50"
                      x2="74"
                      y2="24"
                      stroke="#111827"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="50" cy="50" r="4" fill="#111827" />
                  </svg>
                </div>

              </div>

              {/* Increase Badge */}
              <div className="mt-3 bg-emerald-50 rounded-lg px-2.5 py-1 flex items-center justify-center">
                <p className="text-[11px] font-semibold text-emerald-800 text-center">
                  40% average reduction in administrative workload
                </p>
              </div>

            </div>

          </div>

          {/* Card 3: Testimonial Card */}
          <div className="bg-[#f3f4f6] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 flex flex-col justify-between border border-gray-200/50 min-h-[340px] sm:min-h-[380px]">
            
            {/* Top: Logo & Quote Marks */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                {/* Flower/Honeycomb icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="6" r="3" fill="#EA580C" />
                  <circle cx="17.2" cy="9" r="3" fill="#EA580C" />
                  <circle cx="17.2" cy="15" r="3" fill="#EA580C" />
                  <circle cx="12" cy="18" r="3" fill="#EA580C" />
                  <circle cx="6.8" cy="15" r="3" fill="#EA580C" />
                  <circle cx="6.8" cy="9" r="3" fill="#EA580C" />
                  <circle cx="12" cy="12" r="2.5" fill="#EA580C" />
                </svg>
                <span className="font-bold text-gray-900 text-sm sm:text-base">Pollinate</span>
              </div>
              
              {/* Huge quote mark */}
              <div className="text-gray-300 font-serif text-3xl sm:text-4xl leading-none select-none font-bold">
                “
              </div>
            </div>

            {/* Testimonial Quote */}
            <p className="text-gray-700 text-xs sm:text-[15px] leading-relaxed font-normal my-auto">
              Scaliify is truly our one-stop shop for all things HR. From digitalising our HR tech stack to interim leadership and strategic advisory, they gave us clarity and accelerated our growth.
            </p>

            {/* Author */}
            <div className="pt-4 sm:pt-6 mt-4 border-t border-gray-200/60">
              <p className="font-bold text-gray-900 text-xs sm:text-sm">Kathryn Murphy</p>
              <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5">CEO, Pollinate Ltd.</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
