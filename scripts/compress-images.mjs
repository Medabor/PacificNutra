#!/usr/bin/env node
/**
 * Compresses all images in public/images/ in place.
 *
 * - JPEGs: max 1600px on longest side, quality 82, mozjpeg
 * - PNGs:  max 1600px on longest side, palette optimization
 *
 * Also writes a dimension report so lib/photos.ts can be updated.
 *
 * Run from repo root: node scripts/compress-images.mjs
 */

import { readdirSync, statSync, renameSync, unlinkSync } from "node:fs";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIR = join(ROOT, "public/images");
const MAX = 1600; // longest-side cap

const files = readdirSync(DIR).filter((f) => /\.(jpe?g|png)$/i.test(f));

const fmt = (n) => `${(n / 1024).toFixed(0)} KB`;
let totalBefore = 0;
let totalAfter = 0;
const dimensions = {};

for (const file of files) {
  const path = join(DIR, file);
  const ext = extname(file).toLowerCase();
  const sizeBefore = statSync(path).size;
  totalBefore += sizeBefore;

  const tmp = join(DIR, `.tmp-${file}`);

  const input = sharp(path).rotate(); // honour EXIF orientation
  const meta = await input.metadata();

  // Resize so longest side <= MAX, only if currently bigger
  const longest = Math.max(meta.width || 0, meta.height || 0);
  const pipeline = longest > MAX
    ? input.resize({ width: meta.width >= meta.height ? MAX : null, height: meta.height > meta.width ? MAX : null, fit: "inside", withoutEnlargement: true })
    : input;

  if (ext === ".png") {
    await pipeline.png({ compressionLevel: 9, palette: true, quality: 85 }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(tmp);
  }

  const sizeAfter = statSync(tmp).size;

  // Only replace if the result is actually smaller; otherwise keep the original
  if (sizeAfter < sizeBefore) {
    unlinkSync(path);
    renameSync(tmp, path);
    totalAfter += sizeAfter;
    const newMeta = await sharp(path).metadata();
    dimensions[file] = { width: newMeta.width, height: newMeta.height };
    const pct = ((1 - sizeAfter / sizeBefore) * 100).toFixed(0);
    console.log(`  ${file.padEnd(40)} ${fmt(sizeBefore).padStart(8)} → ${fmt(sizeAfter).padStart(8)}  (-${pct}%)`);
  } else {
    unlinkSync(tmp);
    totalAfter += sizeBefore;
    dimensions[file] = { width: meta.width, height: meta.height };
    console.log(`  ${file.padEnd(40)} ${fmt(sizeBefore).padStart(8)}   (unchanged — already optimal)`);
  }
}

console.log("");
console.log(`Total: ${fmt(totalBefore)} → ${fmt(totalAfter)}  (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0)}% smaller)`);
console.log("");
console.log("Final dimensions (for lib/photos.ts):");
for (const [file, dim] of Object.entries(dimensions)) {
  console.log(`  ${file.padEnd(40)} ${dim.width} × ${dim.height}`);
}
