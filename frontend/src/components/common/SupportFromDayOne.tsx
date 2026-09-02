"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Phone, Mail, ChevronDown } from "lucide-react";

interface SupportFromDayOneProps {
  className?: string;
}

export function SupportFromDayOne({ className = "" }: SupportFromDayOneProps) {
  return (
    <section className={`w-full bg-white pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 border-t border-gray-100 ${className}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center pt-16 sm:pt-20 mb-10 sm:mb-12 flex flex-col items-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-3">
            SEAMLESS SUPPORT
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 mb-4">
            Support from day one.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
            Get help throughout implementation and beyond. From onboarding resources and self-service diagnostic toolkits to senior HR advisory and a thriving community of People leaders, Scaliify helps you get up and running quickly and make the most of your HR ecosystem.
          </p>
          <Link
            href="/lets-talk"
            className="inline-flex items-center justify-center bg-black text-white text-xs sm:text-sm font-bold px-6 sm:px-7 py-3 rounded-full hover:bg-gray-900 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>Book a consultation</span>
          </Link>
        </div>

        {/* 4-Card 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch mb-10">
          {/* Card 1: Help at your fingertips (Playbooks & Knowledge Hub Mockup) */}
          <div className="bg-[#eaf7f2] rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative border border-[#76D8C8]/30 min-h-[380px] sm:min-h-[420px] shadow-xs">
            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#05434B]/80 mb-2">
                HELP AT YOUR FINGERTIPS
              </p>
              <h3 className="text-lg sm:text-xl font-extrabold text-gray-950 leading-snug">
                Solutions, how-to-guides and a 24/7 help centre with +500 articles.
              </h3>
            </div>

            {/* Graphic Mockup: Floating Pill Cloud + Search Bar */}
            <div className="relative w-full my-auto py-6 flex flex-col items-center justify-center overflow-hidden">
              {/* Background Floating Pills Tag Cloud */}
              <div className="w-full flex flex-col gap-2.5 opacity-70 select-none text-[11px] font-semibold text-[#05434B]">
                {/* Row 1 */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="bg-white/80 border border-[#76D8C8]/40 px-3 py-1 rounded-full shadow-2xs">
                    Advance vacation allowance
                  </span>
                  <span className="bg-white/80 border border-[#76D8C8]/40 px-3 py-1 rounded-full shadow-2xs">
                    📅 Reporting work from home
                  </span>
                </div>
                {/* Row 2 */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="bg-white/80 border border-[#76D8C8]/40 px-3 py-1 rounded-full shadow-2xs">
                    Request absence directly from Slack
                  </span>
                  <span className="bg-white/80 border border-[#76D8C8]/40 px-3 py-1 rounded-full shadow-2xs">
                    ⚡ Overtime &amp; BAG compliance
                  </span>
                </div>
                {/* Row 3 */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="bg-white/80 border border-[#76D8C8]/40 px-3 py-1 rounded-full shadow-2xs">
                    Timesheets reporting for compliance
                  </span>
                  <span className="bg-white/80 border border-[#76D8C8]/40 px-3 py-1 rounded-full shadow-2xs">
                    🎯 360° review cycles
                  </span>
                </div>
              </div>

              {/* Overlaid Floating Central Search Bar */}
              <div className="absolute inset-0 m-auto h-fit bg-white/95 backdrop-blur-md rounded-full px-4 py-3 shadow-[0_8px_25px_rgba(5,67,75,0.12)] border border-white flex items-center gap-2.5 w-full max-w-[270px] sm:max-w-xs z-10">
                <Search className="w-4 h-4 text-[#4FB8AA] shrink-0" />
                <span className="text-xs text-gray-400 font-medium">Search for topics...</span>
              </div>
            </div>

            <div className="relative z-10 pt-2">
              <span className="text-xs font-bold text-[#05434B] hover:text-[#4FB8AA] transition-colors inline-flex items-center gap-1.5 cursor-pointer">
                Browse Knowledge Base &rarr;
              </span>
            </div>
          </div>

          {/* Card 2: +50 Senior Advisors (Contact Us Interactive Mockup) */}
          <div className="bg-[#eaf7f2] rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative border border-[#76D8C8]/30 min-h-[380px] sm:min-h-[420px] shadow-xs">
            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#05434B]/80 mb-2">
                +50 SENIOR ADVISORS
              </p>
              <h3 className="text-lg sm:text-xl font-extrabold text-gray-950 leading-snug">
                90% of users are satisfied with our support, available by phone and email in your language during work hours.
              </h3>
            </div>

            {/* Ambient radial glow */}
            <div className="absolute top-1/2 right-1/4 w-44 h-44 bg-[#81D8D0]/35 rounded-full blur-2xl pointer-events-none" />

            {/* Graphic Mockup: Contact Us Card with Avatar Cluster */}
            <div className="relative w-full my-auto py-2 z-10">
              {/* Floating Avatars on Top Right of Mockup */}
              <div className="flex items-center justify-end -mb-4 mr-2 relative z-20">
                <div className="flex items-center -space-x-2 bg-white/80 backdrop-blur-xs p-1 rounded-full shadow-xs border border-white">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white">
                    <Image src="/avatars/catherine.jpg" alt="Catherine, Scaliify HR Advisor" fill className="object-cover" />
                  </div>
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white">
                    <Image src="/avatars/silvia.jpg" alt="Silvia, Scaliify HR Advisor" fill className="object-cover" />
                  </div>
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white">
                    <Image src="/avatars/bente.jpg" alt="Bente, Scaliify HR Advisor" fill className="object-cover" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#05434B] text-[#81D8D0] text-[10px] font-extrabold flex items-center justify-center border border-white">
                    +50
                  </div>
                </div>
              </div>

              {/* White Inner Card Mockup */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white w-full">
                <h4 className="text-sm font-bold text-gray-950 mb-2">Contact us</h4>
                <div className="mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Topic of concern
                  </span>
                  <div className="bg-gray-50 border border-gray-200/80 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs text-gray-800 font-medium">
                    <span>Reporting &amp; Time Management</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                    Contact options
                  </span>
                  <div className="space-y-1.5">
                    {/* Option 1 */}
                    <div className="bg-[#eaf7f2] border border-[#76D8C8]/50 rounded-xl p-2 sm:p-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-semibold text-[#05434B]">
                        <Phone className="w-3.5 h-3.5 text-[#05434B]" />
                        <span>Request a callback</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-white/90 px-2 py-0.5 rounded-md shadow-2xs">
                        Tomorrow, 09:30
                      </span>
                    </div>
                    {/* Option 2 */}
                    <div className="bg-gray-50 border border-gray-200/60 rounded-xl p-2 sm:p-2.5 flex items-center justify-between text-xs opacity-75">
                      <div className="flex items-center gap-2 font-medium text-gray-700">
                        <Mail className="w-3.5 h-3.5 text-gray-500" />
                        <span>Send us a message</span>
                      </div>
                      <span className="text-[10px] font-medium text-gray-500">
                        2 business days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-2">
              <span className="text-xs font-bold text-[#05434B] hover:text-[#4FB8AA] transition-colors inline-flex items-center gap-1.5 cursor-pointer">
                Schedule an Advisory Call &rarr;
              </span>
            </div>
          </div>

          {/* Card 3: A Like-Minded Community (Forum Discussion Thread Mockup) */}
          <div className="bg-[#eaf7f2] rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative border border-[#76D8C8]/30 min-h-[380px] sm:min-h-[420px] shadow-xs">
            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#05434B]/80 mb-2">
                A LIKE-MINDED COMMUNITY
              </p>
              <h3 className="text-lg sm:text-xl font-extrabold text-gray-950 leading-snug">
                Join our vibrant HR community to connect with experts and share best practices.
              </h3>
            </div>

            {/* Graphic Mockup: Question & Answer Forum Thread */}
            <div className="relative w-full my-auto py-3 z-10">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white w-full">
                {/* Badge */}
                <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Answered</span>
                </div>

                {/* Title */}
                <h4 className="text-xs sm:text-sm font-bold text-gray-950 mb-2.5 leading-snug">
                  Personio + Contract Management: Best Practice?
                </h4>

                {/* Question Bubble */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 text-[11px] text-gray-700 leading-relaxed mb-2 flex items-start gap-2">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <Image src="/avatars/silvia.jpg" alt="Silvia, Scaliify team member" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-0.5">HR Community Lead 👋</p>
                    <p className="text-gray-600">
                      I&apos;m curious how you&apos;re handling contract creation &amp; e-signatures with Personio templates?
                    </p>
                  </div>
                </div>

                {/* Answer Bubble */}
                <div className="bg-[#eaf7f2] border border-[#76D8C8]/40 rounded-xl p-2.5 text-[11px] text-[#05434B] leading-relaxed ml-3 flex items-start gap-2">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 mt-0.5 border border-[#4FB8AA]">
                    <Image src="/avatars/catherine.jpg" alt="Scaliify Advisor" fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-bold text-gray-900">Scaliify Advisory</span>
                      <span className="text-[9px] font-bold bg-emerald-100 text-emerald-900 px-1.5 py-0.2 rounded">
                        Verified
                      </span>
                    </div>
                    <p className="text-gray-700 text-[10.5px]">
                      Generally we recommend setting up variable placeholder schemas and automated workflows prior to rollout...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-2">
              <span className="text-xs font-bold text-[#05434B] hover:text-[#4FB8AA] transition-colors inline-flex items-center gap-1.5 cursor-pointer">
                Join the HR Community &rarr;
              </span>
            </div>
          </div>

          {/* Card 4: Support & Advisory Specialist Photograph */}
          <div className="rounded-3xl overflow-hidden shadow-sm relative min-h-[380px] sm:min-h-[420px] border border-gray-200/80">
            <Image
              src="/images/contact-support-specialist.jpg"
              alt="Dedicated Scaliify HR Advisory Specialist"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Bottom Badges / Trust Line */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4 select-none">
          {/* Dedicated Implementation Team */}
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white shadow-2xs">
                <Image src="/avatars/catherine.jpg" alt="Catherine, Scaliify team" fill className="object-cover" />
              </div>
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white shadow-2xs">
                <Image src="/avatars/silvia.jpg" alt="Silvia, Scaliify team" fill className="object-cover" />
              </div>
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white shadow-2xs">
                <Image src="/avatars/felix.jpg" alt="Felix, Scaliify team" fill className="object-cover" />
              </div>
            </div>
            <span className="text-xs font-semibold text-gray-700">
              Dedicated Implementation Team
            </span>
          </div>

          {/* Priority Support Available */}
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-gray-700">
              Priority Support Available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
