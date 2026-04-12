const { test, expect } = require('@playwright/test');

test('homepage visual verification', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('homepage.png', { fullPage: true });
});
