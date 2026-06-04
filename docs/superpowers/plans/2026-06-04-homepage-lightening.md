# Homepage Lightening — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove Manifesto, LujoTotal, and PaginasSpotlight from the homepage; move Manifesto and LujoTotal to dedicated pages; replace their homepage slots with slim navigation link rows.

**Architecture:** A new `HomeSectionLink` client component reads its label from i18n and renders a slim text link. Two new static pages (`/manifiesto`, `/lujototal`) each render a single existing component. `app/page.tsx` is updated to wire everything together.

**Tech Stack:** Next.js 16 static export, React, CSS Modules, flat i18n JSON (`lib/i18n/`)

---

## File Map

| File | Action |
|------|--------|
| `lib/i18n/en.json` | Add `home` object with two keys |
| `lib/i18n/es.json` | Add `home` object with two keys |
| `components/home/HomeSectionLink.tsx` | Create — slim link row component |
| `components/home/HomeSectionLink.module.css` | Create — styles for above |
| `app/manifiesto/page.tsx` | Create — renders `<Manifesto />` |
| `app/lujototal/page.tsx` | Create — renders `<LujoTotal />` |
| `app/page.tsx` | Modify — swap sections, add HomeSectionLink |

---

## Task 1: Add i18n keys

**Files:**
- Modify: `lib/i18n/en.json`
- Modify: `lib/i18n/es.json`

- [ ] **Step 1: Add `home` object to `lib/i18n/en.json`**

The file currently has no `home` key. Add it after the `"nav"` object (lines 2–10). Insert the following block immediately after the closing `}` of `"nav"`, before `"hero"`:

```json
  "home": {
    "manifestoLink": "Learn our Luxury Manifesto",
    "lujototalLink": "About LujoTotal™ Certification"
  },
```

- [ ] **Step 2: Add `home` object to `lib/i18n/es.json`**

Same position in the Spanish file:

```json
  "home": {
    "manifestoLink": "Lee nuestro Manifiesto del Lujo",
    "lujototalLink": "Sobre la Certificación LujoTotal™"
  },
```

- [ ] **Step 3: Commit**

```bash
git add lib/i18n/en.json lib/i18n/es.json
git commit -m "copy: add home.manifestoLink and home.lujototalLink i18n keys"
```

---

## Task 2: Create HomeSectionLink component

**Files:**
- Create: `components/home/HomeSectionLink.tsx`
- Create: `components/home/HomeSectionLink.module.css`

- [ ] **Step 1: Create `components/home/HomeSectionLink.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import styles from './HomeSectionLink.module.css';

interface Props {
  labelKey: string;
  href: string;
}

export default function HomeSectionLink({ labelKey, href }: Props) {
  const { t } = useI18n();
  return (
    <div className={styles.wrap}>
      <Link href={href} className={styles.link}>
        {t(labelKey)}&nbsp;<span className={styles.arrow}>→</span>
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/home/HomeSectionLink.module.css`**

```css
.wrap {
  padding: 40px 64px;
  background: var(--w);
}

.link {
  font-family: var(--fb);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink2);
  text-decoration: none;
  transition: color 0.2s;
}

.link:hover {
  color: var(--ink);
}

.arrow {
  color: var(--gold);
}

@media (max-width: 900px) {
  .wrap {
    padding: 32px 24px;
  }
}
```

- [ ] **Step 3: Run TypeScript check**

```bash
cd /Users/silviacastro/Desktop/dominiosdelujo-app && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/home/HomeSectionLink.tsx components/home/HomeSectionLink.module.css
git commit -m "feat: add HomeSectionLink component for slim homepage nav rows"
```

---

## Task 3: Create /manifiesto page

**Files:**
- Create: `app/manifiesto/page.tsx`

- [ ] **Step 1: Create `app/manifiesto/page.tsx`**

Follow the exact pattern of `app/nosotros/page.tsx`:

```tsx
import Manifesto from '@/components/home/Manifesto';

export const metadata = {
  title: 'Nuestro Manifiesto | Dominios de Lujo',
  description: 'El Manifiesto del Lujo de Dominios de Lujo — donde el lujo tiene voz propia.',
};

export default function ManifestoPage() {
  return (
    <main>
      <Manifesto />
    </main>
  );
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd /Users/silviacastro/Desktop/dominiosdelujo-app && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/manifiesto/page.tsx
git commit -m "feat: add /manifiesto dedicated page"
```

---

## Task 4: Create /lujototal page

**Files:**
- Create: `app/lujototal/page.tsx`

- [ ] **Step 1: Create `app/lujototal/page.tsx`**

```tsx
import LujoTotal from '@/components/home/LujoTotal';

export const metadata = {
  title: 'Certificación LujoTotal™ | Dominios de Lujo',
  description: 'LujoTotal™ es el sello de certificación oficial de Dominios de Lujo — garantía de excelencia editorial en el sector premium en español.',
};

export default function LujoTotalPage() {
  return (
    <main>
      <LujoTotal />
    </main>
  );
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd /Users/silviacastro/Desktop/dominiosdelujo-app && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/lujototal/page.tsx
git commit -m "feat: add /lujototal dedicated page"
```

---

## Task 5: Update homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the contents of `app/page.tsx`**

Write the full file:

```tsx
import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import CategoryTeaser from '@/components/home/CategoryTeaser';
import HomeSectionLink from '@/components/home/HomeSectionLink';
import ServicesGrid from '@/components/home/ServicesGrid';
import PartnerValue from '@/components/home/PartnerValue';
import CollaborateTeaser from '@/components/home/CollaborateTeaser';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <CategoryTeaser />
      <HomeSectionLink labelKey="home.manifestoLink" href="/manifiesto" />
      <ServicesGrid />
      <PartnerValue />
      <HomeSectionLink labelKey="home.lujototalLink" href="/lujototal" />
      <CollaborateTeaser />
    </>
  );
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd /Users/silviacastro/Desktop/dominiosdelujo-app && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify visually in the browser**

```bash
npm run dev
```

Open `http://localhost:3000` and confirm:
- Manifesto section is gone from homepage; "Learn our Luxury Manifesto →" link appears in its place
- LujoTotal section is gone from homepage; "About LujoTotal™ Certification →" link appears in its place
- PaginasSpotlight section is gone with no replacement
- Navigating to `http://localhost:3000/manifiesto` shows the full Manifesto component with audio player
- Navigating to `http://localhost:3000/lujototal` shows the LujoTotal certification section
- Toggle language — Spanish keys render correctly on both homepage links and new pages
- Arrow (→) appears in gold on the link rows; text in muted ink colour; hover darkens text

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: replace Manifesto/LujoTotal/PaginasSpotlight on homepage with slim nav links"
```
