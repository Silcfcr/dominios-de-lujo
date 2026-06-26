# Homepage Mobile + ADA Sweep Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix mobile responsiveness gaps, font-size inconsistency, focus-visible accessibility, prefers-reduced-motion, and broken aria-label across the homepage.

**Architecture:** Three ordered passes — (1) global CSS foundations, (2) per-component CSS modules, (3) TSX + i18n attribute fixes. Each pass is self-contained and commits separately.

**Tech Stack:** Next.js 16 static export, CSS Modules, TypeScript, client-side i18n via React context.

## Global Constraints

- No test suite exists. Verification = `npx tsc --noEmit` (zero errors) + manual browser checks at specified widths.
- No inline styles. All style changes go in `.module.css` files or `app/globals.css`.
- Never use em dashes in any content or comments.
- No Tailwind. Do not add new npm packages.
- All translation strings must exist in both `lib/i18n/es.json` and `lib/i18n/en.json` before use. (The one key used in Pass 3 already exists in both files.)
- Run `npm run build` at the end to confirm static export succeeds.

---

## File Map

| File | Task | Change |
|------|------|--------|
| `app/globals.css` | 1 | Focus-visible on buttons/links, prefers-reduced-motion for reveals, 480px section padding |
| `components/home/Hero.module.css` | 2 | prefers-reduced-motion stops Ken Burns + crossfade |
| `components/home/Ticker.module.css` | 2 | prefers-reduced-motion stops scroll, 480px item padding |
| `components/home/CategoryTeaser.module.css` | 3 | 480px breakpoint for stage, navBtn, info, body |
| `components/home/BrandsGrid.module.css` | 3 | 600px breakpoint for 1-col grid |
| `components/home/ConfianzaCredibilidad.module.css` | 3 | Move pillars breakpoint from 768px to 900px |
| `components/home/AffiliateEditorial.module.css` | 3 | 480px stats reflow to vertical |
| `components/home/PorQueNosotros.module.css` | 4 | `.body` font-size 15px at 768px |
| `components/home/CollaborateTeaser.module.css` | 4 | `.subtitle` font-size 15px at 768px |
| `components/home/CategoryTeaser.tsx` | 5 | aria-label uses translation key instead of hardcoded string |
| `lib/i18n/context.tsx` | 5 | useEffect syncs `document.documentElement.lang` on language change |

---

## Task 1: globals.css — Focus, Motion, and Padding Foundations

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `.btn-dark:focus-visible`, `.btn-outline:focus-visible`, `.btn-gold:focus-visible`, `a:focus-visible`, `button:focus-visible` — gold outline 2px / offset 3px. Used by every interactive element site-wide.
- Produces: `@media (prefers-reduced-motion: reduce)` block targeting `.reveal`, `.reveal2`, `.reveal3` — used by `RevealWrapper` throughout all pages.
- Produces: `@media (max-width: 480px)` for `.sec` and `.sec-sm` — used as section padding on every homepage section.

- [ ] **Step 1: Add focus-visible base reset**

  In `app/globals.css`, directly after the existing `button { ... }` reset block (ends around line 58), add:

  ```css
  button:focus-visible,
  a:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 3px;
  }
  ```

- [ ] **Step 2: Add focus-visible to each button utility class**

  After each button class's existing `:hover` rule, add a `:focus-visible` rule:

  After `.btn-dark:hover { background: var(--gold); }` add:
  ```css
  .btn-dark:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
  ```

  After `.btn-outline:hover { border-color: var(--ink); }` add:
  ```css
  .btn-outline:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
  ```

  After `.btn-gold:hover { background: var(--glt); }` add:
  ```css
  .btn-gold:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
  ```

- [ ] **Step 3: Add prefers-reduced-motion block for reveal animations**

  After the existing `.reveal3.vis { ... }` block (ends around line 87), add:

  ```css
  @media (prefers-reduced-motion: reduce) {
    .reveal,
    .reveal2,
    .reveal3 {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
  ```

- [ ] **Step 4: Add 480px section padding override**

  After the existing `@media (max-width: 768px)` block at the bottom of the file, add:

  ```css
  @media (max-width: 480px) {
    .sec    { padding: 48px 20px; }
    .sec-sm { padding: 40px 20px; }
  }
  ```

- [ ] **Step 5: Type-check**

  ```bash
  npx tsc --noEmit
  ```

  Expected: zero errors.

- [ ] **Step 6: Quick browser smoke-test**

  Start the dev server (`npm run dev`), open `localhost:3000`, press Tab. Confirm every button and nav link shows a gold outline when focused. Enable "Reduce Motion" in macOS System Settings > Accessibility > Display and reload — confirm page sections appear immediately without fading up.

- [ ] **Step 7: Commit**

  ```bash
  git add app/globals.css
  git commit -m "fix: add focus-visible, prefers-reduced-motion, and 480px section padding to globals"
  ```

---

## Task 2: Animation-Specific Component CSS (Hero + Ticker)

**Files:**
- Modify: `components/home/Hero.module.css`
- Modify: `components/home/Ticker.module.css`

**Interfaces:**
- Produces: Hero slides and Ken Burns effect are motion-free under prefers-reduced-motion.
- Produces: Ticker auto-scroll stops under prefers-reduced-motion; item padding is tighter on 480px phones.

- [ ] **Step 1: Add prefers-reduced-motion to Hero.module.css**

  At the very end of `components/home/Hero.module.css`, after the existing `@media (max-width: 480px)` block, add:

  ```css
  @media (prefers-reduced-motion: reduce) {
    .slide { transition: none; }
    .img   { transition: none; transform: none; }
  }
  ```

- [ ] **Step 2: Add prefers-reduced-motion and 480px rules to Ticker.module.css**

  At the very end of `components/home/Ticker.module.css`, after the existing `@keyframes tick` block, add:

  ```css
  @media (prefers-reduced-motion: reduce) {
    .track { animation: none; }
  }

  @media (max-width: 480px) {
    .item { padding: 0 16px; }
  }
  ```

- [ ] **Step 3: Type-check**

  ```bash
  npx tsc --noEmit
  ```

  Expected: zero errors.

- [ ] **Step 4: Visual verify**

  With "Reduce Motion" still enabled in System Settings, reload `localhost:3000`. Confirm:
  - The hero image does not zoom (Ken Burns effect stopped).
  - The ticker bar is visible but not scrolling.
  - With "Reduce Motion" off, both animations run normally.
  - At 480px width (DevTools responsive mode), the ticker items are less padded and text fits without overflow.

- [ ] **Step 5: Commit**

  ```bash
  git add components/home/Hero.module.css components/home/Ticker.module.css
  git commit -m "fix: stop hero Ken Burns and ticker auto-scroll under prefers-reduced-motion; tighten ticker at 480px"
  ```

---

## Task 3: Mobile Layout Fixes (CategoryTeaser, BrandsGrid, ConfianzaCredibilidad, AffiliateEditorial)

**Files:**
- Modify: `components/home/CategoryTeaser.module.css`
- Modify: `components/home/BrandsGrid.module.css`
- Modify: `components/home/ConfianzaCredibilidad.module.css`
- Modify: `components/home/AffiliateEditorial.module.css`

**Interfaces:**
- Produces: CategoryTeaser carousel is usable at 320–480px with a shorter stage and smaller nav buttons.
- Produces: BrandsGrid shows 1-col at 600px and below.
- Produces: ConfianzaCredibilidad pillars stack to 1-col at 900px instead of 768px (avoids cramped 3-col on tablets).
- Produces: AffiliateEditorial stats reflow to vertical stack at 480px.

- [ ] **Step 1: CategoryTeaser — add 480px breakpoint**

  At the end of `components/home/CategoryTeaser.module.css`, after the existing `@media (max-width: 768px)` block, add:

  ```css
  @media (max-width: 480px) {
    .stage  { height: 320px; }
    .navBtn { width: 32px; height: 32px; font-size: 18px; }
    .info   { padding: 16px; }
    .body   { font-size: 14px; }
  }
  ```

- [ ] **Step 2: BrandsGrid — add 600px single-column breakpoint**

  At the end of `components/home/BrandsGrid.module.css`, after the existing `@media (max-width: 900px)` block, add:

  ```css
  @media (max-width: 600px) {
    .grid { grid-template-columns: 1fr; }
    .card { padding: 32px 20px; }
  }
  ```

- [ ] **Step 3: ConfianzaCredibilidad — move breakpoint from 768px to 900px**

  In `components/home/ConfianzaCredibilidad.module.css`, find the existing rule:

  ```css
  @media (max-width: 768px) {
    .pillars {
      grid-template-columns: 1fr;
    }
  }
  ```

  Change `768px` to `900px`:

  ```css
  @media (max-width: 900px) {
    .pillars {
      grid-template-columns: 1fr;
    }
  }
  ```

- [ ] **Step 4: AffiliateEditorial — add 480px stats vertical reflow**

  At the end of `components/home/AffiliateEditorial.module.css`, after the existing `@media (max-width: 900px)` block, add:

  ```css
  @media (max-width: 480px) {
    .stats            { flex-direction: column; border-top: none; border-bottom: none; }
    .stat             { padding: 16px 0; border-bottom: 1px solid rgba(226, 207, 160, 0.14); }
    .stat:first-child { border-top: 1px solid rgba(226, 207, 160, 0.14); }
    .stat + .stat     { border-left: none; }
  }
  ```

- [ ] **Step 5: Type-check**

  ```bash
  npx tsc --noEmit
  ```

  Expected: zero errors.

- [ ] **Step 6: Visual verify at key widths**

  In DevTools responsive mode, check `localhost:3000` at these widths:

  - **360px**: CategoryTeaser stage is 320px tall, nav buttons are 32px, fits without overflow. BrandsGrid is 1-col. AffiliateEditorial stats stack vertically with top/bottom borders.
  - **700px**: BrandsGrid is still 2-col (900px breakpoint). ConfianzaCredibilidad pillars are now 1-col (moved from 768px to 900px threshold).
  - **850px**: ConfianzaCredibilidad pillars are 1-col (no more cramped 3-col on tablets).
  - **1024px**: All sections match the original desktop design — no regressions.

- [ ] **Step 7: Commit**

  ```bash
  git add components/home/CategoryTeaser.module.css components/home/BrandsGrid.module.css components/home/ConfianzaCredibilidad.module.css components/home/AffiliateEditorial.module.css
  git commit -m "fix: mobile layout gaps in CategoryTeaser, BrandsGrid, ConfianzaCredibilidad, AffiliateEditorial"
  ```

---

## Task 4: Font Size Scaling (PorQueNosotros + CollaborateTeaser)

**Files:**
- Modify: `components/home/PorQueNosotros.module.css`
- Modify: `components/home/CollaborateTeaser.module.css`

**Interfaces:**
- Produces: `.body` in PorQueNosotros scales from 17px to 15px at 768px and below.
- Produces: `.subtitle` in CollaborateTeaser scales from 17px to 15px at 768px and below.

- [ ] **Step 1: PorQueNosotros — add .body size to existing 768px block**

  In `components/home/PorQueNosotros.module.css`, find the existing 768px block:

  ```css
  @media (max-width: 768px) {
    .featGrid {
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
    }
  }
  ```

  Add `.body` font-size inside that same block:

  ```css
  @media (max-width: 768px) {
    .featGrid {
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
    }
    .body { font-size: 15px; }
  }
  ```

- [ ] **Step 2: CollaborateTeaser — add .subtitle size at 768px**

  At the end of `components/home/CollaborateTeaser.module.css`, after the existing `@media (max-width: 900px)` block, add:

  ```css
  @media (max-width: 768px) {
    .subtitle { font-size: 15px; }
  }
  ```

- [ ] **Step 3: Type-check**

  ```bash
  npx tsc --noEmit
  ```

  Expected: zero errors.

- [ ] **Step 4: Visual verify**

  At 768px width in DevTools, confirm:
  - The PorQueNosotros introductory paragraph text is visibly smaller than the 1024px desktop view.
  - The CollaborateTeaser subtitle text is visibly smaller than the 1024px desktop view.
  - Both remain fully readable (not cramped).

- [ ] **Step 5: Commit**

  ```bash
  git add components/home/PorQueNosotros.module.css components/home/CollaborateTeaser.module.css
  git commit -m "fix: scale body/subtitle font sizes down at 768px in PorQueNosotros and CollaborateTeaser"
  ```

---

## Task 5: TSX + i18n ADA Fixes

**Files:**
- Modify: `components/home/CategoryTeaser.tsx` (line 132)
- Modify: `lib/i18n/context.tsx`

**Interfaces:**
- Consumes: `t('categoryTeaser.nextAriaLabel')` — already defined in both `lib/i18n/es.json` ("Siguiente categoría") and `lib/i18n/en.json` ("Next category"). No JSON changes needed.
- Produces: CategoryTeaser "next" button exposes a translated accessible label to screen readers.
- Produces: `<html lang>` attribute on the document root updates in real time when the user switches language.

- [ ] **Step 1: Fix CategoryTeaser hardcoded aria-label**

  Open `components/home/CategoryTeaser.tsx`. Find line 132:

  ```tsx
  aria-label="Next category"
  ```

  Replace with:

  ```tsx
  aria-label={t('categoryTeaser.nextAriaLabel')}
  ```

  No other changes to this file. The `t` function is already imported and in scope on this line (the previous button on line ~93 already uses `t('categoryTeaser.prevAriaLabel')`).

- [ ] **Step 2: Add lang sync to I18nProvider**

  Open `lib/i18n/context.tsx`. Find the existing `useEffect` that reads from localStorage (around line 27):

  ```tsx
  useEffect(() => {
    const stored = localStorage.getItem('ddl-lang') as Lang | null;
    if (stored === 'es' || stored === 'en') setLangState(stored);
  }, []);
  ```

  Add a second `useEffect` directly after it that syncs the HTML lang attribute:

  ```tsx
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);
  ```

  No other changes to this file. The import line already includes `useEffect`.

- [ ] **Step 3: Type-check**

  ```bash
  npx tsc --noEmit
  ```

  Expected: zero errors.

- [ ] **Step 4: Verify aria-label**

  In the browser at `localhost:3000`, open DevTools Elements panel and inspect the "next" arrow button in the CategoryTeaser section. Confirm the `aria-label` attribute reads "Siguiente categoría" in Spanish mode and "Next category" in English mode (toggle language via the site's language toggle to verify both).

- [ ] **Step 5: Verify lang attribute sync**

  With DevTools Elements panel open, inspect the `<html>` element. Toggle the site language. Confirm `lang` attribute changes from `es` to `en` and back in real time without a page reload.

- [ ] **Step 6: Commit**

  ```bash
  git add components/home/CategoryTeaser.tsx lib/i18n/context.tsx
  git commit -m "fix: translate CategoryTeaser next-button aria-label; sync html lang attribute on language toggle"
  ```

---

## Task 6: Final Build Verification

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

  Using `npm run dev` at `localhost:3000`, walk through this checklist at each specified viewport width (use DevTools responsive mode):

  **320px**
  - No horizontal scroll on any section
  - BrandsGrid: single column
  - CategoryTeaser stage height ~320px, nav buttons fit
  - AffiliateEditorial stats: vertical stack with dividing lines

  **480px**
  - Section padding is 48px top/bottom, 20px sides
  - Ticker items not crowded
  - PorQueNosotros feat grid: single column

  **768px**
  - BrandsGrid: 2 columns
  - PorQueNosotros body text visibly smaller than desktop
  - CollaborateTeaser subtitle visibly smaller than desktop
  - ConfianzaCredibilidad pillars: single column

  **900px**
  - ConfianzaCredibilidad pillars: single column (not 3-col)
  - CollaborateTeaser grid: single column

  **1280px**
  - All sections match original desktop design, no regressions

  **Keyboard navigation (any width)**
  - Tab through all buttons and links: each shows gold outline on focus
  - CategoryTeaser next/prev buttons: gold outline on focus

  **Reduced motion (enable in macOS System Settings > Accessibility > Display)**
  - Page sections appear at full opacity immediately on load
  - Ticker bar is static (not scrolling)
  - Hero image does not zoom

  **Language toggle**
  - Switch to English: `<html lang>` changes to `en` in DevTools Elements
  - Switch back to Spanish: `<html lang>` changes to `es`

- [ ] **Step 4: Final commit (if any last-minute fixes were made)**

  Only needed if step 3 revealed issues fixed inline.

  ```bash
  git add <changed files>
  git commit -m "fix: final responsive and ADA corrections from verification sweep"
  ```
