/**
 * Homepage translations for Doodles R Us.
 *
 * Keeping translations separate from Astro components makes
 * the website easier to maintain and prevents duplicated
 * page layouts between French and English.
 *
 * Temporary business copy must be confirmed by the owner
 * before the public launch.
 */

export const homeContent = {
    fr: {
        eyebrow: "Élevage familial à Saint-Colomban",

        heading: "De petites pattes, de grands bonheurs.",

        introduction:
            "Bienvenue chez Doodles R Us, un élevage familial " +
            "de Goldendoodles situé à Saint-Colomban, au Québec.",

        discoverButton: "Découvrir nos chiots",
        contactButton: "Nous contacter",

        photoPlaceholder: "Une belle photo de nos Goldendoodles ici bientôt!",

        about: {
            eyebrow: "Bienvenue chez nous",
            title: "L'univers Doodles R Us",
            description:
                "Découvrez notre élevage familial et faites " +
                "connaissance avec nos Goldendoodles.",
        },

        puppies: {
            eyebrow: "Nos compagnons à quatre pattes",
            title: "Nos chiots Goldendoodles",
            description:
                "Les informations sur nos chiots et nos " +
                "prochaines portées seront bientôt disponibles.",
            notice: "Informations à venir",
        },

        contact: {
            eyebrow: "Restons en contact",
            title: "Une question? Parlons-en!",
            description:
                "Vous souhaitez en apprendre davantage sur " +
                "notre élevage? Nos coordonnées seront " +
                "ajoutées ici prochainement.",
        },
    },

    en: {
        eyebrow: "Family breeder in Saint-Colomban",

        heading: "Little paws, big happiness.",

        introduction:
            "Welcome to Doodles R Us, a family Goldendoodle " +
            "breeder located in Saint-Colomban, Québec.",

        discoverButton: "Meet our puppies",
        contactButton: "Contact us",

        photoPlaceholder: "A lovely photo of our Goldendoodles coming soon!",

        about: {
            eyebrow: "Welcome to our family",
            title: "The world of Doodles R Us",
            description:
                "Discover our family breeding business " +
                "and get to know our Goldendoodles.",
        },

        puppies: {
            eyebrow: "Our four-legged companions",
            title: "Our Goldendoodle puppies",
            description:
                "Information about our puppies and upcoming " +
                "litters will be available soon.",
            notice: "Information coming soon",
        },

        contact: {
            eyebrow: "Let's stay in touch",
            title: "Have a question? Let's talk!",
            description:
                "Interested in learning more about our breeding " +
                "business? Contact details will be added here soon.",
        },
    },
} as const;

/**
 * The languages supported by the homepage.
 *
 * Deriving this type from the translation object ensures
 * that component props use valid language codes.
 */
export type SiteLanguage = keyof typeof homeContent;