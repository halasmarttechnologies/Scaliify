import { Router } from "express";
import { ToolFinderController } from "../controllers/toolFinderController.js";
import { enforceJsonContentType } from "../middleware/security.middleware.js";
import { upstashSensitiveActionLimiterMiddleware } from "../middleware/upstashRateLimit.middleware.js";

const router = Router();

// POST /api/v1/tool-finder/assess (Distributed Upstash Rate Limiter + JSON Content-Type enforced)
router.post("/assess", upstashSensitiveActionLimiterMiddleware, enforceJsonContentType, ToolFinderController.assess);

// GET /api/v1/tool-finder/submissions/:id (Retrieve saved authoritative submission)
router.get("/submissions/:id", ToolFinderController.getSubmission);

export default router;
