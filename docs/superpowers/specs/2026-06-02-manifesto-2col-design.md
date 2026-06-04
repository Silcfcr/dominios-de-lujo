# Manifesto 2-Column Redesign — Design Spec

**Date:** 2026-06-02
**Scope:** Reduce section height by splitting single-column centred layout into a 2-column grid

---

## Problem

The Manifesto section stacks all content vertically in a `max-width: 680px` centred column with `120px` top/bottom padding, making it excessively tall on desktop.

---

## Goal

Halve the visual height on desktop by placing title/identity content in the left column and the audio player + manifesto text in the right column.

---

## Design

### Layout

Replace the centred `.inner` wrapper with a CSS grid:

```
grid-template-columns: 45fr 55fr
gap: 80px
align-items: start
max-width: 1200px
margin: 0 auto
```

Section padding: `80px 64px` (down from `120px 64px`).

The existing `max-width: 680px` and `text-align: center` on `.inner` are removed.

### Left column (45%)

Contains, in order, left-aligned:
- `.ornament` (❝) — stays decorative, left-aligned
- `.eyebrow`
- `.title` — unchanged size (`clamp(44px, 5.5vw, 72px)`), left-aligned instead of centred
- `.rule` — left-aligned (grows from left edge, not centred)

### Right column (55%)

Contains:
- Audio `.player` — full column width (remove `max-width: 500px`)
- `.text` block with 5 paragraphs — left-aligned, same staggered fade-in animation on play, remove `text-align: center` from `.para`

### Mobile (≤768px)

Grid collapses to `grid-template-columns: 1fr` (single column, same order: left col first, right col second). Section padding: `80px 24px`.

---

## Files

| Action | Path |
|---|---|
| Modify | `components/home/Manifesto.tsx` |
| Modify | `components/home/Manifesto.module.css` |

### TSX changes

- `.inner` becomes a grid container (CSS class change only — no structural reordering needed if left-col content naturally precedes right-col content in DOM order)
- Wrap left-column elements in a `<div className={styles.left}>` and right-column elements in a `<div className={styles.right}>`

### CSS changes

- `.inner`: remove `max-width`, `text-align: center`, `align-items: center`, `flex-direction: column`. Add `display: grid`, `grid-template-columns: 45fr 55fr`, `gap: 80px`, `align-items: start`, `max-width: 1200px`
- `.section`: padding `80px 64px`
- `.title`: remove centred text-align (inherits left)
- `.rule`: `margin-left: 0` (anchors to left edge of column)
- `.player`: remove `max-width: 500px`
- `.text`: remove `max-width: 560px`; `text-align: left` on `.para`
- `.paraCoda`: `text-align: left`
- Mobile breakpoint: `grid-template-columns: 1fr`

---

## Testing

- Visual check: run `npm run dev`, confirm section is noticeably shorter on desktop
- Click play: confirm manifesto text fades in correctly in the right column
- Resize to mobile: confirm single-column stacking
- Check that all existing animations (fade-up on `.inner`, staggered text reveal) still work
