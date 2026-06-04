# Writers Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Nuestros Escritores de Lujo" section with 6 writer cards (photo placeholder, vertical, name, pull quote) as the first section on the Quiénes somos (`/nosotros`) page.

**Architecture:** A new `WritersGrid` client component renders a centered header and a 3×2 CSS Grid of writer cards. Writer data is hardcoded as a TypeScript array inside the component. The component is inserted at the top of `app/nosotros/page.tsx`.

**Tech Stack:** Next.js 16 (static export), TypeScript, CSS Modules, `next/image`, `RevealWrapper` (scroll-reveal utility already in project).

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `components/about/WritersGrid.module.css` | All styles for section, grid, and cards |
| Create | `components/about/WritersGrid.tsx` | Component with hardcoded writer data |
| Modify | `app/nosotros/page.tsx` | Import and render `WritersGrid` first |

---

## Task 1: Create the CSS module

**Files:**
- Create: `components/about/WritersGrid.module.css`

- [ ] **Step 1: Create the file with all styles**

```css
/* components/about/WritersGrid.module.css */

.section {
  background: var(--c);
}

.header {
  text-align: center;
  margin-bottom: 52px;
}

.heading {
  font-size: clamp(26px, 3vw, 40px);
  margin-top: 12px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.card {
  background: var(--w);
  border: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s, transform 0.3s;
}

.card:hover {
  box-shadow: 0 8px 32px rgba(26, 23, 20, 0.08);
  transform: translateY(-4px);
}

.photoWrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.photo {
  object-fit: cover;
  object-position: center top;
}

.photoPlaceholder {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #e8e4de;
  display: flex;
  align-items: center;
  justify-content: center;
}

.initials {
  font-family: var(--fd);
  font-size: clamp(28px, 3vw, 44px);
  color: var(--gold);
  letter-spacing: 0.06em;
}

.info {
  padding: 24px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.vertical {
  font-family: var(--fb);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0;
}

.name {
  font-family: var(--fd);
  font-size: clamp(18px, 1.6vw, 22px);
  font-weight: 400;
  color: var(--ink);
  line-height: 1.2;
  margin: 0;
}

.quote {
  font-family: var(--fb);
  font-size: 13px;
  font-style: italic;
  color: var(--ink3);
  line-height: 1.6;
  margin: 4px 0 0;
}

.quote::before {
  content: '"';
  color: var(--gold);
  font-style: normal;
  margin-right: 2px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add components/about/WritersGrid.module.css
git commit -m "feat: add WritersGrid CSS module"
```

---

## Task 2: Create the WritersGrid component

**Files:**
- Create: `components/about/WritersGrid.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/about/WritersGrid.tsx
'use client';

import Image from 'next/image';
import { assetPath } from '@/lib/assetPath';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './WritersGrid.module.css';

type Writer = {
  name: string;
  vertical: string;
  quote: string;
  photo?: string;
};

const writers: Writer[] = [
  { name: 'Escritora Uno',    vertical: 'Moda & Estilo',      quote: 'El lujo es elegir con intención.' },
  { name: 'Escritora Dos',    vertical: 'Gastronomía',         quote: 'El lujo es saborear sin prisa.' },
  { name: 'Escritora Tres',   vertical: 'Viajes de Lujo',      quote: 'El lujo es llegar a lugares que te cambian.' },
  { name: 'Escritora Cuatro', vertical: 'Joyería & Relojes',   quote: 'El lujo es el tiempo que no se ve.' },
  { name: 'Escritora Cinco',  vertical: 'Arte & Cultura',      quote: 'El lujo es lo que permanece.' },
  { name: 'Escritora Seis',   vertical: 'Propiedades',         quote: 'El lujo es el espacio que te define.' },
];

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

export default function WritersGrid() {
  return (
    <section className={`sec ${styles.section}`}>
      <div className={styles.header}>
        <p className="s-eye">Voces del lujo</p>
        <h2 className={`s-title ${styles.heading}`}>Nuestros Escritores de Lujo</h2>
      </div>
      <div className={styles.grid}>
        {writers.map((writer, i) => (
          <RevealWrapper key={writer.name} delay={(i % 3) as 0 | 1 | 2} className={styles.card}>
            {writer.photo ? (
              <div className={styles.photoWrap}>
                <Image
                  src={assetPath(writer.photo)}
                  alt={writer.name}
                  fill
                  className={styles.photo}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className={styles.photoPlaceholder} aria-hidden="true">
                <span className={styles.initials}>{initials(writer.name)}</span>
              </div>
            )}
            <div className={styles.info}>
              <p className={styles.vertical}>{writer.vertical}</p>
              <h3 className={styles.name}>{writer.name}</h3>
              <p className={styles.quote}>{writer.quote}</p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/about/WritersGrid.tsx
git commit -m "feat: add WritersGrid component with placeholder writer data"
```

---

## Task 3: Wire into the Quiénes somos page

**Files:**
- Modify: `app/nosotros/page.tsx`

Current content of `app/nosotros/page.tsx`:

```tsx
import MissionVision from '@/components/about/MissionVision';
import Manifesto from '@/components/home/Manifesto';
import LujoTotal from '@/components/home/LujoTotal';

export const metadata = {
  title: 'Quiénes somos | Dominios de Lujo',
  description: 'La misión y visión de Dominios de Lujo — la mayor red editorial de lujo en español.',
};

export default function NosotrosPage() {
  return (
    <main>
      <section id="nosotros">
        <MissionVision />
      </section>
      <section id="manifiesto">
        <Manifesto />
      </section>
      <section id="lujototal">
        <LujoTotal />
      </section>
    </main>
  );
}
```

- [ ] **Step 1: Add the import and section**

Replace the file content with:

```tsx
import WritersGrid from '@/components/about/WritersGrid';
import MissionVision from '@/components/about/MissionVision';
import Manifesto from '@/components/home/Manifesto';
import LujoTotal from '@/components/home/LujoTotal';

export const metadata = {
  title: 'Quiénes somos | Dominios de Lujo',
  description: 'La misión y visión de Dominios de Lujo — la mayor red editorial de lujo en español.',
};

export default function NosotrosPage() {
  return (
    <main>
      <section id="escritores">
        <WritersGrid />
      </section>
      <section id="nosotros">
        <MissionVision />
      </section>
      <section id="manifiesto">
        <Manifesto />
      </section>
      <section id="lujototal">
        <LujoTotal />
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Type-check and build**

```bash
npx tsc --noEmit && npm run build
```

Expected: no TypeScript errors, build succeeds with static export to `out/`.

- [ ] **Step 3: Visual verify**

```bash
npm run dev
```

Open `http://localhost:3000/nosotros` and verify:
- Writers grid appears at the top of the page, above Mission/Vision
- 6 cards in a 3×2 grid, each showing initials placeholder, gold vertical eyebrow, name, and italic pull quote with gold `"` prefix
- Hover on a card: subtle lift and shadow
- Resize to ≤900px: grid collapses to 2 columns
- Resize to ≤600px: grid collapses to 1 column

- [ ] **Step 4: Commit**

```bash
git add app/nosotros/page.tsx
git commit -m "feat: add WritersGrid as first section on Quiénes somos page"
```
