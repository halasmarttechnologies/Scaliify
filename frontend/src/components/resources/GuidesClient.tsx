"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Download,
  Filter,
  Search,
  X,
  Loader2,
  Sparkles,
  Check,
  Send,
} from "lucide-react";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";
import { submitLead } from "@/lib/api";
import { useLocale } from "next-intl";

interface GuideItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  readTime: string;
  badge: string;
  items: string[];
}

const guidesList: GuideItem[] = [
  {
    id: "hris-selection-2026",
    category: "Software Selection",
    title: "The Ultimate HRIS Selection Playbook (2026 Edition)",
    desc: "A vendor-neutral, step-by-step framework to evaluate 20+ European platforms including Personio, HiBob, Deel, Factorial, and Workday without vendor bias.",
    readTime: "12 min read",
    badge: "Playbook",
    items: [
      "Requirements gathering matrix (120+ criteria)",
      "Total Cost of Ownership (TCO) calculator guidelines",
      "Vendor RFP questionnaire template",
    ],
  },
  {
    id: "datev-cutover-guide",
    category: "Payroll & Integrations",
    title: "DATEV Cutover & Payroll Integration Checklist",
    desc: "Everything HR and finance teams need to connect modern HRIS platforms to DATEV LODAS and Lohn und Gehalt without monthly payroll discrepancies.",
    readTime: "8 min read",
    badge: "Checklist",
    items: [
      "Monthly wage type mapping sheet",
      "Stammdaten sync validation checklist",
      "Pre-flight payroll cutoff calendar",
    ],
  },
  {
    id: "german-onboarding-compliance",
    category: "Compliance & Legal",
    title: "German Onboarding & Contract Compliance Guide",
    desc: "Legally sound employment documentation under the Nachweisgesetz, standard terms, probation guidelines, and remote work policies.",
    readTime: "10 min read",
    badge: "Compliance",
    items: [
      "Nachweisgesetz mandatory clause checklist",
      "Arbeitszeugnis issuance guidelines",
      "Standardised onboarding step roadmap",
    ],
  },
  {
    id: "works-council-it-codetermination",
    category: "Compliance & Legal",
    title: "Works Council (Betriebsrat) IT Co-Determination Checklist",
    desc: "Navigating §87(1) Nr. 6 BetrVG for new software rollouts. How to draft compliant works agreements (Betriebsvereinbarungen) swiftly.",
    readTime: "9 min read",
    badge: "Checklist",
    items: [
      "Software audit report format for Betriebsrat review",
      "Standard sample works agreement clause library",
      "Constructive social partnership roadmap",
    ],
  },
  {
    id: "compensation-leveling-framework",
    category: "Org Strategy",
    title: "Compensation Leveling & European Salary Band Architecture",
    desc: "Design structured career tracks, benchmarking methodology, and transparent salary progression models for scaling European teams.",
    readTime: "15 min read",
    badge: "Framework",
    items: [
      "Individual Contributor (IC) vs Management tracks",
      "Market benchmark percentiles (P25/P50/P75)",
      "Gender Pay Transparency EU Directive readiness",
    ],
  },
  {
    id: "interim-hr-readiness",
    category: "Org Strategy",
    title: "Interim HR Management Readiness & Transition Toolkit",
    desc: "How to onboard and extract maximum value from a fractional or interim Head of People during parental leave covers, rapid scaling, or C-Level transitions.",
    readTime: "7 min read",
    badge: "Toolkit",
    items: [
      "First 30-day impact milestones template",
      "Founder-to-Interim delegation matrix",
      "Permanent successor hiring briefing framework",
    ],
  },
];

const categories = [
  { key: "All", en: "All", de: "Alle" },
  { key: "Software Selection", en: "Software Selection", de: "Software-Auswahl" },
  { key: "Payroll & Integrations", en: "Payroll & Integrations", de: "Payroll & Integrationen" },
  { key: "Compliance & Legal", en: "Compliance & Legal", de: "Compliance & Recht" },
  { key: "Org Strategy", en: "Org Strategy", de: "Organisationsstrategie" },
];

export function GuidesClient() {
  const locale = useLocale();
  const isDe = locale === "de";
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [activeGuide, setActiveGuide] = useState<GuideItem | null>(null);
  const [modalForm, setModalForm] = useState({
    name: "",
    email: "",
    company: "",
    jobTitle: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filteredGuides = guidesList.filter((guide) => {
    const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenModal = (guide: GuideItem) => {
    setActiveGuide(guide);
    setSubmitted(false);
    setModalForm({
      name: "",
      email: "",
      company: "",
      jobTitle: "",
    });
  };

  const handleCloseModal = () => {
    setActiveGuide(null);
    setSubmitted(false);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGuide) return;
    setIsSubmitting(true);

    const names = modalForm.name.trim().split(" ");
    const firstName = names[0] || "Guest";
    const lastName = names.slice(1).join(" ") || "Lead";

    await submitLead({
      firstName,
      lastName,
      email: modalForm.email,
      companyName: modalForm.company,
      jobTitle: modalForm.jobTitle || undefined,
      source: "template_request",
      comments: `[Guide/Checklist Request]: ${activeGuide.title} (${activeGuide.badge})`,
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main className="w-full bg-white text-gray-900 font-sans min-h-screen">
      {/* Header */}
      <section className="w-full pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] block mb-3">
            {isDe ? "LEITFÄDEN & CHECKLISTEN AUF ANFRAGE" : "ON-DEMAND GUIDES & PLAYBOOKS"}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 leading-[1.12] mb-4">
            {isDe ? "Welche Leitfäden & Checklisten benötigen Sie?" : "Which guides & checklists do you need?"}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isDe
              ? "Teilen Sie uns Ihren konkreten Bedarf mit – unser People-Operations-Team stellt Ihnen die passenden Implementierungs-Checklisten und Leitfäden individuell zusammen und sendet sie Ihnen direkt zu."
              : "Tell us what you're working on, and our People operations advisory team will prepare and send the right playbooks and checklists straight to your inbox."}
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.key
                    ? "bg-[#05434B] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {isDe ? cat.de : cat.en}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={isDe ? "Leitfäden durchsuchen..." : "Search guides..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:bg-white focus:border-black transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 hover:border-[#81D8D0]/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#eaf7f5] text-[#05434B] px-2.5 py-1 rounded-full border border-[#76D8C8]/40">
                      {guide.badge}
                    </span>
                    <span className="text-[11px] font-medium text-gray-400">
                      {guide.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-gray-950 leading-snug mb-2.5">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed font-medium mb-5">
                    {guide.desc}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-gray-100 mb-6">
                    <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider">
                      Includes:
                    </p>
                    {guide.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Request Guide Button */}
                <button
                  type="button"
                  onClick={() => handleOpenModal(guide)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gray-950 hover:bg-[#05434B] text-white text-xs font-bold py-3 px-4 rounded-2xl transition-all cursor-pointer shadow-xs hover:shadow-md active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5 text-[#81D8D0]" />
                  <span>{isDe ? "Diesen Leitfaden anfordern" : "Request This Guide"}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Lead Section */}
      <BookingLeadSection
        badgeTitle={isDe ? "MASSGESCHNEIDERTE VORLAGEN" : "CUSTOM TEMPLATES"}
        title={isDe ? "Benötigen Sie maßgeschneiderte Playbooks für Ihr Team?" : "Need bespoke playbooks for your team?"}
        subtitle={
          isDe
            ? "Buchen Sie ein Arbeitsgespräch mit unserem Senior-Team für HR-Operations und strategische Beratung."
            : "Book a working session with our senior HR operations and legal advisory team."
        }
        source="guides_page"
      />

      {/* Blog Section */}
      <BlogSection />

      {/* ============================================================ */}
      {/* POP-UP DOWNLOAD RESOURCE MODAL                               */}
      {/* Keeps user on current page so they can download multiple kits */}
      {/* ============================================================ */}
      {activeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              /* Success confirmation state */
              <div className="py-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#5BC7BC] to-[#81D8D0] text-[#05434B] flex items-center justify-center mb-5 shadow-sm">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-[#05434B] mb-2">
                  {isDe ? "ANFRAGE ERHALTEN" : "REQUEST RECEIVED"}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 mb-2">
                  {isDe ? "Unterlagen werden vorbereitet" : "Your Guide Is On Its Way!"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md leading-relaxed mb-6">
                  {isDe
                    ? `Wir haben Ihre Anfrage für "${activeGuide.title}" erfasst. Unser Beratungsteam sendet Ihnen die Unterlagen in Kürze an ${modalForm.email} zu.`
                    : `We've logged your request for "${activeGuide.title}". Our People Ops advisory team is preparing your kit and will send it to ${modalForm.email} shortly.`}
                </p>

                <div className="w-full flex justify-center">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto inline-flex items-center justify-center text-xs font-bold text-white bg-[#05434B] hover:bg-black py-3 px-6 rounded-xl transition-colors cursor-pointer"
                  >
                    {isDe ? "Schließen & weitere Leitfäden ansehen" : "Explore More Guides"}
                  </button>
                </div>
              </div>
            ) : (
              /* Input Form */
              <div>
                <div className="mb-5 pr-6">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider bg-[#eaf7f5] text-[#05434B] px-2.5 py-1 rounded-full border border-[#76D8C8]/40 mb-2.5">
                    {activeGuide.badge} • {activeGuide.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-gray-950 leading-snug">
                    {activeGuide.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                    {isDe
                      ? "Geben Sie Ihre Daten ein – unser Beratungsteam sendet Ihnen diesen Leitfaden direkt per E-Mail zu."
                      : "Enter your work details and our advisory team will send this playbook directly to your inbox."}
                  </p>
                </div>

                <form id="guide-request-form" data-formid="Guide Playbook Request Form" onSubmit={handleModalSubmit} className="flex flex-col gap-3">
                  <div>
                    <label htmlFor="guide_name" className="block text-[11px] font-bold text-gray-700 mb-1">
                      {isDe ? "Vollständiger Name *" : "Full Name *"}
                    </label>
                    <input
                      id="guide_name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={modalForm.name}
                      onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                      placeholder={isDe ? "z. B. Sarah Schmidt" : "e.g. Sarah Schmidt"}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="guide_email" className="block text-[11px] font-bold text-gray-700 mb-1">
                      {isDe ? "Geschäftliche E-Mail *" : "Work Email *"}
                    </label>
                    <input
                      id="guide_email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={modalForm.email}
                      onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                      placeholder={isDe ? "name@unternehmen.de" : "name@company.com"}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="guide_company" className="block text-[11px] font-bold text-gray-700 mb-1">
                        {isDe ? "Unternehmen *" : "Company Name *"}
                      </label>
                      <input
                        id="guide_company"
                        name="company"
                        type="text"
                        required
                        autoComplete="organization"
                        value={modalForm.company}
                        onChange={(e) => setModalForm({ ...modalForm, company: e.target.value })}
                        placeholder={isDe ? "Ihr Unternehmen" : "Company Ltd"}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                      />
                      {/* Offscreen aliases for GHL built-in 'Business Name' and custom 'Company name' */}
                      <label htmlFor="guide_company_name" className="sr-only">Company name</label>
                      <input
                        id="guide_company_name"
                        name="company_name"
                        type="text"
                        tabIndex={-1}
                        aria-hidden="true"
                        readOnly
                        value={modalForm.company}
                        style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                      />
                      <label htmlFor="guide_business_name" className="sr-only">Business Name</label>
                      <input
                        id="guide_business_name"
                        name="business_name"
                        type="text"
                        tabIndex={-1}
                        aria-hidden="true"
                        readOnly
                        value={modalForm.company}
                        style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                      />
                    </div>

                    <div>
                      <label htmlFor="guide_job_title" className="block text-[11px] font-bold text-gray-700 mb-1">
                        {isDe ? "Position (optional)" : "Job Title (Optional)"}
                      </label>
                      <input
                        id="guide_job_title"
                        name="job_title"
                        type="text"
                        autoComplete="organization-title"
                        value={modalForm.jobTitle}
                        onChange={(e) => setModalForm({ ...modalForm, jobTitle: e.target.value })}
                        placeholder={isDe ? "z. B. Head of People, COO" : "Head of People, COO"}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-gray-950 hover:bg-[#05434B] text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl transition-all cursor-pointer shadow-md active:scale-[0.99] disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#81D8D0]" />
                        <span>{isDe ? "Wird übermittelt…" : "Submitting…"}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#81D8D0]" />
                        <span>{isDe ? "Leitfaden per E-Mail anfordern" : "Send Me This Guide"}</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-gray-400 text-center mt-1">
                    {isDe
                      ? "Sofortiger Zugang • Keine Kreditkarte erforderlich • 100 % herstellerneutral"
                      : "Instant access • No credit card required • 100% vendor-neutral"}
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
