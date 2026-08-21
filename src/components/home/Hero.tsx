import Link from "next/link";
import { ArrowRight, Star, MoreHorizontal } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

export function Hero() {
  return (
    <div className="w-full max-w-[1536px] mx-auto p-3 sm:p-5 md:p-6 lg:p-8">
      {/* Contained Superhero Container with Rounded Corners & Side Margins/Padding */}
      <section className="w-full bg-[#0C241D] text-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden border border-black/5">
        
        {/* Navbar situated right at the top of the contained card */}
        <Navbar />

        {/* Hero Main Content */}
        <div className="w-full px-6 sm:px-10 lg:px-14 pt-6 pb-16 sm:pt-10 sm:pb-24 lg:pt-12 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-6 flex flex-col items-start gap-6 sm:gap-7 z-10">
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                Built for Teams. <br />
                Powered <span className="text-[#81D8D0]">for</span> <br />
                <span className="text-[#81D8D0]">Better HR.</span>
              </h1>

              <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-lg font-normal leading-relaxed">
                Teamora helps you hire, manage, and grow your team with powerful automation, real-time insights, and a simple dashboard all in one place.
              </p>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-[#81D8D0] text-[#0C241D] hover:bg-white font-bold text-sm sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all group"
                >
                  <span>Start Free Trial</span>
                  <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-[#0C241D] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>

              {/* Guarantees / Icons underneath */}
              <div className="flex flex-wrap items-center gap-6 pt-1 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                  <span>Free 14-day trial</span>
                </div>
              </div>

            </div>

            {/* Right Column: Exact 3 Floating Dashboard Mockup Cards (No Glows, No Shadows) */}
            <div className="lg:col-span-6 relative w-full flex items-center justify-center lg:justify-end min-h-[460px] sm:min-h-[500px]">
              
              <div className="relative w-full max-w-[480px] sm:max-w-[500px] h-[440px] sm:h-[480px]">
                
                {/* Card 1: Top-Right "Employment Status" */}
                <div className="absolute top-0 right-2 sm:right-6 w-[270px] sm:w-[290px] bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 text-gray-900 z-20">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs sm:text-sm font-bold text-gray-900">Employment Status</span>
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">128</span>
                    <span className="text-[11px] text-gray-500 ml-1.5 font-medium">Employee</span>
                  </div>

                  {/* Multi-tone Segmented Progress Bar */}
                  <div className="w-full h-2 bg-gray-100 rounded-full flex overflow-hidden">
                    <div className="h-full bg-[#0C241D]" style={{ width: "68%" }} />
                    <div className="h-full bg-[#81D8D0]" style={{ width: "15%" }} />
                    <div className="h-full bg-[#A7F3D0]" style={{ width: "10%" }} />
                    <div className="h-full bg-gray-300" style={{ width: "7%" }} />
                  </div>
                  <div className="text-[10px] text-gray-400 text-right mt-1 mb-2 font-medium">100%</div>

                  {/* Legend Grid */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-[11px]">
                    <div className="flex items-start gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0C241D] mt-1 shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Full-Time</div>
                        <div className="text-[10px] text-gray-500">68% • 87 Employees</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#81D8D0] mt-1 shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Part-Time</div>
                        <div className="text-[10px] text-gray-500">15% • 19 Employees</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#A7F3D0] mt-1 shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Freelance</div>
                        <div className="text-[10px] text-gray-500">10% • 13 Employees</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gray-300 mt-1 shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Internship</div>
                        <div className="text-[10px] text-gray-500">7% • 9 Employees</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Center-Right "Employee Satisfied" */}
                <div className="absolute top-16 sm:top-20 right-0 w-[320px] sm:w-[370px] md:w-[400px] bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 text-gray-900 z-10">
                  
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-600 mb-0.5">Employee Satisfied</div>
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-gray-900 ml-1">4.2/5</span>
                      </div>
                    </div>

                    {/* Speedometer Gauge SVG */}
                    <div className="shrink-0 w-24 h-14 relative flex items-end justify-center">
                      <svg viewBox="0 0 100 55" className="w-full h-full">
                        <path
                          d="M 10 50 A 40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 10 50 A 40 40 0 0 1 76 24"
                          fill="none"
                          stroke="#81D8D0"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <circle cx="50" cy="50" r="4.5" fill="#0C241D" />
                        <line
                          x1="50"
                          y1="50"
                          x2="70"
                          y2="28"
                          stroke="#0C241D"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Increase Banner */}
                  <div className="w-full bg-[#EBF8F2] text-[#0C241D] text-[11px] sm:text-xs font-semibold py-1.5 px-3 rounded-lg mb-3 border border-[#81D8D0]/30">
                    That&apos;s an <span className="font-bold">Increase of 6%</span> from last month
                  </div>

                  {/* Breakdown Rows */}
                  <div className="space-y-2 pt-1 border-t border-gray-100 text-[11px] sm:text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Compensation & Benefits <span className="text-gray-400 block sm:inline text-[10px]">Satisfaction</span></span>
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                        <span className="font-bold text-gray-900 ml-1">4.5/5</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Work Culture <span className="text-gray-400 block sm:inline text-[10px]">Satisfaction</span></span>
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-2.5 h-2.5 ${i < 4 ? "fill-current" : "text-gray-300"}`} />
                          ))}
                        </div>
                        <span className="font-bold text-gray-900 ml-1">4.3/5</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Work-Life Balance <span className="text-gray-400 block sm:inline text-[10px]">Satisfaction</span></span>
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-2.5 h-2.5 ${i < 4 ? "fill-current" : "text-gray-300"}`} />
                          ))}
                        </div>
                        <span className="font-bold text-gray-900 ml-1">4.1/5</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Career Growth Opportunities <span className="text-gray-400 block sm:inline text-[10px]">Satisfaction</span></span>
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                        <span className="font-bold text-gray-900 ml-1">4.9/5</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3: Bottom-Left Overlapping Card "Present" */}
                <div className="absolute bottom-4 sm:bottom-6 left-0 sm:left-2 w-[160px] sm:w-[185px] bg-white rounded-2xl border border-gray-200 overflow-hidden z-30">
                  <div className="bg-[#81D8D0] px-3.5 py-1.5 text-[#0C241D] font-bold text-xs">
                    Present
                  </div>

                  <div className="p-3 sm:p-4">
                    <div className="flex items-baseline justify-between mb-0.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">95</span>
                      <span className="text-[10px] font-bold text-[#0C241D] bg-gray-100 px-1.5 py-0.5 rounded-full border border-gray-200">
                        4+ vs yesterday
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium mb-2">
                      Employees
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-gray-100">
                      <div>
                        <span className="font-bold text-gray-900">82</span>
                        <span className="text-[10px] text-gray-500 ml-1">On-Time</span>
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">11</span>
                        <span className="text-[10px] text-gray-500 ml-1">Late</span>
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
