# AffiliateEditorial Section — UI Uplift & CTA

**Date:** 2026-06-09
**Branch:** client-feedback/v1

## Summary

Elevate the flat `AffiliateEditorial` homepage section by adding visual hierarchy (eyebrow, heading, gold decorative rule) and a CTA button linking to `/servicios/afiliados`. Background stays white; no new components needed.

## Current State

`components/home/AffiliateEditorial.tsx` renders three centered body paragraphs on a plain white background with top/bottom rule borders. No eyebrow, no heading, no CTA. The section feels visually disconnected from the rest of the page.

## Design

### Layout (top to bottom)

1. **Eyebrow** — global `s-eye` class, text key `affiliateIntro.eyebrow`
2. **Heading** — global `s-title` class, text key `affiliateIntro.heading`
3. **Gold decorative rule** — short centered `<hr>` (60px wide, 2px height, `--gold` background, no border)
4. **Three body paragraphs** — existing content and bold highlights, unchanged
5. **CTA button** — `btn-gold` global class, text key `affiliateIntro.cta`, links to `/servicios/afiliados`

### CSS changes (`AffiliateEditorial.module.css`)

- `.heading` — display font (`var(--fd)`), `--ink` color, centered, appropriate size (matches `s-title` rhythm)
- `.rule` — `width: 60px`, `height: 2px`, `background: var(--gold)`, `border: none`, `margin: 24px auto 32px`
- `.cta` — wrapper div, `margin-top: 36px`, `text-align: center`

### i18n keys

Add to **both** `lib/i18n/es.json` and `lib/i18n/en.json` under the `affiliateIntro` namespace:

| Key | Spanish | English |
|-----|---------|---------|
| `affiliateIntro.eyebrow` | `"Programa de Afiliados"` | `"Affiliate Programme"` |
| `affiliateIntro.heading` | `"Conecta tu marca con el lujo digital"` | `"Connect your brand to digital luxury"` |
| `affiliateIntro.cta` | `"Conoce el programa →"` | `"Explore the programme →"` |

## Files to Change

1. `lib/i18n/es.json` — add 3 keys to `affiliateIntro`
2. `lib/i18n/en.json` — add 3 keys to `affiliateIntro`
3. `components/home/AffiliateEditorial.tsx` — add eyebrow, heading, rule, CTA
4. `components/home/AffiliateEditorial.module.css` — add `.heading`, `.rule`, `.cta`

## Out of Scope

- Background color change (stays white)
- Any changes to the three body paragraphs' content
- New components
- Changes to the affiliates page itself (`/servicios/afiliados`)
