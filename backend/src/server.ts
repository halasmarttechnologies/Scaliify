import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/index.js";
import apiRouter from "./routes/index.js";
import { globalRateLimiter, sanitizeRequestBody } from "./middleware/security.middleware.js";

const app = express();

// Disable X-Powered-By header for fingerprinting reduction
app.disable("x-powered-by");

// Trust proxy if behind a reverse proxy (e.g. Vercel, Cloudflare, Nginx)
app.set("trust proxy", 1);

// 1. Comprehensive Helmet Security Headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", config.frontendUrl],
        fontSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: config.nodeEnv === "production" ? [] : null,
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    hsts: {
      maxAge: 63072000, // 2 years
      includeSubDomains: true,
      preload: true,
    },
    frameguard: { action: "deny" },
    noSniff: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);

// 2. Hardened CORS Configuration
const allowedOrigins =
  config.nodeEnv === "production"
    ? [config.frontendUrl].filter(Boolean)
    : [config.frontendUrl, "http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001"].filter(Boolean);


app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (e.g. curl, health checks) or verified origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS validation failed: Origin not allowed"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    maxAge: 86400, // 24 hours preflight cache
  })
);

// 3. Strict Payload Body Limits (Prevents memory exhaustion & DDoS)
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

// 4. Global API Rate Limiter
app.use("/api", globalRateLimiter);

// 5. Global Input Sanitizer
app.use(sanitizeRequestBody);

// 6. Health Check Endpoint
app.get("/api/v1/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "scaliify-backend-api",
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// 7. Mount Main API Router
app.use("/api/v1", apiRouter);

// 8. Safe 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "API endpoint not found",
  });
});

// 9. Centralized Error Handler (Suppresses internal errors and stack traces)
app.use((err: Error & { type?: string; status?: number; statusCode?: number }, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled Application Error:", err.message);

  // If payload too large error from express.json
  if (err.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      error: "Payload Too Large. Maximum allowed size is 100kb.",
    });
  }

  // If JSON parse error
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      error: "Malformed JSON payload.",
    });
  }

  // Safe Generic Error in production
  const statusCode = err.status || err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    error: config.nodeEnv === "production" ? "An unexpected server error occurred." : err.message || "Server error",
  });
});

// Start Server
if (process.env.NODE_ENV !== "test") {
  app.listen(config.port, () => {
    console.log(`🚀 Scaliify Backend API running securely on port ${config.port} [${config.nodeEnv}]`);
  });
}

export default app;
