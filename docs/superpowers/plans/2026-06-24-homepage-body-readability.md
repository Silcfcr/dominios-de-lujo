# Homepage Desktop Body Readability Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Raise all running body copy on the homepage to a 16px minimum on desktop and fix two WCAG contrast failures on dark-background sections.

**Architecture:** Pure CSS Modules surgery — one property change per selector, no structural changes, no TSX edits. Each task modifies a single `.module.css` file and commits independently. The dev server stays running throughout for visual verification.

**Tech Stack:** Next.js 16 static export, CSS Modules (`.module.css` co-located with each component).

## Global Constraints

- No inline styles. All style changes go in `.module.css` files.
- No em dashes in any content or comments.
- No Tailwind. Do not add new npm packages.
- Run `npx tsc --noEmit` before the final commit to confirm zero TypeScript errors.
- Run `npm run build` at the end to confirm static export succeeds.

---

## File Map

| File | Change |
|------|--------|
| `components/home/Hero.module.css` | `.kvp` font-size 14px → 16px |
| `components/home/Manifesto.module.css` | `.para` font-size 14px → 16px, color opacity 0.55 → 0.72; `.paraCoda` font-size 14px → 15px |
| `components/home/CategoryTeaser.module.css` | `.phrase` font-size 14px → 15px |
| `components/home/BrandsGrid.module.css` | `.desc` font-size 14px → 15px |
| `components/home/PorQueNosotros.module.css` | `.featDesc` font-size 13px → 15px |
| `components/home/ConfianzaCredibilidad.module.css` | `.pillarDesc` font-size 13px → 15px |
| `components/home/AffiliateEditorial.module.css` | `.statLabel` font-size 11px → 12px, color opacity 0.45 → 0.65; mobile override 10px → 11px |

---

## Task 1: Hero — kvp paragraph font size

**Files:**
- Modify: `components/home/Hero.module.css` (around line 49)

**Interfaces:**
- Produces: `.kvp` renders at 16px on desktop instead of 14px

- [ ] **Step 1: Start the dev server (keep it running for all tasks)**

  ```bash
  npm run dev
  ```

  Open `http://localhost:3000` in the browser. Leave this tab open.

- [ ] **Step 2: Apply the change**

  In `components/home/Hero.module.css`, find the `.kvp` rule:

  ```css
  .kvp {
    font-family: var(--fb);
    font-size: 14px;
    line-height: 1.85;
    color: var(--ink2);
    margin-bottom: 40px;
  }
  ```

  Change `font-size: 14px;` to `font-size: 16px;`:

  ```css
  .kvp {
    font-family: var(--fb);
    font-size: 16px;
    line-height: 1.85;
    color: var(--ink2);
    margin-bottom: 40px;
  }
  ```

- [ ] **Step 3: Visual verify**

  At `localhost:3000` with DevTools at 1280px width: the introductory paragraph in the Hero (the short paragraph below the heading, above the CTA buttons) should visibly larger and more comfortable to read than before. At 480px width it should still fit within the hero layout without overflowing.

- [ ] **Step 4: Commit**

  ```bash
  git add components/home/Hero.module.css
  git commit -m "fix: raise hero kvp body copy from 14px to 16px for desktop readability"
  ```

---

## Task 2: Manifesto — paragraph size and contrast

**Files:**
- Modify: `components/home/Manifesto.module.css` (around lines 147 and 167)

**Interfaces:**
- Produces: `.para` renders at 16px with a legible off-white color (opacity 0.72, up from 0.55, now WCAG AA compliant on dark background); `.paraCoda` renders at 15px

- [ ] **Step 1: Apply the `.para` size and contrast fix**

  In `components/home/Manifesto.module.css`, find the `.para` rule:

  ```css
  .para {
    font-family: var(--fb);
    font-size: 14px;
    line-height: 2;
    color: rgba(250, 247, 242, 0.55);
    white-space: pre-line;
    text-align: left;

    opacity: 0;
    transform: translateY(14px);
    transition:
      opacity 0.9s calc(var(--i) * 0.35s) ease,
      transform 0.9s calc(var(--i) * 0.35s) ease;
  }
  ```

  Change `font-size: 14px;` to `font-size: 16px;` and `color: rgba(250, 247, 242, 0.55);` to `color: rgba(250, 247, 242, 0.72);`:

  ```css
  .para {
    font-family: var(--fb);
    font-size: 16px;
    line-height: 2;
    color: rgba(250, 247, 242, 0.72);
    white-space: pre-line;
    text-align: left;

    opacity: 0;
    transform: translateY(14px);
    transition:
      opacity 0.9s calc(var(--i) * 0.35s) ease,
      transform 0.9s calc(var(--i) * 0.35s) ease;
  }
  ```

  Note: the `opacity: 0` / `opacity: 1` on the element itself is the fade-in animation; it is unrelated to the `color` alpha and must not be changed.

- [ ] **Step 2: Apply the `.paraCoda` size fix**

  In the same file, find the `.paraCoda` rule:

  ```css
  .paraCoda {
    font-family: var(--fd);
    font-size: 14px;
    font-style: italic;
    color: var(--glt);
    letter-spacing: 0.03em;
    line-height: 1.7;
    text-align: left;
  }
  ```

  Change `font-size: 14px;` to `font-size: 15px;`:

  ```css
  .paraCoda {
    font-family: var(--fd);
    font-size: 15px;
    font-style: italic;
    color: var(--glt);
    letter-spacing: 0.03em;
    line-height: 1.7;
    text-align: left;
  }
  ```

- [ ] **Step 3: Visual verify**

  At `localhost:3000` scroll to the dark Manifesto section. Click the play button or wait for the text to reveal. The main paragraphs should be clearly legible (no longer dim and cramped). The closing gold italic line should be slightly larger but still visually subordinate to the main paragraphs.

  Open DevTools Accessibility panel, click any `.para` element, and confirm the contrast ratio shows passing AA (should be approximately 12:1).

- [ ] **Step 4: Commit**

  ```bash
  git add components/home/Manifesto.module.css
  git commit -m "fix: raise manifesto body copy to 16px and fix dark-bg contrast opacity 0.55 to 0.72"
  ```

---

## Task 3: CategoryTeaser — phrase caption

**Files:**
- Modify: `components/home/CategoryTeaser.module.css` (around line 117)

**Interfaces:**
- Produces: `.phrase` renders at 15px instead of 14px

- [ ] **Step 1: Apply the change**

  In `components/home/CategoryTeaser.module.css`, find the `.phrase` rule:

  ```css
  .phrase {
    font-family: var(--fb);
    font-size: 14px;
    font-style: italic;
    color: var(--glt);
    letter-spacing: 0.04em;
    line-height: 1.5;
  ```

  Change `font-size: 14px;` to `font-size: 15px;`:

  ```css
  .phrase {
    font-family: var(--fb);
    font-size: 15px;
    font-style: italic;
    color: var(--glt);
    letter-spacing: 0.04em;
    line-height: 1.5;
  ```

- [ ] **Step 2: Visual verify**

  At `localhost:3000`, scroll to the CategoryTeaser carousel. The short italic caption below the category name (overlaid on the image) should appear slightly more legible. Confirm no overflow or layout shift at 1280px or 480px width.

- [ ] **Step 3: Commit**

  ```bash
  git add components/home/CategoryTeaser.module.css
  git commit -m "fix: raise category teaser phrase caption from 14px to 15px"
  ```

---

## Task 4: BrandsGrid — card description

**Files:**
- Modify: `components/home/BrandsGrid.module.css` (around line 61)

**Interfaces:**
- Produces: `.desc` renders at 15px instead of 14px

- [ ] **Step 1: Apply the change**

  In `components/home/BrandsGrid.module.css`, find the `.desc` rule:

  ```css
  .desc {
    font-family: var(--fb);
    font-size: 14px;
    line-height: 1.65;
    color: var(--ink3);
    text-align: center;
  }
  ```

  Change `font-size: 14px;` to `font-size: 15px;`:

  ```css
  .desc {
    font-family: var(--fb);
    font-size: 15px;
    line-height: 1.65;
    color: var(--ink3);
    text-align: center;
  }
  ```

- [ ] **Step 2: Visual verify**

  At `localhost:3000`, scroll to the BrandsGrid section. The short description below each brand name should be more readable. Confirm the cards still look balanced at 1280px, 900px, and 360px widths.

- [ ] **Step 3: Commit**

  ```bash
  git add components/home/BrandsGrid.module.css
  git commit -m "fix: raise brands grid card description from 14px to 15px"
  ```

---

## Task 5: PorQueNosotros — feature description

**Files:**
- Modify: `components/home/PorQueNosotros.module.css` (around line 47)

**Interfaces:**
- Produces: `.featDesc` renders at 15px instead of 13px

- [ ] **Step 1: Apply the change**

  In `components/home/PorQueNosotros.module.css`, find the `.featDesc` rule:

  ```css
  .featDesc {
    font-family: var(--fb);
    font-size: 13px;
    line-height: 1.75;
    color: var(--ink3);
  }
  ```

  Change `font-size: 13px;` to `font-size: 15px;`:

  ```css
  .featDesc {
    font-family: var(--fb);
    font-size: 15px;
    line-height: 1.75;
    color: var(--ink3);
  }
  ```

- [ ] **Step 2: Visual verify**

  At `localhost:3000`, scroll to the PorQueNosotros section (the 4-feature benefit grid). The short description below each feature title should be noticeably more legible. Confirm the feature cards still align cleanly in the grid at 1280px and collapse correctly at 768px.

- [ ] **Step 3: Commit**

  ```bash
  git add components/home/PorQueNosotros.module.css
  git commit -m "fix: raise PorQueNosotros feature descriptions from 13px to 15px"
  ```

---

## Task 6: ConfianzaCredibilidad — pillar description

**Files:**
- Modify: `components/home/ConfianzaCredibilidad.module.css` (around line 55)

**Interfaces:**
- Produces: `.pillarDesc` renders at 15px instead of 13px

- [ ] **Step 1: Apply the change**

  In `components/home/ConfianzaCredibilidad.module.css`, find the `.pillarDesc` rule:

  ```css
  .pillarDesc {
    font-family: var(--fb);
    font-size: 13px;
    line-height: 1.75;
    color: var(--ink3);
  }
  ```

  Change `font-size: 13px;` to `font-size: 15px;`:

  ```css
  .pillarDesc {
    font-family: var(--fb);
    font-size: 15px;
    line-height: 1.75;
    color: var(--ink3);
  }
  ```

- [ ] **Step 2: Visual verify**

  At `localhost:3000`, scroll to the ConfianzaCredibilidad section (the 3-pillar trust grid). The description below each pillar title should be clearly readable. Confirm the 3-column layout remains clean at 1280px and stacks correctly below 900px.

- [ ] **Step 3: Commit**

  ```bash
  git add components/home/ConfianzaCredibilidad.module.css
  git commit -m "fix: raise ConfianzaCredibilidad pillar descriptions from 13px to 15px"
  ```

---

## Task 7: AffiliateEditorial — stat label size and contrast

**Files:**
- Modify: `components/home/AffiliateEditorial.module.css` (around lines 43 and 195)

**Interfaces:**
- Produces: `.statLabel` renders at 12px (desktop) and 11px (≤900px), with color opacity raised from 0.45 to 0.65 (now WCAG AA compliant on dark background)

- [ ] **Step 1: Apply the desktop change**

  In `components/home/AffiliateEditorial.module.css`, find the `.statLabel` rule:

  ```css
  .statLabel {
    font-family: var(--fb);
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(250, 250, 248, 0.45);
  }
  ```

  Change `font-size: 11px;` to `font-size: 12px;` and `color: rgba(250, 250, 248, 0.45);` to `color: rgba(250, 250, 248, 0.65);`:

  ```css
  .statLabel {
    font-family: var(--fb);
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(250, 250, 248, 0.65);
  }
  ```

- [ ] **Step 2: Apply the mobile override bump**

  In the same file, inside the `@media (max-width: 900px)` block (around line 195), find:

  ```css
  .statLabel {
    font-size: 10px;
  }
  ```

  Change to `font-size: 11px;`:

  ```css
  .statLabel {
    font-size: 11px;
  }
  ```

- [ ] **Step 3: Visual verify**

  At `localhost:3000`, scroll to the AffiliateEditorial section (dark background with large stat numbers). The small uppercase category labels below each stat number should be clearly legible rather than barely visible. At 900px width confirm the mobile override keeps them readable without growing too large. Open DevTools Accessibility panel, click a `.statLabel`, and confirm the contrast ratio shows passing AA.

- [ ] **Step 4: Commit**

  ```bash
  git add components/home/AffiliateEditorial.module.css
  git commit -m "fix: raise statLabel to 12px and fix dark-bg contrast opacity 0.45 to 0.65"
  ```

---

## Task 8: Final build verification

**Files:** None modified.

- [ ] **Step 1: TypeScript check**

  ```bash
  npx tsc --noEmit
  ```

  Expected: zero errors. These are CSS-only changes so this should be trivially clean.

- [ ] **Step 2: Production build**

  ```bash
  npm run build
  ```

  Expected: build completes without errors and `out/` directory is updated.

- [ ] **Step 3: Full browser sweep at key widths**

  Open `localhost:3000` and check these widths in DevTools responsive mode:

  **1280px (desktop)**
  - Hero: introductory paragraph reads at 16px, comfortable beside the image
  - Manifesto: paragraphs are legible and not dim (previously a washed-out gray)
  - CategoryTeaser: caption text over image is readable
  - BrandsGrid: card descriptions scan easily
  - PorQueNosotros: feature text is clearly readable, not tiny
  - ConfianzaCredibilidad: pillar descriptions read comfortably
  - AffiliateEditorial: stat labels visible on dark background

  **768px**
  - No section looks broken or unbalanced from the font size increases
  - Layouts that relied on previous mobile overrides still look correct

  **360px**
  - No horizontal overflow in any section
  - All text remains within its container
