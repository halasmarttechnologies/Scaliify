import { describe, it, expect } from "vitest";
import { RecommendationEngine } from "../recommendationEngine";
import type { AssessmentAnswers } from "../../schemas/toolFinder.schema";
import type { NewTool } from "../../db/schema";

function baseAnswers(overrides: Partial<AssessmentAnswers> = {}): AssessmentAnswers {
  return {
    companySize: "size_sme",
    regions: ["region_dach"],
    currentStatus: "status_scratch",
    coreHrNeeds: [],
    payrollModel: "payroll_local_eu",
    recruitingNeeds: [],
    performanceNeeds: [],
    timeAttendanceNeeds: [],
    integrations: [],
    ...overrides,
  };
}

function makeTool(overrides: Partial<NewTool> = {}): NewTool {
  return {
    id: "tool-a",
    name: "Tool A",
    slug: "tool-a",
    category: "hris",
    categoryLabel: "HRIS",
    shortDescription: "A test HR tool",
    websiteUrl: "https://example.com",
    minTeamSize: 1,
    maxTeamSize: 10000,
    badge: null,
    pricingTier: "growth",
    regions: ["region_dach"],
    features: [],
    integrations: [],
    strengths: [],
    isActive: true,
    ...overrides,
  } as NewTool;
}

describe("RecommendationEngine.calculate", () => {
  it("returns every match percentage clamped between 55 and 98", () => {
    const tools = [
      makeTool({ id: "perfect", regions: ["region_dach"], features: ["core_onboarding"] }),
      makeTool({ id: "mismatch", regions: ["region_mena"], minTeamSize: 5000, maxTeamSize: 10000 }),
    ];
    const result = RecommendationEngine.calculate(baseAnswers({ coreHrNeeds: ["core_onboarding"] }), tools);
    const all = [...result.topRecommendations, ...result.secondaryRecommendations];
    for (const tool of all) {
      expect(tool.matchPercentage).toBeGreaterThanOrEqual(55);
      expect(tool.matchPercentage).toBeLessThanOrEqual(98);
    }
  });

  it("excludes inactive tools from recommendations", () => {
    const tools = [makeTool({ id: "active", isActive: true }), makeTool({ id: "inactive", isActive: false })];
    const result = RecommendationEngine.calculate(baseAnswers(), tools);
    const ids = [...result.topRecommendations, ...result.secondaryRecommendations].map((t) => t.toolId);
    expect(ids).toContain("active");
    expect(ids).not.toContain("inactive");
  });

  it("ranks a tool matching the requested region above one that doesn't", () => {
    const tools = [
      makeTool({ id: "region-match", regions: ["region_dach"] }),
      makeTool({ id: "region-miss", regions: ["region_mena"] }),
    ];
    const result = RecommendationEngine.calculate(baseAnswers({ regions: ["region_dach"] }), tools);
    const all = [...result.topRecommendations, ...result.secondaryRecommendations];
    const matchScore = all.find((t) => t.toolId === "region-match")!.matchPercentage;
    const missScore = all.find((t) => t.toolId === "region-miss")!.matchPercentage;
    expect(matchScore).toBeGreaterThan(missScore);
  });

  it("scores DATEV-capable tools higher for payroll_datev answers than tools without DATEV support", () => {
    const tools = [
      makeTool({ id: "has-datev", features: ["payroll_datev"] }),
      makeTool({ id: "no-datev", features: [] }),
    ];
    const result = RecommendationEngine.calculate(baseAnswers({ payrollModel: "payroll_datev" }), tools);
    const all = [...result.topRecommendations, ...result.secondaryRecommendations];
    const withDatev = all.find((t) => t.toolId === "has-datev")!.matchPercentage;
    const withoutDatev = all.find((t) => t.toolId === "no-datev")!.matchPercentage;
    expect(withDatev).toBeGreaterThan(withoutDatev);
  });

  it("scores EOR-category tools higher for payroll_global_eor answers", () => {
    const tools = [
      makeTool({ id: "eor-tool", category: "payroll_eor" }),
      makeTool({ id: "non-eor-tool", category: "hris" }),
    ];
    const result = RecommendationEngine.calculate(baseAnswers({ payrollModel: "payroll_global_eor" }), tools);
    const all = [...result.topRecommendations, ...result.secondaryRecommendations];
    const eorScore = all.find((t) => t.toolId === "eor-tool")!.matchPercentage;
    const nonEorScore = all.find((t) => t.toolId === "non-eor-tool")!.matchPercentage;
    expect(eorScore).toBeGreaterThan(nonEorScore);
  });

  it("penalizes team sizes outside a tool's min/max band", () => {
    const tools = [
      makeTool({ id: "fits", minTeamSize: 1, maxTeamSize: 10000 }),
      makeTool({ id: "too-big-for-startup", minTeamSize: 500, maxTeamSize: 10000 }),
    ];
    const result = RecommendationEngine.calculate(baseAnswers({ companySize: "size_startup" }), tools);
    const all = [...result.topRecommendations, ...result.secondaryRecommendations];
    const fits = all.find((t) => t.toolId === "fits")!.matchPercentage;
    const tooBig = all.find((t) => t.toolId === "too-big-for-startup")!.matchPercentage;
    expect(fits).toBeGreaterThan(tooBig);
  });

  it("sorts results by descending match percentage", () => {
    const tools = [
      makeTool({ id: "a", regions: ["region_mena"] }),
      makeTool({ id: "b", regions: ["region_dach"] }),
      makeTool({ id: "c", regions: ["region_dach"], features: ["core_onboarding"] }),
    ];
    const result = RecommendationEngine.calculate(baseAnswers({ regions: ["region_dach"], coreHrNeeds: ["core_onboarding"] }), tools);
    const all = [...result.topRecommendations, ...result.secondaryRecommendations];
    const scores = all.map((t) => t.matchPercentage);
    const sorted = [...scores].sort((a, b) => b - a);
    expect(scores).toEqual(sorted);
  });

  it("splits results into top 3 and up to 4 secondary recommendations", () => {
    const tools = Array.from({ length: 10 }, (_, i) => makeTool({ id: `tool-${i}` }));
    const result = RecommendationEngine.calculate(baseAnswers(), tools);
    expect(result.topRecommendations).toHaveLength(3);
    expect(result.secondaryRecommendations).toHaveLength(4);
  });

  it("returns fewer secondary recommendations when the catalog is small", () => {
    const tools = Array.from({ length: 4 }, (_, i) => makeTool({ id: `tool-${i}` }));
    const result = RecommendationEngine.calculate(baseAnswers(), tools);
    expect(result.topRecommendations).toHaveLength(3);
    expect(result.secondaryRecommendations).toHaveLength(1);
  });

  it("summarizes the assessment with uppercased, prefix-stripped labels", () => {
    const result = RecommendationEngine.calculate(
      baseAnswers({ currentStatus: "status_replace_hris", companySize: "size_enterprise", regions: ["region_dach", "region_mena"] }),
      [makeTool()]
    );
    expect(result.assessmentSummary.primaryFocus).toBe("REPLACE HRIS");
    expect(result.assessmentSummary.teamSize).toBe("ENTERPRISE");
    expect(result.assessmentSummary.regionsCount).toBe(2);
  });

  it("never returns duplicate matched features and caps them at 5", () => {
    const tools = [
      makeTool({
        features: [
          "core_onboarding",
          "core_signatures",
          "payroll_datev",
          "ats_multiposting",
          "ats_structured_hiring",
          "ats_advanced_analytics",
          "perf_360_reviews",
        ],
      }),
    ];
    const result = RecommendationEngine.calculate(
      baseAnswers({
        coreHrNeeds: ["core_onboarding", "core_signatures"],
        payrollModel: "payroll_datev",
        recruitingNeeds: ["ats_multiposting", "ats_structured_hiring", "ats_advanced_analytics"],
        performanceNeeds: ["perf_360_reviews"],
      }),
      tools
    );
    const [tool] = result.topRecommendations;
    expect(tool.matchedFeatures.length).toBeLessThanOrEqual(5);
    expect(new Set(tool.matchedFeatures).size).toBe(tool.matchedFeatures.length);
  });
});
