"use client";

import React from "react";
import { motion } from "framer-motion";
import { LeadContact } from "@/lib/api";
import { useTranslations, useLocale } from "next-intl";

interface WizardLeadFormProps {
  lead: LeadContact;
  setLead: React.Dispatch<React.SetStateAction<LeadContact>>;
  onSubmit?: (e: React.FormEvent) => void;
}

export function WizardLeadForm({ lead, setLead, onSubmit }: WizardLeadFormProps) {
  const t = useTranslations("toolFinder");
  const locale = useLocale();
  const isDe = locale === "de";

  return (
    <motion.div
      key="step-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-brand-teal uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
            {isDe ? "Empfehlungen berechnet" : "Recommendations Calculated"}
          </span>
          <span className="text-xs text-gray-400 font-semibold">{isDe ? "Letzter Schritt" : "Final Step"}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          {t("wizardLead.heading")}
        </h3>
        <p className="text-gray-300 text-xs sm:text-sm mt-1">
          {t("wizardLead.subtitle")}
        </p>
      </div>

      <form
        id="tool-finder-lead-form"
        data-formid="tool-finder-lead-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) onSubmit(e);
        }}
        className="flex-1 flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="wizard_first_name"
              className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2"
            >
              {t("wizardLead.firstNameLabel")}
            </label>
            <input
              id="wizard_first_name"
              name="first_name"
              type="text"
              required
              autoComplete="given-name"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              placeholder={isDe ? "z. B. Anna" : "Jane"}
              value={lead.firstName}
              onChange={(e) => setLead({ ...lead, firstName: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="wizard_last_name"
              className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2"
            >
              {t("wizardLead.lastNameLabel")}
            </label>
            <input
              id="wizard_last_name"
              name="last_name"
              type="text"
              required
              autoComplete="family-name"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              placeholder={isDe ? "z. B. Müller" : "Doe"}
              value={lead.lastName}
              onChange={(e) => setLead({ ...lead, lastName: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="wizard_email"
              className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2"
            >
              {t("wizardLead.emailLabel")}
            </label>
            <input
              id="wizard_email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              placeholder={isDe ? "anna@unternehmen.de" : "jane@company.com"}
              value={lead.email}
              onChange={(e) => setLead({ ...lead, email: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="wizard_phone"
              className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2"
            >
              {t("wizardLead.phoneLabel")}
            </label>
            <input
              id="wizard_phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              placeholder="+49 151 12345678"
              value={lead.phone}
              onChange={(e) => setLead({ ...lead, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="wizard_company_name"
              className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2"
            >
              {t("wizardLead.companyLabel")}
            </label>
            <input
              id="wizard_company_name"
              name="company_name"
              type="text"
              required
              autoComplete="organization"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              placeholder="Acme Corp GmbH"
              value={lead.companyName}
              onChange={(e) => setLead({ ...lead, companyName: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="wizard_job_title"
              className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2"
            >
              {t("wizardLead.jobTitleLabel")}
            </label>
            <input
              id="wizard_job_title"
              name="job_title"
              type="text"
              autoComplete="organization-title"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              placeholder={isDe ? "z. B. Head of HR" : "Head of HR"}
              value={lead.jobTitle}
              onChange={(e) => setLead({ ...lead, jobTitle: e.target.value })}
            />
          </div>
        </div>

        {/* Hidden native submit button so Enter key triggers form submission */}
        <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1} />
      </form>
    </motion.div>
  );
}
