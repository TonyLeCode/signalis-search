import { test, expect } from '@playwright/test';
import { getAllEntrySlugs, getEntry } from '@/lib/transcriptions';

test('should navigate to browse page', async ({ page }) => {
	await page.goto('/');

	await page.click('a:has-text("Browse Entries")');

	await expect(page).toHaveURL('/entries');
});

test('slugs should replace space with dash', () => {
	const slugs = getAllEntrySlugs();
	slugs.forEach((slug) => {
		const entry = getEntry(slug);
		expect(entry).toBeTruthy();

		const title = entry?.browseTitle || entry?.title;
		expect(title).toBeTruthy();

		const expectedSlug = title?.replaceAll(' ', '-');
		expect(slug).toBe(expectedSlug);
	});
});

test('browse should have all entries', async ({ page }) => {
	await page.goto('/entries');

	const accordionLinks = await page.locator('ul li a').all();
	const hrefs = await Promise.all(accordionLinks.map((link) => link.getAttribute('href')));

	const slugs = getAllEntrySlugs().map((slug) => `/entries/${slug}`);
	expect(slugs.length).toBe(hrefs.length);

	hrefs.forEach((href) => {
		expect(slugs).toContain(href);
	});
});

test('all entries should be found', async ({ page }) => {
	test.setTimeout(180000);
	const slugs = getAllEntrySlugs();
	for (const slug of slugs) {
		await page.goto(`/entries/${slug}`);
		const title = await page.locator('h1').textContent();
		expect(title).not.toBe('404');
	}
});
