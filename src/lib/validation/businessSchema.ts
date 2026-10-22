import { z } from "zod";

/**
 * Validation schemas for business information.
 *
 * Pages CMS writes JSON directly into the repository.
 * We validate that data before Astro generates pages.
 *
 * Optional contact fields may contain empty strings
 * because the CMS can save unfilled form fields as "".
 */

/**
 * Converts empty or whitespace-only contact fields to null.
 *
 * The generic type allows specialized Zod schemas, such as
 * ZodEmail, while preserving each schema's output type.
 *
 * @param schema - Validator for a non-empty contact value.
 * @returns A schema accepting valid values or null.
 */
const optionalContact = <T extends z.ZodType>(
    schema: T,
) =>
    z.preprocess(
        (value) =>
            typeof value === "string" && !value.trim()
                ? null
                : value,
        schema.nullable(),
    );

/**
 * Validates a public telephone number.
 *
 * Allows common formatting while requiring between
 * 10 and 15 digits. This isn't a complete international
 * phone-number validator; Canadian contact details
 * should also be confirmed by the owner.
 */
const phoneSchema = z.string().trim().refine(
    (phone) => {
        const digits = phone.replace(/\D/g, "");

        return (
            /^\+?[\d\s().-]+$/.test(phone) &&
            digits.length >= 10 &&
            digits.length <= 15
        );
    },
    "Invalid phone number.",
);

/**
 * Limits Facebook URLs to approved HTTPS hosts.
 *
 * An exact hostname check prevents lookalike domains
 * such as facebook.com.example.org from passing.
 */
const facebookSchema = z
    .string()
    .trim()
    .url()
    .refine((value) => {
        const url = new URL(value);

        return (
            url.protocol === "https:" &&
            url.username === "" &&
            url.password === "" &&
            [
                "facebook.com",
                "www.facebook.com",
                "m.facebook.com",
                "messenger.com",
                "www.messenger.com",
                "m.me",
            ].includes(url.hostname)
        );
    }, "Invalid Facebook URL.");

/**
 * Runtime schema for contact information.
 *
 * Required object keys allow empty or null values,
 * but non-empty values must meet validation rules.
 */
export const businessContactSchema = z.object({
    email: optionalContact(z.email().trim()),
    phone: optionalContact(phoneSchema),
    facebookUrl: optionalContact(facebookSchema),
});

/**
 * Each language must include meaningful About content.
 */
const aboutLanguageSchema = z.object({
    introduction: z.string().trim().min(1).max(2000),
    story: z.string().trim().min(1).max(5000),
});

export const aboutSchema = z.object({
    fr: aboutLanguageSchema,
    en: aboutLanguageSchema,
});

/**
 * Validate external contact data and return its
 * normalized, strongly typed representation.
 */
export function validateBusinessContact(data: unknown) {
    return businessContactSchema.parse(data);
}

/**
 * Validate both language versions of About-page content.
 */
export function validateAboutContent(data: unknown) {
    return aboutSchema.parse(data);
}