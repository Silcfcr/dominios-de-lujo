# Brands Page Mobile + ADA Sweep Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix mobile font-size inconsistency and missing small-phone breakpoints across the brands page CSS modules.

**Architecture:** Two passes — (1) `app/brands/page.module.css` for the page-level stat number scaling, (2) all five `components/brands/` CSS modules for missing breakpoints and font-size reductions. Global fixes (focus-visible, prefers-reduced-motion, 480px section padding) were already shipped in the homepage sweep and apply automatically.

**Tech Stack:** Next.js 16 static export, CSS Modules.

## Global Constraints

- No inline styles. All style changes go in `.module.css` files.
- No em dashes in any content or comments.
- No Tailwind. Do not add new npm packages.
- Run `npx tsc --noEmit` to verify zero TypeScript errors before committing.
- Run `npm run build` at the end to confirm static export succeeds.

---

## File Map

| File | Task | Change |
|------|------|--------|
| `app/brands/page.module.css` | 1 | `.statNum` clamp, `.statLabel` 11px |
| `components/brands/BrandsCapacidades.module.css` | 2 | 480px card padding |
| `components/brands/BrandsComoFunciona.module.css` | 2 | `.stepNum` 28px at 768px, 480px step spacing |
| `components/brands/BrandsParaQuienEs.module.css` | 2 | 768px `.body` font-size |
| `components/brands/BrandsCta.module.css` | 2 | 768px `.subtitle` + `.body` font-sizes |
| `components/brands/BrandsFaq.module.css` | 2 | 480px `.question` font-size + `.item` padding |

---

## Task 1: page.module.css — Stat Number Scaling

**Files:**
- Modify: `app/brands/page.module.css`

**Interfaces:**
- Produces: `.statNum` scales responsively between 28px and 40px; `.statLabel` is 11px base.

- [ ] **Step 1: Change `.statNum` to use clamp()**

  In `app/brands/page.module.css`, find the `.statNum` rule (around line 79):

  ```css
  .statNum {
    font-family: var(--fd);
    font-size: 40px;
    font-weight: 300;
    color: var(--gold);
    line-height: 1;
  }
  ```

  Change `font-size: 40px;` to `font-size: clamp(28px, 3.5vw, 40px);`:

  ```css
  .statNum {
    font-family: var(--fd);
    font-size: clamp(28px, 3.5vw, 40px);
    font-weight: 300;
    color: var(--gold);
    line-height: 1;
  }
  ```

- [ ] **Step 2: Raise `.statLabel` to 11px**

  In `app/brands/page.module.css`, find the `.statLabel` rule (around line 87):

  ```css
  .statLabel {
    font-family: var(--fd);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink3);
  }
  ```

  Change `font-size: 10px;` to `font-size: 11px;`:

  ```css
  .statLabel {
    font-family: var(--fd);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink3);
  }
  ```

- [ ] **Step 3: Type-check**

  ```bash
  npx tsc --noEmit
  ```

  Expected: zero errors.

- [ ] **Step 4: Visual verify**

  Start `npm run dev`, open `localhost:3000/brands`. At 480px width in DevTools, confirm the stat numbers scale down smoothly and the stat labels are legible (not tiny). At 1280px, confirm stats still display at 40px max.

- [ ] **Step 5: Commit**

  ```bash
  git add app/brands/page.module.css
  git commit -m "fix: responsive statNum clamp and raise statLabel to 11px on brands page"
  ```

---

## Task 2: Component CSS Modules — Missing Breakpoints

**Files:**
- Modify: `components/brands/BrandsCapacidades.module.css`
- Modify: `components/brands/BrandsComoFunciona.module.css`
- Modify: `components/brands/BrandsParaQuienEs.module.css`
- Modify: `components/brands/BrandsCta.module.css`
- Modify: `components/brands/BrandsFaq.module.css`

**Interfaces:**
- Produces: all five components have appropriate font-size reductions at 768px and tighter padding/spacing at 480px.

- [ ] **Step 1: BrandsCapacidades — add 480px card padding**

  At the end of `components/brands/BrandsCapacidades.module.css`, after the existing `@media (max-width: 768px)` block, add:

  ```css
  @media (max-width: 480px) {
    .card { padding: 24px 16px; }
  }
  ```

- [ ] **Step 2: BrandsComoFunciona — scale stepNum and add 480px**

  In `components/brands/BrandsComoFunciona.module.css`, find the existing `@media (max-width: 768px)` block:

  ```css
  @media (max-width: 768px) {
    .steps {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }
  ```

  Add `.stepNum` font-size inside that same block:

  ```css
  @media (max-width: 768px) {
    .steps {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .stepNum { font-size: 28px; }
  }
  ```

  Then add a 480px block at the end of the file:

  ```css
  @media (max-width: 480px) {
    .step  { gap: 16px; }
    .steps { gap: 24px; }
  }
  ```

- [ ] **Step 3: BrandsParaQuienEs — add 768px body font-size**

  At the end of `components/brands/BrandsParaQuienEs.module.css` (currently has no media queries), add:

  ```css
  @media (max-width: 768px) {
    .body { font-size: 15px; }
  }
  ```

- [ ] **Step 4: BrandsCta — add 768px font-size reductions**

  At the end of `components/brands/BrandsCta.module.css` (currently has no media queries), add:

  ```css
  @media (max-width: 768px) {
    .subtitle { font-size: 15px; }
    .body     { font-size: 15px; }
  }
  ```

- [ ] **Step 5: BrandsFaq — add 480px question size and item padding**

  At the end of `components/brands/BrandsFaq.module.css`, after the existing `@media (max-width: 768px)` block, add:

  ```css
  @media (max-width: 480px) {
    .question { font-size: 15px; }
    .item     { padding: 20px 16px; }
  }
  ```

- [ ] **Step 6: Type-check**

  ```bash
  npx tsc --noEmit
  ```

  Expected: zero errors.

- [ ] **Step 7: Visual verify at key widths**

  At `localhost:3000/brands` in DevTools responsive mode:

  - **360px**: BrandsCapacidades cards have reduced padding. BrandsComoFunciona steps have tighter gap. BrandsFaq items have reduced padding and smaller question text.
  - **480px**: Same as above, no horizontal overflow in any section.
  - **768px**: BrandsParaQuienEs body text visibly smaller than desktop. BrandsCta subtitle and body visibly smaller than desktop.
  - **1280px**: All sections match original desktop design — no regressions.

- [ ] **Step 8: Commit**

  ```bash
  git add components/brands/BrandsCapacidades.module.css components/brands/BrandsComoFunciona.module.css components/brands/BrandsParaQuienEs.module.css components/brands/BrandsCta.module.css components/brands/BrandsFaq.module.css
  git commit -m "fix: add missing mobile breakpoints to brands page component CSS modules"
  ```

---

## Task 3: Final Build Verification

**Files:** None modified.

- [ ] **Step 1: Full TypeScript check**

  ```bash
  npx tsc --noEmit
  ```

  Expected: zero errors.

- [ ] **Step 2: Production build**

  ```bash
  npm run build
  ```

  Expected: build completes with no errors, `out/` directory updated.

- [ ] **Step 3: End-to-end browser sweep**

  At `localhost:3000/brands` check these widths in DevTools responsive mode:

  **360px**
  - No horizontal scroll on any section
  - Stat numbers are smaller than desktop (clamp working)
  - Stat labels are legible (11px, uppercase, letter-spaced)
  - BrandsCapacidades cards: reduced padding, no content clipping
  - BrandsComoFunciona steps: tighter gap, stepNum is 28px
  - BrandsFaq items: reduced padding, question at 15px

  **768px**
  - BrandsParaQuienEs body text: 15px (smaller than 17px desktop)
  - BrandsCta subtitle and body: 15px (smaller than desktop)

  **1280px**
  - All sections match original desktop design
  - Stat numbers display at full 40px max
  - Stat labels at 11px (one pixel up from original 10px, barely noticeable)
