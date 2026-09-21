import { Resend } from "resend";

function escapeHtml(text?: string | null): string {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendLeadNotificationEmail(lead: {
  firstName?: string;
  lastName?: string;
  email?: string;
  companyName?: string;
  jobTitle?: string;
  phone?: string;
  comments?: string;
  source?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY is not configured in environment variables.");
    return { success: false, error: "RESEND_API_KEY missing" };
  }

  const rawRecipients = process.env.NOTIFICATION_EMAIL || "info@scaliify.com";
  const recipients = rawRecipients
    .split(",")
    .map((e) => e.trim())
    .filter((e) => e.includes("@"));

  if (recipients.length === 0) {
    recipients.push("info@scaliify.com");
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "Scaliify Notifications <notifications@scaliify.com>";

  const fullName = `${lead.firstName || ""} ${lead.lastName || ""}`.trim() || "Website Visitor";
  const sourceLabel = lead.source?.replace(/_/g, " ").toUpperCase() || "WEBSITE INQUIRY";
  const subject = `[Scaliify New Lead] ${fullName} – ${lead.companyName || "Website Lead"} (${sourceLabel})`;

  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(lead.email || "");
  const safeCompany = escapeHtml(lead.companyName || "Not specified");
  const safeJobTitle = escapeHtml(lead.jobTitle || "Not specified");
  const safePhone = escapeHtml(lead.phone || "Not specified");
  const safeComments = lead.comments ? escapeHtml(lead.comments).replace(/\n/g, "<br/>") : "No additional comments provided.";
  const safeSource = escapeHtml(lead.source || "contact_page");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f6f8; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
          <tr>
            <td style="background-color: #05434B; padding: 28px 32px; border-bottom: 3px solid #c99b24;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Scaliify</span>
                    <span style="display: block; font-size: 13px; color: #a5c7cc; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px;">New Form Submission</span>
                  </td>
                  <td align="right">
                    <span style="background-color: rgba(201, 155, 36, 0.2); color: #ffd666; border: 1px solid rgba(201, 155, 36, 0.4); padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; text-transform: uppercase;">
                      ${safeSource}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 700; color: #0f172a;">
                You received a new inquiry from <span style="color: #05434B;">${safeName}</span>
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b; width: 140px;">Full Name</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #0f172a;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b;">Work Email</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0284c7; font-weight: 500;">
                    <a href="mailto:${safeEmail}" style="color: #0284c7; text-decoration: none;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b;">Company</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0f172a; font-weight: 500;">${safeCompany}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b;">Job Title / Role</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0f172a;">${safeJobTitle}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b;">Phone Number</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0f172a;">${safePhone}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Inquiry Source</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #0f172a;">${safeSource}</td>
                </tr>
              </table>

              <div style="margin-bottom: 28px;">
                <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; margin-bottom: 8px;">
                  Message / Requirements / Scope:
                </div>
                <div style="background-color: #f1f5f9; border-left: 4px solid #05434B; border-radius: 4px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155;">
                  ${safeComments}
                </div>
              </div>

              ${
                safeEmail
                  ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top: 16px;">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #05434B;">
                    <a href="mailto:${safeEmail}?subject=Re:%20Your%20inquiry%20with%20Scaliify" style="font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block;">
                      Reply directly to ${safeName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>`
                  : ""
              }
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
              This notification was generated automatically by the Scaliify website lead capture system.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
[Scaliify New Lead Notification]
=========================================
Source: ${safeSource}
Lead Name: ${fullName}
Work Email: ${lead.email || "Not provided"}
Company: ${lead.companyName || "Not provided"}
Job Title: ${lead.jobTitle || "Not specified"}
Phone: ${lead.phone || "Not specified"}

Message / Requirements:
${lead.comments || "No additional comments provided."}
=========================================
Reply directly to: ${lead.email || "N/A"}
  `.trim();

  try {
    const resend = new Resend(apiKey);
    const response = await resend.emails.send({
      from: fromEmail,
      to: recipients,
      replyTo: lead.email || undefined,
      subject,
      html,
      text,
    });

    if (response.error) {
      console.error("[Email] Resend dispatch error:", response.error);
      return { success: false, error: response.error.message };
    }

    console.log(`[Email] Lead notification sent via Resend (ID: ${response.data?.id}) to ${recipients.join(", ")}`);
    return { success: true, id: response.data?.id };
  } catch (err: any) {
    console.error("[Email] Unexpected error during Resend email send:", err);
    return { success: false, error: err?.message || "Unknown error" };
  }
}
