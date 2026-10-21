import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

/**
 * Main Astro configuration for Doodles R Us.
 *
 * The website is French-first and uses static rendering
 * to keep hosting and maintenance costs low.
 */
export default defineConfig({
  i18n: {
    locales: ["fr", "en"],
    defaultLocale: "fr",

    routing: {
      // Keep language prefixes explicit for SEO and navigation.
      prefixDefaultLocale: true,

      // Redirect visitors from "/" to the French homepage.
      redirectToDefaultLocale: true,
    },
  },

  vite: {
    // Tailwind CSS v4 is integrated through Vite.
    plugins: [tailwindcss()],
  },
});