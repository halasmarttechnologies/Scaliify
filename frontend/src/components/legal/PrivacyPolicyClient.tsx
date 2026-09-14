"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ShieldCheck, Mail, MapPin, Phone, FileText } from "lucide-react";

const navSections = [
  { id: "notice", number: "1", title: "Scaliify's Privacy Notice" },
  { id: "dpo", number: "2", title: "Data Protection Officer" },
  { id: "rights", number: "3", title: "Data Subject Rights (GDPR)" },
  { id: "legal-hub", number: "4", title: "Legal Hub & Security" },
  { id: "cookies", number: "5", title: "How We Use Cookies" },
  { id: "transfers", number: "6", title: "International Data Transfers" },
];

const tocItems = [
  { number: "1.", label: "Your data is in good hands with us... - this is why", href: "#good-hands" },
  { number: "2.", label: "We store and process your personal data", href: "#storage-processing" },
  { number: "3.", label: "Trusted third parties who process your data", href: "#third-parties" },
  { number: "4.", label: "International Data Transfers", href: "#transfers-section" },
  { number: "5.", label: "How we use cookies and diagnostics", href: "#cookies-section" },
  { number: "6.", label: "Be informed about your privacy rights", href: "#privacy-rights" },
];

export function PrivacyPolicyClient() {
  const [activeNav, setActiveNav] = useState("notice");

  return (
    <main className="w-full bg-white text-gray-900 font-sans min-h-screen pt-28 sm:pt-36 pb-20 sm:pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Header */}
        <div className="mb-10 sm:mb-14 pb-8 border-b border-gray-200">
          <p className="text-xs font-bold uppercase tracking-widest text-[#05434B] mb-2">
            LEGAL HUB &amp; DATA PRIVACY
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950">
            Privacy Policy
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
                Have questions?
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
            
            {/* Table of Contents Clean Box (Matching Screenshot 1) */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-extrabold text-black mb-4">
                Scaliify&apos;s Privacy Notice
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

            {/* Section 1: Your data is in good hands */}
            <section id="good-hands" className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
              <h3 className="text-lg sm:text-xl font-bold text-black pt-2">
                Your data is in good hands with us... - this is why
              </h3>
              <p>
                Here you can find out how Scaliify (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) handles personal data. The explanations are intended for everyone who visits our website, uses our free HR Tool Finder, interacts with our diagnostic tools, or contacts us for strategic HR advisory, interim management, and system implementation services.
              </p>
              <p>
                Data protection law, in particular the General Data Protection Regulation (GDPR / DSGVO), which is valid in the European Union, is a daily standard for us. As specialists in human resources and organizational technology, the protection of personal and employee data is a core requirement for our business.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200/80 space-y-2 text-xs">
                <p className="font-bold text-black">We are:</p>
                <p className="text-gray-800">Scaliify Consulting</p>
                <p className="text-gray-600">Global Headquarters: Dubai, United Arab Emirates</p>
                <p className="text-gray-600">European Advisory Representative Office: Munich &amp; Berlin, Germany</p>
                <p className="text-gray-600">Email: info@scaliify.com</p>
              </div>

              <p className="font-semibold text-black pt-2">Our core data protection principles:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Transparent data processing:</strong> We disclose all processing activities and purposes openly.</li>
                <li><strong>Data minimization:</strong> We only process data that we genuinely need to deliver our services, diagnostic tools, and advisory.</li>
                <li><strong>Purpose limitation:</strong> We never sell, monetize, or repurpose your information for secondary advertising.</li>
                <li><strong>State-of-the-art security:</strong> Encrypted data transfers (TLS 1.3), access restrictions, and strict European data hosting standards.</li>
              </ul>
            </section>

            {/* Section 2: Storage & Processing */}
            <section id="storage-processing" className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed pt-6 border-t border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-black">
                2. We store and process your personal data
              </h3>
              <p>
                When you interact with our website or use our diagnostic tools (e.g. the HR Tool Finder), we collect only necessary details such as:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>Contact information (e.g., your name, business email address, company name).</li>
                <li>Company operational data (e.g., headcount, software requirements, entity locations).</li>
                <li>Technical server logs (e.g., IP address, browser user-agent, timestamp) for security and fraud prevention.</li>
              </ul>
              <p>
                The legal basis for processing is Art. 6(1)(b) GDPR (performance of a contract or pre-contractual steps) and Art. 6(1)(f) GDPR (our legitimate interest in ensuring website security and delivering high-quality advisory).
              </p>
            </section>

            {/* Section 3: Third Parties */}
            <section id="third-parties" className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed pt-6 border-t border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-black">
                3. Trusted third parties who process your data
              </h3>
              <p>
                We only share personal data with carefully vetted sub-processors bound by strict Data Processing Agreements (DPAs) compliant with Art. 28 GDPR:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li><strong>Hosting &amp; Infrastructure:</strong> European cloud providers with ISO 27001 and SOC 2 Type II certification.</li>
                <li><strong>Communications &amp; Calendaring:</strong> Secure email and scheduling tools used solely to coordinate your requested scoping calls.</li>
              </ul>
            </section>

            {/* Section 4: International Data Transfers */}
            <section id="transfers-section" className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed pt-6 border-t border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-black">
                4. International Data Transfers
              </h3>
              <p>
                While Scaliify is headquartered in Dubai, client diagnostic data and European client project records are handled in strict compliance with Chapter V of the GDPR (Standard Contractual Clauses - SCCs, Adequacy Decisions, and technical encryption safeguards).
              </p>
            </section>

            {/* Section 5: Cookies */}
            <section id="cookies-section" className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed pt-6 border-t border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-black">
                5. How we use cookies and diagnostics
              </h3>
              <p>
                Our website uses technically necessary cookies to maintain session states and save your tool-finder progress locally in your browser. We do not deploy aggressive third-party marketing trackers or ad networks.
              </p>
            </section>

            {/* Section 6: Privacy Rights */}
            <section id="privacy-rights" className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed pt-6 border-t border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-black">
                6. Be informed about your privacy rights
              </h3>
              <p>
                Under Chapter III of the GDPR, you have the following fundamental rights at any time:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li><strong>Right of access (Art. 15 GDPR):</strong> Inquire what personal data we hold about you.</li>
                <li><strong>Right to rectification (Art. 16 GDPR):</strong> Correct inaccurate or incomplete data.</li>
                <li><strong>Right to erasure (Art. 17 GDPR):</strong> Request complete deletion of your data (&ldquo;right to be forgotten&rdquo;).</li>
                <li><strong>Right to restriction of processing (Art. 18 GDPR).</strong></li>
                <li><strong>Right to data portability (Art. 20 GDPR).</strong></li>
                <li><strong>Right to object (Art. 21 GDPR).</strong></li>
              </ul>
              <p>
                To exercise any of these rights, simply email us at{" "}
                <a href="mailto:info@scaliify.com" className="font-bold text-[#05434B] underline">
                  info@scaliify.com
                </a>
                .
              </p>
            </section>

          </div>

        </div>

      </div>
    </main>
  );
}
