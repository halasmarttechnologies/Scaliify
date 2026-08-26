import { Router } from "express";
import { ToolFinderController } from "../controllers/toolFinderController.js";
import { sensitiveActionRateLimiter, enforceJsonContentType } from "../middleware/security.middleware.js";

const router = Router();

// POST /api/v1/tool-finder/assess (Rate limited + JSON Content-Type enforced)
router.post("/assess", sensitiveActionRateLimiter, enforceJsonContentType, ToolFinderController.assess);

// GET /api/v1/tool-finder/submissions/:id (Retrieve saved authoritative submission)
router.get("/submissions/:id", ToolFinderController.getSubmission);
router.get("/results/:id", ToolFinderController.getSubmission);

export default router;
