import { test, expect } from '@playwright/test';

test('sort by price ascending', async ({ page }) => {
    await page.goto('https://mahalaworkshop.com/Katalog');

    await expect(page).toHaveTitle(/Katalog radova/);

    const sortByButton = page.getByRole('button', { name: 'Sortiraj po' });
    await sortByButton.click();

    const priceAscendingOption = page.getByRole('link', { name: 'Cijena: Niža ka višoj' });
    await priceAscendingOption.click();

    // Wait for the sorted page before reading anything from it.
    await expect(page).toHaveURL(/sortOrder=price_asc/);

    // Price is the <h4> inside each product card, e.g. "20,00 KM" or "1.200,00 KM".
    const priceTexts = await page.locator('.product-card h4').allInnerTexts();

    // "1.200,00 KM" -> 1200
    const prices = priceTexts.map((text) =>
        Number(text.replace(' KM', '').replace(/\./g, '').replace(',', '.')),
    );
    expect(prices.length).toBeGreaterThan(0);

    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
});


test('catalog shows the product counter', async ({ page }) => {
    await page.goto('https://mahalaworkshop.com/Katalog');

    const productCounter = page.getByText(/Prikazano: \d+ od \d+/);
    await expect(productCounter).toBeVisible();
});