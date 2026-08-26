export interface AssessmentAnswers {
  companySize: "size_startup" | "size_sme" | "size_midmarket" | "size_enterprise";
  regions: string[];
  currentStatus: "status_scratch" | "status_replace_hris" | "status_dedicated_ats" | "status_dedicated_perf";
  coreHrNeeds: string[];
  payrollModel: "payroll_datev" | "payroll_local_eu" | "payroll_global_eor" | "payroll_internal";
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

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

/**
 * Validates that an external URL strictly uses HTTP or HTTPS
 */
export function isSafeHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

// ---------------------------------------------------------
// REFACTOR: Lookup maps replacing brittle string munging
// ---------------------------------------------------------
const STATUS_LABELS: Record<string, string> = {
  status_scratch: "STARTING FROM SCRATCH",
  status_replace_hris: "REPLACING HRIS",
  status_dedicated_ats: "DEDICATED ATS",
  status_dedicated_perf: "DEDICATED PERFORMANCE",
};

const SIZE_LABELS: Record<string, string> = {
  size_startup: "STARTUP (1-50)",
  size_sme: "SME (51-250)",
  size_midmarket: "MIDMARKET (251-1000)",
  size_enterprise: "ENTERPRISE (1000+)",
};

// ---------------------------------------------------------
// REFACTOR: Extract Tool Catalog & Copy from logic
// ---------------------------------------------------------
const TOOL_CATALOG: Omit<ToolRecommendation, 'matchPercentage'>[] = [
  {
    toolId: "personio",
    name: "Personio",
    slug: "personio",
    category: "hris",
    categoryLabel: "All-in-One HRIS",
    badge: "Best Overall for DACH & European SMEs",
    shortDescription: "Europe's leading all-in-one HR software for SMEs from 10 to 2,000 employees.",
    whyRecommended: `Scored highly due to native DATEV integration, German BAG-compliant time recording, automated onboarding workflows, and dedicated German support.`,
    matchedFeatures: [
      "Native DATEV & tax advisor payroll integration",
      "BAG-compliant employee time tracking",
      "Automated onboarding & offboarding workflows",
      "European GDPR compliance & German hosting",
      "Built-in employee document signatures",
    ],
    strengths: ["Flawless DATEV integration", "German compliance standard", "Comprehensive all-in-one suite"],
    websiteUrl: "https://www.personio.com",
    pricingTier: "growth",
  },
  {
    toolId: "deel",
    name: "Deel",
    slug: "deel",
    category: "payroll_eor",
    categoryLabel: "Global HR & Payroll",
    badge: "Best for Global Hiring & EOR",
    shortDescription: "Global payroll, compliance, and Employer of Record (EOR) in 150+ countries.",
    whyRecommended: `Top match for international teams with multi-country contractors, EOR infrastructure, and multi-currency payroll.`,
    matchedFeatures: [
      "Global Employer of Record (EOR) in 150+ countries",
      "Multi-currency contractor payouts & automated invoicing",
      "Cross-border labor law compliance & contracts",
      "Slack & SSO integration",
    ],
    strengths: ["150+ country compliance", "Turnkey international hiring", "Automated contractor taxes"],
    websiteUrl: "https://www.deel.com",
    pricingTier: "growth",
  },
  {
    toolId: "ashby",
    name: "Ashby",
    slug: "ashby",
    category: "recruiting",
    categoryLabel: "Next-Gen All-in-One ATS",
    badge: "Top Choice for High-Growth Tech Hiring",
    shortDescription: "High-performance recruiting platform combining ATS, CRM sourcing, self-scheduling, and deep analytics.",
    whyRecommended: `Highest scoring recruiting system for structured candidate scorecards, automated scheduling, and real-time pipeline BI.`,
    matchedFeatures: [
      "Built-in candidate self-scheduling & calendar sync",
      "Structured interview scorecards & hiring manager kits",
      "Real-time recruiting velocity & source ROI analytics",
      "One-click job board multiposting",
    ],
    strengths: ["Ultra-fast UI", "Powerful built-in analytics", "Eliminates need for separate scheduling tools"],
    websiteUrl: "https://www.ashbyhq.com",
    pricingTier: "growth",
  },
  {
    toolId: "factorial",
    name: "Factorial",
    slug: "factorial",
    category: "hris",
    categoryLabel: "All-in-One HR & Ops",
    badge: "High Usability for Growing Teams",
    shortDescription: "Intuitive all-in-one HR platform for fast-growing small and medium businesses.",
    whyRecommended: "Strong all-around HR management with great shift scheduling, expense tracking, and fast team adoption.",
    matchedFeatures: [
      "Fast 14-day team onboarding",
      "Shift scheduling & overtime tracking",
      "Document management & e-signatures",
      "Mobile employee self-service app",
    ],
    strengths: ["Modern intuitive interface", "Fast setup", "Cost effective"],
    websiteUrl: "https://factorialhr.com",
    pricingTier: "starter",
  },
  {
    toolId: "leapsome",
    name: "Leapsome",
    slug: "leapsome",
    category: "performance",
    categoryLabel: "People Enablement & OKRs",
    badge: "Top Choice for Performance & OKRs",
    shortDescription: "The all-in-one platform for performance reviews, employee engagement, goals & OKRs.",
    whyRecommended: "Best companion for continuous feedback, 360° reviews, and OKR alignment alongside your core HRIS.",
    matchedFeatures: ["360° review cycles", "Company & team OKRs", "1:1 meeting templates", "Pulse engagement surveys"],
    strengths: ["Outstanding performance reviews", "Seamless Slack/Teams integrations"],
    websiteUrl: "https://www.leapsome.com",
    pricingTier: "growth",
  },
  {
    toolId: "greenhouse",
    name: "Greenhouse",
    slug: "greenhouse",
    category: "recruiting",
    categoryLabel: "Enterprise ATS",
    badge: "Benchmark for Structured Hiring",
    shortDescription: "The hiring operating system for structured hiring, talent pipelines, and DE&I analytics.",
    whyRecommended: "Gold standard for mid-market and enterprise structured hiring processes.",
    matchedFeatures: ["Interview kits & scorecards", "Candidate CRM", "DE&I hiring analytics"],
    strengths: ["Enterprise scalability", "Rich integration ecosystem"],
    websiteUrl: "https://www.greenhouse.com",
    pricingTier: "enterprise",
  },
  {
    toolId: "workmotion",
    name: "Workmotion",
    slug: "workmotion",
    category: "payroll_eor",
    categoryLabel: "European Global Talent",
    badge: "European Leader for Global Hiring",
    shortDescription: "European-centric global employment platform for hiring across borders.",
    whyRecommended: "Direct European support with compliant international hiring and contractor onboarding.",
    matchedFeatures: ["Direct European EOR", "Contractor compliance", "Fast multi-country onboarding"],
    strengths: ["European legal perspective", "Direct support"],
    websiteUrl: "https://workmotion.com",
    pricingTier: "growth",
  }
];

// ---------------------------------------------------------
// REFACTOR: Basic Input Validation
// ---------------------------------------------------------
function validateInput(answers: AssessmentAnswers, lead: LeadContact): string | null {
  if (!lead.email || !/^\\S+@\\S+\\.\\S+$/.test(lead.email)) {
    return "Invalid email address.";
  }
  if (!lead.firstName || !lead.lastName || !lead.companyName) {
    return "Missing required lead contact fields.";
  }
  if (!answers.companySize || !answers.currentStatus) {
    return "Missing required assessment answers.";
  }
  return null;
}

/**
 * Submit assessment to backend scoring API
 */
export async function submitToolFinderAssessment(
  answers: AssessmentAnswers,
  lead: LeadContact
): Promise<ToolFinderResponse> {
  const validationError = validateInput(answers, lead);
  if (validationError) {
    return { success: false, error: validationError };
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/tool-finder/assess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers, lead }),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn("Backend API unreachable, using client-side fallback calculation:", error);
  }

  // Client-side fallback calculation ensuring seamless UX even if backend server is not running
  return generateClientFallbackRecommendations(answers);
}

export interface SubmissionFetchResult {
  status: "SUCCESS" | "NOT_FOUND" | "NETWORK_ERROR";
  data?: NonNullable<ToolFinderResponse["data"]>;
}

/**
 * Retrieve a saved assessment submission from backend with detailed status
 */
export async function fetchToolFinderSubmissionResult(
  submissionId: string
): Promise<SubmissionFetchResult> {
  if (!submissionId || typeof submissionId !== "string") {
    return { status: "NOT_FOUND" };
  }

  // REFACTOR: Retrieve local fallback submissions
  if (submissionId.startsWith("local_")) {
    try {
      const stored = sessionStorage.getItem(`toolfinder_${submissionId}`);
      if (stored) {
        return { status: "SUCCESS", data: JSON.parse(stored) };
      }
    } catch {
      // Ignored
    }
    return { status: "NOT_FOUND" };
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/tool-finder/submissions/${encodeURIComponent(submissionId)}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (response.status === 404) {
      return { status: "NOT_FOUND" };
    }

    if (response.ok) {
      const result: ToolFinderResponse = await response.json();
      if (result && result.success && result.data) {
        return { status: "SUCCESS", data: result.data };
      }
    }

    return { status: "NETWORK_ERROR" };
  } catch (error) {
    console.warn("Backend API unreachable for submission verification:", error);
    return { status: "NETWORK_ERROR" };
  }
}

/**
 * Retrieve a saved assessment submission from backend by UUID
 */
export async function getToolFinderSubmission(
  submissionId: string
): Promise<ToolFinderResponse | null> {
  const result = await fetchToolFinderSubmissionResult(submissionId);
  if (result.status === "SUCCESS" && result.data) {
    return {
      success: true,
      data: result.data,
    };
  }
  return null;
}

/**
 * Robust client-side recommendation calculation fallback
 */
function generateClientFallbackRecommendations(answers: AssessmentAnswers): ToolFinderResponse {
  const isDach = answers.regions.includes("region_dach");
  const isGlobal = answers.regions.includes("region_global");
  const isDatev = answers.payrollModel === "payroll_datev";
  const isEor = answers.payrollModel === "payroll_global_eor";
  const isAtsFocus = answers.currentStatus === "status_dedicated_ats";
  const isPerfFocus = answers.currentStatus === "status_dedicated_perf";

  // REFACTOR: Real scoring based on answers
  const scoredTools = TOOL_CATALOG.map((tool) => {
    let score = 50; // Base score

    if (tool.toolId === "personio") {
      if (isDach) score += 20;
      if (isDatev) score += 27;
      if (!isAtsFocus && !isPerfFocus && !isEor) score += 15;
    } else if (tool.toolId === "deel") {
      if (isEor) score += 45;
      if (isGlobal) score += 20;
    } else if (tool.toolId === "ashby") {
      if (isAtsFocus) score += 45;
      if (answers.recruitingNeeds.length > 2) score += 20;
    } else if (tool.toolId === "factorial") {
      if (!isDach && !isEor && !isAtsFocus && !isPerfFocus) score += 37;
      if (answers.companySize === "size_startup" || answers.companySize === "size_sme") score += 10;
    } else if (tool.toolId === "leapsome") {
      if (isPerfFocus) score += 45;
      if (answers.performanceNeeds.length > 0) score += 20;
    } else if (tool.toolId === "greenhouse") {
      if (isAtsFocus) score += 32;
      if (answers.companySize === "size_midmarket" || answers.companySize === "size_enterprise") score += 20;
    } else if (tool.toolId === "workmotion") {
      if (isEor) score += 29;
      if (isDach || answers.regions.includes("region_eu")) score += 10;
    }

    // Clamp score to max 99
    score = Math.min(score, 99);

    return { ...tool, matchPercentage: score };
  });

  // Sort descending by matchPercentage
  scoredTools.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Filter tools with unsafe URLs
  const safeTools = scoredTools.filter((tool) => {
    const isSafe = isSafeHttpUrl(tool.websiteUrl);
    if (!isSafe) {
      console.warn(`Tool ${tool.toolId} excluded due to unsafe URL: ${tool.websiteUrl}`);
    }
    return isSafe;
  });

  const top = safeTools.slice(0, 3);
  const secondary = safeTools.slice(3, 6);

  const submissionId = `local_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const leadId = `lead_${Date.now()}`;

  const data = {
    submissionId,
    leadId,
    assessmentSummary: {
      primaryFocus: STATUS_LABELS[answers.currentStatus] || answers.currentStatus.replace("status_", "").replace("_", " ").toUpperCase(),
      teamSize: SIZE_LABELS[answers.companySize] || answers.companySize.replace("size_", "").toUpperCase(),
      regionsCount: answers.regions.length,
    },
    topRecommendations: top,
    secondaryRecommendations: secondary,
  };

  // Cache locally
  try {
    sessionStorage.setItem(`toolfinder_${submissionId}`, JSON.stringify(data));
  } catch {
    // Ignored
  }

  return {
    success: true,
    data,
  };
}
