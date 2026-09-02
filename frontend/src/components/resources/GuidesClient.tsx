"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Download, Filter, Search } from "lucide-react";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";

const guidesList = [
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

const categories = ["All", "Software Selection", "Payroll & Integrations", "Compliance & Legal", "Org Strategy"];

export function GuidesClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = guidesList.filter((guide) => {
    const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="w-full bg-white text-gray-900 font-sans min-h-screen">
      {/* Header */}
      <section className="w-full pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] block mb-3">
            HR PLAYBOOKS &amp; SOFTWARE GUIDES
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 leading-[1.12] mb-4">
            Guides &amp; Checklists
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Free, practical frameworks, implementation checklists, and vendor-neutral decision guides from Scaliify&apos;s senior advisors.
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
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#05434B] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search guides..."
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
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 hover:border-gray-400 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
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

                <Link
                  href="/lets-talk"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Request Playbook</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Lead Section */}
      <BookingLeadSection
        title="Need bespoke playbooks for your team?"
        subtitle="Book a working session with our senior HR operations and legal advisory team."
        badgeTitle="CUSTOM TEMPLATES"
      />

      {/* Blog Section */}
      <BlogSection />
    </main>
  );
}
