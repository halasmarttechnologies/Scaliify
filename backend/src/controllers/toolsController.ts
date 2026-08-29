import { Request, Response } from "express";
import { z } from "zod";
import { db, schema } from "../db/index.js";
import { initialToolsData } from "../db/seeds/tools.seed.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { eq } from "drizzle-orm";

const toolsQuerySchema = z.object({
  category: z.string().max(50).regex(/^[a-z0-9_-]+$/).optional(),
  region: z.string().max(50).regex(/^[a-z0-9_-]+$/).optional(),
});

const slugParamSchema = z.string().min(1).max(100).regex(/^[a-z0-9-]+$/);

export class ToolsController {
  /**
   * Get all active HR tools with optional category filter
   * GET /api/v1/tools
   */
  public static async getAllTools(req: Request, res: Response) {
    try {
      const queryParse = toolsQuerySchema.safeParse(req.query);
      if (!queryParse.success) {
        return sendError(res, "Invalid query parameters", 400);
      }
      const { category, region } = queryParse.data;

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
      if (category) {
        filtered = filtered.filter((t) => t.category === category);
      }
      if (region) {
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
      const slugParse = slugParamSchema.safeParse(req.params.slug);
      if (!slugParse.success) {
        return sendError(res, "Invalid tool slug", 400);
      }
      const slug = slugParse.data;

      let tool = initialToolsData.find((t) => t.slug === slug || t.id === slug);
      try {
        const [dbTool] = await db.select().from(schema.tools).where(eq(schema.tools.slug, slug));
        if (dbTool) tool = dbTool;
      } catch (err) {}

      if (!tool) {
        return sendError(res, "Tool not found", 404);
      }

      return sendSuccess(res, tool, "Tool found");
    } catch (error) {
      console.error("Error in ToolsController.getToolBySlug:", error);
      return sendError(res, "Failed to retrieve tool", 500);
    }
  }
}
