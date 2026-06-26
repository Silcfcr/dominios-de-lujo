# Homepage Mobile Responsiveness + ADA Compliance Sweep

**Date:** 2026-06-24
**Branch:** client-feedback/v2

## Context

The homepage was audited and found to have three categories of issues:
1. **Mobile gaps** — inconsistent breakpoint coverage (most components stop at 900px/768px, almost nothing handles 480px phones), grid layouts that don't reflow on small screens, and fixed font sizes that never shrink.
2. **ADA/WCAG violations** — no `:focus-visible` styles on any interactive element (WCAG 2.4.7), no `prefers-reduced-motion` support (WCAG 2.3.3), one hardcoded English `aria-label`, and a static `lang="es"` on the HTML element that never updates when the user toggles to English.
3. **Visual unevenness** — body copy at 17px that never scales down, grids with cramped columns at intermediate widths, and section padding that has only one mobile override.

The approach is a three-pass concern-first sweep: global foundations first, then per-component CSS, then TSX/i18n attribute fixes.

Scope agreed: full sweep. Reduced-motion strategy agreed: minimal (stop auto-playing/looping animations only; keep gentle user-initiated hover transitions).

---

## Pass 1: globals.css

### 1a. Focus-visible on all interactive elements

Add to the reset block (base `button` and `a`):
```css
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
}
```

Add to each button utility class (`.btn-dark`, `.btn-outline`, `.btn-gold`):
```css
.btn-dark:focus-visible  { outline: 2px solid var(--gold); outline-offset: 3px; }
.btn-outline:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
.btn-gold:focus-visible  { outline: 2px solid var(--gold); outline-offset: 3px; }
```

### 1b. prefers-reduced-motion block (minimal strategy)

```css
@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal2,
  .reveal3 {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

Ticker and Hero slide transitions are auto-playing and handled in their own module CSS files (Pass 2).

### 1c. 480px section padding

Extend the existing `@media (max-width: 768px)` with a tighter 480px rule:
```css
@media (max-width: 480px) {
  .sec    { padding: 48px 20px; }
  .sec-sm { padding: 40px 20px; }
}
```

---

## Pass 2: Component CSS modules

Components rendered in `app/page.tsx` in order: Hero, Ticker, CategoryTeaser, BrandsGrid, PorQueNosotros, AffiliateEditorial, ConfianzaCredibilidad, CollaborateTeaser.

### Hero.module.css

Add `prefers-reduced-motion` rules to stop the Ken Burns zoom and crossfade transitions:
```css
@media (prefers-reduced-motion: reduce) {
  .slide { transition: none; }
  .img   { transition: none; transform: none; }
}
```
The existing 900px and 480px breakpoints are already correct. No other changes needed.

### Ticker.module.css

No media queries exist. Add:
```css
@media (prefers-reduced-motion: reduce) {
  .track { animation: none; }
}

@media (max-width: 480px) {
  .item { padding: 0 16px; }
}
```

### CategoryTeaser.module.css

Existing breakpoint: 768px. Add 480px:
```css
@media (max-width: 480px) {
  .stage    { height: 320px; }
  .navBtn   { width: 32px; height: 32px; font-size: 18px; }
  .info     { padding: 16px; }
  .body     { font-size: 14px; }
}
```

### BrandsGrid.module.css

Existing breakpoint: 900px (3-col to 2-col). Add small-phone single-column:
```css
@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr; }
  .card { padding: 32px 20px; }
}
```

### PorQueNosotros.module.css

The `.featGrid` already collapses correctly at 768px and 480px. The `.body` text (17px) never scales. Extend the existing 768px block:
```css
@media (max-width: 768px) {
  /* existing .featGrid rule stays */
  .body { font-size: 15px; }
}
```

### AffiliateEditorial.module.css

At 900px the stats row goes `flex-direction: row` (3 stats side by side). On 480px phones this is too tight. Add:
```css
@media (max-width: 480px) {
  .stats               { flex-direction: column; border-top: none; border-bottom: none; }
  .stat                { padding: 16px 0; border-bottom: 1px solid rgba(226,207,160,0.14); }
  .stat:first-child    { border-top: 1px solid rgba(226,207,160,0.14); }
  .stat + .stat        { border-left: none; }
}
```

### ConfianzaCredibilidad.module.css

Currently jumps 3-col straight to 1-col at 768px. Tablets at 769–900px see cramped 257px pillars. Move the breakpoint up:
- Change `@media (max-width: 768px)` to `@media (max-width: 900px)` for the `.pillars` grid rule.

### CollaborateTeaser.module.css

The `.subtitle` (17px) has no mobile size. The grid already collapses at 900px. Add:
```css
@media (max-width: 768px) {
  .subtitle { font-size: 15px; }
}
```

---

## Pass 3: TSX + i18n

### CategoryTeaser.tsx — untranslated aria-label

**File:** `components/home/CategoryTeaser.tsx`, line 132.

Change:
```tsx
aria-label="Next category"
```
to:
```tsx
aria-label={t('categoryTeaser.nextAriaLabel')}
```

The translation key `categoryTeaser.nextAriaLabel` already exists in both `lib/i18n/es.json` ("Siguiente categoría") and `lib/i18n/en.json` ("Next category"). No JSON changes needed.

### lib/i18n/context.tsx — dynamic html lang attribute

The `<html lang="es">` is set in the server-rendered `app/layout.tsx` and never updates when the user toggles to English. Fix by adding a `useEffect` inside `I18nProvider`:

```tsx
useEffect(() => {
  document.documentElement.setAttribute('lang', lang);
}, [lang]);
```

Place this after the existing `useEffect` that reads `localStorage`. The server-rendered default (`lang="es"`) is correct for crawlers and SSR; this effect updates it client-side immediately on hydration and on every toggle.

---

## Files Changed

| File | Pass | Change type |
|------|------|-------------|
| `app/globals.css` | 1 | Focus-visible, prefers-reduced-motion, 480px padding |
| `components/home/Hero.module.css` | 2 | prefers-reduced-motion for slides |
| `components/home/Ticker.module.css` | 2 | prefers-reduced-motion + 480px padding |
| `components/home/CategoryTeaser.module.css` | 2 | 480px breakpoint |
| `components/home/BrandsGrid.module.css` | 2 | 600px 1-col breakpoint |
| `components/home/PorQueNosotros.module.css` | 2 | .body font-size at 768px |
| `components/home/AffiliateEditorial.module.css` | 2 | 480px stats reflow |
| `components/home/ConfianzaCredibilidad.module.css` | 2 | 768px → 900px breakpoint |
| `components/home/CollaborateTeaser.module.css` | 2 | .subtitle font-size at 768px |
| `components/home/CategoryTeaser.tsx` | 3 | aria-label translation fix |
| `lib/i18n/context.tsx` | 3 | document.documentElement.lang sync |

---

## Verification

1. `npm run build` — must complete without errors
2. `npx tsc --noEmit` — zero TypeScript errors
3. Open in browser at 320px, 480px, 768px, 900px, and 1280px widths and verify:
   - All sections reflow cleanly, no horizontal overflow
   - Text is readable at every size
   - BrandsGrid shows 1-col at 360px, 2-col at 700px, 3-col at 1000px
   - CategoryTeaser stage is not too tall on phones
   - ConfianzaCredibilidad pillars stack at 900px instead of cramming into 3-col
4. Tab through the page with keyboard — every button and link must show the gold outline on focus
5. Enable macOS "Reduce Motion" in System Settings and verify:
   - Ticker does not scroll
   - Page sections appear immediately (no fade-in)
   - Hero image does not zoom
6. Toggle language — confirm `<html lang>` updates in DevTools Elements panel
