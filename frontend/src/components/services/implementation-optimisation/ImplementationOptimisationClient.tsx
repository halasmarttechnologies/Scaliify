"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  X,
  Layers,
  Settings2,
  Users2,
  SearchCode,
  ShieldCheck,
  Quote,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Workflow,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { companies } from "@/data/companies";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogSection } from "@/components/home/BlogSection";

/**
 * Interactive Number Counter Component for animated statistics
 */
function AnimatedStatCounter({
  value,
  duration = 1.8,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // easeOutExpo for ultra-smooth realistic acceleration & deceleration
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * value;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue)}
      {suffix}
    </span>
  );
}

const pillars = [
  {
    icon: Settings2,
    title: "End-to-End Implementation",
    desc: "Structured project management, custom system configuration, lossless data migration, comprehensive testing, rollout, and user adoption.",
  },
  {
    icon: Users2,
    title: "Process & Cultural Change",
    desc: "We support both technical setup and human adoption. We guide cultural change and empower your team for long-term operational success.",
  },
  {
    icon: Workflow,
    title: "Proactive Optimization",
    desc: "We don't blindly execute requests. We challenge assumptions, ask the critical questions, and optimize workflows around system strengths.",
  },
  {
    icon: SearchCode,
    title: "HR IT Audit & System Review",
    desc: "Deep-dive process mapping, configuration review, data quality checks, and gap analysis to transform existing, underperforming software.",
  },
];

// Distinct, high-contrast brand color combinations for marquee cards (Scaliify branding colors only)
const marqueeCards = [
  // 1. Deep Brand Spruce Card with Luminous Tiffany Accents
  {
    type: "quote-card",
    bg: "bg-[#043339]",
    brandName: "techscale",
    brandColor: "text-[#81D8D0]",
    quoteColor: "text-white/95",
    authorColor: "text-[#76D8C8]",
    quote:
      "Scaliify didn’t just configure our new HRIS—they redesigned our onboarding and payroll workflows first. The cultural rollout was flawless across 4 European entities.",
    author: "Elena Richter | Head of People Operations",
    border: "border-[#81D8D0]/40",
  },
  // 2. Rowing Team Full Image Card with Deep Spruce & Tiffany Glow Overlay
  {
    type: "image-card",
    image: "/images/rowing-team.jpg",
    quote:
      "Our team adoption reached 99% within the first month. Scaliify guided our managers through every workflow change with hands-on empathy and technical precision.",
    author: "Lukas Weber | VP of People & Culture",
    border: "border-gray-200/50",
  },
  // 3. Vibrant Tiffany Blue Gradient Stat Card with Bold Spruce Contrast
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#81D8D0] via-[#5BC7BC] to-[#4FB8AA]",
    stat: "45%",
    statColor: "text-[#05434B]",
    subColor: "text-[#042d32]",
    brandColor: "text-[#05434B]",
    sub: "reduction in HR administrative burden post-rollout",
    brand: "Scaliify HR Advisory",
    border: "border-white/80",
  },
  // 4. Food Pantry Full Image Card (Audit & Gap Analysis)
  {
    type: "image-card",
    image: "/images/food-pantry.jpg",
    quote:
      "The HR IT Audit exposed data bottlenecks we had struggled with for two years. Scaliify reconfigured our entire stack without interrupting daily payroll.",
    author: "Sarah Lindemann | Chief People Officer",
    border: "border-gray-200/50",
  },
  // 5. Crisp Aqua Mint Light Card with Deep Spruce Typography
  {
    type: "quote-card",
    bg: "bg-[#E2F7F3]",
    brandName: "scaleup group",
    brandColor: "text-[#05434B]",
    quoteColor: "text-gray-900",
    authorColor: "text-[#2B4C55]",
    quote:
      "Unlike traditional IT contractors who just follow instructions, Scaliify told us what we actually needed to change to future-proof our organization.",
    author: "Markus Hoffmann | Managing Director",
    border: "border-[#76D8C8]/60",
  },
  // 6. Deep Dark Teal Gradient Card with Tiffany Glowing Highlights
  {
    type: "quote-card",
    bg: "bg-gradient-to-br from-[#08383F] via-[#05434B] to-[#12535C]",
    brandName: "globalflow",
    brandColor: "text-[#A8F5EE]",
    quoteColor: "text-white/95",
    authorColor: "text-[#81D8D0]",
    quote:
      "From data migration to custom DATEV integration, Scaliify handled all the heavy lifting while coaching our internal HR team on best practices.",
    author: "Sophie Dubois | Global HR Operations",
    border: "border-[#81D8D0]/50",
  },
];

const beforeItems = [
  "Blind software setup copying outdated, broken processes",
  "Fragmented data migrations resulting in duplicate records",
  "Zero change management leading to poor team adoption",
  "Contractors executing requests without questioning flaws",
  "Unused, expensive features causing software frustration",
];

const afterItems = [
  { text: "Optimized people processes tailored to system strengths", badge: "Strategic" },
  { text: "Spotless data migration & rigorous multi-tier testing", badge: "Zero Loss" },
  { text: "Empathetic cultural change & 98%+ user adoption", badge: "High Adoption" },
  { text: "Advisors who challenge assumptions & design best setups", badge: "True Advisory" },
  { text: "Harmonious, automated HR landscape built to scale", badge: "Effortless scale" },
];

const implementationFaqs = [
  {
    question: "How does Scaliify approach new HR software implementation?",
    answer:
      "We provide end-to-end advisory and technical implementation: project management, architecture design, workflow optimization, data migration, testing, and team rollout. Crucially, we don’t just copy your old manual workflows into a new system—we optimize your people operations to leverage the full capabilities of the chosen platform.",
  },
  {
    question: "What makes Scaliify different from typical IT implementation partners?",
    answer:
      "We don't just execute what we are asked to do without question. We act as strategic HR advisors who truly want the best long-term setup for your organization. We know which questions need to be asked, which legacy processes must be challenged, and how to guide both the technical and cultural transformation.",
  },
  {
    question: "What is included in an HR IT Audit for existing software setups?",
    answer:
      "Our HR IT Audit is a comprehensive health check of your current technology ecosystem. We map your existing workflows, conduct an in-depth configuration review, evaluate data quality and integrity, perform gap analyses, and deliver an actionable roadmap to streamline your HR landscape.",
  },
  {
    question: "How do you handle sensitive HR data migration safely?",
    answer:
      "Data security and precision are paramount. We follow a strict multi-phase migration protocol: data audit & cleansing, secure schema mapping, encrypted sandbox testing, validation dry-runs, and final cutover verification. We ensure 100% compliance with European GDPR and data retention standards.",
  },
  {
    question: "How do you support change management and user adoption?",
    answer:
      "Software only succeeds when people embrace it. We provide tailored training sessions for HR administrators, executive leadership, and line managers. We produce customized SOPs, video walkthroughs, and guided rollout communications that build confidence and excitement across your workforce.",
  },
  {
    question: "Can you help optimize a specific tool we already use (e.g. Personio, Deel, Leapsome)?",
    answer:
      "Yes. Whether you need to reconfigure custom approval workflows, connect payroll integrations (like DATEV), restructure access permissions, or automate performance review cycles, our consultants can optimize your existing tool without requiring a complete system replacement.",
  },
];

export function ImplementationOptimisationClient() {
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
              SCALIIFY FOR HR IT IMPLEMENTATION &amp; OPTIMISATION
            </p>

            {/* H1 Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-[1.12] mb-5">
              Expert HR IT implementation &amp; system optimisation
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-8 max-w-xl">
              We don&apos;t just configure software—we optimize your people processes, guide cultural change, and architect future-ready HR IT ecosystems tailored to your business.
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
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-black border border-gray-300 hover:border-[#2B4C55] px-6 py-3.5 rounded-full transition-all hover:bg-gray-50 cursor-pointer"
              >
                <span>Request HR IT Audit</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2B4C55]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Implementation & Workflow Optimization Image Card */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.08)] border border-gray-200/80">
              <Image
                src="/images/hr-implementation-hero.jpg"
                alt="Scaliify HR IT Implementation and strategic optimization consulting"
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
      {/* 3. FOUR PILLARS: "Strategic HR implementation built for growth" */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-black">
              Strategic HR implementation built for lasting impact
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
      {/* 4. MARQUEE CAROUSEL: "Seamless rollouts and high user adoption" */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-12 sm:py-16 overflow-hidden border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2">
            PROVEN ROLLOUTS ACROSS 50-5,000+ EMPLOYEES
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight">
            Seamless rollouts and high user adoption
          </h2>
        </div>

        {/* ── Marquee Container with smooth infinite glide ── */}
        <div className="relative w-full overflow-hidden select-none py-1">
          {/* Marquee Track */}
          <div className="animate-marquee-left flex items-center gap-3.5 sm:gap-6 w-max">
            {[...marqueeCards, ...marqueeCards].map((card, index) => (
              <div key={index} className="shrink-0">
                {/* Type 1: Quote Card */}
                {card.type === "quote-card" && (
                  <div
                    className={`${card.bg} ${card.border} rounded-[26px] p-6 sm:p-7 w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] flex flex-col justify-between border shadow-xs hover:shadow-md transition-all duration-300`}
                  >
                    <div className="pt-1">
                      <span className={`text-2xl sm:text-3xl font-extrabold tracking-tighter lowercase block ${card.brandColor || "text-[#2B4C55]"}`}>
                        {card.brandName}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${card.quoteColor || "text-black"}`}>
                        &ldquo;{card.quote}&rdquo;
                      </p>
                      <p className={`text-[11px] font-bold ${card.authorColor || "text-gray-700"}`}>
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05434B]/95 via-[#032e35]/50 to-transparent" />
                    <div className="absolute inset-x-3 bottom-3 bg-[#032e35]/85 backdrop-blur-md border border-[#81D8D0]/30 rounded-2xl p-3.5 text-white">
                      <p className="text-xs leading-relaxed font-medium mb-1.5 line-clamp-4">
                        &ldquo;{card.quote}&rdquo;
                      </p>
                      <p className="text-[10px] text-[#81D8D0] font-bold">
                        {card.author}
                      </p>
                    </div>
                  </div>
                )}

                {/* Type 3: Bold Gradient Stat Card */}
                {card.type === "stat-card" && (
                  <div
                    className={`${card.bg} rounded-[26px] p-6 sm:p-7 w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] flex flex-col items-center justify-between text-center relative shadow-xs hover:shadow-md transition-all duration-300 border ${card.border}`}
                  >
                    <div className="w-full flex justify-center pt-1 opacity-0 select-none">
                      spacer
                    </div>
                    <div className="flex flex-col items-center">
                      <p className={`text-5xl sm:text-6xl font-black leading-none tracking-tight ${card.statColor || "text-white"}`}>
                        {card.stat}
                      </p>
                      <p className={`text-xs sm:text-sm font-bold mt-2 max-w-[220px] ${card.subColor || "text-[#76D8C8]"}`}>
                        {card.sub}
                      </p>
                    </div>
                    <div className="pb-1">
                      <span className={`text-base sm:text-lg font-bold font-serif italic tracking-wide ${card.brandColor || "text-white/95"}`}>
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
              Why companies choose Scaliify for implementation
            </h2>
          </div>

          {/* Comparison Card Container */}
          <div className="bg-gradient-to-br from-[#ecf8f6] via-[#f4faf9] to-white rounded-3xl p-6 sm:p-10 border border-[#76D8C8]/40 shadow-[0_15px_45px_rgba(79,184,170,0.14)] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch relative overflow-hidden">
            {/* Subtle Ambient Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(118,216,200,0.35)_0%,transparent_70%)] pointer-events-none blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle,rgba(79,184,170,0.22)_0%,transparent_70%)] pointer-events-none blur-2xl" />

            {/* Left: Before Scaliify (Clean Light Neutral Card) */}
            <div className="bg-white/95 backdrop-blur-sm text-gray-900 rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200/80 flex flex-col justify-between relative z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
                  Before Scaliify
                </h3>
                <ul className="flex flex-col gap-4">
                  {beforeItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                      <div className="w-5 h-5 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 mt-0.5 text-gray-500">
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: After Scaliify (Deep Brand Teal Gradient Card with Glowing Tiffany Accents) */}
            <div className="bg-gradient-to-br from-[#05434B] via-[#2B4C55] to-[#043339] text-white rounded-2xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(5,67,75,0.35)] border border-[#81D8D0]/60 flex flex-col justify-between relative z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#81D8D0] mb-6">
                  After Scaliify
                </h3>
                <ul className="flex flex-col gap-4">
                  {afterItems.map(({ text, badge }) => (
                    <li key={text} className="flex items-start justify-between gap-2 sm:gap-3 text-xs sm:text-sm text-white leading-relaxed font-semibold">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#81D8D0] text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="text-white/95">{text}</span>
                      </div>
                      {badge && (
                        <span className="shrink-0 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide bg-[#81D8D0]/20 text-[#A8F5EE] border border-[#81D8D0]/40 px-2 sm:px-2.5 py-0.5 rounded-full mt-0.5 whitespace-nowrap">
                          {badge}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Link to Consultation */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/lets-talk"
              className="inline-flex items-center gap-2 text-sm font-bold text-black hover:text-[#4FB8AA] transition-colors group"
            >
              <span>Planning a new HR software rollout? Talk to our senior advisory team</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#4FB8AA]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. REAL IMPACT FOR OUR CUSTOMERS (Tiffany Gradient Fade BG)  */}
      {/* ============================================================ */}
      <section className="w-full bg-gradient-to-b from-white via-[#81D8D0]/35 to-white py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100 relative overflow-hidden">
        {/* Soft Tiffany Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[radial-gradient(circle,rgba(129,216,208,0.45)_0%,transparent_70%)] pointer-events-none blur-3xl -z-0" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black max-w-2xl mx-auto leading-tight">
              Real impact for our clients
            </h2>
          </div>

          {/* 3 Metric Stats Row with Animated Number Counters (Black in color) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16 text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                <AnimatedStatCounter value={98} suffix="%" duration={1.8} />
              </span>
              <span className="text-xs sm:text-sm text-gray-800 font-semibold max-w-[200px]">
                on-time implementation rollout rate
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                <AnimatedStatCounter value={45} suffix="%" duration={1.8} />
              </span>
              <span className="text-xs sm:text-sm text-gray-800 font-semibold max-w-[200px]">
                average administrative workload reduction
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                <AnimatedStatCounter value={4.9} decimals={1} suffix="/5" duration={1.8} />
              </span>
              <span className="text-xs sm:text-sm text-gray-800 font-semibold max-w-[200px]">
                internal manager &amp; employee adoption score
              </span>
            </div>
          </div>

          {/* 2x2 Bento Customer Story Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch mb-10 sm:mb-14">
            {/* Top-Left: Customer Story Logo Card */}
            <div className="md:col-span-7 bg-gradient-to-b from-[#eaf7f5] via-white to-white rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center border border-[#76D8C8]/40 shadow-xs min-h-[140px] sm:min-h-[180px]">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-3">
                IMPLEMENTATION STORY
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

            {/* Top-Right: 60% Stat Card (Tiffany background with black text) */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#81D8D0] via-[#76D8C8] to-[#A8F5EE] text-black rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-center min-h-[140px] sm:min-h-[180px] shadow-xs border border-white/60">
              <p className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-black mb-3">
                <AnimatedStatCounter value={60} suffix="%" duration={1.6} />
              </p>
              <p className="text-xs sm:text-sm font-bold text-black leading-snug">
                more time each day to focus on people
              </p>
            </div>

            {/* Bottom-Left: Client Leader Portrait Photo (Dedicated Implementation Story Image) */}
            <div className="md:col-span-5 relative rounded-[22px] sm:rounded-[26px] overflow-hidden min-h-[220px] sm:min-h-[300px] shadow-xs border border-gray-200/80">
              <Image
                src="/images/hr-implementation-leader.jpg"
                alt="Claire Henderson - VP of People & Culture"
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
                  &ldquo;Scaliify transformed our entire HR IT rollout. Instead of blindly configuring what we thought we needed, they guided us on best practices, trained our team, and delivered a spotless integration with DATEV.&rdquo;
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-black">
                  Claire Henderson <span className="font-normal text-gray-600">| VP of People &amp; Culture</span>
                </p>
              </div>
            </div>
          </div>

          {/* Dual Action Conversion Cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-stretch mt-10 sm:mt-16">
            {/* Left Card: Light Mint Demo Booking Card */}
            <div className="md:col-span-7 bg-[#cbece5] rounded-2xl sm:rounded-[32px] p-5 sm:p-7 md:p-10 flex flex-col justify-between shadow-[0_12px_35px_rgba(79,184,170,0.18)] border border-[#a6dfd4] relative overflow-hidden">
              <div className="mb-6">
                <div className="inline-flex items-center bg-[#ee7738] text-white text-[10.5px] sm:text-[11px] font-bold px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full uppercase tracking-wider mb-3 sm:mb-4 shadow-2xs">
                  Expert Consultation, 30 min
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-[32px] font-extrabold text-[#05434B] tracking-tight leading-[1.18]">
                  Plan your system implementation
                </h3>
              </div>

              {emailSubmitted ? (
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#05434B] bg-white/80 backdrop-blur-sm border border-[#5BC7BC]/50 px-5 py-3.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-[#2B4C55]" />
                  <span>Thank you! We will reach out to schedule your session.</span>
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
                      Request consultation
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Card: Dark Brand Spruce Card */}
            <div className="md:col-span-5 bg-[#032e35] text-white rounded-2xl sm:rounded-[32px] p-5 sm:p-7 md:p-10 flex flex-col justify-between shadow-[0_12px_35px_rgba(3,46,53,0.25)] border border-white/10 relative overflow-hidden">
              <div className="mb-6">
                <div className="inline-flex items-center bg-white text-[#05434B] text-[10.5px] sm:text-[11px] font-bold px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full uppercase tracking-wider mb-3 sm:mb-4 shadow-2xs">
                  Free Assessment
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-[32px] font-extrabold text-white tracking-tight leading-[1.18]">
                  Request an HR IT System Audit
                </h3>
              </div>

              <div>
                <Link
                  href="/lets-talk"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-[#66cfc3] to-[#8fe4da] text-[#05434B] text-xs sm:text-sm font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-[0_4px_16px_rgba(102,207,195,0.5),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:brightness-105 transition-all cursor-pointer active:scale-95 border border-white/40 text-center"
                >
                  <span>Schedule Audit</span>
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
            {implementationFaqs.map((faq, index) => {
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
