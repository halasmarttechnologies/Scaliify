"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Download, CheckCircle2, Search } from "lucide-react";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";

interface ResourceItem {
  id: string;
  category: string;
  categoryDe: string;
  title: string;
  titleDe: string;
  desc: string;
  descDe: string;
  format: string;
  formatDe: string;
  badge: string;
  badgeDe: string;
  features: string[];
  featuresDe: string[];
}

const resourcesList: ResourceItem[] = [
  {
    id: "hr-rfp-template",
    category: "RFP Templates",
    categoryDe: "RFP-Vorlagen",
    title: "Vendor-Neutral HR Software RFP Master Template",
    titleDe: "Herstellerneutrale HR-Software RFP-Vorlage",
    desc: "A comprehensive 150-point evaluation questionnaire ready to send to vendors (Personio, HiBob, Deel, Factorial, Workday, etc.).",
    descDe: "Ein umfassender 150-Punkte-Evaluierungsfragebogen für Anbieter wie Personio, HiBob, Deel, Factorial, Workday etc.",
    format: "Excel / Google Sheets",
    formatDe: "Excel / Google Sheets",
    badge: "Template",
    badgeDe: "Vorlage",
    features: [
      "Categorized functional criteria (Core, ATS, Payroll, Time)",
      "Weighted scoring model with automatic vendor rank calculation",
      "Standard pricing comparison and hidden fee check matrix",
    ],
    featuresDe: [
      "Kategorisierte Funktionskriterien (Core, ATS, Payroll, Zeiterfassung)",
      "Gewichtetes Bewertungsmodell mit automatischer Rangberechnung",
      "Standardisierter Preisvergleich und Matrix für versteckte Kosten",
    ],
  },
  {
    id: "hr-tech-roi-calculator",
    category: "Calculators",
    categoryDe: "Rechner",
    title: "HR Tech Stack ROI & Time-Savings Calculator",
    titleDe: "HR-Tech-Stack ROI- & Zeitersparnis-Rechner",
    desc: "Quantify administrative hour savings, error reduction in payroll, and recruiter velocity before committing to software budgets.",
    descDe: "Quantifizieren Sie administrative Zeitersparnis, Fehlerreduktion in der Entgeltabrechnung und Recruiting-Geschwindigkeit vor Software-Investitionen.",
    format: "Interactive Sheet",
    formatDe: "Interaktives Sheet",
    badge: "Calculator",
    badgeDe: "Rechner",
    features: [
      "Cost-per-employee per-month (PEPM) baseline comparison",
      "Internal admin hours reduced per 50 headcount",
      "Executive business case summary sheet",
    ],
    featuresDe: [
      "Kosten-pro-Mitarbeiter-pro-Monat (PEPM) Benchmark",
      "Reduzierte interne Admin-Stunden pro 50 Mitarbeitende",
      "Executive Business-Case Übersichtsblatt",
    ],
  },
  {
    id: "german-contract-kit",
    category: "Legal Kits",
    categoryDe: "Rechts-Kits",
    title: "Employment Contract & Addendum Compliance Kit",
    titleDe: "Arbeitsvertrags- & Zusatzvereinbarungs-Compliance-Kit",
    desc: "Standardized contract templates compliant with current German labor regulations and EU digital workplace directives.",
    descDe: "Standardisierte Vertragsvorlagen, konform mit dem aktuellen deutschen Arbeitsrecht und EU-Richtlinien für den digitalen Arbeitsplatz.",
    format: "Word / PDF Kit",
    formatDe: "Word / PDF Kit",
    badge: "Legal Kit",
    badgeDe: "Rechts-Kit",
    features: [
      "Full-time and part-time standard employment contracts",
      "Remote work & home office agreement addendum",
      "Confidentiality (NDA) and IP assignment clauses",
    ],
    featuresDe: [
      "Vollzeit- und Teilzeit-Standardarbeitsverträge",
      "Zusatzvereinbarung für Remote Work & Homeoffice",
      "Vertraulichkeits- (NDA) und IP-Übertragungsklauseln",
    ],
  },
  {
    id: "360-review-framework",
    category: "Decision Frameworks",
    categoryDe: "Entscheidungs-Frameworks",
    title: "360° Review & Performance Cycle Blueprint",
    titleDe: "360°-Feedback & Performance-Zyklus Blueprint",
    desc: "Step-by-step framework to launch structured performance evaluations without administrative chaos or employee survey fatigue.",
    descDe: "Schritt-für-Schritt-Leitfaden für strukturierte Leistungsbeurteilungen ohne administrativen Mehraufwand oder Umfragemüdigkeit.",
    format: "PDF & Template",
    formatDe: "PDF & Vorlage",
    badge: "Framework",
    badgeDe: "Framework",
    features: [
      "Peer and upward review question library",
      "Rating scale calibration guide for managers",
      "Continuous 1:1 check-in conversation roadmap",
    ],
    featuresDe: [
      "Fragenkatalog für Peer- und Aufwärts-Feedback",
      "Kalibrierungsleitfaden für Führungskräfte",
      "Fahrplan für kontinuierliche 1:1-Gespräche",
    ],
  },
  {
    id: "datev-hr-integration-blueprint",
    category: "RFP Templates",
    categoryDe: "RFP-Vorlagen",
    title: "DATEV & HRIS Technical Architecture Blueprint",
    titleDe: "DATEV & HRIS Technische Architektur-Blueprint",
    desc: "A visual data mapping diagram detailing how master employee records, monthly variable bonuses, and absences flow directly into DATEV.",
    descDe: "Ein visuelles Datenmapping, das zeigt, wie Personalstammdaten, variable Boni und Fehlzeiten direkt in DATEV fließen.",
    format: "Architecture PDF",
    formatDe: "Architektur-PDF",
    badge: "Blueprint",
    badgeDe: "Blueprint",
    features: [
      "ASCII / XML wage data export schema",
      "Standard API webhook trigger architecture",
      "Steuerberater sign-off checklist",
    ],
    featuresDe: [
      "ASCII / XML Lohndaten-Exportschema",
      "Standard API-Webhook-Triggerarchitektur",
      "Checkliste für die Steuerberater-Freigabe",
    ],
  },
  {
    id: "people-ops-handbook-template",
    category: "Legal Kits",
    categoryDe: "Rechts-Kits",
    title: "Modern European Employee Handbook Template",
    titleDe: "Modernes europäisches Mitarbeiterhandbuch-Template",
    desc: "An engaging, culturally forward employee handbook covering company values, remote working policies, vacation rules, and benefits.",
    descDe: "Ein ansprechendes Mitarbeiterhandbuch für moderne Unternehmenskultur: Werte, Remote-Regelungen, Urlaubsrichtlinien und Benefits.",
    format: "Notion / Doc Template",
    formatDe: "Notion / Doc Vorlage",
    badge: "Template",
    badgeDe: "Vorlage",
    features: [
      "Complete company culture & operating manual template",
      "Parental leave, absence, and wellness policy guidelines",
      "Customizable onboarding welcome section",
    ],
    featuresDe: [
      "Komplette Vorlage für Unternehmenskultur & Betriebsleitfaden",
      "Richtlinien für Elternzeit, Abwesenheiten und Mitarbeiterförderung",
      "Anpassbarer Onboarding-Willkommensbereich",
    ],
  },
];

const categories = [
  { key: "all", en: "All", de: "Alle" },
  { key: "RFP Templates", en: "RFP Templates", de: "RFP-Vorlagen" },
  { key: "Calculators", en: "Calculators", de: "Rechner" },
  { key: "Legal Kits", en: "Legal Kits", de: "Rechts-Kits" },
  { key: "Decision Frameworks", en: "Decision Frameworks", de: "Entscheidungs-Frameworks" },
];

export function ResourcesClient() {
  const locale = useLocale();
  const isDe = locale === "de";
  const [selectedCategoryKey, setSelectedCategoryKey] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resourcesList.filter((item) => {
    const matchesCategory = selectedCategoryKey === "all" || item.category === selectedCategoryKey;
    const title = isDe ? item.titleDe : item.title;
    const desc = isDe ? item.descDe : item.desc;
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="w-full bg-white text-gray-900 font-sans min-h-screen">
      {/* Header */}
      <section className="w-full pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] block mb-3">
            {isDe ? "RFP-VORLAGEN & ENTSCHEIDUNGS-FRAMEWORKS" : "RFP TEMPLATES & DECISION FRAMEWORKS"}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 leading-[1.12] mb-4">
            {isDe ? "HR-Ressourcen" : "HR Resources"}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isDe
              ? "Kostenlose Vorlagen, Software-Bewertungsmodelle und rechtssichere Kits – kuratiert von unseren People-Operations-Expert:innen."
              : "Free operational templates, vendor selection scoring models, and legal kits curated by our People operations experts."}
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategoryKey(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategoryKey === cat.key
                    ? "bg-[#05434B] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {isDe ? cat.de : cat.en}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={isDe ? "Ressourcen durchsuchen..." : "Search resources..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:bg-white focus:border-black transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 hover:border-gray-400 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#eaf7f5] text-[#05434B] px-2.5 py-1 rounded-full border border-[#76D8C8]/40">
                      {isDe ? item.badgeDe : item.badge}
                    </span>
                    <span className="text-[11px] font-medium text-gray-400">
                      {isDe ? item.formatDe : item.format}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-gray-950 leading-snug mb-2.5">
                    {isDe ? item.titleDe : item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed font-medium mb-5">
                    {isDe ? item.descDe : item.desc}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-gray-100 mb-6">
                    <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider">
                      Highlights:
                    </p>
                    {(isDe ? item.featuresDe : item.features).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/lets-talk"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isDe ? "Ressourcen-Kit anfordern" : "Download Resource Kit"}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Lead Section */}
      <BookingLeadSection
        badgeTitle={isDe ? "INDIVIDUELLE ASSETS" : "BESPOKE ASSETS"}
        title={isDe ? "Suchen Sie eine bestimmte Vorlage oder ein Bewertungsmodell?" : "Looking for a specific template or evaluation model?"}
        subtitle={
          isDe
            ? "Unser Beratungsteam stellt Ihnen maßgeschneiderte RFP-Frameworks und Bewertungs-Sheets für Ihren Tech-Stack zur Verfügung."
            : "Our consulting team can share bespoke RFP frameworks and evaluation spreadsheets for your specific tech stack."
        }
        source="resources_page"
      />

      {/* Blog Section */}
      <BlogSection />
    </main>
  );
}
