import { eq, desc } from "drizzle-orm";
import { db, schema } from "../db/index.js";
import { LeadContact, AssessmentAnswers } from "../schemas/toolFinder.schema.js";
import { RecommendationEngineOutput } from "./recommendationEngine.js";

export class LeadService {
  /**
   * Retrieve a saved assessment submission by its UUID from PostgreSQL
   */
  public static async getAssessmentSubmissionById(submissionId: string) {
    try {
      const [submission] = await db
        .select()
        .from(schema.toolFinderSubmissions)
        .where(eq(schema.toolFinderSubmissions.id, submissionId))
        .limit(1);

      if (!submission) {
        return null;
      }

      // Fetch lead info if associated
      let leadInfo = null;
      if (submission.leadId) {
        const [lead] = await db
          .select({
            id: schema.leads.id,
            firstName: schema.leads.firstName,
            lastName: schema.leads.lastName,
            email: schema.leads.email,
            companyName: schema.leads.companyName,
            jobTitle: schema.leads.jobTitle,
          })
          .from(schema.leads)
          .where(eq(schema.leads.id, submission.leadId))
          .limit(1);
        leadInfo = lead;
      }

      return {
        id: submission.id,
        leadId: submission.leadId,
        lead: leadInfo,
        answers: submission.answers as AssessmentAnswers,
        topRecommendations: submission.topRecommendations,
        createdAt: submission.createdAt,
      };
    } catch (error) {
      console.warn("⚠️ Database query error in getAssessmentSubmissionById:", error);
      return null;
    }
  }

  /**
   * Persist lead and assessment submission to PostgreSQL with duplicate prevention
   */
  public static async saveAssessmentSubmission(
    leadData: LeadContact,
    answers: AssessmentAnswers,
    results: RecommendationEngineOutput,
    ipAddress?: string,
    userAgent?: string
  ) {
    try {
      // 1. Insert or find lead
      const [newLead] = await db
        .insert(schema.leads)
        .values({
          firstName: leadData.firstName,
          lastName: leadData.lastName?.trim() || leadData.firstName || "Lead",
          email: leadData.email.toLowerCase(),
          companyName: leadData.companyName,
          jobTitle: leadData.jobTitle || "",
          phone: leadData.phone || null,
          companySize: answers.companySize,
          source: "tool_finder",
          status: "new",
        })
        .returning();

      // 2. Check for recent duplicate submission from the same lead with identical answers
      if (newLead?.id) {
        const recentSubmissions = await db
          .select()
          .from(schema.toolFinderSubmissions)
          .where(eq(schema.toolFinderSubmissions.leadId, newLead.id))
          .orderBy(desc(schema.toolFinderSubmissions.createdAt))
          .limit(1);

        if (recentSubmissions.length > 0) {
          const recent = recentSubmissions[0];
          const timeDiffMs = Date.now() - new Date(recent.createdAt).getTime();
          // If submitted within last 60 seconds with same payload, return existing ID (idempotent)
          if (timeDiffMs < 60000 && JSON.stringify(recent.answers) === JSON.stringify(answers)) {
            return {
              success: true,
              leadId: newLead.id,
              submissionId: recent.id,
              isDuplicate: true,
            };
          }
        }
      }

      // 3. Insert Tool Finder submission record
      const [submission] = await db
        .insert(schema.toolFinderSubmissions)
        .values({
          leadId: newLead ? newLead.id : null,
          answers: answers,
          topRecommendations: results.topRecommendations,
          ipAddress: ipAddress || null,
          userAgent: userAgent || null,
        })
        .returning();

      return {
        success: true,
        leadId: newLead?.id,
        submissionId: submission?.id,
      };
    } catch (error) {
      console.warn("⚠️ Database save warning (proceeding with calculated results):", error);
      // Fallback returning generated pseudo-IDs if DB is offline during local run
      return {
        success: false,
        leadId: `lead_local_${Date.now()}`,
        submissionId: `sub_local_${Date.now()}`,
      };
    }
  }
}
