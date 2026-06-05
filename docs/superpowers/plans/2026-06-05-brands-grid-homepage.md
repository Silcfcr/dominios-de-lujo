# BrandsGrid Homepage Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the "Nuestras Marcas / Our Brands" section from the anillos HTML file into a translated React component and add it to the homepage between `<PartnerValue />` and the Manifesto `<HomeSectionLink />`.

**Architecture:** Static component with a 4-card logo grid; logos downloaded locally to `public/images/brands/`; all strings via `useI18n()`; plain `<img>` via `assetPath()` (not `next/image`) because logos need `height:34px; width:auto` which is incompatible with next/image's required dimension model.

**Tech Stack:** Next.js 16 static export, CSS Modules, `useI18n()` / `t()`, `assetPath()`, `RevealWrapper`

---

## File Map

| Action | File | Purpose |
|---|---|---|
| Create (4 files) | `public/images/brands/ddl-logo.svg` | Brand 1 logo |
| Create | `public/images/brands/brand-2-logo.png` | Brand 2 logo (needs CSS invert) |
| Create | `public/images/brands/brand-3-logo.png` | Brand 3 logo |
| Create | `public/images/brands/casasen-logo.png` | Brand 4 logo |
| Modify | `lib/i18n/es.json` | Add `brandsGrid.*` keys (Spanish) |
| Modify | `lib/i18n/en.json` | Add `brandsGrid.*` keys (English) |
| Create | `components/home/BrandsGrid.module.css` | Scoped styles |
| Create | `components/home/BrandsGrid.tsx` | Component |
| Modify | `app/page.tsx` | Wire component into homepage |

---

### Task 1: Download logo images

**Files:**
- Create: `public/images/brands/ddl-logo.svg`
- Create: `public/images/brands/brand-2-logo.png`
- Create: `public/images/brands/brand-3-logo.png`
- Create: `public/images/brands/casasen-logo.png`

- [ ] **Step 1: Create brands directory and download all 4 logos**

```bash
mkdir -p public/images/brands
curl -L "https://dominiosdelujo.com/wp-content/uploads/2026/03/logo-1.svg" -o public/images/brands/ddl-logo.svg
curl -L "https://dominiosdelujo.com/wp-content/uploads/2026/03/Logo_white-1.png" -o public/images/brands/brand-2-logo.png
curl -L "https://dominiosdelujo.com/wp-content/uploads/2026/03/Rectangle-952-1.png" -o public/images/brands/brand-3-logo.png
curl -L "https://dominiosdelujo.com/wp-content/uploads/2026/03/Casasen_logo-f.png" -o public/images/brands/casasen-logo.png
```

- [ ] **Step 2: Verify files downloaded correctly**

```bash
ls -lh public/images/brands/
```

Expected: 4 files, all non-zero size.

- [ ] **Step 3: Commit**

```bash
git add public/images/brands/
git commit -m "feat: download brand logos to public/images/brands"
```

---

### Task 2: Add i18n keys

**Files:**
- Modify: `lib/i18n/es.json`
- Modify: `lib/i18n/en.json`

- [ ] **Step 1: Add `brandsGrid` namespace to `lib/i18n/es.json`**

Add before the `"partnerValue"` key:

```json
  "brandsGrid": {
    "eyebrow": "Red de marcas",
    "heading": "Nuestras marcas",
    "sub": "Explora nuestras marcas exclusivas",
    "soon": "Próximamente",
    "b1Desc": "Una puerta de entrada curada al mundo del lujo.",
    "b2Desc": "Donde cada \"Sí\" comienza con la inspiración.",
    "b3Desc": "Un destino refinado para anillos de lujo atemporales.",
    "b4Desc": "Descubre hogares y alquileres en toda España."
  },
```

- [ ] **Step 2: Add `brandsGrid` namespace to `lib/i18n/en.json`**

Add before the `"partnerValue"` key:

```json
  "brandsGrid": {
    "eyebrow": "Brand network",
    "heading": "Our brands",
    "sub": "Explore our exclusive brands",
    "soon": "Coming soon",
    "b1Desc": "A curated gateway to the world of luxury.",
    "b2Desc": "Where every \"Yes\" begins with inspiration.",
    "b3Desc": "A refined destination for timeless luxury rings.",
    "b4Desc": "Discover homes and rentals across Spain."
  },
```

- [ ] **Step 3: Verify JSON is valid**

```bash
node -e "require('./lib/i18n/es.json'); require('./lib/i18n/en.json'); console.log('JSON valid')"
```

Expected output: `JSON valid`

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/es.json lib/i18n/en.json
git commit -m "feat: add brandsGrid i18n keys (es + en)"
```

---

### Task 3: Create CSS module

**Files:**
- Create: `components/home/BrandsGrid.module.css`

- [ ] **Step 1: Create the CSS module**

```css
/* components/home/BrandsGrid.module.css */
.section {
  background: var(--c);
}

.hd {
  text-align: center;
  margin-bottom: 48px;
}

.sub {
  font-family: var(--fb);
  font-size: 14px;
  color: var(--ink3);
  margin-top: 8px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--rule);
}

.card {
  background: var(--c);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px 32px;
  transition: background 0.2s;
}

.card:hover {
  background: var(--c2);
}

.logo {
  height: 34px;
  width: auto;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.card:hover .logo {
  opacity: 1;
}

.invert {
  filter: invert(1);
}

.desc {
  font-family: var(--fb);
  font-size: 12px;
  line-height: 1.65;
  color: var(--ink3);
  text-align: center;
}

.badge {
  font-family: var(--fb);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gold);
  border: 1px solid var(--gdim);
  padding: 3px 8px;
  border-radius: 2px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/BrandsGrid.module.css
git commit -m "feat: add BrandsGrid CSS module"
```

---

### Task 4: Create the component

**Files:**
- Create: `components/home/BrandsGrid.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import { assetPath } from '@/lib/assetPath';
import styles from './BrandsGrid.module.css';

type Brand = {
  src: string;
  alt: string;
  descKey: string;
  invert?: boolean;
};

export default function BrandsGrid() {
  const { t } = useI18n();

  const brands: Brand[] = [
    { src: '/images/brands/ddl-logo.svg',     alt: 'Dominios de Lujo', descKey: 'brandsGrid.b1Desc' },
    { src: '/images/brands/brand-2-logo.png', alt: '',                 descKey: 'brandsGrid.b2Desc', invert: true },
    { src: '/images/brands/brand-3-logo.png', alt: '',                 descKey: 'brandsGrid.b3Desc' },
    { src: '/images/brands/casasen-logo.png', alt: 'Casasen',          descKey: 'brandsGrid.b4Desc' },
  ];

  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className={styles.hd}>
        <p className="s-eye">{t('brandsGrid.eyebrow')}</p>
        <h2 className="s-title">{t('brandsGrid.heading')}</h2>
        <p className={styles.sub}>{t('brandsGrid.sub')}</p>
      </RevealWrapper>
      <RevealWrapper className={styles.grid}>
        {brands.map((brand, i) => (
          <div key={i} className={styles.card}>
            <img
              src={assetPath(brand.src)}
              alt={brand.alt}
              className={brand.invert ? `${styles.logo} ${styles.invert}` : styles.logo}
            />
            <p className={styles.desc}>{t(brand.descKey)}</p>
            <span className={styles.badge}>{t('brandsGrid.soon')}</span>
          </div>
        ))}
      </RevealWrapper>
    </section>
  );
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home/BrandsGrid.tsx
git commit -m "feat: add BrandsGrid component"
```

---

### Task 5: Wire into homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update `app/page.tsx`**

Replace the entire file content with:

```tsx
import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import CategoryTeaser from '@/components/home/CategoryTeaser';
import HomeSectionLink from '@/components/home/HomeSectionLink';
import ServicesGrid from '@/components/home/ServicesGrid';
import PartnerValue from '@/components/home/PartnerValue';
import BrandsGrid from '@/components/home/BrandsGrid';
import CollaborateTeaser from '@/components/home/CollaborateTeaser';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <CategoryTeaser />
      <HomeSectionLink labelKey="home.lujototalLink" href="/nosotros#lujototal" imageSrc="/images/lujo-total.webp" imageAlt="LujoTotal™" />
      <ServicesGrid />
      <PartnerValue />
      <BrandsGrid />
      <HomeSectionLink labelKey="home.manifestoLink" href="/nosotros#manifiesto" />
      <CollaborateTeaser />
    </>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Start dev server and verify visually**

```bash
npm run dev
```

Open http://localhost:3000 and scroll past PartnerValue. Confirm:
- "Red de marcas" eyebrow and "Nuestras marcas" heading appear
- 4 brand logo cards render in a 4-column grid
- Brand 2 logo appears inverted (light on light background without inversion would be invisible)
- "Próximamente" badge shows on each card
- Cards have a hover background change
- Toggle language to English — all strings switch correctly

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add BrandsGrid to homepage between PartnerValue and Manifesto link"
```
