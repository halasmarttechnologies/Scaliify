import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { toolFinderAssessmentSubmissionSchema } from "../schemas/toolFinder.schema.js";
import { RecommendationEngine } from "../services/recommendationEngine.js";
import { LeadService } from "../services/leadService.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { db, schema } from "../db/index.js";
import { initialToolsData } from "../db/seeds/tools.seed.js";

export class ToolFinderController {
  /**
   * Assess user answers, compute recommendations, and capture lead
   * POST /api/v1/tool-finder/assess
   */
  public static async assess(req: Request, res: Response) {
    try {
      // 1. Backend Zod Validation
      const parseResult = toolFinderAssessmentSubmissionSchema.safeParse(req.body);
      if (!parseResult.success) {
        const formattedErrors: Record<string, string[]> = {};
        for (const issue of parseResult.error.issues) {
          const path = issue.path.join(".");
          if (!formattedErrors[path]) formattedErrors[path] = [];
          formattedErrors[path].push(issue.message);
        }
        return sendError(res, "Validation failed. Please check your submitted inputs.", 422, formattedErrors);
      }

      const { answers, lead } = parseResult.data;

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
      const results = RecommendationEngine.calculate(answers, toolCatalog);

      // 4. Persist Lead and Submission
      const ipAddress = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress;
      const userAgent = req.headers["user-agent"];
      const savedInfo = await LeadService.saveAssessmentSubmission(lead, answers, results, ipAddress, userAgent);

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
      const { id } = req.params;
      if (!id || typeof id !== "string") {
        return sendError(res, "Invalid submission ID parameter", 400);
      }

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
