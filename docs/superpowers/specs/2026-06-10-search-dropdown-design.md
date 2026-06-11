# Search Dropdown Design

**Date:** 2026-06-10  
**Status:** Approved

## Problem

The current search results display is a full-width pill block that renders in a separate section below the cream header. This creates a disconnected feel — the search box sits in the header, but results appear far below with a visible gap. Showing 20–50 pills at once is overwhelming and hard to scan.

## Solution

Replace the pill section with a floating dropdown panel anchored directly below the search input. Results appear inline with the search experience, keeping the page calm and the category sections undisturbed.

## Behavior

- **Opens:** when `q` is non-empty and at least one result exists
- **Closes:** when `q` is cleared (X button) or the input loses focus. Because a click on a dropdown item fires *after* the input's `onBlur`, the dropdown uses `onMouseDown={e => e.preventDefault()}` on each item to keep focus on the input until the navigation fires.
- **Results:** capped at 20, ranked by `scoreMatch` (exact → starts-with → contains)
- **Overflow:** if more than 20 results exist, a faint label at the bottom reads "N más" (translated)
- **Click:** each row is a `<Link>` navigating directly to `/dominios/[domain]`
- **No keyboard navigation** (can be added later if needed)

## Layout

The `searchWrap` div already has `position: relative` — the dropdown anchors to it.

```
┌─────────────────────────────────────┐  ← searchWrap (position: relative)
│ 🔍  sill                          ✕ │  ← search input
└─────────────────────────────────────┘
┌─────────────────────────────────────┐  ← dropdown (position: absolute, top: 100%)
│  sillas.com                         │
│  marcasdesillas.com                 │
│  utensiliosdelujo.com               │
│  ...                                │
│  + 4 más                            │
└─────────────────────────────────────┘
```

Each row shows the domain name with the TLD portion in `--gold`. Rows have a subtle hover state.

## Files Changed

| File | Change |
|------|--------|
| `components/dominios/DominiosInsigniaAlt.tsx` | Remove `{q && <div results>}` block; add `{q && results.length > 0 && <div dropdown>}` inside `searchWrap` |
| `components/dominios/DominiosInsigniaAlt.module.css` | Remove `.results`, `.resultsPills`, `.pill`, `.resultsCount` classes; add `.dropdown`, `.dropdownItem`, `.dropdownDomain`, `.dropdownTld`, `.dropdownMore` |

## Removed

- `styles.results` section block and all its CSS
- `styles.resultsPills` flex container
- `styles.pill` link style
- `styles.resultsCount` label

## i18n

Reuses the existing `dominiosInsignia.results` key for the overflow label (`+ {n} ${t('dominiosInsignia.results')}`). No new i18n keys required.

## Non-Goals

- Keyboard navigation (arrow keys, Enter to select)
- Highlighting matched substring within each result
- Debouncing (input is already fast; search index is local)
