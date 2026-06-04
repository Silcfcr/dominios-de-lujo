---
name: homepage-lightening
description: Move Manifesto and LujoTotal to dedicated pages; replace with slim link rows; remove PaginasSpotlight from homepage
metadata:
  type: project
---

# Homepage Lightening — Design Spec

## Goal

Make the homepage feel lighter and more corporate by moving three heavy sections off it. Manifesto and LujoTotal become dedicated pages, each reachable via a slim inline link row in the homepage flow. PaginasSpotlight is removed with no replacement (the servicios page already has a full CTA to paginasdelujo.com).

---

## New Pages

### `app/manifiesto/page.tsx`
- Server component (no interactivity needed at page level)
- Imports and renders `<Manifesto />` only
- Nav + Footer provided automatically by `app/layout.tsx`
- No additional header or wrapper needed

### `app/lujototal/page.tsx`
- Server component
- Imports and renders `<LujoTotal />` only
- Nav + Footer provided automatically by `app/layout.tsx`
- No additional header or wrapper needed

---

## New Component: HomeSectionLink

**Files:**
- `components/home/HomeSectionLink.tsx`
- `components/home/HomeSectionLink.module.css`

**Props:**
```ts
{ label: string; href: string }
```

**Rendered output:** A slim horizontal section in the page flow — left-aligned text link with a gold arrow, using the existing body font (`var(--fb)`). Uses `<Link>` from `next/link` for internal navigation.

**Visual style:**
- Section padding: `40px 64px` (matches the horizontal rhythm of adjacent sections)
- Link text: `var(--fb)`, 14px, letter-spacing 0.1em, uppercase, `var(--ink2)` colour
- Arrow (→) in `var(--gold)`
- Underline on hover
- No background, no border — just the text in the flow

**Mobile (≤ 900px):** padding reduces to `32px 24px`

---

## Homepage Changes (`app/page.tsx`)

### Sections removed
- `<Manifesto />` → replaced with `<HomeSectionLink href="/manifiesto" label={t('home.manifestoLink')} />`
- `<LujoTotal />` → replaced with `<HomeSectionLink href="/lujototal" label={t('home.lujototalLink')} />`
- `<PaginasSpotlight />` → removed entirely (no replacement)

### Resulting homepage section order
```
<Hero />
<Ticker />
<CategoryTeaser />
<HomeSectionLink href="/manifiesto" … />
<ServicesGrid />
<PartnerValue />
<HomeSectionLink href="/lujototal" … />
<CollaborateTeaser />
```

---

## i18n Additions

### `lib/i18n/en.json` — add `home` object:
```json
"home": {
  "manifestoLink": "Learn our Luxury Manifesto →",
  "lujototalLink": "About LujoTotal™ Certification →"
}
```

### `lib/i18n/es.json` — add `home` object:
```json
"home": {
  "manifestoLink": "Lee nuestro Manifiesto del Lujo →",
  "lujototalLink": "Sobre la Certificación LujoTotal™ →"
}
```

---

## Servicios Page

No changes required. The PaginasDeLujo section in `app/servicios/page.tsx` already contains a `btn-gold` CTA linking to `https://paginasdelujo.com`.

---

## Out of Scope

- No changes to the Manifesto or LujoTotal component internals
- No nav links added for the new pages (they are discoverable via the homepage links)
- No changes to any other page
