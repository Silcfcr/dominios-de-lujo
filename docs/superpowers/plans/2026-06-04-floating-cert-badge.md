# Floating LujoTotal Certification Badge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fixed-position, sitewide LujoTotal™ certification badge in the bottom-right corner that scales subtly on hover and links to `/nosotros#lujototal`.

**Architecture:** A new Server Component `FloatingCertBadge` in `components/ui/` renders a `<Link>` wrapping a `next/image`, styled with a co-located CSS Module. It is mounted once in `app/layout.tsx` inside `<I18nProvider>`, after `<Footer>`.

**Tech Stack:** Next.js 16 App Router, CSS Modules, `next/image`, `next/link`

---

### Task 1: Create FloatingCertBadge CSS Module

**Files:**
- Create: `components/ui/FloatingCertBadge.module.css`

- [ ] **Step 1: Create the CSS module**

Create `components/ui/FloatingCertBadge.module.css`:

```css
.badge {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 50;
  display: block;
  transition: transform 220ms ease, filter 220ms ease;
}

.badge:hover {
  transform: scale(1.17);
  filter: drop-shadow(0 4px 12px rgba(176, 138, 58, 0.35));
}

@media (max-width: 768px) {
  .badge {
    bottom: 20px;
    right: 20px;
  }

  .badge img {
    width: 56px !important;
    height: auto !important;
  }
}
```

The `!important` overrides the inline `width`/`height` that `next/image` applies; this works because `images.unoptimized: true` in `next.config.ts` renders a plain `<img>`.

- [ ] **Step 2: Commit**

```bash
git add components/ui/FloatingCertBadge.module.css
git commit -m "feat: add FloatingCertBadge CSS module"
```

---

### Task 2: Create FloatingCertBadge component

**Files:**
- Create: `components/ui/FloatingCertBadge.tsx`

- [ ] **Step 1: Create the component**

Create `components/ui/FloatingCertBadge.tsx`:

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { assetPath } from '@/lib/assetPath';
import styles from './FloatingCertBadge.module.css';

export default function FloatingCertBadge() {
  return (
    <Link href="/nosotros#lujototal" className={styles.badge}>
      <Image
        src={assetPath('/images/lujo-total.webp')}
        alt="LujoTotal™ certification"
        width={72}
        height={72}
        style={{ objectFit: 'contain' }}
      />
    </Link>
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
git add components/ui/FloatingCertBadge.tsx
git commit -m "feat: add FloatingCertBadge component"
```

---

### Task 3: Mount in root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add import and render FloatingCertBadge after Footer**

In `app/layout.tsx`, add the import line alongside the other component imports:

```tsx
import FloatingCertBadge from '@/components/ui/FloatingCertBadge';
```

Then add `<FloatingCertBadge />` after `<Footer />` inside `<I18nProvider>`:

```tsx
<I18nProvider>
  <Nav />
  <main style={{ paddingTop: '136px' }}>{children}</main>
  <Footer />
  <FloatingCertBadge />
</I18nProvider>
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify in browser**

With `npm run dev` running, open http://localhost:3000. Confirm:
- Badge appears fixed in the bottom-right on every page
- Hovering scales it up with a warm gold drop shadow
- Clicking navigates to `/nosotros#lujototal`
- On a ≤768px viewport, badge sits at `bottom: 20px; right: 20px` and renders smaller

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: mount FloatingCertBadge in root layout"
```
