#!/usr/bin/env node
/**
 * Generates the social share image at public/og-default.png (1200×630).
 *
 * Branded card: ocean-deep teal background, the taro-leaf logo, the
 * "Pacific Nutra" wordmark, and the site tagline. Rendered from an SVG
 * via sharp so social scrapers (which want PNG/JPG, not SVG) get a real
 * raster.
 *
 * Run from repo root: node scripts/generate-og-image.mjs
 */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "og-default.png");

// The logo emblem, inlined (same artwork as public/brand/pacific-nutra-logo.svg),
// re-anchored to sit at x=540,y=70 at 120px.
const logo = `
  <g transform="translate(540 70) scale(1.0)">
    <circle cx="60" cy="60" r="60" fill="#1C3942"/>
    <circle cx="60" cy="60" r="50.5" fill="none" stroke="#D2BE93" stroke-width="1.4" opacity="0.65"/>
    <g fill="none" stroke="#DD7E5C" stroke-width="4.2" stroke-linecap="round">
      <path d="M38 86 Q49 80 60 86 T82 86"/>
      <path d="M44 95 Q52 90 60 95 T76 95"/>
    </g>
    <g transform="translate(60 47) scale(0.9) translate(-32 -36)">
      <path d="M32 6 L32 14" fill="none" stroke="#FAF6EE" stroke-width="4.6" stroke-linecap="round"/>
      <path d="M32 14 C26 6 14 7 8 17 C2 30 8 52 32 66 C56 52 62 30 56 17 C50 7 38 6 32 14 Z" fill="#FAF6EE"/>
      <g fill="none" stroke="#2F4F3A" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 16 L32 62"/>
        <path d="M32 28 C26 30 22 32 16 32"/>
        <path d="M32 28 C38 30 42 32 48 32"/>
        <path d="M32 42 C27 44 24 46 20 48"/>
        <path d="M32 42 C37 44 40 46 44 48"/>
      </g>
    </g>
  </g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#1C3942"/>
  <rect x="24" y="24" width="1152" height="582" rx="20" fill="none" stroke="#D2BE93" stroke-width="2" opacity="0.5"/>
  ${logo}
  <text x="600" y="300" text-anchor="middle" font-family="DejaVu Serif, serif" font-size="76" font-weight="bold">
    <tspan fill="#FAF6EE">Pacific</tspan><tspan fill="#DD7E5C" font-style="italic" dx="26">Nutra</tspan>
  </text>
  <text x="600" y="370" text-anchor="middle" font-family="DejaVu Serif, serif" font-size="34" font-style="italic" fill="#FAF6EE" opacity="0.92">
    Ancestral Polynesian food for the modern kitchen
  </text>
  <text x="600" y="468" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-size="22" letter-spacing="3" fill="#D2BE93" opacity="0.85">
    TARO · BREADFRUIT · POI · COCONUT · FRESH FISH
  </text>
  <text x="600" y="556" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-size="22" letter-spacing="4" fill="#FAF6EE" opacity="0.6">
    pacificnutra.com
  </text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log(`Wrote ${OUT}`);
