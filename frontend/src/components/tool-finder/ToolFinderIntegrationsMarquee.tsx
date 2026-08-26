import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AppBadge {
  name: string;
  bg: string;
  text: string;
  label: string;
  border?: boolean;
}

export function ToolFinderIntegrationsMarquee() {
  // Row 1 App Badges
  const row1Apps: AppBadge[] = [
    { name: "ADP", bg: "bg-[#D8232A]", text: "text-white", label: "ADP" },
    { name: "Zapier", bg: "bg-[#FF4F00]", text: "text-white", label: "zapier" },
    { name: "Sendgrid", bg: "bg-[#008AE6]", text: "text-white", label: "SendGrid" },
    { name: "Circula", bg: "bg-white", text: "text-gray-900", border: true, label: "Circula" },
    { name: "Google", bg: "bg-white", text: "text-gray-900", border: true, label: "31" },
    { name: "Atlassian", bg: "bg-[#0052CC]", text: "text-white", label: "Jira" },
    { name: "Slack", bg: "bg-white", text: "text-[#4A154B]", border: true, label: "# slack" },
    { name: "Workday", bg: "bg-[#E27602]", text: "text-white", label: "workday" },
    { name: "Notion", bg: "bg-black", text: "text-white", label: "N" },
    { name: "Asana", bg: "bg-[#F06A6A]", text: "text-white", label: "asana" },
    { name: "BambooHR", bg: "bg-[#73C044]", text: "text-white", label: "bamboo" },
    { name: "Greenhouse", bg: "bg-[#00B259]", text: "text-white", label: "GH" },
    { name: "Ashby", bg: "bg-[#635BFF]", text: "text-white", label: "Ashby" },
    { name: "Calendly", bg: "bg-[#006BFF]", text: "text-white", label: "C" },
  ];

  // Row 2 App Badges
  const row2Apps: AppBadge[] = [
    { name: "Personio", bg: "bg-[#0C241D]", text: "text-[#81D8D0]", label: "Personio" },
    { name: "DATEV", bg: "bg-[#009E4D]", text: "text-white", label: "DATEV" },
    { name: "Deel", bg: "bg-[#15357A]", text: "text-white", label: "deel." },
    { name: "Factorial", bg: "bg-[#FF3B69]", text: "text-white", label: "factorial" },
    { name: "Flair", bg: "bg-[#1746A2]", text: "text-white", label: "flair" },
    { name: "Leapsome", bg: "bg-[#2563EB]", text: "text-white", label: "leapsome" },
    { name: "Workmotion", bg: "bg-[#051329]", text: "text-[#00FF87]", label: "workmotion" },
    { name: "ZEP", bg: "bg-[#1E3A8A]", text: "text-white", label: "ZEP" },
    { name: "Gradar", bg: "bg-[#4338CA]", text: "text-white", label: "gradar" },
    { name: "Teamtailor", bg: "bg-[#FF5A5F]", text: "text-white", label: "TT" },
    { name: "Rippling", bg: "bg-[#FFA000]", text: "text-black", label: "rippling" },
    { name: "Culture Amp", bg: "bg-[#FF5537]", text: "text-white", label: "CultureAmp" },
    { name: "Lattice", bg: "bg-[#223F5E]", text: "text-[#00D084]", label: "lattice" },
    { name: "Microsoft 365", bg: "bg-[#0078D4]", text: "text-white", label: "M365" },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 overflow-hidden flex flex-col items-center justify-center">
      {/* Header & Link (Centered container) */}
      <div className="text-center max-w-2xl px-4 sm:px-6 mb-10 flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-3 leading-tight">
          Connect to the tools you already use <br className="hidden sm:inline" />
          with 200+ integrations
        </h3>
        <Link
          href="/services/hr-it-integrations"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0C241D] hover:text-black transition-colors"
        >
          <span>Visit Integration Ecosystem</span>
          <ArrowRight className="w-4 h-4 text-[#0C241D]" />
        </Link>
      </div>

      {/* 2-Row Infinite Logo Marquee Strip across Entire 100% Page Width with 0 Side Padding */}
      <div className="w-full overflow-hidden flex flex-col gap-3.5 select-none">
        {/* Row 1: Scrolling Left */}
        <div className="animate-marquee-left flex items-center gap-3">
          {[...row1Apps, ...row1Apps, ...row1Apps].map((app, idx) => (
            <div
              key={`m1-${idx}`}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${app.bg} ${app.text} border border-gray-200/80 flex items-center justify-center font-bold text-xs sm:text-sm tracking-tight shrink-0 shadow-none`}
            >
              <span>{app.label}</span>
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="animate-marquee-right flex items-center gap-3">
          {[...row2Apps, ...row2Apps, ...row2Apps].map((app, idx) => (
            <div
              key={`m2-${idx}`}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${app.bg} ${app.text} border border-gray-200/80 flex items-center justify-center font-bold text-xs sm:text-sm tracking-tight shrink-0 shadow-none`}
            >
              <span>{app.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
