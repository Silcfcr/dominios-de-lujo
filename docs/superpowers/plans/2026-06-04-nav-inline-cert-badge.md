# Nav Inline Cert Badge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the LujoTotal™ cert image (`lujo-total.webp`) to the right of the "DOMINIOS DE LUJO" wordmark in the nav bar's Row 1, linking to `/nosotros#lujototal`.

**Architecture:** Wrap the existing wordmark `<Link>` in a flex `<div>` alongside a new cert image `<Link>`. Two new CSS rules handle layout and hover. The floating `FloatingCertBadge` in `app/layout.tsx` is left untouched.

**Tech Stack:** Next.js (App Router, static export), React, CSS Modules, `next/image`

---

## File Map

| File | Change |
|---|---|
| `components/layout/Nav.tsx` | Wrap wordmark `<Link>` + add cert image `<Link>` in a flex `<div>` |
| `components/layout/Nav.module.css` | Add `.wordmarkGroup`, `.certBadge`, and `.certBadge:hover` rules + mobile override |

---

### Task 1: Add CSS rules for the wordmark group and cert badge

**Files:**
- Modify: `components/layout/Nav.module.css`

- [ ] **Step 1: Open `Nav.module.css` and append the new rules after the existing `.wordmark` rule**

The `.wordmark` rule ends around line 39. Append immediately after the closing `}` of `.wordmark` (before the `.r1Right` rule):

```css
.wordmarkGroup {
  display: flex;
  align-items: center;
  gap: 10px;
}

.certBadge {
  display: flex;
  align-items: center;
  opacity: 0.85;
  transition: transform 0.2s, opacity 0.2s;
}

.certBadge:hover {
  transform: scale(1.1);
  opacity: 1;
}
```

Also append a mobile override inside the existing `@media (max-width: 768px)` block (which starts around line 273). Add inside that block:

```css
  .certBadge img {
    width: 22px !important;
    height: 22px !important;
  }
```

- [ ] **Step 2: Verify TypeScript compiles with no errors**

```bash
npx tsc --noEmit
```

Expected: no output (zero errors).

- [ ] **Step 3: Commit**

```bash
git add components/layout/Nav.module.css
git commit -m "style: add wordmarkGroup and certBadge CSS for inline cert in nav"
```

---

### Task 2: Update Nav.tsx to render cert image next to wordmark

**Files:**
- Modify: `components/layout/Nav.tsx`

- [ ] **Step 1: Locate the wordmark `<Link>` in Nav.tsx**

It is around line 45:

```tsx
<Link href="/" className={styles.wordmark}>
  DOMINIOS DE LUJO
</Link>
```

- [ ] **Step 2: Replace it with the flex wrapper containing wordmark + cert image**

```tsx
<div className={styles.wordmarkGroup}>
  <Link href="/" className={styles.wordmark}>
    DOMINIOS DE LUJO
  </Link>
  <Link
    href="/nosotros#lujototal"
    className={styles.certBadge}
    aria-label="LujoTotal™ certified"
  >
    <Image
      src={assetPath('/images/lujo-total.webp')}
      alt="LujoTotal™"
      width={28}
      height={28}
      style={{ objectFit: 'contain' }}
    />
  </Link>
</div>
```

`assetPath` and `Image` are already imported at the top of `Nav.tsx` — no new imports needed.

- [ ] **Step 3: Verify TypeScript compiles with no errors**

```bash
npx tsc --noEmit
```

Expected: no output (zero errors).

- [ ] **Step 4: Start the dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` in the browser. Confirm:
- "DOMINIOS DE LUJO" wordmark appears with the cert image to its right, vertically centered in the nav bar.
- Hovering the cert image produces a slight scale-up.
- Clicking the cert image navigates to `/nosotros#lujototal`.
- The floating badge in the bottom-right corner is still present.
- On a narrow viewport (≤ 768 px) the cert image renders at roughly 22 × 22 px and doesn't break the mobile nav layout.

- [ ] **Step 5: Commit**

```bash
git add components/layout/Nav.tsx
git commit -m "feat: add inline LujoTotal cert badge next to nav wordmark"
```
