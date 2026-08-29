import { describe, it, expect } from "vitest";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blogPosts";

describe("Blog Posts Data Integrity", () => {
  it("should contain a valid list of categories with 'All'", () => {
    expect(Array.isArray(BLOG_CATEGORIES)).toBe(true);
    expect(BLOG_CATEGORIES).toContain("All");
    expect(BLOG_CATEGORIES.length).toBeGreaterThan(3);
  });

  it("should contain structured blog posts with all required fields", () => {
    expect(Array.isArray(BLOG_POSTS)).toBe(true);
    expect(BLOG_POSTS.length).toBeGreaterThanOrEqual(6);

    BLOG_POSTS.forEach((post) => {
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("slug");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("date");
      expect(post).toHaveProperty("category");
      expect(post).toHaveProperty("coverType");
      expect(typeof post.title).toBe("string");
      expect(typeof post.date).toBe("string");
      expect(BLOG_CATEGORIES).toContain(post.category);
    });
  });
});
