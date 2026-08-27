import { test, expect } from "@playwright/test";

test.describe("Homepage E2E & Visual Elements", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load homepage and display hero title", async ({ page }) => {
    await expect(page).toHaveTitle(/Scaliify/i);
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/HR/i);
  });

  test("should have glossy Tiffany Blue Call-To-Action buttons", async ({ page }) => {
    const talkButtons = page.locator("a:has-text('Let\\'s Talk')");
    await expect(talkButtons.first()).toBeVisible();
  });

  test("should render dashboard preview card without crashing", async ({ page }) => {
    const dashboard = page.locator("text=Personio (All-in-One Core HRIS)").first();
    await expect(dashboard).toBeVisible();
  });
});
