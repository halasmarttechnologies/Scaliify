import { Ratelimit } from "@upstash/ratelimit";
import { redis, isUpstashConfigured } from "./redis";

/**
 * Next.js Edge & API Route Sliding Window Ratelimiter
 */
export const nextRatelimit = isUpstashConfigured && redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "10 s"),
      analytics: true,
      prefix: "@scaliify/next-ratelimit",
    })
  : null;

/**
 * Helper to check rate limit in Next.js Route Handlers / Server Actions
 */
export async function checkRateLimit(identifier: string = "anonymous") {
  if (!nextRatelimit) {
    return { success: true, limit: 100, remaining: 100, reset: 0 };
  }
  return await nextRatelimit.limit(identifier);
}
