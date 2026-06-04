# Image Performance — Design Spec

**Date:** 2026-06-02  
**Scope:** Approach A — image-only loading speed improvements  

---

## Problem

The site serves raw, unoptimized images because `output: 'export'` in `next.config.ts` disables Next.js built-in image optimization. Total image weight on the homepage is ~23MB:

| File | Size |
|---|---|
| `travel.jpg` | 7.8MB |
| `realEstate.jpg` | 5.9MB |
| `partner.jpg` | 5.5MB |
| `watches.jpg` | 1.9MB |
| `fashion.jpg` | 1.0MB |
| `lujototal-cert.png` | 421KB |
| `logo.png` | 104KB |

Additionally, all 4 hero slideshow images are mounted in the DOM simultaneously on page load, even though only one is visible at a time.

---

## Goals

1. Reduce total image payload by ~85–90% via WebP conversion.
2. Eliminate unnecessary image decode/parse work in the hero by lazily mounting off-screen slides.

## Non-goals

- Changing the i18n architecture.
- Splitting or slimming `domains.json`.
- Adding a CDN or server-side image optimization.

---

## Design

### 1. Image Conversion Script

**File:** `scripts/optimize-images.mjs`

A Node.js ESM script using **sharp** (already a transitive dependency of Next.js — no new package needed). It:

1. Reads every `.jpg` and `.png` from `public/images/`.
2. Outputs a `.webp` sibling at quality 82 using `sharp().webp({ quality: 82 })`.
3. Logs a before/after size table to stdout.
4. Leaves original files in place (manual deletion after verification).

Run once locally: `node scripts/optimize-images.mjs`

No CI integration — this is a one-time migration step. Originals can be deleted from git after confirming the site looks correct.

**Expected output sizes (approximate):**

| Original | WebP target |
|---|---|
| `travel.jpg` 7.8MB | ~300KB |
| `realEstate.jpg` 5.9MB | ~250KB |
| `partner.jpg` 5.5MB | ~220KB |
| `watches.jpg` 1.9MB | ~150KB |
| `fashion.jpg` 1.0MB | ~100KB |
| `lujototal-cert.png` 421KB | ~80KB |
| `logo.png` 104KB | ~30KB |

### 2. Component Ref Updates

All `<Image src="…/images/foo.jpg">` and `<Image src="…/images/foo.png">` references updated to `.webp` extensions. Affected files:

- `components/home/Hero.tsx` — `realEstate.jpg`, `watches.jpg`, `travel.jpg`, `fashion.jpg`
- `components/home/CategoryTeaser.tsx` — same 4 images (used independently)
- `components/home/PartnerValue.tsx` — `partner.jpg`
- `components/home/LujoTotal.tsx` — `lujototal-cert.png`
- `components/layout/Nav.tsx` — `logo.png` (×2, desktop + drawer)
- `components/layout/Footer.tsx` — `logo.png`
- `components/about/MissionVision.tsx` — `partner.jpg`

### 3. Hero Slideshow Lazy Mounting

**Current behaviour:** All 4 `<Image>` components render into the DOM on mount. The browser fetches and decodes all 4 images even though only slide 0 is visible.

**New behaviour:** Only the active slide and the immediately-next slide are mounted. Slides that haven't been reached yet render `null`.

```
mounted = index === active || index === (active + 1) % IMAGES.length
```

- Slide 0: always mounted on first render, has `priority`.
- Slides 1–3: mount only when they become active or are one position away.
- No change to the CSS fade transition — the slide container `<div>` is still rendered for layout; only the `<Image>` inside is conditionally mounted.

---

## Testing

- Visual check: run `npm run dev`, cycle through all 4 hero slides, confirm images render correctly and transitions are smooth.
- Size check: run the conversion script and confirm the `public/images/` WebP files are present and smaller than originals.
- Build check: `npm run build` must complete without errors.
- No automated tests needed — this is a pure asset/rendering change with no logic.
