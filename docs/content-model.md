# Content model

_TBD – schema for Astro content collections (defined in `src/content.config.ts` when development starts)._

## Projects (planned)
title, slug, summary, location, year, category/style, cover image, gallery, before/after pairs, description.

## Implemented (see `src/content.config.ts`)
- **projects** (`src/content/projects/*.md`): title, summary, location, year, category, cover (image), gallery (images), beforeAfter (label + before/after images), order, draft, body.
- **pages** (`src/content/pages/pages.json`, one entry per page id): currently `home` with heroTitle, heroText.
- Editing UI: Decap CMS at `/admin`, configured in `public/admin/config.yml`. **Keep its fields in sync with the Zod schema**; a mismatch causes build failures.
- Image fields use `image()` (`astro:assets`); in Decap they are `relative: true`, so stored paths resolve from the entry file.
- Editor sign-in: GitHub OAuth via Cloudflare Pages Functions (`functions/api/auth.js`, `functions/api/callback.js`). Secrets `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` live in the Cloudflare dashboard only.
