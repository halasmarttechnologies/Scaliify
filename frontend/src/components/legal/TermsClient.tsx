"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Mail, ArrowRight, ShieldCheck, FileText } from "lucide-react";

const navSections = [
  { id: "scope", number: "1", title: "Scope & Applicability" },
  { id: "services", number: "2", title: "Advisory & Services" },
  { id: "neutrality", number: "3", title: "Vendor Neutrality" },
  { id: "remuneration", number: "4", title: "Engagement & Payment" },
  { id: "confidentiality", number: "5", title: "Confidentiality & IP" },
  { id: "liability", number: "6", title: "Liability & Jurisdiction" },
];

const tocItems = [
  { number: "1.", label: "General scope, contractual partners and definitions", href: "#scope" },
  { number: "2.", label: "Provision of advisory, selection and interim services", href: "#services" },
  { number: "3.", label: "Independence, vendor neutrality and objective scoring", href: "#neutrality" },
  { number: "4.", label: "Payment terms, retainers, and pay-as-you-go billing", href: "#remuneration" },
  { number: "5.", label: "Non-disclosure, data security and intellectual property", href: "#confidentiality" },
  { number: "6.", label: "Limitation of liability, applicable law and legal venue", href: "#liability" },
];

export function TermsClient() {
  const [activeNav, setActiveNav] = useState("scope");

  return (
    <main className="w-full bg-white text-gray-900 font-sans min-h-screen pt-28 sm:pt-36 pb-20 sm:pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Header */}
        <div className="mb-10 sm:mb-14 pb-8 border-b border-gray-200">
          <p className="text-xs font-bold uppercase tracking-widest text-[#05434B] mb-2">
            LEGAL HUB &amp; SERVICE AGREEMENT
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
            Last Updated: January 2026 • Effective Date: January 1, 2026
          </p>
        </div>

        {/* 2-Column Layout Matching Reference Screenshot 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Numbered Sticky Navigation List */}
          <aside className="lg:col-span-4 sticky top-28 space-y-1.5 hidden lg:block">
            <div className="border-l-2 border-gray-200 pl-4 py-1 space-y-2">
              {navSections.map((sec) => {
                const isActive = activeNav === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveNav(sec.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#eaf7f5] text-[#05434B] border border-[#76D8C8]/50"
                        : "text-gray-600 hover:text-black hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-gray-400 font-bold">{sec.number}</span>
                    <span>{sec.title}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 px-4">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Questions about our terms?
              </p>
              <a
                href="mailto:info@scaliify.com"
                className="text-xs font-semibold text-[#05434B] hover:underline flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>info@scaliify.com</span>
              </a>
            </div>
          </aside>

          {/* Right Column: Main Legal Content Body */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Table of Contents Clean Box */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-extrabold text-black mb-4">
                Scaliify Terms of Service Overview
              </h2>
              <ol className="space-y-3">
                {tocItems.map((item) => (
                  <li key={item.number} className="flex items-start gap-3 text-xs sm:text-sm">
                    <span className="font-bold text-gray-400">{item.number}</span>
                    <a
                      href={item.href}
                      className="text-gray-900 font-medium hover:text-[#05434B] hover:underline transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Section 1 */}
            <section id="scope" className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
              <h3 className="text-lg sm:text-xl font-bold text-black pt-2">
                1. General Scope, Contractual Partners and Definitions
              </h3>
              <p>
                These General Terms and Conditions (&ldquo;GTC&rdquo;) govern all consulting agreements, strategic sparring sessions, software benchmarking audits, implementation projects, and interim management assignments conducted by Scaliify (&ldquo;Consultant&rdquo;) for corporate clients (&ldquo;Client&rdquo;).
              </p>
              <p>
                Any terms and conditions of the Client that deviate from or conflict with these GTC shall not apply unless explicitly agreed to in writing by an authorized representative of Scaliify.
              </p>
            </section>

            {/* Section 2 */}
            <section id="services" className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed pt-6 border-t border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-black">
                2. Provision of Advisory, Selection and Interim Services
              </h3>
              <p>
                Scaliify provides professional consulting services including but not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>Vendor-neutral HR technology evaluation, selection, and RFP management.</li>
                <li>System implementation, workflow optimization, and DATEV/payroll integrations.</li>
                <li>Outsourced HR management and People operations.</li>
                <li>Interim HR leadership placement through our vetted network of &gt;100 specialists.</li>
                <li>Strategic People Advisory on org design, compensation leveling, and works council topics.</li>
              </ul>
              <p>
                Unless explicitly agreed in a Statement of Work (SOW) as a specific work product deliverable, consulting services are rendered as service contracts (Dienstvertrag), characterized by the skilled application of expertise rather than guaranteed commercial results.
              </p>
            </section>

            {/* Section 3 */}
            <section id="neutrality" className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed pt-6 border-t border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-black">
                3. Independence, Vendor Neutrality and Objective Scoring
              </h3>
              <p>
                Scaliify operates as a 100% vendor-neutral consultancy. We do not accept commissions, kickbacks, referral bounties, or affiliate payments from HR software vendors. Our software recommendations are based strictly on the Client&apos;s functional requirements, technical architecture, and commercial priorities.
              </p>
            </section>

            {/* Section 4 */}
            <section id="remuneration" className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed pt-6 border-t border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-black">
                4. Payment Terms, Retainers, and Pay-As-You-Go Billing
              </h3>
              <p>
                Consulting fees are calculated on a fixed-fee, retained hourly, or day-rate basis as defined in the applicable project agreement. All invoices are due within 14 calendar days from the invoice date without deductions, unless otherwise agreed.
              </p>
            </section>

            {/* Section 5 */}
            <section id="confidentiality" className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed pt-6 border-t border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-black">
                5. Non-Disclosure, Data Security and Intellectual Property
              </h3>
              <p>
                Both parties agree to treat all commercial, technical, and employee data disclosed during the engagement as strictly confidential. Client retains ownership of all internal operational data. Scaliify retains ownership of proprietary benchmarking frameworks, diagnostic assessment toolkits, and generic advisory methodologies.
              </p>
            </section>

            {/* Section 6 */}
            <section id="liability" className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed pt-6 border-t border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-black">
                6. Limitation of Liability, Applicable Law and Legal Venue
              </h3>
              <p>
                Scaliify is liable for damages arising from intentional misconduct or gross negligence. For slight negligence, liability is limited to foreseeable direct damages typical for the contract, capped at the total fee paid for the specific assignment.
              </p>
              <p>
                These Terms and Conditions and all underlying agreements are governed by applicable substantive law. For European engagements, place of jurisdiction is agreed upon in the respective Statement of Work.
              </p>
            </section>

          </div>

        </div>

      </div>
    </main>
  );
}
