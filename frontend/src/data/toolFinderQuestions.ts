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
    stepIndicator: "1 of 9",
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
    stepIndicator: "2 of 9",
    title: "Where are your team members located?",
    subtitle: "Ensures compliance with local employment law, working time standards, and payroll processing.",
    field: "regions",
    isMultiSelect: true,
    options: [
      { id: "region_dach", title: "DACH (Germany, Austria, Switzerland)", sub: "Strict GDPR, native DATEV integrations, German employment law standards" },
      { id: "region_uk_europe", title: "UK & Western Europe", sub: "European Union and United Kingdom employment operations" },
      { id: "region_mena", title: "MENA / Middle East", sub: "UAE, Saudi Arabia (WPS compliant payroll and local medical insurance)" },
      { id: "region_global", title: "Global Remote / Distributed", sub: "International hiring across 10+ countries with EOR and contractor needs" },
    ],
  },
  {
    step: 3,
    badge: "Step 03 | Choose One",
    stepIndicator: "3 of 9",
    title: "What is your primary software goal?",
    subtitle: "Are you introducing your first central HR software or implementing a specialized tool?",
    field: "currentStatus",
    isMultiSelect: false,
    options: [
      { id: "status_scratch", title: "Starting Fresh", sub: "Moving from Excel, spreadsheets, shared folders, and email to a centralized platform" },
      { id: "status_replace_hris", title: "Replacing Existing HRIS", sub: "Migrating to a more modern, scalable, and employee-friendly portal" },
      { id: "status_dedicated_ats", title: "Specialist ATS / Recruiting", sub: "Seeking best-of-breed scorecards, multiposting, and candidate CRM" },
      { id: "status_dedicated_perf", title: "Dedicated Performance Tools", sub: "Implementing structured reviews, competency frameworks, and continuous 1:1s" },
    ],
  },
  {
    step: 4,
    badge: "Step 04 | Select All That Apply",
    stepIndicator: "4 of 9",
    title: "Which Core HR Administration features do you need?",
    subtitle: "Select the essential administrative workflows for your team.",
    field: "coreHrNeeds",
    isMultiSelect: true,
    options: [
      { id: "core_digital_records", title: "Digital Personnel Files", sub: "Central secure employee record archive with role-based access permissions" },
      { id: "core_onboarding", title: "Automated On- & Offboarding", sub: "Automated task checklists for HR, IT provisioning, and managers" },
      { id: "core_signatures", title: "Integrated E-Signatures", sub: "Legally compliant digital contract and document signing" },
      { id: "core_self_service", title: "Employee Self-Service Portal", sub: "Central profile updates, document downloads, and company directory" },
    ],
  },
  {
    step: 5,
    badge: "Step 05 | Choose One",
    stepIndicator: "5 of 9",
    title: "How is your payroll managed?",
    subtitle: "Select your accounting workflow or payroll partner model.",
    field: "payrollModel",
    isMultiSelect: false,
    options: [
      { id: "payroll_tax_advisor", title: "Tax Advisor (Steuerberater)", sub: "Monthly payroll coordination directly with your external tax advisor" },
      { id: "payroll_local_eu", title: "Local Payroll Partner", sub: "Outsourced payroll provider running localized monthly gross-net payroll" },
      { id: "payroll_internal", title: "In-House Salary Accounting", sub: "Internal payroll specialist team computing net salaries directly" },
      { id: "payroll_global_eor", title: "Global Employer of Record (EOR)", sub: "Turnkey multi-country hiring without opening local legal entities" },
    ],
  },
  {
    step: 6,
    badge: "Step 06 | Select All That Apply",
    stepIndicator: "6 of 9",
    title: "What are your key Recruiting (ATS) priorities?",
    subtitle: "Select candidate hiring and pipeline capabilities required.",
    field: "recruitingNeeds",
    isMultiSelect: true,
    options: [
      { id: "ats_multiposting", title: "1-Click Job Multiposting", sub: "Publish openings to LinkedIn, Stepstone, Indeed, and Google simultaneously" },
      { id: "ats_structured_hiring", title: "Structured Scorecards & Kits", sub: "Standardized interview evaluations across hiring managers" },
      { id: "ats_candidate_experience", title: "Branded Career Portal", sub: "Candidate self-scheduling links and modern mobile-friendly application flow" },
      { id: "ats_talent_pool", title: "Talent Pool & CRM Sourcing", sub: "GDPR-compliant passive candidate database and pipeline management" },
      { id: "ats_templates_signatures", title: "Standardized Templates & Digital E-Signatures", sub: "Offer letter templates and integrated digital contract signing" },
    ],
  },
  {
    step: 7,
    badge: "Step 07 | Select All That Apply",
    stepIndicator: "7 of 9",
    title: "How do you manage Performance & Employee Growth?",
    subtitle: "Select your desired performance review and goal frameworks.",
    field: "performanceNeeds",
    isMultiSelect: true,
    options: [
      { id: "perf_starting_fresh", title: "Starting from Scratch / No Formal Process", sub: "Currently no formal review system in place; establishing first structured evaluations" },
      { id: "perf_okrs", title: "Company & Team OKRs", sub: "Goal alignment connected directly to company milestones" },
      { id: "perf_continuous_1on1", title: "Continuous 1:1s & Feedback", sub: "Regular check-in templates and real-time manager-employee feedback" },
      { id: "perf_360_reviews", title: "360° Review Cycles", sub: "Structured peer, manager, upward, and self-evaluations" },
    ],
  },
  {
    step: 8,
    badge: "Step 08 | Select All That Apply",
    stepIndicator: "8 of 9",
    title: "What are your Time & Attendance needs?",
    subtitle: "Compliant tracking, leave management, and work schedules.",
    field: "timeAttendanceNeeds",
    isMultiSelect: true,
    options: [
      { id: "time_compliant", title: "Compliant Time Tracking", sub: "Exact clock-in/clock-out timestamps complying with statutory labor regulations" },
      { id: "time_absence", title: "Absence & Vacation Policies", sub: "Accrual rules, public holiday calendars, and manager approval flows" },
      { id: "time_shift_planning", title: "Shift & Rota Scheduling", sub: "Planning complex shift assignments for retail, operations, or production" },
      { id: "time_project_tracking", title: "Project-Based Billable Hours", sub: "Tracking time spent on specific client projects or internal cost centers" },
    ],
  },
  {
    step: 9,
    badge: "Step 09 | Select All That Apply",
    stepIndicator: "9 of 9",
    title: "Which existing systems must integrate seamlessly?",
    subtitle: "Connect your core HR hub with your existing business and financial software.",
    field: "integrations",
    isMultiSelect: true,
    options: [
      { id: "int_payroll", title: "Payroll System", sub: "Bi-directional or automated sync with your salary and payroll provider" },
      { id: "int_expenses", title: "Expense & Travel Management", sub: "Travel bookings, receipt capture, per diems, and expense reimbursements" },
      { id: "int_active_directory", title: "Active Directory / SSO (Azure / Okta / Google)", sub: "Centralized user identity, single sign-on, and automated provisioning" },
      { id: "int_slack_teams", title: "Slack / Microsoft Teams", sub: "Automated birthday alerts, leave notifications, and quick approvals" },
      { id: "int_custom_api", title: "Custom Open API Access", sub: "Developer access for webhooks and proprietary internal tooling" },
    ],
  },
];
