import { Request, Response } from "express";
import { db, schema } from "../db/index.js";
import { initialToolsData } from "../db/seeds/tools.seed.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { eq } from "drizzle-orm";

export class ToolsController {
  /**
   * Get all active HR tools with optional category filter
   * GET /api/v1/tools
   */
  public static async getAllTools(req: Request, res: Response) {
    try {
      const { category, region } = req.query;

      let allTools = initialToolsData;
      try {
        const dbTools = await db.select().from(schema.tools).where(eq(schema.tools.isActive, true));
        if (dbTools && dbTools.length > 0) {
          allTools = dbTools;
        }
      } catch (err) {
        // Fallback to static catalog if DB is unreachable
      }

      let filtered = allTools;
      if (category && typeof category === "string") {
        filtered = filtered.filter((t) => t.category === category);
      }
      if (region && typeof region === "string") {
        filtered = filtered.filter((t) => t.regions.includes(region));
      }

      return sendSuccess(res, filtered, "Tools retrieved successfully");
    } catch (error) {
      console.error("Error in ToolsController.getAllTools:", error);
      return sendError(res, "Failed to retrieve tools catalog", 500);
    }
  }

  /**
   * Get a single tool by slug
   * GET /api/v1/tools/:slug
   */
  public static async getToolBySlug(req: Request, res: Response) {
    try {
      const slug = String(req.params.slug);

      let tool = initialToolsData.find((t) => t.slug === slug || t.id === slug);
      try {
        const [dbTool] = await db.select().from(schema.tools).where(eq(schema.tools.slug, slug));
        if (dbTool) tool = dbTool;
      } catch (err) {}

      if (!tool) {
        return sendError(res, `Tool with slug '${slug}' not found`, 404);
      }

      return sendSuccess(res, tool, "Tool found");
    } catch (error) {
      console.error("Error in ToolsController.getToolBySlug:", error);
      return sendError(res, "Failed to retrieve tool", 500);
    }
  }
}
