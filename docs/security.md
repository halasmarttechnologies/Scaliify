# Scaliify — Production Security Architecture

Last audited: 2026-08-30

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
│  - PII auto-expiration in localStorage (24h TTL)       │
└─────────────────────────┬──────────────────────────────┘
                          │ REST JSON (Over TLS)
                          ▼
┌────────────────────────────────────────────────────────┐
│             Backend API (Node.js / Express)            │
│  - Distributed rate limiting (Upstash Redis + fallback)│
│  - Helmet Security Suite (HSTS 2-year, CSP, Frameguard)│
│  - Strict 100kb payload limit                          │
│  - Content-Type: application/json enforcement          │
│  - Deep recursive XSS & control character sanitizer    │
│  - Strict Zod schema validation on all inputs          │
│  - Sanitized logging (masked PII & credentials)        │
│  - Safe global error handling (no stack traces in prod) │
└─────────────────────────┬──────────────────────────────┘
                          │ Parameterized SQL Queries
                          ▼
┌────────────────────────────────────────────────────────┐
│          PostgreSQL Database (Drizzle ORM)             │
│  - Parameterized queries (zero raw string concatenation)│
│  - Strict column constraints & foreign key cascades    │
│  - drizzle-orm v0.45.2+ (patched GHSA-gpj5-g38j-94v9) │
└────────────────────────────────────────────────────────┘
```

---

## 2. Secrets & Credentials

- **No hardcoded credentials** in source code. `DATABASE_URL` is required via environment variable; the app fails fast at startup if missing.
- All secrets (`DATABASE_URL`, `RESEND_API_KEY`, `UPSTASH_REDIS_REST_TOKEN`) are server-only environment variables — never prefixed with `NEXT_PUBLIC_`.
- Only one `NEXT_PUBLIC_` variable: `NEXT_PUBLIC_BACKEND_URL` (public API base URL, not a secret).
- `.gitignore` excludes `.env`, `.env.local`, `.env.*.local`, `*.pem`, `*.key`, `*.cert`.
- `.env.example` files contain placeholder values only.
- Startup Zod validation catches misconfigured env vars before the server accepts traffic.

---

## 3. Input Validation

All user-controlled input is validated server-side with Zod:

| Endpoint | Validation |
|----------|------------|
| `POST /tool-finder/assess` | `toolFinderAssessmentSubmissionSchema` — strict enums, array caps (max 10), regex name validation, length limits |
| `POST /leads` | `leadContactSchema` — regex names, email format, phone pattern, max 1000 char comments |
| `GET /tools?category=&region=` | Zod schema: `^[a-z0-9_-]+$`, max 50 chars |
| `GET /tools/:slug` | Zod: `^[a-z0-9-]+$`, max 100 chars |
| `GET /tool-finder/submissions/:id` | Zod UUID format validation |

Frontend validation exists for UX only — it is never trusted for security.

---

## 4. SQL Injection Prevention

- All database operations use **Drizzle ORM's type-safe query builder**.
- No raw SQL, `sql` tagged templates, `.raw()`, or `.execute()` calls exist in the codebase.
- `drizzle-orm` upgraded from v0.39.3 to v0.45.2+ to patch GHSA-gpj5-g38j-94v9 (SQL injection via improperly escaped identifiers).

---

## 5. XSS Prevention

- No `dangerouslySetInnerHTML`, `eval()`, `new Function()`, or `.innerHTML` in frontend code.
- Backend applies **global input sanitization** — HTML-escapes `& < > " ' /`, strips null bytes and control characters from all request body strings.
- CSP restricts `script-src` to `'self' 'unsafe-inline'`; `'unsafe-eval'` allowed in development only.
- Tool website URLs validated with `isSafeHttpUrl()` before rendering — only `http:` and `https:` protocols allowed.
- Error responses never echo user input back (slug/ID not reflected in error messages).

---

## 6. Rate Limiting

| Scope | Limit | Backend |
|-------|-------|---------|
| Global API | 100 req / 10s per IP | Upstash Redis (sliding window) |
| Sensitive endpoints | 10 req / 60s per IP | Upstash Redis (sliding window) |
| Global (fallback) | 150 req / 15min per IP | express-rate-limit (in-memory) |
| Sensitive (fallback) | 20 req / 1hr per IP | express-rate-limit (in-memory) |

Sensitive rate limiter applied to: `POST /tool-finder/assess`, `POST /leads`.
Global rate limiter applied to all `/api` routes.

---

## 7. CORS

- **Production**: Only the configured `FRONTEND_URL` origin is allowed.
- **Development**: Additionally allows `localhost:3000`, `127.0.0.1:3000`, `localhost:3001`.
- Allowed methods: `GET`, `POST`, `OPTIONS`.
- Credentials: enabled.
- Preflight cache: 24 hours.

---

## 8. Security Headers

Both frontend (Next.js) and backend (Helmet) set:

- `Content-Security-Policy` (environment-aware; localhost removed from `connect-src` in production)
- `Strict-Transport-Security` (2-year max-age, includeSubDomains, preload)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera, microphone, geolocation, browsing-topics disabled)
- `X-Powered-By` header removed

---

## 9. Tool Finder Scoring Integrity

- The authoritative scoring engine lives in `@scaliify/shared` and runs on the **backend**.
- Frontend uses an identical copy as a **fallback only** when the backend is unreachable.
- Backend-computed results are persisted in PostgreSQL as the source of truth.
- Match percentages clamped to 55-98% server-side — clients cannot inflate scores.

---

## 10. Data Persistence Security

- **localStorage**: In-progress drafts auto-expire after 24 hours. Email is excluded from draft data.
- **sessionStorage**: Client-side fallback results only (tab-scoped, cleared on close).
- **No cookies** are used by the application.
- No secrets, API keys, or tokens are stored in browser storage.

---

## 11. Error Handling

- Production errors return generic messages; stack traces suppressed.
- Error responses never expose database details, file paths, or internal architecture.
- Logs sanitized via `maskSensitive()` — passwords, tokens, API keys, connection strings redacted.
- Payload size: 100KB limit (413 on oversize). Malformed JSON: 400.

---

## 12. Dependency Security

- `npm audit --omit=dev` returns **0 vulnerabilities**.
- drizzle-orm upgraded to v0.45.2+ (GHSA-gpj5-g38j-94v9 patched).
- 4 moderate dev-only vulnerabilities in drizzle-kit's transitive esbuild dependency (does not affect production).

---

## 13. CI/CD Security

GitHub Actions pipeline (`.github/workflows/ci.yml`) runs on every push and PR:

1. **Lint** — ESLint
2. **Type check** — TypeScript (frontend + backend)
3. **Tests** — Vitest (backend + frontend)
4. **Dependency audit** — `npm audit --omit=dev`
5. **Secret scanning** — Regex grep for API key patterns in source
6. **Build** — Production build verification

---

## 14. What This App Does NOT Have (By Design)

| Feature | Status | Notes |
|---------|--------|-------|
| User authentication | Not implemented | Public consultancy website |
| Session management | Not needed | No authenticated state |
| CSRF tokens | Not needed | No cookie-based auth |
| File uploads | Not implemented | No upload endpoints exist |
| Outbound URL fetching | Not implemented | No SSRF surface |
| Redirects | Not implemented | No open redirect surface |

---

## 15. Remaining Advisories

1. **`unsafe-inline` in CSP script-src**: Required by Next.js for inline script injection during SSR. Mitigated by absence of `dangerouslySetInnerHTML` and input sanitization.
2. **Placeholder forms**: "Let's Talk" and "Contact" forms show success without sending data to backend — UX placeholders awaiting backend integration.
3. **Dev-only esbuild vulnerability**: 4 moderate vulns in drizzle-kit's transitive esbuild dep — dev-only, does not affect production.

---

## 16. Security Checklist

- [x] No hardcoded secrets in source code
- [x] `.env` files excluded from Git
- [x] `.env.example` files contain only placeholders
- [x] Startup env validation (fail-fast on missing DATABASE_URL)
- [x] All user input validated server-side with Zod
- [x] No raw SQL queries — Drizzle ORM only
- [x] drizzle-orm patched to v0.45.2+ (SQL injection fix)
- [x] No XSS vectors (no dangerouslySetInnerHTML, eval, innerHTML)
- [x] Global input sanitization middleware
- [x] Distributed rate limiting (Upstash Redis + fallback)
- [x] CORS restricted to trusted origins in production
- [x] Security headers (CSP, HSTS, X-Frame-Options, etc.)
- [x] Error messages sanitized in production
- [x] Tool URLs validated with isSafeHttpUrl before rendering
- [x] PII auto-expires from localStorage (24h TTL)
- [x] Scoring engine authoritative on backend
- [x] Dependencies audited — 0 production vulnerabilities
- [x] CI pipeline with security checks
- [x] No NEXT_PUBLIC_ secrets
- [x] No reflected user input in error responses
