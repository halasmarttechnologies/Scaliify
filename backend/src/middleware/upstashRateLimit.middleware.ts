import { Request, Response, NextFunction } from "express";
import { Ratelimit } from "@upstash/ratelimit";
import { redis, isUpstashConfigured } from "../config/redis.js";
import { globalRateLimiter, sensitiveActionRateLimiter } from "./security.middleware.js";

// Upstash Distributed Rate Limiters
const upstashGlobalLimiter = isUpstashConfigured && redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "10 s"),
      analytics: true,
      prefix: "@scaliify/ratelimit/global",
    })
  : null;

const upstashSensitiveLimiter = isUpstashConfigured && redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      analytics: true,
      prefix: "@scaliify/ratelimit/sensitive",
    })
  : null;

function getClientIdentifier(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.socket.remoteAddress || "127.0.0.1";
  return ip;
}

/**
 * Distributed Global Rate Limiter via Upstash Redis
 * Falls back to Express rate-limit if Upstash credentials are not set.
 */
export async function upstashGlobalRateLimiterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!upstashGlobalLimiter) {
    return globalRateLimiter(req, res, next);
  }

  try {
    const identifier = getClientIdentifier(req);
    const { success, limit, remaining, reset } = await upstashGlobalLimiter.limit(identifier);

    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", reset);

    if (!success) {
      return res.status(429).json({
        success: false,
        error: "Too many requests. Upstash rate limit exceeded. Please wait a moment.",
        retryAfter: Math.ceil((reset - Date.now()) / 1000),
      });
    }

    next();
  } catch (err) {
    console.warn("[Upstash RateLimiter] Error evaluating rate limit, falling back:", err);
    return globalRateLimiter(req, res, next);
  }
}

/**
 * Distributed Sensitive Actions Rate Limiter (Assessments & Leads)
 */
export async function upstashSensitiveActionLimiterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!upstashSensitiveLimiter) {
    return sensitiveActionRateLimiter(req, res, next);
  }

  try {
    const identifier = getClientIdentifier(req);
    const { success, limit, remaining, reset } = await upstashSensitiveLimiter.limit(identifier);

    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", reset);

    if (!success) {
      return res.status(429).json({
        success: false,
        error: "Rate limit exceeded for assessment/lead submission. Please try again in a moment.",
        retryAfter: Math.ceil((reset - Date.now()) / 1000),
      });
    }

    next();
  } catch (err) {
    console.warn("[Upstash Sensitive Limiter] Error evaluating rate limit, falling back:", err);
    return sensitiveActionRateLimiter(req, res, next);
  }
}
