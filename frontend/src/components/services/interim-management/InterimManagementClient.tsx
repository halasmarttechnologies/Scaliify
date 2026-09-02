"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  X,
  Clock,
  UserCheck,
  Zap,
  GitMerge,
  Users,
  Target,
  Quote,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Award,
  MessageSquare,
  Layers,
  Briefcase,
  BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companies } from "@/data/companies";
import { Testimonials } from "@/components/home/Testimonials";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";
import { AnimatedStatCounter } from "@/components/common/AnimatedStatCounter";

const triggerSituations = [
  {
    icon: ShieldCheck,
    title: "HR Lead Resignation",
    desc: "Seamless leadership continuity to stabilize teams, maintain key hiring pipelines, and prevent operational standstills.",
  },
  {
    icon: Clock,
    title: "Parental Leave Cover",
    desc: "Experienced senior HR executives who step in and lead with zero handholding required, keeping projects moving forward.",
  },
  {
    icon: Zap,
    title: "Rapid Scaling & Growth",
    desc: "High-velocity team scaling, building scalable compensation frameworks, leveling structures, and talent acquisition engines.",
  },
  {
    icon: GitMerge,
    title: "Post-Merger Integration",
    desc: "Harmonizing organizational cultures, employment contracts, grading architectures, and unifying disparate HR workflows.",
  },
  {
    icon: Target,
    title: "Projects with No Owner",
    desc: "Dedicated leadership for strategic initiatives: HRIS migrations, works council agreements, or performance system redesigns.",
  },
  {
    icon: Users,
    title: ">100 Specialist Network",
    desc: "Access our vetted network of over 100 HR experts across Europe to match exact industry, regional, and domain requirements.",
  },
];

const specialistAvatars = [
  { src: "/avatars/bente.jpg", alt: "Specialist 1" },
  { src: "/avatars/catherine.jpg", alt: "Specialist 2" },
  { src: "/avatars/felix.jpg", alt: "Specialist 3" },
  { src: "/avatars/max.jpg", alt: "Specialist 4" },
  { src: "/avatars/mo.jpg", alt: "Specialist 5" },
  { src: "/avatars/pim.jpg", alt: "Specialist 6" },
  { src: "/avatars/silvia.jpg", alt: "Specialist 7" },
  { src: "/avatars/catherine.jpg", alt: "Specialist 8" },
  { src: "/avatars/bente.jpg", alt: "Specialist 9" },
  { src: "/avatars/mo.jpg", alt: "Specialist 10" },
  { src: "/avatars/silvia.jpg", alt: "Specialist 11" },
  { src: "/avatars/felix.jpg", alt: "Specialist 12" },
  { src: "/avatars/max.jpg", alt: "Specialist 13" },
  { src: "/avatars/pim.jpg", alt: "Specialist 14" },
  { src: "/avatars/felix.jpg", alt: "Specialist 15" },
  { src: "/avatars/silvia.jpg", alt: "Specialist 16" },
  { src: "/avatars/bente.jpg", alt: "Specialist 17" },
  { src: "/avatars/catherine.jpg", alt: "Specialist 18" },
  { src: "/avatars/mo.jpg", alt: "Specialist 19" },
  { src: "/avatars/pim.jpg", alt: "Specialist 20" },
  { src: "/avatars/max.jpg", alt: "Specialist 21" },
];

const marqueeCards = [
  {
    type: "quote-card",
    bg: "bg-[#f0faf8]",
    brandName: "fintech group",
    quote:
      "When our Head of People stepped down during Series B, Scaliify placed an Interim VP of People within 48 hours. She led our hiring sprint and set up our leadership review framework seamlessly.",
    author: "Maximilian Koch | Co-Founder & CEO",
    border: "border-[#76D8C8]/40",
  },
  {
    type: "image-card",
    image: "/images/rowing-team.jpg",
    quote:
      "Scaliify covered a 9-month parental leave for our HR Director. No learning curve, full accountability for team OKRs, and impeccable executive presence.",
    author: "Hannah von Berg | Chief Operations Officer",
    border: "border-gray-200/50",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#2B4C55] via-[#05434B] to-[#4FB8AA]",
    stat: "<48h",
    sub: "average candidate match & start turnaround",
    brand: "Scaliify Interim Advisory",
    border: "border-[#76D8C8]/30",
  },
  {
    type: "image-card",
    image: "/images/office-team.jpg",
    quote:
      "Unlike recruitment agencies that disappear after signing, Scaliify's interim leaders remained accountable for weekly milestones and outcome delivery.",
    author: "David Althaus | Managing Director",
    border: "border-gray-200/50",
  },
  {
    type: "quote-card",
    bg: "bg-[#e8f7f4]",
    brandName: "mobility scaleup",
    quote:
      "We leveraged Scaliify's specialist network for our post-merger integration. They harmonized contracts across 3 European entities in record time.",
    author: "Laura Sommer | VP People & Organization",
    border: "border-[#4FB8AA]/40",
  },
  {
    type: "image-card",
    image: "/images/food-pantry.jpg",
    quote:
      "Immediate start, deep German labor law knowledge, and hands-on operational leadership when we needed it most.",
    author: "Julian Meier | Head of Talent & Culture",
    border: "border-gray-200/50",
  },
];

const beforeAgencyItems = [
  "2–3 months of slow search latency & CV screening",
  "High placement fees with zero delivery accountability",
  "Recruiters without operational HR leadership experience",
  "Advisors disappear immediately after contract signature",
  "Risk of bad hire with costly replacement delays",
];

const afterScaliifyItems = [
  { text: "Immediate deployment — matched & operational in <48h", badge: "Immediate Start" },
  { text: "100% accountable for outcomes & tangible milestones", badge: "Outcome-Driven" },
  { text: "Backed by a curated network of >100 vetted HR specialists", badge: ">100 Experts" },
  { text: "Battle-tested across scaleups, M&A, and parental leaves", badge: null },
  { text: "Flexible engagements from part-time advisory to full-time CPO", badge: "Total Flexibility" },
];

const interimFaqs = [
  {
    question: "How fast can an interim HR leader start with our company?",
    answer:
      "We can place an interim HR leader immediately. With our pre-vetted network of over 100 senior HR specialists across Europe and the DACH region, we typically present shortlisted matches within 24–48 hours and can onboard leadership within days.",
  },
  {
    question: "How does Scaliify differ from a traditional recruitment agency?",
    answer:
      "Recruitment agencies focus solely on candidate placement and collecting upfront commissions. Scaliify operates as a consultancy: we remain accountable for the outcome of the engagement, provide continuous oversight, and align deliverables with your business goals rather than just delivering CVs.",
  },
  {
    question: "What typical trigger situations warrant hiring an interim HR leader?",
    answer:
      "Common scenarios include sudden HR leadership resignations, planned parental leave coverage, rapid headcount scaling post-fundraising, post-merger integrations (M&A), works council negotiations, or major transformation projects requiring dedicated senior ownership without creating permanent headcount.",
  },
  {
    question: "What seniority levels and HR specializations are available?",
    answer:
      "Our network spans Interim Chief People Officers (CPOs), VPs of People, Heads of HR, HR Business Partners, as well as specialized project leaders for Compensation & Benefits, HR IT transformations, and German labor compliance (Betriebsrat & Scheinselbstständigkeit).",
  },
  {
    question: "How flexible are the interim contract terms and durations?",
    answer:
      "Engagements range from 2–3 days per week fractional advisory up to 5 days per week full-time leadership. Durations typically span 3 to 12 months with flexible extension or transition terms once your permanent executive is hired.",
  },
  {
    question: "Do your interim leaders help recruit and onboard their permanent successor?",
    answer:
      "Yes. A core deliverable of many interim assignments is defining the long-term hiring profile, interviewing candidate finalists, and conducting a structured, thorough handover to ensure permanent team success.",
  },
];

export function InterimManagementClient() {
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubmitted(true);
    }
  };

  return (
    <main className="w-full bg-white overflow-hidden text-black font-sans">
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="w-full relative overflow-hidden bg-gradient-to-bl from-[#81D8D0]/35 via-white/80 to-white pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute -top-20 -right-20 sm:-top-28 sm:-right-28 w-[600px] sm:w-[800px] h-[500px] sm:h-[650px] bg-[radial-gradient(ellipse_at_top_right,rgba(129,216,208,0.85)_0%,rgba(129,216,208,0.55)_35%,rgba(91,199,188,0.25)_60%,transparent_80%)] pointer-events-none blur-3xl -z-0" />
        <div className="absolute top-0 right-1/4 w-[450px] h-[300px] bg-[radial-gradient(circle,rgba(129,216,208,0.45)_0%,transparent_70%)] pointer-events-none blur-2xl -z-0" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Kicker */}
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2B4C55] mb-3.5">
              SCALIIFY FOR INTERIM MANAGEMENT
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-[1.12] mb-5">
              Senior HR leadership placed at short notice
            </h1>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-8 max-w-xl">
              Immediate executive placement when you need it most. Backed by a curated network of &gt;100 seasoned HR specialists, we step in during parental leaves, resignations, rapid scaling, and M&A integrations—accountable for tangible outcomes, not just candidate placement.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/lets-talk"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-extrabold text-brand-dark bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_4px_22px_rgba(129,216,208,0.65)] border border-white/80 hover:shadow-[0_6px_28px_rgba(129,216,208,0.95)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/75 to-transparent rounded-t-full pointer-events-none" />
                <span className="relative z-10 tracking-tight font-extrabold">Request an interim leader</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="#triggers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-black border border-gray-300 hover:border-[#2B4C55] px-6 py-3.5 rounded-full transition-all hover:bg-gray-50 cursor-pointer"
              >
                <span>Trigger situations</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2B4C55]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image Card */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.08)] border border-gray-200/80">
              <Image
                src="/images/interim-management-hero.jpg"
                alt="Senior Interim HR leadership presenting strategic organizational roadmap"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PARTNER / CLIENT LOGO STRIP                               */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-8 sm:py-12 border-y border-gray-100 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 text-center">
            TRUSTED BY FAST-GROWING EUROPEAN SCALEUPS & MID-MARKET FIRMS
          </p>
          <div className="w-full flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
            {companies.slice(0, 6).map((c) => (
              <div key={c.id} className="relative h-7 w-20 sm:w-24 shrink-0 flex items-center justify-center">
                <Image
                  src={c.logoUrl}
                  alt={`Partner ${c.id}`}
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="96px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. TRIGGER SITUATIONS: Core Pillars                          */}
      {/* ============================================================ */}
      <section id="triggers" className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2.5">
              WHEN TO CALL US
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-black max-w-2xl mx-auto">
              Critical trigger situations solved with immediate senior leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {triggerSituations.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 hover:border-[#81D8D0]/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col gap-3.5 group"
              >
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5BC7BC] via-[#81D8D0] to-[#A8F5EE] text-[#05434B] flex items-center justify-center shrink-0 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85),0_8px_20px_rgba(129,216,208,0.38)] border border-white/70 transition-all duration-300 group-hover:scale-105 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent pointer-events-none rounded-t-2xl" />
                  <Icon className="w-5 h-5 stroke-[2.4] relative z-10" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-black leading-snug">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FAST TIME TO VALUE: "Switch with confidence, from day one" */}
      {/* ============================================================ */}
      <section className="w-full bg-gradient-to-b from-white via-[#81D8D0]/15 to-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100 relative overflow-hidden">
        {/* Soft Tiffany Ambient Radial Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[radial-gradient(circle,rgba(129,216,208,0.30)_0%,transparent_70%)] pointer-events-none blur-3xl -z-0" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] mb-3">
              FAST TIME TO VALUE
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 leading-tight mb-3">
              Switch with confidence,<br className="hidden sm:inline" /> from day one
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              Go from kickoff to full operational leadership with expert guidance and minimal disruption
            </p>
          </div>

          {/* Timeline Badges with Horizontal Progress Connector */}
          <div className="relative mb-6 hidden md:block max-w-4xl mx-auto">
            {/* Background Track Line */}
            <div className="absolute top-1/2 left-16 right-16 -translate-y-1/2 h-[2px] bg-gray-200 -z-0" />
            {/* Active Progress Gradient Line in Brand Teal */}
            <div className="absolute top-1/2 left-16 right-16 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#81D8D0]/40 via-[#5BC7BC] to-[#05434B] -z-0" />

            <div className="grid grid-cols-3 gap-6 text-center relative z-10">
              {/* Glossy Shiny Tiffany Blue Pill 1 */}
              <div className="flex justify-center">
                <span className="relative inline-flex items-center justify-center px-6 py-1.5 rounded-full text-xs font-extrabold text-[#05434B] bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_4px_16px_rgba(129,216,208,0.55)] border border-white/80 overflow-hidden">
                  <span className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
                  <span className="relative z-10 font-extrabold tracking-tight">Week 1</span>
                </span>
              </div>

              {/* Glossy Shiny Tiffany Blue Pill 2 */}
              <div className="flex justify-center">
                <span className="relative inline-flex items-center justify-center px-6 py-1.5 rounded-full text-xs font-extrabold text-[#05434B] bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_4px_16px_rgba(129,216,208,0.55)] border border-white/80 overflow-hidden">
                  <span className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
                  <span className="relative z-10 font-extrabold tracking-tight">Week 2</span>
                </span>
              </div>

              {/* Glossy Shiny Tiffany Blue Pill 3 */}
              <div className="flex justify-center">
                <span className="relative inline-flex items-center justify-center px-6 py-1.5 rounded-full text-xs font-extrabold text-[#05434B] bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_4px_16px_rgba(129,216,208,0.55)] border border-white/80 overflow-hidden">
                  <span className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
                  <span className="relative z-10 font-extrabold tracking-tight">Week 10</span>
                </span>
              </div>
            </div>
          </div>

          {/* 3 Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-10">
            {/* Card 1: Hit the ground running */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 hover:border-[#81D8D0]/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[420px] transition-all duration-300">
              <div>
                <div className="md:hidden mb-3">
                  <span className="relative inline-flex items-center justify-center px-4 py-0.5 rounded-full text-[11px] font-extrabold text-[#05434B] bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-xs border border-white/80">
                    Week 1
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-5">
                  Hit the ground running
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-[13px] text-gray-700 leading-relaxed font-medium">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#81D8D0]/30 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Start with a tailored kickoff and leadership roadmap</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#81D8D0]/30 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Meet your dedicated interim People &amp; HR executive</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#81D8D0]/30 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Map your key workflows, teams, and rollout priorities</span>
                  </li>
                </ul>
              </div>

              {/* Bottom Visual: 21 Specialist Avatar Dots Grid */}
              <div className="pt-8 border-t border-gray-100 mt-6">
                <div className="grid grid-cols-7 gap-1.5 justify-items-center">
                  {specialistAvatars.map((avatar, idx) => (
                    <div
                      key={idx}
                      className="w-7 h-7 rounded-full overflow-hidden relative border border-gray-200 bg-gray-100 shrink-0 shadow-2xs"
                    >
                      <Image
                        src={avatar.src}
                        alt={avatar.alt}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Implement together */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 hover:border-[#81D8D0]/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[420px] transition-all duration-300">
              <div>
                <div className="md:hidden mb-3">
                  <span className="relative inline-flex items-center justify-center px-4 py-0.5 rounded-full text-[11px] font-extrabold text-[#05434B] bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-xs border border-white/80">
                    Week 2
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-5">
                  Implement together
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-[13px] text-gray-700 leading-relaxed font-medium">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#81D8D0]/30 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Configure and steer HR operations with hands-on expert guidance</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#81D8D0]/30 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Stabilize parental leave cover, compensation &amp; compliance</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#81D8D0]/30 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Meet regularly with your dedicated partner for support and guidance</span>
                  </li>
                </ul>
              </div>

              {/* Bottom Visual: Leader Avatar + Professional Action Icons */}
              <div className="pt-8 border-t border-gray-100 mt-6 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-white shadow-sm shrink-0">
                  <Image
                    src="/avatars/silvia.jpg"
                    alt="Senior Interim Director"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#5BC7BC] via-[#81D8D0] to-[#A8F5EE] text-[#05434B] flex items-center justify-center shadow-xs border border-white/60">
                  <Briefcase className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#5BC7BC] via-[#81D8D0] to-[#A8F5EE] text-[#05434B] flex items-center justify-center shadow-xs border border-white/60">
                  <Users className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#5BC7BC] via-[#81D8D0] to-[#A8F5EE] text-[#05434B] flex items-center justify-center shadow-xs border border-white/60">
                  <BarChart3 className="w-4 h-4 stroke-[2.2]" />
                </div>
              </div>
            </div>

            {/* Card 3: Launch with confidence (Deep Brand Dark Spruce) */}
            <div className="bg-gradient-to-br from-[#05434B] via-[#032e35] to-[#011e23] text-white rounded-3xl p-6 sm:p-7 shadow-[0_12px_35px_rgba(5,67,75,0.25)] border border-[#81D8D0]/25 flex flex-col justify-between min-h-[420px]">
              <div>
                <div className="md:hidden mb-3">
                  <span className="relative inline-flex items-center justify-center px-4 py-0.5 rounded-full text-[11px] font-extrabold text-[#05434B] bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-xs border border-white/80">
                    Week 10
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-5">
                  Launch with confidence
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-[13px] text-gray-100 leading-relaxed font-medium">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#81D8D0]/25 text-[#81D8D0] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Go live with guided rollout support and milestone completion</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#81D8D0]/25 text-[#81D8D0] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Help your team adopt new HR processes &amp; systems quickly</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#81D8D0]/25 text-[#81D8D0] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Keep momentum with ongoing advisory support after launch</span>
                  </li>
                </ul>
              </div>

              {/* Bottom Visual: Leader Avatar + Clean Professional Status Badge */}
              <div className="pt-8 border-t border-white/15 mt-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden relative border border-white/40 shadow-xs shrink-0">
                  <Image
                    src="/avatars/max.jpg"
                    alt="Interim Lead"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="bg-white text-gray-900 rounded-full px-4 py-1.5 text-xs font-bold flex items-center gap-2 shadow-sm border border-white/90">
                  <CheckCircle2 className="w-4 h-4 text-[#05434B] stroke-[2.5]" />
                  <span>Milestones delivered</span>
                  <span className="text-gray-500 font-medium text-[11px] hidden xl:inline">• Transition complete</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Pill Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#81D8D0]/20 text-[#05434B] border border-[#81D8D0]/50 px-4 py-1.5 rounded-full text-xs font-bold shadow-2xs">
              <div className="w-4 h-4 rounded-full bg-[#05434B] text-[#81D8D0] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-2.5 h-2.5" />
              </div>
              <span>Priority support and implementation add-ons available</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. MARQUEE CAROUSEL: Real Stories & Leadership Feedback      */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-12 sm:py-16 overflow-hidden border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2">
            SPEED • ACCOUNTABILITY • OUTCOMES
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight">
            How organizations bridge leadership gaps with Scaliify
          </h2>
        </div>

        <div className="relative w-full overflow-hidden select-none py-1">
          <div className="animate-marquee-left flex items-center gap-3.5 sm:gap-6 w-max">
            {[...marqueeCards, ...marqueeCards].map((card, index) => (
              <div key={index} className="shrink-0">
                {card.type === "quote-card" && (
                  <div
                    className={`${card.bg} ${card.border} rounded-[26px] p-6 sm:p-7 w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] flex flex-col justify-between border shadow-xs hover:shadow-md transition-all duration-300`}
                  >
                    <div className="pt-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#2B4C55] tracking-tighter lowercase block">
                        {card.brandName}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <p className="text-xs sm:text-sm text-black font-semibold leading-relaxed">
                        &ldquo;{card.quote}&rdquo;
                      </p>
                      <p className="text-[11px] text-gray-700 font-bold">
                        {card.author}
                      </p>
                    </div>
                  </div>
                )}

                {card.type === "image-card" && (
                  <div
                    className="relative rounded-[26px] w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                  >
                    <Image
                      src={card.image!}
                      alt={card.author!}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="310px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B4C55]/90 via-black/30 to-transparent" />
                    <div className="absolute inset-x-3 bottom-3 bg-[#05434B]/80 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 text-white">
                      <p className="text-xs leading-relaxed font-medium mb-1.5 line-clamp-4">
                        &ldquo;{card.quote}&rdquo;
                      </p>
                      <p className="text-[10px] text-[#76D8C8] font-bold">
                        {card.author}
                      </p>
                    </div>
                  </div>
                )}

                {card.type === "stat-card" && (
                  <div
                    className={`${card.bg} rounded-[26px] p-6 sm:p-7 w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] text-white flex flex-col items-center justify-between text-center relative shadow-xs hover:shadow-md transition-all duration-300 border ${card.border}`}
                  >
                    <div className="w-full flex justify-center pt-1 opacity-0 select-none">
                      spacer
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-5xl sm:text-6xl font-black leading-none tracking-tight text-white">
                        {card.stat}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-[#76D8C8] mt-2">
                        {card.sub}
                      </p>
                    </div>
                    <div className="pb-1">
                      <span className="text-base sm:text-lg font-bold font-serif italic text-white/95 tracking-wide">
                        {card.brand}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. COMPARISON: Scaliify vs Traditional Recruitment Agency    */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2.5">
              THE SCALIIFY DIFFERENCE
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black">
              Accountable for the outcome, not just the placement
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto mt-2">
              Why leadership teams partner with Scaliify instead of transactional headhunting agencies.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#05434B] via-[#2B4C55] to-[#1b3a42] rounded-3xl p-6 sm:p-10 border border-[#76D8C8]/20 shadow-[0_15px_45px_rgba(5,67,75,0.22)] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(118,216,200,0.25)_0%,transparent_70%)] pointer-events-none blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle,rgba(79,184,170,0.18)_0%,transparent_70%)] pointer-events-none blur-2xl" />

            {/* Left: Traditional Recruitment Agency */}
            <div className="flex flex-col justify-between py-2 sm:py-4 pr-0 md:pr-6 relative z-10 text-white">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
                  Traditional Recruitment Agencies
                </h3>
                <ul className="flex flex-col gap-4">
                  {beforeAgencyItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                      <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5 text-gray-300">
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Scaliify Interim Management */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-[#76D8C8]/50 flex flex-col justify-between relative z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#2B4C55] mb-6">
                  Scaliify Interim Management
                </h3>
                <ul className="flex flex-col gap-4">
                  {afterScaliifyItems.map(({ text, badge }) => (
                    <li key={text} className="flex items-start gap-3 text-xs sm:text-sm text-black font-semibold">
                      <div className="w-5 h-5 rounded-full bg-[#4FB8AA] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2.5">
                        <span className="text-gray-950 font-bold leading-snug">{text}</span>
                        {badge && (
                          <span className="self-start sm:self-center shrink-0 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide bg-[#76D8C8]/30 text-[#05434B] px-2.5 py-0.5 rounded-full whitespace-nowrap">
                            {badge}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/lets-talk"
              className="inline-flex items-center gap-2 text-sm font-bold text-black hover:text-[#4FB8AA] transition-colors group"
            >
              <span>Need immediate senior HR leadership? Schedule a scoping call with our partners</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#4FB8AA]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. IMPACT & CUSTOMER STORY BENTO SECTION                     */}
      {/* ============================================================ */}
      <section className="w-full bg-gradient-to-b from-white via-[#81D8D0]/35 to-white py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[radial-gradient(circle,rgba(129,216,208,0.45)_0%,transparent_70%)] pointer-events-none blur-3xl -z-0" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black max-w-2xl mx-auto leading-tight">
              Real impact for scaling organizations
            </h2>
          </div>

          {/* 3 Metric Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16 text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                Immediate
              </span>
              <span className="text-xs sm:text-sm text-gray-800 font-semibold max-w-[200px]">
                rapid matching & short-notice start
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                <AnimatedStatCounter value={100} suffix="+" />
              </span>
              <span className="text-xs sm:text-sm text-gray-800 font-semibold max-w-[200px]">
                vetted European HR specialists in network
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                <AnimatedStatCounter value={96} suffix="%" />
              </span>
              <span className="text-xs sm:text-sm text-gray-800 font-semibold max-w-[200px]">
                critical milestone completion rate
              </span>
            </div>
          </div>

          {/* 2x2 Bento Customer Story Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch mb-10 sm:mb-14">
            <div className="md:col-span-7 bg-gradient-to-b from-[#eaf7f5] via-white to-white rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center border border-[#76D8C8]/40 shadow-xs min-h-[140px] sm:min-h-[180px]">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-3">
                INTERIM CASE STORY
              </p>
              <div className="relative h-10 sm:h-12 w-32 sm:w-36">
                <Image
                  src={companies[1]?.logoUrl ?? "/companies/logo-2.png"}
                  alt="Customer Logo"
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="144px"
                />
              </div>
            </div>

            <div className="md:col-span-5 bg-gradient-to-br from-[#81D8D0] via-[#76D8C8] to-[#A8F5EE] text-black rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-center min-h-[140px] sm:min-h-[180px] shadow-xs border border-white/60">
              <p className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-black mb-3">
                <AnimatedStatCounter value={100} suffix="%" />
              </p>
              <p className="text-xs sm:text-sm font-bold text-black leading-snug">
                seamless transition & zero leadership vacuum
              </p>
            </div>

            <div className="md:col-span-5 relative rounded-[22px] sm:rounded-[26px] overflow-hidden min-h-[220px] sm:min-h-[300px] shadow-xs border border-gray-200/80">
              <Image
                src="/images/interim-management-leader.jpg"
                alt="Kathrin Eder - Interim Chief People Officer"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            <div className="md:col-span-7 bg-[#f0faf8] rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-[#4FB8AA]/30 shadow-xs min-h-[220px] sm:min-h-[300px]">
              <div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#4FB8AA] to-[#76D8C8] text-[#05434B] flex items-center justify-center mb-4 sm:mb-5 shadow-xs">
                  <Quote className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                </div>
                <p className="text-sm sm:text-base md:text-lg text-[#2B4C55] font-bold leading-snug mb-4">
                  &ldquo;When our CPO went on maternity leave right ahead of our Series C round, Scaliify placed an outstanding Interim Head of People within 5 days. She led our talent reviews, managed works council negotiations, and trained our new incoming executive.&rdquo;
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-black">
                  Kathrin Eder <span className="font-normal text-gray-600">| Chief People Officer & Scaliify Interim Network</span>
                </p>
              </div>
            </div>
          </div>

          {/* Dual Action Conversion Cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-stretch mt-10 sm:mt-16">
            <div className="md:col-span-7 bg-[#cbece5] rounded-2xl sm:rounded-[32px] p-5 sm:p-7 md:p-10 flex flex-col justify-between shadow-[0_12px_35px_rgba(79,184,170,0.18)] border border-[#a6dfd4] relative overflow-hidden">
              <div className="mb-6">
                <div className="inline-flex items-center bg-[#ee7738] text-white text-[10.5px] sm:text-[11px] font-bold px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full uppercase tracking-wider mb-3 sm:mb-4 shadow-2xs">
                  Immediate 30-min scoping call
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-[32px] font-extrabold text-[#05434B] tracking-tight leading-[1.18]">
                  Discuss your interim leadership needs
                </h3>
              </div>

              {emailSubmitted ? (
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#05434B] bg-white/80 backdrop-blur-sm border border-[#5BC7BC]/50 px-5 py-3.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-[#2B4C55]" />
                  <span>Thank you! An advisory partner will contact you shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="w-full">
                  <div className="bg-white rounded-2xl sm:rounded-full p-1.5 sm:pl-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] border border-white/80 w-full">
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="What's your work email? *"
                      aria-label="Work email address"
                      className="w-full px-3 py-2.5 sm:py-2 text-xs sm:text-sm text-black placeholder:text-gray-400 focus:outline-none bg-transparent"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-[#66cfc3] to-[#8fe4da] text-[#05434B] text-xs sm:text-sm font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full shadow-[0_4px_14px_rgba(102,207,195,0.45),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:brightness-105 transition-all shrink-0 cursor-pointer active:scale-95 border border-white/40 text-center"
                    >
                      Request scoping call
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="md:col-span-5 bg-[#032e35] text-white rounded-2xl sm:rounded-[32px] p-5 sm:p-7 md:p-10 flex flex-col justify-between shadow-[0_12px_35px_rgba(3,46,53,0.25)] border border-white/10 relative overflow-hidden">
              <div className="mb-6">
                <div className="inline-flex items-center bg-white text-[#05434B] text-[10.5px] sm:text-[11px] font-bold px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full uppercase tracking-wider mb-3 sm:mb-4 shadow-2xs">
                  Assess Tech &amp; Processes
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-[32px] font-extrabold text-white tracking-tight leading-[1.18]">
                  Benchmark your HR software stack
                </h3>
              </div>

              <div>
                <Link
                  href="/tool-finder"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-[#66cfc3] to-[#8fe4da] text-[#05434B] text-xs sm:text-sm font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-[0_4px_16px_rgba(102,207,195,0.5),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:brightness-105 transition-all cursor-pointer active:scale-95 border border-white/40 text-center"
                >
                  <span>Use free HR Tool Finder</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. TESTIMONIALS SECTION                                      */}
      {/* ============================================================ */}
      <Testimonials />

      {/* ============================================================ */}
      {/* 8. FREQUENTLY ASKED QUESTIONS ACCORDION                      */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2B4C55] mb-2.5">
              CLEAR ANSWERS
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Frequently asked questions
            </h2>
          </div>

          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {interimFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full py-5 sm:py-6 flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-gray-900 text-base sm:text-lg md:text-[19px] pr-6 group-hover:text-black leading-snug transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-700 shrink-0 transition-transform duration-300 ease-in-out group-hover:text-black ${
                        isOpen ? "rotate-180 text-black" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 sm:pb-7 pr-8 text-gray-600 text-sm sm:text-base leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. DISCOVERY & CONSULTATION BOOKING LEAD SECTION             */}
      {/* ============================================================ */}
      <BookingLeadSection />

      {/* ============================================================ */}
      {/* 10. BLOG SECTION                                             */}
      {/* ============================================================ */}
      <BlogSection />
    </main>
  );
}
