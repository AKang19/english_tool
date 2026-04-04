import { test, expect } from "@playwright/test";
import { loginAsTestUser } from "./helpers";

test.describe("Navigation & URL Routing", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
  });

  test("navigates to all pages", async ({ page }) => {
    const pages = [
      { name: "歷史紀錄", hash: "#/history" },
      { name: "搜尋單字", hash: "#/search" },
      { name: "文章生成", hash: "#/article" },
      { name: "複習", hash: "#/review" },
      { name: "寄信", hash: "#/email" },
      { name: "新增單字", hash: "#/create" },
    ];

    for (const p of pages) {
      await page.getByRole("menuitem", { name: p.name }).click();
      await expect(page).toHaveURL(new RegExp(p.hash));
    }
  });

  test("preserves page on reload", async ({ page }) => {
    await page.getByRole("menuitem", { name: "複習" }).click();
    await page.reload();
    await expect(page.getByRole("button", { name: "開始複習" })).toBeVisible();
  });

  test("direct URL works", async ({ page }) => {
    await page.goto("/#/search");
    await page.waitForTimeout(500);
    await expect(page.getByRole("heading", { name: "搜尋單字" })).toBeVisible();
  });
});
