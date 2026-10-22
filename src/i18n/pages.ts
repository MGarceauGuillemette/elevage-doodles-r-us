import type { SiteLanguage } from "./home";

/**
 * Translations for dedicated informational pages.
 *
 * Content is intentionally conservative until the
 * breeder confirms their story, practices, and details.
 *
 * These texts are placeholders for the business owner
 * to review before launch.
 */

interface PageContent {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    paragraphs: string[];
}

interface LocalizedPages {
    about: PageContent;
    puppies: PageContent;
    contact: PageContent;
}

export const pagesContent: Record<
    SiteLanguage,
    LocalizedPages
> = {
    fr: {
        about: {
            title: "À propos",
            description:
                "Découvrez Doodles R Us, un élevage familial " +
                "de Goldendoodles à Saint-Colomban.",
            eyebrow: "Bienvenue chez nous",
            heading: "Notre élevage familial",
            paragraphs: [
                "Doodles R Us est un élevage familial de " +
                "Goldendoodles situé à Saint-Colomban, " +
                "dans les Laurentides.",

                "Nous préparons cette section pour vous " +
                "présenter notre histoire, nos chiens et " +
                "notre approche de l'élevage.",
            ],
        },

        puppies: {
            title: "Nos chiots",
            description:
                "Consultez les informations sur les chiots " +
                "Goldendoodles de Doodles R Us.",
            eyebrow: "Nos compagnons à quatre pattes",
            heading: "Découvrez nos Goldendoodles",
            paragraphs: [
                "Consultez les fiches ci-dessous pour " +
                "connaître les disponibilités publiées " +
                "par notre élevage.",
            ],
        },

        contact: {
            title: "Contact",
            description:
                "Communiquez avec Doodles R Us à " +
                "Saint-Colomban, Québec.",
            eyebrow: "Restons en contact",
            heading: "Nous joindre",
            paragraphs: [
                "Vous avez une question concernant notre " +
                "élevage ou nos Goldendoodles? " +
                "Retrouvez nos coordonnées ci-dessous.",
            ],
        },
    },

    en: {
        about: {
            title: "About us",
            description:
                "Discover Doodles R Us, a family " +
                "Goldendoodle breeder in Saint-Colomban.",
            eyebrow: "Welcome to our family",
            heading: "Our family breeding business",
            paragraphs: [
                "Doodles R Us is a family Goldendoodle " +
                "breeder located in Saint-Colomban, " +
                "in Québec's Laurentians region.",

                "We're preparing this section to introduce " +
                "our story, our dogs, and our approach " +
                "to breeding.",
            ],
        },

        puppies: {
            title: "Our puppies",
            description:
                "Find information about Goldendoodle " +
                "puppies at Doodles R Us.",
            eyebrow: "Our four-legged companions",
            heading: "Meet our Goldendoodles",
            paragraphs: [
                "Browse the listings below to see puppy " +
                "availability published by our breeder.",
            ],
        },

        contact: {
            title: "Contact",
            description:
                "Get in touch with Doodles R Us " +
                "in Saint-Colomban, Québec.",
            eyebrow: "Let's stay in touch",
            heading: "Contact us",
            paragraphs: [
                "Have a question about our breeding " +
                "business or our Goldendoodles? " +
                "Find our contact details below.",
            ],
        },
    },
};