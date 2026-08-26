export interface SoftwareTool {
  id: string;
  name: string;
  category: "hris" | "recruiting" | "performance" | "other";
  categoryLabel: string;
  description?: string;
  badge?: string;
}

export const softwareCategories = [
  { id: "all", label: "All Integrations" },
  { id: "hris", label: "HRIS & Core HR" },
  { id: "recruiting", label: "Recruiting & ATS" },
  { id: "performance", label: "Performance & Growth" },
  { id: "other", label: "Other Systems" },
] as const;

export const softwareTools: SoftwareTool[] = [
  // HRIS
  { id: "personio", name: "Personio", category: "hris", categoryLabel: "HRIS", description: "All-in-one HR platform for SMEs" },
  { id: "deel", name: "Deel", category: "hris", categoryLabel: "HRIS", description: "Global payroll & compliance platform" },
  { id: "factorial", name: "Factorial", category: "hris", categoryLabel: "HRIS", description: "Intuitive HR management software" },
  { id: "flair", name: "Flair", category: "hris", categoryLabel: "HRIS", description: "Salesforce-native HR suite" },
  { id: "leapsome", name: "Leapsome", category: "hris", categoryLabel: "HRIS & Performance", description: "People enablement & continuous feedback" },
  { id: "shapes", name: "Shapes", category: "hris", categoryLabel: "HRIS", description: "Modern workforce modeling" },
  { id: "tellent-manage", name: "Tellent HR Manage", category: "hris", categoryLabel: "HRIS", description: "Core HR & employee lifecycle" },
  { id: "rippling", name: "Rippling", category: "hris", categoryLabel: "HRIS", description: "Workforce management & IT automation" },
  { id: "bayzat", name: "Bayzat (MENA)", category: "hris", categoryLabel: "HRIS", description: "Work-life platform for the MENA region", badge: "MENA" },

  // Recruiting
  { id: "d-vinci", name: "D.vinci", category: "recruiting", categoryLabel: "Recruiting", description: "Enterprise applicant tracking system" },
  { id: "greenhouse", name: "Greenhouse", category: "recruiting", categoryLabel: "Recruiting", description: "Hiring operating system & ATS" },
  { id: "tellent-recruitee", name: "Tellent Recruitee", category: "recruiting", categoryLabel: "Recruiting", description: "Collaborative hiring & talent acquisition" },
  { id: "teamtailor", name: "Teamtailor", category: "recruiting", categoryLabel: "Recruiting", description: "Employer branding & candidate experience" },
  { id: "ashby", name: "Ashby", category: "recruiting", categoryLabel: "Recruiting", description: "All-in-one recruiting platform" },

  // Performance
  { id: "tellent-grow", name: "Tellent HR Grow", category: "performance", categoryLabel: "Performance", description: "Employee growth & performance management" },
  { id: "leapsome-perf", name: "Leapsome Reviews", category: "performance", categoryLabel: "Performance", description: "Goal tracking, 360° reviews & OKRs" },

  // Other
  { id: "hrcast", name: "HRCast", category: "other", categoryLabel: "Other", description: "HR intelligence & analytics" },
  { id: "gradar", name: "Gradar", category: "other", categoryLabel: "Other", description: "Job evaluation & compensation grading" },
  { id: "hr-autopilot", name: "HR Autopilot", category: "other", categoryLabel: "Other", description: "Automated HR workflow orchestration" },
  { id: "workmotion", name: "Workmotion", category: "other", categoryLabel: "Other", description: "Global talent onboarding & EOR" },
  { id: "zep", name: "ZEP", category: "other", categoryLabel: "Other", description: "Project time tracking & reporting" },
];

export const software = {
  hris: [
    "Personio",
    "Deel",
    "Factorial",
    "Flair",
    "Leapsome",
    "Shapes",
    "Tellent HR Manage",
    "Rippling",
    "Bayzat (MENA)",
  ],
  recruiting: [
    "D.vinci",
    "Greenhouse",
    "Tellent Recruitee",
    "Teamtailor",
    "Ashby",
  ],
  performance: [
    "Tellent HR Grow",
    "Leapsome",
  ],
  other: [
    "HRCast",
    "Gradar",
    "HR Autopilot",
    "Workmotion",
    "ZEP",
  ],
};
