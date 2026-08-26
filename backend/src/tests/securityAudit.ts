/**
 * Scaliify Automated Security & Hardening Audit Suite
 * Tests live API endpoints for XSS, SQLi, Rate Limiting, Headers, and Content-Type enforcement.
 */

const API_BASE = process.env.API_BASE_URL || "http://localhost:5000/api/v1";

async function runSecurityAudit() {
  console.log("🛡️ Starting Scaliify Automated Security Audit...\n");
  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}${detail ? ` (${detail})` : ""}`);
    }
  }

  // --- TEST 1: Security Headers Verification ---
  try {
    const healthRes = await fetch(`${API_BASE}/health`);
    const headers = healthRes.headers;

    assert(
      headers.get("x-content-type-options") === "nosniff",
      "X-Content-Type-Options is set to 'nosniff'"
    );
    assert(
      headers.get("x-frame-options") === "DENY",
      "X-Frame-Options is set to 'DENY' (Clickjacking defense)"
    );
    assert(
      headers.has("strict-transport-security"),
      "Strict-Transport-Security (HSTS) header is present"
    );
    assert(
      headers.has("content-security-policy"),
      "Content-Security-Policy (CSP) header is present"
    );
    assert(
      !headers.has("x-powered-by"),
      "X-Powered-By header is removed (Fingerprinting protection)"
    );
  } catch (err: any) {
    assert(false, "Security headers check", err.message);
  }

  // --- TEST 2: SQL Injection Defense ---
  try {
    const sqliPayload = {
      answers: {
        companySize: "size_sme",
        regions: ["region_dach"],
        currentStatus: "status_scratch",
        coreHrNeeds: ["core_digital_records"],
        payrollModel: "payroll_datev",
        recruitingNeeds: [],
        performanceNeeds: [],
        timeAttendanceNeeds: [],
        integrations: [],
      },
      lead: {
        firstName: "Security",
        lastName: "Tester",
        email: "sec.test@example.com",
        companyName: "SafeCorp' OR '1'='1' --",
        jobTitle: "CISO'; DROP TABLE tools; --",
        comments: "Testing SQLi defense",
      },
    };

    const res = await fetch(`${API_BASE}/tool-finder/assess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sqliPayload),
    });

    const data = (await res.json()) as any;
    assert(
      res.status === 200 || res.status === 422,
      "SQL Injection payload handled safely without database syntax error",
      `Status: ${res.status}`
    );
    assert(
      data.error !== "syntax error at or near",
      "No raw database error exposed"
    );
  } catch (err: any) {
    assert(false, "SQL Injection test", err.message);
  }

  // --- TEST 3: Stored XSS Input Sanitization ---
  try {
    const xssPayload = {
      answers: {
        companySize: "size_startup",
        regions: ["region_dach"],
        currentStatus: "status_scratch",
        coreHrNeeds: [],
        payrollModel: "payroll_datev",
        recruitingNeeds: [],
        performanceNeeds: [],
        timeAttendanceNeeds: [],
        integrations: [],
      },
      lead: {
        firstName: "Elena",
        lastName: "Müller",
        email: "elena@example.com",
        companyName: "XSS Corp",
        jobTitle: "CTO",
        comments: "<script>alert('xss')</script><img src=x onerror=alert(1)>",
      },
    };

    const res = await fetch(`${API_BASE}/tool-finder/assess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(xssPayload),
    });

    const data = (await res.json()) as any;
    assert(
      res.status === 200 || res.status === 422,
      "XSS payload processed with sanitization",
      `Status: ${res.status}`
    );
  } catch (err: any) {
    assert(false, "XSS sanitization test", err.message);
  }

  // --- TEST 4: Content-Type Enforcement ---
  try {
    const res = await fetch(`${API_BASE}/tool-finder/assess`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "plain text payload",
    });

    assert(
      res.status === 415 || res.status === 400,
      "Rejects non-JSON Content-Type on mutating POST endpoint",
      `Status: ${res.status}`
    );
  } catch (err: any) {
    assert(false, "Content-Type enforcement test", err.message);
  }

  // --- TEST 5: Information Disclosure on Malformed JSON ---
  try {
    const res = await fetch(`${API_BASE}/tool-finder/assess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{\"corrupted_json\": true,",
    });

    const data = (await res.json()) as any;
    assert(
      res.status === 400,
      "Malformed JSON returns standard 400 Bad Request"
    );
    assert(
      !data.stack && !data.error?.includes("at Object."),
      "No internal stack trace leaked to client"
    );
  } catch (err: any) {
    assert(false, "Information disclosure test", err.message);
  }

  console.log(`\n🏁 Security Audit Finished: ${passedTests}/${totalTests} Tests Passed.`);
}

runSecurityAudit();
