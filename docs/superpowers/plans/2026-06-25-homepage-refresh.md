# Homepage Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply four targeted changes to the homepage: hero copy updates, AffiliateEditorial redesigned to beige + accordion, ConfianzaCredibilidad icons replaced and centered, CollaborateTeaser 3-card grid removed.

**Architecture:** All changes are isolated to individual component files and shared i18n JSON files. No new components are created. The accordion in AffiliateEditorial is driven by React `useState` — no library needed.

**Tech Stack:** Next.js 16 static export, React 18, CSS Modules, TypeScript, i18n via flat JSON files in `lib/i18n/`.

## Global Constraints

- No test suite — verification is `npx tsc --noEmit` + `npm run lint` + visual check with `npm run dev`
- No inline styles, no Tailwind — CSS Modules only
- Every visible string must be translated in BOTH `lib/i18n/es.json` AND `lib/i18n/en.json`
- No hardcoded Spanish strings in JSX
- Design tokens only via CSS custom properties (`var(--ink)`, `var(--c)`, etc.)
- No em dashes (`--`) in any copy or comments

---

## File Map

| File | Change |
|---|---|
| `lib/i18n/es.json` | Update `hero.kvp` and `hero.cta` |
| `lib/i18n/en.json` | Update `hero.kvp` and `hero.cta` |
| `components/home/AffiliateEditorial.tsx` | Accordion steps, remove `inv` class, add `useState` |
| `components/home/AffiliateEditorial.module.css` | Full rewrite: beige bg, ink colors, accordion CSS |
| `components/home/ConfianzaCredibilidad.tsx` | Replace 3 inline SVG icon components |
| `components/home/ConfianzaCredibilidad.module.css` | Center pillar: `align-items: center`, `text-align: center` |
| `components/home/CollaborateTeaser.tsx` | Remove `icons`, `roles`, and the grid `div` |

---

## Task 1: Copy — hero kvp and CTA

**Files:**
- Modify: `lib/i18n/es.json`
- Modify: `lib/i18n/en.json`

**Context:** The Hero component (`components/home/Hero.tsx`) renders `t('hero.kvp')` as the sub-headline below the rule, and `t('hero.cta')` as the primary CTA button label. Both need updating to match the approved copy.

- [ ] **Step 1: Update Spanish hero copy**

In `lib/i18n/es.json`, find the `"hero"` object and update exactly these two keys:

```json
"kvp": "Invitamos a las marcas de lujo a formar parte del ecosistema que define el lujo en español.",
"cta": "Solicitar unirse",
```

- [ ] **Step 2: Update English hero copy**

In `lib/i18n/en.json`, find the `"hero"` object and update exactly these two keys:

```json
"kvp": "We invite luxury brands to establish their presence within the Spanish-speaking luxury market.",
"cta": "Apply to join",
```

- [ ] **Step 3: Type-check and lint**

```bash
npx tsc --noEmit && npm run lint
```

Expected: no errors.

- [ ] **Step 4: Visual check**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm:
- Hero sub-headline reads "Invitamos a las marcas de lujo a formar parte del ecosistema que define el lujo en español."
- CTA button reads "Solicitar unirse"
- Toggle to English: sub-headline and button update correctly

- [ ] **Step 5: Commit**

```bash
git add lib/i18n/es.json lib/i18n/en.json
git commit -m "fix: update hero kvp and CTA copy to approved client text"
```

---

## Task 2: AffiliateEditorial — beige theme + accordion steps

**Files:**
- Modify: `components/home/AffiliateEditorial.tsx`
- Modify: `components/home/AffiliateEditorial.module.css`

**Context:** The section currently has a dark (`var(--ink)`) background with a static `<ol>` of steps. It must become beige (`var(--c)`) with an interactive accordion where clicking a step header toggles the body text. Pattern taken from the `sec-how` section in `dominiosdelujo-anillos.html`. Stats column stays on the left; accordion goes on the right. First step is open by default.

- [ ] **Step 1: Rewrite AffiliateEditorial.tsx**

Replace the entire contents of `components/home/AffiliateEditorial.tsx` with:

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './AffiliateEditorial.module.css';

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

export default function AffiliateEditorial() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number>(0);

  const steps = [
    { num: '01', titleKey: 'affiliateIntro.step1Title', descKey: 'affiliateIntro.step1Desc' },
    { num: '02', titleKey: 'affiliateIntro.step2Title', descKey: 'affiliateIntro.step2Desc' },
    { num: '03', titleKey: 'affiliateIntro.step3Title', descKey: 'affiliateIntro.step3Desc' },
    { num: '04', titleKey: 'affiliateIntro.step4Title', descKey: 'affiliateIntro.step4Desc' },
  ];

  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className={styles.inner}>
        <div className={styles.leftCol}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{t('stats.stat1Num')}</span>
              <span className={styles.statLabel}>{t('stats.stat1Label')}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{t('stats.stat2Num')}</span>
              <span className={styles.statLabel}>{t('stats.stat2Label')}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{t('stats.stat3Num')}</span>
              <span className={styles.statLabel}>{t('stats.stat3Label')}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{t('stats.stat4Num')}</span>
              <span className={styles.statLabel}>{t('stats.stat4Label')}</span>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <p className="s-eye lft">{t('affiliateIntro.eyebrow')}</p>
          <h2 className="s-title">{t('affiliateIntro.heading')}</h2>
          <hr className={styles.rule} />
          <p className={styles.body}>{t('affiliateIntro.body')}</p>

          <div className={styles.steps}>
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={styles.step}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <div className={styles.stepTop}>
                  <span className={styles.stepNum}>{step.num}</span>
                  <span className={`${styles.stepLabel}${open === i ? ` ${styles.stepLabelOpen}` : ''}`}>
                    {t(step.titleKey)}
                  </span>
                  <span className={`${styles.stepChev}${open === i ? ` ${styles.stepChevOpen}` : ''}`}>
                    <ChevronIcon />
                  </span>
                </div>
                <div className={`${styles.stepBody}${open === i ? ` ${styles.stepBodyOpen}` : ''}`}>
                  {t(step.descKey)}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cta}>
            <Link href="/brands" className="btn-dark">{t('affiliateIntro.cta')}</Link>
            <p className={styles.note}>{t('affiliateIntro.note')}</p>
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite AffiliateEditorial.module.css**

Replace the entire contents of `components/home/AffiliateEditorial.module.css` with:

```css
.section {
  background: var(--c);
}

.inner {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 0 96px;
  align-items: start;
  max-width: 1100px;
  margin: 0 auto;
}

/* ── Left: stats ──────────────────────────────────── */
.leftCol {
  padding-top: 6px;
}

.stats {
  display: flex;
  flex-direction: column;
}

.stat {
  padding: 28px 0;
  border-bottom: 1px solid var(--rule);
}

.stat:first-child {
  border-top: 1px solid var(--rule);
}

.statNum {
  font-family: var(--fd);
  font-size: var(--text-display-lg);
  font-weight: 300;
  color: var(--gold);
  line-height: var(--lh-tight);
  display: block;
  margin-bottom: 8px;
}

.statLabel {
  font-family: var(--fb);
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink3);
}

/* ── Right: content ───────────────────────────────── */
.rightCol {
  padding-top: 4px;
}

.rule {
  width: 48px;
  height: 1px;
  background: var(--gold);
  border: none;
  margin: 20px 0 32px;
  display: block;
}

.body {
  font-size: var(--text-lg);
  line-height: var(--lh-loose);
  color: var(--ink2);
  margin-bottom: 32px;
}

/* ── Accordion steps ──────────────────────────────── */
.steps {
  margin: 0 0 32px;
}

.step {
  border-bottom: 1px solid var(--rule);
  padding: 18px 0;
  cursor: pointer;
}

.step:first-child {
  border-top: 1px solid var(--rule);
}

.stepTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.stepNum {
  font-family: var(--fd);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.15em;
  color: var(--gold);
  width: 24px;
  flex-shrink: 0;
}

.stepLabel {
  font-family: var(--fd);
  font-size: 17px;
  font-weight: 400;
  color: var(--ink);
  flex: 1;
  transition: color 0.2s;
}

.stepLabelOpen {
  color: var(--gold);
}

.stepChev {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--ink3);
  transition: transform 0.3s, color 0.2s;
}

.stepChevOpen {
  transform: rotate(180deg);
  color: var(--gold);
}

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

.stepBodyOpen {
  max-height: 150px;
  padding-top: 10px;
}

/* ── CTA ──────────────────────────────────────────── */
.cta {
  margin-top: 40px;
}

.note {
  font-size: var(--text-sm);
  color: var(--ink3);
  margin-top: 12px;
  font-style: italic;
}

/* ── Mobile ───────────────────────────────────────── */
@media (max-width: 900px) {
  .inner {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .leftCol {
    padding-top: 0;
    margin-bottom: 48px;
  }

  .stats {
    flex-direction: row;
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
  }

  .stat {
    flex: 1;
    padding: 24px 0;
    border-bottom: none;
    border-top: none;
    text-align: center;
  }

  .stat:first-child {
    border-top: none;
  }

  .stat + .stat {
    border-left: 1px solid var(--rule);
  }

  .rightCol {
    padding-top: 0;
  }

  .body {
    font-size: var(--text-base);
  }

  .statNum {
    font-size: 32px;
  }

  .statLabel {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .stats            { flex-direction: column; border-top: none; border-bottom: none; }
  .stat             { padding: 16px 0; border-bottom: 1px solid var(--rule); }
  .stat:first-child { border-top: 1px solid var(--rule); }
  .stat + .stat     { border-left: none; }
}
```

- [ ] **Step 3: Type-check and lint**

```bash
npx tsc --noEmit && npm run lint
```

Expected: no errors.

- [ ] **Step 4: Visual check**

Open `http://localhost:3000` (dev server must be running). Scroll to the affiliate section (between PorQueNosotros and ConfianzaCredibilidad). Confirm:
- Section background is cream/beige, not dark
- Stats column on the left with gold numbers and muted labels
- Right side shows eyebrow, heading (dark text, not white), rule, body text
- Four numbered steps with chevrons; first one is expanded showing its body text
- Clicking another step closes the first and opens the clicked one
- CTA button is dark/black ("Solicitar ingreso al programa de afiliados")

- [ ] **Step 5: Commit**

```bash
git add components/home/AffiliateEditorial.tsx components/home/AffiliateEditorial.module.css
git commit -m "feat: redesign AffiliateEditorial to beige theme with accordion steps"
```

---

## Task 3: ConfianzaCredibilidad — new icons and centering

**Files:**
- Modify: `components/home/ConfianzaCredibilidad.tsx`
- Modify: `components/home/ConfianzaCredibilidad.module.css`

**Context:** The three SVG icon components (EditorialIcon, KeyIcon, StarIcon) do not visually match the pillar titles. Replace them. The pillar cells also need centering: currently `align-items: flex-start`, needs `align-items: center` + `text-align: center`.

- [ ] **Step 1: Replace icon components and update pillar array in ConfianzaCredibilidad.tsx**

Replace the three icon components and the file's top section. The rest of the component JSX is unchanged.

Replace everything from line 1 through the end of the `pillars` array definition (before the `return`):

```tsx
'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './ConfianzaCredibilidad.module.css';

const ReviewIcon = () => (
  <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="#B08A3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="6" width="28" height="36" rx="2"/>
    <line x1="16" y1="20" x2="32" y2="20"/>
    <line x1="16" y1="27" x2="32" y2="27"/>
    <polyline points="16,35 20,39 30,31"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="#B08A3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 6 L40 14 L40 26 Q40 36 24 44 Q8 36 8 26 L8 14 Z"/>
    <path d="M24 18 L30 24 L24 30 L18 24 Z"/>
  </svg>
);

const BadgeIcon = () => (
  <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="#B08A3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="20" r="14"/>
    <circle cx="24" cy="20" r="8"/>
    <line x1="18" y1="32" x2="14" y2="44"/>
    <line x1="30" y1="32" x2="34" y2="44"/>
    <line x1="14" y1="44" x2="24" y2="38"/>
    <line x1="34" y1="44" x2="24" y2="38"/>
  </svg>
);

export default function ConfianzaCredibilidad() {
  const { t } = useI18n();

  const pillars = [
    { titleKey: 'confianza.pill1Title', descKey: 'confianza.pill1Desc', icon: <ReviewIcon /> },
    { titleKey: 'confianza.pill2Title', descKey: 'confianza.pill2Desc', icon: <ShieldIcon /> },
    { titleKey: 'confianza.pill3Title', descKey: 'confianza.pill3Desc', icon: <BadgeIcon /> },
  ];
```

The `return` block and everything after it stays exactly as-is.

- [ ] **Step 2: Center the pillar cells in ConfianzaCredibilidad.module.css**

Find the `.pillar` rule and change `align-items: flex-start` to `align-items: center`, and add `text-align: center`:

```css
.pillar {
  background: var(--w);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: background 0.3s;
}
```

- [ ] **Step 3: Type-check and lint**

```bash
npx tsc --noEmit && npm run lint
```

Expected: no errors.

- [ ] **Step 4: Visual check**

Scroll to the "Construido con los mismos estándares que exige el lujo" section. Confirm:
- Three icons are now centered above their titles
- Icon 1 (document + checkmark) over "Revisión editorial"
- Icon 2 (shield with diamond) over "Exclusividad por vertical"
- Icon 3 (award badge) over "Certificación LujoTotal™"
- Title and description text are centered within each pillar cell

- [ ] **Step 5: Commit**

```bash
git add components/home/ConfianzaCredibilidad.tsx components/home/ConfianzaCredibilidad.module.css
git commit -m "fix: replace ConfianzaCredibilidad icons to match pillar content and center layout"
```

---

## Task 4: CollaborateTeaser — remove 3-card grid

**Files:**
- Modify: `components/home/CollaborateTeaser.tsx`
- Modify: `components/home/CollaborateTeaser.module.css`

**Context:** The section renders three role cards (Redactores, Editores, Influencers) in a 3-column grid. Remove the cards entirely. Keep the watermark, the heading block (eyebrow, title, subtitle), and the CTA button.

- [ ] **Step 1: Rewrite CollaborateTeaser.tsx**

Replace the entire file contents with:

```tsx
'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './CollaborateTeaser.module.css';

export default function CollaborateTeaser() {
  const { t } = useI18n();

  return (
    <section className={`sec ${styles.section}`}>
      <div className={styles.wm} aria-hidden="true">LUJO</div>

      <div className={styles.inner}>
        <RevealWrapper className="s-hd">
          <p className="s-eye">{t('collaborateTeaser.eyebrow')}</p>
          <h2 className="s-title">
            {t('collaborateTeaser.title')} <em>{t('collaborateTeaser.titleEm')}</em>
          </h2>
          <p className={styles.subtitle}>{t('collaborateTeaser.subtitle')}</p>
        </RevealWrapper>

        <RevealWrapper delay={1} className={styles.cta}>
          <Link href="/colaborar" className="btn-dark">{t('collaborateTeaser.cta')}</Link>
        </RevealWrapper>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Clean up CollaborateTeaser.module.css**

Remove the `.grid`, `.card`, `.icon`, `.cardTitle`, `.cardDesc` rules — they are no longer referenced. Keep `.section`, `.wm`, `.inner`, `.subtitle`, `.cta`, and the media queries.

The cleaned file:

```css
.section {
  background: var(--c);
  position: relative;
  overflow: hidden;
}

.wm {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--fd);
  font-size: clamp(200px, 28vw, 380px);
  font-weight: 300;
  color: rgba(176, 138, 58, 0.04);
  line-height: var(--lh-tight);
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.inner {
  position: relative;
  z-index: 1;
}

.subtitle {
  font-family: var(--fb);
  font-size: var(--text-lg);
  line-height: var(--lh-relaxed);
  color: var(--ink2);
  max-width: 640px;
  margin: 16px auto 0;
  text-align: center;
}

.cta {
  text-align: center;
  margin-top: 52px;
}

@media (max-width: 768px) {
  .subtitle { font-size: var(--text-base); }
}
```

- [ ] **Step 3: Type-check and lint**

```bash
npx tsc --noEmit && npm run lint
```

Expected: no errors.

- [ ] **Step 4: Visual check**

Scroll to the collaborate section at the bottom of the homepage. Confirm:
- The three-card grid (Redactores, Editores, Influencers) is gone
- The watermark "LUJO" is still visible faintly in the background
- The eyebrow, title ("Colabora con Dominios de Lujo."), and subtitle are centered
- A single dark CTA button is visible below the subtitle

- [ ] **Step 5: Commit**

```bash
git add components/home/CollaborateTeaser.tsx components/home/CollaborateTeaser.module.css
git commit -m "feat: remove 3-card grid from CollaborateTeaser, keep header and CTA"
```

---

## Self-Review

**Spec coverage:**
- Copy updates (hero.kvp, hero.cta) — Task 1
- AffiliateEditorial beige theme + accordion — Task 2
- ConfianzaCredibilidad new icons + centering — Task 3
- CollaborateTeaser remove 3-card grid — Task 4

All spec requirements covered. Out-of-scope items (Brands page, LujoTotal page, FAQ section) correctly excluded.

**Placeholder scan:** No TBDs, no "implement later" references. All code blocks are complete.

**Type consistency:** `useState<number>` used consistently; `open === i` comparisons are consistent throughout Task 2. Icon component names (ReviewIcon, ShieldIcon, BadgeIcon) defined once and referenced once.
