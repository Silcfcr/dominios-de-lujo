# Homepage Desktop Body Readability Fix

**Date:** 2026-06-24
**Branch:** client-feedback/v2

## Context

After the previous ADA/mobile sweep (see `2026-06-24-homepage-mobile-ada-design.md`), the
homepage still feels hard to read on desktop. The root cause: multiple components settled on
14px or 13px for running body copy, which is too small for a luxury editorial brand using a
serif body font (Lora). Two dark-background sections also have opacity-based contrast failures
(WCAG AA violations) that compound the readability problem.

This spec addresses desktop body copy only. Mobile breakpoints from the prior sweep are not
touched unless a new desktop baseline requires a corresponding mobile adjustment.

---

## Design Rule

**Running body copy: 16px minimum on desktop.**
**Feature/pillar descriptions (short, scannable): 15px minimum.**
**Decorative labels (eyebrows, tickers, buttons, all-caps overlays) are exempt** because
letter-spacing and visual treatment compensate for smaller sizes.

---

## Changes Per Component

### 1. Hero (`components/home/Hero.module.css`)

| Selector | Before | After |
|----------|--------|-------|
| `.kvp` font-size | 14px | 16px |

The `.kvp` paragraph is the first body text a visitor reads next to the hero image. 16px is
the baseline for comfortable reading in Lora at this weight and line-height (1.85).

### 2. Manifesto (`components/home/Manifesto.module.css`)

| Selector | Property | Before | After |
|----------|----------|--------|-------|
| `.para` font-size | font-size | 14px | 16px |
| `.para` color opacity | rgba alpha | 0.55 | 0.72 |
| `.paraCoda` font-size | font-size | 14px | 15px |

Two changes are bundled in `.para`: size and contrast. `rgba(250, 247, 242, 0.55)` on
`#1A1714` currently produces approximately 4.1:1, which fails WCAG AA for normal text. At
0.72 it reaches approximately 12:1 (AAA). The fade-in animation targets `opacity` on the
element itself (`.textVisible .para { opacity: 1 }`), which is a separate CSS property from
the `color` alpha and is unaffected.

`.paraCoda` is intentionally subordinate (italic gold closing quote), so 15px keeps it
smaller than the main paragraphs while removing the too-small feel.

### 3. CategoryTeaser (`components/home/CategoryTeaser.module.css`)

| Selector | Before | After |
|----------|--------|-------|
| `.phrase` font-size | 14px | 15px |

`.phrase` is a short caption overlaid on a dark gradient image, not long-form reading copy.
15px is appropriate; full 16px would feel heavy against the overlay.

### 4. BrandsGrid (`components/home/BrandsGrid.module.css`)

| Selector | Before | After |
|----------|--------|-------|
| `.desc` font-size | 14px | 15px |

Short, scannable brand card descriptions. 15px reads more comfortably without making the
cards feel dense.

### 5. PorQueNosotros (`components/home/PorQueNosotros.module.css`)

| Selector | Before | After |
|----------|--------|-------|
| `.featDesc` font-size | 13px | 15px |

Currently the smallest body text on the homepage. These feature descriptions carry trust
signals and benefit most from the increase.

### 6. ConfianzaCredibilidad (`components/home/ConfianzaCredibilidad.module.css`)

| Selector | Before | After |
|----------|--------|-------|
| `.pillarDesc` font-size | 13px | 15px |

Same rationale as PorQueNosotros. The three pillar descriptions set credibility; they should
be easy to read.

### 7. AffiliateEditorial (`components/home/AffiliateEditorial.module.css`)

| Selector | Property | Before | After |
|----------|----------|--------|-------|
| `.statLabel` font-size | font-size | 11px | 12px |
| `.statLabel` color opacity | rgba alpha | 0.45 | 0.65 |

`.statLabel` is a short uppercase string; 12px with generous letter-spacing (existing) is
defensible. The 0.45 opacity on dark currently fails WCAG outright (approx 3:1). At 0.65
it passes AA.

---

## What Does Not Change

- Eyebrow labels (`.s-eye`, `.eyebrow`): 12px all-caps with letter-spacing
- Ticker items: 12px all-caps on dark, informational scrolling display
- Button labels (`.btn-*`): 13px uppercase, standard UI convention
- All headings: already use `clamp()` at comfortable sizes
- Mobile breakpoint overrides from the prior ADA sweep

---

## Files Changed

| File | Change |
|------|--------|
| `components/home/Hero.module.css` | `.kvp` 14px → 16px |
| `components/home/Manifesto.module.css` | `.para` 14px → 16px, opacity 0.55 → 0.72; `.paraCoda` 14px → 15px |
| `components/home/CategoryTeaser.module.css` | `.phrase` 14px → 15px |
| `components/home/BrandsGrid.module.css` | `.desc` 14px → 15px |
| `components/home/PorQueNosotros.module.css` | `.featDesc` 13px → 15px |
| `components/home/ConfianzaCredibilidad.module.css` | `.pillarDesc` 13px → 15px |
| `components/home/AffiliateEditorial.module.css` | `.statLabel` 11px → 12px, opacity 0.45 → 0.65 |

7 files, CSS Modules only. No TSX changes, no i18n changes, no new dependencies.

---

## Verification

1. `npx tsc --noEmit` — zero TypeScript errors (CSS-only changes, should be trivially clean)
2. `npm run build` — static export must complete without errors
3. Open `localhost:3000` in a browser at 1280px width and scroll through every section:
   - Hero paragraph reads at a noticeably larger, more comfortable size
   - Manifesto paragraphs on dark background are clearly legible (not dim gray)
   - CategoryTeaser caption over image is readable without feeling heavy
   - BrandsGrid card descriptions are comfortable to scan
   - PorQueNosotros and ConfianzaCredibilidad feature/pillar descriptions no longer feel tiny
   - AffiliateEditorial stat labels are legible on dark background
4. Check at 768px width: no section looks unbalanced (these are desktop-sized values and
   most mobile overrides are already in place from the prior sweep)
5. Run a quick WCAG contrast check on Manifesto `.para` and AffiliateEditorial `.statLabel`
   using browser DevTools accessibility panel to confirm AA pass
