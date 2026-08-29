"use client";

import React from "react";
import { motion } from "framer-motion";
import { LeadContact } from "@/lib/api";

interface WizardLeadFormProps {
  lead: LeadContact;
  setLead: React.Dispatch<React.SetStateAction<LeadContact>>;
}

export function WizardLeadForm({ lead, setLead }: WizardLeadFormProps) {
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
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Step 10 | Final Step</span>
          <span className="text-xs text-gray-400 font-semibold">10 of 10</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Where should we send your results?
        </h3>
        <p className="text-gray-300 text-xs sm:text-sm mt-1">
          We will calculate your personalized software matches instantly on the next screen.
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">First Name *</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              placeholder="Jane"
              value={lead.firstName}
              onChange={(e) => setLead({ ...lead, firstName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Last Name *</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              placeholder="Doe"
              value={lead.lastName}
              onChange={(e) => setLead({ ...lead, lastName: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Work Email *</label>
            <input
              type="email"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              placeholder="jane@company.com"
              value={lead.email}
              onChange={(e) => setLead({ ...lead, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Phone Number</label>
            <input
              type="tel"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              placeholder="+49 151 12345678"
              value={lead.phone}
              onChange={(e) => setLead({ ...lead, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Company Name *</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              placeholder="Acme Corp GmbH"
              value={lead.companyName}
              onChange={(e) => setLead({ ...lead, companyName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Job Title *</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              placeholder="Head of HR"
              value={lead.jobTitle}
              onChange={(e) => setLead({ ...lead, jobTitle: e.target.value })}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
