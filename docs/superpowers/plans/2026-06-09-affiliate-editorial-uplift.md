# AffiliateEditorial UI Uplift Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add visual hierarchy (eyebrow, heading, gold decorative rule, CTA button) to the flat `AffiliateEditorial` homepage section, linking to `/servicios/afiliados`.

**Architecture:** All changes are self-contained in one component (`AffiliateEditorial.tsx`), its CSS module, and both i18n JSON files. No new components, no new routes, no data layer changes. TypeScript type-check (`npx tsc --noEmit`) is used as the verification step — the project has no test suite.

**Tech Stack:** Next.js 16 static export, React, CSS Modules, i18n flat JSON (`lib/i18n/`), global utility classes (`s-eye`, `s-title`, `btn-gold`)

---

## File Map

| File | Change |
|------|--------|
| `lib/i18n/es.json` | Add `eyebrow`, `heading`, `cta` keys to `affiliateIntro` |
| `lib/i18n/en.json` | Add `eyebrow`, `heading`, `cta` keys to `affiliateIntro` |
| `components/home/AffiliateEditorial.module.css` | Add `.rule` and `.cta` classes |
| `components/home/AffiliateEditorial.tsx` | Add eyebrow, heading, rule element, and CTA button |

---

## Task 1: Add i18n keys

**Files:**
- Modify: `lib/i18n/es.json:283-293`
- Modify: `lib/i18n/en.json:283-293`

- [ ] **Step 1: Add keys to `lib/i18n/es.json`**

Find the `affiliateIntro` block (currently lines 283–293) and add three new keys so it reads:

```json
"affiliateIntro": {
  "eyebrow": "Programa de Afiliados",
  "heading": "Conecta tu marca con el lujo digital",
  "cta": "Conoce el programa →",
  "p1a": "Contamos con una ",
  "p1b": "plataforma exclusiva de marketing de afiliados",
  "p1c": ", diseñada para conectar marcas, emprendedores y creadores con un ecosistema de dominios premium.",
  "p2a": "Nuestro sistema combina ",
  "p2b": "automatización inteligente",
  "p2c": ", estándares editoriales de lujo y una infraestructura optimizada para escalar campañas de forma rápida, clara y eficiente.",
  "p3a": "El resultado es simple: ",
  "p3b": "más visibilidad, más autoridad y más conversiones",
  "p3c": ", todo dentro de un entorno digital elegante y profesional."
},
```

- [ ] **Step 2: Add keys to `lib/i18n/en.json`**

Find the `affiliateIntro` block (currently lines 283–293) and add three new keys so it reads:

```json
"affiliateIntro": {
  "eyebrow": "Affiliate Programme",
  "heading": "Connect your brand to digital luxury",
  "cta": "Explore the programme →",
  "p1a": "We have an ",
  "p1b": "exclusive affiliate marketing platform",
  "p1c": ", designed to connect brands, entrepreneurs, and creators with an ecosystem of premium domains.",
  "p2a": "Our system combines ",
  "p2b": "intelligent automation",
  "p2c": ", luxury editorial standards, and an optimised infrastructure to scale campaigns quickly, clearly, and efficiently.",
  "p3a": "The result is simple: ",
  "p3b": "more visibility, more authority, and more conversions",
  "p3c": " — all within an elegant and professional digital environment."
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
git commit -m "feat: add eyebrow, heading, and CTA keys to affiliateIntro i18n"
```

---

## Task 2: Add CSS classes

**Files:**
- Modify: `components/home/AffiliateEditorial.module.css`

- [ ] **Step 1: Add `.rule` and `.cta` to the CSS module**

Append to `components/home/AffiliateEditorial.module.css`:

```css
.rule {
  width: 60px;
  height: 2px;
  background: var(--gold);
  border: none;
  margin: 24px auto 32px;
  display: block;
}

.cta {
  margin-top: 36px;
  text-align: center;
}
```

- [ ] **Step 2: Verify type-check passes**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home/AffiliateEditorial.module.css
git commit -m "feat: add rule and cta CSS classes to AffiliateEditorial"
```

---

## Task 3: Update component markup

**Files:**
- Modify: `components/home/AffiliateEditorial.tsx`

The current component renders a `<section>` with a `<RevealWrapper>` containing three `<p>` elements. Add the eyebrow, heading, rule, and CTA around/below the existing paragraphs.

- [ ] **Step 1: Add `Link` import and update JSX**

Replace the entire contents of `components/home/AffiliateEditorial.tsx` with:

```tsx
'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './AffiliateEditorial.module.css';

export default function AffiliateEditorial() {
  const { t } = useI18n();

  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className={styles.inner}>
        <p className="s-eye">{t('affiliateIntro.eyebrow')}</p>
        <h2 className="s-title">{t('affiliateIntro.heading')}</h2>
        <hr className={styles.rule} />
        <p className={styles.para}>
          {t('affiliateIntro.p1a')}<strong>{t('affiliateIntro.p1b')}</strong>{t('affiliateIntro.p1c')}
        </p>
        <p className={styles.para}>
          {t('affiliateIntro.p2a')}<strong>{t('affiliateIntro.p2b')}</strong>{t('affiliateIntro.p2c')}
        </p>
        <p className={styles.para}>
          {t('affiliateIntro.p3a')}<strong>{t('affiliateIntro.p3b')}</strong>{t('affiliateIntro.p3c')}
        </p>
        <div className={styles.cta}>
          <Link href="/servicios/afiliados" className="btn-gold">
            {t('affiliateIntro.cta')}
          </Link>
        </div>
      </RevealWrapper>
    </section>
  );
}
```

- [ ] **Step 2: Verify type-check passes**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Run dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000` in a browser. Scroll to the affiliate section and confirm:
- Gold eyebrow label appears ("Programa de Afiliados" in Spanish)
- Serif heading appears ("Conecta tu marca con el lujo digital")
- Short gold horizontal rule appears below the heading
- Three body paragraphs with bold highlights are unchanged
- Gold CTA button appears at the bottom ("Conoce el programa →")
- Clicking the CTA navigates to `/servicios/afiliados`
- Toggle to English and verify all text switches correctly

- [ ] **Step 4: Commit**

```bash
git add components/home/AffiliateEditorial.tsx
git commit -m "feat: add eyebrow, heading, rule, and CTA to AffiliateEditorial"
```
