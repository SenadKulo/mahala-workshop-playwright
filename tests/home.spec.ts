import { test, expect } from '@playwright/test';

test('home page title contains Mahala Workshop', async ({ page }) => {
  await page.goto('https://mahalaworkshop.com/');

  await expect(page).toHaveTitle(/Mahala Workshop/);
});
