# Doodles R Us 🐾

A modern, bilingual website developed for a family-owned Goldendoodle breeding business located in Saint-Colomban, Québec, Canada.

## Project overview

This project provides a responsive, French-first website where visitors can learn about the breeder, view puppy availability, and find contact information.

The website is being developed as a real-world client project and software development portfolio piece.

**Project status:** In development.

## Technology stack

- Astro and TypeScript
- Tailwind CSS v4
- Pages CMS
- Zod
- Vitest
- GitHub Actions
- Cloudflare Pages (planned deployment)

## Features

- French and English pages
- Responsive desktop, tablet, and mobile layouts
- Bilingual navigation
- Puppy availability listings
- Content editing through Pages CMS
- Runtime content validation
- Automated unit tests and CI
- Reusable UI components

## Getting started

Requirements: Node.js 24 LTS and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:4321/`.

## Quality checks

```bash
npm run check
npm run test
npm run build
```

## Content management

Puppy information is stored in `src/data/puppies.json` and managed through Pages CMS.

The CMS configuration is stored in `.pages.yml`.

Only approved public business content and photographs should be published.

## Deployment

Production deployment to Cloudflare Pages is planned. Until then, the project can be run locally using Astro's development server.

## Documentation

The repository contains documentation for maintaining the website, including a French-language guide for the business owner.

## License and assets

No open-source license has been assigned yet.

Source code ownership, reuse permissions, business branding, and photograph licensing should be confirmed before external reuse.

## Author

Developed by Marc-Antoine Garceau-Guillemette.