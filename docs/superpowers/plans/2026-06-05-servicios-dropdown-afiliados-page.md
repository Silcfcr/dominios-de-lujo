# Servicios Dropdown + Afiliados Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a nav dropdown to Servicios with three links, create a dedicated `/servicios/afiliados` page (affiliate content + PartnerValue), and remove PartnerValue from the homepage.

**Architecture:** Four independent changes — i18n keys first, then Nav refactor (generic children-based dropdown replacing the `/nosotros` special-case), then the new static page, then small edits to the existing `/servicios` overview and homepage. No new components; `PartnerValue` is imported directly on the new page.

**Tech Stack:** Next.js 16 static export, CSS Modules, `useI18n()` / `t()`, `Link` from next/link, `Fragment` from react.

---

## File Map

| Action | File | Purpose |
|---|---|---|
| Modify | `lib/i18n/es.json` | Add `subnav.afiliados/paginas/alquileres` + `servicios.affiliateDetailCta` |
| Modify | `lib/i18n/en.json` | Same keys in English |
| Modify | `components/layout/Nav.tsx` | Generic children-based dropdown for Servicios + Nosotros |
| Create | `app/servicios/afiliados/page.module.css` | Scoped styles for the new page |
| Create | `app/servicios/afiliados/page.tsx` | Dedicated affiliate service page |
| Modify | `app/servicios/page.tsx` | Add `id` anchors + affiliateDetailCta CTA |
| Modify | `app/page.tsx` | Remove `<PartnerValue />` and its import |

---

### Task 1: Add i18n keys

**Files:**
- Modify: `lib/i18n/es.json`
- Modify: `lib/i18n/en.json`

- [ ] **Step 1: Add keys to `lib/i18n/es.json`**

Add three keys to the existing `"subnav"` block (which already has `about`, `manifesto`, `lujototal`):

```json
"subnav": {
  "about": "Quiénes Somos",
  "manifesto": "Manifiesto",
  "lujototal": "LujoTotal™",
  "afiliados": "Plataforma de Afiliados",
  "paginas": "PaginasDeLujo.com",
  "alquileres": "Alquileres & Publicidad"
},
```

Add one key to the existing `"servicios"` block (at the end, before the closing `}`):

```json
"affiliateDetailCta": "Ver página completa"
```

- [ ] **Step 2: Add keys to `lib/i18n/en.json`**

Same two edits for English:

```json
"subnav": {
  "about": "About Us",
  "manifesto": "Manifesto",
  "lujototal": "LujoTotal™",
  "afiliados": "Affiliate Platform",
  "paginas": "PaginasDeLujo.com",
  "alquileres": "Rentals & Advertising"
},
```

```json
"affiliateDetailCta": "View full page"
```

- [ ] **Step 3: Verify JSON is valid**

```bash
cd /Users/silviacastro/Desktop/dominiosdelujo-app && node -e "require('./lib/i18n/es.json'); require('./lib/i18n/en.json'); console.log('JSON valid')"
```

Expected: `JSON valid`

- [ ] **Step 4: Commit**

```bash
cd /Users/silviacastro/Desktop/dominiosdelujo-app && git add lib/i18n/es.json lib/i18n/en.json && git commit -m "feat: add subnav servicios keys and affiliateDetailCta i18n

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Refactor Nav to support Servicios dropdown

**Files:**
- Modify: `components/layout/Nav.tsx`

**Context:** The current Nav has a one-off special case for `/nosotros` in both the desktop link list and the mobile drawer. This task refactors it to a generic `children` field on the link type, then adds the `/servicios` dropdown using the same mechanism. The CSS for dropdowns (`.dropItem`, `.dropMenu`, `.dropLink`, `.drwSubLink`) already exists in `Nav.module.css` — no CSS changes needed.

- [ ] **Step 1: Replace `components/layout/Nav.tsx` with the updated version**

```tsx
'use client';

import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { assetPath } from '@/lib/assetPath';
import LanguageToggle from '@/components/ui/LanguageToggle';
import styles from './Nav.module.css';

const CONTACT_EMAIL = 'mailto:info@dominiosdelujo.com?subject=Consulta%20%E2%80%94%20Dominios%20de%20Lujo';

type NavChild = { href: string; label: string };
type NavLink  = { href: string; label: string; children?: NavChild[] };

export default function Nav() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const links: NavLink[] = [
    { href: '/', label: t('nav.inicio') },
    { href: '/dominios', label: t('nav.dominios') },
    {
      href: '/servicios',
      label: t('nav.servicios'),
      children: [
        { href: '/servicios/afiliados',  label: t('subnav.afiliados') },
        { href: '/servicios#paginas',    label: t('subnav.paginas') },
        { href: '/servicios#alquileres', label: t('subnav.alquileres') },
      ],
    },
    { href: '/colaborar', label: t('nav.colaborar') },
    {
      href: '/nosotros',
      label: t('nav.about'),
      children: [
        { href: '/nosotros#nosotros',  label: t('subnav.about') },
        { href: '/nosotros#manifiesto', label: t('subnav.manifesto') },
      ],
    },
    { href: '/lujototal', label: t('nav.lujototal') },
  ];

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        {/* Row 1 */}
        <div className={styles.r1}>
          <Link href="/" className={styles.logoMark} aria-label="Dominios de Lujo — inicio">
            <Image src={assetPath('/images/logo.webp')} alt="Dominios de Lujo" width={120} height={44} priority style={{ height: '36px', width: 'auto' }} />
          </Link>
          <div className={styles.wordmarkGroup}>
            <Link href="/" className={styles.wordmark}>
              DOMINIOS DE LUJO
            </Link>
            <Link
              href="/lujototal"
              className={styles.certBadge}
              aria-label="LujoTotal™ certified"
            >
              <Image
                src={assetPath('/images/lujo-total.webp')}
                alt=""
                width={48}
                height={48}
              />
            </Link>
          </div>
          <div className={styles.r1Right}>
            <LanguageToggle />
            <a href={CONTACT_EMAIL} className={styles.iconBtn} aria-label={t('nav.contacto')}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <button
              className={styles.ham}
              onClick={() => setDrawerOpen(true)}
              aria-label="Menú"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Row 2 — desktop links */}
        <div className={styles.r2}>
          <ul className={styles.links}>
            {links.map((l) =>
              l.children ? (
                <li key={l.href} className={styles.dropItem}>
                  <Link href={l.href} className={styles.link}>
                    {l.label} <span className={styles.dropChevron}>▾</span>
                  </Link>
                  <ul className={styles.dropMenu}>
                    {l.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className={styles.dropLink}>{c.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={l.href}>
                  <Link href={l.href} className={styles.link}>{l.label}</Link>
                </li>
              )
            )}
            <li>
              <a href={CONTACT_EMAIL} className={styles.link}>
                {t('nav.contacto')}
              </a>
            </li>
          </ul>
        </div>

        {/* Row 3 */}
        <div className={styles.r3}>
          <span className={styles.slogan}>Luxury With Purpose</span>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`${styles.drwBg} ${drawerOpen ? styles.drwBgOn : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside className={`${styles.drw} ${drawerOpen ? styles.drwOn : ''}`} aria-label="Menú de navegación">
        <button className={styles.drwClose} onClick={() => setDrawerOpen(false)}>
          Cerrar ✕
        </button>
        <div className={styles.drwLogo}>
          <Image src={assetPath('/images/logo.webp')} alt="Dominios de Lujo" width={120} height={40} style={{ objectFit: 'contain', height: '32px', width: 'auto' }} />
        </div>
        <nav>
          {links.map((l) =>
            l.children ? (
              <Fragment key={l.href}>
                <Link href={l.href} className={styles.drwLink} onClick={() => setDrawerOpen(false)}>
                  {l.label}
                </Link>
                {l.children.map((c) => (
                  <Link key={c.href} href={c.href} className={`${styles.drwLink} ${styles.drwSubLink}`} onClick={() => setDrawerOpen(false)}>
                    {c.label}
                  </Link>
                ))}
              </Fragment>
            ) : (
              <Link key={l.href} href={l.href} className={styles.drwLink} onClick={() => setDrawerOpen(false)}>
                {l.label}
              </Link>
            )
          )}
          <a href={CONTACT_EMAIL} className={styles.drwLink} onClick={() => setDrawerOpen(false)}>
            {t('nav.contacto')}
          </a>
        </nav>
        <div className={styles.drwFooter}>
          <LanguageToggle />
        </div>
      </aside>
    </>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd /Users/silviacastro/Desktop/dominiosdelujo-app && npx tsc --noEmit 2>&1
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
cd /Users/silviacastro/Desktop/dominiosdelujo-app && git add components/layout/Nav.tsx && git commit -m "feat: add Servicios dropdown to nav (generic children-based pattern)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Create `/servicios/afiliados` page

**Files:**
- Create: `app/servicios/afiliados/page.module.css`
- Create: `app/servicios/afiliados/page.tsx`

**Context:** This page shows the full affiliate service content (reusing existing `servicios.*` i18n keys) followed by the `PartnerValue` component imported from `components/home/PartnerValue`. The CSS mirrors the styles in `app/servicios/page.module.css` — only the subset needed for this page is included.

- [ ] **Step 1: Create `app/servicios/afiliados/page.module.css`**

```css
.page {
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 72px 64px 64px;
  background: var(--w);
  border-bottom: 1px solid var(--rule);
}

.serviceSection {
  border-bottom: 1px solid var(--rule);
  background: var(--w);
}

.serviceCols {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 64px;
  align-items: flex-start;
  max-width: 960px;
  margin: 0 auto;
}

.serviceIcon {
  display: flex;
  align-items: flex-start;
  padding-top: 8px;
}

.serviceIcon svg {
  width: 56px;
  height: 56px;
  color: var(--gold);
}

.serviceContent {
  padding-bottom: 8px;
}

.serviceEye {
  font-family: var(--fb);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 12px;
}

.serviceTitle {
  font-family: var(--fd);
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 400;
  color: var(--ink);
  line-height: 1.15;
  margin-bottom: 24px;
}

.serviceBody {
  font-family: var(--fb);
  font-size: 15px;
  line-height: 1.85;
  color: var(--ink2);
  margin-bottom: 16px;
  max-width: 640px;
}

.stats {
  display: flex;
  gap: 48px;
  padding: 28px 0;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.statNum {
  font-family: var(--fd);
  font-size: 32px;
  font-weight: 300;
  color: var(--gold);
  line-height: 1;
}

.statLabel {
  font-family: var(--fd);
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink3);
}

@media (max-width: 900px) {
  .header {
    padding: 48px 24px 40px;
  }

  .serviceCols {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .stats {
    gap: 28px;
  }
}
```

- [ ] **Step 2: Create `app/servicios/afiliados/page.tsx`**

```tsx
'use client';

import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import PartnerValue from '@/components/home/PartnerValue';
import styles from './page.module.css';

const CONTACT = 'mailto:info@dominiosdelujo.com?subject=Consulta%20Servicios%20%E2%80%94%20Dominios%20de%20Lujo';

const affiliateIcon = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
    <circle cx="12" cy="24" r="6" />
    <circle cx="36" cy="12" r="6" />
    <circle cx="36" cy="36" r="6" />
    <line x1="18" y1="21" x2="30" y2="15" />
    <line x1="18" y1="27" x2="30" y2="33" />
  </svg>
);

export default function AfiliadosPage() {
  const { t } = useI18n();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className="s-eye">{t('servicios.affiliateEyebrow')}</p>
        <h1 className="s-title">{t('servicios.affiliateTitle')}</h1>
      </div>

      <section className={`sec ${styles.serviceSection}`}>
        <RevealWrapper className={styles.serviceCols}>
          <div className={styles.serviceIcon}>{affiliateIcon}</div>
          <div className={styles.serviceContent}>
            <p className={styles.serviceBody}>{t('servicios.affiliateBody1')}</p>
            <p className={styles.serviceBody}>{t('servicios.affiliateBody2')}</p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>3.000+</span>
                <span className={styles.statLabel}>{t('servicios.stat1Label')}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>20</span>
                <span className={styles.statLabel}>{t('servicios.stat2Label')}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>146</span>
                <span className={styles.statLabel}>{t('servicios.stat3Label')}</span>
              </div>
            </div>
            <a href={CONTACT} className="btn-dark">{t('servicios.affiliateCta')}</a>
          </div>
        </RevealWrapper>
      </section>

      <PartnerValue />
    </div>
  );
}
```

- [ ] **Step 3: TypeScript check**

```bash
cd /Users/silviacastro/Desktop/dominiosdelujo-app && npx tsc --noEmit 2>&1
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
cd /Users/silviacastro/Desktop/dominiosdelujo-app && git add app/servicios/afiliados/ && git commit -m "feat: add /servicios/afiliados dedicated page with PartnerValue

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 4: Update `/servicios` overview page

**Files:**
- Modify: `app/servicios/page.tsx`

Two changes: (1) add `id` anchors to PaginasDeLujo and Rentals sections so dropdown anchor links land correctly; (2) add a "Ver página completa" CTA to the Affiliate section.

- [ ] **Step 1: Read the current file**

Read `app/servicios/page.tsx` to locate the exact strings to edit before making changes.

- [ ] **Step 2: Add `id="paginas"` to the PaginasDeLujo section**

Find the line:
```tsx
      <section className={`sec ${styles.serviceSection} ${styles.darkBg}`}>
```
Replace with:
```tsx
      <section id="paginas" className={`sec ${styles.serviceSection} ${styles.darkBg}`}>
```

- [ ] **Step 3: Add `id="alquileres"` to the Rentals section**

Find the line:
```tsx
      <section className={`sec ${styles.serviceSection} ${styles.lightBg}`}>
```
(the second occurrence — the Rentals section). Replace with:
```tsx
      <section id="alquileres" className={`sec ${styles.serviceSection} ${styles.lightBg}`}>
```

- [ ] **Step 4: Add the affiliate detail CTA**

In `app/servicios/page.module.css`, add a new class at the bottom:

```css
.ctaRow {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
```

In `app/servicios/page.tsx`, find the existing affiliate CTA line inside the Affiliate section's `serviceContent` div:

```tsx
            <a href={CONTACT} className="btn-dark">{t('servicios.affiliateCta')}</a>
```

Replace it with a row containing both the existing CTA and the new detail link:

```tsx
            <div className={styles.ctaRow}>
              <a href={CONTACT} className="btn-dark">{t('servicios.affiliateCta')}</a>
              <a href="/servicios/afiliados" className="btn-outline">{t('servicios.affiliateDetailCta')}</a>
            </div>
```

- [ ] **Step 5: TypeScript check**

```bash
cd /Users/silviacastro/Desktop/dominiosdelujo-app && npx tsc --noEmit 2>&1
```

Expected: no output.

- [ ] **Step 6: Commit**

```bash
cd /Users/silviacastro/Desktop/dominiosdelujo-app && git add app/servicios/page.tsx app/servicios/page.module.css && git commit -m "feat: add section anchors and affiliate detail CTA to servicios overview

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 5: Remove PartnerValue from homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update `app/page.tsx`**

Replace the entire file with:

```tsx
import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import CategoryTeaser from '@/components/home/CategoryTeaser';
import HomeSectionLink from '@/components/home/HomeSectionLink';
import ServicesGrid from '@/components/home/ServicesGrid';
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
      <BrandsGrid />
      <HomeSectionLink labelKey="home.manifestoLink" href="/nosotros#manifiesto" />
      <CollaborateTeaser />
    </>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd /Users/silviacastro/Desktop/dominiosdelujo-app && npx tsc --noEmit 2>&1
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
cd /Users/silviacastro/Desktop/dominiosdelujo-app && git add app/page.tsx && git commit -m "feat: remove PartnerValue from homepage (now lives on /servicios/afiliados)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
