/**
 * Domain types for puppy availability listings.
 *
 * These types are independent of the content management
 * system so we can change how data is stored without
 * rewriting the presentation components.
 */

/**
 * A puppy's current adoption/availability status.
 */
export type PuppyStatus =
    | "available"
    | "reserved"
    | "adopted";

/**
 * Translated text stored for both supported languages.
 */
export interface LocalizedText {
    fr: string;
    en: string;
}

/**
 * Public information about a puppy.
 *
 * The image path points to an approved image stored in
 * public/images/puppies/.
 *
 * Never store customer contact details or other private
 * adoption information in these public records.
 */
export interface Puppy {
    id: string;
    name: string;
    status: PuppyStatus;
    description: LocalizedText;
    image?: string;
    imageAlt?: LocalizedText;
}