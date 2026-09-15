"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  X,
  Layers,
  Search,
  TrendingUp,
  ShieldCheck,
  Quote,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { softwareList, ToolLogo } from "@/components/home/SoftwareStack";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";
import { AnimatedStatCounter } from "@/components/common/AnimatedStatCounter";

const pillarsEn = [
  {
    icon: Search,
    title: "Independent, Vendor-Neutral Guidance",
    desc: "We don't take direction from any software provider, so what we recommend is based purely on what fits your business.",
  },
  {
    icon: Layers,
    title: "A Harmonious HR Tech Landscape",
    desc: "Getting one tool right isn't the whole job. We look at your entire HR tech setup and make sure everything works together, instead of leaving you with tools that don't talk to each other.",
  },
  {
    icon: TrendingUp,
    title: "Infrastructure That Grows With You",
    desc: "We build things so they hold up as you scale, not something you'll be ripping out and replacing again in two years.",
  },
  {
    icon: ShieldCheck,
    title: "Not Sure Where to Start?",
    desc: "Our free HR Tool Finder narrows things down based on your size, location, and current tech stack. No guesswork needed.",
  },
];

const pillarsDe = [
  {
    icon: Search,
    title: "Unabhängige, herstellerneutrale Beratung",
    desc: "Wir lassen uns von keinem Softwareanbieter leiten. Was wir empfehlen, basiert rein darauf, was zu Ihrem Unternehmen passt.",
  },
  {
    icon: Layers,
    title: "Eine harmonische HR-Tech-Landschaft",
    desc: "Ein einzelnes Tool richtig auszuwählen, ist nicht die ganze Aufgabe. Wir betrachten Ihr gesamtes HR-Tech-Setup und stellen sicher, dass alles zusammenarbeitet, anstatt Sie mit Insellösungen zurückzulassen.",
  },
  {
    icon: TrendingUp,
    title: "Infrastruktur, die mit Ihnen wächst",
    desc: "Wir bauen Systeme so auf, dass sie mit Ihrem Wachstum standhalten – nicht etwas, das Sie in zwei Jahren wieder herausreißen und ersetzen müssen.",
  },
  {
    icon: ShieldCheck,
    title: "Nicht sicher, wo Sie anfangen sollen?",
    desc: "Unser kostenloser HR Tool Finder grenzt die Auswahl basierend auf Ihrer Größe, Ihrem Standort und Ihrem aktuellen Tech-Stack ein. Ganz ohne Rätselraten.",
  },
];

const marqueeCardsEn = [
  {
    type: "quote-card",
    bg: "bg-[#f0faf8]",
    brandName: "Westbridge",
    quote:
      "scaliify has been an invaluable partner in optimising our HR processes. From answering our Personio-related questions with deep expertise to building a custom recruiting dashboard, their support has helped us bring structure and efficiency into our hiring workflows.",
    author: "Wiebke Weidner | Head of HR, Westbridge",
    border: "border-[#76D8C8]/40",
  },
  {
    type: "image-card",
    image: "/images/rowing-team.jpg",
    quote:
      "scaliify managed our Personio implementation with great reliability and focus. The team ensured the project stayed on track, coordinated effectively across teams, and handled challenges pragmatically.",
    author: "Head of HR | Client in the Tech Industry",
    border: "border-gray-200/50",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#2B4C55] via-[#05434B] to-[#4FB8AA]",
    stat: "40%",
    sub: "faster software evaluation cycle",
    brand: "scaliify HR Advisory",
    border: "border-[#76D8C8]/30",
  },
  {
    type: "image-card",
    image: "/images/food-pantry.jpg",
    quote:
      "Working with scaliify was a game changer for our HR setup. Their team guided us through the successful implementation of Personio and helped us restructure our HR processes to be more efficient, transparent, and scalable.",
    author: "Marion Kleiber | Managing Director, Harrer Ingenieure GmbH",
    border: "border-gray-200/50",
  },
  {
    type: "quote-card",
    bg: "bg-[#e8f7f4]",
    brandName: "SoftwareOne",
    quote:
      "Ben is one of those rare professionals who combines strategic insight with operational excellence. During his time at SoftwareOne, he led complex HR initiatives across EMEA with clarity, structure, and empathy.",
    author: "Thomai Carapali | Head of P&C EMEA, SoftwareOne Germany GmbH",
    border: "border-[#4FB8AA]/40",
  },
  {
    type: "image-card",
    image: "/images/office-team.jpg",
    quote:
      "As our interim CHRO, scaliify brought clarity and momentum to our organizational development. scaliify helped us streamline recruiting, introduce scalable HR structures, and prepare our future team growth.",
    author: "Managing Director | Client in the Tech Industry",
    border: "border-gray-200/50",
  },
  {
    type: "quote-card",
    bg: "bg-[#f0faf8]",
    brandName: "TAKKT Group AG",
    quote:
      "Ben worked with us as HR Operations Co-Lead, focusing on the system side of the payroll transition in Germany. He independently implemented the required data structure changes during a period when our team was severely understaffed.",
    author: "Stefanie Mühlbauer | Executive Vice President HR, TAKKT Group AG",
    border: "border-[#76D8C8]/40",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#05434B] via-[#1b3a42] to-[#4FB8AA]",
    stat: "73%",
    sub: "faster time-to-value for newly adopted HR tools",
    brand: "scaliify Benchmarks",
    border: "border-[#76D8C8]/30",
  },
  {
    type: "quote-card",
    bg: "bg-[#e8f7f4]",
    brandName: "Energy Sector",
    quote:
      "scaliify brought both structure and strategic thinking to our operations. As our Interim HR Project Manager and Shift Planner, scaliify played a key role in improving our workforce planning processes and driving forward HR-related initiatives.",
    author: "Head of Service Operations | Client in the Energy Sector",
    border: "border-[#4FB8AA]/40",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#2B4C55] via-[#05434B] to-[#76D8C8]",
    stat: "38%",
    sub: "average overall HR software cost savings",
    brand: "scaliify Impact",
    border: "border-[#76D8C8]/30",
  },
];

const marqueeCardsDe = [
  {
    type: "quote-card",
    bg: "bg-[#f0faf8]",
    brandName: "Westbridge",
    quote:
      "scaliify war für uns ein unschätzbarer Partner bei der Optimierung unserer HR-Prozesse. Von der Beantwortung unserer Personio-Fragen mit tiefem Fachwissen bis hin zum Aufbau eines maßgeschneiderten Recruiting-Dashboards – ihre Unterstützung hat uns geholfen, Struktur und Effizienz in unsere Hiring-Workflows zu bringen.",
    author: "Wiebke Weidner | Head of HR, Westbridge",
    border: "border-[#76D8C8]/40",
  },
  {
    type: "image-card",
    image: "/images/rowing-team.jpg",
    quote:
      "scaliify hat unsere Personio-Einführung mit hoher Zuverlässigkeit und Fokus gesteuert. Das Team sorgte dafür, dass das Projekt im Zeitplan blieb, koordinierte effizient über Teams hinweg und ging Herausforderungen pragmatisch an.",
    author: "Head of HR | Kunde in der Technologiebranche",
    border: "border-gray-200/50",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#2B4C55] via-[#05434B] to-[#4FB8AA]",
    stat: "40%",
    sub: "schnellere Software-Auswahl",
    brand: "scaliify HR Advisory",
    border: "border-[#76D8C8]/30",
  },
  {
    type: "image-card",
    image: "/images/food-pantry.jpg",
    quote:
      "Die Zusammenarbeit mit scaliify war für unser HR-Setup ein echter Gamechanger. Das Team begleitete uns bei der erfolgreichen Einführung von Personio und half uns, unsere HR-Prozesse effizienter, transparenter und skalierbarer aufzustellen.",
    author: "Marion Kleiber | Managing Director, Harrer Ingenieure GmbH",
    border: "border-gray-200/50",
  },
  {
    type: "quote-card",
    bg: "bg-[#e8f7f4]",
    brandName: "SoftwareOne",
    quote:
      "Ben ist einer der seltenen Experten, die strategischen Weitblick mit operativer Exzellenz verbinden. Während seiner Zeit bei SoftwareOne leitete er komplexe HR-Initiativen in der EMEA-Region mit Klarheit, Struktur und Empathie.",
    author: "Thomai Carapali | Head of P&C EMEA, SoftwareOne Germany GmbH",
    border: "border-[#4FB8AA]/40",
  },
  {
    type: "image-card",
    image: "/images/office-team.jpg",
    quote:
      "Als unser Interim-CHRO brachte scaliify Klarheit und Dynamik in unsere Organisationsentwicklung. scaliify half uns, das Recruiting zu optimieren, skalierbare HR-Strukturen aufzubauen und unser künftiges Teamwachstum vorzubereiten.",
    author: "Managing Director | Kunde in der Technologiebranche",
    border: "border-gray-200/50",
  },
  {
    type: "quote-card",
    bg: "bg-[#f0faf8]",
    brandName: "TAKKT Group AG",
    quote:
      "Ben arbeitete mit uns als HR Operations Co-Lead mit Fokus auf die systemseitige Entgeltabrechnungs-Umstellung in Deutschland. In einer Phase personeller Engpässe setzte er die notwendigen Datenstruktur-Anpassungen eigenständig um.",
    author: "Stefanie Mühlbauer | Executive Vice President HR, TAKKT Group AG",
    border: "border-[#76D8C8]/40",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#05434B] via-[#1b3a42] to-[#4FB8AA]",
    stat: "73%",
    sub: "schnellere Wertschöpfung bei neuen HR-Tools",
    brand: "scaliify Benchmarks",
    border: "border-[#76D8C8]/30",
  },
  {
    type: "quote-card",
    bg: "bg-[#e8f7f4]",
    brandName: "Energiesektor",
    quote:
      "scaliify brachte Struktur und strategisches Denken in unsere Operations. Als unser Interim HR Projektmanager und Schichtplaner spielte scaliify eine Schlüsselrolle bei der Optimierung unserer Personaleinsatzplanung und trieb wichtige HR-Initiativen voran.",
    author: "Head of Service Operations | Kunde im Energiesektor",
    border: "border-[#4FB8AA]/40",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#2B4C55] via-[#05434B] to-[#76D8C8]",
    stat: "38%",
    sub: "durchschnittliche HR-Software-Kosteneinsparung",
    brand: "scaliify Impact",
    border: "border-[#76D8C8]/30",
  },
];

const beforeItemsEn = [
  "Fragmented point solutions & data silos",
  "Biased vendor pitches and hidden commissions",
  "Costly implementation delays & software rework",
  "Manual spreadsheet syncs between HR & Payroll",
  "Growing pains with rigid, outdated systems",
];

const beforeItemsDe = [
  "Fragmentierte Insellösungen & Datensilos",
  "Einseitige Anbieter-Pitches und versteckte Provisionen",
  "Kostspielige Verzögerungen & Nachbesserungen",
  "Manuelle Excel-Abgleiche zwischen HR und Gehaltsabrechnung",
  "Wachstumsengpässe durch starre, veraltete Systeme",
];

const afterItemsEn = [
  "100% independent vendor selection",
  "Harmonised, silo-free HR architecture",
  "Automated, interconnected HR workflows",
  "Centralised employee data & single source of truth",
  "Future-proof infrastructure ready to scale",
];

const afterItemsDe = [
  "100 % unabhängige & herstellerneutrale Auswahl",
  "Harmonische, silofreie HR-Architektur",
  "Automatisierte, vernetzte HR-Workflows",
  "Zentrale Personaldaten als Single Source of Truth",
  "Zukunftssichere Infrastruktur, bereit zu skalieren",
];

const hrSelectionFaqsEn = [
  {
    question: "Do you only work with a specific HR software provider?",
    answer:
      "No. We work across all standard HR software providers on the market (from all-in-one HRIS like Personio, Factorial, and Deel, to specialized ATS, payroll, and performance tools). We know the strengths, limitations, and pricing models of each system and ensure the final setup is uniquely tailored to fit your business.",
  },
  {
    question: "How long does the selection process usually take?",
    answer:
      "It depends on the complexity of your setup, but most companies get a clear recommendation within a few weeks, not months.",
  },
  {
    question: "We already have some HR tools in place. Can you still help?",
    answer:
      "Yes. We'll look at what you're already using and figure out whether it's worth keeping, replacing, or better connected to the rest of your systems.",
  },
  {
    question: "Is the HR Tool Finder really free?",
    answer:
      "Yes, completely. It's built to give you a quick, independent starting point before you commit to anything.",
  },
  {
    question: "What size company is this service suited for?",
    answer:
      "Any size, really. From businesses picking their first HR system to established companies replacing an outdated one.",
  },
];

const hrSelectionFaqsDe = [
  {
    question: "Arbeiten Sie nur mit bestimmten HR-Softwareanbietern zusammen?",
    answer:
      "Nein. Wir arbeiten mit allen gängigen HR-Softwareanbietern auf dem Markt – darunter Personio, Deel, Workmotion, Factorial, Leapsome, BambooHR, HiBob, Greenhouse und viele mehr. Wir kennen die genauen Stärken, Grenzen und Preismodelle der verschiedenen Systeme, um sicherzustellen, dass Ihr Setup optimal auf Ihre Unternehmensanforderungen abgestimmt ist.",
  },
  {
    question: "Wie lange dauert der Auswahlprozess üblicherweise?",
    answer:
      "Das hängt von der Komplexität Ihres Setups ab, aber die meisten Unternehmen erhalten innerhalb weniger Wochen eine klare Empfehlung, nicht erst nach Monaten.",
  },
  {
    question: "Wir haben bereits einige HR-Tools im Einsatz – können Sie trotzdem helfen?",
    answer:
      "Ja. Wir analysieren Ihre bestehenden Tools und prüfen, ob es sich lohnt, sie beizubehalten, zu ersetzen oder besser mit den übrigen Systemen zu verknüpfen.",
  },
  {
    question: "Ist der HR Tool Finder wirklich kostenlos?",
    answer:
      "Ja, absolut. Er wurde entwickelt, um Ihnen einen schnellen, unabhängigen Startpunkt zu bieten, bevor Sie sich für etwas entscheiden.",
  },
  {
    question: "Für welche Unternehmensgröße ist dieser Service geeignet?",
    answer:
      "Für jede Größe – von Unternehmen, die ihr erstes HR-System auswählen, bis hin zu etablierten Firmen, die ein veraltetes System ablösen.",
  },
];

export function HrItSelectionClient() {
  const locale = useLocale();
  const isDe = locale === "de";
  const t = useTranslations("services.hrItSelection");

  const pillars = isDe ? pillarsDe : pillarsEn;
  const marqueeCards = isDe ? marqueeCardsDe : marqueeCardsEn;
  const beforeItems = isDe ? beforeItemsDe : beforeItemsEn;
  const afterItems = isDe ? afterItemsDe : afterItemsEn;
  const hrSelectionFaqs = isDe ? hrSelectionFaqsDe : hrSelectionFaqsEn;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className="w-full bg-white overflow-hidden text-black font-sans">
      {/* ============================================================ */}
      {/* 1. HERO SECTION (Split: Left Content + Right Image)          */}
      {/* ============================================================ */}
      <section className="w-full relative overflow-hidden bg-gradient-to-bl from-[#81D8D0]/35 via-white/80 to-white pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute -top-20 -right-20 sm:-top-28 sm:-right-28 w-[600px] sm:w-[800px] h-[500px] sm:h-[650px] bg-[radial-gradient(ellipse_at_top_right,rgba(129,216,208,0.85)_0%,rgba(129,216,208,0.55)_35%,rgba(91,199,188,0.25)_60%,transparent_80%)] pointer-events-none blur-3xl -z-0" />
        <div className="absolute top-0 right-1/4 w-[450px] h-[300px] bg-[radial-gradient(circle,rgba(129,216,208,0.45)_0%,transparent_70%)] pointer-events-none blur-2xl -z-0" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2B4C55] mb-3.5">
              {t("kicker")}
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-[1.12] mb-5">
              {t("heading")}
            </h1>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-8 max-w-xl">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/contact?topic=selection"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-extrabold text-brand-dark bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_4px_22px_rgba(129,216,208,0.65)] border border-white/80 hover:shadow-[0_6px_28px_rgba(129,216,208,0.95)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/75 to-transparent rounded-t-full pointer-events-none" />
                <span className="relative z-10 tracking-tight font-extrabold">
                  {t("ctaButton")}
                </span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/tool-finder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-black border border-gray-300 hover:border-[#2B4C55] px-6 py-3.5 rounded-full transition-all hover:bg-gray-50 cursor-pointer"
              >
                <span>{isDe ? "Unseren HR Tool Finder testen" : "Try our HR Tool Finder"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2B4C55]" />
              </Link>
            </div>
          </div>

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
      {/* 2. DYNAMIC HR SOFTWARE LOGO MARQUEE                         */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-7 sm:py-9 border-y border-gray-100 overflow-hidden select-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-3 sm:mb-4 text-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
            {isDe ? "Wir evaluieren und integrieren alle führenden HR-Softwarelösungen" : "We evaluate & integrate leading HR software providers"}
          </p>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee-left flex items-center gap-3.5 sm:gap-5 w-max py-1">
            {[...softwareList, ...softwareList].map((tool, idx) => (
              <div
                key={`${tool.id}-${idx}`}
                className="flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-gray-50 border border-gray-200/80 hover:border-[#81D8D0] hover:bg-white transition-all shadow-2xs group shrink-0"
              >
                <ToolLogo id={tool.id} />
                <span className="text-xs sm:text-sm font-bold text-gray-800 tracking-tight group-hover:text-black">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. FOUR PILLARS                                              */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-black">
              {isDe ? "Harmonische HR-Technologie für wachsende Teams" : "Harmonious HR tech built for scaling teams"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3 group">
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5BC7BC] via-[#81D8D0] to-[#A8F5EE] text-[#05434B] flex items-center justify-center shrink-0 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85),0_8px_20px_rgba(129,216,208,0.38)] border border-white/70 mb-1 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),0_12px_25px_rgba(129,216,208,0.55)] overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent pointer-events-none rounded-t-2xl" />
                  <Icon className="w-5 h-5 stroke-[2.4] relative z-10" />
                </div>
                <div className="h-12 sm:h-14 flex items-center justify-center">
                  <h3 className="text-base sm:text-[17px] font-bold text-black leading-snug">
                    {title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. MARQUEE CAROUSEL                                          */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-12 sm:py-16 overflow-hidden border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2">
            {isDe ? "WIR ARBEITEN MIT TEAMS VON 10 BIS 15.000+ MITARBEITENDEN" : "WE WORK WITH TEAMS FROM 10 TO 15,000+ EMPLOYEES"}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight">
            {isDe ? "Organisationen, die mit uns wachsen" : "Join the organisations unlocking impact"}
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
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#2B4C55] tracking-tighter block">
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
      {/* 5. BEFORE VS AFTER COMPARISON CARD                           */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2.5">
              {isDe ? "DER scaliify-UNTERSCHIED" : "THE scaliify DIFFERENCE"}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black">
              {isDe ? "Warum stark wachsende Unternehmen scaliify wählen" : "Why fast-growing companies choose scaliify"}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#05434B] via-[#2B4C55] to-[#1b3a42] rounded-3xl p-6 sm:p-10 border border-[#76D8C8]/20 shadow-[0_15px_45px_rgba(5,67,75,0.22)] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(118,216,200,0.25)_0%,transparent_70%)] pointer-events-none blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle,rgba(79,184,170,0.18)_0%,transparent_70%)] pointer-events-none blur-2xl" />

            {/* Left: Before scaliify */}
            <div className="flex flex-col justify-between py-2 sm:py-4 pr-0 md:pr-6 relative z-10 text-white">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
                  {isDe ? "Vor scaliify" : "Before scaliify"}
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

            {/* Right: With scaliify */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-[#76D8C8]/50 flex flex-col justify-between relative z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#2B4C55] mb-6">
                  {isDe ? "Mit scaliify" : "With scaliify"}
                </h3>
                <ul className="flex flex-col gap-4">
                  {afterItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-black font-semibold">
                      <div className="w-5 h-5 rounded-full bg-[#4FB8AA] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-gray-950 font-bold leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/tool-finder"
              className="inline-flex items-center gap-2 text-sm font-bold text-black hover:text-[#4FB8AA] transition-colors group"
            >
              <span>
                {isDe
                  ? "Nicht sicher, welches HR-Tool Sie brauchen? Nutzen Sie unseren kostenlosen Tool Finder"
                  : "Not sure which HR tool you need? Use our free interactive tool finder"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#4FB8AA]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. IMPACT & CUSTOMER STORY                                   */}
      {/* ============================================================ */}
      <section className="w-full bg-gradient-to-b from-white via-[#81D8D0]/35 to-white py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[radial-gradient(circle,rgba(129,216,208,0.45)_0%,transparent_70%)] pointer-events-none blur-3xl -z-0" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black max-w-2xl mx-auto leading-tight">
              {isDe ? "Messbarer Erfolg für unsere Kunden" : "Real impact for our customers"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16 text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                <AnimatedStatCounter value={73} suffix="%" />
              </span>
              <span className="text-xs sm:text-sm text-gray-800 font-semibold max-w-[200px]">
                {isDe ? "produktivere HR-Teams" : "more productive HR teams"}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                <AnimatedStatCounter value={38} suffix="%" />
              </span>
              <span className="text-xs sm:text-sm text-gray-800 font-semibold max-w-[200px]">
                {isDe ? "Gesamtkosteneinsparung im HR-Bereich" : "overall HR cost savings"}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-none mb-2 tracking-tight">
                <AnimatedStatCounter value={87} suffix="%" />
              </span>
              <span className="text-xs sm:text-sm text-gray-800 font-semibold max-w-[200px]">
                {isDe ? "spürbarer Mehrwert in den ersten 3 Monaten" : "saw tangible value within first 3 months"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            <div className="md:col-span-5 relative rounded-[22px] sm:rounded-[26px] overflow-hidden min-h-[240px] sm:min-h-[320px] shadow-xs border border-gray-200/80">
              <Image
                src="/images/marion-kleiber.jpg"
                alt="Marion Kleiber - Managing Director, Harrer Ingenieure GmbH"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={95}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05434B]/85 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 text-white">
                <p className="text-sm sm:text-base font-bold text-white">Marion Kleiber</p>
                <p className="text-xs text-[#76D8C8] font-medium">Managing Director, Harrer Ingenieure GmbH</p>
              </div>
            </div>

            <div className="md:col-span-7 bg-[#f0faf8] rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-[#4FB8AA]/30 shadow-xs min-h-[240px] sm:min-h-[320px]">
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4FB8AA] to-[#76D8C8] text-[#05434B] flex items-center justify-center shadow-xs">
                    <Quote className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#05434B] bg-white px-3 py-1 rounded-full border border-[#76D8C8]/40 shadow-2xs">
                    {isDe ? "KUNDENSTIMME" : "CLIENT QUOTE"}
                  </span>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-[#2B4C55] font-bold leading-relaxed mb-6">
                  {isDe
                    ? "„Die Zusammenarbeit mit scaliify war für unser HR-Setup ein echter Gamechanger. Das Team begleitete uns bei der erfolgreichen Einführung von Personio und half uns, unsere HR-Prozesse effizienter, transparenter und skalierbarer aufzustellen. Das Projekt wurde mit höchster Klarheit und Präzision umgesetzt. Wir haben nun ein optimiertes HR-System, das unseren Arbeitsalltag und unser zukünftiges Wachstum nachhaltig unterstützt.“"
                    : "“Working with scaliify was a game changer for our HR setup. Their team guided us through the successful implementation of Personio and helped us restructure our HR processes to be more efficient, transparent, and scalable. The project was executed with clarity and precision. We now have a streamlined HR system that supports our day-to-day operations and future growth.”"}
                </p>
              </div>

              <div className="pt-4 border-t border-[#4FB8AA]/20">
                <p className="text-xs sm:text-sm font-bold text-black">
                  Marion Kleiber <span className="font-normal text-gray-600">| Managing Director, Harrer Ingenieure GmbH</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. FREQUENTLY ASKED QUESTIONS ACCORDION                      */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2B4C55] mb-2.5">
              {isDe ? "KLARE ANTWORTEN" : "CLEAR ANSWERS"}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              {isDe ? "Häufig gestellte Fragen" : "Frequently asked questions"}
            </h2>
          </div>

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
