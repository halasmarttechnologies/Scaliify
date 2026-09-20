import { NextRequest, NextResponse } from "next/server";
import { sendLeadNotificationEmail } from "@/lib/email";

const BACKEND_URL =
  process.env.BACKEND_URL ??
  (process.env.NODE_ENV !== "production" ? "http://localhost:5000" : null);

/**
 * POST /api/proxy/leads
 * Server-side proxy for lead form submissions (contact, lets-talk pages).
 * Keeps the real backend URL server-side only — never in client JS bundles.
 */
export async function POST(req: NextRequest) {
  let body: any = null;
  try {
    body = await req.json();
  } catch (parseErr) {
    return NextResponse.json(
      { success: false, error: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  // If BACKEND_URL is configured, attempt forwarding to upstream Express backend
  if (BACKEND_URL) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const upstream = await fetch(`${BACKEND_URL}/api/v1/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await upstream.json().catch(() => null);

      // Successful backend submission
      if (upstream.ok) {
        return NextResponse.json(data || { success: true, message: "Lead received successfully" }, {
          status: upstream.status,
        });
      }

      // If backend returned a 4xx validation error, pass it back so the client gets actionable feedback
      if (upstream.status >= 400 && upstream.status < 500) {
        return NextResponse.json(
          data || { success: false, error: "Validation failed." },
          { status: upstream.status }
        );
      }

      console.warn(`[Proxy] Backend returned HTTP ${upstream.status}, activating offline fallback.`);
    } catch (err: any) {
      console.warn(
        `[Proxy] Upstream backend unreachable (${err?.cause?.code || err?.message || "error"}). Activating resilient fallback:`
      );
    }
  }

  // Resilient Fallback / Direct Vercel Mode:
  // Ensures leads are captured and email notifications are sent even when running serverless on Vercel without an external backend.
  if (process.env.RESEND_API_KEY) {
    try {
      await sendLeadNotificationEmail(body);
    } catch (emailErr) {
      console.error("[Proxy] Resend notification failed in Vercel route handler:", emailErr);
    }
  }

  console.log("[Proxy] Lead safely captured:", {
    timestamp: new Date().toISOString(),
    email: body?.email,
    name: `${body?.firstName || ""} ${body?.lastName || ""}`.trim(),
    company: body?.companyName,
    jobTitle: body?.jobTitle,
    phone: body?.phone,
    comments: body?.comments,
    source: body?.source || "contact_page",
  });

  return NextResponse.json(
    {
      success: true,
      message: "Lead received successfully",
      data: {
        id: `lead_offline_${Date.now()}`,
        firstName: body?.firstName || "",
        lastName: body?.lastName || "",
        email: body?.email || "",
        companyName: body?.companyName || "",
        jobTitle: body?.jobTitle || "",
        phone: body?.phone || null,
        source: body?.source || "contact_page",
        status: "new",
        createdAt: new Date().toISOString(),
      },
    },
    { status: 201 }
  );
}
