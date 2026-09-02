export type { AssessmentAnswers, LeadContact, ToolRecommendation, ToolFinderResponse } from "@scaliify/shared";
import type { AssessmentAnswers, LeadContact, ToolFinderResponse } from "@scaliify/shared";
import { calculateRecommendations } from "@scaliify/shared";

/**
 * All API calls go through Next.js server-side proxy routes (/api/proxy/*).
 * This ensures the real backend URL is NEVER exposed in client JavaScript
 * bundles or visible in browser DevTools.
 */
const API_BASE = "/api/proxy";

export function isSafeHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (e) {
    console.warn("isSafeHttpUrl: malformed URL rejected:", url, e);
    return false;
  }
}

export async function submitToolFinderAssessment(
  answers: AssessmentAnswers,
  lead: LeadContact
): Promise<ToolFinderResponse> {
  try {
    const response = await fetch(`${API_BASE}/assess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, lead }),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn("Proxy unreachable, using client-side fallback:", error);
  }

  return generateClientFallbackRecommendations(answers);
}

export interface SubmissionFetchResult {
  status: "SUCCESS" | "NOT_FOUND" | "NETWORK_ERROR";
  data?: NonNullable<ToolFinderResponse["data"]>;
}

export async function fetchToolFinderSubmissionResult(
  submissionId: string
): Promise<SubmissionFetchResult> {
  if (!submissionId || typeof submissionId !== "string") {
    return { status: "NOT_FOUND" };
  }

  if (submissionId.startsWith("local_")) {
    try {
      const stored = sessionStorage.getItem(`toolfinder_${submissionId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Security: validate shape before trusting sessionStorage data
        if (parsed && Array.isArray(parsed.topRecommendations)) {
          return { status: "SUCCESS", data: parsed };
        }
      }
    } catch (e) {
      console.warn("Failed to read local fallback submission from sessionStorage:", e);
    }
    return { status: "NOT_FOUND" };
  }

  try {
    const response = await fetch(`${API_BASE}/submissions/${encodeURIComponent(submissionId)}`, {
      method: "GET",
      headers: { Accept: "application/json" },
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


export interface LeadSubmitResult {
  success: boolean;
  error?: string;
}

export async function submitLead(data: {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  jobTitle?: string;
  phone?: string;
  comments?: string;
  source?: "contact_page" | "lets_talk" | "tool_finder";
}): Promise<LeadSubmitResult> {
  try {
    const response = await fetch(`${API_BASE}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true };
    }

    const body = await response.json().catch(() => null);
    return {
      success: false,
      error: body?.message || `Request failed (${response.status})`,
    };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}

function generateClientFallbackRecommendations(answers: AssessmentAnswers): ToolFinderResponse {
  const result = calculateRecommendations(answers);

  const submissionId = `local_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const leadId = `lead_${Date.now()}`;

  const data = {
    submissionId,
    leadId,
    assessmentSummary: result.assessmentSummary,
    topRecommendations: result.topRecommendations,
    secondaryRecommendations: result.secondaryRecommendations,
  };

  try {
    sessionStorage.setItem(`toolfinder_${submissionId}`, JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to cache fallback submission to sessionStorage:", e);
  }

  return {
    success: true,
    data,
  };
}
