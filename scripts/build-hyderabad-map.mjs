// One-off generator for src/assets/hyderabad-map.svg.
// Fetches water and major roads from OpenStreetMap (Overpass API) and projects them with
// src/lib/mapProjection.js. Re-run only when the map area or styling changes; the SVG is committed.
// Data: © OpenStreetMap contributors (ODbL). Attribution is shown on the site.
//
//   node scripts/build-hyderabad-map.mjs

import { writeFile } from 'node:fs/promises';
import { BOUNDS, MAP_WIDTH, MAP_HEIGHT, project } from '../src/lib/mapProjection.js';

const OUT = new URL('../src/assets/hyderabad-map.svg', import.meta.url);
const bbox = `${BOUNDS.south},${BOUNDS.west},${BOUNDS.north},${BOUNDS.east}`;

const query = `[out:json][timeout:60];
(
  way["natural"="water"](${bbox});
  relation["natural"="water"](${bbox});
  way["waterway"="river"](${bbox});
  way["highway"~"^(motorway|trunk|primary)$"](${bbox});
);
out geom;`;

const res = await fetch('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  headers: {
    'User-Agent': 'nest-weavers-site/0.1 (map build script)',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({ data: query }),
});
if (!res.ok) throw new Error(`Overpass request failed: ${res.status}`);
const { elements } = await res.json();

// Douglas–Peucker simplification in viewBox units. Keeps the SVG small without visible change at this scale.
const TOLERANCE = 0.6;
function simplify(points, tol) {
  if (points.length < 3) return points;
  const [a, b] = [points[0], points[points.length - 1]];
  let maxD = 0;
  let idx = 0;
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1e-9;
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i];
    const d = Math.abs((b.y - a.y) * p.x - (b.x - a.x) * p.y + b.x * a.y - b.y * a.x) / len;
    if (d > maxD) { maxD = d; idx = i; }
  }
  if (maxD <= tol) return [a, b];
  const left = simplify(points.slice(0, idx + 1), tol);
  return left.slice(0, -1).concat(simplify(points.slice(idx), tol));
}

// Large lakes (e.g. Hussain Sagar) are multipolygon relations: stitch member ways into closed rings.
function stitch(segments) {
  const key = (p) => `${p.lat},${p.lon}`;
  const pool = segments.filter((g) => g.length > 1).map((g) => g.slice());
  const rings = [];
  while (pool.length) {
    let ring = pool.pop();
    let grew = true;
    while (grew && key(ring[0]) !== key(ring[ring.length - 1])) {
      grew = false;
      for (let i = 0; i < pool.length; i++) {
        const g = pool[i];
        if (key(g[0]) === key(ring[ring.length - 1])) ring = ring.concat(g.slice(1));
        else if (key(g[g.length - 1]) === key(ring[ring.length - 1])) ring = ring.concat(g.slice(0, -1).reverse());
        else if (key(g[g.length - 1]) === key(ring[0])) ring = g.concat(ring.slice(1));
        else if (key(g[0]) === key(ring[0])) ring = g.slice(1).reverse().concat(ring);
        else continue;
        pool.splice(i, 1);
        grew = true;
        break;
      }
    }
    rings.push(ring);
  }
  return rings;
}

// Closed rings have identical endpoints, which makes the plain line simplification collapse them to nothing.
// Split a ring at its midpoint and simplify each half instead.
function simplifyPath(points) {
  const closed = points.length > 3 && points[0].x === points.at(-1).x && points[0].y === points.at(-1).y;
  if (!closed) return simplify(points, TOLERANCE);
  const mid = Math.floor(points.length / 2);
  return simplify(points.slice(0, mid + 1), TOLERANCE).slice(0, -1).concat(simplify(points.slice(mid), TOLERANCE));
}

// Skip ponds: only keep water bodies whose bounding box covers a meaningful area of the map.
const MIN_WATER_AREA = 40; // viewBox units squared
function bboxArea(pts) {
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  return (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
}

const ways = { water: [], river: [], motorway: [], trunk: [], primary: [] };

for (const el of elements) {
  if (el.type !== 'relation' || !el.members) continue;
  const geoms = el.members.filter((m) => m.type === 'way' && m.geometry && m.role !== 'inner').map((m) => m.geometry);
  const rings = stitch(geoms)
    .map((ring) => simplifyPath(ring.map((p) => project(p.lat, p.lon))))
    .filter((r) => bboxArea(r) >= MIN_WATER_AREA);
  const d = rings
    .filter((r) => r.length > 2)
    .map((r) => r.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + 'Z')
    .join('');
  if (d) ways.water.push(d);
}

for (const el of elements) {
  if (el.type !== 'way' || !el.geometry || el.geometry.length < 2) continue;
  const pts = simplifyPath(
    el.geometry.map((p) => {
      const { x, y } = project(p.lat, p.lon);
      return { x, y };
    }),
  );
  const unique = pts.filter((p, i) => i === 0 || p.x !== pts[i - 1].x || p.y !== pts[i - 1].y);
  if (unique.length < 2) continue;
  const d = unique.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const tags = el.tags || {};
  if (tags.natural === 'water') {
    if (bboxArea(unique) >= MIN_WATER_AREA) ways.water.push(d);
  }
  else if (tags.waterway === 'river') ways.river.push(d);
  else if (tags.highway) ways[tags.highway]?.push(d);
}

// Colours mirror the brand tokens in src/styles.css. Values are TBD until confirmed from the brand PDF.
const path = (d, attrs) => (d.length ? `<path d="${d.join('')}" ${attrs}/>` : '');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MAP_WIDTH} ${MAP_HEIGHT}" role="img" aria-labelledby="map-title">
  <title id="map-title">Map of Hyderabad showing project locations</title>
  <rect width="${MAP_WIDTH}" height="${MAP_HEIGHT}" fill="var(--color-map-land, #EFEAE6)"/>
  <g class="map-water" fill="var(--color-map-water, #A2BFE2)">
    ${path(ways.water, '')}
  </g>
  <g fill="none" stroke="var(--color-map-water, #A2BFE2)" stroke-width="3" stroke-linecap="round">
    ${path(ways.river, '')}
  </g>
  <g fill="none" stroke="var(--color-map-road, #D9D2CB)" stroke-linecap="round" stroke-linejoin="round">
    ${path(ways.primary, 'stroke-width="2"')}
    ${path(ways.trunk, 'stroke-width="3"')}
    ${path(ways.motorway, 'stroke-width="4"')}
  </g>
</svg>
`;

await writeFile(OUT, svg);
console.log(`Wrote ${OUT.pathname} (${elements.length} OSM ways, ${svg.length} bytes)`);
