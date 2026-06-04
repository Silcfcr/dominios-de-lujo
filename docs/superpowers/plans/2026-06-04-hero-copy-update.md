# Hero Copy Update — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hero section headline, remove the eyebrow label, add a sub-line + KVP paragraph, and remove the BrandStrip ("three pillars") block from the homepage.

**Architecture:** All copy lives in i18n JSON files; the Hero component reads from them. The eyebrow element is removed from the JSX entirely. A second paragraph (`kvp`) is added after the existing `sub` paragraph. BrandStrip is removed from `app/page.tsx` (file kept, just unused).

**Tech Stack:** Next.js 16 static export, React, CSS Modules, flat i18n JSON

---

## File Map

| File | Change |
|------|--------|
| `lib/i18n/en.json` | Remove `hero.eyebrow`, update headline keys, update `hero.sub`, add `hero.kvp` |
| `lib/i18n/es.json` | Same as above in Spanish |
| `components/home/Hero.tsx` | Remove eyebrow element, add `.kvp` paragraph |
| `components/home/Hero.module.css` | Remove `.eyebrow` rule, adjust `.sub` margin, add `.kvp` rule |
| `app/page.tsx` | Remove BrandStrip import and JSX element |

---

## Task 1: Update English i18n hero object

**Files:**
- Modify: `lib/i18n/en.json:11-20`

- [ ] **Step 1: Replace the `hero` object in `lib/i18n/en.json`**

Find this block (lines 11–20):
```json
  "hero": {
    "eyebrow": "Luxury editorial network",
    "h1a": "The Spanish-language",
    "h1b": "editorial universe of",
    "h1em": "luxury domains.",
    "sub": "3,000+ exact-match premium domains — fashion, real estate, travel, jewellery and beyond — connecting luxury brands with high-net-worth audiences across Spain and Latin America.",
    "cta1": "Explore domains",
    "cta2": "Our services",
    "badgeTxt": "luxury domains"
  },
```

Replace with:
```json
  "hero": {
    "h1a": "The Spanish-language luxury editorial affiliate platform —",
    "h1b": "powered by 3,000+ premium exact-match domains",
    "h1em": "unified under LujoTotal™.",
    "sub": "Where every desire has its place — fashion, real estate, travel, jewellery, and beyond.",
    "kvp": "We build the Spanish-language luxury internet — unifying 650 million speakers across 24 fragmented markets through premium domains, structured affiliate ecosystems, and editorial authority. We connect luxury brands with high-net-worth audiences across Spain and Latin America.",
    "cta1": "Explore domains",
    "cta2": "Our services",
    "badgeTxt": "luxury domains"
  },
```

- [ ] **Step 2: Commit**

```bash
git add lib/i18n/en.json
git commit -m "copy: update hero EN — new headline, sub-line, KVP; remove eyebrow"
```

---

## Task 2: Update Spanish i18n hero object

**Files:**
- Modify: `lib/i18n/es.json:11-20`

- [ ] **Step 1: Replace the `hero` object in `lib/i18n/es.json`**

Find this block (lines 11–20):
```json
  "hero": {
    "eyebrow": "Red editorial de lujo",
    "h1a": "El universo editorial",
    "h1b": "en español de los",
    "h1em": "dominios de lujo.",
    "sub": "Más de 3.000 dominios exactos premium — moda, propiedades, viajes, joyería y mucho más — conectando marcas de lujo con audiencias de alto poder adquisitivo en España y Latinoamérica.",
    "cta1": "Explorar dominios",
    "cta2": "Nuestros servicios",
    "badgeTxt": "dominios de lujo"
  },
```

Replace with:
```json
  "hero": {
    "h1a": "La plataforma editorial afiliada de lujo en español —",
    "h1b": "impulsada por más de 3.000 dominios exactos premium",
    "h1em": "unificada bajo LujoTotal™.",
    "sub": "Donde cada deseo tiene su lugar — moda, propiedades de lujo, viajes, joyería y mucho más.",
    "kvp": "Construimos el internet de lujo en español — unificando 650 millones de hablantes en 24 mercados fragmentados a través de dominios premium, ecosistemas de afiliación estructurados y autoridad editorial. Conectamos marcas de lujo con audiencias de alto poder adquisitivo en España y Latinoamérica.",
    "cta1": "Explorar dominios",
    "cta2": "Nuestros servicios",
    "badgeTxt": "dominios de lujo"
  },
```

- [ ] **Step 2: Commit**

```bash
git add lib/i18n/es.json
git commit -m "copy: update hero ES — new headline, sub-line, KVP; remove eyebrow"
```

---

## Task 3: Update Hero component and styles

**Files:**
- Modify: `components/home/Hero.tsx`
- Modify: `components/home/Hero.module.css`

- [ ] **Step 1: Remove eyebrow element from Hero.tsx**

In `components/home/Hero.tsx`, delete this line (line 33):
```tsx
        <p className={styles.eyebrow}>{t('hero.eyebrow')}</p>
```

The `<div className={styles.left}>` should now start directly with the `<h1>`:
```tsx
      <div className={styles.left}>
        <h1 className={styles.h1}>
          {t('hero.h1a')}<br />
          {t('hero.h1b')}<br />
          <em>{t('hero.h1em')}</em>
        </h1>
        <div className={styles.rule} />
        <p className={styles.sub}>{t('hero.sub')}</p>
        <div className={styles.ctas}>
```

- [ ] **Step 2: Add kvp paragraph to Hero.tsx**

After `<p className={styles.sub}>{t('hero.sub')}</p>`, insert:
```tsx
        <p className={styles.kvp}>{t('hero.kvp')}</p>
```

The `.left` div should now read:
```tsx
      <div className={styles.left}>
        <h1 className={styles.h1}>
          {t('hero.h1a')}<br />
          {t('hero.h1b')}<br />
          <em>{t('hero.h1em')}</em>
        </h1>
        <div className={styles.rule} />
        <p className={styles.sub}>{t('hero.sub')}</p>
        <p className={styles.kvp}>{t('hero.kvp')}</p>
        <div className={styles.ctas}>
          <Link href="/dominios" className="btn-dark">{t('hero.cta1')}</Link>
          <Link href="/servicios" className="btn-outline">{t('hero.cta2')}</Link>
        </div>
      </div>
```

- [ ] **Step 3: Remove .eyebrow rule from Hero.module.css**

Delete the entire `.eyebrow` block (lines 15–23):
```css
.eyebrow {
  font-family: var(--fb);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 28px;
}
```

- [ ] **Step 4: Adjust .sub margin and add .kvp in Hero.module.css**

Change `.sub`'s `margin-bottom` from `40px` to `20px`:
```css
.sub {
  font-family: var(--fb);
  font-size: 15px;
  line-height: 1.85;
  color: var(--ink2);
  max-width: 420px;
  margin-bottom: 20px;
}
```

Then add the `.kvp` rule immediately after `.sub`:
```css
.kvp {
  font-family: var(--fb);
  font-size: 15px;
  line-height: 1.85;
  color: var(--ink2);
  max-width: 420px;
  margin-bottom: 40px;
}
```

- [ ] **Step 5: Commit**

```bash
git add components/home/Hero.tsx components/home/Hero.module.css
git commit -m "feat: update hero component — remove eyebrow, add kvp paragraph"
```

---

## Task 4: Remove BrandStrip from homepage, verify, and finish

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Remove BrandStrip import from app/page.tsx**

Delete line 3:
```tsx
import BrandStrip from '@/components/home/BrandStrip';
```

- [ ] **Step 2: Remove BrandStrip element from app/page.tsx**

Delete `<BrandStrip />` from the JSX. The homepage section order becomes:
```tsx
export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <CategoryTeaser />
      <Manifesto />
      <ServicesGrid />
      <PartnerValue />
      <LujoTotal />
      <PaginasSpotlight />
      <CollaborateTeaser />
    </>
  );
}
```

- [ ] **Step 3: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors. If there are errors unrelated to this change, note them but do not fix them in this task.

- [ ] **Step 4: Run dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000` and confirm:
- No eyebrow label above the h1
- New three-line headline displays correctly, third line italic gold
- Gold rule visible below h1
- Sub-line paragraph ("Where every desire has its place…" / "Donde cada deseo tiene su lugar…") appears below rule
- KVP paragraph appears below sub-line
- CTAs immediately follow the KVP
- BrandStrip section ("One platform, three pillars") is gone from the page
- Toggle to English, verify English copy renders correctly
- Slideshow, badge, and all other sections unaffected

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: remove BrandStrip from homepage — content covered by updated hero"
```
