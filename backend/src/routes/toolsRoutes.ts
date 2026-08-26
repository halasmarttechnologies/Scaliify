import { Router } from "express";
import { ToolsController } from "../controllers/toolsController.js";

const router = Router();

// GET /api/v1/tools
router.get("/", ToolsController.getAllTools);

// GET /api/v1/tools/:slug
router.get("/:slug", ToolsController.getToolBySlug);

export default router;
