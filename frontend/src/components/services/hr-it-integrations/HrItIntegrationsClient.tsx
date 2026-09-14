"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
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
import { softwareList, ToolLogo } from "@/components/home/SoftwareStack";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";
import { AnimatedStatCounter } from "@/components/common/AnimatedStatCounter";

const pillarsEn = [
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
    desc: "Not every system connects out of the box, and that's not where we stop. Together with specialized technical integration partners, we connect systems via robust APIs and proven connectors — or redesign the workflow so complex custom development isn't even needed.",
  },
  {
    icon: Cpu,
    title: "Process Redesign First",
    desc: "Every so often the cleanest fix isn't technical at all; it's rethinking why two systems needed to talk in the first place.",
  },
];

const pillarsDe = [
  {
    icon: Database,
    title: "Eine Single Source of Truth",
    desc: "Wir verbinden Ihre HR-Plattformen, sodass alle Daten an einem zentralen Ort gepflegt werden, statt manuell über drei oder vier nicht synchronisierte Systeme eingegeben zu werden. So müssen Sie nie wieder raten, welcher Datensatz aktuell ist.",
  },
  {
    icon: Users2,
    title: "Typische Szenarien, die wir abdecken",
    desc: "Die meisten Integrationen folgen vertrauten Mustern: HRIS an Gehaltsabrechnung, HRIS an ATS, HRIS an Finanz-/ERP-Systeme und Zeiterfassung synchronisiert mit Payroll. Wenn diese Bereiche bei Ihnen noch als getrennte Inseln laufen, liegen dort meist die größten Reibungsverluste.",
  },
  {
    icon: Workflow,
    title: "Wenn es keine Standard-Integration gibt",
    desc: "Nicht jedes System verbindet sich sofort von Haus aus – und genau da setzen wir an. Gemeinsam mit spezialisierten Integrationspartnern verbinden wir Systeme über robuste Schnittstellen und bewährte Konnektoren – oder gestalten den Prozess so um, dass aufwendige Sonderlösungen gar nicht nötig sind.",
  },
  {
    icon: Cpu,
    title: "Prozessneugestaltung zuerst",
    desc: "Oft ist die sauberste Lösung gar nicht technischer Natur, sondern das Hinterfragen, warum zwei Systeme überhaupt miteinander sprechen mussten.",
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
    image: "/images/hr-integrations-hero.jpg",
    quote:
      "Working with scaliify was a game changer for our HR setup. Their team guided us through the successful implementation of Personio and helped us restructure our HR processes to be more efficient, transparent, and scalable.",
    author: "Marion Kleiber | Managing Director, Harrer Ingenieure GmbH",
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
    image: "/images/office-team.jpg",
    quote:
      "scaliify managed our Personio implementation with great reliability and focus. The team ensured the project stayed on track, coordinated effectively across teams, and handled challenges pragmatically.",
    author: "Head of HR | Client in the Tech Industry",
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
    image: "/images/hr-integrations-leader.jpg",
    quote:
      "scaliify brought both structure and strategic thinking to our operations. As our Interim HR Project Manager and Shift Planner, scaliify played a key role in improving our workforce planning processes and driving forward HR-related initiatives.",
    author: "Head of Service Operations | Client in the Energy Sector",
    border: "border-gray-200/50",
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
    image: "/images/hr-integrations-hero.jpg",
    quote:
      "Die Zusammenarbeit mit scaliify war für unser HR-Setup ein echter Gamechanger. Das Team begleitete uns bei der erfolgreichen Einführung von Personio und half uns, unsere HR-Prozesse effizienter, transparenter und skalierbarer aufzustellen.",
    author: "Marion Kleiber | Managing Director, Harrer Ingenieure GmbH",
    border: "border-gray-200/50",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#2B4C55] via-[#05434B] to-[#4FB8AA]",
    stat: "100%",
    sub: "Datenkonsistenz über alle Systeme hinweg",
    brand: "Scaliify HR Advisory",
    border: "border-[#76D8C8]/30",
  },
  {
    type: "image-card",
    image: "/images/office-team.jpg",
    quote:
      "scaliify hat unsere Personio-Einführung mit hoher Zuverlässigkeit und Fokus gesteuert. Das Team sorgte dafür, dass das Projekt im Zeitplan blieb, koordinierte effizient über Teams hinweg und ging Herausforderungen pragmatisch an.",
    author: "Head of HR | Kunde in der Technologiebranche",
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
    image: "/images/hr-integrations-leader.jpg",
    quote:
      "scaliify brachte Struktur und strategisches Denken in unsere Operations. Als unser Interim HR Projektmanager und Schichtplaner spielte scaliify eine Schlüsselrolle bei der Optimierung unserer Personaleinsatzplanung und trieb wichtige HR-Initiativen voran.",
    author: "Head of Service Operations | Kunde im Energiesektor",
    border: "border-gray-200/50",
  },
];

const beforeItemsEn = [
  "Duplicate employee data typed manually into HRIS, Payroll, and ATS",
  "Risk of human error and payroll cutover delays from manual CSV exports",
  "Fragile point-to-point connections that break on software updates",
  "Costly custom API builds for broken processes that could be simplified",
  "Discrepancies between HR headcount numbers and Finance ERP reports",
];

const beforeItemsDe = [
  "Mitarbeiterdaten müssen manuell in HRIS, Lohn und ATS eingetippt werden",
  "Fehleranfällige manuelle CSV-Exporte mit Verzögerungen beim Monatsabschluss",
  "Instabile Behelfslösungen, die bei Software-Updates ständig abbrechen",
  "Teure Schnittstellen-Entwicklungen für eigentlich veraltete Prozesse",
  "Abweichende Mitarbeiterzahlen zwischen HR-Reports und Finanz-ERP",
];

const afterItemsEn = [
  "One verified single source of truth across your HR tech stack",
  "Automated HRIS ↔ Payroll sync without manual spreadsheets or CSVs",
  "Instant ATS candidate-to-hire onboarding with zero duplicate entry",
  "Process redesign first: simplifying workflows before building custom APIs",
  "Fully GDPR-compliant encryption, automated audit logs & error alerts",
];

const afterItemsDe = [
  "Eine verifizierte Single Source of Truth für Ihren gesamten HR-Tech-Stack",
  "Automatischer HRIS ↔ Lohnabgleich ohne manuelle Excel-Listen oder CSV-Exporte",
  "Nahtlose ATS-Übernahme ins Onboarding ohne doppelte Dateneingabe",
  "Prozessoptimierung zuerst: Workflows vereinfachen vor dem API-Bau",
  "DSGVO-konforme Verschlüsselung, Audit-Logs & automatische Fehler-Alerts",
];

const hrIntegrationsFaqsEn = [
  {
    question: "What if our systems don't officially support integration with each other?",
    answer:
      "That happens more often than you'd think, and it's not a dead end. Together with specialized technical integration partners, we connect systems via robust APIs and proven connectors — or redesign your workflow so complex custom connections aren't even needed.",
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

const hrIntegrationsFaqsDe = [
  {
    question: "Was ist, wenn unsere Systeme eine direkte Integration offiziell nicht unterstützen?",
    answer:
      "Das kommt häufiger vor als gedacht und ist kein Hindernis. Gemeinsam mit spezialisierten Integrationspartnern verbinden wir Systeme über bewährte Schnittstellen und Konnektoren – oder optimieren Ihre Prozesse so, dass aufwendige Sonderlösungen überflüssig werden.",
  },
  {
    question: "Wie lange dauert die Einrichtung einer Integration üblicherweise?",
    answer:
      "Das hängt von den beteiligten Systemen und dem erforderlichen Custom-Work ab, meist sind die Integrationen jedoch innerhalb weniger Wochen einsatzbereit.",
  },
  {
    question: "Wird der laufende HR-Betrieb während der Einrichtung gestört?",
    answer:
      "Wir planen alles so, dass Betriebsunterbrechungen minimiert werden – meist testen wir parallel im Hintergrund, bevor wir auf das Live-System umschalten.",
  },
  {
    question: "Können Sie mehr als zwei Systeme gleichzeitig integrieren?",
    answer:
      "Ja, viele unserer Projekte umfassen drei oder mehr Plattformen, insbesondere wenn Gehaltsabrechnung, HRIS und Zeiterfassung synchron gehalten werden müssen.",
  },
  {
    question: "Benötigen wir ein bestimmtes HRIS, damit das funktioniert?",
    answer:
      "Nein. Wir arbeiten plattformübergreifend mit allen gängigen HR-Systemen, sodass eine Integration unabhängig von Ihrer aktuellen Software möglich ist.",
  },
];

export function HrItIntegrationsClient() {
  const locale = useLocale();
  const isDe = locale === "de";
  const t = useTranslations("services.hrItIntegrations");

  const pillars = isDe ? pillarsDe : pillarsEn;
  const marqueeCards = isDe ? marqueeCardsDe : marqueeCardsEn;
  const beforeItems = isDe ? beforeItemsDe : beforeItemsEn;
  const afterItems = isDe ? afterItemsDe : afterItemsEn;
  const hrIntegrationsFaqs = isDe ? hrIntegrationsFaqsDe : hrIntegrationsFaqsEn;

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
                href="/contact?topic=integrations"
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
                <span>{isDe ? "HR Tool Finder testen" : "Try HR Tool Finder"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2B4C55]" />
              </Link>
            </div>
          </div>

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
      {/* 2. DYNAMIC HR SOFTWARE LOGO MARQUEE (INTEGRATED PLATFORMS)   */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-7 sm:py-9 border-y border-gray-100 overflow-hidden select-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-3 sm:mb-4 text-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
            {isDe
              ? "HR-Systeme & Plattformen, die wir nahtlos integrieren"
              : "HR systems & platforms we seamlessly integrate"}
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
              {isDe ? "HR-Systeme verbinden, die tatsächlich zusammenarbeiten" : "Connecting systems that actually work together"}
            </h2>
          </div>

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
      {/* 4. MARQUEE CAROUSEL                                          */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-12 sm:py-16 overflow-hidden border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2">
            {isDe ? "ZERTIFIZIERTE INTEGRATIONEN FÜR 50-5.000+ TEAMS" : "CERTIFIED ARCHITECTURE ACROSS 50-5,000+ EMPLOYEES"}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight">
            {isDe ? "Datensilos auflösen & manuelle Arbeit beenden" : "Unifying data silos into automated pipelines"}
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
      {/* 5. BEFORE VS AFTER COMPARISON CARD                           */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2.5">
              {isDe ? "DER SCALIIFY-UNTERSCHIED" : "THE SCALIIFY DIFFERENCE"}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black">
              {isDe ? "Warum moderne HR-Teams integrierte Systeme wählen" : "Why modern HR teams choose integrated systems"}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#05434B] via-[#2B4C55] to-[#1b3a42] rounded-3xl p-6 sm:p-10 border border-[#76D8C8]/20 shadow-[0_15px_45px_rgba(5,67,75,0.22)] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(118,216,200,0.25)_0%,transparent_70%)] pointer-events-none blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle,rgba(79,184,170,0.18)_0%,transparent_70%)] pointer-events-none blur-2xl" />

            {/* Left: Before Scaliify */}
            <div className="flex flex-col justify-between py-2 sm:py-4 pr-0 md:pr-6 relative z-10 text-white">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
                  {isDe ? "Vor Scaliify" : "Before Scaliify"}
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

            {/* Right: After Scaliify */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-[#76D8C8]/50 flex flex-col justify-between relative z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#2B4C55] mb-6">
                  {isDe ? "Mit Scaliify" : "After Scaliify"}
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
      {/* 7. INTEGRATIONS CONSULTATION BOOKING LEAD SECTION            */}
      {/* ============================================================ */}
      <BookingLeadSection
        badgeTitle={isDe ? "KOSTENLOSE BERATUNG" : "FREE CONSULTATION"}
        title={isDe ? "HR-IT-Integrationsgespräch buchen" : "Book an HR IT integration call"}
        subtitle={
          isDe
            ? "Besprechen Sie Ihren Software-Stack, Schnittstellen und Datenflüsse mit unseren Spezialisten für HR-IT-Architektur."
            : "Discuss your software stack, APIs, and data sync requirements with our HR IT architecture specialists."
        }
        source="hr_it_integrations"
      />

      {/* ============================================================ */}
      {/* 9. BLOG SECTION                                              */}
      {/* ============================================================ */}
      <BlogSection />
    </main>
  );
}
