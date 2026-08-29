import { TOOL_CATALOG } from "@scaliify/shared";
import type { NewTool } from "../schema.js";

/**
 * Initial tool catalog data for seeding the database.
 * Single source of truth lives in @scaliify/shared — this re-exports
 * the same catalog typed as NewTool[] for Drizzle insert operations.
 */
export const initialToolsData: NewTool[] = TOOL_CATALOG as unknown as NewTool[];
