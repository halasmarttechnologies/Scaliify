import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL ??
  (process.env.NODE_ENV !== "production" ? "http://localhost:5000" : null);

/**
 * POST /api/proxy/leads
 * Server-side proxy for lead form submissions (contact, lets-talk pages).
 * Keeps the real backend URL server-side only — never in client JS bundles.
 */
export async function POST(req: NextRequest) {
  if (!BACKEND_URL) {
    console.error("[Proxy] BACKEND_URL is not configured.");
    return NextResponse.json({ success: false, error: "Service unavailable." }, { status: 503 });
  }

  try {
    const body = await req.json();

    const upstream = await fetch(`${BACKEND_URL}/api/v1/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error("[Proxy] Leads submit error:", err);
    return NextResponse.json({ success: false, error: "Upstream error." }, { status: 502 });
  }
}
