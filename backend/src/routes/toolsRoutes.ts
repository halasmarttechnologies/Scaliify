import { Router } from "express";
import { ToolsController } from "../controllers/toolsController.js";
import { cacheResponse } from "../middleware/cache.middleware.js";

const router = Router();

// GET /api/v1/tools (Cached in Upstash Redis for 10 minutes)
router.get("/", cacheResponse(600), ToolsController.getAllTools);

// GET /api/v1/tools/:slug (Cached in Upstash Redis for 10 minutes)
router.get("/:slug", cacheResponse(600), ToolsController.getToolBySlug);

export default router;
