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

export class RecommendationEngine {
  /**
   * Main scoring and recommendation calculation
   */
  public static calculate(answers: AssessmentAnswers, toolList: NewTool[] = initialToolsData): RecommendationEngineOutput {
    const scoredTools = toolList
      .filter((tool) => tool.isActive)
      .map((tool) => {
        let totalScore = 0;
        let maxPossibleScore = 100;
        const matchedFeatures: string[] = [];

        // 1. Team Size Fit (Weight: 15)
        const sizeWeight = 15;
        let sizeScore = 0;
        const sizeMapping: Record<string, number> = {
          size_startup: 15,
          size_sme: 60,
          size_midmarket: 250,
          size_enterprise: 1200,
        };
        const approxSize = sizeMapping[answers.companySize] || 50;
        const minSize = tool.minTeamSize ?? 1;
        const maxSize = tool.maxTeamSize ?? 10000;

        if (approxSize >= minSize && approxSize <= maxSize) {
          sizeScore = sizeWeight;
          matchedFeatures.push(`Optimized for your team size (${answers.companySize.replace("size_", "").toUpperCase()})`);
        } else if (approxSize < minSize) {
          sizeScore = sizeWeight * 0.4; // Slightly too heavy for startup
        } else {
          sizeScore = sizeWeight * 0.5; // Slightly too small for enterprise
        }
        totalScore += sizeScore;

        // 2. Geographic & Regional Alignment (Weight: 20)
        const regionWeight = 20;
        let regionMatches = 0;
        for (const r of answers.regions) {
          if (tool.regions.includes(r)) {
            regionMatches++;
          }
        }
        const regionRatio = regionMatches / Math.max(1, answers.regions.length);
        const regionScore = regionWeight * regionRatio;
        totalScore += regionScore;

        if (answers.regions.includes("region_dach") && tool.regions.includes("region_dach")) {
          matchedFeatures.push("Full DACH & German GDPR Compliance");
        }
        if (answers.regions.includes("region_global") && tool.regions.includes("region_global")) {
          matchedFeatures.push("Global multi-country employment support");
        }

        // 3. Core HR Administration Alignment (Weight: 15)
        const coreHrWeight = 15;
        if (answers.coreHrNeeds.length > 0) {
          let coreMatches = 0;
          for (const need of answers.coreHrNeeds) {
            if (tool.features.includes(need)) {
              coreMatches++;
            }
          }
          const coreRatio = coreMatches / answers.coreHrNeeds.length;
          totalScore += coreHrWeight * coreRatio;

          if (answers.coreHrNeeds.includes("core_onboarding") && tool.features.includes("core_onboarding")) {
            matchedFeatures.push("Automated employee onboarding workflows");
          }
          if (answers.coreHrNeeds.includes("core_signatures") && tool.features.includes("core_signatures")) {
            matchedFeatures.push("Integrated digital contract signing");
          }
        } else {
          totalScore += coreHrWeight * 0.8;
        }

        // 4. Payroll & Compliance Model (Weight: 15)
        const payrollWeight = 15;
        if (answers.payrollModel === "payroll_datev") {
          if (tool.features.includes("payroll_datev") || tool.integrations.includes("int_datev")) {
            totalScore += payrollWeight;
            matchedFeatures.push("Native DATEV & German tax advisor payroll sync");
          } else if (tool.features.includes("payroll_local_eu")) {
            totalScore += payrollWeight * 0.4;
          }
        } else if (answers.payrollModel === "payroll_global_eor") {
          if (tool.features.includes("payroll_global_eor") || tool.category === "payroll_eor") {
            totalScore += payrollWeight;
            matchedFeatures.push("Employer of Record (EOR) & multi-currency contractor payouts");
          } else {
            totalScore += payrollWeight * 0.2;
          }
        } else {
          if (tool.features.includes(answers.payrollModel) || tool.features.includes("payroll_local_eu")) {
            totalScore += payrollWeight;
          } else {
            totalScore += payrollWeight * 0.6;
          }
        }

        // 5. Recruiting & ATS Match (Weight: 10)
        const atsWeight = 10;
        if (answers.recruitingNeeds.length > 0) {
          let atsMatches = 0;
          for (const need of answers.recruitingNeeds) {
            if (tool.features.includes(need)) {
              atsMatches++;
            }
          }
          const atsRatio = atsMatches / answers.recruitingNeeds.length;
          totalScore += atsWeight * atsRatio;

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
          totalScore += atsWeight * 0.75;
        }

        // 6. Performance & Enablement (Weight: 10)
        const perfWeight = 10;
        if (answers.performanceNeeds.length > 0) {
          let perfMatches = 0;
          for (const need of answers.performanceNeeds) {
            if (tool.features.includes(need)) {
              perfMatches++;
            }
          }
          const perfRatio = perfMatches / answers.performanceNeeds.length;
          totalScore += perfWeight * perfRatio;

          if (answers.performanceNeeds.includes("perf_360_reviews") && tool.features.includes("perf_360_reviews")) {
            matchedFeatures.push("360° peer reviews & feedback cycles");
          }
          if (answers.performanceNeeds.includes("perf_okrs") && tool.features.includes("perf_okrs")) {
            matchedFeatures.push("Goal & OKR tracking across teams");
          }
        } else {
          totalScore += perfWeight * 0.75;
        }

        // 7. Time & Attendance (Weight: 10)
        const timeWeight = 10;
        if (answers.timeAttendanceNeeds.length > 0) {
          let timeMatches = 0;
          for (const need of answers.timeAttendanceNeeds) {
            if (tool.features.includes(need)) {
              timeMatches++;
            }
          }
          const timeRatio = timeMatches / answers.timeAttendanceNeeds.length;
          totalScore += timeWeight * timeRatio;

          if (answers.timeAttendanceNeeds.includes("time_bag_compliant") && tool.features.includes("time_bag_compliant")) {
            matchedFeatures.push("German BAG-compliant working time recording");
          }
          if (answers.timeAttendanceNeeds.includes("time_project_billing") && tool.features.includes("time_project_billing")) {
            matchedFeatures.push("Project-based billable hours & client reporting");
          }
        } else {
          totalScore += timeWeight * 0.75;
        }

        // 8. Integrations (Weight: 5)
        const intWeight = 5;
        if (answers.integrations.length > 0) {
          let intMatches = 0;
          for (const intReq of answers.integrations) {
            if (tool.integrations.includes(intReq)) {
              intMatches++;
            }
          }
          const intRatio = intMatches / answers.integrations.length;
          totalScore += intWeight * intRatio;

          if (answers.integrations.includes("int_slack_teams") && tool.integrations.includes("int_slack_teams")) {
            matchedFeatures.push("Slack & Microsoft Teams integration");
          }
        } else {
          totalScore += intWeight * 0.8;
        }

        // Normalize match percentage between 60% and 98%
        const rawPercentage = (totalScore / maxPossibleScore) * 100;
        const normalizedPercentage = Math.min(98, Math.max(55, Math.round(rawPercentage)));

        // Generate tailored Why Recommended rationale
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
          matchedFeatures: Array.from(new Set(matchedFeatures)).slice(0, 5),
          strengths: tool.strengths || [],
          websiteUrl: tool.websiteUrl,
          pricingTier: tool.pricingTier,
        };
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    const topRecommendations = scoredTools.slice(0, 3);
    const secondaryRecommendations = scoredTools.slice(3, 7);

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
