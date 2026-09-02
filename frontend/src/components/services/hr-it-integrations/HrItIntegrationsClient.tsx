"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  X,
  RefreshCw,
  Cpu,
  ArrowLeftRight,
  Database,
  Quote,
  CheckCircle2,
  ChevronDown,
  Workflow,
  Users2,
  Coins,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companies } from "@/data/companies";
import { Testimonials } from "@/components/home/Testimonials";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";
import { AnimatedStatCounter } from "@/components/common/AnimatedStatCounter";

const pillars = [
  {
    icon: Database,
    title: "One Single Source of Truth",
    desc: "We connect your HR platforms so information lives in one place instead of being typed in separately across three or four systems that never quite line up, which means you're no longer left guessing which version of a record is actually correct.",
  },
  {
    icon: Users2,
    title: "The Common Scenarios We Handle",
    desc: "Most of this work falls into a handful of patterns: HRIS connected to payroll, HRIS connected to your ATS, HRIS linked with finance or ERP, and time tracking synced with payroll. If any of these are still running as separate islands in your setup, that's usually where the real headaches are hiding.",
  },
  {
    icon: Workflow,
    title: "When There's No Ready-Made Integration",
    desc: "Not every system connects to another right out of the box, and that's not where we stop. We'll build middleware, handle the API work ourselves, or sometimes redesign the process entirely so the integration isn't even needed anymore.",
  },
  {
    icon: Cpu,
    title: "Process Redesign First",
    desc: "Every so often the cleanest fix isn't technical at all; it's rethinking why two systems needed to talk in the first place.",
  },
];

const marqueeCards = [
  {
    type: "quote-card",
    bg: "bg-[#f0faf8]",
    brandName: "techscale",
    quote:
      "Scaliify connected our HiBob HRIS directly with DATEV. We stopped copying employee records between systems and eliminated 15 hours of manual spreadsheet reconciliation every single month.",
    author: "Elena Richter | Head of People Operations",
    border: "border-[#76D8C8]/40",
  },
  {
    type: "image-card",
    image: "/images/hr-integrations-hero.jpg",
    quote:
      "When our ATS and HRIS didn't have a native integration, Scaliify didn't just sell us an expensive API build. They redesigned our onboarding workflow, which eliminated the need for custom coding entirely.",
    author: "Lukas Weber | VP of People & Culture",
    border: "border-gray-200/50",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#2B4C55] via-[#05434B] to-[#4FB8AA]",
    stat: "100%",
    sub: "single source of truth data consistency across all systems",
    brand: "Scaliify HR Advisory",
    border: "border-[#76D8C8]/30",
  },
  {
    type: "image-card",
    image: "/images/hr-integrations-leader.jpg",
    quote:
      "Connecting our Core HR with NetSuite and DATEV gave our CFO and HR team identical real-time headcount numbers. Zero duplicate entries, zero discrepancies.",
    author: "Sarah Lindemann | Chief People Officer",
    border: "border-gray-200/50",
  },
  {
    type: "quote-card",
    bg: "bg-[#e8f7f4]",
    brandName: "scaleup group",
    quote:
      "Our shift workers' tracked hours now flow directly into monthly payroll. Scaliify ensured all German BAG overtime regulations were automated without manual calculations.",
    author: "Markus Hoffmann | Managing Director",
    border: "border-[#4FB8AA]/40",
  },
  {
    type: "image-card",
    image: "/images/office-team.jpg",
    quote:
      "Scaliify acted as true HR IT consultants. They coordinated between our HR team, external software vendors, and IT security to ensure bank-grade data privacy.",
    author: "Sophie Dubois | Global HR Operations",
    border: "border-gray-200/50",
  },
];

const beforeItems = [
  "Duplicate employee data typed manually into HRIS, Payroll, and ATS",
  "Risk of human error and payroll cutover delays from manual CSV exports",
  "Fragile point-to-point connections that break on software updates",
  "Costly custom API builds for broken processes that could be simplified",
  "Discrepancies between HR headcount numbers and Finance ERP reports",
];

const afterItems = [
  { text: "One verified single source of truth across your HR tech stack", badge: "100% Accurate" },
  { text: "Automated HRIS ↔ DATEV & Payroll sync without manual spreadsheets", badge: "Zero Manual CSVs" },
  { text: "Instant ATS candidate-to-hire onboarding with zero duplicate entry", badge: "Zero Double-Entry" },
  { text: "Process redesign first: simplifying workflows before building APIs", badge: "Cost-Effective" },
  { text: "Fully GDPR-compliant encryption, automated audit logs & error alerts", badge: "Bank-Grade Security" },
];

const impactStats = [
  { value: "100%", label: "single source of truth data integrity" },
  { value: "0", label: "duplicate manual entries across all systems" },
  { value: "15+ hrs", label: "saved monthly per HR team member on payroll & admin" },
];

const hrIntegrationsFaqs = [
  {
    question: "What if our systems don't officially support integration with each other?",
    answer:
      "That happens more often than you'd think, and it's not a dead end. We build custom solutions with middleware or direct API work when there's no native option.",
  },
  {
    question: "How long does setting up an integration usually take?",
    answer:
      "Depends on the systems involved and how much custom work is needed, but most are up and running within a few weeks.",
  },
  {
    question: "Will this disrupt our HR operations while it's being set up?",
    answer:
      "We plan around minimising disruption, usually testing everything in parallel before switching anything over live.",
  },
  {
    question: "Can you integrate more than two systems at once?",
    answer:
      "Yes, plenty of our projects involve three or more platforms, especially when payroll, HRIS, and time tracking all need to stay in sync.",
  },
  {
    question: "Do we need a specific type of HRIS for this to work?",
    answer:
      "No. We work across the major HR platforms, so integration is possible regardless of what you're currently using.",
  },
];

export function HrItIntegrationsClient() {
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
      {/* 1. HERO SECTION (Split: Left Content + Right Image)          */}
      {/* ============================================================ */}
      <section className="w-full relative overflow-hidden bg-gradient-to-bl from-[#81D8D0]/35 via-white/80 to-white pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8">
        {/* Prominent High-Opacity Tiffany Blue Gradient Aura on Top Right Corner */}
        <div className="absolute -top-20 -right-20 sm:-top-28 sm:-right-28 w-[600px] sm:w-[800px] h-[500px] sm:h-[650px] bg-[radial-gradient(ellipse_at_top_right,rgba(129,216,208,0.85)_0%,rgba(129,216,208,0.55)_35%,rgba(91,199,188,0.25)_60%,transparent_80%)] pointer-events-none blur-3xl -z-0" />

        {/* Additional Soft Top Glow */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[300px] bg-[radial-gradient(circle,rgba(129,216,208,0.45)_0%,transparent_70%)] pointer-events-none blur-2xl -z-0" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Left Column: Heading + Copy + Action CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Kicker */}
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2B4C55] mb-3.5">
              SCALIIFY FOR HR IT INTEGRATIONS
            </p>

            {/* H1 Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-[1.12] mb-5">
              When HR systems don't talk to each other, someone always ends up paying for it
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-8 max-w-xl">
              Usually in duplicate data entry, mismatched records, and numbers nobody fully trusts. We connect your HR platforms so information lives in one single source of truth.
            </p>

            {/* CTA Buttons (Glossy Shiny Tiffany Blue Let's Talk Style Button) */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/lets-talk"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-extrabold text-brand-dark bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_4px_22px_rgba(129,216,208,0.65)] border border-white/80 hover:shadow-[0_6px_28px_rgba(129,216,208,0.95)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/75 to-transparent rounded-t-full pointer-events-none" />
                <span className="relative z-10 tracking-tight font-extrabold">Book a consultation</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/tool-finder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-black border border-gray-300 hover:border-[#2B4C55] px-6 py-3.5 rounded-full transition-all hover:bg-gray-50 cursor-pointer"
              >
                <span>Try HR Tool Finder</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2B4C55]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Architecture Consulting Image Card */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.08)] border border-gray-200/80">
              <Image
                src="/images/hr-integrations-hero.jpg"
                alt="Scaliify HR IT Systems Integration and Data Architecture Advisory"
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
      {/* 3. FOUR PILLARS: Common Integration Scenarios                */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2.5">
              COMMON SCENARIOS &amp; ARCHITECTURES
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-black">
              Seamlessly connecting your core HR workflows
            </h2>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3 group">
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5BC7BC] via-[#81D8D0] to-[#A8F5EE] text-[#05434B] flex items-center justify-center shrink-0 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85),0_8px_20px_rgba(129,216,208,0.38)] border border-white/70 mb-1 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),0_12px_25px_rgba(129,216,208,0.55)] overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent pointer-events-none rounded-t-2xl" />
                  <Icon className="w-5 h-5 stroke-[2.4] relative z-10" />
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-black leading-snug">
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
      {/* 3.5. INTEGRATION PIPELINE WORKFLOW CARD (Matching Screenshot) */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-14 border border-gray-200/80 shadow-[0_15px_45px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative overflow-hidden">
            {/* Subtle Top-Right Ambient Radial Glow */}
            <div className="absolute -top-10 -right-10 w-96 h-96 bg-[radial-gradient(circle,rgba(129,216,208,0.18)_0%,transparent_70%)] pointer-events-none blur-3xl" />

            {/* Left Column: Heading + Descriptive Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#05434B] tracking-tight leading-[1.18] mb-5">
                Integration workflows that save you time
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md">
                Skip the manual setup. Use proven integration blueprints to quickly connect your HRIS, payroll, ATS, and ERP with zero duplicate entries. Scaliify clients experience up to 65% faster payroll reconciliation and seamless new hire onboarding.
              </p>
            </div>

            {/* Right Column: Visual Pipeline Stepper Graphic (Matching Screenshot) */}
            <div className="lg:col-span-7 relative flex flex-col items-center justify-center py-4">
              {/* Vertical Dashed Line Running Down Through Nodes */}
              <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-8 w-0.5 border-r border-dashed border-[#76D8C8]/60 pointer-events-none" />

              {/* Top Node: Pipeline Pill */}
              <div className="bg-white border border-[#76D8C8]/50 shadow-2xs px-4 py-1 rounded-full flex items-center gap-2 text-xs font-semibold text-[#05434B] mx-auto mb-4 relative z-10">
                <span className="bg-[#eaf7f2] text-[#05434B] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Pipeline
                </span>
                <span>Single Source of Truth</span>
              </div>

              {/* Step Card 1: HRIS ↔ Payroll */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs flex items-start gap-3.5 relative z-10 max-w-md w-full mb-3.5 hover:border-[#76D8C8] transition-all">
                <div className="w-6 h-6 rounded-full bg-[#eaf7f2] text-[#05434B] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5">
                    HRIS &harr; Payroll (DATEV)
                  </h3>
                  <div className="flex items-center gap-1.5 flex-wrap text-[10.5px]">
                    <span className="text-gray-500 font-medium">Responsible</span>
                    <span className="bg-[#f0faf8] text-[#05434B] font-bold px-2 py-0.5 rounded">HR &amp; Payroll</span>
                    <span className="text-gray-400">&bull;</span>
                    <span className="text-gray-600 font-medium">3 days</span>
                    <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">before cutoff</span>
                  </div>
                </div>
              </div>

              {/* Step Card 2: Special Highlight Card (ATS Candidate Handoff with Avatar) */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#76D8C8]/60 shadow-sm flex items-center gap-3.5 relative z-10 max-w-md w-full mb-3.5 hover:shadow-md transition-all">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#76D8C8] shadow-2xs">
                  <Image
                    src="/avatars/silvia.jpg"
                    alt="Anneke"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-gray-950">Welcome Anneke!</h3>
                    <span className="text-[10px] font-bold bg-[#eaf7f2] text-[#05434B] px-2 py-0.5 rounded-full">
                      ATS &rarr; HRIS
                    </span>
                  </div>
                  <div className="mt-1 h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#4FB8AA] to-[#76D8C8] rounded-full w-full" />
                  </div>
                </div>
              </div>

              {/* Step Card 3: HRIS ↔ Finance / ERP */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs flex items-start gap-3.5 relative z-10 max-w-md w-full mb-3.5 hover:border-[#76D8C8] transition-all">
                <div className="w-6 h-6 rounded-full bg-[#eaf7f2] text-[#05434B] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5">
                    HRIS &harr; Finance &amp; ERP
                  </h3>
                  <div className="flex items-center gap-1.5 flex-wrap text-[10.5px]">
                    <span className="text-gray-500 font-medium">Responsible</span>
                    <span className="bg-[#f0faf8] text-[#05434B] font-bold px-2 py-0.5 rounded">Finance</span>
                    <span className="text-gray-400">&bull;</span>
                    <span className="text-gray-600 font-medium">Real-time</span>
                    <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">cost center sync</span>
                  </div>
                </div>
              </div>

              {/* Step Card 4: Time Tracking ↔ Payroll */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs flex items-start gap-3.5 relative z-10 max-w-md w-full mb-4 hover:border-[#76D8C8] transition-all">
                <div className="w-6 h-6 rounded-full bg-[#eaf7f2] text-[#05434B] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5">
                    Time Tracking &harr; Payroll
                  </h3>
                  <div className="flex items-center gap-1.5 flex-wrap text-[10.5px]">
                    <span className="text-gray-500 font-medium">Responsible</span>
                    <span className="bg-[#f0faf8] text-[#05434B] font-bold px-2 py-0.5 rounded">Operations</span>
                    <span className="text-gray-400">&bull;</span>
                    <span className="text-gray-600 font-medium">Monthly</span>
                    <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">BAG Compliant</span>
                  </div>
                </div>
              </div>

              {/* Faded Step 5 (Bottom Node) */}
              <div className="text-center text-xs font-semibold text-gray-400 opacity-60 flex items-center justify-center gap-1.5 relative z-10">
                <Check className="w-3.5 h-3.5" />
                <span>Process Redesign &amp; Middleware Orchestration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. MARQUEE CAROUSEL: "Join the organisations unlocking impact" */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-12 sm:py-16 overflow-hidden border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2">
            CONNECTED ECOSYSTEMS FROM 50-5000 EMPLOYEES
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight">
            Join the organisations unlocking impact
          </h2>
        </div>

        {/* Marquee Container with smooth infinite glide */}
        <div className="relative w-full overflow-hidden select-none py-1">
          <div className="animate-marquee-left flex items-center gap-3.5 sm:gap-6 w-max">
            {[...marqueeCards, ...marqueeCards].map((card, index) => (
              <div key={index} className="shrink-0">
                {/* Type 1: Quote Card */}
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

                {/* Type 2: Full Image Card */}
                {card.type === "image-card" && (
                  <div className="relative rounded-[26px] w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
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

                {/* Type 3: Bold Logo Gradient Stat Card */}
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
      {/* 5. BEFORE VS AFTER COMPARISON CARD                           */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2.5">
              THE SCALIIFY DIFFERENCE
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black">
              Why fast-growing companies choose Scaliify
            </h2>
          </div>

          {/* Comparison Card Container */}
          <div className="bg-gradient-to-br from-[#05434B] via-[#2B4C55] to-[#1b3a42] rounded-3xl p-6 sm:p-10 border border-[#76D8C8]/20 shadow-[0_15px_45px_rgba(5,67,75,0.22)] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(118,216,200,0.25)_0%,transparent_70%)] pointer-events-none blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle,rgba(79,184,170,0.18)_0%,transparent_70%)] pointer-events-none blur-2xl" />

            {/* Left: Before Scaliify */}
            <div className="flex flex-col justify-between py-2 sm:py-3 pr-0 md:pr-4 relative z-10 text-white">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
                  Before Scaliify
                </h3>
                <ul className="flex flex-col gap-4">
                  {beforeItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                      <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5 text-gray-300">
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: After Scaliify */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-[#76D8C8]/50 flex flex-col justify-between relative z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#2B4C55] mb-6">
                  After Scaliify
                </h3>
                <ul className="flex flex-col gap-4">
                  {afterItems.map(({ text, badge }) => (
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

          {/* Bottom Link */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/tool-finder"
              className="inline-flex items-center gap-2 text-sm font-bold text-black hover:text-[#4FB8AA] transition-colors group"
            >
              <span>Not sure which HR tool integration you need? Use our free interactive tool finder</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#4FB8AA]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. REAL IMPACT FOR OUR CUSTOMERS (Tiffany Gradient Fade BG)  */}
      {/* ============================================================ */}
      <section className="w-full bg-gradient-to-b from-white via-[#81D8D0]/35 to-white py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[radial-gradient(circle,rgba(129,216,208,0.45)_0%,transparent_70%)] pointer-events-none blur-3xl -z-0" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black max-w-2xl mx-auto leading-tight">
              Real impact for our customers
            </h2>
          </div>

          {/* 3 Metric Stats Row with Animated Number Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16 text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                <AnimatedStatCounter value={100} suffix="%" />
              </span>
              <span className="text-xs sm:text-sm text-gray-800 font-semibold max-w-[200px]">
                single source of truth data integrity
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                <AnimatedStatCounter value={0} />
              </span>
              <span className="text-xs sm:text-sm text-gray-800 font-semibold max-w-[200px]">
                duplicate manual entries across all systems
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                <AnimatedStatCounter value={15} suffix="+ hrs" />
              </span>
              <span className="text-xs sm:text-sm text-gray-800 font-semibold max-w-[200px]">
                saved monthly per HR team member on payroll &amp; admin
              </span>
            </div>
          </div>

          {/* 2x2 Bento Customer Story Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch mb-10 sm:mb-14">
            {/* Top-Left: Customer Story Logo Card */}
            <div className="md:col-span-7 bg-gradient-to-b from-[#eaf7f5] via-white to-white rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center border border-[#76D8C8]/40 shadow-xs min-h-[140px] sm:min-h-[180px]">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-3">
                CUSTOMER STORY
              </p>
              <div className="relative h-10 sm:h-12 w-32 sm:w-36">
                <Image
                  src={companies[0]?.logoUrl ?? "/companies/logo-1.png"}
                  alt="Customer Logo"
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="144px"
                />
              </div>
            </div>

            {/* Top-Right: Stat Card with Animated Counter */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#81D8D0] via-[#76D8C8] to-[#A8F5EE] text-black rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-center min-h-[140px] sm:min-h-[180px] shadow-xs border border-white/60">
              <p className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-black mb-3">
                <AnimatedStatCounter value={100} suffix="%" />
              </p>
              <p className="text-xs sm:text-sm font-bold text-black leading-snug">
                accurate employee data across HR, Payroll &amp; Finance
              </p>
            </div>

            {/* Bottom-Left: Client Leader Portrait Photo */}
            <div className="md:col-span-5 relative rounded-[22px] sm:rounded-[26px] overflow-hidden min-h-[220px] sm:min-h-[300px] shadow-xs border border-gray-200/80">
              <Image
                src="/images/hr-integrations-leader.jpg"
                alt="Head of People Tech"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            {/* Bottom-Right: Quote Testimonial Card */}
            <div className="md:col-span-7 bg-[#f0faf8] rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-[#4FB8AA]/30 shadow-xs min-h-[220px] sm:min-h-[300px]">
              <div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#4FB8AA] to-[#76D8C8] text-[#05434B] flex items-center justify-center mb-4 sm:mb-5 shadow-xs">
                  <Quote className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                </div>
                <p className="text-sm sm:text-base md:text-lg text-[#2B4C55] font-bold leading-snug mb-4">
                  &ldquo;Scaliify brought strategic clarity to our messy HR tech stack. They mapped every data touchpoint between our HRIS, DATEV, and ATS, then redesigned our onboarding handoff so we didn&apos;t even need an expensive custom API. It gave us a true single source of truth.&rdquo;
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-black">
                  Elin Bergström <span className="font-normal text-gray-600">| Head of People Operations</span>
                </p>
              </div>
            </div>
          </div>

          {/* Dual Action Conversion Cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-stretch mt-10 sm:mt-16">
            {/* Left Card: Demo / Consultation Card */}
            <div className="md:col-span-7 bg-[#cbece5] rounded-2xl sm:rounded-[32px] p-5 sm:p-7 md:p-10 flex flex-col justify-between shadow-[0_12px_35px_rgba(79,184,170,0.18)] border border-[#a6dfd4] relative overflow-hidden">
              <div className="mb-6">
                <div className="inline-flex items-center bg-[#ee7738] text-white text-[10.5px] sm:text-[11px] font-bold px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full uppercase tracking-wider mb-3 sm:mb-4 shadow-2xs">
                  Expert run, 30 minute audit
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-[32px] font-extrabold text-[#05434B] tracking-tight leading-[1.18]">
                  Book your integration assessment
                </h3>
              </div>

              {emailSubmitted ? (
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#05434B] bg-white/80 backdrop-blur-sm border border-[#5BC7BC]/50 px-5 py-3.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-[#2B4C55]" />
                  <span>Thank you! We will reach out to schedule your assessment.</span>
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
                      Request assessment
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Card: Tool Finder Card */}
            <div className="md:col-span-5 bg-[#032e35] text-white rounded-2xl sm:rounded-[32px] p-5 sm:p-7 md:p-10 flex flex-col justify-between shadow-[0_12px_35px_rgba(3,46,53,0.25)] border border-white/10 relative overflow-hidden">
              <div className="mb-6">
                <div className="inline-flex items-center bg-white text-[#05434B] text-[10.5px] sm:text-[11px] font-bold px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full uppercase tracking-wider mb-3 sm:mb-4 shadow-2xs">
                  Takes 2 minutes
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-[32px] font-extrabold text-white tracking-tight leading-[1.18]">
                  Benchmark tool integrations
                </h3>
              </div>

              <div>
                <Link
                  href="/tool-finder"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-[#66cfc3] to-[#8fe4da] text-[#05434B] text-xs sm:text-sm font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-[0_4px_16px_rgba(102,207,195,0.5),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:brightness-105 transition-all cursor-pointer active:scale-95 border border-white/40 text-center"
                >
                  <span>Explore Tool Finder</span>
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
            {hrIntegrationsFaqs.map((faq, index) => {
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
