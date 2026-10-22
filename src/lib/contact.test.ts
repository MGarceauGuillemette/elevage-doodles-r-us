import { describe, expect, it } from "vitest";

import {
    createEmailUrl,
    createPhoneUrl,
    isFacebookUrl,
} from "./contact";

/**
 * Tests for public contact URL helpers.
 *
 * These tests verify URL formatting and Facebook
 * domain restrictions independently of Astro components.
 */
describe("Contact URL utilities", () => {
    describe("createEmailUrl", () => {
        it("creates an email link", () => {
            expect(
                createEmailUrl("contact@example.com"),
            ).toBe("mailto:contact@example.com");
        });

        it("removes surrounding whitespace", () => {
            expect(
                createEmailUrl("  contact@example.com  "),
            ).toBe("mailto:contact@example.com");
        });
    });

    describe("createPhoneUrl", () => {
        it("formats a Canadian phone number", () => {
            expect(
                createPhoneUrl("+1 (450) 555-0123"),
            ).toBe("tel:+14505550123");
        });

        it("removes formatting characters", () => {
            expect(
                createPhoneUrl("450-555-0123"),
            ).toBe("tel:4505550123");
        });
    });

    describe("isFacebookUrl", () => {
        it("accepts a secure Facebook URL", () => {
            expect(
                isFacebookUrl(
                    "https://www.facebook.com/example",
                ),
            ).toBe(true);
        });

        it("accepts a Messenger URL", () => {
            expect(
                isFacebookUrl("https://m.me/example"),
            ).toBe(true);
        });

        it("rejects an unrelated domain", () => {
            expect(
                isFacebookUrl("https://example.com"),
            ).toBe(false);
        });

        it("rejects an insecure HTTP URL", () => {
            expect(
                isFacebookUrl("http://facebook.com/example"),
            ).toBe(false);
        });

        it("rejects a misleading subdomain", () => {
            expect(
                isFacebookUrl(
                    "https://facebook.com.example.com",
                ),
            ).toBe(false);
        });

        it("rejects an invalid URL", () => {
            expect(
                isFacebookUrl("not-a-url"),
            ).toBe(false);
        });
    });
});