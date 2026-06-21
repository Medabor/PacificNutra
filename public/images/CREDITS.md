# Pacific Nutra — image library

All photos currently wired on the site live in `public/images/` with
descriptive filenames. The registry is in `lib/photos.ts` — each slot
key maps to one image file.

## Workflow to add a new photo

1. Source a photo (Unsplash, Pexels, or a real shoot).
2. Pick one that passes our photography style filter: natural daylight,
   raw ingredients on wood/stone/linen, no smiling-model stock cliché.
3. Compress (target under 500 KB, ideally ~200 KB at 1600×900) and save
   into `public/images/` using a descriptive filename like
   `breadfruit.jpeg` — not `IMG_1234.jpg`.
4. Edit `lib/photos.ts` and add or update the slot:
   ```ts
   newSlot: {
     kind: "image",
     src: "/images/your-file.jpg",
     alt: "Descriptive alt text for accessibility and SEO",
     width: 1600,
     height: 900,
   },
   ```
5. Reference the slot in a page via `<Photo slot="newSlot" .../>`.
6. Commit and push — Hostinger auto-deploys.

## Currently wired slots

See `lib/photos.ts` for the live registry. Updated 2026-06-21:

| Slot | File |
|---|---|
| `homeHero` | `hero-section.jpeg` |
| `aboutHero` | `about-page.jpeg` |
| `productPacificPlate` | `pacific-plate-cover.png` |
| `productMealPlan` | `30-day-meal-plan-cover.jpg` |
| `postPolynesianDiet` | `polynesian-diet.jpeg` |
| `postBreadfruit` | `breadfruit.jpeg` |
| `postPoi` | `hawaiian-poi.jpeg` |
| `postTaro` | `taro-mash.jpeg` |
| `postPoke` | `poke.jpeg` |
| `postHaupia` | `haupia.jpeg` |
| `postCoconut` | `coconut.jpeg` |
| `postLimu` | `limu-seaweed-salad.jpg` |
| `postUala` | `uala-purple-sweet-potato.jpg` |
| `postInamona` | `kukui-nuts.jpeg` |
| `postKapisiPulu` | `kapisi-pulu.jpg` |
| `postLomiSalmon` | `lomi-lomi-salmon.jpg` |
| `postFishBananaLeaf` | `fish-in-banana-leaf.jpg` |
| `postShoyuChicken` | `shoyu-chicken.jpg` |
| `postShaveIce` | `hawaiian-shave-ice.jpg` |

Plus `Polynian-img4.jpg` — used directly as the mid-page break on the
About page (not via the photo registry).

## Photo credits

- `lomi-lomi-salmon.jpg`, `fish-in-banana-leaf.jpg`, `shoyu-chicken.jpg`,
  `hawaiian-shave-ice.jpg` — licensed via **Adobe Stock** (standard
  license, 2026-06-21). Originals were full-resolution; resized to
  1600px wide and recompressed (mozjpeg q80) before committing.

## License notes

Unsplash photos are free for commercial use, no attribution required;
we credit photographers as a courtesy. Pexels and Pixabay are also
acceptable sources with the same effective license. **Adobe Stock**
images are covered by their standard license (royalty-free, commercial
use) — keep the receipt/asset IDs in the Adobe account. **Do not** use
photos from Google Image Search, Pinterest, or other social platforms
without verifying their license.
