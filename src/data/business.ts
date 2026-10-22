import businessData from "./business.json";

import {
    validateBusinessContact,
} from "../lib/validation/businessSchema";

/**
 * Public business information shared across pages.
 *
 * Contact values are managed through Pages CMS and
 * validated during site generation.
 *
 * Fixed location information remains in code for now.
 * We do not publish a residential street address.
 */
export const business = {
    name: "Doodles R Us",
    city: "Saint-Colomban",
    province: "Québec",

    contact: validateBusinessContact(businessData),
};