import { Request, Response, NextFunction } from "express";
import { CacheService } from "../services/cacheService.js";

/**
 * Route Caching Middleware using Upstash Redis
 * Caches JSON responses for GET endpoints by request URL.
 */
export function cacheResponse(ttlSeconds: number = 300) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET") {
      return next();
    }

    const cacheKey = `@scaliify/cache:${req.originalUrl || req.url}`;

    try {
      const cachedBody = await CacheService.get(cacheKey);
      if (cachedBody) {
        res.setHeader("X-Cache", "HIT");
        return res.json(cachedBody);
      }

      res.setHeader("X-Cache", "MISS");
      const originalJson = res.json.bind(res);

      res.json = (body: any) => {
        // Only cache successful status codes
        if (res.statusCode >= 200 && res.statusCode < 300) {
          CacheService.set(cacheKey, body, ttlSeconds).catch((err) => {
            console.warn(`[Cache Middleware] Async set error for key ${cacheKey}:`, err);
          });
        }
        return originalJson(body);
      };

      next();
    } catch (err) {
      console.warn(`[Cache Middleware] Error accessing cache for ${cacheKey}:`, err);
      next();
    }
  };
}
