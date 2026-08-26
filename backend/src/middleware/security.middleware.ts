import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { sanitizeString } from "../utils/sanitize.js";

/**
 * Global Rate Limiter: 150 requests per 15-minute window per IP
 */
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests. Please try again later.",
  },
});

/**
 * Sensitive Mutation Rate Limiter (Lead Capture & Tool Assessments)
 * 20 submissions per hour per IP to prevent spam and API resource abuse
 */
export const sensitiveActionRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Assessment submission limit exceeded. Please wait an hour before submitting again.",
  },
});

/**
 * Strict Content-Type Enforcement for mutating requests (POST, PUT, PATCH)
 */
export function enforceJsonContentType(req: Request, res: Response, next: NextFunction) {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    const contentType = req.headers["content-type"];
    if (!contentType || !contentType.toLowerCase().includes("application/json")) {
      return res.status(415).json({
        success: false,
        error: "Unsupported Media Type. 'Content-Type: application/json' header is required.",
      });
    }
  }
  next();
}

/**
 * Deep Recursive Request Body Sanitizer
 * Strips dangerous HTML tags and control characters from string values
 */
export function sanitizeRequestBody(req: Request, _res: Response, next: NextFunction) {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeObject(req.body);
  }
  next();
}

function sanitizeObject(obj: any): any {
  if (typeof obj === "string") {
    return sanitizeString(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item));
  }
  if (typeof obj === "object" && obj !== null) {
    const cleaned: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = sanitizeObject(value);
    }
    return cleaned;
  }
  return obj;
}
