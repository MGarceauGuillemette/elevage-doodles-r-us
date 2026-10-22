import { describe, expect, it } from "vitest";

import {
    validatePuppies,
} from "./puppySchema";

/**
 * Unit tests for CMS content validation.
 *
 * All records in this file are fictional test fixtures.
 * They are never published as actual puppy listings.
 */

/**
 * Creates a valid test record.
 *
 * Individual tests override properties to simulate
 * different CMS editing mistakes.
 */
function createValidPuppy() {
    return {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Test Puppy",
        status: "available",
        description: {
            fr: "Description de test.",
            en: "Test description.",
        },
        image: "/images/puppies/test-puppy.webp",
        imageAlt: {
            fr: "Photo de test d'un chiot.",
            en: "Test photo of a puppy.",
        },
    };
}

describe("Puppy content validation", () => {
    it("accepts an empty collection", () => {
        expect(validatePuppies([])).toEqual([]);
    });

    it("accepts a valid puppy", () => {
        const puppy = createValidPuppy();

        expect(validatePuppies([puppy])).toEqual([puppy]);
    });

    it("rejects an unsupported availability status", () => {
        const puppy = {
            ...createValidPuppy(),
            status: "unknown",
        };

        expect(() => validatePuppies([puppy])).toThrow();
    });

    it("rejects a missing English description", () => {
        const puppy = {
            ...createValidPuppy(),
            description: {
                fr: "Description française.",
                en: "",
            },
        };

        expect(() => validatePuppies([puppy])).toThrow();
    });

    it("rejects whitespace-only names", () => {
        const puppy = {
            ...createValidPuppy(),
            name: "   ",
        };

        expect(() => validatePuppies([puppy])).toThrow();
    });

    it("rejects duplicate puppy IDs", () => {
        const first = createValidPuppy();

        const second = {
            ...createValidPuppy(),
            name: "Another Test Puppy",
        };

        expect(() =>
            validatePuppies([first, second]),
        ).toThrow();
    });

    it("rejects images outside the approved directory", () => {
        const puppy = {
            ...createValidPuppy(),
            image: "https://example.com/puppy.jpg",
        };

        expect(() => validatePuppies([puppy])).toThrow();
    });

    it("requires alt text when a photo is present", () => {
        const puppy = {
            ...createValidPuppy(),
            imageAlt: undefined,
        };

        expect(() => validatePuppies([puppy])).toThrow();
    });

    it("accepts a puppy without a photograph", () => {
        const puppy = {
            ...createValidPuppy(),
            image: undefined,
            imageAlt: undefined,
        };

        expect(validatePuppies([puppy])).toHaveLength(1);
    });

    it("rejects malformed collection data", () => {
        expect(() => validatePuppies(null)).toThrow();
        expect(() => validatePuppies({})).toThrow();
        expect(() => validatePuppies("invalid")).toThrow();
    });
});