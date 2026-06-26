# BrandsComoFunciona Image Split Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the /brands "Cómo funciona" section to a full-bleed two-column layout: `hotel.webp` on the left, accordion content on the right, matching the `.sec-how` pattern in the HTML design reference.

**Architecture:** The section becomes full-bleed (no `sec` padding class), restructured as a `1fr 1fr` grid. The image column uses Next.js `Image` with `fill` + `object-fit: cover`. The right column retains the existing accordion state logic, centered via flexbox. Two files change: the component TSX and its CSS module.

**Tech Stack:** Next.js 16 static export, CSS Modules, `next/image` (unoptimized), `lib/assetPath.ts` for asset paths, React `useState`.

## Global Constraints

- No inline styles — CSS Modules only
- Use `assetPath()` from `lib/assetPath.ts` for the image src (required for GitHub Pages base path)
- `next/image` must use `fill` prop with a positioned parent (`position: relative`) — `unoptimized: true` is set globally in `next.config.ts`, no need to add it per-image
- No Tailwind, no new dependencies
- Both ES and EN translations already exist — no i18n changes needed
- Run `npx tsc --noEmit` after changes; zero errors required

---

### Task 1: Update BrandsComoFunciona.tsx — add image column

**Files:**
- Modify: `components/brands/BrandsComoFunciona.tsx`

**Interfaces:**
- Consumes: `assetPath` from `@/lib/assetPath`, `Image` from `next/image`
- Produces: component with `.outer` wrapper → `.imgCol` (left) + `.content` (right)

- [ ] **Step 1: Read the current file**

```bash
cat components/brands/BrandsComoFunciona.tsx
```

- [ ] **Step 2: Replace the file with the new implementation**

Write `components/brands/BrandsComoFunciona.tsx`:

```tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import { assetPath } from '@/lib/assetPath';
import styles from './BrandsComoFunciona.module.css';

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const STEPS = [
  { num: '01', titleKey: 'brandsComoFunciona.step1Title', descKey: 'brandsComoFunciona.step1Desc' },
  { num: '02', titleKey: 'brandsComoFunciona.step2Title', descKey: 'brandsComoFunciona.step2Desc' },
  { num: '03', titleKey: 'brandsComoFunciona.step3Title', descKey: 'brandsComoFunciona.step3Desc' },
  { num: '04', titleKey: 'brandsComoFunciona.step4Title', descKey: 'brandsComoFunciona.step4Desc' },
];

export default function BrandsComoFunciona() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number>(0);

  return (
    <section className={styles.section}>
      <div className={styles.outer}>
        <div className={styles.imgCol}>
          <Image
            src={assetPath('/images/hotel.webp')}
            alt=""
            fill
            className={styles.img}
          />
        </div>

        <RevealWrapper className={styles.content}>
          <div className="s-hd">
            <p className="s-eye lft">{t('brandsComoFunciona.eyebrow')}</p>
            <h2 className="s-title">{t('brandsComoFunciona.title')}</h2>
          </div>
          <hr className={styles.rule} />
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                className={styles.step}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <div className={styles.stepTop}>
                  <span className={styles.stepNum}>{s.num}</span>
                  <span className={`${styles.stepLabel}${open === i ? ` ${styles.stepLabelOpen}` : ''}`}>
                    {t(s.titleKey)}
                  </span>
                  <span className={`${styles.stepChev}${open === i ? ` ${styles.stepChevOpen}` : ''}`}>
                    <ChevronIcon />
                  </span>
                </div>
                <div className={`${styles.stepBody}${open === i ? ` ${styles.stepBodyOpen}` : ''}`}>
                  {t(s.descKey)}
                </div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no output (zero errors).

- [ ] **Step 4: Commit**

```bash
git add components/brands/BrandsComoFunciona.tsx
git commit -m "feat: add hotel image column to BrandsComoFunciona"
```

---

### Task 2: Update BrandsComoFunciona.module.css — full-bleed grid + image styles

**Files:**
- Modify: `components/brands/BrandsComoFunciona.module.css`

**Interfaces:**
- Consumes: class names produced in Task 1 (`.section`, `.outer`, `.imgCol`, `.img`, `.content`, `.rule`, `.steps`, `.step`, `.stepTop`, `.stepNum`, `.stepLabel`, `.stepLabelOpen`, `.stepChev`, `.stepChevOpen`, `.stepBody`, `.stepBodyOpen`)
- Produces: complete CSS module with full-bleed grid, image hover, accordion, and mobile stack

- [ ] **Step 1: Read the current file**

```bash
cat components/brands/BrandsComoFunciona.module.css
```

- [ ] **Step 2: Replace the file with the new styles**

Write `components/brands/BrandsComoFunciona.module.css`:

```css
/* ── Section ─────────────────────────────────────── */
.section {
  background: var(--c);
  border-top: 1px solid var(--rule);
}

.outer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 560px;
}

/* ── Image column ────────────────────────────────── */
.imgCol {
  position: relative;
  overflow: hidden;
}

.img {
  object-fit: cover;
  transition: transform 8s ease;
}

.imgCol:hover .img {
  transform: scale(1.04);
}

/* ── Content column ──────────────────────────────── */
.content {
  background: var(--c);
  padding: 80px 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.rule {
  width: 48px;
  height: 1px;
  background: var(--gold);
  border: none;
  margin: 24px 0 0;
  display: block;
}

/* ── Accordion steps ─────────────────────────────── */
.steps {
  margin-top: 8px;
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
  max-height: 200px;
  padding-top: 10px;
}

/* ── Mobile ──────────────────────────────────────── */
@media (max-width: 768px) {
  .outer {
    grid-template-columns: 1fr;
  }

  .imgCol {
    height: 60vw;
    max-height: 400px;
  }

  .content {
    padding: 48px 24px;
  }
}
```

- [ ] **Step 3: Verify TypeScript (CSS modules don't need type check, but catch any TSX regressions)**

```bash
npx tsc --noEmit
```

Expected: no output.

- [ ] **Step 4: Visual check — start dev server**

```bash
npm run dev
```

Open `http://localhost:3000/brands` and verify:
- Hotel image fills the left half of the section
- Right column shows eyebrow, h2, gold rule, accordion (step 1 open by default)
- Hovering the image triggers a slow scale
- At mobile width (≤ 768px) the image stacks above the content

- [ ] **Step 5: Commit**

```bash
git add components/brands/BrandsComoFunciona.module.css
git commit -m "feat: full-bleed image+accordion grid for BrandsComoFunciona"
```
