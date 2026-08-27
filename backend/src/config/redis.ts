import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const isUpstashConfigured = Boolean(url && token && !url.includes("your-upstash-url"));

/**
 * Authoritative Upstash Redis Client Singleton
 * Automatically connects when UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN are set.
 */
export const redis: Redis | null = isUpstashConfigured
  ? new Redis({
      url: url!,
      token: token!,
    })
  : null;

if (isUpstashConfigured) {
  console.log("⚡ [Upstash Redis] Connected successfully to Upstash REST endpoint.");
} else {
  console.log("ℹ️ [Upstash Redis] Credentials not detected or default placeholder present. Running with local in-memory fallback.");
}
