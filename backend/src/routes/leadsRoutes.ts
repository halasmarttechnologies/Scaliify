import { Router } from "express";
import { LeadsController } from "../controllers/leadsController.js";
import { enforceJsonContentType } from "../middleware/security.middleware.js";
import { upstashSensitiveActionLimiterMiddleware } from "../middleware/upstashRateLimit.middleware.js";

const router = Router();

// POST /api/v1/leads (Distributed Upstash Rate Limiter + JSON Content-Type enforced)
router.post("/", upstashSensitiveActionLimiterMiddleware, enforceJsonContentType, LeadsController.createLead);

export default router;
