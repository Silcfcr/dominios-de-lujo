# Spec: BrandsCapacidades 3-Column ServicesGrid Redesign

## Summary

Redesign the `BrandsCapacidades` section on the brands page. Remove card 4 ("Promoción en redes sociales"), leaving 3 cards, and switch from the current 2-column bordered grid to a 3-column homepage-style layout matching the `ServicesGrid` pattern: rule-separator grid, gold line icons, per-card eyebrows, Cormorant display titles, and Lora body text. No CTA links.

## Scope

- `components/brands/BrandsCapacidades.tsx`
- `components/brands/BrandsCapacidades.module.css`
- `lib/i18n/es.json`
- `lib/i18n/en.json`

## Content Changes

### Remove card 4

Delete the following keys from both `es.json` and `en.json` under `brandsCapacidades`:

- `card4Title`
- `card4Desc`

Remove `card4` entry from the `CARDS` array in `BrandsCapacidades.tsx`.

### Add per-card eyebrow keys

Add to `brandsCapacidades` in both i18n files:

| Key | ES | EN |
|---|---|---|
| `card1Eyebrow` | `Analítica` | `Analytics` |
| `card2Eyebrow` | `Visibilidad` | `Visibility` |
| `card3Eyebrow` | `Editorial` | `Editorial` |

## Component Changes (`BrandsCapacidades.tsx`)

Update `CARDS` to 3 entries, each with `eyebrowKey`, `titleKey`, `descKey`, and an `icon` (inline SVG element).

### Icons (32x32, line style, `currentColor`, `strokeWidth="1"`)

**Card 1 — Analytics (bar chart with upward trend):**
```svg
<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
  <rect x="4" y="18" width="5" height="10" />
  <rect x="13" y="12" width="5" height="16" />
  <rect x="23" y="6" width="5" height="22" />
  <polyline points="6.5,17 15.5,11 25.5,5" strokeWidth="1" />
</svg>
```

**Card 2 — Multichannel Visibility (3-node network):**
```svg
<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
  <circle cx="16" cy="6" r="3" />
  <circle cx="5" cy="26" r="3" />
  <circle cx="27" cy="26" r="3" />
  <line x1="16" y1="9" x2="6.5" y2="23" />
  <line x1="16" y1="9" x2="25.5" y2="23" />
  <line x1="8" y1="26" x2="24" y2="26" />
</svg>
```

**Card 3 — Editorial Content (document with ruled lines):**
```svg
<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
  <rect x="6" y="2" width="20" height="28" rx="1" />
  <line x1="10" y1="10" x2="22" y2="10" />
  <line x1="10" y1="15" x2="22" y2="15" />
  <line x1="10" y1="20" x2="16" y2="20" />
  <path d="M20 24 l4-4 2 2 -4 4 -2 0 0-2z" fill="currentColor" stroke="none" />
</svg>
```

### Updated render

Each card renders: icon div, eyebrow `<p>`, `<h3>` title, `<p>` description. No CTA link.

## CSS Changes (`BrandsCapacidades.module.css`)

Replace current styles with the ServicesGrid pattern:

```css
.section {
  background: var(--c2);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--rule);
  max-width: 1100px;
  margin: 48px auto 0;
}

.card {
  background: var(--w);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  transition: background 0.3s;
}

.card:hover {
  background: var(--c);
}

.icon {
  margin-bottom: 24px;
}

.icon svg {
  width: 32px;
  height: 32px;
  color: var(--gold);
}

.cardEyebrow {
  font-family: var(--fb);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 8px;
}

.cardTitle {
  font-family: var(--fd);
  font-size: var(--text-xl);
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 12px;
  line-height: var(--lh-snug);
}

.cardDesc {
  font-family: var(--fb);
  font-size: var(--text-base);
  line-height: var(--lh-relaxed);
  color: var(--ink3);
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
    margin: 32px 0 0;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 28px 20px;
  }
}
```

## Out of Scope

- No changes to other brands page components
- No CTA links on cards
- No changes to the section eyebrow or section title
