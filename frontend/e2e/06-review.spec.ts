import { test, expect } from "@playwright/test";
import { loginAsTestUser } from "./helpers";

test.describe("Review Flashcard", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);

    // Create words for review
    await page.locator('input[placeholder*="ambulance"]').first().fill("reviewword");
    await page.fill('input[placeholder*="標題"]', "Review E2E");
    await page.getByRole("button", { name: "送出生成" }).click();
    await expect(page.getByText("生成完成")).toBeVisible({ timeout: 30000 });
    await page.getByRole("button", { name: "儲存到資料庫" }).click();
    await expect(page.getByText("儲存成功")).toBeVisible({ timeout: 10000 });

    await page.getByRole("menuitem", { name: "複習" }).click();
  });

  test("starts review and shows flashcard", async ({ page }) => {
    await page.getByRole("button", { name: "開始複習" }).click();
    await expect(page.getByText("按空白鍵翻牌")).toBeVisible({ timeout: 5000 });
  });

  test("flashcard flip and rate", async ({ page }) => {
    await page.getByRole("button", { name: "開始複習" }).click();
    await expect(page.getByText("按空白鍵翻牌")).toBeVisible({ timeout: 5000 });

    await page.keyboard.press("Space");
    await expect(page.getByRole("button", { name: /記得/ })).toBeVisible({ timeout: 3000 });

    await page.keyboard.press("ArrowLeft");
    // Should advance or complete
    const completed = await page.getByText("複習完成").isVisible().catch(() => false);
    const nextCard = await page.getByText("按空白鍵翻牌").isVisible().catch(() => false);
    expect(completed || nextCard).toBeTruthy();
  });

  test("review stats modal", async ({ page }) => {
    await page.getByRole("button", { name: "查看複習統計" }).click();
    await expect(page.getByText("總複習次數")).toBeVisible({ timeout: 5000 });
  });
});
