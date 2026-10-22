/**
 * Centralized configuration for website imagery.
 *
 * Image paths are optional because real business
 * photographs may not be available during development.
 *
 * Public images must be approved by the breeder before
 * they are committed to the repository or published.
 */

import type { LocalizedText } from "../types/puppy";

export interface SiteImage {
    src: string | null;
    alt: LocalizedText;
}

/**
 * Hero image displayed on the French and English
 * homepages.
 *
 * Set src to the approved public image path once
 * the corresponding file has been added.
 */
export const heroImage: SiteImage = {
    src: "/images/branding/hero-goldendoodle.webp",

    alt: {
        fr: "Goldendoodle de l'élevage Doodles R Us",
        en: "Goldendoodle from Doodles R Us",
    },
};