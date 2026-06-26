# Typography Standardization Design

**Date:** 2026-06-25
**Branch:** client-feedback/v2
**Scope:** globals.css + all 34 component CSS modules

## Problem

The codebase has three coexisting font-size systems, 16 unique letter-spacing values with no tokens, and font-weight inconsistencies that risk incorrect rendering on Cormorant. Both code quality and visual consistency are affected.

- Font sizes: mix of hardcoded pixels, rem values, bespoke clamp() expressions, and `--text-*` tokens
- Letter-spacing: no tokens defined; every component guesses independently
- Font-weight: `600` used on Cormorant (display font) in 3 places — renders poorly

## Approach

Standardize around the existing token system (Option A). The `--text-*` and `--text-display-*` scales in globals are well-designed; the problem is non-compliance. Add missing letter-spacing tokens, then sweep all modules.

No visual redesign. No TSX/JS changes. Pure CSS token enforcement.

## Section 1: New Letter-Spacing Tokens

Add to `:root` in `app/globals.css`:

```css
--ls-tight:  0.02em;   /* body copy, serif headings */
--ls-normal: 0.04em;   /* general text, card metadata */
--ls-wide:   0.08em;   /* subheadings, secondary labels */
--ls-label:  0.12em;   /* nav, buttons, small uppercase */
--ls-eye:    0.18em;   /* eyebrow labels */
--ls-loose:  0.22em;   /* prominent eyebrows, footer */
```

Note: `.s-eye` in globals already uses `0.18em` inline — update it to `var(--ls-eye)` as part of this sweep.

Outlier values `0.28em` and `0.32em` (LujoTotalDetail, WritersGrid) map to `--ls-loose`. The difference is imperceptible at those sizes.

## Section 2: Font-Size Mapping

All hardcoded values map to existing tokens. No token values change.

| Hardcoded | Token | Resolves to |
|---|---|---|
| `9px`, `10px` | `--text-xs` | `11px` |
| `11px`, `11.5px`, `12px`, `12.5px` | `--text-xs` | `11px` |
| `13px`, `14px` | `--text-sm` | `13px` |
| `15px`, `16px`, `0.875rem` | `--text-base` | `15px` |
| `17px`, `18px`, `1.25rem` | `--text-lg` | `17px` |
| `20px` | `--text-xl` | `21px` |
| `24px`, `1.6rem`, `clamp(2rem, 4vw, 3rem)` | `--text-2xl` | `28px` |
| `clamp(17px, 1.6vw, 22px)`, `clamp(19px, 1.6vw, 23px)` | `--text-display-xs` | `clamp(18px, 2vw, 28px)` |
| `clamp(22px, 2.2vw, 32px)`, `clamp(22px, 2.4vw, 34px)` | `--text-display-sm` | `clamp(24px, 2.6vw, 38px)` |
| `clamp(26px, 3vw, 40px)`, `clamp(28px, 3.2vw, 48px)` | `--text-display-md` | `clamp(30px, 3.4vw, 48px)` |
| `clamp(36px, 10vw, 52px)`, `clamp(28px, 7.5vw, 48px)` | `--text-display-lg` | `clamp(38px, 3.8vw, 56px)` |
| `3rem` (LujoTotalDetail `.principleNum`) | `--text-display-md` | `clamp(30px, 3.4vw, 48px)` |
| `32px` inside `@media` (AffiliateEditorial `.statNum`) | `--text-2xl` | `28px` — static tokens only inside media query overrides |

**Exceptions (stay as-is):**
- `clamp(200px, 28vw, 380px)` in Manifesto — decorative background letter
- `88px` / `64px` in Manifesto `.ornament` — decorative quote mark, exceeds token scale intentionally

**Rule for media query blocks:** inside `@media` overrides, use static tokens (`--text-xs` through `--text-2xl`), not display tokens. Display tokens already clamp independently; nesting them inside a media query produces confusing results.

## Section 3: Font-Weight Corrections

| File | Current | Fix | Reason |
|---|---|---|---|
| `about/MissionVision.module.css` | `600` | `500` | Cormorant renders poorly at 600 |
| `home/BrandsGrid.module.css` | `600` | `500` | Cormorant renders poorly at 600 |
| `home/MetricsStrip.module.css` | `600` | `500` | Cormorant renders poorly at 600 |

`font-weight: 300` on Lora (6 files) stays — intentional light treatment.

## Section 4: Scope

Files that receive changes:

**globals.css** — add 6 `--ls-*` tokens to `:root`; update `.s-eye` letter-spacing to `var(--ls-eye)`

**All 34 component modules** — replace hardcoded font-size and letter-spacing values with tokens. No layout, color, or spacing rules change.

High-churn files (most changes):
- `home/Manifesto.module.css`
- `home/LujoTotalDetail.module.css`
- `components/layout/Nav.module.css`
- `components/layout/Footer.module.css`
- `components/dominios/DominiosInsigniaAlt.module.css`

## What Does Not Change

- Token values themselves (no size changes to `--text-*` or `--text-display-*`)
- Component TSX/JS files
- Translation files
- Layout, color, or spacing rules
- The decorative `clamp(200px, 28vw, 380px)` value

## Success Criteria

After the sweep:
- Zero hardcoded font-size pixel/rem values in any `.module.css`
- Zero raw `letter-spacing` numeric values in any `.module.css`
- All letter-spacing uses a `--ls-*` token
- All font-size uses a `--text-*` token
- No `font-weight: 600` on Cormorant
