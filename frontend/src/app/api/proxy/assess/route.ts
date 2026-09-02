import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side API proxy for the tool-finder assessment.
 *
 * Why this exists:
 * By routing through this proxy, the real backend URL (BACKEND_URL)
 * stays server-side only — it is never bundled into client JS or
 * visible in browser DevTools. Only this Next.js server knows where
 * the backend lives.
 *
 * The frontend calls /api/proxy/assess instead of the backend directly.
 */

const BACKEND_URL =
  process.env.BACKEND_URL ??
  (process.env.NODE_ENV !== "production" ? "http://localhost:5000" : null);

export async function POST(req: NextRequest) {
  if (!BACKEND_URL) {
    console.error("[Proxy] BACKEND_URL is not configured.");
    return NextResponse.json({ success: false, error: "Service unavailable." }, { status: 503 });
  }

  try {
    const body = await req.json();

    const upstream = await fetch(`${BACKEND_URL}/api/v1/tool-finder/assess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error("[Proxy] Tool finder assess error:", err);
    return NextResponse.json({ success: false, error: "Upstream error." }, { status: 502 });
  }
}
