import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

// Portfolio projects: one Markdown file per project in src/content/projects/.
// Images are referenced by relative path and optimised by astro:assets at build.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      location: z.string(),
      year: z.number().int(),
      category: z.string(),
      cover: image().optional(),
      gallery: z.array(image()).default([]),
      beforeAfter: z
        .array(z.object({ label: z.string(), before: image(), after: image() }))
        .default([]),
      order: z.number().int().default(100),
      draft: z.boolean().default(false),
    }),
});

// Editable page copy: one entry per page, keyed by id (e.g. "home") in src/content/pages/pages.json.
const pages = defineCollection({
  loader: file('./src/content/pages/pages.json'),
  schema: z.object({
    heroTitle: z.string(),
    heroText: z.string(),
  }),
});

export const collections = { projects, pages };
