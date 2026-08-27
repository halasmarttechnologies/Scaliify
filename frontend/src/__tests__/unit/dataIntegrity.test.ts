import { describe, it, expect } from "vitest";
import { companies } from "@/data/companies";
import { hrTechnologyServices, advisoryServices } from "@/data/services";
import { softwareCategories, softwareTools } from "@/data/software";

describe("Static Data Integrity", () => {
  it("companies should contain valid company entries with ids and names", () => {
    expect(Array.isArray(companies)).toBe(true);
    expect(companies.length).toBeGreaterThan(0);
    companies.forEach((company) => {
      expect(company).toHaveProperty("id");
      expect(company).toHaveProperty("name");
      expect(typeof company.name).toBe("string");
    });
  });

  it("services datasets should be defined and have title, description, and link", () => {
    expect(Array.isArray(hrTechnologyServices)).toBe(true);
    expect(hrTechnologyServices.length).toBeGreaterThan(0);
    expect(Array.isArray(advisoryServices)).toBe(true);
    expect(advisoryServices.length).toBeGreaterThan(0);

    hrTechnologyServices.forEach((service) => {
      expect(service).toHaveProperty("title");
      expect(service).toHaveProperty("description");
      expect(service).toHaveProperty("link");
    });
  });

  it("software tools and categories should be properly structured", () => {
    expect(Array.isArray(softwareCategories)).toBe(true);
    expect(softwareCategories.length).toBeGreaterThan(0);

    expect(Array.isArray(softwareTools)).toBe(true);
    expect(softwareTools.length).toBeGreaterThan(0);

    softwareTools.forEach((tool) => {
      expect(tool).toHaveProperty("id");
      expect(tool).toHaveProperty("name");
      expect(tool).toHaveProperty("category");
    });
  });
});
