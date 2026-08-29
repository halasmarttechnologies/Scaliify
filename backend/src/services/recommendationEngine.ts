import { AssessmentAnswers } from "../schemas/toolFinder.schema.js";
import { calculateRecommendations, TOOL_CATALOG } from "@scaliify/shared";
import type { RecommendationEngineOutput, ToolData } from "@scaliify/shared";

export type { RecommendationEngineOutput };

export type ToolRecommendationResult = RecommendationEngineOutput["topRecommendations"][number];

export class RecommendationEngine {
  public static calculate(answers: AssessmentAnswers, toolList: ToolData[] = TOOL_CATALOG): RecommendationEngineOutput {
    return calculateRecommendations(answers, toolList);
  }
}
