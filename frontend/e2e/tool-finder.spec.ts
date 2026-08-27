import { test, expect } from "@playwright/test";

test.describe("HR Tool Finder Interactive Wizard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tool-finder");
  });

  test("should load tool finder page and display wizard header", async ({ page }) => {
    await expect(page).toHaveURL(/.*tool-finder/);
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/Find Your Ideal HR Software Match/i);
  });

  test("should render step 1 options and allow option selection", async ({ page }) => {
    // Check step 1 question
    const step1Heading = page.locator("text=How many employees are in your organization?");
    await expect(step1Heading).toBeVisible();

    // Click first option
    const option1 = page.locator("text=1 – 25 Employees").first();
    await expect(option1).toBeVisible();
    await option1.click();
  });
});
