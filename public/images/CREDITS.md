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

See `lib/photos.ts` for the live registry. As of launch (2026-05-23):

| Slot | File |
|---|---|
| `homeHero` | `hero-section.jpeg` |
| `aboutHero` | `about-page.jpeg` |
| `productPacificPlate` | `pacific-plate-cover.png` |
| `productMealPlan` | `30-day-meal-plan-cover.png` |
| `postPolynesianDiet` | `polynesian-diet.jpeg` |
| `postBreadfruit` | `breadfruit.jpeg` |
| `postPoi` | `hawaiian-poi.jpeg` |
| `postTaro` | `taro-mash.jpeg` |
| `postPoke` | `poke.jpeg` |
| `postHaupia` | `haupia.jpeg` |
| `postCoconut` | `coconut.jpeg` |

Plus `Polynian-img4.jpg` — used directly as the mid-page break on the
About page (not via the photo registry).

## Photo credits

_None yet — add Photographer + Unsplash URL here as photos get sourced
externally._

## License notes

Unsplash photos are free for commercial use, no attribution required;
we credit photographers as a courtesy. Pexels and Pixabay are also
acceptable sources with the same effective license. **Do not** use
photos from Google Image Search, Pinterest, or other social platforms
without verifying their license.
