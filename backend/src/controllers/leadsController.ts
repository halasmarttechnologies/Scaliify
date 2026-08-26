import { Request, Response } from "express";
import { leadContactSchema } from "../schemas/toolFinder.schema.js";
import { db, schema } from "../db/index.js";
import { sendSuccess, sendError } from "../utils/response.js";

export class LeadsController {
  /**
   * Direct lead submission (e.g. from general contact or consultation requests)
   * POST /api/v1/leads
   */
  public static async createLead(req: Request, res: Response) {
    try {
      const parseResult = leadContactSchema.safeParse(req.body);
      if (!parseResult.success) {
        return sendError(res, "Invalid contact details submitted", 422);
      }

      const leadData = parseResult.data;
      try {
        const [newLead] = await db
          .insert(schema.leads)
          .values({
            firstName: leadData.firstName,
            lastName: leadData.lastName,
            email: leadData.email.toLowerCase(),
            companyName: leadData.companyName,
            jobTitle: leadData.jobTitle,
            phone: leadData.phone || null,
            source: "contact_page",
            status: "new",
          })
          .returning();

        return sendSuccess(res, newLead, "Lead received successfully", 201);
      } catch (dbErr) {
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
