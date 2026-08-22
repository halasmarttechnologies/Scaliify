"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play, Briefcase, Users, BarChart3, Compass } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { CompanyLogo } from "./TrustedCompanies";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.fromTo(
        leftContentRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
      );
      
      gsap.fromTo(
        rightContentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
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
      {/* 50/50 Split Background */}
      <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#0C241D] hidden lg:block origin-right z-0" />
      
      {/* Abstract green circle matching screenshot */}
      <div className="absolute top-20 right-[40%] w-[350px] h-[350px] bg-[#1a4035] rounded-full hidden lg:block opacity-50 z-0" />
      
      {/* Dot patterns */}
      <div className="absolute top-24 right-12 opacity-20 hidden lg:grid grid-cols-5 gap-3 z-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
        ))}
      </div>
      <div className="absolute bottom-24 left-[52%] opacity-20 hidden lg:grid grid-cols-4 gap-3 z-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
        ))}
      </div>

      {/* Main Content wrapper */}
      <section ref={contentRef} className="relative z-10 w-full overflow-hidden">
        <Navbar />
        
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-10 pb-20 lg:pt-16 lg:pb-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
            
            {/* LEFT COLUMN: Text */}
            <div ref={leftContentRef} className="flex flex-col gap-6 lg:gap-8 max-w-xl">
              {/* Kicker */}
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold tracking-widest text-[#81D8D0] uppercase">Strategic HR. Measurable Impact.</span>
                <div className="h-px bg-gray-300 flex-1 max-w-[120px]"></div>
              </div>

              {/* Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-medium text-gray-900 leading-[1.05] tracking-tight whitespace-nowrap">
                Transforming HR <br />
                Through <span className="italic text-[#0C241D]">Strategy.</span>
              </h1>

              {/* Paragraph */}
              <p className="text-gray-700 text-lg sm:text-xl max-w-lg leading-relaxed font-medium">
                Scaliify is your strategic partner for all things HR. From selecting and implementing the right HR technology, to expert interim management and holistic advisory, we optimize your people operations for the future.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
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
              <div className="pt-12 lg:pt-20">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6">
                  Trusted by forward-thinking organizations
                </p>
                <div className="flex items-center gap-6 sm:gap-10 flex-wrap opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
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

            {/* RIGHT COLUMN: Mockup */}
            <div className="w-full flex justify-center lg:justify-end relative mt-10 lg:mt-0">
              
              <div 
                ref={rightContentRef} 
                className="w-full max-w-[380px] bg-[#FAF9F6] rounded-[40px] p-7 relative overflow-hidden flex flex-col gap-6" 
                style={{ boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.4), inset 0 0 0 4px rgba(255,255,255,0.8)" }}
              >
                
                {/* Header */}
                <div className="flex justify-between items-start pt-2">
                  <div>
                    <p className="text-[10px] font-bold text-[#3ea89d] tracking-widest uppercase mb-1">Scalify</p>
                    <h3 className="font-bold text-gray-900 text-[22px] tracking-tight">HR Advisory Portal</h3>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-[#111827] flex items-center justify-center text-white shadow-md">
                    <Briefcase className="w-5 h-5" />
                  </div>
                </div>

                {/* Dark Score Card */}
                <div className="bg-[#102a22] rounded-[20px] p-6 text-white flex justify-between items-center shadow-lg mt-2">
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1">Welcome back</p>
                    <p className="font-semibold text-[15px] mb-2 tracking-tight">Your HR Strategy</p>
                    <p className="text-[10px] text-gray-400">3 actions pending</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-light mb-1 tracking-tighter">92%</p>
                    <p className="text-[10px] text-gray-400">HR Maturity Score</p>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Our Services</p>
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Card 1 */}
                    <div className="bg-white border border-gray-100/80 rounded-[20px] p-5 shadow-sm flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#f0f9f8] text-[#3ea89d] flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-gray-900 mb-1">HR Technology</p>
                        <p className="text-[10px] text-gray-500 leading-tight mb-3">System audits & implementation</p>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border border-gray-100/80 rounded-[20px] p-5 shadow-sm flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#f0f9f8] text-[#3ea89d] flex items-center justify-center">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-gray-900 mb-1">Process Optimisation</p>
                        <p className="text-[10px] text-gray-500 leading-tight mb-3">Streamline your HR operations</p>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border border-gray-100/80 rounded-[20px] p-5 shadow-sm flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#f0f9f8] text-[#3ea89d] flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-gray-900 mb-1">Interim Management</p>
                        <p className="text-[10px] text-gray-500 leading-tight mb-3">Expert HR leadership</p>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    </div>

                    {/* Card 4 (Dark) */}
                    <div className="bg-[#111827] text-white rounded-[20px] p-5 shadow-md flex flex-col gap-4 relative overflow-hidden">
                      <div className="w-10 h-10 rounded-full bg-[#1f2937] text-[#81D8D0] flex items-center justify-center">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div className="relative z-10">
                        <p className="text-[12px] font-bold text-white mb-1">Strategy & Advisory</p>
                        <p className="text-[10px] text-gray-400 leading-tight mb-3">Long-term HR roadmapping</p>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
                      </div>
                    </div>

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
