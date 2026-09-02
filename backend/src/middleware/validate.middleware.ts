import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

/**
 * Reusable Zod validation middleware factory.
 *
 * Usage:
 *   router.post("/leads", validate(leadsBodySchema), LeadsController.createLead)
 *
 * On failure → 422 with structured field-level errors so the client knows exactly
 * what went wrong without revealing internal implementation details.
 */
export function validate(schema: ZodSchema, target: "body" | "query" | "params" = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const fieldErrors = formatZodErrors(result.error);
      return res.status(422).json({
        success: false,
        error: "Validation failed. Please check your input.",
        fields: fieldErrors,
      });
    }

    // Replace request data with the parsed (coerced + trimmed) version
    req[target] = result.data;
    next();
  };
}

/**
 * Formats Zod errors into a flat { field: [messages] } map.
 * Path arrays are joined with "." so nested fields are readable.
 */
function formatZodErrors(error: ZodError): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const path = issue.path.length > 0 ? issue.path.join(".") : "_root";
    if (!out[path]) out[path] = [];
    out[path].push(issue.message);
  }
  return out;
}
