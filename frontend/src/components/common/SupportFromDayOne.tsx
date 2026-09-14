"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import {
  Search,
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Send,
  Cpu,
  Users,
  UserCheck,
  Compass,
  Zap,
  Layers,
  Sliders,
  FileText,
  CalendarCheck,
  Laptop,
  MessageSquare,
  ShieldCheck,
  BarChart3,
  Target,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface SupportFromDayOneProps {
  className?: string;
}

interface SearchablePage {
  id: string;
  title: string;
  titleDe: string;
  category: string;
  categoryDe: string;
  description: string;
  descriptionDe: string;
  path: string;
  icon: React.ElementType;
  keywords: string[];
}

const SEARCHABLE_PAGES: SearchablePage[] = [
  {
    id: "hr-it-selection",
    title: "HR IT Selection & Optimization",
    titleDe: "HR-IT-Auswahl & Optimierung",
    category: "Services",
    categoryDe: "Leistungen",
    description: "Vendor-neutral software evaluation across 20+ European platforms.",
    descriptionDe: "Unabhängige Software-Auswahl aus über 20 europäischen HR-Systemen.",
    path: "/services/hr-it-selection",
    icon: Cpu,
    keywords: ["hr", "it", "selection", "software", "tech", "personio", "hibob", "tools", "systems", "procurement", "evaluation"],
  },
  {
    id: "outsourced-hr",
    title: "Outsourced HR Management",
    titleDe: "Ausgelagertes HR-Management",
    category: "Services",
    categoryDe: "Leistungen",
    description: "Turnkey People Operations handling contracts, preliminary payroll, and compliance.",
    descriptionDe: "Ihr ausgelagertes HR-Team für Verträge, Lohnvorbereitung und Arbeitsrecht.",
    path: "/services/outsourced-hr",
    icon: Users,
    keywords: ["hr", "management", "outsourced", "payroll", "contracts", "people ops", "operations", "compliance", "admin"],
  },
  {
    id: "interim-management",
    title: "Interim HR Management",
    titleDe: "Interim-HR-Management",
    category: "Services",
    categoryDe: "Leistungen",
    description: "Experienced interim HR managers & leaders placed within 48 hours.",
    descriptionDe: "Erfahrene Interim-HR-Manager und Führungskräfte innerhalb von 48 Stunden.",
    path: "/services/interim-management",
    icon: UserCheck,
    keywords: ["management", "interim", "leadership", "interim manager", "hr", "director", "head of people", "people lead", "recruiter", "hrbp"],
  },
  {
    id: "hr-advisory",
    title: "Strategic HR Advisory & Org Design",
    titleDe: "Strategische HR-Beratung & Org-Design",
    category: "Services",
    categoryDe: "Leistungen",
    description: "Compensation leveling, Works Council negotiation, and change management.",
    descriptionDe: "Vergütungsbänder, Betriebsrat-Verhandlungen und Organisationsentwicklung.",
    path: "/services/hr-advisory",
    icon: Compass,
    keywords: ["hr", "management", "advisory", "consulting", "org design", "compensation", "leveling", "salary bands", "betriebsrat", "works council"],
  },
  {
    id: "implementation-optimisation",
    title: "Implementation & Optimization",
    titleDe: "Implementierung & Optimierung",
    category: "Services",
    categoryDe: "Leistungen",
    description: "Data migration, workflow automation, and custom tool rollout.",
    descriptionDe: "Datenmigration, Prozess-Automatisierung und reibungslose System-Einführung.",
    path: "/services/implementation-optimisation",
    icon: Zap,
    keywords: ["implementation", "optimization", "rollout", "migration", "hris", "setup", "datev", "processes"],
  },
  {
    id: "hr-it-integrations",
    title: "HR IT Integrations & APIs",
    titleDe: "HR-IT-Integrationen & Schnittstellen",
    category: "Services",
    categoryDe: "Leistungen",
    description: "Connect your HRIS, DATEV, Slack, ATS, and ERP into one automated pipeline.",
    descriptionDe: "Verbinden Sie HRIS, DATEV, Slack und ERP zu einem nahtlosen Datenfluss.",
    path: "/services/hr-it-integrations",
    icon: Layers,
    keywords: ["integrations", "it", "datev", "slack", "api", "pipeline", "automated", "sync", "payroll"],
  },
  {
    id: "tool-finder",
    title: "HR Tool Finder Benchmark",
    titleDe: "HR Tool Finder Vergleich",
    category: "Tools",
    categoryDe: "Tools",
    description: "9-question vendor-neutral assessment benchmarked against 20+ platforms.",
    descriptionDe: "9-Fragen-Quick-Check für die perfekte HR-Software nach Ihren Kriterien.",
    path: "/tool-finder",
    icon: Sliders,
    keywords: ["tool finder", "software", "benchmark", "hr", "quiz", "recommendation", "personio", "hibob", "workday"],
  },
  {
    id: "resources",
    title: "HR Templates & Checklists Hub",
    titleDe: "HR-Vorlagen & Checklisten",
    category: "Resources",
    categoryDe: "Ressourcen",
    description: "On-demand RFP scoring models, DATEV cutover checklists, and compliance kits.",
    descriptionDe: "Individuelle RFP-Vorlagen, DATEV-Checklisten und HR-Musterdokumente.",
    path: "/resources",
    icon: FileText,
    keywords: ["resources", "templates", "checklists", "rfp", "datev", "compliance", "downloads", "hr"],
  },
  {
    id: "case-studies",
    title: "Case Studies & Client Results",
    titleDe: "Fallstudien & Kundenerfolge",
    category: "Proof",
    categoryDe: "Erfolge",
    description: "Real European scaleup transformations: Westbridge, Harrer, and SoftwareOne.",
    descriptionDe: "Echte Erfolgsgeschichten europäischer Unternehmen mit Scaliify.",
    path: "/case-studies",
    icon: Sparkles,
    keywords: ["case studies", "clients", "results", "westbridge", "softwareone", "harrer", "proof", "outcomes"],
  },
  {
    id: "about",
    title: "About Scaliify & Founders",
    titleDe: "Über Scaliify & die Gründer",
    category: "Company",
    categoryDe: "Unternehmen",
    description: "Meet founders Sarah Mittiga & Ben Böhmer and our network of 150+ specialists.",
    descriptionDe: "Lernen Sie Sarah Mittiga, Ben Böhmer und unser Netzwerk von über 150 Experten kennen.",
    path: "/about",
    icon: Users,
    keywords: ["about", "company", "team", "sarah mittiga", "ben böhmer", "founders", "specialists"],
  },
  {
    id: "lets-talk",
    title: "Request a Consultation",
    titleDe: "Kostenlose Beratung anfragen",
    category: "Contact",
    categoryDe: "Kontakt",
    description: "Speak directly with an independent HR technology and operations specialist.",
    descriptionDe: "Sprechen Sie direkt mit unseren unabhängigen HR- und Technologie-Experten.",
    path: "/lets-talk",
    icon: ArrowRight,
    keywords: ["contact", "lets talk", "consultation", "call", "book", "meeting", "advisory", "demo"],
  },
];

const TOPIC_PILLS = [
  { id: "p1", title: "Advance vacation allowance", titleDe: "Urlaubsanspruch berechnen", icon: CalendarCheck, query: "vacation" },
  { id: "p2", title: "Reporting work from home", titleDe: "Homeoffice & Zeiterfassung", icon: Laptop, query: "work from home" },
  { id: "p3", title: "Request absence from Slack", titleDe: "Abwesenheiten via Slack anfragen", icon: MessageSquare, query: "slack" },
  { id: "p4", title: "Overtime & BAG compliance", titleDe: "Überstunden & BAG-Compliance", icon: ShieldCheck, query: "compliance" },
  { id: "p5", title: "Timesheets for payroll sync", titleDe: "Stundenzettel für Lohnexport", icon: BarChart3, query: "payroll" },
  { id: "p6", title: "360° review cycle templates", titleDe: "360°-Feedback Vorlagen", icon: Target, query: "review" },
  { id: "p7", title: "DATEV LODAS cutover checklist", titleDe: "DATEV LODAS Checkliste", icon: FileText, query: "datev" },
  { id: "p8", title: "Personio + contract automation", titleDe: "Personio + Vertragsautomatisierung", icon: Cpu, query: "personio" },
];

export function SupportFromDayOne({ className = "" }: SupportFromDayOneProps) {
  const t = useTranslations("supportFromDayOne");
  const locale = useLocale();
  const isDe = locale === "de";
  const router = useRouter();

  // Search in Card 1
  const [searchQuery, setSearchQuery] = useState("");

  // Lead capture modal in Card 2
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [communityEmail, setCommunityEmail] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [communityCompany, setCommunityCompany] = useState("");
  const [communitySubmitting, setCommunitySubmitting] = useState(false);
  const [communitySubmitted, setCommunitySubmitted] = useState(false);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchedPages = useMemo(() => {
    if (!normalizedQuery) return [];
    return SEARCHABLE_PAGES.filter((page) => {
      const titleMatch = page.title.toLowerCase().includes(normalizedQuery);
      const titleDeMatch = page.titleDe.toLowerCase().includes(normalizedQuery);
      const descMatch = page.description.toLowerCase().includes(normalizedQuery);
      const descDeMatch = page.descriptionDe.toLowerCase().includes(normalizedQuery);
      const catMatch = page.category.toLowerCase().includes(normalizedQuery) || page.categoryDe.toLowerCase().includes(normalizedQuery);
      const keywordMatch = page.keywords.some((kw) => kw.includes(normalizedQuery) || normalizedQuery.includes(kw));

      return titleMatch || titleDeMatch || descMatch || descDeMatch || catMatch || keywordMatch;
    });
  }, [normalizedQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matchedPages.length > 0) {
      router.push(matchedPages[0].path);
    } else if (searchQuery.trim()) {
      router.push(`/resources?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/resources");
    }
  };

  const handleCommunitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!communityEmail) return;
    setCommunitySubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: communityName.split(" ")[0] || communityName,
          lastName: communityName.split(" ").slice(1).join(" ") || "Lead",
          email: communityEmail,
          company: communityCompany || "Scaliify HR Community",
          source: "home-hr-community-lead",
          message: "Requested invitation to Scaliify Vibrant HR Community / Slack Circle",
        }),
      }).catch(() => null);
    } finally {
      setCommunitySubmitting(false);
      setCommunitySubmitted(true);
    }
  };

  return (
    <section className={`w-full bg-white pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 border-t border-gray-100 ${className}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center pt-16 sm:pt-20 mb-10 sm:mb-14 flex flex-col items-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-3">
            {t("kicker")}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 mb-4">
            {t("heading")}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
            {t("subtitle")}
          </p>
          <Link
            href="/lets-talk"
            className="inline-flex items-center justify-center bg-black text-white text-xs sm:text-sm font-bold px-6 sm:px-7 py-3 rounded-full hover:bg-gray-900 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>{t("bookConsultation")}</span>
          </Link>
        </div>

        {/* ── Balanced 2-Card Showcase (Help at your fingertips & Vibrant Community) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch mb-12">
          
          {/* ── CARD 1: Help at your fingertips (Searchable Hub) ─────── */}
          <div className="bg-[#eaf7f2] rounded-3xl p-6 sm:p-9 flex flex-col justify-between overflow-hidden relative border border-[#76D8C8]/40 shadow-sm min-h-[420px]">
            <div className="relative z-10">
              <span className="bg-white/90 text-[#05434B] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-[#76D8C8]/50 inline-block mb-3">
                {t("card1Kicker")}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 leading-snug">
                {t("card1Heading")}
              </h3>
            </div>

            {/* Interactive Search + Topic Cloud */}
            <div className="relative w-full my-6 flex flex-col items-center justify-center">
              
              {/* Central Interactive Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="w-full max-w-md bg-white rounded-2xl p-1.5 pl-4 shadow-[0_8px_30px_rgba(5,67,75,0.1)] border border-[#76D8C8]/50 flex items-center gap-2.5 z-20 mb-4"
              >
                <Search className="w-4 h-4 text-[#00D2C4] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isDe ? "Themen oder Seiten suchen (z. B. HR, Management, DATEV)..." : "Search topics or pages (e.g. HR, management, DATEV)..."}
                  className="w-full bg-transparent text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[#00D2C4] hover:bg-[#76D8C8] text-[#05434B] font-extrabold text-xs px-3.5 py-2 rounded-xl shrink-0 transition-colors cursor-pointer active:scale-95"
                >
                  {isDe ? "Finden" : "Search"}
                </button>
              </form>

              {/* Dynamic Content: Live Filtered Pages List OR Topic Pills */}
              {searchQuery.trim() ? (
                <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl border border-[#76D8C8]/60 shadow-lg p-2 sm:p-2.5 max-h-[220px] overflow-y-auto space-y-1 z-30 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    <span>{isDe ? "Passende Seiten" : "Matching Pages & Services"}</span>
                    <span>{matchedPages.length} {isDe ? "Treffer" : "results"}</span>
                  </div>

                  {matchedPages.length > 0 ? (
                    matchedPages.map((page) => {
                      const PageIcon = page.icon;
                      return (
                        <Link
                          key={page.id}
                          href={page.path}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#eaf7f2] transition-colors group border border-transparent hover:border-[#76D8C8]/40"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#5BC7BC]/20 text-[#05434B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                            <PageIcon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-gray-900 group-hover:text-[#05434B] transition-colors truncate">
                                {isDe ? page.titleDe : page.title}
                              </span>
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 shrink-0">
                                {isDe ? page.categoryDe : page.category}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-500 leading-snug line-clamp-1 mt-0.5">
                              {isDe ? page.descriptionDe : page.description}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#05434B] group-hover:translate-x-0.5 transition-all shrink-0 self-center" />
                        </Link>
                      );
                    })
                  ) : (
                    <div className="py-4 text-center text-xs text-gray-500">
                      <p className="font-bold text-gray-700 mb-0.5">
                        {isDe ? "Keine direkte Seite gefunden" : "No exact matching page found"}
                      </p>
                      <p className="text-[10px]">
                        {isDe ? "Versuchen Sie „HR“, „Management“, „DATEV“ oder „Software“." : "Try searching for \"HR\", \"management\", \"DATEV\", or \"software\"."}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* Responsive Filterable Pill Cloud with Professional Vector Icons */
                <div className="w-full flex flex-wrap items-center justify-center gap-2">
                  {TOPIC_PILLS.map((pill) => {
                    const PillIcon = pill.icon;
                    return (
                      <button
                        key={pill.id}
                        type="button"
                        onClick={() => setSearchQuery(isDe ? pill.titleDe : pill.title)}
                        className="bg-white/85 hover:bg-white text-gray-800 border border-[#76D8C8]/40 hover:border-[#00D2C4] px-3 py-1.5 rounded-full text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 group"
                      >
                        <PillIcon className="w-3.5 h-3.5 text-[#05434B] group-hover:text-[#00D2C4] transition-colors shrink-0" />
                        <span>{isDe ? pill.titleDe : pill.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Link to Guides / Blog */}
            <div className="relative z-10 pt-2 border-t border-[#76D8C8]/30 flex items-center justify-between">
              <Link
                href="/guides"
                className="text-xs sm:text-sm font-extrabold text-[#05434B] hover:text-[#4FB8AA] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t("browseKnowledgeBase")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[11px] text-gray-500 font-medium">
                {isDe ? "+500 Playbooks & Vorlagen" : "+500 Playbooks & Templates"}
              </span>
            </div>
          </div>

          {/* ── CARD 2: Join our Vibrant HR Community ───────────────── */}
          <div className="bg-[#eaf7f2] rounded-3xl p-6 sm:p-9 flex flex-col justify-between overflow-hidden relative border border-[#76D8C8]/40 shadow-sm min-h-[420px]">
            <div className="relative z-10">
              <span className="bg-white/90 text-[#05434B] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-[#76D8C8]/50 inline-block mb-3">
                {t("card3Kicker")}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 leading-snug">
                {t("card3Heading")}
              </h3>
            </div>

            {/* Graphic Mockup: Question & Verified Answer Thread */}
            <div className="relative w-full my-5 z-10">
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white/80 w-full space-y-3">
                
                {/* Badge Header */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>{t("answered")}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400">
                    Live People Circle
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-gray-950 leading-snug">
                  {t("forumTitle")}
                </h4>

                {/* Question Bubble */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 text-[11px] text-gray-700 leading-relaxed flex items-start gap-2.5">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 mt-0.5 border border-gray-200">
                    <Image src="/avatars/silvia.jpg" alt="Silvia" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-[10.5px] mb-0.5">
                      {t("forumUser")} 👋
                    </p>
                    <p className="text-gray-600 line-clamp-2">{t("forumQuestion")}</p>
                  </div>
                </div>

                {/* Verified Answer Bubble */}
                <div className="bg-[#eaf7f2] border border-[#76D8C8]/40 rounded-xl p-2.5 text-[11px] text-[#05434B] leading-relaxed flex items-start gap-2.5">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 mt-0.5 border border-[#4FB8AA]">
                    <Image src="/avatars/catherine.jpg" alt="Catherine" fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-bold text-gray-900 text-[10.5px]">{t("forumReplyUser")}</span>
                      <span className="text-[9px] font-bold bg-emerald-100 text-emerald-900 px-1.5 py-0.2 rounded">
                        {t("verified")}
                      </span>
                    </div>
                    <p className="text-gray-700 text-[10.5px] line-clamp-2">
                      {t("forumReply")}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Button Opening Community Invite Lead Capture */}
            <div className="relative z-10 pt-2 border-t border-[#76D8C8]/30 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsCommunityModalOpen(true)}
                className="text-xs sm:text-sm font-extrabold text-[#05434B] hover:text-[#4FB8AA] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t("joinCommunity")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Trust Line */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4 select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white shadow-2xs">
                <Image src="/avatars/catherine.jpg" alt="Catherine" fill className="object-cover" />
              </div>
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white shadow-2xs">
                <Image src="/avatars/silvia.jpg" alt="Silvia" fill className="object-cover" />
              </div>
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white shadow-2xs">
                <Image src="/avatars/felix.jpg" alt="Felix" fill className="object-cover" />
              </div>
            </div>
            <span className="text-xs font-semibold text-gray-700">
              {t("dedicatedTeam")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-gray-700">
              {t("prioritySupport")}
            </span>
          </div>
        </div>

      </div>

      {/* ── Community Invite / Lead Capture Modal ─────────────────── */}
      {isCommunityModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsCommunityModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative text-gray-900"
          >
            <button
              type="button"
              onClick={() => setIsCommunityModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {communitySubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h4 className="text-xl font-bold text-gray-950">
                  {isDe ? "Einladung verschickt!" : "Invitation on its way!"}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 max-w-xs mx-auto leading-relaxed">
                  {isDe
                    ? "Wir haben Ihre Einladung zum Scaliify People Leaders Circle vorbereitet. Prüfen Sie in Kürze Ihr Postfach."
                    : "We've registered your request to join the Scaliify People Leaders Circle. Check your inbox shortly for access details."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCommunityModalOpen(false);
                    setCommunitySubmitted(false);
                  }}
                  className="mt-4 bg-[#00D2C4] hover:bg-[#76D8C8] text-[#05434B] font-extrabold text-xs px-6 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  {isDe ? "Schließen" : "Done"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleCommunitySubmit} className="space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#05434B] bg-[#76D8C8]/30 px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-[#00D2C4]" />
                  <span>Scaliify People Leaders Circle</span>
                </div>

                <div>
                  <h4 className="text-xl font-extrabold text-gray-950">
                    {isDe ? "Werden Sie Teil unserer HR-Community" : "Join our Vibrant HR Community"}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {isDe
                      ? "Verbinden Sie sich mit People Leadern, tauschen Sie Best Practices aus und nehmen Sie an exklusiven Runden teil."
                      : "Connect with People & HR executives, benchmark your software stack, and get peer-verified guidance."}
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isDe ? "Ihr Name *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={communityName}
                      onChange={(e) => setCommunityName(e.target.value)}
                      placeholder={isDe ? "Vor- und Nachname" : "Jane Doe"}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00D2C4]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isDe ? "Geschäftliche E-Mail *" : "Work Email *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={communityEmail}
                      onChange={(e) => setCommunityEmail(e.target.value)}
                      placeholder={isDe ? "name@unternehmen.de" : "name@company.com"}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00D2C4]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isDe ? "Unternehmen" : "Company Name"}
                    </label>
                    <input
                      type="text"
                      value={communityCompany}
                      onChange={(e) => setCommunityCompany(e.target.value)}
                      placeholder={isDe ? "Ihr Unternehmen" : "Your Organization"}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00D2C4]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={communitySubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#00D2C4] hover:bg-[#76D8C8] text-[#05434B] font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {communitySubmitting
                      ? isDe ? "Wird angemeldet..." : "Requesting Invite..."
                      : isDe ? "Kostenlose Einladung anfordern" : "Request Community Invite"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
