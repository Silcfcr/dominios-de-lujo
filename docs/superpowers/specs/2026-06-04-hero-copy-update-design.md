---
name: hero-copy-update
description: Update hero section copy with new headline, sub-line, and KVP — remove eyebrow and BrandStrip
metadata:
  type: project
---

# Hero Copy Update — Design Spec

## Summary

Update the homepage hero with new client-approved copy. Remove the eyebrow label, restructure the headline into three display lines (last in italic gold), replace the sub paragraph with an editorial sub-line + a key value proposition paragraph, and remove the "One platform, three pillars" BrandStrip section from the homepage.

---

## Changes

### 1. Hero structure after update

```
h1  Line 1 (roman)
    Line 2 (roman)
    Line 3 (italic, gold)
──  gold rule (unchanged)
p   Editorial sub-line
p   Key value proposition
[Explore domains]  [Our services]   ← CTAs unchanged
```

The eyebrow (`<p className={styles.eyebrow}>`) is removed entirely. The badge, image slideshow, and CTAs are untouched.

---

### 2. i18n copy

#### English (`lib/i18n/en.json`)

| Key | Value |
|-----|-------|
| `hero.eyebrow` | **removed** |
| `hero.h1a` | `The Spanish-language luxury editorial affiliate platform —` |
| `hero.h1b` | `powered by 3,000+ premium exact-match domains` |
| `hero.h1em` | `unified under LujoTotal™.` |
| `hero.sub` | `Where every desire has its place — fashion, real estate, travel, jewellery, and beyond.` |
| `hero.kvp` | `We build the Spanish-language luxury internet — unifying 650 million speakers across 24 fragmented markets through premium domains, structured affiliate ecosystems, and editorial authority. We connect luxury brands with high-net-worth audiences across Spain and Latin America.` |
| `hero.cta1` | `Explore domains` *(unchanged)* |
| `hero.cta2` | `Our services` *(unchanged)* |
| `hero.badgeTxt` | `luxury domains` *(unchanged)* |

#### Spanish (`lib/i18n/es.json`)

| Key | Value |
|-----|-------|
| `hero.eyebrow` | **removed** |
| `hero.h1a` | `La plataforma editorial afiliada de lujo en español —` |
| `hero.h1b` | `impulsada por más de 3.000 dominios exactos premium` |
| `hero.h1em` | `unificada bajo LujoTotal™.` |
| `hero.sub` | `Donde cada deseo tiene su lugar — moda, propiedades de lujo, viajes, joyería y mucho más.` |
| `hero.kvp` | `Construimos el internet de lujo en español — unificando 650 millones de hablantes en 24 mercados fragmentados a través de dominios premium, ecosistemas de afiliación estructurados y autoridad editorial. Conectamos marcas de lujo con audiencias de alto poder adquisitivo en España y Latinoamérica.` |
| `hero.cta1` | `Explorar dominios` *(unchanged)* |
| `hero.cta2` | `Nuestros servicios` *(unchanged)* |
| `hero.badgeTxt` | `dominios de lujo` *(unchanged)* |

---

### 3. Component changes

#### `components/home/Hero.tsx`
- Delete `<p className={styles.eyebrow}>{t('hero.eyebrow')}</p>`
- Add `<p className={styles.kvp}>{t('hero.kvp')}</p>` after the existing `.sub` paragraph

#### `components/home/Hero.module.css`
- Delete the `.eyebrow` rule block
- Change `.sub { margin-bottom: 40px }` to `margin-bottom: 20px` (it no longer abuts the CTAs)
- Add `.kvp` styled like `.sub` (same font, size, line-height, color) with `margin-bottom: 40px` to space it from the CTAs

#### `app/page.tsx`
- Remove `import BrandStrip from '@/components/home/BrandStrip'`
- Remove `<BrandStrip />` from the JSX

The `BrandStrip.tsx` and `BrandStrip.module.css` files are **not deleted** — non-destructive removal from the page only.

---

## Out of scope

- No changes to any other page or component
- No changes to the badge, slideshow, CTAs, or `LujoTotal` section
- No changes to routing, build config, or styles outside Hero.module.css
