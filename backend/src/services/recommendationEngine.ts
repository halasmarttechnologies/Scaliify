import { AssessmentAnswers } from "../schemas/toolFinder.schema.js";
import { initialToolsData } from "../db/seeds/tools.seed.js";
import { NewTool } from "../db/schema.js";

export interface ToolRecommendationResult {
  toolId: string;
  name: string;
  slug: string;
  category: string;
  categoryLabel: string;
  matchPercentage: number;
  badge: string;
  shortDescription: string;
  whyRecommended: string;
  matchedFeatures: string[];
  strengths: string[];
  websiteUrl: string;
  pricingTier?: string | null;
}

export interface RecommendationEngineOutput {
  assessmentSummary: {
    primaryFocus: string;
    teamSize: string;
    regionsCount: number;
  };
  topRecommendations: ToolRecommendationResult[];
  secondaryRecommendations: ToolRecommendationResult[];
}

const SCORING_WEIGHTS = {
  teamSize: 15,
  region: 20,
  coreHr: 15,
  payroll: 15,
  recruiting: 10,
  performance: 10,
  timeAttendance: 10,
  integrations: 5,
} as const;

const PARTIAL_MATCH = {
  teamTooSmall: 0.4,
  teamTooLarge: 0.5,
  noSelectionDefault: 0.75,
  noSelectionCoreHr: 0.8,
  noSelectionIntegrations: 0.8,
  payrollPartialDatev: 0.4,
  payrollNoEor: 0.2,
  payrollGenericMiss: 0.6,
} as const;

const SCORE_FLOOR = 55;
const SCORE_CEILING = 98;
const TOP_RESULTS_COUNT = 3;
const SECONDARY_RESULTS_COUNT = 4;
const MAX_MATCHED_FEATURES = 5;

const APPROX_HEADCOUNT: Record<string, number> = {
  size_startup: 15,
  size_sme: 60,
  size_midmarket: 250,
  size_enterprise: 1200,
};

export class RecommendationEngine {
  public static calculate(answers: AssessmentAnswers, toolList: NewTool[] = initialToolsData): RecommendationEngineOutput {
    const scoredTools = toolList
      .filter((tool) => tool.isActive)
      .map((tool) => {
        let totalScore = 0;
        const maxPossibleScore = 100;
        const matchedFeatures: string[] = [];

        // 1. Team Size Fit
        let sizeScore = 0;
        const approxSize = APPROX_HEADCOUNT[answers.companySize] || 50;
        const minSize = tool.minTeamSize ?? 1;
        const maxSize = tool.maxTeamSize ?? 10000;

        if (approxSize >= minSize && approxSize <= maxSize) {
          sizeScore = SCORING_WEIGHTS.teamSize;
          matchedFeatures.push(`Optimized for your team size (${answers.companySize.replace("size_", "").toUpperCase()})`);
        } else if (approxSize < minSize) {
          sizeScore = SCORING_WEIGHTS.teamSize * PARTIAL_MATCH.teamTooSmall;
        } else {
          sizeScore = SCORING_WEIGHTS.teamSize * PARTIAL_MATCH.teamTooLarge;
        }
        totalScore += sizeScore;

        // 2. Geographic & Regional Alignment
        let regionMatches = 0;
        for (const r of answers.regions) {
          if (tool.regions.includes(r)) {
            regionMatches++;
          }
        }
        const regionRatio = regionMatches / Math.max(1, answers.regions.length);
        const regionScore = SCORING_WEIGHTS.region * regionRatio;
        totalScore += regionScore;

        if (answers.regions.includes("region_dach") && tool.regions.includes("region_dach")) {
          matchedFeatures.push("Full DACH & German GDPR Compliance");
        }
        if (answers.regions.includes("region_global") && tool.regions.includes("region_global")) {
          matchedFeatures.push("Global multi-country employment support");
        }

        // 3. Core HR Administration Alignment
        if (answers.coreHrNeeds.length > 0) {
          let coreMatches = 0;
          for (const need of answers.coreHrNeeds) {
            if (tool.features.includes(need)) {
              coreMatches++;
            }
          }
          const coreRatio = coreMatches / answers.coreHrNeeds.length;
          totalScore += SCORING_WEIGHTS.coreHr * coreRatio;

          if (answers.coreHrNeeds.includes("core_onboarding") && tool.features.includes("core_onboarding")) {
            matchedFeatures.push("Automated employee onboarding workflows");
          }
          if (answers.coreHrNeeds.includes("core_signatures") && tool.features.includes("core_signatures")) {
            matchedFeatures.push("Integrated digital contract signing");
          }
        } else {
          totalScore += SCORING_WEIGHTS.coreHr * PARTIAL_MATCH.noSelectionCoreHr;
        }

        // 4. Payroll & Compliance Model
        if (answers.payrollModel === "payroll_datev") {
          if (tool.features.includes("payroll_datev") || tool.integrations.includes("int_datev")) {
            totalScore += SCORING_WEIGHTS.payroll;
            matchedFeatures.push("Native DATEV & German tax advisor payroll sync");
          } else if (tool.features.includes("payroll_local_eu")) {
            totalScore += SCORING_WEIGHTS.payroll * PARTIAL_MATCH.payrollPartialDatev;
          }
        } else if (answers.payrollModel === "payroll_global_eor") {
          if (tool.features.includes("payroll_global_eor") || tool.category === "payroll_eor") {
            totalScore += SCORING_WEIGHTS.payroll;
            matchedFeatures.push("Employer of Record (EOR) & multi-currency contractor payouts");
          } else {
            totalScore += SCORING_WEIGHTS.payroll * PARTIAL_MATCH.payrollNoEor;
          }
        } else {
          if (tool.features.includes(answers.payrollModel) || tool.features.includes("payroll_local_eu")) {
            totalScore += SCORING_WEIGHTS.payroll;
          } else {
            totalScore += SCORING_WEIGHTS.payroll * PARTIAL_MATCH.payrollGenericMiss;
          }
        }

        // 5. Recruiting & ATS Match
        if (answers.recruitingNeeds.length > 0) {
          let atsMatches = 0;
          for (const need of answers.recruitingNeeds) {
            if (tool.features.includes(need)) {
              atsMatches++;
            }
          }
          const atsRatio = atsMatches / answers.recruitingNeeds.length;
          totalScore += SCORING_WEIGHTS.recruiting * atsRatio;

          if (answers.recruitingNeeds.includes("ats_multiposting") && tool.features.includes("ats_multiposting")) {
            matchedFeatures.push("One-click job board multiposting");
          }
          if (answers.recruitingNeeds.includes("ats_structured_hiring") && tool.features.includes("ats_structured_hiring")) {
            matchedFeatures.push("Structured interview kits & candidate scorecards");
          }
          if (answers.recruitingNeeds.includes("ats_advanced_analytics") && tool.features.includes("ats_advanced_analytics")) {
            matchedFeatures.push("Hiring velocity & pipeline analytics");
          }
        } else {
          totalScore += SCORING_WEIGHTS.recruiting * PARTIAL_MATCH.noSelectionDefault;
        }

        // 6. Performance & Enablement
        if (answers.performanceNeeds.length > 0) {
          let perfMatches = 0;
          for (const need of answers.performanceNeeds) {
            if (tool.features.includes(need)) {
              perfMatches++;
            }
          }
          const perfRatio = perfMatches / answers.performanceNeeds.length;
          totalScore += SCORING_WEIGHTS.performance * perfRatio;

          if (answers.performanceNeeds.includes("perf_360_reviews") && tool.features.includes("perf_360_reviews")) {
            matchedFeatures.push("360° peer reviews & feedback cycles");
          }
          if (answers.performanceNeeds.includes("perf_okrs") && tool.features.includes("perf_okrs")) {
            matchedFeatures.push("Goal & OKR tracking across teams");
          }
        } else {
          totalScore += SCORING_WEIGHTS.performance * PARTIAL_MATCH.noSelectionDefault;
        }

        // 7. Time & Attendance
        if (answers.timeAttendanceNeeds.length > 0) {
          let timeMatches = 0;
          for (const need of answers.timeAttendanceNeeds) {
            if (tool.features.includes(need)) {
              timeMatches++;
            }
          }
          const timeRatio = timeMatches / answers.timeAttendanceNeeds.length;
          totalScore += SCORING_WEIGHTS.timeAttendance * timeRatio;

          if (answers.timeAttendanceNeeds.includes("time_bag_compliant") && tool.features.includes("time_bag_compliant")) {
            matchedFeatures.push("German BAG-compliant working time recording");
          }
          if (answers.timeAttendanceNeeds.includes("time_project_billing") && tool.features.includes("time_project_billing")) {
            matchedFeatures.push("Project-based billable hours & client reporting");
          }
        } else {
          totalScore += SCORING_WEIGHTS.timeAttendance * PARTIAL_MATCH.noSelectionDefault;
        }

        // 8. Integrations
        if (answers.integrations.length > 0) {
          let intMatches = 0;
          for (const intReq of answers.integrations) {
            if (tool.integrations.includes(intReq)) {
              intMatches++;
            }
          }
          const intRatio = intMatches / answers.integrations.length;
          totalScore += SCORING_WEIGHTS.integrations * intRatio;

          if (answers.integrations.includes("int_slack_teams") && tool.integrations.includes("int_slack_teams")) {
            matchedFeatures.push("Slack & Microsoft Teams integration");
          }
        } else {
          totalScore += SCORING_WEIGHTS.integrations * PARTIAL_MATCH.noSelectionIntegrations;
        }

        const rawPercentage = (totalScore / maxPossibleScore) * 100;
        const normalizedPercentage = Math.min(SCORE_CEILING, Math.max(SCORE_FLOOR, Math.round(rawPercentage)));

        const whyRecommended = RecommendationEngine.generateRationale(tool, answers, normalizedPercentage);

        return {
          toolId: tool.id,
          name: tool.name,
          slug: tool.slug,
          category: tool.category,
          categoryLabel: tool.categoryLabel,
          matchPercentage: normalizedPercentage,
          badge: tool.badge || "Verified Match",
          shortDescription: tool.shortDescription,
          whyRecommended,
          matchedFeatures: Array.from(new Set(matchedFeatures)).slice(0, MAX_MATCHED_FEATURES),
          strengths: tool.strengths || [],
          websiteUrl: tool.websiteUrl,
          pricingTier: tool.pricingTier,
        };
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    const topRecommendations = scoredTools.slice(0, TOP_RESULTS_COUNT);
    const secondaryRecommendations = scoredTools.slice(TOP_RESULTS_COUNT, TOP_RESULTS_COUNT + SECONDARY_RESULTS_COUNT);

    return {
      assessmentSummary: {
        primaryFocus: answers.currentStatus.replace("status_", "").replace("_", " ").toUpperCase(),
        teamSize: answers.companySize.replace("size_", "").toUpperCase(),
        regionsCount: answers.regions.length,
      },
      topRecommendations,
      secondaryRecommendations,
    };
  }

  private static generateRationale(tool: NewTool, answers: AssessmentAnswers, score: number): string {
    if (answers.payrollModel === "payroll_datev" && (tool.id === "personio" || tool.id === "flair")) {
      return `Scored ${score}% match due to native DATEV integration, BAG-compliant time recording, and proven European SME adoption.`;
    }
    if (answers.payrollModel === "payroll_global_eor" && (tool.id === "deel" || tool.id === "workmotion")) {
      return `Scored ${score}% match because of its turnkey multi-country EOR infrastructure, contractor management, and global payroll capabilities.`;
    }
    if (answers.currentStatus === "status_dedicated_ats" && (tool.id === "greenhouse" || tool.id === "ashby")) {
      return `Scored ${score}% match as an industry benchmark for structured hiring, candidate scorecards, and advanced recruiting pipeline analytics.`;
    }
    if (answers.currentStatus === "status_dedicated_perf" && tool.id === "leapsome") {
      return `Scored ${score}% match for its comprehensive 360° reviews, OKR alignment framework, and continuous employee feedback loops.`;
    }
    return `Scored ${score}% match based on strong alignment with your team size, regional compliance needs, and selected workflow automation criteria.`;
  }
}
