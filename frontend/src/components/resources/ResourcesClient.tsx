"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Download, FileSpreadsheet, FileText, CheckCircle2, Search } from "lucide-react";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";

const resourcesList = [
  {
    id: "hr-rfp-template",
    category: "RFP Templates",
    title: "Vendor-Neutral HR Software RFP Master Template",
    desc: "A comprehensive 150-point evaluation questionnaire ready to send to vendors (Personio, HiBob, Deel, Factorial, Workday, etc.).",
    format: "Excel / Google Sheets",
    badge: "Template",
    features: [
      "Categorized functional criteria (Core, ATS, Payroll, Time)",
      "Weighted scoring model with automatic vendor rank calculation",
      "Standard pricing comparison and hidden fee check matrix",
    ],
  },
  {
    id: "hr-tech-roi-calculator",
    category: "Calculators",
    title: "HR Tech Stack ROI & Time-Savings Calculator",
    desc: "Quantify administrative hour savings, error reduction in payroll, and recruiter velocity before committing to software budgets.",
    format: "Interactive Sheet",
    badge: "Calculator",
    features: [
      "Cost-per-employee per-month (PEPM) baseline comparison",
      "Internal admin hours reduced per 50 headcount",
      "Executive business case summary sheet",
    ],
  },
  {
    id: "german-contract-kit",
    category: "Legal Kits",
    title: "Employment Contract & Addendum Compliance Kit",
    desc: "Standardized contract templates compliant with current German labor regulations and EU digital workplace directives.",
    format: "Word / PDF Kit",
    badge: "Legal Kit",
    features: [
      "Full-time and part-time standard employment contracts",
      "Remote work & home office agreement addendum",
      "Confidentiality (NDA) and IP assignment clauses",
    ],
  },
  {
    id: "360-review-framework",
    category: "Decision Frameworks",
    title: "360° Review & Performance Cycle Blueprint",
    desc: "Step-by-step framework to launch structured performance evaluations without administrative chaos or employee survey fatigue.",
    format: "PDF & Template",
    badge: "Framework",
    features: [
      "Peer and upward review question library",
      "Rating scale calibration guide for managers",
      "Continuous 1:1 check-in conversation roadmap",
    ],
  },
  {
    id: "datev-hr-integration-blueprint",
    category: "RFP Templates",
    title: "DATEV & HRIS Technical Architecture Blueprint",
    desc: "A visual data mapping diagram detailing how master employee records, monthly variable bonuses, and absences flow directly into DATEV.",
    format: "Architecture PDF",
    badge: "Blueprint",
    features: [
      "ASCII / XML wage data export schema",
      "Standard API webhook trigger architecture",
      "Steuerberater sign-off checklist",
    ],
  },
  {
    id: "people-ops-handbook-template",
    category: "Legal Kits",
    title: "Modern European Employee Handbook Template",
    desc: "An engaging, culturally forward employee handbook covering company values, remote working policies, vacation rules, and benefits.",
    format: "Notion / Doc Template",
    badge: "Template",
    features: [
      "Complete company culture & operating manual template",
      "Parental leave, absence, and wellness policy guidelines",
      "Customizable onboarding welcome section",
    ],
  },
];

const categories = ["All", "RFP Templates", "Calculators", "Legal Kits", "Decision Frameworks"];

export function ResourcesClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resourcesList.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="w-full bg-white text-gray-900 font-sans min-h-screen">
      {/* Header */}
      <section className="w-full pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] block mb-3">
            RFP TEMPLATES &amp; DECISION FRAMEWORKS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 leading-[1.12] mb-4">
            HR Resources
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Free operational templates, vendor selection scoring models, and legal kits curated by our People operations experts.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search resources..."
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
                      {item.badge}
                    </span>
                    <span className="text-[11px] font-medium text-gray-400">
                      {item.format}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-gray-950 leading-snug mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed font-medium mb-5">
                    {item.desc}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-gray-100 mb-6">
                    <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider">
                      Highlights:
                    </p>
                    {item.features.map((feat, idx) => (
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
                  <span>Download Resource Kit</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Lead Section */}
      <BookingLeadSection
        title="Looking for a specific template or evaluation model?"
        subtitle="Our consulting team can share bespoke RFP frameworks and evaluation spreadsheets for your specific tech stack."
        badgeTitle="BESPOKE ASSETS"
      />

      {/* Blog Section */}
      <BlogSection />
    </main>
  );
}
