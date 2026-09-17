import { describe, it, expect } from "vitest";
import { assessmentAnswersSchema, leadContactSchema, toolFinderAssessmentSubmissionSchema } from "../toolFinder.schema";

function validAnswers() {
  return {
    companySize: "size_sme",
    regions: ["region_dach"],
    currentStatus: "status_scratch",
    payrollModel: "payroll_local_eu",
  };
}

function validLead() {
  return {
    firstName: "Jane",
    lastName: "Doe",
    email: "Jane.Doe@Example.com",
    companyName: "Scaliify GmbH",
    jobTitle: "Head of HR",
  };
}

describe("assessmentAnswersSchema", () => {
  it("accepts a minimal valid payload and defaults optional arrays to []", () => {
    const result = assessmentAnswersSchema.parse(validAnswers());
    expect(result.coreHrNeeds).toEqual([]);
    expect(result.recruitingNeeds).toEqual([]);
    expect(result.performanceNeeds).toEqual([]);
    expect(result.timeAttendanceNeeds).toEqual([]);
    expect(result.integrations).toEqual([]);
  });

  it("rejects an invalid companySize enum value", () => {
    const result = assessmentAnswersSchema.safeParse({ ...validAnswers(), companySize: "size_huge" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty regions array", () => {
    const result = assessmentAnswersSchema.safeParse({ ...validAnswers(), regions: [] });
    expect(result.success).toBe(false);
  });

  it("rejects more than 5 regions", () => {
    const result = assessmentAnswersSchema.safeParse({
      ...validAnswers(),
      regions: ["region_dach", "region_uk_europe", "region_global", "region_north_america", "region_mena", "region_dach"],
    });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown region value instead of silently dropping it", () => {
    const result = assessmentAnswersSchema.safeParse({ ...validAnswers(), regions: ["region_atlantis"] });
    expect(result.success).toBe(false);
  });

  it("rejects more than 10 items in a needs array", () => {
    const result = assessmentAnswersSchema.safeParse({
      ...validAnswers(),
      coreHrNeeds: Array.from({ length: 11 }, (_, i) => `need_${i}`),
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid payrollModel enum value", () => {
    const result = assessmentAnswersSchema.safeParse({ ...validAnswers(), payrollModel: "payroll_crypto" });
    expect(result.success).toBe(false);
  });
});

describe("leadContactSchema", () => {
  it("accepts a valid lead and lowercases/trims the email", () => {
    const result = leadContactSchema.parse(validLead());
    expect(result.email).toBe("jane.doe@example.com");
  });

  it("rejects an empty first name", () => {
    const result = leadContactSchema.safeParse({ ...validLead(), firstName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a first name containing digits or symbols (injection guard)", () => {
    const result = leadContactSchema.safeParse({ ...validLead(), firstName: "<script>" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email address", () => {
    const result = leadContactSchema.safeParse({ ...validLead(), email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a company name shorter than 2 characters", () => {
    const result = leadContactSchema.safeParse({ ...validLead(), companyName: "A" });
    expect(result.success).toBe(false);
  });

  it("allows phone and comments to be omitted", () => {
    const result = leadContactSchema.safeParse(validLead());
    expect(result.success).toBe(true);
  });

  it("rejects a malformed phone number", () => {
    const result = leadContactSchema.safeParse({ ...validLead(), phone: "call me maybe" });
    expect(result.success).toBe(false);
  });

  it("accepts a well-formed international phone number", () => {
    const result = leadContactSchema.safeParse({ ...validLead(), phone: "+49 30 1234567" });
    expect(result.success).toBe(true);
  });

  it("rejects comments longer than 1000 characters", () => {
    const result = leadContactSchema.safeParse({ ...validLead(), comments: "x".repeat(1001) });
    expect(result.success).toBe(false);
  });
});

describe("toolFinderAssessmentSubmissionSchema", () => {
  it("accepts a combined valid answers + lead payload", () => {
    const result = toolFinderAssessmentSubmissionSchema.safeParse({ answers: validAnswers(), lead: validLead() });
    expect(result.success).toBe(true);
  });

  it("rejects when either half of the payload is invalid", () => {
    const result = toolFinderAssessmentSubmissionSchema.safeParse({
      answers: { ...validAnswers(), companySize: "bogus" },
      lead: validLead(),
    });
    expect(result.success).toBe(false);
  });
});
