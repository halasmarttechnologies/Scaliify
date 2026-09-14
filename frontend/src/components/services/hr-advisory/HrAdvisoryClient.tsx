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
  Scale,
  Building2,
  Sliders,
  FileCheck,
  Cpu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companies } from "@/data/companies";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";
import { AnimatedStatCounter } from "@/components/common/AnimatedStatCounter";

const advisoryTopicsEn = [
  {
    icon: Building2,
    title: "Restructuring & Org Design",
    desc: "Target operating models, leadership span of control, department realignments, and compassionate workforce right-sizing.",
  },
  {
    icon: Sliders,
    title: "Compensation Frameworks",
    desc: "Competitive salary band design, market benchmarking, equity/VSOP pools, and executive incentive structures.",
  },
  {
    icon: BarChart3,
    title: "Performance Management Design",
    desc: "Designing continuous feedback frameworks, 360-degree reviews, OKRs, and manager enablement programs that drive real outcomes.",
  },
  {
    icon: Users,
    title: "Works Council Topics (Betriebsrat)",
    desc: "Constructive negotiations of works agreements (Betriebsvereinbarungen), IT co-determination, and compliant social partnerships.",
  },
  {
    icon: FileCheck,
    title: "Policy Development & Legal Considerations",
    desc: "Comprehensive employee handbooks, modern remote work guidelines, and strategic German & European employment law compliance.",
  },
  {
    icon: Cpu,
    title: "New Systems & Tech Roadmap",
    desc: "Vendor-neutral software evaluations, HRIS architecture blueprints, and change management strategies for seamless tool rollouts.",
  },
];

const advisoryTopicsDe = [
  {
    icon: Building2,
    title: "Restrukturierung & Org Design",
    desc: "Zielbetriebsmodelle, Führungsspannen, Abteilungs-Neuausrichtungen und sozialverträgliche Teamanpassungen.",
  },
  {
    icon: Sliders,
    title: "Vergütungssysteme & Gehaltsbänder",
    desc: "Wettbewerbsfähige Gehaltsstrukturen, Markt-Benchmarks, Mitarbeiterbeteiligungen (VSOP/ESOP) und variable Vergütungsmodelle.",
  },
  {
    icon: BarChart3,
    title: "Performance Management",
    desc: "Gestaltung kontinuierlicher Feedback-Systeme, 360-Grad-Reviews, OKR-Systeme und Führungskräfte-Befähigung mit messbarer Wirkung.",
  },
  {
    icon: Users,
    title: "Betriebsrats-Themen",
    desc: "Konstruktive Verhandlung von Betriebsvereinbarungen, IT-Mitbestimmung nach § 87 BetrVG und gelebte Sozialpartnerschaft.",
  },
  {
    icon: FileCheck,
    title: "HR-Policies & Arbeitsrecht",
    desc: "Mitarbeiterhandbücher, zeitgemäße Remote-Work-Richtlinien und rechtssichere Compliance nach deutschem und europäischem Arbeitsrecht.",
  },
  {
    icon: Cpu,
    title: "HR-Tech-Roadmap",
    desc: "Herstellerneutrale Software-Evaluationen, HRIS-Architektur-Konzepte und Change-Management-Strategien für erfolgreiche System-Einführungen.",
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
    brandName: "SoftwareOne",
    quote:
      "Ben is one of those rare professionals who combines strategic insight with operational excellence. During his time at SoftwareOne, he led complex HR initiatives across EMEA with clarity, structure, and empathy.",
    author: "Thomai Carapali | Head of P&C EMEA, SoftwareOne Germany GmbH",
    border: "border-[#76D8C8]/40",
  },
  {
    type: "image-card",
    image: "/images/rowing-team.jpg",
    quote:
      "As our interim CHRO, scaliify brought clarity and momentum to our organizational development. scaliify helped us streamline recruiting, introduce scalable HR structures, and prepare our future team growth.",
    author: "Managing Director | Client in the Tech Industry",
    border: "border-gray-200/50",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#2B4C55] via-[#05434B] to-[#4FB8AA]",
    stat: "100%",
    sub: "pragmatic strategy plus operational rigor",
    brand: "Scaliify HR Advisory",
    border: "border-[#76D8C8]/30",
  },
  {
    type: "image-card",
    image: "/images/office-team.jpg",
    quote:
      "scaliify brought both structure and strategic thinking to our operations. As our Interim HR Project Manager and Shift Planner, scaliify played a key role in improving our workforce planning processes and driving forward HR-related initiatives.",
    author: "Head of Service Operations | Client in the Energy Sector",
    border: "border-gray-200/50",
  },
  {
    type: "quote-card",
    bg: "bg-[#e8f7f4]",
    brandName: "Westbridge",
    quote:
      "Thanks to their hands-on approach and strategic mindset, we’re now in a much stronger position to scale our HR operations.",
    author: "Wiebke Weidner | Head of HR, Westbridge",
    border: "border-[#4FB8AA]/40",
  },
  {
    type: "image-card",
    image: "/images/food-pantry.jpg",
    quote:
      "Working with scaliify was a game changer for our HR setup. Their team guided us through the successful implementation of Personio and helped us restructure our HR processes to be more efficient, transparent, and scalable.",
    author: "Marion Kleber | Managing Director, Harrer Ingenieure GmbH",
    border: "border-gray-200/50",
  },
];

const marqueeCardsDe = [
  {
    type: "quote-card",
    bg: "bg-[#f0faf8]",
    brandName: "SoftwareOne",
    quote:
      "Ben ist einer der seltenen Experten, die strategischen Weitblick mit operativer Exzellenz verbinden. Während seiner Zeit bei SoftwareOne leitete er komplexe HR-Initiativen in der EMEA-Region mit Klarheit, Struktur und Empathie.",
    author: "Thomai Carapali | Head of P&C EMEA, SoftwareOne Germany GmbH",
    border: "border-[#76D8C8]/40",
  },
  {
    type: "image-card",
    image: "/images/rowing-team.jpg",
    quote:
      "Als unser Interim-CHRO brachte scaliify Klarheit und Dynamik in unsere Organisationsentwicklung. scaliify half uns, das Recruiting zu optimieren, skalierbare HR-Strukturen aufzubauen und unser künftiges Teamwachstum vorzubereiten.",
    author: "Managing Director | Kunde in der Technologiebranche",
    border: "border-gray-200/50",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#2B4C55] via-[#05434B] to-[#4FB8AA]",
    stat: "100%",
    sub: "pragmatische Strategie & operative Exzellenz",
    brand: "Scaliify HR Advisory",
    border: "border-[#76D8C8]/30",
  },
  {
    type: "image-card",
    image: "/images/office-team.jpg",
    quote:
      "scaliify brachte Struktur und strategisches Denken in unsere Operations. Als unser Interim HR Projektmanager und Schichtplaner spielte scaliify eine Schlüsselrolle bei der Optimierung unserer Personaleinsatzplanung und trieb wichtige HR-Initiativen voran.",
    author: "Head of Service Operations | Kunde im Energiesektor",
    border: "border-gray-200/50",
  },
  {
    type: "quote-card",
    bg: "bg-[#e8f7f4]",
    brandName: "Westbridge",
    quote:
      "Dank ihres praxisnahen Ansatzes und strategischen Denkens sind wir nun in einer viel stärkeren Position, um unsere HR-Operations zu skalieren.",
    author: "Wiebke Weidner | Head of HR, Westbridge",
    border: "border-[#4FB8AA]/40",
  },
  {
    type: "image-card",
    image: "/images/food-pantry.jpg",
    quote:
      "Die Zusammenarbeit mit scaliify war für unser HR-Setup ein echter Gamechanger. Das Team begleitete uns bei der erfolgreichen Einführung von Personio und half uns, unsere HR-Prozesse effizienter, transparenter und skalierbarer aufzustellen.",
    author: "Marion Kleber | Managing Director, Harrer Ingenieure GmbH",
    border: "border-gray-200/50",
  },
];

const traditionalConsultancyItemsEn = [
  "Rigid 6-figure retainers and bloated project overhead",
  "Theoretical 100-slide decks created by junior analysts",
  "Zero hands-on experience in daily HR operations",
  "Protracted multi-month timelines before seeing results",
  "Advisors disappear during critical execution phases",
];

const traditionalConsultancyItemsDe = [
  "Starre 6-stellige Honorare und aufgeblähter Projekt-Overhead",
  "Theoretische 100-Seiten-Präsentationen von Junior-Beratern",
  "Keine eigene Erfahrung im operativen HR-Tagesgeschäft",
  "Monatelange Projektlaufzeiten vor ersten konkreten Resultaten",
  "Berater sind bei der praktischen Umsetzung nicht mehr greifbar",
];

const scaliifyAdvisoryItemsEn = [
  "Strategy consulting rigor combined with hands-on HR operations",
  "On-demand expert input without retaining a full consultancy",
  "Seasoned former CHROs and HR leaders with battle-tested track records",
  "Pragmatic, implementation-ready deliverables tailored to your culture",
  "Total flexibility: one-off sessions, retained hours, or pay as you go",
];

const scaliifyAdvisoryItemsDe = [
  "Strategische Beratungskompetenz kombiniert mit operativer HR-Praxis",
  "On-Demand-Expertise ohne langfristige Bindung an Großberatungen",
  "Erfahrene ehemalige CHROs und HR-Führungskräfte auf Augenhöhe",
  "Pragmatische, sofort umsetzbare Ergebnisse abgestimmt auf Ihre Kultur",
  "Volle Flexibilität: Einzelsessions, Stundenkontingente oder Pay-as-you-go",
];

const hrAdvisoryFaqsEn = [
  {
    question: "What typical questions and topics does Scaliify HR Advisory cover?",
    answer:
      "We provide strategic counsel on high-impact People challenges, including organizational restructuring, compensation framework design and salary benchmarking, performance management redesigns, works council (Betriebsrat) negotiations, employee handbook and policy development, and HR technology transformation roadmaps.",
  },
  {
    question: "How does the engagement format work (one-off vs. retained vs. pay-as-you-go)?",
    answer:
      "We offer three flexible advisory formats: (1) One-off deep dive strategy sessions for urgent dilemmas or second opinions, (2) Retained monthly hours for regular leadership check-ins and ongoing project guidance, and (3) Pay-as-you-go advisory where you only book and pay for the specific hours you need with zero long-term lock-in.",
  },
  {
    question: "What expertise and backgrounds do your HR advisors have?",
    answer:
      "Our advisory team combines tier-1 strategy consulting backgrounds (ex-McKinsey, BCG, Bain, Big 4) with former CHROs and Heads of People from high-growth European scaleups and mid-market firms. This unique blend ensures strategic executive rigor paired with practical, battle-tested operational feasibility.",
  },
  {
    question: "Can you advise on German labor law considerations and works council (Betriebsrat) topics?",
    answer:
      "Yes. Our advisors possess deep expertise in German and European employment compliance, including co-determination rights (§87 BetrVG), negotiation of company agreements (Betriebsvereinbarungen), restructuring consultations, and mitigating employment status risks (Scheinselbstständigkeit).",
  },
  {
    question: "How quickly can we schedule a strategic sparring session with an advisor?",
    answer:
      "We can typically schedule an initial scoping call within 24 hours. Once we understand your challenge, we match you with a specialized senior advisor for an immediate working session or project kickoff.",
  },
  {
    question: "How does Scaliify HR Advisory differ from hiring a traditional management consultancy?",
    answer:
      "Traditional consultancies charge massive upfront fees and assign junior consultants who deliver generic, theoretical slide decks. Scaliify provides direct access to senior practitioners who have actually led People operations. We deliver pragmatic, actionable frameworks that your internal team can execute immediately.",
  },
];

const hrAdvisoryFaqsDe = [
  {
    question: "Welche typischen Themen und Fragestellungen deckt Scaliify HR Advisory ab?",
    answer:
      "Wir beraten strategisch zu zentralen People-Herausforderungen: Organisationsentwicklung & Restrukturierung, Vergütungssysteme & Gehalts-Benchmarks, Performance Management, Betriebsratsverhandlungen, Mitarbeiterhandbücher & Policies sowie HR-Tech-Transformationsroadmaps.",
  },
  {
    question: "Wie funktioniert die Zusammenarbeit (Einzelsession vs. Retainer vs. Pay-as-you-go)?",
    answer:
      "Wir bieten drei flexible Formate: (1) Einmalige Deep-Dive-Strategiesessions für dringende Fragestellungen, (2) Monatliche Retainer-Stunden für kontinuierliches Sparring der Geschäftsführung und (3) Pay-as-you-go, bei dem Sie flexibel nur gebuchte Stunden ohne Mindestlaufzeit zahlen.",
  },
  {
    question: "Welche Qualifikationen und Hintergründe bringen die HR-Berater mit?",
    answer:
      "Unser Team verbindet Erfahrung aus Top-Strategieberatungen (Big 4, McKinsey, BCG) mit ehemaligen CHROs und HR-Leitern führender europäischer Wachstumsunternehmen. Diese Kombination sichert methodische Exzellenz bei maximaler praktischer Umsetzbarkeit.",
  },
  {
    question: "Beraten Sie auch zu deutschem Arbeitsrecht und Betriebsratsfragen?",
    answer:
      "Ja. Wir verfügen über tiefes Praxiswissen in deutscher und europäischer Arbeitsrechts-Compliance, Mitbestimmungsrechten nach § 87 BetrVG, Verhandlung von Betriebsvereinbarungen und Prüfungen zur Vermeidung von Scheinselbstständigkeit.",
  },
  {
    question: "Wie schnell können wir eine strategische Sparrings-Session vereinbaren?",
    answer:
      "Ein erstes Abstimmungsgespräch kann in der Regel innerhalb von 24 Stunden stattfinden. Anschließend matchen wir Sie direkt mit dem passenden Senior-Advisor für den sofortigen Arbeitsstart.",
  },
  {
    question: "Worin unterscheidet sich Scaliify von klassischen Unternehmensberatungen?",
    answer:
      "Klassische Beratungen verlangen hohe Pauschalen und setzen oft Junior-Berater ein, die theoretische Folien erstellen. Bei Scaliify arbeiten Sie direkt mit praxiserfahrenen HR-Führungskräften, die pragmatische und sofort einsetzbare Lösungen liefern.",
  },
];

export function HrAdvisoryClient() {
  const locale = useLocale();
  const isDe = locale === "de";
  const t = useTranslations("services.hrAdvisory");

  const advisoryTopics = isDe ? advisoryTopicsDe : advisoryTopicsEn;
  const marqueeCards = isDe ? marqueeCardsDe : marqueeCardsEn;
  const traditionalConsultancyItems = isDe ? traditionalConsultancyItemsDe : traditionalConsultancyItemsEn;
  const scaliifyAdvisoryItems = isDe ? scaliifyAdvisoryItemsDe : scaliifyAdvisoryItemsEn;
  const hrAdvisoryFaqs = isDe ? hrAdvisoryFaqsDe : hrAdvisoryFaqsEn;

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
                href="/contact?topic=hr-advisory"
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
                src="/images/hr-advisory-hero.jpg"
                alt="Scaliify Strategic HR Advisory and Organizational Development"
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
      {/* 3. ADVISORY TOPICS                                           */}
      {/* ============================================================ */}
      <section id="topics" className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-black">
              {isDe ? "Strategische Beratung für erfolgskritische People-Themen" : "Strategic counsel for high-stakes People challenges"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {advisoryTopics.map(({ icon: Icon, title, desc }) => (
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
            {isDe ? "BERATUNGSERFOLG IN ÜBER 100 STRATEGISCHEN MANDATEN" : "TRUSTED BY BOARDS & HR LEADERS ACROSS EUROPE"}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight">
            {isDe ? "Pragmatische Lösungen mit messbarem Geschäftserfolg" : "Pragmatic solutions driving real business outcomes"}
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
      {/* 5. COMPARISON MATRIX                                         */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2.5">
              {isDe ? "DER SCALIIFY-UNTERSCHIED" : "THE SCALIIFY DIFFERENCE"}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black">
              {isDe ? "Klassische Beratung vs. Scaliify HR Advisory" : "Traditional Consultancies vs. Scaliify HR Advisory"}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#05434B] via-[#2B4C55] to-[#1b3a42] rounded-3xl p-6 sm:p-10 border border-[#76D8C8]/20 shadow-[0_15px_45px_rgba(5,67,75,0.22)] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(118,216,200,0.25)_0%,transparent_70%)] pointer-events-none blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle,rgba(79,184,170,0.18)_0%,transparent_70%)] pointer-events-none blur-2xl" />

            {/* Left: Traditional Consultancy */}
            <div className="flex flex-col justify-between py-2 sm:py-4 pr-0 md:pr-6 relative z-10 text-white">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
                  {isDe ? "Klassische Unternehmensberatungen" : "Traditional Consultancies"}
                </h3>
                <ul className="flex flex-col gap-4">
                  {traditionalConsultancyItems.map((item) => (
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

            {/* Right: Scaliify HR Advisory */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-[#76D8C8]/50 flex flex-col justify-between relative z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#2B4C55] mb-6">
                  {isDe ? "Scaliify HR Advisory" : "Scaliify HR Advisory"}
                </h3>
                <ul className="flex flex-col gap-4">
                  {scaliifyAdvisoryItems.map((item) => (
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
            {hrAdvisoryFaqs.map((faq, index) => {
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
        badgeTitle={isDe ? "STRATEGISCHE HR-BERATUNG" : "STRATEGIC HR ADVISORY"}
        title={isDe ? "HR-Beratung anfragen" : "Request an HR advisory session"}
        subtitle={
          isDe
            ? "Teilen Sie uns Ihre strategische Herausforderung mit. Wir matchen Sie innerhalb von 24 Stunden mit einer praxiserfahrenen HR-Führungskraft."
            : "Tell us about your strategic People challenge or organizational goal. We will match you with a seasoned former CHRO or senior advisor within 24 hours."
        }
        source="hr_advisory"
      />

      {/* ============================================================ */}
      {/* 9. BLOG SECTION                                              */}
      {/* ============================================================ */}
      <BlogSection />
    </main>
  );
}
