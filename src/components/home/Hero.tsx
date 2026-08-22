"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Users, BarChart3, Settings, ChevronRight, Briefcase } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Staggered entrance animation for hero elements
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1, delay: 0.1 }
      )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          phoneRef.current,
          { opacity: 0, y: 45, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out" },
          "-=0.9"
        );

      // Subtle ambient floating animation on the phone
      if (phoneRef.current) {
        gsap.to(phoneRef.current, {
          y: "-=8",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.2,
        });
      }

      // Stacked sticky scroll effect: scale back & fade hero content on scroll
      if (contentRef.current && heroRef.current) {
        gsap.to(contentRef.current, {
          scale: 0.88,
          opacity: 0.25,
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
    <div ref={heroRef} className="w-full">
      {/* Full-width Superhero Container with solid #0C241D background matching SoftwareStack */}
      <section className="w-full bg-[#0C241D] text-white relative overflow-hidden">
        <Navbar />

        {/* Hero Main Content with Stacked Scroll Ref */}
        <div 
          ref={contentRef}
          className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 pt-4 pb-12 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24 origin-top relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-8 items-center justify-items-center">
            
            {/* Left Column: Copy & Actions */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 sm:gap-7 z-10 max-w-xl lg:max-w-none">
              
              <h1 
                ref={headingRef}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] sm:leading-[1.08]"
              >
                Transforming HR <br />
                Through <span className="text-[#81D8D0]">Strategy.</span>
              </h1>

              <p 
                ref={textRef}
                className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-lg font-normal leading-relaxed"
              >
                Scaliify is your strategic partner for all things HR. From selecting and implementing the right HR technology, to expert interim management and holistic advisory, we optimize your people operations for the future.
              </p>

              {/* Action Button */}
              <div ref={ctaRef} className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-[#81D8D0] text-[#0C241D] hover:bg-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all group active:scale-95"
                >
                  <span>Book a Consultation</span>
                  <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-[#0C241D] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>

            </div>

            {/* Right Column: iPhone 17 Pro Max Mockup */}
            <div className="relative w-full flex items-center justify-center pt-2 sm:pt-0">
              
              {/* iPhone 17 Pro Max Shell */}
              <div ref={phoneRef} className="relative" style={{ width: "240px", height: "500px" }}>

                {/* Outer Frame - Titanium border */}
                <div
                  className="absolute inset-0 rounded-[42px] border-[8px] border-[#2a2a2a]"
                  style={{
                    background: "linear-gradient(145deg, #3a3a3a 0%, #1a1a1a 40%, #2e2e2e 100%)",
                    boxShadow: "inset 0 0 0 1px #444, 0 20px 60px rgba(0,0,0,0.5)",
                  }}
                />

                {/* Side buttons */}
                <div className="absolute left-[-10px] top-[88px] w-[3px] h-[30px] bg-[#2a2a2a] rounded-l-sm" />
                <div className="absolute left-[-10px] top-[128px] w-[3px] h-[50px] bg-[#2a2a2a] rounded-l-sm" />
                <div className="absolute left-[-10px] top-[188px] w-[3px] h-[50px] bg-[#2a2a2a] rounded-l-sm" />
                <div className="absolute right-[-10px] top-[128px] w-[3px] h-[72px] bg-[#2a2a2a] rounded-r-sm" />

                {/* Screen area */}
                <div
                  className="absolute rounded-[36px] overflow-hidden bg-white"
                  style={{ inset: "7px" }}
                >
                  {/* Dynamic Island */}
                  <div
                    className="absolute top-[8px] left-1/2 -translate-x-1/2 z-30 bg-black rounded-full"
                    style={{ width: "80px", height: "24px" }}
                  />

                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 right-0 h-[38px] bg-[#0C241D] z-20 flex items-end px-4 pb-1.5 justify-between">
                    <span className="text-white text-[10px] font-semibold">9:41</span>
                    <div className="flex items-center gap-1">
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="white">
                        <rect x="0" y="4" width="2" height="6" rx="0.5" opacity="0.4"/>
                        <rect x="3" y="2.5" width="2" height="7.5" rx="0.5" opacity="0.6"/>
                        <rect x="6" y="1" width="2" height="9" rx="0.5" opacity="0.8"/>
                        <rect x="9" y="0" width="2" height="10" rx="0.5"/>
                      </svg>
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="white">
                        <path d="M7 2C9.5 2 11.7 3.1 13.2 4.8L14 4C12.3 2.1 9.8 1 7 1C4.2 1 1.7 2.1 0 4L0.8 4.8C2.3 3.1 4.5 2 7 2Z" opacity="0.4"/>
                        <path d="M7 4C8.8 4 10.4 4.7 11.6 5.9L12.4 5.1C11 3.8 9.1 3 7 3C4.9 3 3 3.8 1.6 5.1L2.4 5.9C3.6 4.7 5.2 4 7 4Z" opacity="0.7"/>
                        <path d="M7 6C8.1 6 9.1 6.4 9.8 7.1L10.6 6.3C9.7 5.5 8.4 5 7 5C5.6 5 4.3 5.5 3.4 6.3L4.2 7.1C4.9 6.4 5.9 6 7 6Z"/>
                        <circle cx="7" cy="9" r="1"/>
                      </svg>
                      <svg width="22" height="10" viewBox="0 0 22 10" fill="white">
                        <rect x="0" y="1" width="18" height="8" rx="2" stroke="white" strokeWidth="1" fill="none" opacity="0.6"/>
                        <rect x="1.5" y="2.5" width="13" height="5" rx="1" fill="white"/>
                        <path d="M19.5 3.5C20.3 3.5 21 4.2 21 5C21 5.8 20.3 6.5 19.5 6.5V3.5Z" fill="white" opacity="0.6"/>
                      </svg>
                    </div>
                  </div>

                  {/* App Content - White Palette */}
                  <div className="absolute top-[38px] left-0 right-0 bottom-0 bg-[#f7f8fa] overflow-hidden">

                    {/* App Header */}
                    <div className="bg-white px-4 pt-3 pb-3 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-[8px] font-semibold tracking-widest uppercase">Scaliify</p>
                          <p className="text-gray-900 text-[13px] font-black leading-tight">HR Advisory Portal</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                          <Briefcase className="w-4 h-4 text-gray-700" />
                        </div>
                      </div>
                    </div>

                    {/* Welcome Card */}
                    <div className="mx-3 mt-3 bg-gray-900 rounded-2xl px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-[9px]">Welcome back</p>
                        <p className="text-white text-[11px] font-bold">Your HR Strategy</p>
                        <p className="text-gray-300 text-[10px] font-medium mt-0.5">3 actions pending</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[22px] font-black text-white">92%</div>
                        <div className="text-[9px] text-gray-400">HR Maturity Score</div>
                      </div>
                    </div>

                    {/* Services Grid */}
                    <div className="px-3 mt-3">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Our Services</p>
                      <div className="grid grid-cols-2 gap-2">

                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                          <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center mb-2">
                            <Settings className="w-3.5 h-3.5 text-gray-700" />
                          </div>
                          <p className="text-[10px] font-bold text-gray-900 leading-tight">HR Technology</p>
                          <p className="text-[8px] text-gray-400 mt-0.5 leading-tight">System audits & implementation</p>
                          <div className="flex items-center gap-0.5 mt-1.5">
                            <ChevronRight className="w-2.5 h-2.5 text-gray-500" />
                            <span className="text-[8px] text-gray-500 font-semibold">Explore</span>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                          <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center mb-2">
                            <BarChart3 className="w-3.5 h-3.5 text-gray-700" />
                          </div>
                          <p className="text-[10px] font-bold text-gray-900 leading-tight">Process Optimisation</p>
                          <p className="text-[8px] text-gray-400 mt-0.5 leading-tight">Streamline your HR ops</p>
                          <div className="flex items-center gap-0.5 mt-1.5">
                            <ChevronRight className="w-2.5 h-2.5 text-gray-500" />
                            <span className="text-[8px] text-gray-500 font-semibold">Explore</span>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                          <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center mb-2">
                            <Users className="w-3.5 h-3.5 text-gray-700" />
                          </div>
                          <p className="text-[10px] font-bold text-gray-900 leading-tight">Interim Management</p>
                          <p className="text-[8px] text-gray-400 mt-0.5 leading-tight">Expert HR leadership</p>
                          <div className="flex items-center gap-0.5 mt-1.5">
                            <ChevronRight className="w-2.5 h-2.5 text-gray-500" />
                            <span className="text-[8px] text-gray-500 font-semibold">Explore</span>
                          </div>
                        </div>

                        <div className="bg-gray-900 rounded-xl p-3">
                          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center mb-2">
                            <Briefcase className="w-3.5 h-3.5 text-gray-200" />
                          </div>
                          <p className="text-[10px] font-bold text-white leading-tight">Strategy & Advisory</p>
                          <p className="text-[8px] text-gray-400 mt-0.5 leading-tight">Long-term HR roadmapping</p>
                          <div className="flex items-center gap-0.5 mt-1.5">
                            <ChevronRight className="w-2.5 h-2.5 text-gray-300" />
                            <span className="text-[8px] text-gray-300 font-semibold">Explore</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Recent Milestones */}
                    <div className="px-3 mt-3">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Recent Milestones</p>
                      <div className="bg-white rounded-xl divide-y divide-gray-50 border border-gray-100">
                        {[
                          { label: "HRIS Vendor Selected", sub: "Completed this week" },
                          { label: "HR Audit Delivered", sub: "2 weeks ago" },
                          { label: "Payroll Integrated", sub: "Last month" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2.5 px-3 py-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <div>
                              <p className="text-[10px] font-semibold text-gray-800">{item.label}</p>
                              <p className="text-[8px] text-gray-400">{item.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-black/10 rounded-full" />
                </div>

              </div>
              {/* End iPhone Shell */}

            </div>

          </div>
        </div>

      </section>
    </div>
  );
}
