import { Page } from "@playwright/test";

const API_BASE = "http://localhost:8000/api";

/**
 * Login via test-only endpoint and inject JWT into localStorage.
 * Requires backend running with E2E_TEST=1.
 */
export async function loginAsTestUser(page: Page) {
  // Get JWT from test endpoint
  const res = await page.request.post(`${API_BASE}/auth/test-login`);
  const { access_token, user } = await res.json();

  // Navigate to app and inject auth into localStorage
  await page.goto("/");
  await page.evaluate(
    ({ token, userData }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
    },
    { token: access_token, userData: user }
  );

  // Reload to pick up the auth state
  await page.reload();
  await page.waitForSelector("text=English Vocab Tool");
}
