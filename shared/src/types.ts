export interface AssessmentAnswers {
  companySize: "size_startup" | "size_sme" | "size_midmarket" | "size_enterprise";
  regions: string[];
  currentStatus: "status_scratch" | "status_replace_hris" | "status_dedicated_ats" | "status_dedicated_perf";
  coreHrNeeds: string[];
  payrollModel: "payroll_datev" | "payroll_tax_advisor" | "payroll_local_eu" | "payroll_global_eor" | "payroll_internal";
  recruitingNeeds: string[];
  performanceNeeds: string[];
  timeAttendanceNeeds: string[];
  integrations: string[];
}

export interface LeadContact {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  jobTitle: string;
  phone?: string;
  comments?: string;
}

export interface ToolRecommendation {
  toolId: string;
  name: string;
  slug: string;
  category: string;
  categoryLabel: string;
  matchPercentage: number;
  badge: string;
  shortDescription: string;
  whyRecommended: string;
  matchedFeatures: string[];
  strengths: string[];
  websiteUrl: string;
  pricingTier?: string | null;
}

export interface ToolFinderResponse {
  success: boolean;
  data?: {
    submissionId: string;
    leadId: string;
    assessmentSummary: {
      primaryFocus: string;
      teamSize: string;
      regionsCount: number;
    };
    answers?: AssessmentAnswers;
    topRecommendations: ToolRecommendation[];
    secondaryRecommendations?: ToolRecommendation[];
    createdAt?: string;
  };
  error?: string;
}
