---
name: services-grid-copy-update
description: Update ServicesGrid section heading and all three card copies, adding an audience eyebrow label per card
metadata:
  type: project
---

# ServicesGrid Copy Update — Design Spec

## Summary

Replace the "Tres servicios, un solo estándar." heading and all card copy in the homepage `ServicesGrid` component. Each card gains a small audience-segment eyebrow label above the title. Both ES and EN i18n files are updated.

---

## Heading

| Key | ES | EN |
|---|---|---|
| `services.title` | `Una plataforma,` | `One platform,` |
| `services.titleEm` | `tres audiencias.` | `three audiences.` |

---

## Card Structure (new field order)

```
icon → eyebrow label → title → description → CTA
```

The eyebrow sits between the icon and the title: the icon anchors the card visually at the top, then the audience label provides context immediately before the title reads.

---

## Card Copy

### Card 1 — Affiliate

| Key | ES | EN |
|---|---|---|
| `services.s1Eyebrow` | Para marcas y redes afiliadas | For brands and affiliate networks |
| `services.s1Title` | Plataforma Editorial de Afiliados | Editorial Affiliate Platform |
| `services.s1Desc` | Publica contenido editorial de lujo en nuestra red de 3.000+ dominios exactos. Llega a consumidores hispanohablantes de alto poder adquisitivo en el momento de intención de compra. | Publish luxury editorial content across our network of 3,000+ exact-match domains. Reach high-net-worth Spanish-speaking consumers at the precise moment of purchase intent. |
| `services.s1Cta` | Conocer más *(unchanged)* | Learn more *(unchanged)* |

### Card 2 — PaginasDeLujo

| Key | ES | EN |
|---|---|---|
| `services.s2Eyebrow` | Para profesionales y negocios de lujo | For luxury professionals and businesses |
| `services.s2Title` | PaginasDeLujo.com *(unchanged)* | PaginasDeLujo.com *(unchanged)* |
| `services.s2Desc` | Tu consulta, spa, hotel, restaurante o boutique merece una identidad digital impecable. Una página profesional en un dominio de lujo exclusivo comunica calidad antes de que alguien lea una sola palabra. Reclama tu presencia y preséntate al mundo con el estándar que tus clientes esperan. | Your practice, spa, hotel, restaurant, or boutique deserves an impeccable digital identity. A professional page on an exclusive luxury domain communicates quality before anyone reads a word. Claim your presence and present yourself to the world at the standard your clients expect. |
| `services.s2Cta` | Explorar plataforma *(unchanged)* | Explore platform *(unchanged)* |

### Card 3 — Rentals

| Key | ES | EN |
|---|---|---|
| `services.s3Eyebrow` | Para marcas en campaña | For brands in campaign |
| `services.s3Title` | Alquileres y Publicidad Premium | Rentals & Premium Advertising |
| `services.s3Desc` | El dominio exacto que tu campaña necesita — disponible solo durante el tiempo que lo necesites. Visibilidad premium en el momento exacto que importa. | The exact domain your campaign needs — available only for as long as you need it. Premium visibility at precisely the moment that matters. |
| `services.s3Cta` | Ver opciones *(unchanged)* | View options *(unchanged)* |

---

## Component Changes

**`components/home/ServicesGrid.tsx`**
- Add `eyebrow: t('services.sNEyebrow')` field to each service object
- Render `<p className={styles.cardEyebrow}>{svc.eyebrow}</p>` between the icon div and the `<h3>`

**`components/home/ServicesGrid.module.css`** (or existing CSS)
- Add `.cardEyebrow` rule: small caps or uppercase, `--gold` color, tight tracking, small font size — consistent with other eyebrow labels in the codebase (`.s-eye` pattern)

**`lib/i18n/es.json`** — update `services` block with new keys and copy  
**`lib/i18n/en.json`** — update `services` block with new keys and copy

---

## Out of Scope

- Grid layout, column count, icons — unchanged
- CTAs — unchanged
- No changes to the `/servicios` page copy
