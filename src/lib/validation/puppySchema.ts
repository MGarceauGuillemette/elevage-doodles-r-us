import { z } from "zod";

/**
 * Runtime validation for puppy records managed by Pages CMS.
 *
 * TypeScript checks our application code, but CMS data comes
 * from JSON and must be validated at runtime.
 *
 * These rules protect the public website against incomplete
 * content, incorrect availability values and unsafe image paths.
 */

/**
 * All supported puppy availability statuses.
 *
 * The values match the options configured in .pages.yml.
 */
const puppyStatusSchema = z.enum([
    "available",
    "reserved",
    "adopted",
]);

/**
 * Bilingual text is required for every listing.
 *
 * Trimming prevents whitespace-only descriptions from
 * being accepted as valid content.
 */
const localizedTextSchema = z.object({
    fr: z.string().trim().min(1),
    en: z.string().trim().min(1),
});

/**
 * Puppy images must be hosted in our designated public
 * image directory.
 *
 * This intentionally excludes arbitrary remote URLs.
 * CMS-managed image paths follow the same convention.
 */
const puppyImageSchema = z
    .string()
    .regex(
        /^\/images\/puppies\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/i,
        "Image must be stored in /images/puppies/",
    );

/**
 * Validates one puppy listing.
 *
 * A photo is optional, but when a photo is provided,
 * both French and English alternative text are required.
 */
export const puppySchema = z
    .object({
        id: z.uuid(),

        name: z.string().trim().min(1).max(100),

        status: puppyStatusSchema,

        description: localizedTextSchema,

        image: puppyImageSchema.optional(),

        imageAlt: localizedTextSchema.optional(),
    })
    .superRefine((puppy, context) => {
        if (puppy.image && !puppy.imageAlt) {
            context.addIssue({
                code: "custom",
                path: ["imageAlt"],
                message:
                    "A photo requires French and English alt text.",
            });
        }
    });

/**
 * A collection cannot contain two puppies with the same ID.
 *
 * We check this at the collection level because a single
 * puppy record cannot detect duplicates by itself.
 */
export const puppiesSchema = z
    .array(puppySchema)
    .superRefine((puppies, context) => {
        const ids = new Set<string>();

        puppies.forEach((puppy, index) => {
            if (ids.has(puppy.id)) {
                context.addIssue({
                    code: "custom",
                    path: [index, "id"],
                    message: `Duplicate puppy ID: ${puppy.id}`,
                });
            }

            ids.add(puppy.id);
        });
    });

/**
 * Validates unknown CMS data and returns typed records.
 *
 * @param data - Raw data read from puppies.json.
 * @returns A validated collection of puppy listings.
 * @throws ZodError if the content is invalid.
 */
export function validatePuppies(data: unknown) {
    return puppiesSchema.parse(data);
}