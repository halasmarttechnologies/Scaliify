"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  AssessmentAnswers,
  LeadContact,
  ToolFinderResponse,
  submitToolFinderAssessment,
  fetchToolFinderSubmissionResult,
} from "@/lib/api";

export type AssessmentStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface PersistedInProgressState {
  currentStep: number;
  answers: AssessmentAnswers;
  leadDraft?: Partial<LeadContact>;
  lastUpdated: number;
}

const STORAGE_IN_PROGRESS_KEY = "scaliify_tool_finder_in_progress";
const STORAGE_SUBMISSION_ID_KEY = "scaliify_tool_finder_submission_id";
const STORAGE_COMPLETED_RESULT_KEY = "scaliify_tool_finder_completed_result";
const DRAFT_TTL_MS = 24 * 60 * 60 * 1000;

export const DEFAULT_ANSWERS: AssessmentAnswers = {
  companySize: "size_sme",
  regions: ["region_dach"],
  currentStatus: "status_scratch",
  coreHrNeeds: ["core_digital_records", "core_onboarding", "core_compliance"],
  payrollModel: "payroll_datev",
  recruitingNeeds: ["ats_multiposting", "ats_structured_hiring"],
  performanceNeeds: ["perf_360_reviews", "perf_okrs"],
  timeAttendanceNeeds: ["time_bag_compliant", "time_absence"],
  integrations: ["int_datev", "int_slack_teams"],
};

export const DEFAULT_LEAD: LeadContact = {
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  jobTitle: "",
  phone: "",
};

export function useToolFinderPersistence() {
  const [status, setStatus] = useState<AssessmentStatus>("NOT_STARTED");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>(DEFAULT_ANSWERS);
  const [lead, setLead] = useState<LeadContact>(DEFAULT_LEAD);
  const [results, setResults] = useState<ToolFinderResponse["data"] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isInitializedRef = useRef<boolean>(false);
  const isSubmittingRef = useRef<boolean>(false);

  // 1. On Mount: Bulletproof state restoration with instant local hydration + async PostgreSQL verification
  useEffect(() => {
    let isCancelled = false;

    async function restoreState() {
      if (typeof window === "undefined") return;

      try {
        const urlParams = new URLSearchParams(window.location.search);
        const querySubmissionId = urlParams.get("submission");
        const storedSubmissionId = localStorage.getItem(STORAGE_SUBMISSION_ID_KEY);
        const submissionId = querySubmissionId || storedSubmissionId;

        // A. Check for cached completed result first (for instant 0ms hydration on reload)
        const rawCachedCompleted = localStorage.getItem(STORAGE_COMPLETED_RESULT_KEY);
        let hasCachedCompleted = false;

        if (rawCachedCompleted) {
          try {
            const cachedData: ToolFinderResponse["data"] = JSON.parse(rawCachedCompleted);
            if (cachedData && cachedData.topRecommendations && cachedData.topRecommendations.length > 0) {
              hasCachedCompleted = true;
              if (!isCancelled) {
                setResults(cachedData);
                if (cachedData.answers) {
                  setAnswers(cachedData.answers);
                }
                setCurrentStep(11);
                setStatus("COMPLETED");
                setIsLoading(false);
                isInitializedRef.current = true;
              }
            }
          } catch (e) {
            console.warn("Failed to parse cached completed result:", e);
            localStorage.removeItem(STORAGE_COMPLETED_RESULT_KEY);
          }
        }

        // B. If a submission ID exists, verify against PostgreSQL backend
        if (submissionId) {
          const fetchRes = await fetchToolFinderSubmissionResult(submissionId);

          if (!isCancelled) {
            if (fetchRes.status === "SUCCESS" && fetchRes.data) {
              setResults(fetchRes.data);
              if (fetchRes.data.answers) {
                setAnswers(fetchRes.data.answers);
              }
              setCurrentStep(11);
              setStatus("COMPLETED");
              setIsLoading(false);
              isInitializedRef.current = true;

              // Ensure both ID and completed result cache are solid in localStorage
              localStorage.setItem(STORAGE_SUBMISSION_ID_KEY, submissionId);
              localStorage.setItem(STORAGE_COMPLETED_RESULT_KEY, JSON.stringify(fetchRes.data));
              localStorage.removeItem(STORAGE_IN_PROGRESS_KEY);
              return;
            } else if (fetchRes.status === "NOT_FOUND") {
              // Only remove when backend explicitly returned 404 (do NOT remove on network glitches)
              localStorage.removeItem(STORAGE_SUBMISSION_ID_KEY);
              localStorage.removeItem(STORAGE_COMPLETED_RESULT_KEY);
              hasCachedCompleted = false;
            }
            // If fetchRes.status === "NETWORK_ERROR", keep cached data and do NOT clear localStorage
          }
        }

        if (hasCachedCompleted) {
          return;
        }

        // C. Check for in-progress draft in localStorage
        const rawDraft = localStorage.getItem(STORAGE_IN_PROGRESS_KEY);
        if (rawDraft) {
          try {
            const draft: PersistedInProgressState = JSON.parse(rawDraft);
            if (draft && draft.lastUpdated && Date.now() - draft.lastUpdated > DRAFT_TTL_MS) {
              localStorage.removeItem(STORAGE_IN_PROGRESS_KEY);
            } else if (draft && draft.currentStep >= 1 && draft.currentStep <= 10 && draft.answers) {
              if (!isCancelled) {
                setCurrentStep(draft.currentStep);
                setAnswers(draft.answers);
                if (draft.leadDraft) {
                  setLead((prev) => ({ ...prev, ...draft.leadDraft }));
                }
                setStatus("IN_PROGRESS");
                setIsLoading(false);
                isInitializedRef.current = true;
                return;
              }
            }
          } catch (draftErr) {
            console.warn("Could not parse in-progress tool finder draft:", draftErr);
            localStorage.removeItem(STORAGE_IN_PROGRESS_KEY);
          }
        }

        // D. Default: Not started
        if (!isCancelled) {
          setCurrentStep(0);
          setStatus("NOT_STARTED");
          setIsLoading(false);
          isInitializedRef.current = true;
        }
      } catch (err) {
        console.error("Error restoring assessment state:", err);
        if (!isCancelled) {
          setIsLoading(false);
          isInitializedRef.current = true;
        }
      }
    }

    restoreState();

    return () => {
      isCancelled = true;
    };
  }, []);

  // 2. Persist in-progress state to localStorage on step / answers / lead change
  useEffect(() => {
    if (!isInitializedRef.current || status === "COMPLETED") return;

    if (currentStep >= 1 && currentStep <= 10) {
      try {
        const inProgressData: PersistedInProgressState = {
          currentStep,
          answers,
          leadDraft: {
            firstName: lead.firstName,
            lastName: lead.lastName,
            companyName: lead.companyName,
            jobTitle: lead.jobTitle,
            phone: lead.phone,
          },
          lastUpdated: Date.now(),
        };
        localStorage.setItem(STORAGE_IN_PROGRESS_KEY, JSON.stringify(inProgressData));
      } catch (err) {
        console.warn("Error saving in-progress tool finder state:", err);
      }
    }
  }, [currentStep, answers, lead, status]);

  // 3. Step Navigation Handlers
  const handleStepChange = useCallback((newStep: number) => {
    setErrorMsg(null);
    setCurrentStep(newStep);
    if (newStep >= 1 && newStep <= 10) {
      setStatus("IN_PROGRESS");
    } else if (newStep === 0) {
      setStatus("NOT_STARTED");
    }
  }, []);

  const handleNext = useCallback(() => {
    setErrorMsg(null);
    if (currentStep < 10) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setStatus("IN_PROGRESS");
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    setErrorMsg(null);
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setStatus("IN_PROGRESS");
    } else {
      setCurrentStep(0);
      setStatus("NOT_STARTED");
      localStorage.removeItem(STORAGE_IN_PROGRESS_KEY);
    }
  }, [currentStep]);

  // 4. Submit Assessment (Idempotent + Persisted in PostgreSQL and localStorage)
  const submitAssessment = useCallback(async () => {
    if (isSubmittingRef.current) return;

    // Validation
    if (!lead.firstName.trim() || !lead.lastName.trim()) {
      setErrorMsg("Please provide your first and last name.");
      return;
    }
    if (!lead.email.trim() || !lead.email.includes("@")) {
      setErrorMsg("Please provide a valid work email address.");
      return;
    }
    if (!lead.companyName.trim()) {
      setErrorMsg("Please provide your company name.");
      return;
    }
    if (!lead.jobTitle.trim()) {
      setErrorMsg("Please provide your job title or role.");
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await submitToolFinderAssessment(answers, lead);

      if (response && response.data) {
        setResults(response.data);
        setStatus("COMPLETED");
        setCurrentStep(11);

        // Store authoritative submission ID and completed result
        if (response.data.submissionId) {
          localStorage.setItem(STORAGE_SUBMISSION_ID_KEY, response.data.submissionId);
        }
        localStorage.setItem(STORAGE_COMPLETED_RESULT_KEY, JSON.stringify(response.data));

        // Clean up temporary in-progress draft
        localStorage.removeItem(STORAGE_IN_PROGRESS_KEY);
      } else if (response && response.error) {
        setErrorMsg(response.error);
      } else {
        throw new Error("No recommendation data received");
      }
    } catch (err: unknown) {
      console.error("Assessment submission error:", err);
      const message = err instanceof Error ? err.message : "Failed to calculate recommendations. Please try again.";
      setErrorMsg(message);
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }, [answers, lead]);

  // 5. Retake / Reset Assessment (Cleans all stored keys and restarts)
  const retakeAssessment = useCallback(() => {
    localStorage.removeItem(STORAGE_SUBMISSION_ID_KEY);
    localStorage.removeItem(STORAGE_COMPLETED_RESULT_KEY);
    localStorage.removeItem(STORAGE_IN_PROGRESS_KEY);
    setAnswers(DEFAULT_ANSWERS);
    setLead(DEFAULT_LEAD);
    setResults(null);
    setErrorMsg(null);
    setCurrentStep(0);
    setStatus("NOT_STARTED");
  }, []);

  return {
    status,
    currentStep,
    setCurrentStep: handleStepChange,
    answers,
    setAnswers,
    lead,
    setLead,
    results,
    isLoading,
    isSubmitting,
    errorMsg,
    setErrorMsg,
    handleNext,
    handleBack,
    submitAssessment,
    retakeAssessment,
  };
}
