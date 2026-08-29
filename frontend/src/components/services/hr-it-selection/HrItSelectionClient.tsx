"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  X,
  Layers,
  Search,
  TrendingUp,
  ShieldCheck,
  Quote,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companies } from "@/data/companies";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogSection } from "@/components/home/BlogSection";

const pillars = [
  {
    icon: Search,
    title: "Vendor-Neutral Selection",
    desc: "100% independent evaluation across 100+ European HR software vendors without bias or vendor commissions.",
  },
  {
    icon: Layers,
    title: "Zero Silo Structures",
    desc: "Harmonious HR tech architectures where Core HR, Payroll, ATS, and Time tracking connect effortlessly.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Infrastructure",
    desc: "IT infrastructure engineered to scale frictionlessly as your company headcount grows from 50 to 5,000+.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Security",
    desc: "Guaranteed alignment with European data privacy standards, GDPR, and German labor regulations (BAG).",
  },
];

const marqueeCards = [
  // 1. Independent Evaluation Quote Card
  {
    type: "quote-card",
    bg: "bg-[#f0faf8]",
    brandName: "techscale",
    quote:
      "Scaliify benchmarked 15+ HRIS solutions for our European expansion. Their vendor-neutral evaluation saved us 4 months of sales demos and prevented costly software lock-in.",
    author: "Elena Richter | Head of People Operations",
    border: "border-[#76D8C8]/40",
  },
  // 2. Rowing Team Full Image Card (Zero Silos & Payroll integration)
  {
    type: "image-card",
    image: "/images/rowing-team.jpg",
    quote:
      "We replaced 4 disconnected spreadsheets with an interconnected HR & DATEV payroll architecture. Our headcount doubled without adding administrative overhead.",
    author: "Lukas Weber | VP of People & Culture",
    border: "border-gray-200/50",
  },
  // 3. Scaliify Logo Gradient Stat Card
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#2B4C55] via-[#05434B] to-[#4FB8AA]",
    stat: "40%",
    sub: "faster software evaluation cycle",
    brand: "Scaliify HR Advisory",
    border: "border-[#76D8C8]/30",
  },
  // 4. Food Pantry Full Image Card (Unbiased Selection Confidence)
  {
    type: "image-card",
    image: "/images/food-pantry.jpg",
    quote:
      "Having independent HR advisors who don't take vendor commissions gave us total confidence in choosing our new European ATS and Core HR platform.",
    author: "Sarah Lindemann | Chief People Officer",
    border: "border-gray-200/50",
  },
  // 5. Scalable Architecture Quote Card
  {
    type: "quote-card",
    bg: "bg-[#e8f7f4]",
    brandName: "scaleup group",
    quote:
      "From RFP requirements to vendor shortlisting and contract negotiations, Scaliify ensured our HR architecture scales effortlessly from 100 to 1,000+ employees.",
    author: "Markus Hoffmann | Managing Director",
    border: "border-[#4FB8AA]/40",
  },
  // 6. Modern Office Team Full Image Card (Compliance & GDPR)
  {
    type: "image-card",
    image: "/images/office-team.jpg",
    quote:
      "Scaliify helped us navigate GDPR compliance, German labor standards (BAG), and payroll integrations seamlessly during our HR software switch.",
    author: "Sophie Dubois | Global HR Operations",
    border: "border-gray-200/50",
  },
];

const beforeItems = [
  "Fragmented point solutions & data silos",
  "Biased vendor pitches and hidden commissions",
  "Costly implementation delays & software rework",
  "Manual spreadsheet syncs between HR & Payroll",
  "Growing pains with rigid, outdated systems",
];

const afterItems = [
  { text: "100% Independent & vendor-neutral selection", badge: "100% Unbiased" },
  { text: "Harmonised, silo-free HR architecture", badge: null },
  { text: "Automated, interconnected HR workflows", badge: "+40% faster" },
  { text: "Centralised employee data & single source of truth", badge: null },
  { text: "Future-proof infrastructure ready to scale", badge: "Effortless scale" },
];

const impactStats = [
  { value: "33%", label: "more productive HR teams" },
  { value: "12%", label: "overall HR cost savings" },
  { value: "52%", label: "saw value within first 3 months of rollout" },
];

const hrSelectionFaqs = [
  {
    question: "How does Scaliify remain 100% independent and vendor-neutral?",
    answer:
      "Unlike traditional software brokers or affiliate resellers, Scaliify does not accept kickbacks, commissions, or referral fees from software vendors. Our recommendations are driven strictly by your specific technical requirements, headcount trajectory, budget, and compliance needs.",
  },
  {
    question: "How long does a typical HR IT software selection process take?",
    answer:
      "A standard evaluation cycle takes between 2 to 4 weeks from initial requirements discovery to vendor shortlisting, structured RFP demos, and final contract guidance. We compress months of manual research into clear, side-by-side comparison scorecards.",
  },
  {
    question: "Which European and global HR software systems do you compare?",
    answer:
      "We benchmark over 100+ platforms across Core HRIS, ATS/Recruiting, Payroll, Time Tracking, Performance, and EOR solutions—including Personio, Factorial, Deel, Rippling, HiBob, Workday, BambooHR, Ashby, Greenhouse, Leapsome, and DATEV integrations.",
  },
  {
    question: "Do you help with software implementation and data migration?",
    answer:
      "Yes. Once your ideal platform is selected, our technical implementation team assists with data cleansing, legacy system migration, workflow automation, and custom API integrations to ensure a frictionless rollout.",
  },
  {
    question: "How do you ensure data privacy and GDPR / German BAG compliance?",
    answer:
      "All shortlisted tools undergo rigorous security and regulatory vetting, ensuring European data residency, GDPR compliance, workers council (Betriebsrat) alignment, and German labor law compliance (BAG working time directives).",
  },
  {
    question: "Can Scaliify help negotiate software contracts and licensing pricing?",
    answer:
      "Yes. Our deep benchmark data and insight into vendor pricing models enable us to advise on licensing tiers, user thresholds, and renewal terms, typically saving our clients 15–30% on annual contract values.",
  },
];

export function HrItSelectionClient() {
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
              SCALIIFY FOR HR IT SELECTION
            </p>

            {/* H1 Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-[1.12] mb-5">
              Independent, vendor-neutral help choosing HR software
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-8 max-w-xl">
              We help growing companies navigate the crowded HR technology landscape. From requirements definition to contract finalisation, we ensure a harmonious, silo-free HR architecture that scales effortlessly with your team.
            </p>

            {/* CTA Buttons (Glossy Shiny Tiffany Blue Let's Talk Style Button) */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/lets-talk"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-extrabold text-brand-dark bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_4px_22px_rgba(129,216,208,0.65)] border border-white/80 hover:shadow-[0_6px_28px_rgba(129,216,208,0.95)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Top Glossy Specular Reflection Sheen */}
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

          {/* Right Column: Hero Consulting Image Card */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.08)] border border-gray-200/80">
              <Image
                src="/images/hr-selection-hero.jpg"
                alt="Scaliify HR IT Selection strategic consulting"
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
      {/* 3. FOUR PILLARS: "Harmonious HR tech built for scaling teams" */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-black">
              Harmonious HR tech built for scaling teams
            </h2>
          </div>

          {/* 4 Pillars Grid (All Glossy Shiny Tiffany Blue Icons) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3 group">
                {/* Icon Container with Glossy Shiny Tiffany Styling */}
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5BC7BC] via-[#81D8D0] to-[#A8F5EE] text-[#05434B] flex items-center justify-center shrink-0 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85),0_8px_20px_rgba(129,216,208,0.38)] border border-white/70 mb-1 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),0_12px_25px_rgba(129,216,208,0.55)] overflow-hidden">
                  {/* Top Glass Sheen */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent pointer-events-none rounded-t-2xl" />
                  <Icon className="w-5 h-5 stroke-[2.4] relative z-10" />
                </div>
                {/* Title */}
                <h3 className="text-base sm:text-[17px] font-bold text-black leading-snug">
                  {title}
                </h3>
                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. MARQUEE CAROUSEL: "Join the organisations unlocking impact" */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-12 sm:py-16 overflow-hidden border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2">
            USED DAILY BY TEAMS FROM 50-5000 EMPLOYEES
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight">
            Join the organisations unlocking impact
          </h2>
        </div>

        {/* ── Marquee Container with smooth infinite glide ── */}
        <div className="relative w-full overflow-hidden select-none py-1">
          {/* Marquee Track — duplicate items for seamless continuous loop */}
          <div className="animate-marquee-left flex items-center gap-3.5 sm:gap-6 w-max">
            {[...marqueeCards, ...marqueeCards].map((card, index) => (
              <div key={index} className="shrink-0">
                {/* Type 1: Quote Card (Solid light background with logo) */}
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

                {/* Type 2: Full Image Card with Frosted Dark Overlay at Bottom */}
                {card.type === "image-card" && (
                  <div
                    className="relative rounded-[26px] w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                  >
                    {/* Background photo */}
                    <Image
                      src={card.image!}
                      alt={card.author!}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="310px"
                    />

                    {/* Dark gradient fade over bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B4C55]/90 via-black/30 to-transparent" />

                    {/* Floating Frosted Glass Quote Card at bottom */}
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
      {/* 5. BEFORE VS AFTER COMPARISON CARD (Clean White Background)  */}
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

          {/* Comparison Card Container (Deep Teal Gradient #05434B -> #2B4C55) */}
          <div className="bg-gradient-to-br from-[#05434B] via-[#2B4C55] to-[#1b3a42] rounded-3xl p-6 sm:p-10 border border-[#76D8C8]/20 shadow-[0_15px_45px_rgba(5,67,75,0.22)] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch relative overflow-hidden">
            
            {/* Subtle Ambient Glow in Logo Palette */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(118,216,200,0.25)_0%,transparent_70%)] pointer-events-none blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle,rgba(79,184,170,0.18)_0%,transparent_70%)] pointer-events-none blur-2xl" />

            {/* Left: Before Scaliify (Direct on dark container, no background) */}
            <div className="flex flex-col justify-between py-2 sm:py-4 pr-0 md:pr-6 relative z-10 text-white">
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
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: After Scaliify (White Box with Medium & Light Teal Accents) */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-[#76D8C8]/50 flex flex-col justify-between relative z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#2B4C55] mb-6">
                  After Scaliify
                </h3>
                <ul className="flex flex-col gap-4">
                  {afterItems.map(({ text, badge }) => (
                    <li key={text} className="flex items-start justify-between gap-2 sm:gap-3 text-xs sm:text-sm text-black leading-relaxed font-semibold">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#4FB8AA] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span>{text}</span>
                      </div>
                      {badge && (
                        <span className="shrink-0 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide bg-[#76D8C8]/30 text-[#05434B] px-2 sm:px-2.5 py-0.5 rounded-full mt-0.5 whitespace-nowrap">
                          {badge}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Bottom Link to Tool Finder / Consultation */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/tool-finder"
              className="inline-flex items-center gap-2 text-sm font-bold text-black hover:text-[#4FB8AA] transition-colors group"
            >
              <span>Not sure which HR tool you need? Use our free interactive tool finder</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#4FB8AA]" />
            </Link>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. REAL IMPACT FOR OUR CUSTOMERS (Tiffany Gradient Fade BG)  */}
      {/* ============================================================ */}
      <section className="w-full bg-gradient-to-b from-white via-[#81D8D0]/35 to-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100 relative overflow-hidden">
        
        {/* Soft Tiffany Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[radial-gradient(circle,rgba(129,216,208,0.45)_0%,transparent_70%)] pointer-events-none blur-3xl -z-0" />

        <div className="max-w-5xl mx-auto relative z-10">

          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black max-w-2xl mx-auto leading-tight">
              Real impact for our customers
            </h2>
          </div>

          {/* 3 Metric Stats Row (Black in color) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 text-center">
            {impactStats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                  {value}
                </span>
                <span className="text-xs sm:text-sm text-gray-800 font-semibold max-w-[200px]">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* 2x2 Bento Customer Story Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch mb-10 sm:mb-14">

            {/* Top-Left: Customer Story Logo Card */}
            <div className="md:col-span-7 bg-gradient-to-b from-[#eaf7f5] via-white to-white rounded-[26px] p-6 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center border border-[#76D8C8]/40 shadow-xs min-h-[180px] sm:min-h-[220px]">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-3">
                CUSTOMER STORY
              </p>
              <div className="relative h-12 w-36">
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

            {/* Top-Right: 60% Stat Card (Tiffany background with black text) */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#81D8D0] via-[#76D8C8] to-[#A8F5EE] text-black rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-center min-h-[180px] sm:min-h-[220px] shadow-xs border border-white/60">
              <p className="text-5xl sm:text-6xl font-black tracking-tight leading-none text-black mb-3">
                60%
              </p>
              <p className="text-xs sm:text-sm font-bold text-black leading-snug">
                more time each day to focus on people
              </p>
            </div>

            {/* Bottom-Left: Client Leader Portrait Photo */}
            <div className="md:col-span-5 relative rounded-[26px] overflow-hidden min-h-[260px] sm:min-h-[340px] shadow-xs border border-gray-200/80">
              <Image
                src="/images/hr-leader-story.jpg"
                alt="Laura Mohan - HR Business Partner"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            {/* Bottom-Right: Quote Testimonial Card (#4FB8AA & #76D8C8 accents) */}
            <div className="md:col-span-7 bg-[#f0faf8] rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-[#4FB8AA]/30 shadow-xs min-h-[260px] sm:min-h-[340px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4FB8AA] to-[#76D8C8] text-[#05434B] flex items-center justify-center mb-5 shadow-xs">
                  <Quote className="w-5 h-5 fill-current" />
                </div>
                <p className="text-base sm:text-lg text-[#2B4C55] font-bold leading-snug mb-4">
                  &ldquo;By partnering with Scaliify for our HR IT selection, we cut evaluation time to weeks and eliminated costly vendor lock-in. It streamlined everything around onboarding, reporting, and core HR systems.&rdquo;
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-black">
                  Laura Mohan <span className="font-normal text-gray-600">| HR Business Partner</span>
                </p>
              </div>
            </div>

          </div>

          {/* Dual Action Conversion Cards (Matching screenshot) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-7 items-stretch mt-12 sm:mt-16">

            {/* Left Card: Light Mint / Tiffany Demo Booking Card */}
            <div className="md:col-span-7 bg-[#cbece5] rounded-2xl sm:rounded-[32px] p-5 sm:p-7 md:p-10 flex flex-col justify-between shadow-[0_12px_35px_rgba(79,184,170,0.18)] border border-[#a6dfd4] relative overflow-hidden">
              <div className="mb-6">
                {/* Orange/Coral Pill Badge */}
                <div className="inline-flex items-center bg-[#ee7738] text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4 shadow-2xs">
                  Expert run, 30 minute tour
                </div>

                {/* Heading */}
                <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#05434B] tracking-tight leading-[1.18]">
                  Book your personalised demo
                </h3>
              </div>

              {/* Email capture form with glossy Tiffany button */}
              {emailSubmitted ? (
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#05434B] bg-white/80 backdrop-blur-sm border border-[#5BC7BC]/50 px-5 py-3.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-[#2B4C55]" />
                  <span>Thank you! We will reach out to schedule your tour.</span>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="w-full">
                  <div className="bg-white rounded-full p-1.5 pl-5 flex items-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] border border-white/80 w-full">
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="What's your work email? *"
                      aria-label="Work email address"
                      className="w-full text-xs sm:text-sm text-black placeholder:text-gray-400 focus:outline-none bg-transparent"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-[#66cfc3] to-[#8fe4da] text-[#05434B] text-xs sm:text-sm font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-[0_4px_14px_rgba(102,207,195,0.45),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:brightness-105 transition-all shrink-0 cursor-pointer active:scale-95 border border-white/40"
                    >
                      Request free demo
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Card: Dark Brand Spruce Interactive Product Tour Card */}
            <div className="md:col-span-5 bg-[#032e35] text-white rounded-2xl sm:rounded-[32px] p-5 sm:p-7 md:p-10 flex flex-col justify-between shadow-[0_12px_35px_rgba(3,46,53,0.25)] border border-white/10 relative overflow-hidden">
              <div className="mb-6">
                {/* White Pill Badge */}
                <div className="inline-flex items-center bg-white text-[#05434B] text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4 shadow-2xs">
                  Takes 2 minutes
                </div>

                {/* Heading */}
                <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-white tracking-tight leading-[1.18]">
                  Take an interactive product tour
                </h3>
              </div>

              {/* Glossy Tiffany Button Link */}
              <div>
                <Link
                  href="/tool-finder"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[#66cfc3] to-[#8fe4da] text-[#05434B] text-xs sm:text-sm font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-[0_4px_16px_rgba(102,207,195,0.5),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:brightness-105 transition-all cursor-pointer active:scale-95 border border-white/40"
                >
                  <span>Take a product tour</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. TESTIMONIALS SECTION (From Home Landing Page)             */}
      {/* ============================================================ */}
      <Testimonials />

      {/* ============================================================ */}
      {/* 8. FREQUENTLY ASKED QUESTIONS ACCORDION                      */}
      {/* ============================================================ */}
      <section className="w-full bg-[#fafafa] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2B4C55] mb-2.5">
              CLEAR ANSWERS
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Frequently asked questions
            </h2>
          </div>

          {/* Minimalist Line-Separated Accordion List */}
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {hrSelectionFaqs.map((faq, index) => {
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
      {/* 9. BLOG SECTION (Articles & Strategic HR Insights)           */}
      {/* ============================================================ */}
      <BlogSection />

    </main>
  );
}
