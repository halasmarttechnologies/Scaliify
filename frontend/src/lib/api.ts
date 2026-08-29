export type { AssessmentAnswers, LeadContact, ToolRecommendation, ToolFinderResponse } from "@scaliify/shared";
import type { AssessmentAnswers, LeadContact, ToolFinderResponse } from "@scaliify/shared";
import { calculateRecommendations } from "@scaliify/shared";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

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
        return { status: "SUCCESS", data: JSON.parse(stored) };
      }
    } catch (e) {
      console.warn("Failed to read local fallback submission from sessionStorage:", e);
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
