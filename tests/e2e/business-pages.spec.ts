import {
    test,
    expect,
} from "@playwright/test";

/**
 * Browser-level checks for the main business pages.
 *
 * These assertions avoid depending on temporary
 * business descriptions or fictional puppy records.
 *
 * Real CMS content may change between deployments,
 * but the page structure must remain functional.
 */

test.describe("Business pages", () => {
    const routes = [
        "/fr/",
        "/en/",
        "/fr/chiots/",
        "/en/puppies/",
        "/fr/a-propos/",
        "/en/about/",
        "/fr/contact/",
        "/en/contact/",
    ];

    for (const route of routes) {
        test(`${route} loads successfully`, async ({ page }) => {
            const response = await page.goto(route);

            expect(response?.status()).toBe(200);

            await expect(
                page.getByRole("heading", { level: 1 }),
            ).toBeVisible();

            await expect(
                page.locator("header"),
            ).toBeVisible();

            await expect(
                page.locator("footer"),
            ).toBeVisible();
        });
    }

    test("French puppy page displays its listings section", async ({
                                                                       page,
                                                                   }) => {
        await page.goto("/fr/chiots/");

        await expect(
            page.locator("#chiots"),
        ).toBeVisible();

        await expect(
            page.locator("#chiots h2"),
        ).toBeVisible();
    });

    test("contact page contains no empty contact links", async ({
                                                                    page,
                                                                }) => {
        await page.goto("/fr/contact/");

        const invalidLinks = page.locator(
            'a[href="mailto:"], a[href="tel:"], a[href="#"]',
        );

        await expect(invalidLinks).toHaveCount(0);
    });

    test("mobile pages do not scroll horizontally", async ({
                                                               page,
                                                               isMobile,
                                                           }) => {
        test.skip(!isMobile, "Mobile-only test.");

        await page.goto("/fr/");

        /**
         * Compare the document's scrollable width with the
         * viewport. A larger scroll width would indicate
         * that content extends beyond the mobile screen.
         */
        const hasHorizontalOverflow = await page.evaluate(() => {
            return (
                document.documentElement.scrollWidth >
                document.documentElement.clientWidth
            );
        });

        expect(hasHorizontalOverflow).toBe(false);
    });
});