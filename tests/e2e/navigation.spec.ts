import {
    test,
    expect,
} from "@playwright/test";

/**
 * End-to-end tests for bilingual navigation.
 *
 * These tests verify actual browser navigation rather
 * than calling the route utility functions directly.
 *
 * They run across the desktop and mobile browser
 * configurations defined in playwright.config.ts.
 */

/**
 * Navigate to a localized page using the responsive
 * header.
 *
 * Desktop links are always visible.
 * Mobile links are inside the native <details> menu.
 */
async function navigateFromHeader(
    page: import("@playwright/test").Page,
    label: string,
    destination: string,
) {
    const header = page.locator("header");

    const mobileMenu = header.locator("details");

    if (await mobileMenu.isVisible()) {
        await mobileMenu.locator("summary").click();
    }

    await header
        .getByRole("link", {
            name: label,
            exact: true,
        })
        .click();

    await expect(page).toHaveURL(
        new RegExp(`${destination}/?$`),
    );
}

test.describe("Localized homepages", () => {
    test("French homepage uses French metadata", async ({
                                                            page,
                                                        }) => {
        await page.goto("/fr/");

        await expect(page.locator("html")).toHaveAttribute(
            "lang",
            "fr-CA",
        );

        await expect(
            page.getByRole("heading", { level: 1 }),
        ).toBeVisible();

        await expect(
            page.locator("main"),
        ).toBeVisible();
    });

    test("English homepage uses English metadata", async ({
                                                              page,
                                                          }) => {
        await page.goto("/en/");

        await expect(page.locator("html")).toHaveAttribute(
            "lang",
            "en-CA",
        );

        await expect(
            page.getByRole("heading", { level: 1 }),
        ).toBeVisible();
    });
});

test.describe("Bilingual navigation", () => {
    test("navigates to French puppy listings", async ({
                                                          page,
                                                      }) => {
        await page.goto("/fr/");

        await navigateFromHeader(
            page,
            "Nos chiots",
            "/fr/chiots",
        );

        await expect(
            page.getByRole("heading", { level: 1 }),
        ).toBeVisible();
    });

    test("navigates to English About page", async ({
                                                       page,
                                                   }) => {
        await page.goto("/en/");

        await navigateFromHeader(
            page,
            "About us",
            "/en/about",
        );

        await expect(
            page.getByRole("heading", { level: 1 }),
        ).toBeVisible();
    });

    test("switches languages without losing the page", async ({
                                                                  page,
                                                              }) => {
        await page.goto("/fr/chiots/");

        await navigateFromHeader(
            page,
            "English",
            "/en/puppies",
        );

        await expect(page.locator("html")).toHaveAttribute(
            "lang",
            "en-CA",
        );

        await navigateFromHeader(
            page,
            "Français",
            "/fr/chiots",
        );
    });

    test("opens and closes the mobile navigation", async ({
                                                              page,
                                                              isMobile,
                                                          }) => {
        test.skip(!isMobile, "Mobile-only test.");

        await page.goto("/fr/");

        const menu = page.locator("header details");
        const toggle = menu.locator("summary");

        await expect(menu).not.toHaveAttribute("open");

        await toggle.click();
        await expect(menu).toHaveAttribute("open", "");

        await toggle.click();
        await expect(menu).not.toHaveAttribute("open");
    });
});