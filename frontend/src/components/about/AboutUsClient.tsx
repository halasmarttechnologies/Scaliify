"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  ArrowRight,
  Check,
  Globe2,
  Users,
  Award,
  ShieldCheck,
  Building2,
  Sparkles,
  Scale,
  Code2,
  Target,
  Compass,
  MapPin,
  Clock,
  TrendingUp,
  Briefcase,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedStatCounter } from "@/components/common/AnimatedStatCounter";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";
import { Testimonials } from "@/components/home/Testimonials";

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

const milestonesEn = [
  {
    year: "2021",
    title: "Vision & Foundation",
    description: "Scaliify was founded to bridge the gap between ambitious growth and operational excellence, combining HR leadership with Big-4 consulting rigor.",
    position: "top",
  },
  {
    year: "2022",
    title: "Rapid Expansion across DACH",
    description: "Scaled our first 30+ tech startups and mid-market European clients, establishing our vendor-neutral benchmark model.",
    position: "bottom",
  },
  {
    year: "2023",
    title: "Global Specialist Network",
    description: "Curated a vetted network of project-specific lawyers, HRIS developers, and compensation strategists across Europe.",
    position: "top",
  },
  {
    year: "2024",
    title: "Dubai Global Headquarters",
    description: "Established our global headquarters in Dubai, blending forward-thinking innovation with deep cultural agility to serve clients worldwide.",
    position: "bottom",
  },
  {
    year: "2025",
    title: "100+ Network Specialists",
    description: "Expanded to over 100 on-demand HR specialists, providing turnkey interim leadership and outsourced HR operations.",
    position: "top",
  },
  {
    year: "2026",
    title: "Next-Gen HR Advisory",
    description: "Empowering hundreds of scaling businesses with independent HR technology selection and high-impact people operations.",
    position: "bottom",
  },
];

const milestonesDe = [
  {
    year: "2021",
    title: "Vision & Gründung",
    description: "Scaliify wurde gegründet, um die Lücke zwischen ambitioniertem Wachstum und operativer Exzellenz zu schließen – mit praxisnaher HR-Führung und Big-4-Beratungskompetenz.",
    position: "top",
  },
  {
    year: "2022",
    title: "Schnelle Expansion in DACH",
    description: "Erfolgreiche Skalierung unserer ersten 30+ Tech-Startups und mittelständischen Kunden in Deutschland, Österreich und der Schweiz.",
    position: "bottom",
  },
  {
    year: "2023",
    title: "Globales Spezialisten-Netzwerk",
    description: "Aufbau eines kuratierten Netzwerks aus spezialisierten Arbeitsrechtler:innen, HRIS-Entwickler:innen und Vergütungsstrateg:innen in ganz Europa.",
    position: "top",
  },
  {
    year: "2024",
    title: "Globaler Hauptsitz in Dubai",
    description: "Eröffnung unserer globalen Zentrale in Dubai – Verbindung von zukunftsorientierter Innovation mit internationaler Agilität.",
    position: "bottom",
  },
  {
    year: "2025",
    title: "100+ Netzwerk-Spezialist:innen",
    description: "Ausbau auf über 100 on-demand HR-Fachkräfte für Interimsführung und ausgelagertes Personalmanagement.",
    position: "top",
  },
  {
    year: "2026",
    title: "Next-Gen HR-Beratung",
    description: "Begleitung von hunderten wachsenden Unternehmen bei herstellerneutraler HR-Softwareauswahl und skalierbaren People Operations.",
    position: "bottom",
  },
];

const expertDomainsEn = [
  {
    icon: Scale,
    title: "Employment Lawyers & Compliance",
    desc: "Specialized in German & European labor law, Betriebsrat negotiations (§87 BetrVG), contract frameworks, and Scheinselbstständigkeit audits.",
  },
  {
    icon: Code2,
    title: "HRIS Developers & Integrators",
    desc: "Technical engineers specializing in custom API connections, webhook syncs, and automated pipelines between Personio, HiBob, DATEV, and ERPs.",
  },
  {
    icon: Target,
    title: "Executive & Tech Recruiters",
    desc: "High-velocity talent acquisition partners with deep networks across engineering, product, sales, and executive C-suite leadership.",
  },
  {
    icon: Layers,
    title: "Comp & Benefits Strategists",
    desc: "Experts in salary leveling bands, total reward architectures, European market benchmarks, and equity/VSOP incentive designs.",
  },
];

const expertDomainsDe = [
  {
    icon: Scale,
    title: "Arbeitsrecht & Compliance",
    desc: "Spezialisiert auf deutsches & europäisches Arbeitsrecht, Betriebsratverhandlungen (§ 87 BetrVG), Vertragswerke und Scheinselbstständigkeits-Prüfungen.",
  },
  {
    icon: Code2,
    title: "HRIS-Entwickler & Integratoren",
    desc: "Technische Ingenieure für individuelle API-Anbindungen, Webhook-Synchronisationen und automatisierte Pipelines zwischen Personio, HiBob, DATEV und ERP-Systemen.",
  },
  {
    icon: Target,
    title: "Executive- & Tech-Recruiter",
    desc: "High-Velocity Talent Acquisition Partner mit etablierten Netzwerken in Engineering, Product, Sales und C-Level-Führung.",
  },
  {
    icon: Layers,
    title: "Comp- & Benefits-Strategen",
    desc: "Expert:innen für Gehaltsbänder, Vergütungsarchitekturen, europäische Markt-Benchmarks und Mitarbeiterbeteiligungsmodelle (VSOP/ESOP).",
  },
];

export function AboutUsClient() {
  const locale = useLocale();
  const isDe = locale === "de";

  const timelineMilestones = isDe ? milestonesDe : milestonesEn;
  const expertDomains = isDe ? expertDomainsDe : expertDomainsEn;

  return (
    <main className="w-full bg-white overflow-hidden text-black font-sans">
      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="w-full relative overflow-hidden bg-gradient-to-bl from-[#81D8D0]/35 via-white/80 to-white pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="absolute -top-20 -right-20 sm:-top-28 sm:-right-28 w-[600px] sm:w-[800px] h-[500px] sm:h-[650px] bg-[radial-gradient(ellipse_at_top_right,rgba(129,216,208,0.85)_0%,rgba(129,216,208,0.55)_35%,rgba(91,199,188,0.25)_60%,transparent_80%)] pointer-events-none blur-3xl -z-0" />
        <div className="absolute top-0 right-1/4 w-[450px] h-[300px] bg-[radial-gradient(circle,rgba(129,216,208,0.45)_0%,transparent_70%)] pointer-events-none blur-2xl -z-0" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Left Column: Vision & Copy */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2B4C55] mb-3.5">
              {isDe ? "ÜBER SCALIIFY" : "ABOUT SCALIIFY"}
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-[1.12] mb-5">
              {isDe
                ? "Die Full-Service HR-Beratung, aufgebaut auf einer Idee"
                : "The full-service HR consultancy built around one idea"}
            </h1>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 max-w-xl">
              {isDe
                ? "scaliify wurde 2022 von Ben und Sarah aus einer Überzeugung heraus gegründet: Die meisten HR-Beratungen sind entweder stark in der Strategie oder stark in der Umsetzung – selten in beidem. Wir verbinden beides."
                : "scaliify was founded in 2022 by Ben and Sarah around one conviction: most HR consultancies are either strong on strategy or strong on execution, rarely both. We combine the two."}
            </p>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-8 max-w-xl font-medium">
              {isDe
                ? "Wir sind auf die DACH-Region spezialisiert und arbeiten gleichzeitig international, einschließlich einer wachsenden Präsenz in den VAE. Das bedeutet, dass wir die lokalen Regeln, die Kultur und die alltäglichen HR-Realitäten dieser Märkte verstehen – nicht nur die allgemeine Theorie."
                : "We're specialised in the DACH region while also working internationally, including a growing presence in the UAE. This means we understand the local rules, culture, and everyday HR realities of these markets, not just the general theory."}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/lets-talk"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-extrabold text-brand-dark bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_4px_22px_rgba(129,216,208,0.65)] border border-white/80 hover:shadow-[0_6px_28px_rgba(129,216,208,0.95)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/75 to-transparent rounded-t-full pointer-events-none" />
                <span className="relative z-10 tracking-tight font-extrabold">
                  {isDe ? "Mit unserem Team sprechen" : "Talk to our team"}
                </span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="#our-story"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-black border border-gray-300 hover:border-[#2B4C55] px-6 py-3.5 rounded-full transition-all hover:bg-gray-50 cursor-pointer"
              >
                <span>{isDe ? "Unsere Geschichte lesen" : "Read our story"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2B4C55]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Audience / Team Photo Card */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.08)] border border-gray-200/80">
              <Image
                src="/images/about-hero.jpg"
                alt="Audience of European tech innovators, founders, and HR leaders applauding at company keynote"
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
      {/* 2. STATS BAR SECTION                                         */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-12 sm:py-16 border-b border-gray-100 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-center">
            {/* Stat 1 */}
            <div className="flex flex-col items-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                <AnimatedStatCounter value={100} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold">
                {isDe ? "Spezialist:innen im globalen Netzwerk" : "specialists in global network"}
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                <AnimatedStatCounter value={15} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold">
                {isDe ? "Jahre Führung & Big-4-Beratung" : "years leadership & Big-4 consulting"}
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                5+
              </p>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold">
                {isDe ? "europäische & globale Märkte expandiert" : "European & global markets expanded"}
              </p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                <AnimatedStatCounter value={350} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold">
                {isDe ? "Einstellungen & Onboardings in 8 Monaten geleitet" : "hires led & onboarded in 8 months"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. OUR STORY & TIMELINE                                      */}
      {/* ============================================================ */}
      <section id="our-story" className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          {/* Header & Story Narrative */}
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] mb-3">
              {isDe ? "UNSER WEG" : "OUR JOURNEY"}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-tight mb-6">
              {isDe ? "Unsere Geschichte" : "Our story"}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              {isDe ? (
                <>
                  <p>
                    scaliify wurde 2022 von Ben und Sarah gegründet. Wir haben es um eine Idee herum aufgebaut: Die meisten HR-Beratungen sind entweder stark in der Strategie oder stark in der Umsetzung – selten in beidem. Wir kombinieren beides.
                  </p>
                  <p>
                    Wir sind auf die DACH-Region spezialisiert und arbeiten gleichzeitig international, mit einer wachsenden Präsenz in den VAE. Das bedeutet, dass wir die lokalen Vorschriften, die Kultur und die alltäglichen HR-Realitäten dieser Märkte verstehen, nicht nur die Theorie.
                  </p>
                  <p>
                    Was uns unterscheidet: Unsere Beratung basiert auf echter Erfahrung in der Führung von HR-Abteilungen, nicht nur auf theoretischen Konzepten. Wir übergeben nicht einfach eine Strategie und gehen wieder. Wir bleiben dabei, bis es in der Praxis wirklich funktioniert.
                  </p>
                  <p>
                    Um jedes Projekt optimal zu unterstützen, arbeiten wir mit einem Netzwerk von über 100 freiberuflichen Spezialist:innen zusammen – darunter Anwälte, Recruiter und HR Business Partner. So bringen wir für jeden Kunden genau die richtige Expertise ein, ohne ein kleines Kernteam zu überlasten.
                  </p>
                  <p>
                    Im Kern versteht sich scaliify als Partner, der sowohl die übergeordnete Strategie als auch das operative Tagesgeschäft versteht – und sich nahtlos zwischen beidem bewegt.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    scaliify was founded in 2022 by Ben and Sarah. We built it around one idea: most HR consultancies are either strong on strategy or strong on execution, rarely both. We combine the two.
                  </p>
                  <p>
                    We're specialised in the DACH region while also working internationally, including a growing presence in the UAE. This means we understand the local rules, culture, and everyday HR realities of these markets, not just the general theory.
                  </p>
                  <p>
                    What makes us different is that our advice comes from real experience running HR functions, not just studying them. We don't just hand over a strategy and walk away. We stay involved until it actually works in practice.
                  </p>
                  <p>
                    To support every project properly, we work with a network of over 100 freelance specialists, including lawyers, recruiters, and HR business partners. This lets us bring in exactly the right expertise for each client, without stretching a small team too thin.
                  </p>
                  <p>
                    At its core, scaliify exists as a partner who understands both the big-picture strategy and the everyday operational work, and can move easily between the two.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Horizontal Interactive Timeline */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#05434B]">
                {isDe ? "MEILENSTEINE & ENTWICKLUNG" : "MILESTONES & EVOLUTION"}
              </p>
            </div>

            {/* Horizontal Timeline Track */}
            <div className="relative py-8 overflow-x-auto">
              <div className="hidden md:block absolute top-1/2 left-10 right-10 -translate-y-1/2 h-[3px] bg-gradient-to-r from-[#81D8D0] via-[#5BC7BC] to-[#05434B] -z-0" />

              <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10">
                {timelineMilestones.map((item) => (
                  <div
                    key={item.year}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Top Card for odd items */}
                    <div className="min-h-[90px] hidden md:flex flex-col justify-end mb-4">
                      {item.position === "top" && (
                        <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-2xs text-left text-[11px] leading-snug">
                          <p className="font-bold text-gray-900">{item.title}</p>
                          <p className="text-gray-500 text-[10px] mt-0.5 line-clamp-2">{item.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Timeline Node Button */}
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#5BC7BC] via-[#81D8D0] to-[#A8F5EE] text-[#05434B] flex items-center justify-center font-extrabold text-xs shadow-xs border-2 border-white shrink-0 group-hover:scale-110 transition-transform">
                      {item.year}
                    </div>

                    {/* Bottom Card for even items */}
                    <div className="min-h-[90px] flex flex-col justify-start mt-4">
                      <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-2xs text-left text-[11px] leading-snug">
                        <p className="font-bold text-gray-900">{item.title}</p>
                        <p className="text-gray-500 text-[10px] mt-0.5 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. THE SCALIIFY TEAM (Sarah Mittiga & Ben Böhmer)            */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] mb-3">
              {isDe ? "FÜHRUNG & PARTNER" : "LEADERSHIP & PARTNERS"}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-tight mb-4">
              {isDe ? "Das scaliify-Team" : "The scaliify Team"}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
              {isDe
                ? "Kombiniert über 25 Jahre Erfahrung in Big-4-Managementberatung, Vertriebsleitung und wachstumsstarken People Operations."
                : "Combining over 25 years of Big-4 management consulting, sales leadership, and high-growth People operations."}
            </p>
          </div>

          {/* 2 Partners Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-stretch">
            {/* Partner 1: Sarah Mittiga */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-gray-200/90 hover:border-[#81D8D0]/60 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md border-2 border-white shrink-0 bg-gray-100">
                    <Image
                      src="/images/partner-sarah.png"
                      alt="Sarah Mittiga - Partner at Scaliify"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="inline-block bg-[#81D8D0]/25 text-[#05434B] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-1.5">
                      Partner
                    </span>
                    <h3 className="text-2xl font-extrabold text-black">
                      Sarah Mittiga
                    </h3>
                    <p className="text-xs sm:text-sm text-[#05434B] font-semibold">
                      {isDe
                        ? "Strategie, Change Management & Business Development"
                        : "Strategy, Change Management & Business Development"}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium mb-6">
                  {isDe
                    ? "Mit über einem Jahrzehnt Erfahrung in der Projektleitung war sie erfolgreich in Vertrieb und Marketing in verschiedenen Branchen wie Immobilien, Banken, FMCG und Tourismus tätig. Ihre Jahre bei einer Big-4-Unternehmensberatung schärften ihre Fähigkeiten in Innovation, Change Management und Business Development. Sie ist darauf spezialisiert, zukunftssichere Geschäftsmodelle zu entwickeln und umzusetzen, die sich an gesellschaftliche und technologische Veränderungen anpassen."
                    : "With over a decade of project leadership experience, she has excelled in sales and marketing across diverse industries including real estate, banking, FMCG, and tourism. Her years at a Big 4 Consulting firm honed her skills in innovation, change management, and business development. She specializes in devising and implementing resilient business models that adapt to societal and technological changes."}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <a
                  href="https://www.linkedin.com/in/sarah-mittiga/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#005f93] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs transition-colors cursor-pointer"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  <span>{isDe ? "Auf LinkedIn vernetzen" : "Connect on LinkedIn"}</span>
                </a>
                <span className="text-[11px] text-gray-400 font-medium">Ex-Big 4 Consultant</span>
              </div>
            </div>

            {/* Partner 2: Ben Böhmer */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-gray-200/90 hover:border-[#81D8D0]/60 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md border-2 border-white shrink-0 bg-gray-100">
                    <Image
                      src="/images/partner-ben.png"
                      alt="Ben Böhmer - Partner at Scaliify"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="inline-block bg-[#81D8D0]/25 text-[#05434B] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-1.5">
                      Partner
                    </span>
                    <h3 className="text-2xl font-extrabold text-black">
                      Ben Böhmer
                    </h3>
                    <p className="text-xs sm:text-sm text-[#05434B] font-semibold">
                      {isDe
                        ? "People Operations, Unternehmenskultur & Skalierung"
                        : "People Operations, Organizational Culture & Scaling"}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium mb-6">
                  {isDe
                    ? "Ben bringt über 15 Jahre Erfahrung im Personalbereich in Branchen wie Tech, E-Commerce und Medizintechnik mit. Mit nachweislichen Erfolgen in der Teamführung liegen seine Schwerpunkte in der Organisations- und Kulturentwicklung, moderner Führung und People Business Partnering. Er hat erfolgreich Geschäftsbereiche in Deutschland, Großbritannien, Frankreich, Italien und Spanien aufgebaut und über 350 Teammitglieder innerhalb von nur 8 Monaten eingestellt und eingearbeitet."
                    : "Ben brings over 15 years of people experience in diverse industries including tech, e-commerce, and medical technology. With a proven track record of leading teams, his expertise lies in organizational and cultural development, modern leadership, and People Business Partnering. He has successfully expanded business units across Germany, the UK, France, Italy, and Spain. Notably, he has led the hiring and onboarding of over 350 team members within just 8 months, demonstrating his exceptional capability in scaling operations swiftly and efficiently."}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <a
                  href="https://www.linkedin.com/in/benjaminboehmer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#005f93] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs transition-colors cursor-pointer"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  <span>{isDe ? "Auf LinkedIn vernetzen" : "Connect on LinkedIn"}</span>
                </a>
                <span className="text-[11px] text-gray-400 font-medium">15+ Years HR Leadership</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. OUR TEAM OF EXPERTS (Global On-Demand Specialist Network) */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] mb-3">
              {isDe ? "GLOBALES SPEZIALISTEN-NETZWERK" : "GLOBAL SPECIALIST NETWORK"}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-tight mb-4">
              {isDe ? "Unser Experten-Team" : "Our Team of Experts"}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl mx-auto font-medium">
              {isDe
                ? "Unser globales Expertennetzwerk aus Jurist:innen, Entwickler:innen, Recruiter:innen und weiteren Fachkräften ermöglicht es uns, jedes Projekt präzise zuzuschneiden. Indem wir die passenden Spezialist:innen genau dann hinzuziehen, wenn sie gebraucht werden, gewährleisten wir erstklassige Ergebnisse. Egal wo sich unsere Kunden befinden: Unser Team meistert Projekte jeder Größenordnung und Komplexität."
                : "Our global network of experts, including lawyers, developers, recruiters, and more, allows us to tailor our approach to each project with precision. By bringing in the right specialists exactly when needed, we maintain a lean, client-focused methodology that ensures top-tier results. No matter where our clients are located, our team is equipped to handle projects of any scope and complexity."}
            </p>
          </div>

          {/* 4 Expert Network Domain Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-12">
            {expertDomains.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-gray-200/80 hover:border-[#81D8D0]/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5BC7BC] via-[#81D8D0] to-[#A8F5EE] text-[#05434B] flex items-center justify-center shrink-0 shadow-xs border border-white/70 mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 stroke-[2.4]" />
                  </div>
                  <h3 className="text-base font-bold text-gray-950 mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dubai Global Hub Callout */}
          <div className="bg-gradient-to-r from-gray-900 via-[#05434B] to-gray-900 text-white rounded-3xl p-7 sm:p-10 shadow-[0_15px_40px_rgba(5,67,75,0.25)] border border-[#81D8D0]/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#81D8D0]" />
                <span className="text-[#81D8D0] text-xs font-bold uppercase tracking-wider">
                  {isDe ? "Hauptsitz in Dubai • Weltweit für Kunden im Einsatz" : "Headquartered in Dubai • Serving Clients Globally"}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {isDe ? "Ein globaler Knotenpunkt für Innovation und kulturelles Verständnis" : "A global hub for innovation and cultural understanding"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                {isDe
                  ? "Vom Standort Dubai aus verbinden wir europäische Unternehmen, Scale-ups und internationale Teams nahtlos über Zeitzonen hinweg mit Agilität und zukunftsorientierten Lösungen."
                  : "Operating from Dubai allows us to connect European businesses, scaleups, and international teams seamlessly across time zones with agility and forward-thinking solutions."}
              </p>
            </div>
            <Link
              href="/lets-talk"
              className="relative inline-flex items-center justify-center gap-2 bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep text-brand-dark text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-[0_4px_16px_rgba(129,216,208,0.55)] hover:brightness-105 transition-all cursor-pointer shrink-0 border border-white/80"
            >
              <span className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" />
              <span className="relative z-10">{isDe ? "Mit unserem Team arbeiten" : "Work with our team"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. TESTIMONIALS SECTION */}
      {/* ============================================================ */}
      <Testimonials />

      {/* ============================================================ */}
      {/* 7. DISCOVERY & CONSULTATION BOOKING LEAD SECTION */}
      {/* ============================================================ */}
      <BookingLeadSection
        title={isDe ? "Bereit für die Partnerschaft mit Scaliify?" : "Ready to partner with Scaliify?"}
        subtitle={
          isDe
            ? "Buchen Sie ein Erstgespräch mit Sarah Mittiga, Ben Böhmer oder einem unserer Senior-HR-Partner."
            : "Book an introductory call with Sarah Mittiga, Ben Böhmer, or one of our senior HR partners."
        }
        badgeTitle={isDe ? "KONTAKT AUFNEHMEN" : "GET IN TOUCH"}
      />

      {/* ============================================================ */}
      {/* 8. BLOG SECTION */}
      {/* ============================================================ */}
      <BlogSection />
    </main>
  );
}
