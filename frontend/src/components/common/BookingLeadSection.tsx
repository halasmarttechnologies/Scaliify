"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
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
import { submitLead } from "@/lib/api";

interface BookingLeadSectionProps {
  title?: string;
  subtitle?: string;
  badgeTitle?: string;
  source?: string;
}

export function BookingLeadSection({
  title,
  subtitle,
  badgeTitle,
  source = "consultation_call",
}: BookingLeadSectionProps) {
  const t = useTranslations("bookingLead");
  const locale = useLocale();
  const isDe = locale === "de";

  const displayBadgeTitle = badgeTitle ?? t("defaultBadge");
  const displayTitle = title ?? t("defaultTitle");
  const displaySubtitle = subtitle ?? t("defaultSubtitle");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    companyName: "",
    employees: "10–50",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.firstName) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitLead({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      companyName: formData.companyName,
      jobTitle: formData.jobTitle || undefined,
      phone: formData.phone || undefined,
      comments: `Team size: ${formData.employees}`,
      source,
    });

    setIsSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error || "Submission failed. Please try again.");
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
              {t("expectHeading")}
            </p>
            <ul className="space-y-3.5 text-xs sm:text-sm text-gray-800 font-medium">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#81D8D0]/40 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>{t("expect1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#81D8D0]/40 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>{t("expect2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#81D8D0]/40 text-[#05434B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>{t("expect3")}</span>
              </li>
            </ul>
          </div>

          {/* Trust Badges 3 Pillars in One Row */}
          <div>
            <p className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              {t("trustHeading")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-lg">
              <div className="bg-white rounded-xl p-2.5 border border-gray-200/80 shadow-2xs flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#05434B] text-[#81D8D0] flex items-center justify-center shrink-0 font-bold text-xs">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-900 leading-tight">{t("trustBadge1Title")}</p>
                  <p className="text-[9px] text-gray-500 font-medium">{t("trustBadge1Sub")}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-2.5 border border-gray-200/80 shadow-2xs flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#5BC7BC] text-[#05434B] flex items-center justify-center shrink-0 font-bold text-xs">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-900 leading-tight">{t("trustBadge2Title")}</p>
                  <p className="text-[9px] text-gray-500 font-medium">{t("trustBadge2Sub")}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-2.5 border border-gray-200/80 shadow-2xs flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#05434B] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-900 leading-tight">{t("trustBadge3Title")}</p>
                  <p className="text-[9px] text-gray-500 font-medium">{t("trustBadge3Sub")}</p>
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
                  {t("successHeading", { firstName: formData.firstName })}
                </h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed mb-6">
                  {t("successMessage")}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#05434B] hover:underline"
                >
                  {t("submitAnother")}
                </button>
              </motion.div>
            ) : (
              <form id="booking-lead-form" data-formid="Booking Consultation Form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="booking_first_name" className="block text-xs font-bold text-gray-800 mb-1">
                      {t("firstNameLabel")}
                    </label>
                    <input
                      id="booking_first_name"
                      name="first_name"
                      type="text"
                      required
                      autoComplete="given-name"
                      placeholder={t("firstNamePlaceholder")}
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking_last_name" className="block text-xs font-bold text-gray-800 mb-1">
                      {t("lastNameLabel")}
                    </label>
                    <input
                      id="booking_last_name"
                      name="last_name"
                      type="text"
                      required
                      autoComplete="family-name"
                      placeholder={t("lastNamePlaceholder")}
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="booking_email" className="block text-xs font-bold text-gray-800 mb-1">
                    {t("emailLabel")}
                  </label>
                  <input
                    id="booking_email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="booking_company" className="block text-xs font-bold text-gray-800 mb-1">
                    {t("companyLabel")}
                  </label>
                  <input
                    id="booking_company"
                    name="company"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder={t("companyPlaceholder")}
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                  />
                  {/* Offscreen aliases for GHL built-in 'Business Name' and custom 'Company name' */}
                  <label htmlFor="booking_company_name" className="sr-only">Company name</label>
                  <input
                    id="booking_company_name"
                    name="company_name"
                    type="text"
                    tabIndex={-1}
                    aria-hidden="true"
                    readOnly
                    value={formData.companyName}
                    style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                  />
                  <label htmlFor="booking_business_name" className="sr-only">Business Name</label>
                  <input
                    id="booking_business_name"
                    name="business_name"
                    type="text"
                    tabIndex={-1}
                    aria-hidden="true"
                    readOnly
                    value={formData.companyName}
                    style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                  />
                  <label htmlFor="booking_companyName" className="sr-only">Company Name</label>
                  <input
                    id="booking_companyName"
                    name="companyName"
                    type="text"
                    tabIndex={-1}
                    aria-hidden="true"
                    readOnly
                    value={formData.companyName}
                    style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                  />
                </div>

                <div>
                  <label htmlFor="booking_job_title" className="block text-xs font-bold text-gray-800 mb-1">
                    {t("jobTitleLabel")}
                  </label>
                  <input
                    id="booking_job_title"
                    name="job_title"
                    type="text"
                    autoComplete="organization-title"
                    placeholder={t("jobTitlePlaceholder")}
                    value={formData.jobTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, jobTitle: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="booking_number_of_employees" className="block text-xs font-bold text-gray-800 mb-1">
                    {t("employeesLabel")}
                  </label>
                  <select
                    id="booking_number_of_employees"
                    name="number_of_employees"
                    value={formData.employees}
                    onChange={(e) =>
                      setFormData({ ...formData, employees: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors cursor-pointer"
                  >
                    <option value="10–50">{t("employeeOptions.10_50")}</option>
                    <option value="50–100">{t("employeeOptions.50_100")}</option>
                    <option value="100–250">{t("employeeOptions.100_250")}</option>
                    <option value="250–500">{t("employeeOptions.250_500")}</option>
                    <option value="500+">{t("employeeOptions.500_plus")}</option>
                  </select>
                  {/* Offscreen aliases for GHL custom field matching */}
                  <label htmlFor="booking_employees" className="sr-only">Number of employees</label>
                  <input
                    id="booking_employees"
                    name="employees"
                    type="text"
                    tabIndex={-1}
                    aria-hidden="true"
                    readOnly
                    value={formData.employees}
                    style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                  />
                  <label htmlFor="booking_numberOfEmployees" className="sr-only">Number of Employees</label>
                  <input
                    id="booking_numberOfEmployees"
                    name="numberOfEmployees"
                    type="text"
                    tabIndex={-1}
                    aria-hidden="true"
                    readOnly
                    value={formData.employees}
                    style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                  />
                </div>

                <div>
                  <label htmlFor="booking_phone" className="block text-xs font-bold text-gray-800 mb-1">
                    {t("phoneLabel")}
                  </label>
                  <input
                    id="booking_phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={t("phonePlaceholder")}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#05434B] transition-colors"
                  />
                </div>

                <p className="text-[10.5px] text-gray-500 leading-relaxed pt-1">
                  {t("consentText")}{" "}
                  <Link href="/privacy" className="underline hover:text-black">
                    {t("consentPrivacy")}
                  </Link>
                  {t("consentEnd")}
                </p>

                {submitError && (
                  <p className="text-xs text-red-600 text-center">{submitError}</p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep text-brand-dark text-sm font-bold py-3.5 rounded-xl sm:rounded-2xl shadow-[0_4px_18px_rgba(129,216,208,0.55)] hover:brightness-105 transition-all cursor-pointer active:scale-[0.98] border border-white/80 overflow-hidden disabled:opacity-70"
                  >
                    <span className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent rounded-t-2xl pointer-events-none" />
                    <span className="relative z-10">
                      {isSubmitting ? (isDe ? "Wird gesendet…" : "Submitting…") : t("submitButton")}
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
