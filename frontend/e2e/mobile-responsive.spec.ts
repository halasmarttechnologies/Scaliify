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

  test("mobile menu button opens drawer and navigates correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Click mobile hamburger menu
    const menuButton = page.locator("button[aria-label='Open mobile menu']");
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Verify mobile drawer opened
    const servicesButton = page.locator("button:has-text('Services')");
    await expect(servicesButton).toBeVisible();

    // Click close button
    const closeButton = page.locator("button[aria-label='Close menu']");
    await expect(closeButton).toBeVisible();
    await closeButton.click();

    // Verify drawer closed
    await expect(servicesButton).not.toBeVisible();
  });
});
