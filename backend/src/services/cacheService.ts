import { redis, isUpstashConfigured } from "../config/redis.js";

// In-Memory Fallback Cache for local development when Redis credentials are not provided
const localMemoryCache = new Map<string, { value: any; expiresAt: number }>();

export class CacheService {
  /**
   * Fetch item from cache
   */
  static async get<T>(key: string): Promise<T | null> {
    try {
      if (isUpstashConfigured && redis) {
        const cached = await redis.get<T>(key);
        return cached ?? null;
      }

      // In-Memory Fallback
      const entry = localMemoryCache.get(key);
      if (!entry) return null;
      if (Date.now() > entry.expiresAt) {
        localMemoryCache.delete(key);
        return null;
      }
      return entry.value as T;
    } catch (error) {
      console.warn(`[CacheService] Failed to get key "${key}":`, error);
      return null;
    }
  }

  /**
   * Set item in cache with TTL in seconds
   */
  static async set(key: string, value: any, ttlSeconds: number = 300): Promise<void> {
    try {
      if (isUpstashConfigured && redis) {
        await redis.set(key, value, { ex: ttlSeconds });
        return;
      }

      // In-Memory Fallback
      localMemoryCache.set(key, {
        value,
        expiresAt: Date.now() + ttlSeconds * 1000,
      });
    } catch (error) {
      console.warn(`[CacheService] Failed to set key "${key}":`, error);
    }
  }

  /**
   * Delete item from cache
   */
  static async del(key: string): Promise<void> {
    try {
      if (isUpstashConfigured && redis) {
        await redis.del(key);
        return;
      }
      localMemoryCache.delete(key);
    } catch (error) {
      console.warn(`[CacheService] Failed to delete key "${key}":`, error);
    }
  }

  /**
   * Fetch or Compute Cache Helper
   */
  static async getOrSet<T>(
    key: string,
    ttlSeconds: number,
    fetcher: () => Promise<T>
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const freshData = await fetcher();
    if (freshData !== null && freshData !== undefined) {
      await this.set(key, freshData, ttlSeconds);
    }
    return freshData;
  }
}
