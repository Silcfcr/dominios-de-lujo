# Spec: BrandsComoFunciona — Image + Accordion Split Layout

## Context
The /brands "Cómo funciona" section currently renders as a full-width centered block with an accordion. The approved design reference (dominiosdelujo-anillos.html `.sec-how`) shows this section as a two-column split: image fills the left half, accordion content sits on the right with a cream background. `hotel.webp` is the chosen image (unused in any other component).

## Layout

**Section:** Full-bleed, no `sec` wrapper padding. `min-height: 560px`.

**Grid:** `grid-template-columns: 1fr 1fr` on desktop.

**Left column (image):**
- `hotel.webp` via `next/image` with `fill` + `object-fit: cover`
- `position: relative; overflow: hidden`
- Hover: `scale(1.04)` over 8s (matches HTML reference)

**Right column (content):**
- Background: `var(--c)` (cream)
- Padding: `80px 64px`
- Flex column, justify-content: center
- Contains: eyebrow (`s-eye lft`) → h2 (`s-title`) → gold `<hr>` rule → accordion steps

**Accordion:** Unchanged from the current implementation (useState, chevron, stepBody animation).

**Mobile (≤ 768px):** Stack to single column. Image becomes a fixed-height block (`60vw`, max `400px`). Content padding reduces to `48px 24px`.

## Files to modify
- `components/brands/BrandsComoFunciona.tsx` — add image column wrapper, restructure layout
- `components/brands/BrandsComoFunciona.module.css` — full-bleed grid, image column, responsive stack

## Verification
Run `npm run dev`, visit `/brands`. Confirm: hotel image fills left half, accordion on right, hover scales image, mobile stacks correctly.
