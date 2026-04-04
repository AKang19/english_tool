import { test, expect } from "@playwright/test";
import { loginAsTestUser } from "./helpers";

test.describe("Authentication", () => {
  test("shows login when not authenticated", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h3")).toBeVisible();
    await expect(page.getByText("登出")).not.toBeVisible();
  });

  test("logs in and sees main app", async ({ page }) => {
    await loginAsTestUser(page);
    await expect(page.getByText("E2E Test User")).toBeVisible();
    await expect(page.getByText("登出")).toBeVisible();
  });

  test("logout returns to login screen", async ({ page }) => {
    await loginAsTestUser(page);
    await page.getByText("登出").click();
    await expect(page.getByText("登出")).not.toBeVisible();
  });
});
