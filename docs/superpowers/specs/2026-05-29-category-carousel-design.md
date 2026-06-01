# Category Carousel — Design Spec
_2026-05-29_

## Overview

Replace the static 4-card grid in `CategoryTeaser` with an auto-advancing centered-spotlight carousel. Three cards are visible at once: the active card is large and centered; the prev/next cards peek in from the edges. Loops infinitely, navigable via arrows, pauses on hover.

---

## Data

Four hardcoded entries extending the existing `FEATURED` array. Each entry has:
- `key` — category name (used as the link query param and i18n lookup)
- `image` — Unsplash URL (unchanged from current)
- `phraseEn` — English tagline
- `phraseEs` — Spanish tagline

| Category | EN phrase | ES phrase |
|---|---|---|
| Propiedades y Bienes Raíces de Lujo | "Luxury is owning a space that defines you." | "El lujo es poseer un espacio que te define." |
| Joyería, Relojería y Metales Preciosos | "Luxury is wearing something that survives generations." | "El lujo es llevar algo que sobrevive generaciones." |
| Viajes, Turismo, Destinos y Alojamientos | "Luxury is sleeping somewhere that changes your sense of time." | "El lujo es dormir en un lugar que cambia tu sentido del tiempo." |
| Moda, Accesorios y Alta Costura | "Luxury is dressing for who you're becoming." | "El lujo es vestirte para quien estás llegando a ser." |

---

## Layout

### Desktop (≥ 768px)

```
[ ‹ ]  [ side card 22% ]  [ ACTIVE CARD 52% ]  [ side card 22% ]  [ › ]
```

- **Outer container**: `overflow: hidden`, full section width
- **Track**: flex row, `transform: translateX(...)` driven by active index
- **Side cards**: 22% width, `opacity: 0.5`, image only (no text overlay), pointer-events none
- **Active card**: 52% width, full opacity. Aspect ratio ~16/9 or fixed 520px height.
  - Full-bleed `next/image` (object-fit: cover)
  - Dark gradient overlay: `linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)`
  - Bottom text block: category name (Cormorant, clamp 22–34px, weight 300, white) + phrase (Lora, 13px, italic, `var(--gold)`)
- **Arrows**: `‹` `›` positioned absolutely at vertical mid-point of the card area, outside the card edges. 44×44px, 1px solid `var(--rule)`, gold on hover.

### Mobile (< 768px)

- Side cards hidden (`display: none` or width 0)
- Active card 100% width
- Arrows remain, smaller (36×36px), overlaid at card edges

---

## Interaction

| Event | Behaviour |
|---|---|
| Auto-advance | Every 5 000 ms, advance to next (wraps with modulo) |
| Hover section | Pause auto-advance timer |
| Mouse leave | Resume auto-advance timer |
| Click `›` | Advance immediately, reset timer |
| Click `‹` | Go back immediately, reset timer |
| Click card | Navigate to `/dominios?category=<key>` |

**Transition**: `transform` on the track, `0.6s cubic-bezier(0.4, 0, 0.2, 1)`. No additional animation libraries.

**Infinite loop strategy**: virtual index with modulo (`index % 4`). No cloned-node tricks needed for 4 items.

---

## Component Architecture

- **File**: `components/home/CategoryTeaser.tsx` — rewritten in place
- **CSS**: `components/home/CategoryTeaser.module.css` — rewritten in place
- **No new files** required
- Uses `useI18n` hook for lang/phrase selection and existing i18n keys
- Uses `next/image` for card images (existing pattern)
- Uses `RevealWrapper` for the section heading (unchanged)

### State

```ts
const [active, setActive] = useState(0);  // current index 0–3
```

Timer managed with `useRef<ReturnType<typeof setInterval>>` + `useEffect`. Cleared on unmount and on manual navigation.

---

## Phrases (i18n approach)

Phrases are hardcoded in the component data array (not added to `en.json`/`es.json`) since they are presentation copy tightly coupled to the carousel cards. The active language is read from `useI18n()` to select `phraseEn` vs `phraseEs`.

---

## Out of scope

- Swipe/drag gesture support (can be added later)
- Dot indicators (arrows are sufficient)
- Fetching categories from `categories.json` (static 4 is correct)
