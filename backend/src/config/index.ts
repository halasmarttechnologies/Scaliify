import * as dotenv from "dotenv";
import * as path from "path";
import { z } from "zod";

// Load .env from backend dir first (specific), then root (general fallback)
dotenv.config({ path: path.resolve(process.cwd(), "backend/.env") });
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
  RESEND_API_KEY: z.string().default(""),
  NOTIFICATION_EMAIL: z.string().default("info@scaliify.com"),
  RESEND_FROM_EMAIL: z.string().default("Scaliify Notifications <notifications@scaliify.com>"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const formatted = parsed.error.issues
    .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
  const msg = `\n❌ Invalid environment configuration:\n${formatted}\n`;

  if (process.env.NODE_ENV === "production") {
    throw new Error(msg);
  }
  console.warn(msg);
}

if (!parsed.success && !process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required. Set it in your .env file.");
}

const env = parsed.success ? parsed.data : envSchema.parse(process.env);

const notificationEmails = (env.NOTIFICATION_EMAIL || "info@scaliify.com")
  .split(",")
  .map((email) => email.trim())
  .filter((email) => email.length > 0 && email.includes("@"));

export const config = {
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  frontendUrl: env.FRONTEND_URL,
  databaseUrl: env.DATABASE_URL,
  resendApiKey: env.RESEND_API_KEY,
  notificationEmail: env.NOTIFICATION_EMAIL,
  notificationEmails: notificationEmails.length > 0 ? notificationEmails : ["info@scaliify.com"],
  resendFromEmail: env.RESEND_FROM_EMAIL,
};
