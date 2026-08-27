import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const isUpstashConfigured = Boolean(url && token && !url.includes("your-upstash-url"));

/**
 * Frontend Edge / Server-compatible Upstash Redis client
 */
export const redis: Redis | null = isUpstashConfigured
  ? new Redis({
      url: url!,
      token: token!,
    })
  : null;
