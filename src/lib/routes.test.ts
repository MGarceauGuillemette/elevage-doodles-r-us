import { describe, expect, it } from "vitest";

import {
    getPageFromPath,
    getPageUrl,
} from "./routes";

/**
 * Tests for bilingual site navigation.
 *
 * These tests ensure that routes remain consistent
 * when new pages or languages are introduced.
 */
describe("Bilingual route utilities", () => {
    it("returns the French homepage", () => {
        expect(getPageUrl("home", "fr")).toBe("/fr/");
    });

    it("returns the English homepage", () => {
        expect(getPageUrl("home", "en")).toBe("/en/");
    });

    it("uses localized puppy page names", () => {
        expect(getPageUrl("puppies", "fr")).toBe(
            "/fr/chiots/",
        );

        expect(getPageUrl("puppies", "en")).toBe(
            "/en/puppies/",
        );
    });

    it("uses localized About page names", () => {
        expect(getPageUrl("about", "fr")).toBe(
            "/fr/a-propos/",
        );

        expect(getPageUrl("about", "en")).toBe(
            "/en/about/",
        );
    });

    it("resolves equivalent pages in both languages", () => {
        expect(getPageFromPath("/fr/chiots/")).toBe(
            "puppies",
        );

        expect(getPageFromPath("/en/puppies/")).toBe(
            "puppies",
        );
    });

    it("handles paths without trailing slashes", () => {
        expect(getPageFromPath("/fr/contact")).toBe(
            "contact",
        );
    });

    it("returns null for unknown paths", () => {
        expect(getPageFromPath("/fr/unknown/")).toBeNull();
    });
});