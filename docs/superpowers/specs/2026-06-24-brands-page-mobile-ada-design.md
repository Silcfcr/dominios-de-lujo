# Brands Page Mobile Responsiveness + ADA Compliance Sweep

**Date:** 2026-06-24
**Branch:** client-feedback/v2

## Context

After completing the same sweep on the homepage, the brands page was audited and found to have similar mobile gaps and font-size inconsistencies. The global fixes from the homepage sweep (focus-visible on all buttons/links, prefers-reduced-motion on reveal animations, 480px section padding) already benefit the brands page automatically — no repeat work needed there.

The brands page has no auto-playing animations, so reduced-motion is simpler than the homepage. The remaining work is: font-size consistency, missing small-phone breakpoints across 6 CSS module files.

Scope: full sweep. Approach: same concern-first layered pattern as homepage — page-level CSS first, then component modules.

---

## Page Structure

- `app/brands/page.tsx` — server component (metadata only, no styles)
- `app/brands/BrandsPageClient.tsx` — client component rendering hero, stats bar, value cards, "why us" grid; uses `app/brands/page.module.css`
- `components/brands/BrandsCapacidades.tsx` + `.module.css`
- `components/brands/BrandsComoFunciona.tsx` + `.module.css`
- `components/brands/BrandsParaQuienEs.tsx` + `.module.css`
- `components/brands/BrandsCta.tsx` + `.module.css`
- `components/brands/BrandsFaq.tsx` + `.module.css`

---

## Pass 1: app/brands/page.module.css

### 1a. Stat number responsive scaling

`.statNum` is a fixed 40px with no responsive scaling. Change to:

```css
.statNum {
  font-size: clamp(28px, 3.5vw, 40px);
}
```

### 1b. Stat label minimum size

`.statLabel` is 10px — borderline illegible on small phones (uppercase, generous letter-spacing, but still very small). Raise the base to 11px:

```css
.statLabel {
  font-size: 11px;
}
```

### 1c. Stats — no 480px fix needed

The existing `@media (max-width: 900px)` rule already sets `.statsBar { flex-direction: column; }` and converts `.statDivider` to a full-width horizontal rule. Stats are already vertically stacked on all mobile sizes. No additional rule needed.

---

## Pass 2: Component CSS modules

### BrandsCapacidades.module.css

Existing breakpoint: 768px (grid 2-col to 1-col). Missing 480px rule.

Add at end of file:

```css
@media (max-width: 480px) {
  .card { padding: 24px 16px; }
}
```

### BrandsComoFunciona.module.css

Existing breakpoint: 768px (gap/padding reduction). Missing: stepNum scaling and 480px rule.

Add `.stepNum` font-size reduction inside the existing 768px block:

```css
@media (max-width: 768px) {
  /* existing rules */
  .stepNum { font-size: 28px; }
}
```

Add at end of file:

```css
@media (max-width: 480px) {
  .step  { gap: 16px; }
  .steps { gap: 24px; }
}
```

### BrandsParaQuienEs.module.css

No media queries exist. Add:

```css
@media (max-width: 768px) {
  .body { font-size: 15px; }
}
```

### BrandsCta.module.css

No media queries exist. The `.subtitle` (17px) and `.body` (16px) never scale. Add:

```css
@media (max-width: 768px) {
  .subtitle { font-size: 15px; }
  .body     { font-size: 15px; }
}
```

### BrandsFaq.module.css

Existing breakpoint: 768px. Missing 480px rule.

Add at end of file:

```css
@media (max-width: 480px) {
  .question { font-size: 15px; }
  .item     { padding: 20px 0; }
}
```

---

## Files Changed

| File | Change |
|------|--------|
| `app/brands/page.module.css` | statNum clamp, statLabel 11px (stats vertical stack already handled at 900px) |
| `components/brands/BrandsCapacidades.module.css` | 480px card padding |
| `components/brands/BrandsComoFunciona.module.css` | stepNum 28px at 768px, 480px step gap |
| `components/brands/BrandsParaQuienEs.module.css` | 768px body font-size |
| `components/brands/BrandsCta.module.css` | 768px subtitle/body font-size |
| `components/brands/BrandsFaq.module.css` | 480px question font-size + item padding |

---

## What Is Already Fixed (No Repeat Work)

- Focus-visible on all buttons and links (from globals.css homepage sweep)
- prefers-reduced-motion on reveal animations (from globals.css homepage sweep)
- 480px section padding on .sec/.sec-sm (from globals.css homepage sweep)
- No auto-playing animations exist on the brands page

---

## Verification

1. `npx tsc --noEmit` — zero errors
2. `npm run build` — static export succeeds
3. At 360px and 480px: stats stack vertically, all text readable, no horizontal overflow
4. At 768px: BrandsParaQuienEs and BrandsCta body text visibly smaller than desktop
5. At 1024px: all sections match original desktop design, no regressions
6. Tab through the page — gold focus outline visible on all buttons and links (already handled globally)
