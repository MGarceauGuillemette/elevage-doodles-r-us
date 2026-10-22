import aboutData from "./about.json";

import {
    validateAboutContent,
} from "../lib/validation/businessSchema";

/**
 * Validated, CMS-managed content for the About pages.
 *
 * Both languages are validated together to prevent
 * publishing an incomplete translated page.
 */
export const about = validateAboutContent(aboutData);