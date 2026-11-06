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
- Not yet loaded on the site; headings currently use the default serif stack.

## Bird cursor
`public/cursor/bird.png` (32px) and `bird@2x.png` (64px), cropped from the logo with the nest curve and neighbouring lettering removed. Hotspot is the beak tip (1, 18). Applied only for mouse and trackpad devices in `src/styles.css`. It is a derived use of the logo's mark, so get the client's sign-off.

## Tone and imagery
- Tone: warm, calm, earthy ("reflects the natural and organic approach of the brand").
- Imagery: bright interiors on light backgrounds; negative logo on dark photography.
