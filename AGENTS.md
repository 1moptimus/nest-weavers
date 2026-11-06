# Nest Weavers – Agent Guide

Shared instructions for all AI coding agents (Claude, Gemini, others). `CLAUDE.md` and `GEMINI.md` import this file; **edit rules here, not there.**

## Project
Marketing/portfolio website for **Nest Weavers**, an interior design firm. Replaces the current static site at https://nestweavers.com. Goal: a fast, visually rich, highly interactive static front end. No backend.

## Stack
- **Astro** (static output) + **React** islands for interactivity
- **Tailwind CSS v4** (via `@tailwindcss/vite`, configured in `src/styles.css`)
- **TypeScript** (strict; pinned to 6.x because `@astrojs/check` does not yet support 7)
- Hosting: **Cloudflare Pages** (build `npm run build`, output `dist`, set `NODE_VERSION=22`)

## Commands
| Task | Command |
| --- | --- |
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Preview build | `npm run preview` |
| Type/Astro check | `npm run check` |
| Format | `npm run format` |

Run `npm run check && npm run build` before declaring work done.

## Layout
```
src/pages/        routes (.astro)
src/layouts/      page shells
src/components/   .astro = static, .tsx = React islands
src/content/      content collections (projects, etc.)
src/styles.css    Tailwind entry + design tokens
public/           static assets served as-is
docs/             brand + content model notes
```

## Conventions
- **Astro by default.** Use a React component only when real client-side interactivity is needed (sliders, filters, lightbox, quiz, forms, animation).
- Hydrate lazily: prefer `client:visible` or `client:idle`; use `client:load` only above-the-fold and when justified.
- Keep islands small and self-contained; pass data via props from `.astro` pages, avoid global client state.
- Portfolio projects and editable page copy live in content collections with a typed schema (`src/content.config.ts`); do not hardcode project data or client-editable text in components.
- Client-editable content is edited through Decap CMS at `/admin` (`public/admin/config.yml`). Any schema change in `src/content.config.ts` must be mirrored there. Client guide: `docs/editing-guide.md`.
- Images: use `astro:assets` (`<Image>`/`<Picture>`) with width/height and meaningful `alt`. No unoptimised large images in `public/`.
- Styling: Tailwind utilities; design tokens (colors, fonts, spacing) as CSS variables in `src/styles.css`. Brand constants live in `@theme`; anything that changes between light and dark mode is a theme token in `:root` / `:root[data-theme='dark']`. **Never hard-code colours in components; use the tokens** so both modes stay in sync. Brand details in `docs/brand.md`.
- Components: PascalCase files, one component per file, named props interface.
- No new dependency without a clear reason; prefer platform features and Astro built-ins.
- Never commit secrets. Use `.env` (git-ignored); document variables in `.env.example`.

## Quality bar
- Accessibility: semantic HTML, keyboard operable interactive components, visible focus, `prefers-reduced-motion` respected, WCAG AA contrast.
- Performance: Lighthouse ≥ 95 on mobile for Performance/SEO/Accessibility; minimal JS; no layout shift.
- SEO: unique `<title>` and meta description per page, Open Graph tags, sitemap, preserve existing nestweavers.com URLs or add redirects (`public/_redirects`).
- Responsive: mobile-first.

## Git
- Branch from `main`; short-lived feature branches.
- Conventional-style commit messages (`feat:`, `fix:`, `chore:`, `docs:`).
- Do not commit unless asked. Never force-push or rewrite shared history.

## Working agreements
- Make the smallest change that solves the task; don't refactor unrelated code.
- Ask before adding pages, changing branding, or altering the content model.
- If a requirement is ambiguous (copy, imagery, brand), ask rather than invent final content; use clearly marked placeholders.
- Update `docs/` and this file when conventions change.
