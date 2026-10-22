import { describe, expect, it } from "vitest";

import {
    validateAboutContent,
    validateBusinessContact,
} from "./businessSchema";

/**
 * Unit tests for content edited through Pages CMS.
 *
 * Tests cover required translations, valid links,
 * optional information, and malformed input.
 */

const validAbout = {
    fr: {
        introduction: "Présentation de l'élevage.",
        story: "Notre histoire familiale.",
    },
    en: {
        introduction: "Introduction to the breeder.",
        story: "Our family story.",
    },
};

describe("Business contact validation", () => {
    it("accepts empty optional contact fields", () => {
        expect(
            validateBusinessContact({
                email: "",
                phone: "",
                facebookUrl: "",
            }),
        ).toEqual({
            email: null,
            phone: null,
            facebookUrl: null,
        });
    });

    it("accepts valid contact details", () => {
        expect(
            validateBusinessContact({
                email: "contact@example.com",
                phone: "+1 450 555 0123",
                facebookUrl: "https://www.facebook.com/example",
            }),
        ).toEqual({
            email: "contact@example.com",
            phone: "+1 450 555 0123",
            facebookUrl: "https://www.facebook.com/example",
        });
    });

    it("rejects invalid email addresses", () => {
        expect(() =>
            validateBusinessContact({
                email: "not-an-email",
                phone: "",
                facebookUrl: "",
            }),
        ).toThrow();
    });

    it("rejects misleading Facebook domains", () => {
        expect(() =>
            validateBusinessContact({
                email: "",
                phone: "",
                facebookUrl:
                    "https://facebook.com.example.org/page",
            }),
        ).toThrow();
    });

    it("rejects malformed telephone numbers", () => {
        expect(() =>
            validateBusinessContact({
                email: "",
                phone: "123",
                facebookUrl: "",
            }),
        ).toThrow();
    });
});

describe("About content validation", () => {
    it("accepts complete bilingual content", () => {
        expect(validateAboutContent(validAbout)).toEqual(
            validAbout,
        );
    });

    it("rejects missing English content", () => {
        expect(() =>
            validateAboutContent({
                fr: validAbout.fr,
            }),
        ).toThrow();
    });

    it("rejects empty descriptions", () => {
        expect(() =>
            validateAboutContent({
                ...validAbout,
                fr: {
                    ...validAbout.fr,
                    story: "   ",
                },
            }),
        ).toThrow();
    });
});