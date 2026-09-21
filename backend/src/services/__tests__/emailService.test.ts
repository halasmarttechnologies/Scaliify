import { describe, it, expect, vi, beforeEach } from "vitest";
import { EmailService } from "../emailService.js";
import { config } from "../../config/index.js";
import type { LeadContact } from "../../schemas/toolFinder.schema.js";

vi.mock("resend", () => {
  return {
    Resend: class {
      emails = {
        send: vi.fn().mockResolvedValue({
          data: { id: "mock_resend_id_123" },
          error: null,
        }),
      };
    },
  };
});

describe("EmailService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("configures notification recipients properly", () => {
    expect(config.notificationEmails).toBeDefined();
    expect(config.notificationEmails.length).toBeGreaterThan(0);
    expect(config.notificationEmails).toContain("info@scaliify.com");
  });

  it("handles email dispatch without throwing an unhandled exception", async () => {
    const testLead: LeadContact = {
      firstName: "Test",
      lastName: "User",
      email: "test.lead@example.com",
      companyName: "Acme HR Solutions",
      jobTitle: "Head of People",
      phone: "+49 151 12345678",
      comments: "Interested in full HRIS selection.",
      source: "contact_page",
    };

    const result = await EmailService.sendLeadNotification(testLead);
    expect(result).toHaveProperty("success");
  });
});
