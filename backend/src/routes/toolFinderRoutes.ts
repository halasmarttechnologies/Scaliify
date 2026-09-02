import { Router } from "express";
import { ToolFinderController } from "../controllers/toolFinderController.js";
import { enforceJsonContentType, sanitizeRequestBody } from "../middleware/security.middleware.js";
import { upstashSensitiveActionLimiterMiddleware } from "../middleware/upstashRateLimit.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { toolFinderAssessmentSubmissionSchema } from "../schemas/toolFinder.schema.js";

const router = Router();

/**
 * POST /api/v1/tool-finder/assess
 * Chain: rate limit → content-type → sanitize → validate → controller
 */
router.post(
  "/assess",
  upstashSensitiveActionLimiterMiddleware,
  enforceJsonContentType,
  sanitizeRequestBody,
  validate(toolFinderAssessmentSubmissionSchema),
  ToolFinderController.assess
);

/**
 * GET /api/v1/tool-finder/submissions/:id
 * UUID param format is validated inside the controller via z.string().uuid()
 */
router.get("/submissions/:id", ToolFinderController.getSubmission);

export default router;
