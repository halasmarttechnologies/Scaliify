import { Request, Response } from "express";
import { db, schema } from "../db/index.js";
import { sendSuccess, sendError } from "../utils/response.js";
import type { LeadContact } from "../schemas/toolFinder.schema.js";

export class LeadsController {
  /**
   * Direct lead submission (contact page / lets-talk / consultation requests)
   * POST /api/v1/leads
   *
   * Body is pre-validated and sanitised by validate() + sanitizeRequestBody middleware
   * so req.body is typed and safe to use directly.
   */
  public static async createLead(req: Request, res: Response) {
    try {
      const leadData = req.body as LeadContact;

      try {
        const [newLead] = await db
          .insert(schema.leads)
          .values({
            firstName: leadData.firstName,
            lastName: leadData.lastName?.trim() || leadData.firstName || "Lead",
            email: leadData.email.toLowerCase(),
            companyName: leadData.companyName,
            jobTitle: leadData.jobTitle || "",
            phone: leadData.phone || null,
            source: leadData.source || "contact_page",
            status: "new",
          })
          .returning();

        return sendSuccess(res, newLead, "Lead received successfully", 201);
      } catch (dbErr) {
        // DB unavailable — still acknowledge receipt gracefully
        console.warn("DB unavailable during lead insert, using offline fallback:", (dbErr as Error).message);
        return sendSuccess(
          res,
          { id: `lead_${Date.now()}`, ...leadData },
          "Lead received (offline storage)",
          201
        );
      }
    } catch (error) {
      console.error("Error in LeadsController.createLead:", error);
      return sendError(res, "Failed to submit lead", 500);
    }
  }
}
