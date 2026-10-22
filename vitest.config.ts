import { defineConfig } from "vitest/config";

/**
 * Vitest configuration for Doodles R Us.
 *
 * Vitest is responsible for unit tests only.
 * Playwright end-to-end tests are executed separately
 * using npm run test:e2e.
 *
 * Restricting test discovery prevents Vitest from
 * attempting to execute Playwright test files.
 */
export default defineConfig({
    test: {
        // Unit tests are colocated with the source code.
        include: ["src/**/*.test.ts"],

        // Exclude browser tests and generated artifacts.
        exclude: [
            "**/node_modules/**",
            "**/dist/**",
            "tests/e2e/**",
            "**/playwright-report/**",
            "**/test-results/**",
        ],

        environment: "node",
    },
});