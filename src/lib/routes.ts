import type { SiteLanguage } from "../i18n/home";

/**
 * Centralized bilingual route definitions.
 *
 * Each page has one semantic identifier and a path
 * for every supported language.
 *
 * Keeping routes in one place prevents broken links
 * and makes language switching easier to maintain.
 */

export type PageId = "home" | "puppies" | "about" | "contact";

export const routes: Record<
    PageId,
    Record<SiteLanguage, string>
> = {
    home: {
        fr: "/fr/",
        en: "/en/",
    },

    puppies: {
        fr: "/fr/chiots/",
        en: "/en/puppies/",
    },

    about: {
        fr: "/fr/a-propos/",
        en: "/en/about/",
    },

    contact: {
        fr: "/fr/contact/",
        en: "/en/contact/",
    },
};

/**
 * Returns the localized URL for a known page.
 *
 * @param page - Semantic page identifier.
 * @param lang - Requested website language.
 * @returns Absolute path relative to the site origin.
 */
export function getPageUrl(
    page: PageId,
    lang: SiteLanguage,
): string {
    return routes[page][lang];
}

/**
 * Resolves a website pathname to a semantic page.
 *
 * Trailing slashes are normalized so both /fr/chiots
 * and /fr/chiots/ resolve to the same page.
 *
 * Unknown paths return null rather than silently
 * pretending to be the homepage.
 *
 * @param pathname - Current browser pathname.
 * @returns Matching page identifier, or null.
 */
export function getPageFromPath(
    pathname: string,
): PageId | null {
    const normalized =
        pathname.replace(/\/+$/, "") || "/";

    for (const page of Object.keys(routes) as PageId[]) {
        for (const lang of ["fr", "en"] as const) {
            const candidate =
                routes[page][lang].replace(/\/+$/, "") || "/";

            if (normalized === candidate) {
                return page;
            }
        }
    }

    return null;
}