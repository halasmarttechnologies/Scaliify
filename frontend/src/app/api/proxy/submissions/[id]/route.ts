import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL ??
  (process.env.NODE_ENV !== "production" ? "http://localhost:5000" : null);

/**
 * GET /api/proxy/submissions/[id]
 * Server-side proxy — keeps the backend URL out of client JS bundles.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!BACKEND_URL) {
    return NextResponse.json({ success: false, error: "Service unavailable." }, { status: 503 });
  }

  // Basic UUID format guard before calling upstream
  if (!/^[0-9a-f-]{36}$/.test(id)) {
    return NextResponse.json({ success: false, error: "Invalid submission ID." }, { status: 400 });
  }

  try {
    const upstream = await fetch(
      `${BACKEND_URL}/api/v1/tool-finder/submissions/${encodeURIComponent(id)}`,
      { method: "GET", headers: { Accept: "application/json" } }
    );
    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error("[Proxy] Submission fetch error:", err);
    return NextResponse.json({ success: false, error: "Upstream error." }, { status: 502 });
  }
}
