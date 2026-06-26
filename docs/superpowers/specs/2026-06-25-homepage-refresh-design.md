# Homepage Refresh — Design Spec
**Date:** 2026-06-25
**Branch:** client-feedback/v2

## Scope

Four focused changes to the homepage, sourced from client copy doc (DDL-copy-comparison) and approved HTML reference (`dominiosdelujo-anillos.html`):

1. Copy updates — hero kvp and CTA
2. AffiliateEditorial — redesign from dark to beige + accordion steps
3. ConfianzaCredibilidad — replace icons and center pillars
4. CollaborateTeaser — remove 3-card grid, keep header and CTA

---

## 1. Copy Updates

Files: `lib/i18n/es.json` and `lib/i18n/en.json`

All other homepage translations are already current. Only these keys need updating:

| Key | Current ES | New ES |
|---|---|---|
| `hero.kvp` | Invitamos a marcas de lujo a unirse a nuestra red de afiliados en los mercados de habla hispana. | Invitamos a las marcas de lujo a formar parte del ecosistema que define el lujo en español. |
| `hero.cta` | Solicitar ingreso al programa | Solicitar unirse |

| Key | Current EN | New EN |
|---|---|---|
| `hero.kvp` | We invite luxury brands globally to become our affiliate marketing partners | We invite luxury brands to establish their presence within the Spanish-speaking luxury market. |
| `hero.cta` | (current value) | Apply to join |

---

## 2. AffiliateEditorial — Beige + Accordion

**File:** `components/home/AffiliateEditorial.tsx` + `AffiliateEditorial.module.css`

### Background and color flip

- `.section` background: `var(--ink)` → `var(--c)` (beige/cream)
- `.statNum`: keep `var(--gold)`
- `.statLabel`: `rgba(250,250,248,0.65)` → `var(--ink3)`
- `.stat` borders: `rgba(226,207,160,0.14)` → `var(--rule)`
- `.body`: `rgba(250,250,248,0.72)` → `var(--ink2)`
- `.rule` hr: `var(--glt)` → `var(--gold)`
- Heading in JSX: `s-title inv` → `s-title`
- Eyebrow: stays `.s-eye.lft`
- CTA: keep `btn-dark`
- `.note` color: `rgba(250,250,248,0.45)` → `var(--ink3)`

### Steps become interactive accordion

Replace the static `<ol>` with an accordion driven by React `useState`. Pattern taken from `sec-how` in the HTML reference.

**State:** `const [open, setOpen] = useState<number>(0)` — first step open by default.

**Each step row:**
```
[gold number "01"] [step title] [chevron SVG]
```
- Separated by `1px solid var(--rule)` bottom border
- Last step has no bottom border
- Click toggles open state for that step index
- When open: title color → `var(--gold)`, chevron rotates 180deg
- Body text revealed below via `max-height` + `overflow:hidden` CSS transition

**CSS for accordion:**
```css
.step {
  border-bottom: 1px solid var(--rule);
  padding: 18px 0;
  cursor: pointer;
}
.stepTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.stepNum { /* existing gold number styling */ }
.stepLabel {
  font-family: var(--fd);
  font-size: 17px;
  font-weight: 400;
  color: var(--ink);
  flex: 1;
  transition: color 0.2s;
}
.stepLabelOpen { color: var(--gold); }
.stepChev {
  color: var(--ink3);
  transition: transform 0.3s, color 0.2s;
  display: flex;
  align-items: center;
}
.stepChevOpen { transform: rotate(180deg); color: var(--gold); }
.stepBody {
  max-height: 0;
  overflow: hidden;
  font-family: var(--fb);
  font-size: 13px;
  line-height: 1.75;
  color: var(--ink3);
  transition: max-height 0.35s ease, padding 0.35s ease;
  padding-left: 38px;
}
.stepBodyOpen { max-height: 120px; padding-top: 10px; }
```

The `<ol>`, `stepContent`, `stepTitle`, `stepDesc` classes are removed or repurposed.

---

## 3. ConfianzaCredibilidad — New Icons + Centered

**File:** `components/home/ConfianzaCredibilidad.tsx` + `ConfianzaCredibilidad.module.css`

### Replacement SVG icons

All 32x32 with `stroke="#B08A3A"`, `fill="none"`, `strokeWidth="1"`, `strokeLinecap="round"` `strokeLinejoin="round"`.

**Pill 1 — Revisión editorial:** Document with checkmark
```svg
viewBox="0 0 48 48"
<rect x="10" y="6" width="28" height="36" rx="2"/>
<line x1="16" y1="20" x2="32" y2="20"/>
<line x1="16" y1="26" x2="32" y2="26"/>
<polyline points="16,34 20,38 30,30"/>
```

**Pill 2 — Exclusividad por vertical:** Shield with inner diamond
```svg
viewBox="0 0 48 48"
<path d="M24 6 L40 14 L40 26 Q40 36 24 44 Q8 36 8 26 L8 14 Z"/>
<path d="M24 18 L30 24 L24 30 L18 24 Z"/>
```

**Pill 3 — Certificación LujoTotal™:** Award badge (circle with ribbon)
```svg
viewBox="0 0 48 48"
<circle cx="24" cy="20" r="14"/>
<line x1="18" y1="32" x2="14" y2="44"/>
<line x1="30" y1="32" x2="34" y2="44"/>
<line x1="14" y1="44" x2="24" y2="38"/>
<line x1="34" y1="44" x2="24" y2="38"/>
<circle cx="24" cy="20" r="8"/>
```

### Centering

In `ConfianzaCredibilidad.module.css`:
```css
.pillar {
  text-align: center;
  align-items: center; /* if display:flex */
}
.pillarIcon {
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## 4. CollaborateTeaser — Remove 3-Card Grid

**File:** `components/home/CollaborateTeaser.tsx`

Remove:
- The `icons` object at the top of the file
- The `roles` array
- The `{styles.grid}` div and its `roles.map(...)` content

Keep:
- The `{styles.wm}` watermark
- The `{styles.inner}` wrapper
- The `s-hd` block (eyebrow, title with em, subtitle)
- The CTA `RevealWrapper` with the link

The `CollaborateTeaser.module.css` `.grid`, `.card`, `.icon`, `.cardTitle`, `.cardDesc` rules can be removed.

---

## Files Touched

| File | Change |
|---|---|
| `lib/i18n/es.json` | hero.kvp, hero.cta |
| `lib/i18n/en.json` | hero.kvp, hero.cta |
| `components/home/AffiliateEditorial.tsx` | Accordion steps, remove inv class |
| `components/home/AffiliateEditorial.module.css` | Color flip, accordion CSS |
| `components/home/ConfianzaCredibilidad.tsx` | Replace 3 SVG icons |
| `components/home/ConfianzaCredibilidad.module.css` | Center pillars |
| `components/home/CollaborateTeaser.tsx` | Remove icons, roles, grid |
| `components/home/CollaborateTeaser.module.css` | Remove grid/card CSS |

---

## Out of Scope

- Brands page copy (separate task)
- LujoTotal page copy (separate task)
- Flagship domain additions
- FAQ section (new section, not requested for this session)
- Social media buttons
