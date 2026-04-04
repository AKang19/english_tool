import { test, expect } from "@playwright/test";
import { loginAsTestUser } from "./helpers";

test.describe("History", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);

    // Create a word group
    await page.locator('input[placeholder*="ambulance"]').first().fill("history-e2e");
    await page.fill('input[placeholder*="標題"]', "History E2E");
    await page.getByRole("button", { name: "送出生成" }).click();
    await expect(page.getByText("生成完成")).toBeVisible({ timeout: 30000 });
    await page.getByRole("button", { name: "儲存到資料庫" }).click();
    await expect(page.getByText("儲存成功")).toBeVisible({ timeout: 10000 });

    await page.getByRole("menuitem", { name: "歷史紀錄" }).click();
    await expect(page.getByRole("cell", { name: "History E2E" }).first()).toBeVisible({ timeout: 5000 });
  });

  test("shows saved word group", async ({ page }) => {
    await expect(page.getByRole("cell", { name: "History E2E" }).first()).toBeVisible();
  });

  test("opens edit modal", async ({ page }) => {
    await page.getByRole("button", { name: "編輯" }).first().click();
    await expect(page.getByText("儲存修改")).toBeVisible();
  });

  test("downloads CSV", async ({ page }) => {
    await page.getByRole("button", { name: "下載" }).first().click();
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByText("CSV").click(),
    ]);
    expect(download.suggestedFilename()).toContain(".csv");
  });

  test("search filters groups", async ({ page }) => {
    await page.fill('input[placeholder="搜尋標題"]', "History");
    await page.getByRole("button", { name: "搜尋" }).click();
    await expect(page.getByRole("cell", { name: "History E2E" }).first()).toBeVisible({ timeout: 5000 });
  });
});
