"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  Check,
  CheckCircle2,
  ShieldCheck,
  Award,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface BookingLeadSectionProps {
  title?: string;
  subtitle?: string;
  badgeTitle?: string;
}

export function BookingLeadSection({
  title,
  subtitle,
  badgeTitle,
}: BookingLeadSectionProps) {
  const locale = useLocale();
  const isDe = locale === "de";

  const displayBadgeTitle =
    badgeTitle ?? (isDe ? "ERSTGESPRÄCH & BERATUNG" : "DISCOVERY & CONSULTATION");
  const displayTitle =
    title ?? (isDe ? "Erleben Sie Scaliify in Aktion" : "See Scaliify in action");
  const displaySubtitle =
    subtitle ??
    (isDe
      ? "Tragen Sie Ihre Kontaktdaten ein, um ein persönliches Beratungsgespräch mit unseren People- & HR-Tech-Expert:innen zu vereinbaren."
      : "Fill in your details to book a consultation call with one of our People & HR technology experts.");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    employees: "10–50",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.firstName) {
      setSubmitted(true);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-white via-[#81D8D0]/10 to-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100 relative overflow-hidden">
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(circle,rgba(129,216,208,0.25)_0%,transparent_70%)] pointer-events-none blur-3xl -z-0" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        {/* Left Column: Heading & Value Proposition */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] mb-3">
            {displayBadgeTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-[1.14] mb-4">
            {displayTitle}
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-8 max-w-lg font-medium">
            {displaySubtitle}
          </p>

          <div className="mb-8">
            <p className="text-xs sm:text-sm font-bold text-gray-950 uppercase tracking-wider mb-4">
              {isDe ? "Das erwartet Sie:" : "Here's what to expect:"}
            </p>
            <ul className="space-y-3.5 text-xs sm:text-sm text-gray-800 font-medium">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#81D8D0]/40 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>
                  {isDe
                    ? "Ein unverbindlicher Walkthrough durch Ihr bestehendes HR-Setup"
                    : "A no-commitment discovery walkthrough of your HR ecosystem"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#81D8D0]/40 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>
                  {isDe
                    ? "Fokus auf die dringendsten Prioritäten und Zeitpläne Ihres Teams"
                    : "Discussion built around your team's top priorities and timeline"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#81D8D0]/40 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>
                  {isDe
                    ? "Direkte, ehrliche Antworten von erfahrenen HR- & Tech-Praktikern"
                    : "Direct, honest answers from senior HR & tech practitioners"}
                </span>
              </li>
            </ul>
          </div>

          {/* Trust Badges 2x2 Grid */}
          <div>
            <p className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              {isDe
                ? "Unabhängige Expertise, der europäische Führungskräfte vertrauen:"
                : "Independent expertise European leaders trust:"}
            </p>
            <div className="grid grid-cols-2 gap-2.5 w-full max-w-md">
              <div className="bg-white rounded-xl p-2.5 border border-gray-200/80 shadow-2xs flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#05434B] text-[#81D8D0] flex items-center justify-center shrink-0 font-bold text-xs">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-900 leading-tight">Top HR Advisory</p>
                  <p className="text-[9px] text-gray-500 font-medium">SPRING 2026</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-2.5 border border-gray-200/80 shadow-2xs flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#5BC7BC] text-[#05434B] flex items-center justify-center shrink-0 font-bold text-xs">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-900 leading-tight">&gt;100 Specialists</p>
                  <p className="text-[9px] text-gray-500 font-medium">{isDe ? "GEPRÜFTES NETZWERK" : "VETTED NETWORK"}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-2.5 border border-gray-200/80 shadow-2xs flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#05434B] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-900 leading-tight">{isDe ? "100 % Herstellerneutral" : "100% Vendor-Neutral"}</p>
                  <p className="text-[9px] text-gray-500 font-medium">{isDe ? "KEINE PROVISIONEN" : "ZERO COMMISSIONS"}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-2.5 border border-gray-200/80 shadow-2xs flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#5BC7BC] to-[#81D8D0] text-[#05434B] flex items-center justify-center shrink-0 font-bold text-xs">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-900 leading-tight">{isDe ? "96 % Erfolgsquote" : "96% Outcome Rate"}</p>
                  <p className="text-[9px] text-gray-500 font-medium">{isDe ? "ERFOLGREICH ERREICHT" : "MILESTONES DELIVERED"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lead Capture Form Card */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-gray-200/90 relative">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#81D8D0]/30 text-[#05434B] flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-extrabold text-black mb-2">
                  {isDe ? `Vielen Dank, ${formData.firstName}!` : `Thank you, ${formData.firstName}!`}
                </h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed mb-6">
                  {isDe
                    ? "Wir haben Ihre Angaben erhalten. Ein Senior-Partner von Scaliify wird sich innerhalb von 24 Stunden bei Ihnen melden, um das Erstgespräch zu koordinieren."
                    : "We have received your details. A senior Scaliify partner will contact you within 24 hours to coordinate your consultation call."}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#05434B] hover:underline"
                >
                  {isDe ? "Weitere Anfrage senden" : "Submit another inquiry"}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      {isDe ? "Vorname *" : "First Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isDe ? "z.B. Alex" : "e.g. Alex"}
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      {isDe ? "Nachname *" : "Last Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isDe ? "z.B. Müller" : "e.g. Müller"}
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    {isDe ? "Geschäftliche E-Mail-Adresse *" : "Business Email Address *"}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    {isDe ? "Unternehmensname *" : "Company Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isDe ? "z.B. TechCorp GmbH" : "e.g. TechCorp GmbH"}
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    {isDe ? "Mitarbeiteranzahl *" : "Number of Employees *"}
                  </label>
                  <select
                    value={formData.employees}
                    onChange={(e) =>
                      setFormData({ ...formData, employees: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors cursor-pointer"
                  >
                    <option value="10–50">{isDe ? "10–50 Mitarbeitende" : "10–50 employees"}</option>
                    <option value="50–100">{isDe ? "50–100 Mitarbeitende" : "50–100 employees"}</option>
                    <option value="100–250">{isDe ? "100–250 Mitarbeitende" : "100–250 employees"}</option>
                    <option value="250–500">{isDe ? "250–500 Mitarbeitende" : "250–500 employees"}</option>
                    <option value="500+">{isDe ? "500+ Mitarbeitende" : "500+ employees"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    {isDe ? "Telefonnummer (Optional)" : "Phone Number (Optional)"}
                  </label>
                  <input
                    type="tel"
                    placeholder="+49 170 1234567"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                  />
                </div>

                <p className="text-[10.5px] text-gray-500 leading-relaxed pt-1">
                  {isDe ? (
                    <>
                      Mit dem Absenden stimmen Sie unserer{" "}
                      <Link href="/privacy" className="underline hover:text-black">
                        Datenschutzerklärung
                      </Link>{" "}
                      zu. Sie können Ihre Einwilligung jederzeit widerrufen.
                    </>
                  ) : (
                    <>
                      By submitting this form, you agree to our{" "}
                      <Link href="/privacy" className="underline hover:text-black">
                        privacy policy
                      </Link>
                      . You may revoke consent at any time.
                    </>
                  )}
                </p>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep text-brand-dark text-sm font-bold py-3.5 rounded-xl sm:rounded-2xl shadow-[0_4px_18px_rgba(129,216,208,0.55)] hover:brightness-105 transition-all cursor-pointer active:scale-[0.98] border border-white/80 overflow-hidden"
                  >
                    <span className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent rounded-t-2xl pointer-events-none" />
                    <span className="relative z-10">
                      {isDe ? "Kostenloses Erstgespräch anfordern" : "Book your free scoping call"}
                    </span>
                    <ArrowRight className="relative z-10 w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
