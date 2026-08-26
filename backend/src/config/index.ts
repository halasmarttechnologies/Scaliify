import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "backend/.env") });
dotenv.config({ path: "./backend/.env" });
dotenv.config();

const nodeEnv = process.env.NODE_ENV || "development";

if (nodeEnv === "production" && !process.env.DATABASE_URL) {
  console.error("❌ CRITICAL: DATABASE_URL environment variable is required in production mode.");
}

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  databaseUrl: process.env.DATABASE_URL || "postgresql://postgres:123@localhost:5432/scaliify_db",
  resendApiKey: process.env.RESEND_API_KEY || "",
  notificationEmail: process.env.NOTIFICATION_EMAIL || "hello@scaliify.com",
};

