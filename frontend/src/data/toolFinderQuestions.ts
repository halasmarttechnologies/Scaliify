import { AssessmentAnswers } from "@/lib/api";

export interface QuestionOption {
  id: string;
  title: string;
  sub: string;
}

export interface QuestionStepConfig {
  step: number;
  badge: string;
  stepIndicator: string;
  title: string;
  subtitle: string;
  field: keyof AssessmentAnswers;
  isMultiSelect: boolean;
  options: QuestionOption[];
}

export const TOOL_FINDER_QUESTIONS: QuestionStepConfig[] = [
  {
    step: 1,
    badge: "Step 01 | Choose One",
    stepIndicator: "1 of 10",
    title: "How many employees are in your organization?",
    subtitle: "Vendor architecture, pricing models, and compliance modules scale directly with headcount.",
    field: "companySize",
    isMultiSelect: false,
    options: [
      { id: "size_startup", title: "1 – 25 Employees", sub: "Early-stage team prioritizing speed, simple leave, and light HR administration" },
      { id: "size_sme", title: "26 – 100 Employees", sub: "Growing SME standardizing onboarding, German compliance, and payroll export" },
      { id: "size_midmarket", title: "101 – 500 Employees", sub: "Scaling organization requiring custom permission roles, OKRs, and ATS pipeline" },
      { id: "size_enterprise", title: "500+ Employees", sub: "Enterprise requiring multi-entity support, works council workflows, and SSO" },
    ],
  },
  {
    step: 2,
    badge: "Step 02 | Select All That Apply",
    stepIndicator: "2 of 10",
    title: "Where are your team members located?",
    subtitle: "Ensures local labor law compliance, German BAG time regulations, and local payroll compatibility.",
    field: "regions",
    isMultiSelect: true,
    options: [
      { id: "region_dach", title: "DACH (Germany, Austria, Switzerland)", sub: "Strict GDPR, native DATEV integrations, German employment law standards" },
      { id: "region_uk_europe", title: "UK & Western Europe", sub: "European Union and United Kingdom employment operations" },
      { id: "region_global", title: "Global Remote / Distributed", sub: "International hiring across 10+ countries with EOR and contractor needs" },
      { id: "region_north_america", title: "North America", sub: "United States and Canadian corporate entities" },
      { id: "region_mena", title: "MENA / Middle East", sub: "UAE, Saudi Arabia (WPS compliant payroll and local medical insurance)" },
    ],
  },
  {
    step: 3,
    badge: "Step 03 | Choose One",
    stepIndicator: "3 of 10",
    title: "What is your primary software goal?",
    subtitle: "Are you introducing your first central HR software or implementing a specialized tool?",
    field: "currentStatus",
    isMultiSelect: false,
    options: [
      { id: "status_scratch", title: "Starting Fresh", sub: "Moving from spreadsheets, shared folders, and email to a centralized platform" },
      { id: "status_replace_hris", title: "Replacing Existing HRIS", sub: "Migrating to a more modern, scalable, and employee-friendly portal" },
      { id: "status_dedicated_ats", title: "Specialist ATS / Recruiting", sub: "Seeking best-of-breed scorecards, multiposting, and candidate CRM" },
      { id: "status_dedicated_perf", title: "Dedicated Performance & OKRs", sub: "Implementing 360° reviews, competency frameworks, and continuous 1:1s" },
    ],
  },
  {
    step: 4,
    badge: "Step 04 | Select All That Apply",
    stepIndicator: "4 of 10",
    title: "Which Core HR Administration features do you need?",
    subtitle: "Select the essential administrative workflows for your team.",
    field: "coreHrNeeds",
    isMultiSelect: true,
    options: [
      { id: "core_digital_records", title: "Digital Personnel Files", sub: "Central secure employee record archive with role-based access permissions" },
      { id: "core_onboarding", title: "Automated On- & Offboarding", sub: "Automated task checklists for HR, IT provisioning, and managers" },
      { id: "core_compliance", title: "GDPR Compliance & Audit Logs", sub: "Strict European data storage, audit trails, and deletion policies" },
      { id: "core_signatures", title: "Integrated E-Signatures", sub: "Legally compliant digital contract and document signing" },
      { id: "core_org_charts", title: "Dynamic Org Chart & Hierarchies", sub: "Visual direct reports, department trees, and team structures" },
    ],
  },
  {
    step: 5,
    badge: "Step 05 | Choose One",
    stepIndicator: "5 of 10",
    title: "How is your payroll managed?",
    subtitle: "Select your accounting partner workflow or global payroll engine.",
    field: "payrollModel",
    isMultiSelect: false,
    options: [
      { id: "payroll_datev", title: "DATEV / Tax Advisor Export", sub: "Export gross monthly salary data directly to your German Steuerberater" },
      { id: "payroll_local_eu", title: "Local European Payroll Partners", sub: "Direct integration with local country payroll service providers" },
      { id: "payroll_global_eor", title: "Global Employer of Record (EOR)", sub: "Turnkey multi-country hiring without opening local business entities" },
      { id: "payroll_internal", title: "In-House Salary Accounting", sub: "Internal payroll specialist team computing net salaries directly" },
    ],
  },
  {
    step: 6,
    badge: "Step 06 | Select All That Apply",
    stepIndicator: "6 of 10",
    title: "What are your key Recruiting (ATS) priorities?",
    subtitle: "Select candidate hiring and pipeline capabilities required.",
    field: "recruitingNeeds",
    isMultiSelect: true,
    options: [
      { id: "ats_multiposting", title: "1-Click Job Multiposting", sub: "Publish openings to LinkedIn, Stepstone, Indeed, and Google simultaneously" },
      { id: "ats_structured_hiring", title: "Structured Scorecards & Kits", sub: "Standardized interview evaluations across hiring managers" },
      { id: "ats_candidate_experience", title: "Branded Career Portal", sub: "Candidate self-scheduling links and modern mobile-friendly application flow" },
      { id: "ats_talent_pool", title: "Talent Pool & CRM Sourcing", sub: "GDPR-compliant passive candidate database and pipeline management" },
      { id: "ats_advanced_analytics", title: "Recruiting Velocity & Source ROI", sub: "Time-to-hire, offer acceptance rate, and channel conversion analytics" },
    ],
  },
  {
    step: 7,
    badge: "Step 07 | Select All That Apply",
    stepIndicator: "7 of 10",
    title: "How do you manage Performance & Employee Growth?",
    subtitle: "Select your desired performance review and goal frameworks.",
    field: "performanceNeeds",
    isMultiSelect: true,
    options: [
      { id: "perf_360_reviews", title: "360° Review Cycles", sub: "Structured peer, manager, upward, and self-evaluations" },
      { id: "perf_okrs", title: "Company & Team OKRs", sub: "Goal alignment connected directly to individual contribution" },
      { id: "perf_continuous_1on1", title: "Continuous 1:1s & Pulse Surveys", sub: "Regular check-in templates and real-time team engagement sentiment" },
      { id: "perf_compensation", title: "Compensation Benchmarking", sub: "Job leveling, salary bands, and EU pay transparency compliance" },
    ],
  },
  {
    step: 8,
    badge: "Step 08 | Select All That Apply",
    stepIndicator: "8 of 10",
    title: "What are your Time & Attendance needs?",
    subtitle: "Particularly critical for EU companies requiring strict BAG compliance.",
    field: "timeAttendanceNeeds",
    isMultiSelect: true,
    options: [
      { id: "time_bag_compliant", title: "BAG-Compliant Time Tracking", sub: "Exact clock-in/clock-out timestamps complying with EU/German labor courts" },
      { id: "time_absence", title: "Absence & Vacation Policies", sub: "Accrual rules, public holiday calendars, and manager approval flows" },
      { id: "time_shift_planning", title: "Shift & Rota Scheduling", sub: "Planning complex shift assignments for retail, hospitality, or production" },
      { id: "time_project_tracking", title: "Project-Based Billable Hours", sub: "Tracking time spent on specific client projects or internal cost centers" },
    ],
  },
  {
    step: 9,
    badge: "Step 09 | Select All That Apply",
    stepIndicator: "9 of 10",
    title: "Which existing systems must integrate seamlessly?",
    subtitle: "Your HRIS acts as the central source of truth for your entire tech ecosystem.",
    field: "integrations",
    isMultiSelect: true,
    options: [
      { id: "int_datev", title: "DATEV (LODAS / Lohn und Gehalt)", sub: "Native API integration for one-click payroll data exports" },
      { id: "int_slack_teams", title: "Slack / Microsoft Teams", sub: "Automated birthday alerts, leave notifications, and quick approvals" },
      { id: "int_google_ms", title: "Google Workspace / M365", sub: "Active Directory user provisioning, SSO, and calendar syncing" },
      { id: "int_erp", title: "ERP / Accounting (NetSuite, SAP)", sub: "Cost center mapping, journal entries, and financial reconciliation" },
      { id: "int_custom_api", title: "Custom Open API Access", sub: "Developer access for webhooks and proprietary internal tooling" },
    ],
  },
];
