import { Router } from "express";
import { LeadsController } from "../controllers/leadsController.js";
import { enforceJsonContentType, sanitizeRequestBody } from "../middleware/security.middleware.js";
import { upstashSensitiveActionLimiterMiddleware } from "../middleware/upstashRateLimit.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { directLeadBodySchema } from "../schemas/toolFinder.schema.js";

const router = Router();

/**
 * POST /api/v1/leads
 * Chain: rate limit → content-type → sanitize → validate → controller
 */
router.post(
  "/",
  upstashSensitiveActionLimiterMiddleware,
  enforceJsonContentType,
  sanitizeRequestBody,
  validate(directLeadBodySchema),
  LeadsController.createLead
);

export default router;
