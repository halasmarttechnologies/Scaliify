import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { z } from "zod";
import type { AssessmentAnswers, LeadContact } from "../schemas/toolFinder.schema.js";
import { RecommendationEngine } from "../services/recommendationEngine.js";
import { LeadService } from "../services/leadService.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { db, schema } from "../db/index.js";
import { initialToolsData } from "../db/seeds/tools.seed.js";
import type { ToolData } from "@scaliify/shared";
import { EmailService } from "../services/emailService.js";

export class ToolFinderController {
  /**
   * Assess user answers, compute recommendations, and capture lead
   * POST /api/v1/tool-finder/assess
   */
  public static async assess(req: Request, res: Response) {
    try {
      // Body is pre-validated and typed by validate(toolFinderAssessmentSubmissionSchema) middleware
      const { answers, lead } = req.body as { answers: AssessmentAnswers; lead: LeadContact };

      // 2. Fetch tools from database (or fallback to seed dataset if DB connection is offline)
      let toolCatalog = initialToolsData;
      try {
        const dbTools = await db.select().from(schema.tools).where(eq(schema.tools.isActive, true));
        if (dbTools && dbTools.length > 0) {
          toolCatalog = dbTools;
        }
      } catch (dbErr) {
        console.warn("Using offline tool dataset for recommendation calculation:", (dbErr as Error).message);
      }

      // 3. Compute Ranked Recommendations via Scoring Engine
      const results = RecommendationEngine.calculate(answers, toolCatalog as unknown as ToolData[]);

      // 4. Persist Lead and Submission
      const ipAddress = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress;
      const userAgent = req.headers["user-agent"];
      const savedInfo = await LeadService.saveAssessmentSubmission(lead, answers, results, ipAddress, userAgent);

      // 5. Dispatch Assessment Notification via Resend asynchronously
      void EmailService.sendAssessmentNotification(lead, answers, results.topRecommendations).catch((err) => {
        console.error("Async email dispatch error in ToolFinderController:", err);
      });

      return sendSuccess(
        res,
        {
          submissionId: savedInfo.submissionId,
          leadId: savedInfo.leadId,
          ...results,
        },
        "Assessment completed successfully",
        200
      );
    } catch (error) {
      console.error("Error in ToolFinderController.assess:", error);
      return sendError(res, "Internal server error occurred while processing assessment.", 500);
    }
  }

  /**
   * Retrieve a saved assessment result by its submission ID
   * GET /api/v1/tool-finder/submissions/:id
   */
  public static async getSubmission(req: Request, res: Response) {
    try {
      const idParse = z.string().uuid().safeParse(req.params.id);
      if (!idParse.success) {
        return sendError(res, "Invalid submission ID format", 400);
      }
      const id = idParse.data;

      const submission = await LeadService.getAssessmentSubmissionById(id);
      if (!submission) {
        return sendError(res, "Submission not found or expired", 404);
      }

      // Reconstruct summary data based on answers
      const teamSizeLabels: Record<string, string> = {
        size_startup: "1–25 employees",
        size_sme: "26–100 employees",
        size_midmarket: "101–500 employees",
        size_enterprise: "500+ employees",
      };

      const primaryFocusLabels: Record<string, string> = {
        status_scratch: "All-in-One HRIS",
        status_replace_hris: "HRIS Upgrade & Automation",
        status_dedicated_ats: "Applicant Tracking & Hiring",
        status_dedicated_perf: "Performance & Enablement",
      };

      const assessmentSummary = {
        primaryFocus: primaryFocusLabels[submission.answers?.currentStatus] || "All-in-One HRIS",
        teamSize: teamSizeLabels[submission.answers?.companySize] || "Mid-Market",
        regionsCount: submission.answers?.regions?.length || 1,
      };

      return sendSuccess(
        res,
        {
          submissionId: submission.id,
          leadId: submission.leadId,
          assessmentSummary,
          answers: submission.answers,
          topRecommendations: submission.topRecommendations,
          createdAt: submission.createdAt,
        },
        "Submission retrieved successfully",
        200
      );
    } catch (error) {
      console.error("Error in ToolFinderController.getSubmission:", error);
      return sendError(res, "Internal server error while fetching submission", 500);
    }
  }
}
