"use client";

import { useState, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  FileText,
  CheckCircle2,
  Search,
  ArrowRight,
  Send,
  Loader2,
  Check,
  Sparkles,
  Inbox,
  Filter,
} from "lucide-react";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";
import { submitLead } from "@/lib/api";

export interface TemplateTopic {
  id: string;
  category: "rfp" | "payroll" | "legal" | "performance" | "org";
  titleEn: string;
  titleDe: string;
  descEn: string;
  descDe: string;
  formatEn: string;
  formatDe: string;
  badgeEn: string;
  badgeDe: string;
  featuresEn: string[];
  featuresDe: string[];
}

export const TEMPLATE_TOPICS: TemplateTopic[] = [
  {
    id: "hr-rfp-master",
    category: "rfp",
    titleEn: "Vendor-Neutral HR Software RFP Master Template",
    titleDe: "Herstellerneutrale HR-Software RFP-Vorlage",
    descEn: "A comprehensive 150-point evaluation questionnaire ready to send to vendors (Personio, HiBob, Deel, Factorial, Workday, etc.).",
    descDe: "Ein umfassender 150-Punkte-Evaluierungsfragebogen für Anbieter wie Personio, HiBob, Deel, Factorial, Workday etc.",
    formatEn: "Excel / Google Sheets",
    formatDe: "Excel / Google Sheets",
    badgeEn: "RFP Template",
    badgeDe: "RFP-Vorlage",
    featuresEn: [
      "Categorized functional criteria (Core HRIS, ATS, Payroll, Time & Attendance)",
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
    id: "datev-cutover-checklist",
    category: "payroll",
    titleEn: "DATEV Cutover & Payroll Integration Checklist",
    titleDe: "DATEV Cutover- & Lohnabrechnungs-Checkliste",
    descEn: "Step-by-step checklist to connect modern HRIS platforms to DATEV LODAS and Lohn und Gehalt without monthly payroll discrepancies.",
    descDe: "Schritt-für-Schritt-Checkliste zur Anbindung moderner HRIS-Systeme an DATEV LODAS und Lohn und Gehalt ohne Abrechnungsfehler.",
    formatEn: "Interactive Checklist / PDF",
    formatDe: "Interaktive Checkliste / PDF",
    badgeEn: "Payroll Checklist",
    badgeDe: "Lohn-Checkliste",
    featuresEn: [
      "Monthly wage type (Lohnarten) mapping schema",
      "Master employee data (Stammdaten) sync pre-flight validation",
      "Steuerberater sign-off milestone calendar",
    ],
    featuresDe: [
      "Lohnarten-Zuordnungsschema für variable Bezüge",
      "Stammdaten-Validierungscheckliste vor dem Go-Live",
      "Abstimmungs- und Freigabekalender für die Steuerberatung",
    ],
  },
  {
    id: "hr-tech-roi-calc",
    category: "rfp",
    titleEn: "HR Tech Stack ROI & Time-Savings Calculator",
    titleDe: "HR-Tech-Stack ROI- & Zeitersparnis-Rechner",
    descEn: "Quantify administrative hour savings, payroll error reduction, and recruiter velocity before committing to software budgets.",
    descDe: "Quantifizieren Sie administrative Zeitersparnis, Fehlerreduktion und Recruiting-Geschwindigkeit vor Software-Investitionen.",
    formatEn: "Interactive Sheet",
    formatDe: "Interaktives Sheet",
    badgeEn: "ROI Calculator",
    badgeDe: "ROI-Rechner",
    featuresEn: [
      "Cost-per-employee per-month (PEPM) baseline comparison",
      "Internal admin hours saved per 50 headcount",
      "Executive business case summary sheet",
    ],
    featuresDe: [
      "Kosten-pro-Mitarbeiter-pro-Monat (PEPM) Benchmark",
      "Reduzierte interne Admin-Stunden pro 50 Mitarbeitende",
      "Executive Business-Case Übersichtsblatt für CFOs",
    ],
  },
  {
    id: "german-contract-kit",
    category: "legal",
    titleEn: "Employment Contract & Compliance Kit (Nachweisgesetz)",
    titleDe: "Arbeitsvertrags- & Compliance-Kit (Nachweisgesetz)",
    descEn: "Standardized contract templates and addenda compliant with current German labor regulations and EU digital workplace directives.",
    descDe: "Standardisierte Vertragsvorlagen und Zusatzvereinbarungen, konform mit deutschem Arbeitsrecht und EU-Vorgaben.",
    formatEn: "Word / PDF Kit",
    formatDe: "Word / PDF Kit",
    badgeEn: "Legal Kit",
    badgeDe: "Rechts-Kit",
    featuresEn: [
      "Full-time, part-time & working student standard employment contracts",
      "Remote work & home office agreement addendum",
      "Confidentiality (NDA) and IP assignment clauses",
    ],
    featuresDe: [
      "Vollzeit-, Teilzeit- und Werkstudenten-Standardarbeitsverträge",
      "Zusatzvereinbarung für Remote Work & Homeoffice",
      "Vertraulichkeits- (NDA) und IP-Übertragungsklauseln",
    ],
  },
  {
    id: "360-review-framework",
    category: "performance",
    titleEn: "360° Review & Performance Cycle Blueprint",
    titleDe: "360°-Feedback & Performance-Zyklus Blueprint",
    descEn: "Structured framework to launch fair performance evaluations without administrative chaos or employee survey fatigue.",
    descDe: "Strukturierter Leitfaden für faire Leistungsbeurteilungen ohne administrativen Mehraufwand oder Umfragemüdigkeit.",
    formatEn: "PDF & Template",
    formatDe: "PDF & Vorlage",
    badgeEn: "Performance",
    badgeDe: "Performance",
    featuresEn: [
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
    id: "works-council-codetermination",
    category: "legal",
    titleEn: "Works Council (Betriebsrat) IT Co-Determination Checklist",
    titleDe: "Betriebsrat IT-Mitbestimmungs-Checkliste (§87 BetrVG)",
    descEn: "Navigating §87(1) Nr. 6 BetrVG for new HR software rollouts. How to draft compliant works agreements swiftly.",
    descDe: "Rechtssichere Einführung neuer HR-Software nach §87 Abs. 1 Nr. 6 BetrVG inklusive Musterklauseln für Betriebsvereinbarungen.",
    formatEn: "Checklist / Guide",
    formatDe: "Checkliste / Leitfaden",
    badgeEn: "Works Council",
    badgeDe: "Betriebsrat",
    featuresEn: [
      "Software audit report format for Betriebsrat review",
      "Standard sample works agreement clause library",
      "Constructive social partnership rollout roadmap",
    ],
    featuresDe: [
      "Software-Audit-Bericht zur Vorlage beim Betriebsrat",
      "Musterklauseln für standardisierte Betriebsvereinbarungen",
      "Fahrplan für eine partnerschaftliche Verhandlung",
    ],
  },
  {
    id: "datev-hris-architecture",
    category: "payroll",
    titleEn: "DATEV & HRIS Technical Architecture Blueprint",
    titleDe: "DATEV & HRIS Technische Schnittstellen-Architektur",
    descEn: "A visual data mapping diagram detailing how master employee records, monthly variable bonuses, and absences flow directly into DATEV.",
    descDe: "Ein visuelles Datenmapping, das zeigt, wie Personalstammdaten, variable Boni und Fehlzeiten direkt in DATEV fließen.",
    formatEn: "Architecture PDF",
    formatDe: "Architektur-PDF",
    badgeEn: "Architecture",
    badgeDe: "Architektur",
    featuresEn: [
      "ASCII / XML wage data export schema",
      "Standard API webhook trigger architecture",
      "Data error troubleshooting flowchart",
    ],
    featuresDe: [
      "ASCII / XML Lohndaten-Exportschema",
      "Standard API-Webhook-Triggerarchitektur",
      "Ablaufdiagramm zur Behebung von Schnittstellenfehlern",
    ],
  },
  {
    id: "compensation-leveling",
    category: "org",
    titleEn: "European Compensation Leveling & Salary Bands",
    titleDe: "Vergütungsbänder & Career-Leveling-Framework",
    descEn: "Structured career tracks, benchmarking methodology, and transparent salary progression models for scaling European teams.",
    descDe: "Strukturierte Karrierepfade, Benchmarking-Methodik und transparente Gehaltsbänder für wachsende europäische Teams.",
    formatEn: "Framework & Sheets",
    formatDe: "Framework & Sheets",
    badgeEn: "Compensation",
    badgeDe: "Vergütung",
    featuresEn: [
      "Individual Contributor (IC) vs Management tracks",
      "Market benchmark percentiles (P25 / P50 / P75)",
      "EU Pay Transparency Directive readiness checklist",
    ],
    featuresDe: [
      "Fachlaufbahn (IC) vs. Führungslaufbahn-Stufen",
      "Markt-Benchmarking nach Perzentilen (P25 / P50 / P75)",
      "EU-Entgelttransparenz-Richtlinie Checkliste",
    ],
  },
  {
    id: "employee-handbook-template",
    category: "legal",
    titleEn: "Modern European Employee Handbook Template",
    titleDe: "Modernes europäisches Mitarbeiterhandbuch-Template",
    descEn: "An engaging, culturally forward employee handbook covering company values, remote working policies, vacation rules, and benefits.",
    descDe: "Ein ansprechendes Mitarbeiterhandbuch für moderne Unternehmenskultur: Werte, Remote-Regelungen, Urlaubsrichtlinien und Benefits.",
    formatEn: "Notion / Word Template",
    formatDe: "Notion / Word Vorlage",
    badgeEn: "Handbook",
    badgeDe: "Handbuch",
    featuresEn: [
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
  {
    id: "interim-hr-readiness",
    category: "org",
    titleEn: "Interim HR Management Readiness & Transition Toolkit",
    titleDe: "Interim-HR-Readiness & Übergabe-Toolkit",
    descEn: "How to onboard and extract maximum value from an interim HR Manager or Head of People during parental covers or rapid scaling.",
    descDe: "Leitfaden für die nahtlose Einarbeitung und maximale Wertschöpfung durch Interim-HR-Manager bei Elternzeitvertretung oder Wachstum.",
    formatEn: "Toolkit / PDF",
    formatDe: "Toolkit / PDF",
    badgeEn: "Interim Toolkit",
    badgeDe: "Interim-Toolkit",
    featuresEn: [
      "First 30-day high-impact deliverables template",
      "Leadership delegation matrix & decision log",
      "Permanent successor hiring & handover briefing framework",
    ],
    featuresDe: [
      "Erste 30-Tage-Prioritätenmatrix für Interim-Einsätze",
      "Delegationsmatrix für Geschäftsführung und People-Team",
      "Briefing-Leitfaden für die dauerhafte Nachbesetzung",
    ],
  },
];

const CATEGORIES = [
  { key: "all", en: "All Templates", de: "Alle Vorlagen" },
  { key: "rfp", en: "RFP & Selection", de: "RFP & Softwareauswahl" },
  { key: "payroll", en: "Payroll & DATEV", de: "Payroll & DATEV" },
  { key: "legal", en: "Compliance & Contracts", de: "Recht & Verträge" },
  { key: "performance", en: "Performance & Reviews", de: "Performance & Feedback" },
  { key: "org", en: "Org Design & Interim", de: "Org-Design & Interim" },
];

export function ResourcesClient() {
  const locale = useLocale();
  const isDe = locale === "de";
  const formRef = useRef<HTMLDivElement>(null);

  // Filter & Search
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Request Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "hr-rfp-master",
    "datev-cutover-checklist",
  ]);
  const [customRequest, setCustomRequest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Toggle topic in form
  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  // Card click: select topic and scroll to form
  const handleSelectFromCard = (id: string) => {
    if (!selectedTopics.includes(id)) {
      setSelectedTopics((prev) => [...prev, id]);
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!name.trim() || !email.trim() || !company.trim()) {
      setSubmitError(
        isDe
          ? "Bitte füllen Sie Name, geschäftliche E-Mail und Unternehmen aus."
          : "Please provide your name, work email, and company."
      );
      return;
    }

    if (selectedTopics.length === 0 && !customRequest.trim()) {
      setSubmitError(
        isDe
          ? "Bitte wählen Sie mindestens ein Thema aus oder beschreiben Sie Ihren Bedarf."
          : "Please select at least one template topic or enter your custom request."
      );
      return;
    }

    setIsSubmitting(true);

    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || name.trim() || "Lead";
    const lastName = nameParts.slice(1).join(" ") || firstName || "Lead";

    const requestedTitles = selectedTopics
      .map((id) => TEMPLATE_TOPICS.find((t) => t.id === id))
      .filter(Boolean)
      .map((t) => (isDe ? t?.titleDe : t?.titleEn))
      .join(", ");

    const comments = [
      `Requested Templates: ${requestedTitles || "None selected (custom only)"}`,
      customRequest.trim() ? `Custom Request: ${customRequest.trim()}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      const result = await submitLead({
        firstName,
        lastName,
        email: email.trim(),
        companyName: company.trim(),
        comments,
        source: "template_request",
      });

      if (result.success) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(
          result.error ||
            (isDe
              ? "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."
              : "Something went wrong. Please try again.")
        );
      }
    } catch {
      setSubmitError(
        isDe
          ? "Verbindungsfehler. Bitte versuchen Sie es erneut."
          : "Connection error. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTopics = TEMPLATE_TOPICS.filter((item) => {
    const matchesCat =
      selectedCategory === "all" || item.category === selectedCategory;
    const title = isDe ? item.titleDe : item.titleEn;
    const desc = isDe ? item.descDe : item.descEn;
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main className="w-full bg-white text-gray-900 font-sans min-h-screen">
      {/* ============================================================ */}
      {/* 1. HERO SECTION & ON-DEMAND CONCEPT                          */}
      {/* ============================================================ */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-[#81D8D0]/15 via-white to-white pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-[radial-gradient(circle,rgba(129,216,208,0.35)_0%,transparent_70%)] pointer-events-none blur-3xl -z-0" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-[#05434B] bg-[#eaf7f5] px-3.5 py-1.5 rounded-full border border-[#76D8C8]/50 inline-block mb-4 shadow-2xs">
            {isDe ? "VORLAGEN & CHECKLISTEN AUF ANFRAGE" : "ON-DEMAND TEMPLATES & CHECKLISTS"}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 leading-[1.12] mb-4">
            {isDe
              ? "Welche Vorlagen & Checklisten benötigen Sie?"
              : "Which templates & checklists do you need?"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            {isDe
              ? "Teilen Sie uns Ihren konkreten Bedarf mit – unser People-Operations-Team stellt Ihnen die passenden Vorlagen, RFP-Kriterien und Checklisten individuell zusammen und sendet sie Ihnen direkt zu."
              : "Tell us what you're looking for, and our People operations advisory team will prepare and send the right templates and frameworks straight to your inbox."}
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2. INTERACTIVE ON-DEMAND LEAD REQUEST FORM                   */}
        {/* ============================================================ */}
        <div ref={formRef} className="max-w-3xl mx-auto mt-2 relative z-10">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-[0_12px_40px_rgba(5,67,75,0.07)] transition-all">
            {submitSuccess ? (
              <div className="text-center py-8 sm:py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-2xs">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-950">
                  {isDe ? "Anfrage erfolgreich erhalten!" : "Request Received!"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
                  {isDe
                    ? `Vielen Dank! Wir haben Ihre Anfrage erhalten. Unser Beratungsteam bereitet die gewünschten Unterlagen vor und sendet sie Ihnen in Kürze an ${email} zu.`
                    : `Thank you! We've logged your request. Our advisory team is preparing your requested templates and will send them directly to ${email} shortly.`}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitSuccess(false);
                      setCustomRequest("");
                    }}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#05434B] hover:underline"
                  >
                    <span>{isDe ? "Weitere Vorlagen anfordern" : "Request additional templates"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <form id="resources-template-form" data-formid="Resources Template Request Form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-950 mb-1">
                    {isDe ? "Ihre Vorlagen-Anfrage zusammenstellen" : "Build Your Template Request"}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {isDe
                      ? "Wählen Sie die relevanten Themen aus und hinterlassen Sie Ihre Kontaktdaten für den Versand."
                      : "Select the topics you need and enter your details so we can send them to you."}
                  </p>
                </div>

                {/* 3 Core Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label htmlFor="resource_name" className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      {isDe ? "Name *" : "Name *"}
                    </label>
                    <input
                      id="resource_name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isDe ? "Vor- & Nachname" : "Full Name"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#05434B] focus:ring-1 focus:ring-[#05434B] bg-gray-50/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="resource_email" className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      {isDe ? "Geschäftliche E-Mail *" : "Work Email *"}
                    </label>
                    <input
                      id="resource_email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isDe ? "name@unternehmen.de" : "name@company.com"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#05434B] focus:ring-1 focus:ring-[#05434B] bg-gray-50/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="resource_company" className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      {isDe ? "Unternehmen *" : "Company *"}
                    </label>
                    <input
                      id="resource_company"
                      name="company"
                      type="text"
                      required
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={isDe ? "Firmenname GmbH" : "Company Inc."}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#05434B] focus:ring-1 focus:ring-[#05434B] bg-gray-50/50 transition-colors"
                    />
                    {/* Offscreen aliases for GHL built-in 'Business Name' and custom 'Company name' */}
                    <label htmlFor="resource_company_name" className="sr-only">Company name</label>
                    <input
                      id="resource_company_name"
                      name="company_name"
                      type="text"
                      tabIndex={-1}
                      aria-hidden="true"
                      readOnly
                      value={company}
                      style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                    />
                    <label htmlFor="resource_business_name" className="sr-only">Business Name</label>
                    <input
                      id="resource_business_name"
                      name="business_name"
                      type="text"
                      tabIndex={-1}
                      aria-hidden="true"
                      readOnly
                      value={company}
                      style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                    />
                  </div>
                </div>

                {/* Multi-Select Topic Pill Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                      {isDe ? "Gewünschte Themen (Mehrfachauswahl):" : "Requested Topics (Select all that apply):"}
                    </label>
                    <span className="text-[11px] font-semibold text-[#05434B]">
                      {selectedTopics.length}{" "}
                      {isDe ? "ausgewählt" : "selected"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {TEMPLATE_TOPICS.map((topic) => {
                      const isSelected = selectedTopics.includes(topic.id);
                      return (
                        <button
                          type="button"
                          key={topic.id}
                          onClick={() => toggleTopic(topic.id)}
                          className={`flex items-start gap-2.5 p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer select-none ${
                            isSelected
                              ? "bg-[#eaf7f5] border-[#76D8C8] text-gray-950 shadow-2xs font-semibold"
                              : "bg-gray-50/60 border-gray-200 text-gray-700 hover:bg-gray-100/70"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center border transition-colors ${
                              isSelected
                                ? "bg-[#05434B] border-[#05434B] text-white"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div className="truncate">
                            <span className="block truncate">
                              {isDe ? topic.titleDe : topic.titleEn}
                            </span>
                            <span className="text-[10px] text-gray-500 font-normal">
                              {isDe ? topic.badgeDe : topic.badgeEn}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Free-text field for custom request */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {isDe
                      ? "Individueller Bedarf / Spezifische Frage (optional):"
                      : "Custom Request / Specific Questions (optional):"}
                  </label>
                  <textarea
                    rows={3}
                    value={customRequest}
                    onChange={(e) => setCustomRequest(e.target.value)}
                    placeholder={
                      isDe
                        ? "Haben Sie spezifische Systeme (z. B. Personio, HiBob, DATEV), bestimmte Betriebsvereinbarungen oder zeitkritische Termine? Beschreiben Sie kurz Ihren Bedarf."
                        : "Looking for specific systems (e.g., Personio, HiBob, DATEV), specific policy clauses, or time-sensitive projects? Let us know what you need."
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#05434B] focus:ring-1 focus:ring-[#05434B] bg-gray-50/50 transition-colors"
                  />
                </div>

                {submitError && (
                  <p className="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-lg">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep text-brand-dark text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-xl border border-white/70 shadow-[0_4px_20px_rgba(129,216,208,0.55)] hover:shadow-[0_6px_28px_rgba(129,216,208,0.85)] hover:scale-[1.01] active:scale-[0.99] transition-all shrink-0 cursor-pointer overflow-hidden disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 to-transparent rounded-t-xl pointer-events-none" />
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-brand-dark" />
                      <span className="relative z-10">
                        {isDe ? "Wird übermittelt..." : "Submitting..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 relative z-10" />
                      <span className="relative z-10">
                        {isDe ? "Vorlagen & Checklisten anfordern" : "Request Templates & Checklists"}
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. CATALOG OVERVIEW & CATEGORY FILTER                        */}
      {/* ============================================================ */}
      <section className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.key
                    ? "bg-[#05434B] text-white shadow-2xs"
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
              placeholder={isDe ? "Themen durchsuchen..." : "Search topics..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:bg-white focus:border-black transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. TEMPLATE TOPICS PORTFOLIO CARDS                           */}
      {/* ============================================================ */}
      <section className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950">
              {isDe
                ? "Auf Anfrage verfügbar: Unser Dokumenten- & Vorlagenkatalog"
                : "Available On Demand: Our Template & Checklist Catalog"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {isDe
                ? "Klicken Sie auf eine Vorlage, um sie automatisch für den Versand vorzumerken."
                : "Click any template to automatically add it to your request form above."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredTopics.map((item) => {
              const isSelected = selectedTopics.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "border-[#76D8C8] shadow-md ring-1 ring-[#76D8C8]/40"
                      : "border-gray-200/90 hover:border-gray-300 shadow-xs hover:shadow-sm"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#eaf7f5] text-[#05434B] px-2.5 py-1 rounded-full border border-[#76D8C8]/40">
                        {isDe ? item.badgeDe : item.badgeEn}
                      </span>
                      <span className="text-[11px] font-medium text-gray-400">
                        {isDe ? item.formatDe : item.formatEn}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-gray-950 leading-snug mb-2.5">
                      {isDe ? item.titleDe : item.titleEn}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed font-medium mb-5">
                      {isDe ? item.descDe : item.descEn}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-gray-100 mb-6">
                      <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider">
                        {isDe ? "Enthaltene Highlights:" : "Key Elements Included:"}
                      </p>
                      {(isDe ? item.featuresDe : item.featuresEn).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectFromCard(item.id)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#05434B] text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{isDe ? "Für Versand vorgemerkt" : "Added to Request"}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-[#05434B]" />
                        <span>{isDe ? "Diese Vorlage anfordern" : "Request This Template"}</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BESPOKE ADVISORY LEAD SECTION                             */}
      {/* ============================================================ */}
      <BookingLeadSection
        badgeTitle={isDe ? "INDIVIDUELLE BERATUNG" : "BESPOKE ADVISORY"}
        title={
          isDe
            ? "Benötigen Sie individuelle RFP-Kriterien oder eine Software-Bewertung?"
            : "Need bespoke RFP criteria or a vendor evaluation?"
        }
        subtitle={
          isDe
            ? "Unser Beratungsteam unterstützt Sie herstellerunabhängig bei der Erstellung maßgeschneiderter Evaluierungsbögen und Vergütungsmodelle."
            : "Our advisory team partners directly with leadership to build tailored evaluation scorecards, DATEV cutover roadmaps, and compensation bands."
        }
        source="resources_page"
      />

      {/* ============================================================ */}
      {/* 6. BLOG SECTION                                              */}
      {/* ============================================================ */}
      <BlogSection />
    </main>
  );
}
