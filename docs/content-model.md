# Content model

_TBD – schema for Astro content collections (defined in `src/content.config.ts` when development starts)._

## Projects (planned)
title, slug, summary, location, year, category/style, cover image, gallery, before/after pairs, description.

## Implemented (see `src/content.config.ts`)
- **projects** (`src/content/projects/*.md`): title, summary, location, area (optional, map card), coordinates (lat/lng, required: sets the map pin), year, category, cover (image), gallery (images), beforeAfter (label + before/after images), order, draft, body. Drafts are hidden from the site and the map.
- **pages** (`src/content/pages/pages.json`, one entry per page id): `home`, `why-us`, `about-us`, `gallery`, `contact-us`, each with heroTitle and heroText. Routes match the existing nestweavers.com URLs.
- Editing UI: Decap CMS at `/admin`, configured in `public/admin/config.yml`. **Keep its fields in sync with the Zod schema**; a mismatch causes build failures.
- Image fields use `image()` (`astro:assets`); in Decap they are `relative: true`, so stored paths resolve from the entry file.
- Editor sign-in: GitHub OAuth via Cloudflare Pages Functions (`functions/api/auth.js`, `functions/api/callback.js`). Secrets `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` live in the Cloudflare dashboard only.

## Map
- `src/assets/hyderabad-map.svg` is generated once by `node scripts/build-hyderabad-map.mjs` from OpenStreetMap data (© OpenStreetMap contributors, ODbL). Re-run only to change the map area or styling.
- Projection shared by the script and `src/components/ProjectMap.astro`: `src/lib/mapProjection.js`. Changing `BOUNDS` requires regenerating the SVG.

## Site shell
- Navigation, social links and contact details are constants in `src/lib/site.js` (contact details are placeholders). Shared page shell: `src/layouts/BaseLayout.astro` (head/SEO, navbar, footer).
- Placeholder content is marked "Placeholder" in the page text; `PlaceholderImage.astro` stands in for photos until the client supplies them. The gallery should be built from the projects collection once real images exist.
- The contact form posts to `PUBLIC_FORM_ENDPOINT` (see `.env.example`); until it is set the submit button is disabled.
