import { z } from "zod";

// ─────────────────────────────────────────────────────────────
// Shared safe-string patterns
// ─────────────────────────────────────────────────────────────

/** Allows letters (including accented), spaces, hyphens, apostrophes, dots */
const namePattern = /^[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF'.-]+$/;

/** E.164-ish phone: optional +, digits, spaces, dashes, parens, dots */
const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

// ─────────────────────────────────────────────────────────────
// Strict enum sets — MUST exactly match the frontend wizard option IDs
// in frontend/src/data/toolFinderQuestions.ts
// ─────────────────────────────────────────────────────────────

const COMPANY_SIZE_VALUES = ["size_startup", "size_sme", "size_midmarket", "size_enterprise"] as const;

const REGION_VALUES = ["region_dach", "region_uk_europe", "region_global", "region_north_america", "region_mena"] as const;

const CURRENT_STATUS_VALUES = [
  "status_scratch",
  "status_replace_hris",
  "status_dedicated_ats",
  "status_dedicated_perf",
] as const;

const CORE_HR_NEEDS_VALUES = [
  "core_digital_records",
  "core_onboarding",
  "core_compliance",
  "core_signatures",
  "core_org_charts",
  "core_self_service",
] as const;

const PAYROLL_MODEL_VALUES = [
  "payroll_datev",
  "payroll_tax_advisor",
  "payroll_local_eu",
  "payroll_global_eor",
  "payroll_internal",
] as const;

const RECRUITING_NEEDS_VALUES = [
  "ats_multiposting",
  "ats_structured_hiring",
  "ats_candidate_experience",
  "ats_talent_pool",
  "ats_advanced_analytics",
  "ats_templates_signatures",
] as const;

const PERFORMANCE_NEEDS_VALUES = [
  "perf_starting_fresh",
  "perf_360_reviews",
  "perf_okrs",
  "perf_continuous_1on1",
  "perf_compensation",
] as const;

const TIME_ATTENDANCE_VALUES = [
  "time_bag_compliant",
  "time_compliant",
  "time_absence",
  "time_shift_planning",
  "time_project_tracking",
] as const;

const INTEGRATIONS_VALUES = [
  "int_datev",
  "int_payroll",
  "int_expenses",
  "int_active_directory",
  "int_comms",
  "int_slack_teams",
  "int_google_ms",
  "int_erp",
  "int_custom_api",
] as const;

// ─────────────────────────────────────────────────────────────
// Assessment Answers Schema (strict enums matching wizard)
// ─────────────────────────────────────────────────────────────

export const assessmentAnswersSchema = z.object({
  // Step 1
  companySize: z.enum(COMPANY_SIZE_VALUES, {
    errorMap: () => ({ message: "Please select a valid organization size" }),
  }),

  // Step 2 — at least 1, max 5 regions
  regions: z
    .array(z.enum(REGION_VALUES, { errorMap: () => ({ message: "Invalid region value" }) }))
    .min(1, "Please select at least one region")
    .max(5, "Maximum 5 regions allowed"),

  // Step 3
  currentStatus: z.enum(CURRENT_STATUS_VALUES, {
    errorMap: () => ({ message: "Please select a valid HR status" }),
  }),

  // Step 4 — strict enum array
  coreHrNeeds: z
    .array(z.enum(CORE_HR_NEEDS_VALUES, { errorMap: () => ({ message: "Invalid core HR need value" }) }))
    .max(5, "Maximum 5 core HR needs allowed")
    .default([]),

  // Step 5
  payrollModel: z.enum(PAYROLL_MODEL_VALUES, {
    errorMap: () => ({ message: "Please select a valid payroll model" }),
  }),

  // Step 6 — strict enum array
  recruitingNeeds: z
    .array(z.enum(RECRUITING_NEEDS_VALUES, { errorMap: () => ({ message: "Invalid recruiting need value" }) }))
    .max(5, "Maximum 5 recruiting needs allowed")
    .default([]),

  // Step 7 — strict enum array
  performanceNeeds: z
    .array(z.enum(PERFORMANCE_NEEDS_VALUES, { errorMap: () => ({ message: "Invalid performance need value" }) }))
    .max(4, "Maximum 4 performance needs allowed")
    .default([]),

  // Step 8 — strict enum array
  timeAttendanceNeeds: z
    .array(z.enum(TIME_ATTENDANCE_VALUES, { errorMap: () => ({ message: "Invalid time & attendance value" }) }))
    .max(4, "Maximum 4 time & attendance needs allowed")
    .default([]),

  // Step 9 — strict enum array
  integrations: z
    .array(z.enum(INTEGRATIONS_VALUES, { errorMap: () => ({ message: "Invalid integration value" }) }))
    .max(5, "Maximum 5 integrations allowed")
    .default([]),
});

// ─────────────────────────────────────────────────────────────
// Lead Contact Schema
// ─────────────────────────────────────────────────────────────

export const leadContactSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be under 50 characters")
    .regex(namePattern, "First name contains invalid characters"),

  lastName: z
    .string()
    .trim()
    .max(50, "Last name must be under 50 characters")
    .refine((val) => !val || namePattern.test(val), "Last name contains invalid characters")
    .optional()
    .or(z.literal("")),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please enter a valid work email address")
    .max(100, "Email must be under 100 characters")
    .toLowerCase()
    // Block known disposable email domains
    .refine(
      (email) => {
        const blockedDomains = [
          "mailinator.com",
          "guerrillamail.com",
          "10minutemail.com",
          "tempmail.com",
          "throwam.com",
          "yopmail.com",
          "trashmail.com",
          "fakeinbox.com",
        ];
        const domain = email.split("@")[1]?.toLowerCase();
        return !blockedDomains.includes(domain);
      },
      { message: "Please use a valid work email address" }
    ),

  companyName: z
    .string({ required_error: "Company name is required" })
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be under 100 characters"),

  jobTitle: z
    .string()
    .trim()
    .min(2, "Job title must be at least 2 characters")
    .max(80, "Job title must be under 80 characters")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .refine((val) => !val || phonePattern.test(val), "Invalid phone number format")
    .optional()
    .or(z.literal("")),

  comments: z
    .string()
    .trim()
    .max(1000, "Comments must be under 1000 characters")
    // Strip any HTML tags that might slip through sanitisation
    .transform((val) => val.replace(/<[^>]*>/g, "").trim())
    .optional()
    .or(z.literal("")),

  source: z.string().trim().max(100).optional(),
});

// ─────────────────────────────────────────────────────────────
// Combined Tool Finder Assessment Submission
// ─────────────────────────────────────────────────────────────

export const toolFinderAssessmentSubmissionSchema = z.object({
  answers: assessmentAnswersSchema,
  lead: leadContactSchema,
});

// Alias for direct lead routes (contact page, lets-talk)
export const directLeadBodySchema = leadContactSchema;

// ─────────────────────────────────────────────────────────────
// Exported TypeScript types
// ─────────────────────────────────────────────────────────────

export type AssessmentAnswers = z.infer<typeof assessmentAnswersSchema>;
export type LeadContact = z.infer<typeof leadContactSchema>;
export type ToolFinderAssessmentSubmission = z.infer<typeof toolFinderAssessmentSubmissionSchema>;
