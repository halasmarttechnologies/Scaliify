import { describe, it, expect } from "vitest";
import { TOOL_FINDER_QUESTIONS } from "@/data/toolFinderQuestions";

describe("Tool Finder Questions Data", () => {
  it("should have 9 defined question steps", () => {
    expect(TOOL_FINDER_QUESTIONS).toBeDefined();
    expect(Array.isArray(TOOL_FINDER_QUESTIONS)).toBe(true);
    expect(TOOL_FINDER_QUESTIONS.length).toBe(9);
  });

  it("each question step should have step, title, subtitle, field, and options", () => {
    TOOL_FINDER_QUESTIONS.forEach((q) => {
      expect(q).toHaveProperty("step");
      expect(typeof q.step).toBe("number");
      expect(q).toHaveProperty("title");
      expect(typeof q.title).toBe("string");
      expect(q).toHaveProperty("field");
      expect(typeof q.field).toBe("string");
      expect(q).toHaveProperty("options");
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options.length).toBeGreaterThan(0);
    });
  });

  it("each option should have an id, title, and sub", () => {
    TOOL_FINDER_QUESTIONS.forEach((q) => {
      q.options.forEach((opt) => {
        expect(opt).toHaveProperty("id");
        expect(typeof opt.id).toBe("string");
        expect(opt).toHaveProperty("title");
        expect(typeof opt.title).toBe("string");
      });
    });
  });
});
