"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Check,
  CheckCircle2,
  Mail,
  Copy,
} from "lucide-react";
import { companies } from "@/data/companies";
import { SupportFromDayOne } from "@/components/common/SupportFromDayOne";
import { submitLead } from "@/lib/api";

const employeeRangesEn = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "501–2,000 employees",
  "2,000+ employees",
];

const employeeRangesDe = [
  "1–10 Mitarbeitende",
  "11–50 Mitarbeitende",
  "51–200 Mitarbeitende",
  "201–500 Mitarbeitende",
  "501–2.000 Mitarbeitende",
  "2.000+ Mitarbeitende",
];

const europeanCountriesEn = [
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "AT", name: "Austria", dial: "+43" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "Other", name: "Other", dial: "+" },
];

const europeanCountriesDe = [
  { code: "DE", name: "Deutschland", dial: "+49" },
  { code: "AT", name: "Österreich", dial: "+43" },
  { code: "CH", name: "Schweiz", dial: "+41" },
  { code: "GB", name: "Vereinigtes Königreich", dial: "+44" },
  { code: "NL", name: "Niederlande", dial: "+31" },
  { code: "FR", name: "Frankreich", dial: "+33" },
  { code: "ES", name: "Spanien", dial: "+34" },
  { code: "IT", name: "Italien", dial: "+39" },
  { code: "PL", name: "Polen", dial: "+48" },
  { code: "SE", name: "Schweden", dial: "+46" },
  { code: "DK", name: "Dänemark", dial: "+45" },
  { code: "BE", name: "Belgien", dial: "+32" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "Other", name: "Andere", dial: "+" },
];

export function ContactPageClient() {
  const locale = useLocale();
  const isDe = locale === "de";
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const isImplementation =
    topic === "implementation" ||
    topic === "implementation-optimisation" ||
    topic === "implementation_optimisation" ||
    topic === "optimisation";
  const isSelection =
    topic === "selection" ||
    topic === "hr-it-selection" ||
    topic === "it-selection" ||
    topic === "software-selection";
  const isOutsourced = topic === "outsourced-hr" || topic === "outsourced" || topic === "outsourced_hr";
  const isInterim = topic === "interim" || topic === "interim-management";
  const isAudit = topic === "audit" || topic === "hr-it-audit";
  const isIntegrations = topic === "integrations" || topic === "hr-it-integrations";
  const isAdvisory = topic === "advisory" || topic === "hr-advisory";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    jobTitle: "",
    positionRequired: "",
    startDate: "",
    employees: "",
    country: "DE",
    dialCode: "+49",
    phone: "",
    message: "",
    consentUpdates: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("sarah@scaliify.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const employeeRanges = isDe ? employeeRangesDe : employeeRangesEn;
  const europeanCountries = isDe ? europeanCountriesDe : europeanCountriesEn;

  const handleCountryChange = (code: string) => {
    const found = europeanCountries.find((c) => c.code === code);
    setFormData({
      ...formData,
      country: code,
      dialCode: found ? found.dial : "+",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const phone = formData.phone
      ? `${formData.dialCode} ${formData.phone}`.trim()
      : undefined;

    const leadSource = isImplementation
      ? "implementation_call"
      : isSelection
      ? "it_selection_call"
      : isIntegrations
      ? "hr_it_integrations"
      : isAdvisory
      ? "hr_advisory"
      : isInterim
      ? "interim_management"
      : isOutsourced
      ? "outsourced_hr"
      : isAudit
      ? "hr_it_audit"
      : "contact_page";

    const comments = isImplementation
      ? `[Implementation & Optimisation Call Request]\nJob Title: ${formData.jobTitle || "Not specified"}\nTeam Headcount: ${formData.employees || "Not specified"}\n\nProject Scope & Objectives:\n${formData.message}`
      : isSelection
      ? `[HR IT Selection Call Request]\nJob Title: ${formData.jobTitle || "Not specified"}\nTeam Headcount: ${formData.employees || "Not specified"}\n\nSoftware Requirements & Challenges:\n${formData.message}`
      : isIntegrations
      ? `[HR IT Integration Call Request]\nJob Title: ${formData.jobTitle || "Not specified"}\nTeam Headcount: ${formData.employees || "Not specified"}\n\nSystems & Integration Needs:\n${formData.message}`
      : isAdvisory
      ? `[HR Strategic Advisory Request]\nYour Role/Position: ${formData.positionRequired || formData.jobTitle || "Not specified"}\nTeam Headcount: ${formData.employees || "Not specified"}\n\nStrategic Challenge & Focus Areas:\n${formData.message}`
      : isInterim
      ? `[Interim HR Request]\nPosition Required: ${formData.positionRequired || "Not specified"}\nTarget Start Date: ${formData.startDate || "Not specified"}\n\nContext & Requirements:\n${formData.message}`
      : isOutsourced
      ? `[Outsourced HR Request]\nYour Role/Position: ${formData.positionRequired || formData.jobTitle || "Not specified"}\nTarget Start Date: ${formData.startDate || "Not specified"}\nTeam Headcount: ${formData.employees || "Not specified"}\n\nCurrent Needs & Scope:\n${formData.message}`
      : isAudit
      ? `[HR IT Audit Request]\nJob Title: ${formData.jobTitle || "Not specified"}\nTeam Headcount: ${formData.employees || "Not specified"}\n\nCurrent IT Setup & Bottlenecks:\n${formData.message}`
      : formData.message || undefined;

    const result = await submitLead({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      companyName: formData.companyName,
      jobTitle: formData.positionRequired || formData.jobTitle || undefined,
      phone,
      comments,
      source: leadSource,
    });

    setIsSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error || "Something went wrong. Please try again.");
    }
  };

  const bullets = isImplementation
    ? isDe
      ? [
          "Hands-on-Implementierung & Konfiguration für Personio, Factorial, HiBob u.v.m.",
          "Datenmigration, automatisierte Workflows, Berechtigungen & Lohnvorbereitung",
          "Optimierung nach dem Go-Live & nachhaltige Nutzerakzeptanz",
        ]
      : [
          "Hands-on implementation & configuration for Personio, Factorial, HiBob & more",
          "Data migration, automated workflows, permissions & payroll prep",
          "Post-go-live optimisation & continuous user adoption support",
        ]
    : isSelection
    ? isDe
      ? [
          "100 % herstellerunabhängige Evaluierung von 20+ führenden HR-Systemen",
          "Anforderungsanalyse, Budgetabgleich & DSGVO-Compliance",
          "Beschleunigte Software-Auswahl ohne Provisionsinteressen",
        ]
      : [
          "100% vendor-neutral evaluation across 20+ leading HR platforms",
          "Requirements scoping, budget alignment & compliance check",
          "Accelerate software procurement with zero vendor bias",
        ]
    : isAdvisory
    ? isDe
      ? [
          "Senior HR-Führungskräfte & ehemalige CHROs auf Abruf",
          "Pragmatische Lösungen für Org Design, Vergütung & Restrukturierung",
          "Volle Flexibilität: Einzelsessions, Retainer oder Pay-as-you-go",
        ]
      : [
          "Senior HR practitioners & former CHROs on demand",
          "Pragmatic frameworks for org design, comp & restructuring",
          "Total flexibility: one-off sessions, retained hours, or pay as you go",
        ]
    : isOutsourced
    ? isDe
      ? [
          "Dediziertes externes HR-Team, skaliert für 10–100 Mitarbeitende",
          "Verträge, Gehaltsvorbereitung, Onboarding & Recruiting abgedeckt",
          "Pay-as-you-go: Volle Flexibilität ohne feste Gehaltskosten",
        ]
      : [
          "Dedicated external HR team scaled for 10–100 employees",
          "Contracts, payroll prep, onboarding & recruiting covered",
          "Pay as you go — complete flexibility without full-time overhead",
        ]
    : isInterim
    ? isDe
      ? [
          "Erfahrene Interim-Manager & HR-Spezialist:innen in unter 48h einsatzbereit",
          "Passgenau gematcht nach Rolle, Unternehmen & Starttermin",
          "100 % Verantwortung für greifbare Meilensteine",
        ]
      : [
          "Vetted interim HR managers & specialists operational in <48h",
          "Customized to role, company & start timeline",
          "100% delivery accountability beyond placement",
        ]
    : isAudit
    ? isDe
      ? [
          "15-minütige Analyse Ihres HR-IT-Setups",
          "Aufdeckung von Engpässen & Medienbrüchen",
          "Konkreter Fahrplan für Konsolidierung & Rollout",
        ]
      : [
          "15-minute HR IT architecture review",
          "Identify bottlenecks, duplicate entries & manual overhead",
          "Actionable roadmap to optimize your HR tech stack",
        ]
    : isIntegrations
    ? isDe
      ? [
          "Analyse Ihrer Systemlandschaft & Schnittstellen",
          "Native Konnektoren vs. Partner-Middleware",
          "Prozessverschlankung ohne teuren API-Bau",
        ]
      : [
          "Review of your HR tech stack & data flows",
          "Native connectors vs. partner middleware strategy",
          "Process redesign to eliminate costly custom coding",
        ]
    : isDe
    ? [
        "Termin mit unserem Beratungsteam vereinbaren",
        "Fallstudien von Unternehmen wie Ihrem kennenlernen",
        "Erfahren, wie scaliify HR vereinfacht",
      ]
    : [
        "Schedule time with our advisory team",
        "Hear about case studies from companies like yours",
        "Learn how scaliify simplifies HR",
      ];

  return (
    <main className="w-full relative overflow-hidden bg-white">
      {/* ============================================================ */}
      {/* 1. TOP HEADER SECTION (Clean White Background)               */}
      {/* ============================================================ */}
      <div className="w-full pt-28 sm:pt-36 lg:pt-40 pb-6 sm:pb-10 px-4 sm:px-6 text-center max-w-4xl mx-auto flex flex-col items-center">
        {isImplementation && (
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] bg-[#81D8D0]/30 border border-[#81D8D0]/50 rounded-full px-3.5 py-1 mb-4">
            {isDe ? "Implementierung & Optimierung" : "Implementation & Optimisation"}
          </span>
        )}
        {isSelection && (
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] bg-[#81D8D0]/30 border border-[#81D8D0]/50 rounded-full px-3.5 py-1 mb-4">
            {isDe ? "HR-IT-Auswahl" : "HR IT Selection"}
          </span>
        )}
        {isAdvisory && (
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] bg-[#81D8D0]/30 border border-[#81D8D0]/50 rounded-full px-3.5 py-1 mb-4">
            {isDe ? "Strategische HR-Beratung" : "Strategic HR Advisory"}
          </span>
        )}
        {isOutsourced && (
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] bg-[#81D8D0]/30 border border-[#81D8D0]/50 rounded-full px-3.5 py-1 mb-4">
            {isDe ? "Ausgelagertes HR-Management" : "Outsourced HR Management"}
          </span>
        )}
        {isInterim && (
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] bg-[#81D8D0]/30 border border-[#81D8D0]/50 rounded-full px-3.5 py-1 mb-4">
            {isDe ? "Interim-Management auf Abruf" : "Interim HR Management"}
          </span>
        )}
        {isAudit && (
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] bg-[#81D8D0]/30 border border-[#81D8D0]/50 rounded-full px-3.5 py-1 mb-4">
            {isDe ? "Kostenloses 15-Minuten-Audit" : "Free 15-Minute Audit"}
          </span>
        )}
        {isIntegrations && (
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] bg-[#81D8D0]/30 border border-[#81D8D0]/50 rounded-full px-3.5 py-1 mb-4">
            {isDe ? "HR-IT-Integrationen" : "HR IT Integrations"}
          </span>
        )}

        {/* Main Title (H1) in pure black */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-950 leading-[1.1] mb-4">
          {isImplementation ? (
            isDe ? "Implementierungsgespräch anfragen" : "Request an implementation call"
          ) : isSelection ? (
            isDe ? "IT-Auswahlgespräch anfragen" : "Request an IT selection call"
          ) : isAdvisory ? (
            isDe ? "HR-Beratung anfragen" : "Request an HR advisory session"
          ) : isOutsourced ? (
            isDe ? "Mit ausgelagertem HR starten" : "Get started with outsourced HR"
          ) : isInterim ? (
            isDe ? "Interim-HR-Manager anfragen" : "Request an interim HR manager"
          ) : isAudit ? (
            isDe ? "Kostenloses 15-Minuten-Audit anfragen" : "Request your free 15-minute HR IT audit"
          ) : isIntegrations ? (
            isDe ? "HR-IT-Integrationsgespräch anfragen" : "Request an HR IT integration call"
          ) : isDe ? (
            <>Haben Sie Fragen?<br />Wir beraten Sie gerne</>
          ) : (
            <>Have a question?<br />Let&apos;s get it answered</>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12">
          {isImplementation
            ? isDe
              ? "Besprechen Sie Ihr HR-Software-Rollout, Ihre Datenmigration oder Prozessoptimierung mit unseren zertifizierten Implementierungsexperten."
              : "Discuss your HR software rollout, data migration, or process optimisation with our certified implementation specialists."
            : isSelection
            ? isDe
              ? "Unabhängige, herstellerneutrale Softwareberatung. Wir vergleichen über 20 Plattformen anhand Ihrer Anforderungen, Ihres Budgets und Ihrer Compliance."
              : "Independent, vendor-neutral software advisory. We benchmark 20+ platforms against your requirements, budget, and compliance needs."
            : isAdvisory
            ? isDe
              ? "Teilen Sie uns Ihre strategische Herausforderung oder Fragestellung mit. Wir matchen Sie innerhalb von 24 Stunden mit einem praxiserfahrenen Senior-Advisor oder ehemaligen CHRO."
              : "Tell us about your strategic People challenge, organizational design, or upcoming milestone. We match you with a seasoned advisor within 24 hours."
            : isOutsourced
            ? isDe
              ? "Teilen Sie uns Ihre Teamgröße, Ihren gewünschten Starttermin und Ihre aktuellen Prioritäten mit. Wir stellen Ihnen innerhalb von 48 Stunden Ihr maßgeschneidertes externes HR-Team zusammen."
              : "Tell us about your team size, key operational requirements, and target start date. We tailor a dedicated external HR department setup for your business."
            : isInterim
            ? isDe
              ? "Beschreiben Sie die gesuchte Position, das geplante Startdatum und den Unternehmenskontext. Wir stellen Ihnen innerhalb von 48 Stunden geprüfte Senior-HR-Expert:innen vor."
              : "Tell us about the role, required start date, and organizational context. We match vetted senior HR practitioners within 48 hours."
            : isAudit
            ? isDe
              ? "Beschreiben Sie Ihr aktuelles IT-Setup und unsere Spezialisten analysieren Ihre Systemlandschaft, Schnittstellen und Optimierungspotenziale."
              : "Describe your current IT setup and our HR tech specialists will assess your architecture, integrations, and optimization opportunities."
            : isIntegrations
            ? isDe
              ? "Besprechen Sie Ihren Software-Stack, Schnittstellen und Datenflüsse mit unseren Spezialisten für HR-IT-Architektur."
              : "Discuss your software stack, APIs, and data sync requirements with our HR IT architecture specialists."
            : isDe
            ? "Unser Beratungsteam meldet sich in Kürze bei Ihnen. Das können Sie erwarten:"
            : "One of our experts will contact you shortly. Here's what you can expect:"}
        </p>

        {/* Three Value Bullets with Tiffany Blue Checkmark Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-center gap-6 sm:gap-10 max-w-2xl w-full text-center">
          {bullets.map((text) => (
            <div key={text} className="flex flex-col items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-teal flex items-center justify-center shadow-xs shrink-0">
                <Check className="w-5 h-5 text-brand-dark stroke-[3]" />
              </div>
              <span className="text-xs sm:text-sm text-gray-700 leading-snug font-medium max-w-[170px]">
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Direct Email Contact */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
            {isDe ? "Direkt schreiben" : "Or reach us directly"}
          </p>
          <div className="inline-flex items-center gap-3 bg-white border border-[#81D8D0]/50 rounded-2xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-xl bg-[#81D8D0]/25 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-[#05434B]" />
            </div>
            <a
              href="mailto:sarah@scaliify.com"
              className="text-sm font-bold text-gray-900 hover:text-[#05434B] transition-colors"
            >
              sarah@scaliify.com
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              title={isDe ? "E-Mail kopieren" : "Copy email"}
              aria-label={isDe ? "E-Mail-Adresse kopieren" : "Copy email address"}
              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-[#81D8D0]/30 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Copy className="w-3.5 h-3.5 text-gray-500" />
            </button>
            {copied && (
              <span className="text-[11px] font-bold text-[#05434B] animate-in fade-in duration-150">
                {isDe ? "Kopiert!" : "Copied!"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. TIFFANY BLUE GRADIENT FADE BACKDROP (Matching HR Admin Section) */}
      {/* ============================================================ */}
      <div className="w-full relative bg-gradient-to-b from-white via-[#81D8D0]/40 to-brand-dark pt-6 sm:pt-10 pb-20 sm:pb-28 px-4 sm:px-6 md:px-8 overflow-hidden">
        {/* Soft Tiffany Blue Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle,rgba(129,216,208,0.4)_0%,transparent_70%)] pointer-events-none blur-3xl -z-0" />

        <div className="max-w-[500px] mx-auto flex flex-col items-center relative z-10">
          
          {/* Glassmorphism Form Card */}
          <div className="w-full rounded-2xl sm:rounded-3xl border border-white/50 p-5 sm:p-8 shrink-0 bg-white/75 backdrop-blur-2xl">
            {submitted ? (
              /* Success confirmation state */
              <div className="py-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-brand-teal/20 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-brand-dark" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-950 mb-2 tracking-tight">
                  {isImplementation
                    ? isDe
                      ? "Implementierungsanfrage erhalten!"
                      : "Implementation request received!"
                    : isSelection
                    ? isDe
                      ? "IT-Auswahlanfrage erhalten!"
                      : "IT selection request received!"
                    : isAdvisory
                    ? isDe
                      ? "Beratungsanfrage erhalten!"
                      : "Advisory request received!"
                    : isOutsourced
                    ? isDe
                      ? "Anfrage für ausgelagertes HR erhalten!"
                      : "Outsourced HR request received!"
                    : isInterim
                    ? isDe
                      ? "Interim-Anfrage erhalten!"
                      : "Interim HR manager request received!"
                    : isAudit
                    ? isDe
                      ? "Audit-Anfrage erhalten!"
                      : "Audit request received!"
                    : isIntegrations
                    ? isDe
                      ? "Anfrage für Integrationsgespräch erhalten!"
                      : "Integration request received!"
                    : isDe
                    ? "Vielen Dank!"
                    : "Thank you!"}
                </h2>
                <p className="text-sm text-gray-600 max-w-xs mb-6">
                  {isImplementation
                    ? isDe
                      ? "Ihre Anfrage für ein Implementierungsgespräch ist eingegangen. Ein leitender scaliify-Implementierungsexperte meldet sich innerhalb eines Werktages bei Ihnen."
                      : "Your request for an implementation call has been received. A senior scaliify implementation specialist will follow up within 1 business day."
                    : isSelection
                    ? isDe
                      ? "Ihre Anfrage für ein IT-Auswahlgespräch ist eingegangen. Ein leitender scaliify-Softwareberater meldet sich innerhalb eines Werktages bei Ihnen."
                      : "Your request for an IT selection call has been received. A senior scaliify software advisor will follow up within 1 business day."
                    : isAdvisory
                    ? isDe
                      ? "Ihre Anfrage für strategische HR-Beratung ist eingegangen. Ein leitender scaliify-Partner meldet sich innerhalb von 24 Stunden bei Ihnen, um das passende Sparring zu koordinieren."
                      : "Your request for strategic HR advisory has been received. A senior scaliify partner will review your focus areas and connect with you within 24 hours."
                    : isOutsourced
                    ? isDe
                      ? "Ihre Anfrage für ausgelagertes HR ist eingegangen. Ein leitender scaliify-Berater meldet sich innerhalb eines Werktages bei Ihnen, um Ihr maßgeschneidertes Team-Setup zu besprechen."
                      : "Your request for outsourced HR has been received. A senior scaliify advisor will follow up within 1 business day to discuss your tailored team setup."
                    : isInterim
                    ? isDe
                      ? "Ihre Anfrage für einen Interim-HR-Manager ist eingegangen. Ein leitender scaliify-Partner meldet sich innerhalb von 24 Stunden bei Ihnen, um das passende Profil vorzustellen."
                      : "Your request for an interim HR manager has been received. A senior scaliify partner will review your requirements and follow up within 24 hours to match candidate profiles."
                    : isAudit
                    ? isDe
                      ? "Ihre Anfrage für das HR-IT-Audit ist eingegangen. Ein leitender scaliify-Berater meldet sich innerhalb eines Werktages, um Ihr kostenloses 15-minütiges Audit zu koordinieren."
                      : "Your HR IT Audit request has been received. A senior scaliify consultant will follow up within 1 business day to coordinate your free 15-minute audit."
                    : isIntegrations
                    ? isDe
                      ? "Ihre Anfrage für ein HR-IT-Integrationsgespräch ist eingegangen. Ein leitender scaliify-Integrationsberater meldet sich innerhalb eines Werktages bei Ihnen."
                      : "Your request for an HR IT integration consultation has been received. A senior scaliify specialist will follow up within 1 business day."
                    : isDe
                    ? "Ihre Anfrage ist eingegangen. Ein scaliify-Berater wird sich innerhalb eines Werktages bei Ihnen melden."
                    : "Your request has been received. A scaliify consultant will follow up within 1 business day."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      companyName: "",
                      jobTitle: "",
                      positionRequired: "",
                      startDate: "",
                      employees: "",
                      country: "DE",
                      dialCode: "+49",
                      phone: "",
                      message: "",
                      consentUpdates: false,
                    });
                  }}
                  className="text-xs font-bold bg-gray-950 text-white px-6 py-2.5 rounded-full hover:bg-brand-dark transition-colors cursor-pointer"
                >
                  {isDe ? "Weitere Nachricht senden" : "Send another message"}
                </button>
              </div>
            ) : (
              <form id="contact-form" data-formid="Contact Form" onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Row: First / Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact_first_name" className="sr-only">First Name</label>
                    <input
                      id="contact_first_name"
                      name="first_name"
                      type="text"
                      required
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder={isDe ? "Vorname *" : "First Name *"}
                      aria-label={isDe ? "Vorname" : "First name"}
                      className="w-full bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact_last_name" className="sr-only">Last Name</label>
                    <input
                      id="contact_last_name"
                      name="last_name"
                      type="text"
                      required
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder={isDe ? "Nachname *" : "Last Name *"}
                      aria-label={isDe ? "Nachname" : "Last name"}
                      className="w-full bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Business Email */}
                <div>
                  <label htmlFor="contact_email" className="sr-only">Email</label>
                  <input
                    id="contact_email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={isDe ? "Geschäftliche E-Mail-Adresse *" : "Business Email Address *"}
                    aria-label={isDe ? "Geschäftliche E-Mail-Adresse" : "Business email address"}
                    className="w-full bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* Company Name & GHL Mapping Aliases */}
                <div>
                  <label htmlFor="contact_company" className="sr-only">Company Name</label>
                  <input
                    id="contact_company"
                    name="company"
                    type="text"
                    required
                    autoComplete="organization"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder={isDe ? "Unternehmen *" : "Company Name *"}
                    aria-label={isDe ? "Unternehmen" : "Company name"}
                    className="w-full bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all"
                  />
                  {/* Offscreen aliases for GHL built-in 'Business Name' and custom 'Company name' */}
                  <label htmlFor="contact_company_name" className="sr-only">Company name</label>
                  <input
                    id="contact_company_name"
                    name="company_name"
                    type="text"
                    tabIndex={-1}
                    aria-hidden="true"
                    readOnly
                    value={formData.companyName}
                    style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                  />
                  <label htmlFor="contact_business_name" className="sr-only">Business Name</label>
                  <input
                    id="contact_business_name"
                    name="business_name"
                    type="text"
                    tabIndex={-1}
                    aria-hidden="true"
                    readOnly
                    value={formData.companyName}
                    style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                  />
                  <label htmlFor="contact_companyName" className="sr-only">Company Name</label>
                  <input
                    id="contact_companyName"
                    name="companyName"
                    type="text"
                    tabIndex={-1}
                    aria-hidden="true"
                    readOnly
                    value={formData.companyName}
                    style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                  />
                </div>

                {/* Job Title / Required Position */}
                <div>
                  <label htmlFor="contact_job_title" className="sr-only">Job Title</label>
                  {isInterim || isOutsourced ? (
                    <input
                      id="contact_job_title"
                      name="job_title"
                      type="text"
                      required
                      autoComplete="organization-title"
                      value={formData.positionRequired}
                      onChange={(e) => setFormData({ ...formData, positionRequired: e.target.value })}
                      placeholder={
                        isOutsourced
                          ? isDe
                            ? "Ihre Position (z. B. Gründer:in, Geschäftsführer:in, COO, Head of Ops) *"
                            : "Your Role / Position (e.g. Founder, CEO, COO, Managing Director) *"
                          : isDe
                          ? "Gesuchte Position (z. B. Interim Head of HR, Recruiter, VP People) *"
                          : "Required Position (e.g. Interim Head of HR, Recruiter, VP People) *"
                      }
                      aria-label={
                        isOutsourced
                          ? isDe ? "Ihre Rolle oder Position" : "Your role or position"
                          : isDe ? "Gesuchte Position" : "Required position"
                      }
                      className="w-full bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all"
                    />
                  ) : (
                    <input
                      id="contact_job_title"
                      name="job_title"
                      type="text"
                      autoComplete="organization-title"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      placeholder={isDe ? "Position" : "Job Title"}
                      aria-label={isDe ? "Position" : "Job title"}
                      className="w-full bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all"
                    />
                  )}
                </div>

                {/* Desired Start Date for Interim and Outsourced HR */}
                {(isInterim || isOutsourced) && (
                  <div className="relative">
                    <label htmlFor="contact_start_date" className="sr-only">Target Start Date</label>
                    <select
                      id="contact_start_date"
                      name="start_date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      aria-label={isDe ? "Gewünschter Starttermin" : "Target start date"}
                      className="w-full appearance-none bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="" disabled>
                        {isDe ? "Gewünschter Starttermin *" : "Target Start Date / Timeline *"}
                      </option>
                      <option value="Immediately (< 1 week)">
                        {isDe ? "Sofort (< 1 Woche)" : "Immediately (< 1 week)"}
                      </option>
                      <option value="Within 2 weeks">
                        {isDe ? "Innerhalb von 2 Wochen" : "Within 2 weeks"}
                      </option>
                      <option value="Within 1 month">
                        {isDe ? "Innerhalb von 1 Monat" : "Within 1 month"}
                      </option>
                      <option value="Parental leave cover (planned date)">
                        {isDe ? "Elternzeitvertretung (geplanter Termin)" : "Parental leave cover (planned date)"}
                      </option>
                      <option value="Flexible / Exploratory">
                        {isDe ? "Flexibel / Strategische Planung" : "Flexible / Exploratory"}
                      </option>
                    </select>
                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Number of Employees & GHL Mapping Aliases */}
                <div>
                  <label htmlFor="contact_number_of_employees" className="sr-only">Number of employees</label>
                  <div className="relative">
                    <select
                      id="contact_number_of_employees"
                      name="number_of_employees"
                      required
                      value={formData.employees}
                      onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                      aria-label={isDe ? "Anzahl der Mitarbeitenden" : "Number of employees"}
                      className="w-full appearance-none bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="" disabled>{isDe ? "Anzahl der Mitarbeitenden" : "Number of Employees"}</option>
                      {employeeRanges.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {/* Offscreen aliases for GHL custom field matching */}
                  <label htmlFor="contact_employees" className="sr-only">Number of employees</label>
                  <input
                    id="contact_employees"
                    name="employees"
                    type="text"
                    tabIndex={-1}
                    aria-hidden="true"
                    readOnly
                    value={formData.employees}
                    style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                  />
                  <label htmlFor="contact_numberOfEmployees" className="sr-only">Number of Employees</label>
                  <input
                    id="contact_numberOfEmployees"
                    name="numberOfEmployees"
                    type="text"
                    tabIndex={-1}
                    aria-hidden="true"
                    readOnly
                    value={formData.employees}
                    style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                  />
                </div>

                {/* Country */}
                <div className="relative">
                  <select
                    id="contact_country"
                    name="country"
                    autoComplete="country-name"
                    value={formData.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    aria-label={isDe ? "Land" : "Country"}
                    className="w-full appearance-none bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all cursor-pointer"
                  >
                    {europeanCountries.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Phone: Dial code + Number */}
                <div className="flex gap-2">
                  <div className="relative shrink-0">
                    <select
                      id="contact_dial_code"
                      name="dial_code"
                      value={formData.dialCode}
                      onChange={(e) => setFormData({ ...formData, dialCode: e.target.value })}
                      aria-label={isDe ? "Ländervorwahl" : "Dial code"}
                      className="appearance-none bg-white/80 border border-gray-200/70 rounded-2xl pl-4 pr-8 py-3 text-sm text-gray-800 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all cursor-pointer"
                    >
                      {europeanCountries.map((c) => (
                        <option key={c.code} value={c.dial}>{c.dial}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                      <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <input
                    id="contact_phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={isDe ? "Telefonnummer" : "Phone Number"}
                    aria-label={isDe ? "Telefonnummer" : "Phone number"}
                    className="flex-1 bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* Message / Describe IT setup or Integrations or Interim role or Outsourced HR or Advisory */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact_message" className="text-xs font-bold text-gray-700">
                    {isImplementation
                      ? isDe
                        ? "Beschreiben Sie Ihr Implementierungs- oder Optimierungsvorhaben *"
                        : "Describe your implementation or optimisation project *"
                      : isSelection
                      ? isDe
                        ? "Beschreiben Sie Ihre Softwareanforderungen & aktuellen Herausforderungen *"
                        : "Describe your software requirements & current challenges *"
                      : isAdvisory
                      ? isDe
                        ? "Beschreiben Sie Ihre strategische Herausforderung oder Fragestellung *"
                        : "Describe your strategic challenge or advisory needs *"
                      : isOutsourced
                      ? isDe
                        ? "Beschreiben Sie Ihren aktuellen HR-Bedarf *"
                        : "Describe your current needs *"
                      : isInterim
                      ? isDe
                        ? "Rahmenbedingungen & Kontext (Dauer, Herausforderungen, etc.) *"
                        : "Role context & requirements (duration, key challenges, etc.) *"
                      : isAudit
                      ? isDe
                        ? "Beschreiben Sie Ihr aktuelles IT-Setup *"
                        : "Describe your current IT setup *"
                      : isIntegrations
                      ? isDe
                        ? "Beschreiben Sie Ihre Systeme & Integrationsanforderungen *"
                        : "Describe your systems & integration requirements *"
                      : isDe
                      ? "Ihre Nachricht"
                      : "Your message"}
                  </label>
                  <textarea
                    id="contact_message"
                    name="message"
                    rows={4}
                    required={isImplementation || isSelection || isOutsourced || isInterim || isAudit || isIntegrations || isAdvisory}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isImplementation
                        ? isDe
                          ? "Welche HR-Software führen Sie ein oder möchten Sie optimieren (z. B. Personio, Factorial, HiBob)? Was ist Ihr Zeitplan und Ihre wichtigste Herausforderung?"
                          : "Which HR tools are you implementing or optimising (e.g. Personio, Factorial, HiBob)? What is your timeline and key objective?..."
                        : isSelection
                        ? isDe
                          ? "Welche Tools nutzen Sie bisher? Wie groß ist Ihr Team und welche Kernmodule benötigen Sie (z. B. Core HR, Lohn, ATS, Performance)?"
                          : "What tools are you currently using? What is your headcount and which modules are you looking for (e.g. Core HR, Payroll, ATS, Performance)?..."
                        : isAdvisory
                        ? isDe
                          ? "Welche strategischen Themen möchten Sie adressieren (z. B. Org Design, Gehaltsbänder, Performance Management, Betriebsrat, Restrukturierung)? Wo stehen Sie aktuell?"
                          : "Describe the strategic challenge, context, or upcoming transition (e.g. org design, compensation bands, performance management, works council, restructuring)..."
                        : isOutsourced
                        ? isDe
                          ? "Welche HR-Themen möchten Sie auslagern (z. B. Arbeitsverträge, Gehaltsvorbereitung, Recruiting, Onboarding)? Wo drückt der Schuh am meisten?"
                          : "Describe your current HR requirements, team setup, and specific areas you need covered (e.g. contracts, payroll prep, onboarding, recruiting)..."
                        : isInterim
                        ? isDe
                          ? "Beschreiben Sie den Anlass (z. B. Elternzeit, plötzliche Vakanz, schnelles Wachstum, M&A), geplante Dauer und wichtigste Ziele..."
                          : "Describe the situation (e.g. parental leave, sudden vacancy, rapid scaling, M&A), expected duration, and key priorities..."
                        : isAudit
                        ? isDe
                          ? "Welche HR-Systeme, ATS-Tools oder Lohnprogramme nutzen Sie derzeit? Wo liegen die größten Engpässe?"
                          : "Describe your current IT setup (e.g. current HR software, ATS, payroll provider, key pain points)..."
                        : isIntegrations
                        ? isDe
                          ? "Welche Systeme möchten Sie verbinden (z. B. HRIS, Payroll, ATS, ERP)? Welche Schnittstellen oder Datenflüsse werden benötigt?"
                          : "Describe which systems you need to connect (e.g. HRIS, payroll, ATS, ERP) and any key data flow requirements..."
                        : isDe
                        ? "Ihre Nachricht..."
                        : "Your message"
                    }
                    aria-label={
                      isImplementation
                        ? isDe ? "Implementierungsvorhaben beschreiben" : "Describe your implementation or optimisation project"
                        : isSelection
                        ? isDe ? "Softwareanforderungen beschreiben" : "Describe your software requirements and challenges"
                        : isAdvisory
                        ? isDe ? "Strategische Herausforderung beschreiben" : "Describe your strategic challenge or advisory needs"
                        : isOutsourced
                        ? isDe ? "HR-Bedarf beschreiben" : "Describe your current needs"
                        : isInterim
                        ? isDe ? "Rahmenbedingungen und Kontext beschreiben" : "Role context and requirements"
                        : isAudit
                        ? isDe ? "IT-Setup beschreiben" : "Describe your current IT setup"
                        : isIntegrations
                        ? isDe ? "Integrationsanforderungen beschreiben" : "Describe your systems and integration requirements"
                        : isDe ? "Ihre Nachricht" : "Message"
                    }
                    className="w-full bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all resize-y"
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consentUpdates}
                    onChange={(e) => setFormData({ ...formData, consentUpdates: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-brand-dark cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-gray-600 leading-relaxed cursor-pointer select-none">
                    {isDe
                      ? "Ich möchte Insights zu HR-Technologien, Updates und strategische Ressourcen von scaliify erhalten. *"
                      : "I'd like to receive scaliify's HR tech insights, product updates, and strategic resources. *"}
                  </label>
                </div>

                {/* Privacy Link */}
                <p className="text-xs text-gray-500">
                  {isDe ? "Details finden Sie in unserer " : "See the "}
                  <Link href="/privacy" className="underline underline-offset-2 hover:text-gray-900 transition-colors">
                    {isDe ? "Datenschutzerklärung" : "privacy policy"}
                  </Link>
                  {isDe ? "." : " for more details."}
                </p>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-950 text-white text-sm font-bold py-3.5 rounded-2xl hover:bg-brand-dark transition-all mt-1 cursor-pointer active:scale-[0.99]"
                >
                  {isSubmitting
                    ? isDe
                      ? "Wird übermittelt…"
                      : "Submitting…"
                    : isImplementation
                    ? isDe
                      ? "Implementierungsgespräch anfragen"
                      : "Request implementation call"
                    : isSelection
                    ? isDe
                      ? "IT-Auswahlgespräch anfragen"
                      : "Request IT selection call"
                    : isAdvisory
                    ? isDe
                      ? "HR-Beratung anfragen"
                      : "Request advisory session"
                    : isOutsourced
                    ? isDe
                      ? "Ausgelagertes HR anfragen"
                      : "Request outsourced HR"
                    : isInterim
                    ? isDe
                      ? "Interim-Manager anfragen"
                      : "Request interim manager"
                    : isAudit
                    ? isDe
                      ? "Kostenloses HR-IT-Audit anfragen"
                      : "Request free HR IT audit"
                    : isIntegrations
                    ? isDe
                      ? "Integrationsgespräch anfragen"
                      : "Request integration call"
                    : isDe
                    ? "Anfrage absenden"
                    : "Submit request"}
                </button>

                {submitError && (
                  <p className="text-sm text-red-600 text-center" role="alert">
                    {submitError}
                  </p>
                )}

                {/* reCAPTCHA Notice */}
                <p className="text-[11px] text-gray-500 text-center leading-relaxed">
                  {isDe
                    ? "Diese Website wird durch reCAPTCHA geschützt. Es gelten die Google-Datenschutzerklärung und Nutzungsbedingungen."
                    : "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply."}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. TRUSTED BY — full partner company roster, white bg         */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
            {isDe ? "Diesen Unternehmen vertrauen uns" : "Trusted by these companies"}
          </p>
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-2xl border border-gray-200/80 hover:border-gray-300 hover:shadow-xs transition-all duration-300 py-4 px-5 flex items-center justify-center min-h-[76px] select-none group"
              >
                <div className="relative w-full h-9 flex items-center justify-center">
                  <Image
                    src={company.logoUrl}
                    alt={`Partner logo ${company.id}`}
                    fill
                    unoptimized
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 45vw, 20vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SUPPORT FROM DAY ONE — 4-card Bento Support Grid          */}
      {/* ============================================================ */}
      <SupportFromDayOne />
    </main>
  );
}
