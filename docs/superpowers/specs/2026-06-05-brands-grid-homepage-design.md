# Design: BrandsGrid Homepage Section

**Date:** 2026-06-05
**Branch:** client-feedback/v1

## Summary

Port the "Nuestras Marcas / Our Brands" section from `public/data/dominiosdelujo-anillos.html` into a reusable React component and add it to the homepage, positioned between `<PartnerValue />` and the Manifesto `<HomeSectionLink />`.

## Placement

`app/page.tsx` order after this change:

```
Hero → Ticker → CategoryTeaser → (LujoTotal link) → ServicesGrid → PartnerValue → BrandsGrid → (Manifesto link) → CollaborateTeaser
```

## Component

**File:** `components/home/BrandsGrid.tsx`
**CSS:** `components/home/BrandsGrid.module.css`

### Structure

```tsx
'use client'
// useI18n for all strings
// Static brands array with local image paths + i18n desc keys
// <section> → header (eyebrow + h2 + sub) → 4-col grid of brand cards
```

### Brand card anatomy

```
[ logo img (h:34px, w:auto, opacity:0.7 → 1 on hover) ]
[ description paragraph ]
[ "Próximamente" badge ]
```

### Logo handling

- All 4 logos downloaded locally to `public/images/brands/`
- Rendered with plain `<img>` + `assetPath()` helper (not `next/image` — logos need `height:34px; width:auto` which is incompatible with next/image's required dimension model)
- Logo 2 (`logo-white-1.png`) uses a CSS `filter: invert(1)` modifier class — the original is a white-on-dark logo that needs inversion on the light background

### Images to download

| Local file | Source URL |
|---|---|
| `public/images/brands/ddl-logo.svg` | `https://dominiosdelujo.com/wp-content/uploads/2026/03/logo-1.svg` |
| `public/images/brands/brand-2-logo.png` | `https://dominiosdelujo.com/wp-content/uploads/2026/03/Logo_white-1.png` |
| `public/images/brands/brand-3-logo.png` | `https://dominiosdelujo.com/wp-content/uploads/2026/03/Rectangle-952-1.png` |
| `public/images/brands/casasen-logo.png` | `https://dominiosdelujo.com/wp-content/uploads/2026/03/Casasen_logo-f.png` |

### CSS

Mirrors the original HTML CSS, adapted to CSS Modules and the project's design token system:

- Section background: `var(--c)`, padding matching `sec` class
- Grid: `repeat(4, 1fr)`, `gap: 1px`, `background: var(--rule)` (creates 1px divider lines between cells)
- Card: `background: var(--c)`, hover → `var(--c2)`
- Logo: `height: 34px; width: auto; opacity: 0.7` → `opacity: 1` on hover
- Description: `font-family: var(--fb); font-size: 12px; color: var(--ink3)`
- Badge: small label styled with border or muted gold tone
- Responsive: 4-col → 2-col (tablet ≤900px) → 1-col (mobile ≤480px)

## i18n Keys

Add to both `lib/i18n/es.json` and `lib/i18n/en.json` under namespace `brandsGrid`:

| Key | ES | EN |
|---|---|---|
| `brandsGrid.eyebrow` | Red de marcas | Brand network |
| `brandsGrid.heading` | Nuestras marcas | Our brands |
| `brandsGrid.sub` | Explora nuestras marcas exclusivas | Explore our exclusive brands |
| `brandsGrid.soon` | Próximamente | Coming soon |
| `brandsGrid.b1Desc` | Una puerta de entrada curada al mundo del lujo. | A curated gateway to the world of luxury. |
| `brandsGrid.b2Desc` | Donde cada "Sí" comienza con la inspiración. | Where every "Yes" begins with inspiration. |
| `brandsGrid.b3Desc` | Un destino refinado para anillos de lujo atemporales. | A refined destination for timeless luxury rings. |
| `brandsGrid.b4Desc` | Descubre hogares y alquileres en toda España. | Discover homes and rentals across Spain. |

## Out of scope

- No links on cards (all are "Próximamente" — no destination yet)
- No data-driven JSON file (4 static brands, not worth the indirection)
- No next/image (logo sizing incompatibility)
