# Writers Grid — Design Spec
**Date:** 2026-06-04

## Overview

Add a "Nuestros Escritores de Lujo" section to the top of the Quiénes somos (`/nosotros`) page, showcasing 6 featured writers with photo, vertical/specialty, name, and a personal luxury pull quote (placeholder text for now).

## Placement

- **Page:** `app/nosotros/page.tsx`
- **Position:** First section, before `<MissionVision />` and `<Manifesto />`

## New Files

- `components/about/WritersGrid.tsx` — component
- `components/about/WritersGrid.module.css` — styles

## Section Header

Centered, matches existing eyebrow + title pattern:

- **Eyebrow** (`s-eye` class): "Voces del lujo"
- **Heading** (`h2`, Cormorant serif): "Nuestros Escritores de Lujo"

## Writer Card

Each of the 6 cards contains (top to bottom):

1. **Photo** — square crop, full card width, ~240px tall. Until real photos are provided, render a neutral gray placeholder `div` showing the writer's initials in gold Cormorant.
2. **Vertical eyebrow** — small gold uppercase label (same `.roleEye` pattern from Colaborar), e.g. "Moda & Estilo"
3. **Name** — `h3`, Cormorant serif, ~20px, `--ink`
4. **Pull quote** — single line, Lora italic, ~13px, `--ink3`. A gold `"` prefix rendered via CSS `::before` on the `<p>`. No additional quotation mark component needed.

Card styling:
- White background (`--w`), 1px `--rule` border
- Subtle hover lift: `translateY(-4px)` + `box-shadow` — matches `MissionVision .card:hover`

## Grid Layout

- **Desktop (>900px):** `repeat(3, 1fr)`, `gap: 28px` — 3 columns × 2 rows
- **Tablet (≤900px):** `repeat(2, 1fr)`
- **Mobile (≤600px):** `1fr`

Wrapped in a `<section>` with `sec` class (standard section padding) and `--c` background.

## Data

Writer data is hardcoded in the component as a TypeScript array (not in i18n translation files). Each entry:

```ts
{ name: string; vertical: string; quote: string; photo?: string }
```

Placeholder data for all 6 writers:
- Names: "Escritora Uno" … "Escritora Seis" (to be replaced)
- Verticals: Moda & Estilo, Gastronomía, Viajes de Lujo, Joyería & Relojes, Arte & Cultura, Propiedades (one per writer)
- Quote: "El lujo es…" placeholder for each

When `photo` is undefined, render the initials placeholder instead of `next/image`.

## i18n

No i18n keys required. Writer content (names, verticals, quotes) is editorial data, not UI copy. If translations are needed in future, extract to a data file at that point.

## Out of Scope

- Colaborar page: not included in this iteration
- Linking writer cards to author pages
- CMS / dynamic data source
