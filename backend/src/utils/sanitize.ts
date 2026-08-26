/**
 * Security Sanitization Utilities
 */

/**
 * Escapes common HTML special characters to prevent Cross-Site Scripting (XSS)
 */
export function escapeHtml(input: string): string {
  if (typeof input !== "string") return input;
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Strips null bytes and control characters from string inputs
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  // Strip null bytes and non-printable control characters (except newline, tab, carriage return)
  const cleaned = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
  return escapeHtml(cleaned);
}

/**
 * Validates and sanitizes safe URLs, strictly disallowing javascript:, data:, file:, etc.
 */
export function sanitizeUrl(rawUrl: string): string | null {
  if (typeof rawUrl !== "string" || !rawUrl.trim()) return null;
  const trimmed = rawUrl.trim();

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.href;
    }
    return null;
  } catch {
    // If not a valid absolute URL, check if it is a safe relative path
    if (trimmed.startsWith("/") && !trimmed.startsWith("//") && !trimmed.includes("\\")) {
      return trimmed;
    }
    return null;
  }
}

/**
 * Deeply sanitizes log objects by masking sensitive credentials, tokens, and PII
 */
export function maskSensitive(obj: any, depth = 0): any {
  if (depth > 5 || !obj) return obj;
  if (typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => maskSensitive(item, depth + 1));
  }

  const sensitiveKeys = [
    "password",
    "passwd",
    "secret",
    "token",
    "accesstoken",
    "refreshtoken",
    "authorization",
    "cookie",
    "api_key",
    "apikey",
    "database_url",
    "databaseurl",
    "credit_card",
    "cardnumber",
  ];

  const masked: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase().replace(/[-_]/g, "");
    if (sensitiveKeys.includes(lowerKey)) {
      masked[key] = "[REDACTED]";
    } else if (typeof value === "object" && value !== null) {
      masked[key] = maskSensitive(value, depth + 1);
    } else {
      masked[key] = value;
    }
  }

  return masked;
}
