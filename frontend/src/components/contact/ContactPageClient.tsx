"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
} from "lucide-react";
import { companies } from "@/data/companies";
import { SupportFromDayOne } from "@/components/common/SupportFromDayOne";
import { submitLead } from "@/lib/api";

const employeeRanges = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "501–2,000 employees",
  "2,000+ employees",
];

const europeanCountries = [
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

export function ContactPageClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    jobTitle: "",
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

    const result = await submitLead({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      companyName: formData.companyName,
      jobTitle: formData.jobTitle,
      phone,
      comments: formData.message || undefined,
      source: "contact_page",
    });

    setIsSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <main className="w-full relative overflow-hidden bg-white">
      {/* ============================================================ */}
      {/* 1. TOP HEADER SECTION (Clean White Background)               */}
      {/* ============================================================ */}
      <div className="w-full pt-28 sm:pt-36 lg:pt-40 pb-6 sm:pb-10 px-4 sm:px-6 text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Main Title (H1) in pure black */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-950 leading-[1.1] mb-4">
          Have a question?<br />Let&apos;s get it answered
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12">
          One of our experts will contact you shortly. Here&apos;s what you can expect:
        </p>

        {/* Three Value Bullets with Tiffany Blue Checkmark Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-center gap-6 sm:gap-10 max-w-2xl w-full text-center">
          {[
            "Schedule time with our advisory team",
            "Hear about case studies from companies like yours",
            "Learn how Scaliify simplifies HR",
          ].map((text) => (
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
                  Thank you!
                </h2>
                <p className="text-sm text-gray-600 max-w-xs mb-6">
                  Your request has been received. A Scaliify consultant will follow up within 1 business day.
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
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Row: First / Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="First Name"
                    aria-label="First name"
                    className="w-full bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all"
                  />
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Last Name"
                    aria-label="Last name"
                    className="w-full bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* Business Email */}
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Business Email Address"
                  aria-label="Business email address"
                  className="w-full bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all"
                />

                {/* Company Name */}
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Company Name"
                  aria-label="Company name"
                  className="w-full bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all"
                />

                {/* Job Title */}
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  placeholder="Job Title"
                  aria-label="Job title"
                  className="w-full bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all"
                />

                {/* Number of Employees */}
                <div className="relative">
                  <select
                    required
                    value={formData.employees}
                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                    aria-label="Number of employees"
                    className="w-full appearance-none bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled>Number of Employees</option>
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

                {/* Country */}
                <div className="relative">
                  <select
                    value={formData.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    aria-label="Country"
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
                      value={formData.dialCode}
                      onChange={(e) => setFormData({ ...formData, dialCode: e.target.value })}
                      aria-label="Dial code"
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
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone Number"
                    aria-label="Phone number"
                    className="flex-1 bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* Message */}
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message"
                  aria-label="Message"
                  className="w-full bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all resize-y"
                />

                {/* Consent */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consentUpdates}
                    onChange={(e) => setFormData({ ...formData, consentUpdates: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-brand-dark cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-gray-600 leading-relaxed cursor-pointer select-none">
                    I&apos;d like to receive Scaliify&apos;s HR tech insights, product updates, and strategic resources. *
                  </label>
                </div>

                {/* Privacy Link */}
                <p className="text-xs text-gray-500">
                  See the{" "}
                  <a href="/privacy" className="underline underline-offset-2 hover:text-gray-900 transition-colors">
                    privacy policy
                  </a>{" "}
                  for more details.
                </p>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-950 text-white text-sm font-bold py-3.5 rounded-2xl hover:bg-brand-dark transition-all mt-1 cursor-pointer active:scale-[0.99]"
                >
                  {isSubmitting ? "Submitting…" : "Submit request"}
                </button>

                {submitError && (
                  <p className="text-sm text-red-600 text-center" role="alert">
                    {submitError}
                  </p>
                )}

                {/* reCAPTCHA Notice */}
                <p className="text-[11px] text-gray-500 text-center leading-relaxed">
                  This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. TRUSTED BY — 4 logos, white bg                           */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
            Trusted by these companies
          </p>
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {companies.slice(0, 4).map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-2xl border border-gray-200/80 hover:border-gray-300 hover:shadow-xs transition-all duration-300 py-4 px-5 flex items-center justify-center min-h-[72px] select-none group"
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
