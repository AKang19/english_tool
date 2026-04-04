import { test, expect } from "@playwright/test";
import { loginAsTestUser } from "./helpers";

test.describe("Search", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);

    // Create a word
    await page.locator('input[placeholder*="ambulance"]').first().fill("searchable");
    await page.fill('input[placeholder*="標題"]', "Search Test");
    await page.getByRole("button", { name: "送出生成" }).click();
    await expect(page.getByText("生成完成")).toBeVisible({ timeout: 30000 });
    await page.getByRole("button", { name: "儲存到資料庫" }).click();
    await expect(page.getByText("儲存成功")).toBeVisible({ timeout: 10000 });

    await page.getByRole("menuitem", { name: "搜尋單字" }).click();
  });

  test("searches and finds word", async ({ page }) => {
    await page.fill('input[placeholder*="輸入至少"]', "sear");
    await page.getByRole("button", { name: "搜尋" }).click();
    await expect(page.locator('input[value="searchable"]').first()).toBeVisible({ timeout: 5000 });
  });

  test("shows source tag", async ({ page }) => {
    await page.fill('input[placeholder*="輸入至少"]', "sear");
    await page.getByRole("button", { name: "搜尋" }).click();
    await expect(page.getByText("Search Test").first()).toBeVisible({ timeout: 5000 });
  });

  test("warns on short query", async ({ page }) => {
    await page.fill('input[placeholder*="輸入至少"]', "ab");
    await page.getByRole("button", { name: "搜尋" }).click();
    await expect(page.getByText("至少 4 個字母")).toBeVisible();
  });
});
