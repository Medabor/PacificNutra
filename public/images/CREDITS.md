# Pacific Nutra — image library

The site ships with **hand-built SVG art panels** rather than stock
photos. They're more distinctive on-brand than the generic poke-bowl
images every wellness site uses. If you want to swap in real photos
later, here's the curated shopping list and the workflow.

## Workflow to add real photos

1. Open the Unsplash search link for the slot you want to fill.
2. Pick a photo that passes our photography style filter (natural
   daylight, raw ingredients on wood/stone/linen, no smiling-model
   stock cliché).
3. Click **Download free** on Unsplash.
4. Resize to the width listed below and save into `public/images/`
   using the filename listed.
5. Edit `lib/photos.ts` and change the slot from
   `{ kind: "panel", variant: "..." }` to
   `{ kind: "image", src: "/images/<file>.jpg", alt: "...", width: ..., height: ... }`.
6. Commit and push — site updates automatically.

Add the photographer's name + the Unsplash URL for each photo below as
a courtesy.

## Slot shopping list

| Slot key | Filename | Size | Suggested Unsplash search |
|---|---|---|---|
| `homeHero` | `home-hero.jpg` | 1600×900 | [hawaiian food overhead](https://unsplash.com/s/photos/hawaiian-food) / [polynesian food](https://unsplash.com/s/photos/polynesian-food) |
| `aboutHero` | `about-hero.jpg` | 1600×900 | [hawaii coast](https://unsplash.com/s/photos/hawaii-coast) / [pacific ocean](https://unsplash.com/s/photos/pacific-ocean) |
| `productPacificPlate` | `product-pacific-plate.jpg` | 1000×1333 | [cookbook flatlay](https://unsplash.com/s/photos/cookbook-flatlay) / [pacific cuisine board](https://unsplash.com/s/photos/pacific-cuisine) |
| `postPolynesianDiet` | `post-polynesian-diet.jpg` | 1200×675 | [traditional polynesian food](https://unsplash.com/s/photos/polynesian-food) |
| `postBreadfruit` | `post-breadfruit.jpg` | 1200×675 | [breadfruit](https://unsplash.com/s/photos/breadfruit) / [ulu hawaii](https://unsplash.com/s/photos/ulu) |
| `postPoi` | `post-poi.jpg` | 1200×675 | [taro root](https://unsplash.com/s/photos/taro-root) / [poi hawaii](https://unsplash.com/s/photos/poi) |

## Currently wired

| Slot | File | Source |
|---|---|---|
| `homeHero` | `Polynesian-img9.jpg` | User upload — nēnē in taro field |
| `aboutHero` | `Polynesian-img8.jpg` | User upload — sunflower field + Koʻolau |
| `productPacificPlate` | `polyneian-img2.jpg` | User upload — plated Polynesian dish |
| `postPolynesianDiet` | `polynesian-img1.jpg` | User upload — overhead spread |
| `postBreadfruit` | `Polynesian-img7.jpg` | User upload — banana-leaf wrapped seafood |
| `postPoi` | `Polynesian-img6.jpg` | User upload — offerings with kalo leaves |

## Available for future posts (in `public/images/`, not wired)

- `Polynian-img3.jpg` — rice + egg + salad bowl
- `Polynian-img4.jpg` — carved pineapple centerpiece
- `Polynesian-img5.jpg` — pineapple shrimp fried rice

## Photo credits (fill in as you add Unsplash images)

<!--
Format:
- `home-hero.jpg` — Photo by [Photographer Name](https://unsplash.com/@handle) on Unsplash. [Photo page](https://unsplash.com/photos/...)
-->

_None yet — site is using SVG art panels._

## License notes

Unsplash photos are free for commercial use, no attribution required.
We credit photographers as a courtesy. Pexels and Pixabay are also
acceptable sources with the same effective license. **Do not** use
photos from Google Image Search, Pinterest, or other social platforms
without verifying their license.
