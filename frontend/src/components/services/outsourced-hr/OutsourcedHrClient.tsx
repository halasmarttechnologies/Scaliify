"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
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
  Calendar,
  FileText,
  UserPlus,
  Compass,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companies } from "@/data/companies";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";
import { AnimatedStatCounter } from "@/components/common/AnimatedStatCounter";

// Core Covered Scope Pillars
const coveredScopeItemsEn = [
  {
    icon: Layers,
    title: "Standardised HR Systems & Processes",
    desc: "Structured digital personnel files, compliant documentation, and automated HR workflows that scale effortlessly with your headcount.",
  },
  {
    icon: UserPlus,
    title: "Recruiting & Talent Acquisition",
    desc: "End-to-end hiring management from role briefing and job posting to candidate screening, interview coordination, and offer management.",
  },
  {
    icon: FileText,
    title: "Documentation & Contracts",
    desc: "Legally sound employment agreements, contract amendments, reference letters (Arbeitszeugnisse), and day-to-day HR documentation.",
  },
  {
    icon: Compass,
    title: "Onboarding & Offboarding",
    desc: "Structured welcome journeys that delight new hires from day one, paired with seamless, compliant asset recovery and exit processes.",
  },
  {
    icon: Calendar,
    title: "Time, Absence & Vacation Tracking",
    desc: "Digital tracking of vacation balances, sick leave certificates, parental leaves, and BAG-compliant time recording without spreadsheets.",
  },
  {
    icon: BarChart3,
    title: "Performance Management & People Function",
    desc: "Structured feedback cycles, probationary reviews, goal setting (OKRs), and manager enablement to shape your broader people function.",
  },
];

const coveredScopeItemsDe = [
  {
    icon: Layers,
    title: "Standardisierte HR-Systeme & Prozesse",
    desc: "Strukturierte digitale Personalakten, rechtssichere Dokumentation und automatisierte HR-Workflows, die mühelos mitwachsen.",
  },
  {
    icon: UserPlus,
    title: "Recruiting & Talent Acquisition",
    desc: "Ganzheitliches Bewerbermanagement von der Stellenausschreibung über das Kandidatenscreening bis zur Interviewkoordination und Angebotserstellung.",
  },
  {
    icon: FileText,
    title: "Dokumentation & Verträge",
    desc: "Rechtssichere Arbeitsverträge, Vertragszusätze, qualifizierte Arbeitszeugnisse und tägliche HR-Schriftstücke.",
  },
  {
    icon: Compass,
    title: "Onboarding & Offboarding",
    desc: "Strukturierte Willkommensprozesse, die neue Mitarbeitende begeistern, kombiniert mit sauberen und geregelten Exit-Prozessen.",
  },
  {
    icon: Calendar,
    title: "Zeiterfassung & Abwesenheitsmanagement",
    desc: "Digitale Verwaltung von Urlaubstagen, Krankmeldungen, Elternzeiten und BAG-konforme Zeiterfassung ohne unübersichtliche Tabellen.",
  },
  {
    icon: BarChart3,
    title: "Leistungsmanagement & People-Funktion",
    desc: "Regelmäßige Feedback-Zyklen, Probezeitgespräche, Zielvereinbarungen (OKRs) und Führungskräfte-Befähigung für eine starke People-Kultur.",
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

const marqueeCardsEn = [
  {
    type: "quote-card",
    bg: "bg-[#f0faf8]",
    brandName: "Tech Industry",
    quote:
      "As our interim CHRO, scaliify brought clarity and momentum to our organizational development. scaliify helped us streamline recruiting, introduce scalable HR structures, and prepare our future team growth.",
    author: "Managing Director | Client in the Tech Industry",
    border: "border-[#76D8C8]/40",
  },
  {
    type: "image-card",
    image: "/images/rowing-team.jpg",
    quote:
      "scaliify brought both structure and strategic thinking to our operations. As our Interim HR Project Manager and Shift Planner, scaliify played a key role in improving our workforce planning processes and driving forward HR-related initiatives.",
    author: "Head of Service Operations | Client in the Energy Sector",
    border: "border-gray-200/50",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#2B4C55] via-[#05434B] to-[#4FB8AA]",
    stat: "10–100",
    sub: "target team headcount focus",
    brand: "Scaliify Outsourced HR",
    border: "border-[#76D8C8]/30",
  },
  {
    type: "image-card",
    image: "/images/office-team.jpg",
    quote:
      "scaliify has been an invaluable partner in optimising our HR processes. From answering our Personio-related questions with deep expertise to building a custom recruiting dashboard, their support has helped us bring structure and efficiency into our hiring workflows.",
    author: "Wiebke Weidner | Head of HR, Westbridge",
    border: "border-gray-200/50",
  },
  {
    type: "quote-card",
    bg: "bg-[#e8f7f4]",
    brandName: "TAKKT Group AG",
    quote:
      "Ben worked with us as HR Operations Co-Lead, focusing on the system side of the payroll transition in Germany. He independently implemented the required data structure changes during a period when our team was severely understaffed.",
    author: "Stefanie Mühlbauer | Executive Vice President HR, TAKKT Group AG",
    border: "border-[#4FB8AA]/40",
  },
  {
    type: "image-card",
    image: "/images/food-pantry.jpg",
    quote:
      "Working with scaliify was a game changer for our HR setup. Their team guided us through the successful implementation of Personio and helped us restructure our HR processes to be more efficient, transparent, and scalable.",
    author: "Marion Kleiber | Managing Director, Harrer Ingenieure GmbH",
    border: "border-gray-200/50",
  },
];

const marqueeCardsDe = [
  {
    type: "quote-card",
    bg: "bg-[#f0faf8]",
    brandName: "Technologiebranche",
    quote:
      "Als unser Interim-CHRO brachte scaliify Klarheit und Dynamik in unsere Organisationsentwicklung. scaliify half uns, das Recruiting zu optimieren, skalierbare HR-Strukturen aufzubauen und unser künftiges Teamwachstum vorzubereiten.",
    author: "Managing Director | Kunde in der Technologiebranche",
    border: "border-[#76D8C8]/40",
  },
  {
    type: "image-card",
    image: "/images/rowing-team.jpg",
    quote:
      "scaliify brachte Struktur und strategisches Denken in unsere Operations. Als unser Interim HR Projektmanager und Schichtplaner spielte scaliify eine Schlüsselrolle bei der Optimierung unserer Personaleinsatzplanung und trieb wichtige HR-Initiativen voran.",
    author: "Head of Service Operations | Kunde im Energiesektor",
    border: "border-gray-200/50",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#2B4C55] via-[#05434B] to-[#4FB8AA]",
    stat: "10–100",
    sub: "Fokus auf wachsende Teams",
    brand: "Scaliify Outsourced HR",
    border: "border-[#76D8C8]/30",
  },
  {
    type: "image-card",
    image: "/images/office-team.jpg",
    quote:
      "scaliify war für uns ein unschätzbarer Partner bei der Optimierung unserer HR-Prozesse. Von der Beantwortung unserer Personio-Fragen mit tiefem Fachwissen bis hin zum Aufbau eines maßgeschneiderten Recruiting-Dashboards – ihre Unterstützung hat uns geholfen, Struktur und Effizienz in unsere Hiring-Workflows zu bringen.",
    author: "Wiebke Weidner | Head of HR, Westbridge",
    border: "border-gray-200/50",
  },
  {
    type: "quote-card",
    bg: "bg-[#e8f7f4]",
    brandName: "TAKKT Group AG",
    quote:
      "Ben arbeitete mit uns als HR Operations Co-Lead mit Fokus auf die systemseitige Entgeltabrechnungs-Umstellung in Deutschland. In einer Phase personeller Engpässe setzte er die notwendigen Datenstruktur-Anpassungen eigenständig um.",
    author: "Stefanie Mühlbauer | Executive Vice President HR, TAKKT Group AG",
    border: "border-[#4FB8AA]/40",
  },
  {
    type: "image-card",
    image: "/images/food-pantry.jpg",
    quote:
      "Die Zusammenarbeit mit scaliify war für unser HR-Setup ein echter Gamechanger. Das Team begleitete uns bei der erfolgreichen Einführung von Personio und half uns, unsere HR-Prozesse effizienter, transparenter und skalierbarer aufzustellen.",
    author: "Marion Kleiber | Managing Director, Harrer Ingenieure GmbH",
    border: "border-gray-200/50",
  },
];

const interimModelPointsEn = [
  "Senior executive placed at short notice (CPO / VP People level)",
  "Triggered by parental leaves, sudden resignations, or M&A integration",
  "Time-boxed interim assignment (typically 3 to 12 months)",
  "Full C-level strategic ownership and team steering",
  "Higher executive rate suitable for transitional leadership",
];

const interimModelPointsDe = [
  "Erfahrene Senior-Führungskraft kurzfristig eingesetzt (CPO / VP People)",
  "Ausgelöst durch Elternzeit, plötzliche Kündigung oder M&A-Integration",
  "Zeitlich befristeter Interim-Einsatz (typischerweise 3 bis 12 Monate)",
  "Vollständige strategische Verantwortung und Führung des HR-Teams",
  "Executive-Tagessatz passend für transformative Führungsphasen",
];

const outsourcedModelPointsEn = [
  "Scaliify runs your ongoing HR operations as a dedicated external team",
  "Engineered for 10–100 employees without a dedicated HR function yet",
  "Relieves founders & office managers from absorbing HR tasks",
  "Available 5 days a week with a fixed contact person or team",
  "Pay as you go — billed only for what you actually use",
];

const outsourcedModelPointsDe = [
  "Scaliify führt Ihre laufenden HR-Prozesse als externes Team",
  "Entwickelt für Unternehmen mit 10–100 Mitarbeitenden ohne eigene HR-Abteilung",
  "Entlastet Gründer:innen & Office Manager von operativen HR-Aufgaben",
  "5 Tage die Woche verfügbar mit einer festen Ansprechperson / Team",
  "Pay-as-you-go – abgerechnet wird nur, was Sie tatsächlich nutzen",
];

const outsourcedHrFaqsEn = [
  {
    question: "What size company is outsourced HR best suited for?",
    answer:
      "Usually businesses with 10 to 100 employees, especially ones without a dedicated HR person yet.",
  },
  {
    question: "Do we get a dedicated point of contact?",
    answer:
      "Yes, a fixed contact person or team, so you're not starting from scratch every time you reach out.",
  },
  {
    question: "How does billing work?",
    answer:
      "Pay-as-you-go. You're only charged for the work you actually need done.",
  },
  {
    question: "What happens when we're ready to hire our own HR manager?",
    answer:
      "We help you find the right person and support the transition, then stay available afterward for the bigger strategic conversations.",
  },
  {
    question: "Can this cover recruiting as well as day-to-day HR admin?",
    answer:
      "Yes. Recruiting is included, along with documentation, onboarding, offboarding, time and absence, and performance management.",
  },
];

const outsourcedHrFaqsDe = [
  {
    question: "Für welche Unternehmensgröße ist ausgelagertes HR am besten geeignet?",
    answer:
      "Typischerweise für Unternehmen mit 10 bis 100 Mitarbeitenden, insbesondere wenn noch keine eigene HR-Stelle besetzt ist.",
  },
  {
    question: "Erhalten wir eine feste Ansprechperson?",
    answer:
      "Ja, eine feste Ansprechperson oder ein dediziertes Team, sodass Sie bei Anfragen nie wieder von vorne beginnen müssen.",
  },
  {
    question: "Wie funktioniert die Abrechnung?",
    answer:
      "Pay-as-you-go. Sie zahlen flexibel nur für die tatsächlich erbrachten Leistungen.",
  },
  {
    question: "Was passiert, wenn wir eine eigene HR-Manager:in einstellen möchten?",
    answer:
      "Wir unterstützen Sie bei der Suche nach der passenden Person, begleiten die Übergabe und stehen danach weiterhin für strategische Sparrings zur Verfügung.",
  },
  {
    question: "Deckt dies sowohl Recruiting als auch die laufende HR-Administration ab?",
    answer:
      "Ja. Recruiting ist ebenso enthalten wie Dokumentation, Onboarding, Offboarding, Zeiterfassung, Abwesenheiten und Leistungsmanagement.",
  },
];

export function OutsourcedHrClient() {
  const locale = useLocale();
  const isDe = locale === "de";
  const t = useTranslations("services.outsourcedHr");

  const coveredScopeItems = isDe ? coveredScopeItemsDe : coveredScopeItemsEn;
  const marqueeCards = isDe ? marqueeCardsDe : marqueeCardsEn;
  const interimModelPoints = isDe ? interimModelPointsDe : interimModelPointsEn;
  const outsourcedModelPoints = isDe ? outsourcedModelPointsDe : outsourcedModelPointsEn;
  const outsourcedHrFaqs = isDe ? outsourcedHrFaqsDe : outsourcedHrFaqsEn;

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
                href="/contact?topic=outsourced-hr"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-extrabold text-brand-dark bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_4px_22px_rgba(129,216,208,0.65)] border border-white/80 hover:shadow-[0_6px_28px_rgba(129,216,208,0.95)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/75 to-transparent rounded-t-full pointer-events-none" />
                <span className="relative z-10 tracking-tight font-extrabold">
                  {t("ctaButton")}
                </span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.08)] border border-gray-200/80">
              <Image
                src="/images/outsourced-hr-hero.jpg"
                alt="Scaliify Outsourced HR Management and People Operations Team"
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
            {companies.map((c) => (
              <div key={c.id} className="relative h-7 w-20 sm:w-24 shrink-0 flex items-center justify-center">
                <Image
                  src={c.logoUrl}
                  alt={`${c.name} logo`}
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
      {/* 3. COVERED SCOPE                                             */}
      {/* ============================================================ */}
      <section id="covered" className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-black">
              {isDe ? "Was unser ausgelagertes HR-Management abdeckt" : "What our outsourced HR management covers"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {coveredScopeItems.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3 group p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#81D8D0]/60 shadow-2xs hover:shadow-md transition-all duration-300">
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
      {/* 4. MARQUEE CAROUSEL                                          */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-12 sm:py-16 overflow-hidden border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2">
            {isDe ? "ERFOLGREICH BEI TEAMS MIT 10-100 MITARBEITENDEN" : "BUILT FOR GROWING TEAMS WITH 10-100 EMPLOYEES"}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight">
            {isDe ? "Professionelle HR-Strukturen ohne Fixkosten" : "Professional HR structure without full-time overhead"}
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
      {/* 5. COMPARISON MATRIX: Interim vs Outsourced HR               */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2.5">
              {isDe ? "DAS RICHTIGE MODELL WÄHLEN" : "CHOOSING THE RIGHT MODEL"}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black">
              {isDe ? "Interimsmanagement vs. Ausgelagertes HR" : "Interim Management vs. Outsourced HR"}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#05434B] via-[#2B4C55] to-[#1b3a42] rounded-3xl p-6 sm:p-10 border border-[#76D8C8]/20 shadow-[0_15px_45px_rgba(5,67,75,0.22)] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(118,216,200,0.25)_0%,transparent_70%)] pointer-events-none blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle,rgba(79,184,170,0.18)_0%,transparent_70%)] pointer-events-none blur-2xl" />

            {/* Left: Interim Management Model */}
            <div className="flex flex-col justify-between py-2 sm:py-4 pr-0 md:pr-6 relative z-10 text-white">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
                  {isDe ? "Interimsmanagement" : "Interim Management"}
                </h3>
                <ul className="flex flex-col gap-4">
                  {interimModelPoints.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                      <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5 text-gray-300">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Outsourced HR Management */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-[#76D8C8]/50 flex flex-col justify-between relative z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#2B4C55] mb-6">
                  {isDe ? "Ausgelagertes HR-Management" : "Outsourced HR Management"}
                </h3>
                <ul className="flex flex-col gap-4">
                  {outsourcedModelPoints.map((item) => (
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
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FREQUENTLY ASKED QUESTIONS ACCORDION                      */}
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
            {outsourcedHrFaqs.map((faq, index) => {
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
      {/* 7. DISCOVERY & CONSULTATION BOOKING LEAD SECTION             */}
      {/* ============================================================ */}
      <BookingLeadSection
        badgeTitle={isDe ? "AUSGELAGERTES HR & PEOPLE OPS" : "OUTSOURCED HR & PEOPLE OPS"}
        title={isDe ? "Mit ausgelagertem HR starten" : "Get started with outsourced HR"}
        subtitle={
          isDe
            ? "Teilen Sie uns Ihre Teamgröße und Anforderungen mit. Wir richten Ihr dediziertes externes HR-Team in unter 48 Stunden ein."
            : "Tell us about your team size and operational needs. We set up your dedicated HR team and workflows in under 48 hours."
        }
        source="outsourced_hr"
      />

      {/* ============================================================ */}
      {/* 9. BLOG SECTION                                              */}
      {/* ============================================================ */}
      <BlogSection />
    </main>
  );
}
