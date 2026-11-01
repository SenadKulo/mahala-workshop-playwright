import { test, expect } from '@playwright/test';

test('home page title contains Mahala Workshop', async ({ page }) => {
    await page.goto('https://mahalaworkshop.com/');

    await expect(page).toHaveTitle(/Mahala Workshop/);
});


test('navigation link opens the catalog', async ({ page }) => {
    await page.goto('https://mahalaworkshop.com/');

    const catalogLink = page.getByRole('navigation').getByRole('link', { name: 'Katalog' });
    await catalogLink.click();

    await expect(page).toHaveURL(/\/Katalog$/);

    const ourWorkHeading = page.getByRole('heading', { name: 'Naši Radovi' });
    await expect(ourWorkHeading).toBeVisible();
});


test('Explore Catalog link opens the catalog', async ({ page }) => {
    await page.goto('https://mahalaworkshop.com/');

    const catalogLink = page.getByRole('link', { name: 'Istraži Katalog' });
    await catalogLink.click();

    await expect(page).toHaveURL(/\/Katalog$/);

    const ourWorkHeading = page.getByRole('heading', { name: 'Naši Radovi' });
    await expect(ourWorkHeading).toBeVisible();
});