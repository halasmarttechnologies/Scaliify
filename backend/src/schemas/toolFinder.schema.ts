import { z } from "zod";

// Safe regex patterns
const namePattern = /^[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF'.-]+$/;
const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

/**
 * Hardened Questionnaire Input Validation Schema
 */
export const assessmentAnswersSchema = z.object({
  // Step 1: Company Size (Strict Enum)
  companySize: z.enum(["size_startup", "size_sme", "size_midmarket", "size_enterprise"], {
    errorMap: () => ({ message: "Please select a valid organization team size" }),
  }),

  // Step 2: Regions (Strict Enum Array with boundary limits)
  regions: z
    .array(z.enum(["region_dach", "region_uk_europe", "region_global", "region_north_america", "region_mena"]))
    .min(1, "Please select at least one primary operating region")
    .max(5, "Maximum 5 operating regions allowed"),

  // Step 3: Current Software Status (Strict Enum)
  currentStatus: z.enum([
    "status_scratch",
    "status_replace_hris",
    "status_dedicated_ats",
    "status_dedicated_perf",
  ]),

  // Step 4: Core HR Administration Requirements (Max 10 items)
  coreHrNeeds: z.array(z.string().trim().max(50)).max(10).default([]),

  // Step 5: Payroll Model (Strict Enum)
  payrollModel: z.enum([
    "payroll_datev",
    "payroll_local_eu",
    "payroll_global_eor",
    "payroll_internal",
  ]),

  // Step 6: Recruiting & ATS Needs (Max 10 items)
  recruitingNeeds: z.array(z.string().trim().max(50)).max(10).default([]),

  // Step 7: Performance & Enablement (Max 10 items)
  performanceNeeds: z.array(z.string().trim().max(50)).max(10).default([]),

  // Step 8: Time & Attendance Needs (Max 10 items)
  timeAttendanceNeeds: z.array(z.string().trim().max(50)).max(10).default([]),

  // Step 9: Critical Integrations (Max 10 items)
  integrations: z.array(z.string().trim().max(50)).max(10).default([]),
});

/**
 * Hardened Lead Contact Form Validation Schema
 */
export const leadContactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be under 50 characters")
    .regex(namePattern, "First name contains invalid characters"),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be under 50 characters")
    .regex(namePattern, "Last name contains invalid characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid work email address")
    .max(100, "Email must be under 100 characters")
    .toLowerCase(),
  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be under 100 characters"),
  jobTitle: z
    .string()
    .trim()
    .min(2, "Job title is required")
    .max(80, "Job title must be under 80 characters"),
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
    .optional()
    .or(z.literal("")),
});

/**
 * Combined Tool Finder Assessment Submission Payload
 */
export const toolFinderAssessmentSubmissionSchema = z.object({
  answers: assessmentAnswersSchema,
  lead: leadContactSchema,
});

export type AssessmentAnswers = z.infer<typeof assessmentAnswersSchema>;
export type LeadContact = z.infer<typeof leadContactSchema>;
export type ToolFinderAssessmentSubmission = z.infer<typeof toolFinderAssessmentSubmissionSchema>;
