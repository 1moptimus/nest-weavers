# Brand

Source: client's "Nest Weavers – Brand Guidelines" PDF (13 pages) and the logo PNG supplied by the client.

- Name: Nest Weavers Interiors
- Tagline: "Let's Bring Life to your Spaces."
- Logo: wordmark (Runalto typeface) plus a sky-blue hummingbird building a nest inside the "e". Symbol alone (the "e" with bird) may be used on the website and as favicon (32x32). Never recolour, stretch, flip, outline, add shadows to, or change the font of the logo. Use the positive logo on light backgrounds and the negative on dark.
- Logo files: master artwork still requested from the client (SVG/AI preferred). Current source is a 1457x739 transparent PNG.

## Colour
| Token | Value | Notes |
| --- | --- | --- |
| `--color-surface` | `#efeae6` | Warm off-white; read by eye from the PDF, confirm with client |
| `--color-accent-sky` | `#a2bfe2` | PDF swatch. The logo's wing measures `#96bce3`; confirm which to use |
| `--color-accent-brown` | `#926d52` | Measured from the logo's "INTERIORS" lettering |
| `--color-accent-brown-dark` | `#725540` | Darker brown for small text (about 5.7:1 on off-white) |
| `--color-ink` | `#2b2623` | Body text (not in the guidelines; chosen for contrast) |

Contrast: brown on off-white is about 3.5:1 (large text and graphics only). Sky blue on off-white is about 1.5:1 (decoration only, never text).

## Typography
- Times New Roman: generic content (Light) and emphasis (Semibold).
- Montserrat: any weight.
- Cavas: "magazine words" only.
- On the site: headings use Times New Roman (system font, falling back to Liberation Serif/Times); body text uses Montserrat, self-hosted at build time through Astro's fonts API (`astro.config.mjs`). Cavas is not used yet.

## Light and dark mode
The site has both modes. The first visit follows the device setting; the toggle in the navbar switches and remembers the choice (`localStorage`, applied before first paint by an inline script in `BaseLayout.astro` so there is no flash). Colours are theme tokens in `src/styles.css` (`:root` for light, `:root[data-theme='dark']` for dark); components must only use tokens.

| Token | Light | Dark |
| --- | --- | --- |
| `--color-surface` | `#efeae6` | `#0f0e0d` |
| `--color-ink` | `#2b2623` | `#efeae6` |
| `--color-accent-text` (small brown text) | `#725540` | `#cfae8e` |
| Hero / footer background | `#e8e1da` / `#e3dbd3` | `#0a0a0a` |

All text pairs were measured at 5.0:1 or better in both modes. Dark-mode variants of brand assets, generated from the client's logo by recolouring only the near-black pixels (the bird stays sky blue and "INTERIORS" stays brown, as in the brand guide's negative version): `src/assets/brand/logo-negative.png` and `public/cursor/bird-light*.png`. Confirm the dark palette and negative logo with the client.

## Pattern
The client's isometric cube pattern. The file they supplied (`pattern.png`) is a screenshot taken in dark mode, so the black background is baked in. To make it usable on any background, a lines-only version was recovered from it: `src/assets/brand/pattern-lines.png` (252x175, seamless, transparent except for the lines; the supplied file's own width does not repeat cleanly, so it was cut to its true 252px repeat).

It is applied as a recolourable overlay, not a background image: add `has-pattern` to an element (and `has-pattern--fade` to fade it toward the edges). The line colour and strength are theme tokens in `src/styles.css`: `--pattern-line` (brand brown) and `--pattern-opacity` (0.34 in light mode, 0.24 in dark; the footer uses `--pattern-opacity-footer`). The background behind it is whatever the element's own background is.
Keep the client's original `pattern.png` for other uses.

## Bird cursor
`public/cursor/bird.png` (32px) and `bird@2x.png` (64px), cropped from the logo with the nest curve and neighbouring lettering removed. Hotspot is the beak tip (1, 18). Applied only for mouse and trackpad devices in `src/styles.css`. It is a derived use of the logo's mark, so get the client's sign-off.

## Tone and imagery
- Tone: warm, calm, earthy ("reflects the natural and organic approach of the brand").
- Imagery: bright interiors on light backgrounds; negative logo on dark photography.
