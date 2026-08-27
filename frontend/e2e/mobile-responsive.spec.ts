import { test, expect } from "@playwright/test";

test.describe("Mobile Responsive Layout Checks", () => {
  test("mobile viewport (375x667) renders scaled miniature dashboard cleanly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Verify hero title
    const heroTitle = page.locator("h1");
    await expect(heroTitle).toBeVisible();

    // Verify dashboard container is visible within mobile bounds
    const dashboardCard = page.locator("text=Personio (All-in-One Core HRIS)").first();
    await expect(dashboardCard).toBeVisible();
  });

  test("tool-finder mobile wizard step buttons display properly", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/tool-finder");

    const activeStep = page.locator("button:has-text('01 Company Size')");
    await expect(activeStep).toBeVisible();
  });
});
