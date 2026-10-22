/**
 * Public business information for Doodles R Us.
 *
 * Contact details are intentionally optional until
 * confirmed by the business owner.
 *
 * This module serves as our temporary data source.
 * Later, Pages CMS will manage the editable information
 * without requiring changes to the UI components.
 */

export interface BusinessContact {
    email: string | null;
    phone: string | null;
    facebookUrl: string | null;
}

export interface BusinessInformation {
    name: string;
    city: string;
    province: string;
    contact: BusinessContact;
}

/**
 * Business details used across the website.
 *
 * Replace null values with verified information only.
 * Do not publish a private residential address.
 */
export const business: BusinessInformation = {
    name: "Doodles R Us",
    city: "Saint-Colomban",
    province: "Québec",

    contact: {
        email: "contact@example.com",
        phone: "+1 450 555 0123",
        facebookUrl: "https://www.facebook.com/",
    },
};