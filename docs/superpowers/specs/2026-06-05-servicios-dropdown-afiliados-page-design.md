# Design: Servicios Nav Dropdown + Afiliados Dedicated Page

**Date:** 2026-06-05
**Branch:** client-feedback/v1

## Summary

Add a dropdown to the "Servicios" nav item with three service links. Create a dedicated `/servicios/afiliados` page that holds the full affiliate service content plus the `PartnerValue` section (moved from the homepage). The existing `/servicios` overview page stays mostly intact, gaining anchors and a CTA linking to the dedicated affiliate page.

---

## 1. Nav Dropdown

**File:** `components/layout/Nav.tsx`

Convert the `/servicios` nav link into a dropdown using the existing `.dropItem` / `.dropMenu` / `.dropLink` CSS pattern (identical to the `/nosotros` dropdown).

### Desktop dropdown items

| Label key | href |
|---|---|
| `subnav.afiliados` | `/servicios/afiliados` |
| `subnav.paginas` | `/servicios#paginas` |
| `subnav.alquileres` | `/servicios#alquileres` |

### Mobile drawer

Three flat sub-links below the main "Servicios" link, same as the Nosotros → Manifiesto pattern:
- Afiliados → `/servicios/afiliados`
- PaginasDeLujo.com → `/servicios#paginas`
- Alquileres & Publicidad → `/servicios#alquileres`

### New i18n keys (both `es.json` and `en.json`, under `subnav`)

| Key | ES | EN |
|---|---|---|
| `subnav.afiliados` | Plataforma de Afiliados | Affiliate Platform |
| `subnav.paginas` | PaginasDeLujo.com | PaginasDeLujo.com |
| `subnav.alquileres` | Alquileres & Publicidad | Rentals & Advertising |

---

## 2. New Page: `/servicios/afiliados`

**Files:**
- Create: `app/servicios/afiliados/page.tsx`
- Create: `app/servicios/afiliados/page.module.css`

### Page structure (top to bottom)

1. **Page header** — eyebrow (`servicios.affiliateEyebrow`), `<h1>` (`servicios.affiliateTitle`). Reuses existing i18n keys.
2. **Affiliate service block** — the full Service 1 content from `/servicios/page.tsx`: two body paragraphs, stats row (3.000+, 20, 146), contact CTA. Uses existing `servicios.*` keys.
3. **`<PartnerValue />`** — imported as-is, no changes to the component.

### Styling

Reuse the same CSS classes and structure as `/servicios/page.tsx` (`.serviceSection`, `.lightBg`, `.serviceCols`, etc.) — import from a shared CSS or duplicate the minimal needed styles into `page.module.css`. Since this is a static export and CSS Modules are file-scoped, duplicate only the styles needed for this page.

---

## 3. Changes to Existing `/servicios/page.tsx`

**File:** `app/servicios/page.tsx`

Two changes:

1. **Add `id` anchors** to the PaginasDeLujo and Rentals sections so dropdown anchor links land correctly:
   - `<section id="paginas" ...>` on the PaginasDeLujo section
   - `<section id="alquileres" ...>` on the Rentals section

2. **Add CTA to Affiliate section** — a `btn-outline` link at the bottom of Service 1's content block:
   ```
   {t('servicios.affiliateDetailCta')} → /servicios/afiliados
   ```

### New i18n key

| Key | ES | EN |
|---|---|---|
| `servicios.affiliateDetailCta` | Ver página completa | View full page |

---

## 4. Homepage Change

**File:** `app/page.tsx`

- Remove `import PartnerValue from '@/components/home/PartnerValue'`
- Remove `<PartnerValue />` from JSX

The `PartnerValue` component file itself is unchanged — it now lives exclusively on `/servicios/afiliados`.

---

## Out of Scope

- No changes to `PartnerValue` component internals
- No new pages for PaginasDeLujo or Rentals (dropdown links to `/servicios` anchors)
- No changes to `/servicios/page.module.css` beyond adding the `affiliateDetailCta` CTA styling if needed (existing `btn-outline` global class is sufficient)
