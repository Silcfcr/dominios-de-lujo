# Copy Update Gaps — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the three remaining gaps between the live site and the approved copy document: fix hero headline keys, add FAQ to homepage, and render the LujoTotal Certification Levels section.

**Architecture:** Pure i18n and JSX changes — no new files, no new CSS. The Niveles CSS already exists in `LujoTotalDetail.module.css`. The BrandsFaq component already exists with correct copy. Only two i18n JSON files and two TSX files need touching.

**Tech Stack:** Next.js 16 static export, CSS Modules, i18n via `useI18n()` hook with flat JSON files at `lib/i18n/es.json` and `lib/i18n/en.json`

## Global Constraints

- Every visible string must be added to BOTH `lib/i18n/es.json` AND `lib/i18n/en.json` — never ship a key in one file without the other
- No hardcoded Spanish or English strings in JSX — all visible text via `t()` calls
- No inline styles or Tailwind — CSS Modules only
- Never use em dashes (--) in any text content, copy, or comments
- Build command: `npm run build` — must exit 0
- TypeScript check: `npx tsc --noEmit` — must pass

---

### Task 1: Fix hero headline copy in both languages

The homepage hero renders three lines in its h1. Lines 2 and 3 use keys `hero.h1b` and `hero.h1em`. These keys currently contain an old stats-format headline that does not match the approved copy.

**Files:**
- Modify: `lib/i18n/es.json`
- Modify: `lib/i18n/en.json`

**Interfaces:**
- Consumes: `hero.h1b` and `hero.h1em`, rendered in `components/home/Hero.tsx` lines 35-37:
  ```tsx
  {t('hero.h1a')}<br />
  {t('hero.h1b')}<br />
  <em>{t('hero.h1em')}</em>
  ```
- Produces: headline reads as a continuous three-part sentence in both languages

- [ ] **Step 1: Update `lib/i18n/es.json` — hero.h1b and hero.h1em**

Open `lib/i18n/es.json`. Find the `"hero"` namespace (starts around line 30). Replace the two keys:

```json
"h1b": "impulsada por más de 4.000 dominios exactos premium",
"h1em": "unificada bajo LujoTotal™.",
```

The surrounding context should look like this after the edit:

```json
"hero": {
  "h1a": "La plataforma de marketing de afiliados de lujo en español.",
  "h1b": "impulsada por más de 4.000 dominios exactos premium",
  "h1em": "unificada bajo LujoTotal™.",
  "eyebrow": "Donde cada deseo tiene su lugar",
  "kvp": "Invitamos a las marcas de lujo a formar parte del ecosistema que define el lujo en español.",
  ...
```

- [ ] **Step 2: Update `lib/i18n/en.json` — hero.h1b and hero.h1em**

Open `lib/i18n/en.json`. Find the `"hero"` namespace (starts around line 30). Replace the two keys:

```json
"h1b": "powered by 4,000+ premium exact-match domains",
"h1em": "unified under LujoTotal™.",
```

The surrounding context should look like this after the edit:

```json
"hero": {
  "h1a": "The Spanish-language luxury affiliate marketing platform.",
  "h1b": "powered by 4,000+ premium exact-match domains",
  "h1em": "unified under LujoTotal™.",
  "eyebrow": "Where every desire has its place",
  "kvp": "We invite luxury brands to establish their presence within the Spanish-speaking luxury market.",
  ...
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: Exit 0, "Exported N static pages" with no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/es.json lib/i18n/en.json
git commit -m "fix: update hero headline copy to match approved document"
```

---

### Task 2: Add FAQ section to homepage

The `BrandsFaq` component already exists at `components/brands/BrandsFaq.tsx` with the correct approved copy (in the `brandsFaq` i18n namespace). It renders on the brands page. The homepage needs the same FAQ section inserted between `ConfianzaCredibilidad` and `OurBrands`.

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `BrandsFaq` from `@/components/brands/BrandsFaq` — no props required
- Produces: FAQ section on the homepage in the correct position

- [ ] **Step 1: Add the BrandsFaq import to `app/page.tsx`**

Open `app/page.tsx`. The current imports are (lines 1-11):

```tsx
import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import BrandStrip from '@/components/home/BrandStrip';
import CategoryTeaser from '@/components/home/CategoryTeaser';
// import HomeSectionLink from '@/components/home/HomeSectionLink';
// import ServicesGrid from '@/components/home/ServicesGrid';
// import BrandsGrid from '@/components/home/BrandsGrid';
import PorQueNosotros from '@/components/home/PorQueNosotros';
import AffiliateEditorial from '@/components/home/AffiliateEditorial';
import ConfianzaCredibilidad from '@/components/home/ConfianzaCredibilidad';
import CollaborateTeaser from '@/components/home/CollaborateTeaser';
import OurBrands from '@/components/home/OurBrands';
```

Add `BrandsFaq` on a new line after the `ConfianzaCredibilidad` import:

```tsx
import ConfianzaCredibilidad from '@/components/home/ConfianzaCredibilidad';
import BrandsFaq from '@/components/brands/BrandsFaq';
import CollaborateTeaser from '@/components/home/CollaborateTeaser';
import OurBrands from '@/components/home/OurBrands';
```

- [ ] **Step 2: Add `<BrandsFaq />` to the homepage JSX**

In the same file, find the return JSX. Currently it reads (lines 14-28 approximately):

```tsx
return (
  <>
    <Hero />
    <Ticker />
    <BrandStrip />
    <CategoryTeaser />
    {/* ... */}
    <PorQueNosotros />
    <AffiliateEditorial />
    <ConfianzaCredibilidad />
    <OurBrands />
    <CollaborateTeaser />
    {/* ... */}
  </>
);
```

Insert `<BrandsFaq />` between `<ConfianzaCredibilidad />` and `<OurBrands />`:

```tsx
<ConfianzaCredibilidad />
<BrandsFaq />
<OurBrands />
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: Exit 0, no errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add FAQ section to homepage"
```

---

### Task 3: Add Certification Levels section to LujoTotal page

The CSS for the Niveles section already exists in `components/home/LujoTotalDetail.module.css` — classes `.levels`, `.levelsGrid`, `.levelCard`, `.levelFeatured`, `.levelLabel`, `.levelTitle`, `.levelDesc` are defined and responsive. Only the i18n keys and the JSX block are missing.

The section should appear between the 7-principle grid and the dark CTA section.

**Files:**
- Modify: `lib/i18n/es.json` (add 9 keys to `lujototalPage`)
- Modify: `lib/i18n/en.json` (add 9 keys to `lujototalPage`)
- Modify: `components/home/LujoTotalDetail.tsx` (insert levels section between principles and CTA)

**Interfaces:**
- Consumes: new keys `lujototalPage.levelsEyebrow`, `levelsTitle`, `levelsTitleEm`, `level1Label`, `level1Title`, `level1Desc`, `level2Label`, `level2Title`, `level2Desc`
- Produces: a two-card certification levels section between the principles grid and the dark CTA

- [ ] **Step 1: Add i18n keys to `lib/i18n/es.json`**

Open `lib/i18n/es.json`. Find the `"lujototalPage"` namespace. It currently ends with `"disclosure2": "..."`. Add these 9 keys before the closing `}` of the namespace:

```json
"levelsEyebrow": "Niveles de certificación",
"levelsTitle": "Dos designaciones,",
"levelsTitleEm": "un mismo estándar.",
"level1Label": "Designación intermedia",
"level1Title": "LujoTotal Verified™",
"level1Desc": "Otorgada a negocios que han completado satisfactoriamente la verificación empresarial, la revisión de reputación y los requisitos de protección al consumidor, pero que aún no han concluido el proceso completo de certificación.",
"level2Label": "Certificación completa",
"level2Title": "LujoTotal Certified™",
"level2Desc": "Otorgada a negocios que superan todos los estándares aplicables: los Estándares Core, más los Estándares de Producto o Servicio, y los Estándares de Afiliados donde corresponda. Ningún estándar requerido puede quedar sin superar."
```

The `lujototalPage` namespace after this change should end like:

```json
"lujototalPage": {
  ...
  "disclosure": "...",
  "disclosure2": "...",
  "levelsEyebrow": "Niveles de certificación",
  "levelsTitle": "Dos designaciones,",
  "levelsTitleEm": "un mismo estándar.",
  "level1Label": "Designación intermedia",
  "level1Title": "LujoTotal Verified™",
  "level1Desc": "Otorgada a negocios que han completado satisfactoriamente la verificación empresarial, la revisión de reputación y los requisitos de protección al consumidor, pero que aún no han concluido el proceso completo de certificación.",
  "level2Label": "Certificación completa",
  "level2Title": "LujoTotal Certified™",
  "level2Desc": "Otorgada a negocios que superan todos los estándares aplicables: los Estándares Core, más los Estándares de Producto o Servicio, y los Estándares de Afiliados donde corresponda. Ningún estándar requerido puede quedar sin superar."
},
```

- [ ] **Step 2: Add i18n keys to `lib/i18n/en.json`**

Open `lib/i18n/en.json`. Find the `"lujototalPage"` namespace. Add the same 9 keys before the closing `}`:

```json
"levelsEyebrow": "Certification levels",
"levelsTitle": "Two designations,",
"levelsTitleEm": "one standard.",
"level1Label": "Intermediate designation",
"level1Title": "LujoTotal Verified™",
"level1Desc": "Awarded to businesses that have successfully completed business verification, reputation review, and customer protection requirements, but have not yet completed the full certification process.",
"level2Label": "Full certification",
"level2Title": "LujoTotal Certified™",
"level2Desc": "Awarded to businesses that pass all applicable standards — Core Standards, plus Product or Service Standards, and Affiliate Standards where applicable. No required standard may be left unmet."
```

- [ ] **Step 3: Add the levels section JSX to `LujoTotalDetail.tsx`**

Open `components/home/LujoTotalDetail.tsx`. The component currently returns:

```tsx
<>
  {/* Principles */}
  <section className={styles.principles}>
    ...
  </section>

  {/* CTA */}
  <section className={styles.cta}>
    ...
  </section>

  {/* Disclosure */}
  <div className={styles.disclosure}>
    ...
  </div>
</>
```

Insert the following JSX block between the closing `</section>` of Principles and the `{/* CTA */}` comment:

```tsx
{/* Levels */}
<section className={styles.levels}>
  <RevealWrapper className={styles.inner}>
    <div className={styles.sectionHead}>
      <p className="s-eye">{t('lujototalPage.levelsEyebrow')}</p>
      <h2 className={`s-title ${styles.sectionTitle}`}>
        {t('lujototalPage.levelsTitle')} <em>{t('lujototalPage.levelsTitleEm')}</em>
      </h2>
    </div>
    <div className={styles.levelsGrid}>
      <div className={styles.levelCard}>
        <span className={styles.levelLabel}>{t('lujototalPage.level1Label')}</span>
        <h3 className={styles.levelTitle}>{t('lujototalPage.level1Title')}</h3>
        <p className={styles.levelDesc}>{t('lujototalPage.level1Desc')}</p>
      </div>
      <div className={`${styles.levelCard} ${styles.levelFeatured}`}>
        <span className={styles.levelLabel}>{t('lujototalPage.level2Label')}</span>
        <h3 className={styles.levelTitle}>{t('lujototalPage.level2Title')}</h3>
        <p className={styles.levelDesc}>{t('lujototalPage.level2Desc')}</p>
      </div>
    </div>
  </RevealWrapper>
</section>
```

The complete component structure after the edit:

```tsx
<>
  {/* Principles */}
  <section className={styles.principles}>
    ...
  </section>

  {/* Levels */}
  <section className={styles.levels}>
    <RevealWrapper className={styles.inner}>
      <div className={styles.sectionHead}>
        <p className="s-eye">{t('lujototalPage.levelsEyebrow')}</p>
        <h2 className={`s-title ${styles.sectionTitle}`}>
          {t('lujototalPage.levelsTitle')} <em>{t('lujototalPage.levelsTitleEm')}</em>
        </h2>
      </div>
      <div className={styles.levelsGrid}>
        <div className={styles.levelCard}>
          <span className={styles.levelLabel}>{t('lujototalPage.level1Label')}</span>
          <h3 className={styles.levelTitle}>{t('lujototalPage.level1Title')}</h3>
          <p className={styles.levelDesc}>{t('lujototalPage.level1Desc')}</p>
        </div>
        <div className={`${styles.levelCard} ${styles.levelFeatured}`}>
          <span className={styles.levelLabel}>{t('lujototalPage.level2Label')}</span>
          <h3 className={styles.levelTitle}>{t('lujototalPage.level2Title')}</h3>
          <p className={styles.levelDesc}>{t('lujototalPage.level2Desc')}</p>
        </div>
      </div>
    </RevealWrapper>
  </section>

  {/* CTA */}
  <section className={styles.cta}>
    ...
  </section>

  {/* Disclosure */}
  <div className={styles.disclosure}>
    ...
  </div>
</>
```

- [ ] **Step 4: Verify build and TypeScript**

```bash
npm run build
npx tsc --noEmit
```

Expected: Both exit 0, no errors.

- [ ] **Step 5: Commit**

```bash
git add lib/i18n/es.json lib/i18n/en.json components/home/LujoTotalDetail.tsx
git commit -m "feat: add certification levels section to LujoTotal page"
```
