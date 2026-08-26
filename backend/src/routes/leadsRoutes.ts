import { Router } from "express";
import { LeadsController } from "../controllers/leadsController.js";
import { sensitiveActionRateLimiter, enforceJsonContentType } from "../middleware/security.middleware.js";

const router = Router();

// POST /api/v1/leads (Rate limited + JSON Content-Type enforced)
router.post("/", sensitiveActionRateLimiter, enforceJsonContentType, LeadsController.createLead);

export default router;
