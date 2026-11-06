// Shared Web Mercator projection for the Hyderabad map.
// Used by scripts/build-hyderabad-map.mjs (to draw the SVG) and src/components/ProjectMap.astro (to place pins),
// so pins always line up with the drawn map.

// Geographic window covered by the map (degrees). Keep in sync with the generated SVG.
export const BOUNDS = { north: 17.56, south: 17.28, west: 78.25, east: 78.62 };
export const MAP_WIDTH = 1000; // SVG viewBox width; height is derived from the Mercator aspect.

const toRad = (deg) => (deg * Math.PI) / 180;
const mercatorY = (lat) => Math.log(Math.tan(Math.PI / 4 + toRad(lat) / 2));

const yTop = mercatorY(BOUNDS.north);
const yBottom = mercatorY(BOUNDS.south);
const xSpan = toRad(BOUNDS.east - BOUNDS.west);

// Derived: the map height in viewBox units keeps the Mercator aspect ratio.
export const MAP_HEIGHT = Math.round(MAP_WIDTH * ((yTop - yBottom) / xSpan));

/** Converts lat/lng to viewBox coordinates {x, y} in 0..MAP_WIDTH / 0..MAP_HEIGHT. */
export function project(lat, lng) {
  const x = ((toRad(lng - BOUNDS.west)) / xSpan) * MAP_WIDTH;
  const y = ((yTop - mercatorY(lat)) / (yTop - yBottom)) * MAP_HEIGHT;
  return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
}

/** Converts lat/lng to percentage positions for absolutely positioned HTML pins. */
export function toPercent(lat, lng) {
  const { x, y } = project(lat, lng);
  return { left: (x / MAP_WIDTH) * 100, top: (y / MAP_HEIGHT) * 100 };
}
