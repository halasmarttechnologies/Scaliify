# Scaliify — Production Security & Hardening Architecture

This document details the production security architecture, threat model mitigations, defensive controls, and operational guidelines implemented across the Scaliify full-stack platform.

---

## 1. Architectural Security Overview

```text
┌────────────────────────────────────────────────────────┐
│                   Client Browser                       │
│  - Strict Content-Security-Policy (CSP)                │
│  - X-Frame-Options: DENY (Clickjacking Defense)        │
│  - X-Content-Type-Options: nosniff                     │
│  - Zero secrets in bundle (no server keys in client)   │
└─────────────────────────┬──────────────────────────────┘
                          │ HTTPS / TLS 1.3
                          ▼
┌────────────────────────────────────────────────────────┐
│               Frontend (Next.js 16)                    │
│  - Next.js HTTP Security Headers                       │
│  - poweredByHeader: false                              │
│  - Client-side input trimming & validation             │
│  - Safe external link protocol enforcement             │
└─────────────────────────┬──────────────────────────────┘
                          │ REST JSON (Over TLS)
                          ▼
┌────────────────────────────────────────────────────────┐
│             Backend API (Node.js / Express)            │
│  - Global & Sensitive Rate Limiters (express-rate-limit│
│  - Helmet Security Suite (HSTS 2-year, CSP, Frameguard)│
│  - Strict 100kb payload limit                          │
│  - Content-Type: application/json enforcement          │
│  - Deep recursive XSS & control character sanitizer   │
│  - Strict Zod schema boundaries & regex checks         │
│  - Sanitized logging (masked PII & credentials)        │
│  - Safe global error handling (no stack traces in prod)│
└─────────────────────────┬──────────────────────────────┘
                          │ Parameterized SQL Queries
                          ▼
┌────────────────────────────────────────────────────────┐
│          PostgreSQL Database (Drizzle ORM)             │
│  - Parameterized queries (Zero raw string concatenation│
│  - Strict column constraints & foreign key cascades    │
│  - Protected schema migrations                         │
└────────────────────────────────────────────────────────┘
```

---

## 2. Secrets & API Keys Management

1. **Server-Only Boundary**:
   * All sensitive credentials (`DATABASE_URL`, `RESEND_API_KEY`, internal secret keys) reside strictly within server runtime environments and are never prefixed with `NEXT_PUBLIC_`.
   * Client-side bundles and source maps are verified to ensure zero credential leakage.
2. **Environment Template Integrity**:
   * `.env.example` files are maintained in root, `frontend/`, and `backend/` containing safe dummy placeholders.
   * `.gitignore` explicitly blocks `.env`, `.env.local`, `.env.*.local`, `*.pem`, `*.key`, and `*.cert`.

---

## 3. Frontend Security Controls

1. **Content Security Policy (CSP)**:
   * Next.js headers restrict script, style, font, image, and network connection sources:
     * Scripts: `'self' 'unsafe-inline' 'unsafe-eval'` (required for Turbopack client hydration).
     * Styles: `'self' 'unsafe-inline' https://fonts.googleapis.com`.
     * Fonts: `'self' https://fonts.gstatic.com data:`.
     * Connect: `'self' http://localhost:5000 https://api.scaliify.com`.
     * Frame Ancestors: `'none'`.
2. **Clickjacking & MIME Protection**:
   * `X-Frame-Options: DENY` prevents framing inside malicious iframes.
   * `X-Content-Type-Options: nosniff` prevents browser MIME-sniffing exploits.
   * `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`.
3. **Safe Link Navigation**:
   * External tool links (`websiteUrl`) are validated via `isSafeHttpUrl` ensuring only `http:` or `https:` protocols execute, preventing `javascript:` pseudo-protocol execution.

---

## 4. API & Input Hardening

1. **Rate Limiting & Abuse Prevention**:
   * **Global API Limiter**: 150 requests per 15 minutes per IP.
   * **Sensitive Mutation Limiter**: 20 submissions per hour per IP on `POST /api/v1/tool-finder/assess` and `POST /api/v1/leads` to eliminate spam and scraping.
2. **Content-Type & Body Size Constraints**:
   * Mutating routes strictly enforce `Content-Type: application/json` (returning `415 Unsupported Media Type` otherwise).
   * Request bodies are capped at `100kb` (`express.json({ limit: "100kb" })`), mitigating memory exhaustion attacks.
3. **XSS & Injection Sanitization**:
   * All incoming request payloads undergo deep recursive sanitization in `backend/src/middleware/security.middleware.ts`, escaping dangerous HTML characters (`<`, `>`, `&`, `"`, `'`, `/`) and stripping non-printable control characters.
4. **Strict Zod Boundary Validation**:
   * String lengths, character regex sets (`/^[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF'.-]+$/`), email formats, and enum boundaries are enforced on the backend regardless of client-side validation.

---

## 5. Database & SQL Injection Defense

1. **Parameterized Queries**:
   * All database interactions are executed through **Drizzle ORM** parameterized queries.
   * No raw SQL strings or user-concatenated queries are constructed.
2. **SQL Injection Attack Verification**:
   * Automated security test cases verify that attack vectors (e.g. `' OR 1=1 --`, `; DROP TABLE tools; --`, `UNION SELECT`) are treated as literal strings and cannot alter query logic.

---

## 6. Tool Finder Integrity & Scoring Security

1. **Server-Side Scoring Authority**:
   * The client only submits user answers (company size, regions, requirement tags).
   * The backend independently matches these answers against database tool features and executes the multi-factor scoring algorithm.
   * The client is never permitted to supply match percentages or dictate recommendation ranks.

---

## 7. Error Handling & Information Disclosure

1. **Zero Stack Trace Exposure**:
   * In production (`NODE_ENV=production`), all unhandled errors return generic responses (`"An unexpected server error occurred."`).
   * Database table names, column structures, SQL errors, and system file paths are completely suppressed.
2. **Sanitized Logging**:
   * Server logs pass through `maskSensitive()` in `utils/sanitize.ts` to automatically redact passwords, tokens, API keys, and connection strings.

---

## 8. Automated Security Test Suite

Run the automated security test suite anytime via:

```bash
# In scaliify/ or scaliify/backend/
npm run test:security
```

### Automated Assertions:
1. `X-Content-Type-Options: nosniff` validation.
2. `X-Frame-Options: DENY` validation.
3. `Strict-Transport-Security` (HSTS) presence.
4. `Content-Security-Policy` (CSP) presence.
5. Removal of `X-Powered-By` fingerprinting.
6. SQL Injection payload handling.
7. Suppression of raw database error leakage.
8. XSS payload sanitization.
9. Content-Type enforcement (415 status on invalid formats).
10. Malformed JSON handling (standard 400 Bad Request).
11. Information disclosure & stack trace suppression.

---

## 9. Pre-Production Security Checklist

Before deploying to production environments (e.g. Vercel / Railway / AWS):

- [x] Environment variable templates maintained without real secrets.
- [x] Next.js security headers configured.
- [x] Backend Helmet & CSP configured.
- [x] Rate limiting active on all public endpoints.
- [x] Input sanitization and Zod boundaries active.
- [x] Parameterized Drizzle queries verified against SQLi.
- [x] Automated security audit suite passes with 100% assertions.
- [x] `NODE_ENV=production` set in production environment variables.
- [x] SSL/TLS 1.3 enforced across all domain routes.
