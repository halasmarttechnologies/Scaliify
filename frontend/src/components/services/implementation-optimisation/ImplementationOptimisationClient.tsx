"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
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
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";

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

const pillarsEn = [
  {
    icon: Settings2,
    title: "Managing the Full Rollout",
    desc: "We handle the whole process: project management, configuration, data migration, testing, rollout, adoption, all of it. We ask questions and shape the setup around what your chosen system is actually good at.",
  },
  {
    icon: Users2,
    title: "More Than a Technical Job",
    desc: "A new system changes how people work day to day. We stick around for both sides of that: the technical setup and the shift that comes with it, because a system nobody's actually using isn't much of a win.",
  },
  {
    icon: Workflow,
    title: "We Ask the Questions Nobody Else Does",
    desc: "Most implementation partners will build whatever you hand them. We'll build that too, but we'll also flag it if something needs rethinking first. Finishing the project isn't the goal. Making sure it works once we're gone is.",
  },
  {
    icon: SearchCode,
    title: "HR IT Audit & System Review",
    desc: "Already have a system that isn't performing the way it should? Our HR IT Audit digs into what's going wrong and maps out what to fix.",
  },
];

const pillarsDe = [
  {
    icon: Settings2,
    title: "Den vollständigen Rollout managen",
    desc: "Wir übernehmen den gesamten Prozess: Projektmanagement, Konfiguration, Datenmigration, Testing, Rollout und Nutzerakzeptanz – einfach alles. Wir stellen gezielte Fragen und richten das Setup an den tatsächlichen Stärken Ihres gewählten Systems aus.",
  },
  {
    icon: Users2,
    title: "Mehr als eine rein technische Aufgabe",
    desc: "Ein neues System verändert, wie Menschen tagtäglich arbeiten. Wir begleiten beide Seiten: die technische Einrichtung und den damit verbundenen Kulturwandel. Denn ein System, das niemand nutzt, bringt keinen echten Mehrwert.",
  },
  {
    icon: Workflow,
    title: "Wir stellen die Fragen, die sonst niemand stellt",
    desc: "Die meisten Implementierungspartner bauen genau das, was man ihnen vorgibt. Wir setzen das auch um, weisen aber frühzeitig darauf hin, wenn etwas grundlegend überdacht werden sollte. Ein Projekt abzuschließen ist nicht das Ziel – sicherzustellen, dass es auch nach unserem Weggang funktioniert, schon.",
  },
  {
    icon: SearchCode,
    title: "HR-IT-Audit & Systemprüfung",
    desc: "Haben Sie bereits ein System, das nicht die gewünschte Leistung bringt? Unser HR-IT-Audit analysiert bestehende Schwachstellen und zeigt konkrete Optimierungsschritte auf.",
  },
];

const marqueeCardsEn = [
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
  {
    type: "image-card",
    image: "/images/rowing-team.jpg",
    quote:
      "Our team adoption reached 99% within the first month. Scaliify guided our managers through every workflow change with hands-on empathy and technical precision.",
    author: "Lukas Weber | VP of People & Culture",
    border: "border-gray-200/50",
  },
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
  {
    type: "image-card",
    image: "/images/food-pantry.jpg",
    quote:
      "The HR IT Audit exposed data bottlenecks we had struggled with for two years. Scaliify reconfigured our entire stack without interrupting daily payroll.",
    author: "Sarah Lindemann | Chief People Officer",
    border: "border-gray-200/50",
  },
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

const marqueeCardsDe = [
  {
    type: "quote-card",
    bg: "bg-[#043339]",
    brandName: "techscale",
    brandColor: "text-[#81D8D0]",
    quoteColor: "text-white/95",
    authorColor: "text-[#76D8C8]",
    quote:
      "Scaliify hat nicht nur unser neues HRIS eingerichtet, sondern zuerst unsere Onboarding- und Lohnprozesse optimiert. Der Rollout über 4 europäische Einheiten lief reibungslos.",
    author: "Elena Richter | Head of People Operations",
    border: "border-[#81D8D0]/40",
  },
  {
    type: "image-card",
    image: "/images/rowing-team.jpg",
    quote:
      "Unsere Nutzerakzeptanz lag im ersten Monat bei 99 %. Scaliify hat unsere Führungskräfte mit Empathie und technischer Präzision durch jeden Schritt geführt.",
    author: "Lukas Weber | VP of People & Culture",
    border: "border-gray-200/50",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#81D8D0] via-[#5BC7BC] to-[#4FB8AA]",
    stat: "45%",
    statColor: "text-[#05434B]",
    subColor: "text-[#042d32]",
    brandColor: "text-[#05434B]",
    sub: "weniger administrativer HR-Aufwand nach dem Rollout",
    brand: "Scaliify HR Advisory",
    border: "border-white/80",
  },
  {
    type: "image-card",
    image: "/images/food-pantry.jpg",
    quote:
      "Das HR-IT-Audit hat Datenengpässe aufgedeckt, mit denen wir zwei Jahre gekämpft hatten. Scaliify hat den Stack ohne Unterbrechung der Gehaltsabrechnung neu konfiguriert.",
    author: "Sarah Lindemann | Chief People Officer",
    border: "border-gray-200/50",
  },
  {
    type: "quote-card",
    bg: "bg-[#E2F7F3]",
    brandName: "scaleup group",
    brandColor: "text-[#05434B]",
    quoteColor: "text-gray-900",
    authorColor: "text-[#2B4C55]",
    quote:
      "Anders als klassische IT-Dienstleister, die nur Anweisungen abarbeiten, hat uns Scaliify genau gesagt, was wir ändern müssen, um zukunftssicher aufgestellt zu sein.",
    author: "Markus Hoffmann | Managing Director",
    border: "border-[#76D8C8]/60",
  },
  {
    type: "quote-card",
    bg: "bg-gradient-to-br from-[#08383F] via-[#05434B] to-[#12535C]",
    brandName: "globalflow",
    brandColor: "text-[#A8F5EE]",
    quoteColor: "text-white/95",
    authorColor: "text-[#81D8D0]",
    quote:
      "Von der Datenmigration bis zur DATEV-Integration hat Scaliify die gesamte Vorarbeit geleistet und unser internes Team geschult.",
    author: "Sophie Dubois | Global HR Operations",
    border: "border-[#81D8D0]/50",
  },
];

const beforeItemsEn = [
  "Blind software setup copying outdated, broken processes",
  "Fragmented data migrations resulting in duplicate records",
  "Zero change management leading to poor team adoption",
  "Contractors executing requests without questioning flaws",
  "Unused, expensive features causing software frustration",
];

const beforeItemsDe = [
  "Blinde Software-Einrichtung, die alte Prozesse unreflektiert übernimmt",
  "Fehlerhafte Datenmigrationen mit doppelten Datensätzen",
  "Fehlendes Change Management mit geringer Team-Akzeptanz",
  "Dienstleister, die Aufträge abarbeiten, ohne Schwachstellen zu hinterfragen",
  "Ungenutzte, teure Funktionen, die Frustration erzeugen",
];

const afterItemsEn = [
  { text: "Optimized people processes tailored to system strengths", badge: "Strategic" },
  { text: "Spotless data migration & rigorous multi-tier testing", badge: "Zero Loss" },
  { text: "Empathetic cultural change & 98%+ user adoption", badge: "High Adoption" },
  { text: "Advisors who challenge assumptions & design best setups", badge: "True Advisory" },
  { text: "Harmonious, automated HR landscape built to scale", badge: "Effortless scale" },
];

const afterItemsDe = [
  { text: "Optimierte People-Prozesse, ausgerichtet an Systemstärken", badge: "Strategisch" },
  { text: "Verlustfreie Datenmigration & mehrstufige Tests", badge: "Null Verlust" },
  { text: "Begleiteter Kulturwandel & über 98 % Nutzerakzeptanz", badge: "Hohe Akzeptanz" },
  { text: "Berater, die Annahmen hinterfragen & Best-Practice-Setups bauen", badge: "Echte Beratung" },
  { text: "Harmonische, automatisierte HR-Landschaft, bereit zu skalieren", badge: "Skalierbar" },
];

const implementationFaqsEn = [
  {
    question: "Do you only implement new systems, or can you fix an existing setup too?",
    answer:
      "Both. We handle full rollouts from scratch, and we also step in when a system that's already live isn't delivering what it should.",
  },
  {
    question: "How involved does our team need to be during implementation?",
    answer:
      "As much or as little as works for you. Some clients want to be hands-on the whole way through. Others prefer we run the project and check in at key points.",
  },
  {
    question: "What happens after the system goes live?",
    answer:
      "We stay through adoption, not just launch. Training, troubleshooting, making sure people are actually using it the way it was set up to be used.",
  },
  {
    question: "Can you work with a system we've already picked?",
    answer:
      "Yes. You don't need to go through our selection process first. We can jump straight into implementation if you already know which platform you're using.",
  },
  {
    question: "How long does a typical implementation take?",
    answer:
      "It varies by system and company size, but most projects land somewhere between a few weeks and a few months, depending on complexity and how much process redesign is involved.",
  },
];

const implementationFaqsDe = [
  {
    question: "Implementieren Sie nur neue Systeme oder optimieren Sie auch bestehende Setups?",
    answer:
      "Beides. Wir übernehmen komplette Neueinführungen und greifen ein, wenn ein bereits aktives System nicht die gewünschten Ergebnisse liefert.",
  },
  {
    question: "Wie stark muss unser internes Team während der Implementierung eingebunden sein?",
    answer:
      "So viel oder so wenig, wie es für Sie am besten passt. Manche Kunden möchten jeden Schritt begleiten; andere bevorzugen es, dass wir das Projekt eigenständig steuern und an Schlüsselpunkten abstimmen.",
  },
  {
    question: "Was passiert nach dem Go-Live des Systems?",
    answer:
      "Wir begleiten Sie auch während der Einführungsphase: Schulungen, Fehlerbehebung und die Sicherstellung, dass das System von allen so genutzt wird, wie es konfiguriert wurde.",
  },
  {
    question: "Können Sie auch mit einem System arbeiten, das wir bereits ausgewählt haben?",
    answer:
      "Ja. Sie müssen nicht erst unseren Auswahlprozess durchlaufen. Wir können direkt in die Implementierung starten, wenn Sie sich bereits für eine Plattform entschieden haben.",
  },
  {
    question: "Wie lange dauert eine typische Implementierung?",
    answer:
      "Das variiert je nach System und Unternehmensgröße, liegt aber meist zwischen wenigen Wochen und einigen Monaten, abhängig von Komplexität und erforderlicher Prozessanpassung.",
  },
];

export function ImplementationOptimisationClient() {
  const locale = useLocale();
  const isDe = locale === "de";
  const t = useTranslations("services.implementationOptimisation");

  const pillars = isDe ? pillarsDe : pillarsEn;
  const marqueeCards = isDe ? marqueeCardsDe : marqueeCardsEn;
  const beforeItems = isDe ? beforeItemsDe : beforeItemsEn;
  const afterItems = isDe ? afterItemsDe : afterItemsEn;
  const implementationFaqs = isDe ? implementationFaqsDe : implementationFaqsEn;

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
                href="/lets-talk"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-extrabold text-brand-dark bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_4px_22px_rgba(129,216,208,0.65)] border border-white/80 hover:shadow-[0_6px_28px_rgba(129,216,208,0.95)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/75 to-transparent rounded-t-full pointer-events-none" />
                <span className="relative z-10 tracking-tight font-extrabold">
                  {t("ctaButton")}
                </span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-black border border-gray-300 hover:border-[#2B4C55] px-6 py-3.5 rounded-full transition-all hover:bg-gray-50 cursor-pointer"
              >
                <span>{isDe ? "HR-IT-Audit anfragen" : "Request HR IT Audit"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2B4C55]" />
              </Link>
            </div>
          </div>

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
      {/* 3. FOUR PILLARS                                              */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-black">
              {isDe ? "Strategische HR-Implementierung für nachhaltigen Erfolg" : "Strategic HR implementation built for lasting impact"}
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
            {isDe ? "ERPROBTE ROLLOUTS BEI 50-5.000+ MITARBEITENDEN" : "PROVEN ROLLOUTS ACROSS 50-5,000+ EMPLOYEES"}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight">
            {isDe ? "Reibungslose Rollouts und hohe Nutzerakzeptanz" : "Seamless rollouts and high user adoption"}
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
      {/* 5. BEFORE VS AFTER COMPARISON CARD                           */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2.5">
              {isDe ? "DER SCALIIFY-UNTERSCHIED" : "THE SCALIIFY DIFFERENCE"}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black">
              {isDe ? "Warum Unternehmen Scaliify für Implementierungen wählen" : "Why companies choose Scaliify for implementation"}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#ecf8f6] via-[#f4faf9] to-white rounded-3xl p-6 sm:p-10 border border-[#76D8C8]/40 shadow-[0_15px_45px_rgba(79,184,170,0.14)] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(118,216,200,0.35)_0%,transparent_70%)] pointer-events-none blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle,rgba(79,184,170,0.22)_0%,transparent_70%)] pointer-events-none blur-2xl" />

            {/* Left: Before Scaliify */}
            <div className="bg-white/95 backdrop-blur-sm text-gray-900 rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200/80 flex flex-col justify-between relative z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
                  {isDe ? "Vor Scaliify" : "Before Scaliify"}
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

            {/* Right: After Scaliify */}
            <div className="bg-gradient-to-br from-[#05434B] via-[#2B4C55] to-[#043339] text-white rounded-2xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(5,67,75,0.35)] border border-[#81D8D0]/60 flex flex-col justify-between relative z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#81D8D0] mb-6">
                  {isDe ? "Mit Scaliify" : "After Scaliify"}
                </h3>
                <ul className="flex flex-col gap-4">
                  {afterItems.map(({ text, badge }) => (
                    <li key={text} className="flex items-start justify-between gap-2 sm:gap-3 text-xs sm:text-sm text-white leading-relaxed font-semibold">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#81D8D0] text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="text-white font-bold">{text}</span>
                      </div>
                      {badge && (
                        <span className="self-start shrink-0 text-[9px] font-extrabold uppercase tracking-wide bg-[#81D8D0]/30 text-[#A8F5EE] px-2.5 py-0.5 rounded-full whitespace-nowrap">
                          {badge}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. TESTIMONIALS SECTION                                      */}
      {/* ============================================================ */}
      <Testimonials />

      {/* ============================================================ */}
      {/* 7. FREQUENTLY ASKED QUESTIONS ACCORDION                      */}
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
      {/* 8. DISCOVERY & CONSULTATION BOOKING LEAD SECTION             */}
      {/* ============================================================ */}
      <BookingLeadSection />

      {/* ============================================================ */}
      {/* 9. BLOG SECTION                                              */}
      {/* ============================================================ */}
      <BlogSection />
    </main>
  );
}
