# Typography Standardization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every hardcoded font-size and letter-spacing value in component CSS modules with design tokens, and add the missing letter-spacing token set to globals.css.

**Architecture:** Pure CSS token enforcement — no TSX/JS changes. Task 1 adds 6 `--ls-*` tokens to `:root` in globals.css and updates the `.s-eye` utility class. Tasks 2-9 sweep the 34 component `.module.css` files in logical groups, replacing raw values with token references. Task 10 verifies the full build.

**Tech Stack:** CSS Modules, Next.js 16 static export, ESLint

## Global Constraints

- Never use em dashes in any content
- No test suite; verification per task is `npm run lint`. Final verification: `npm run build`
- CSS Modules only — no inline styles, no Tailwind
- After the sweep: every `font-size` in a `.module.css` uses a `--text-*` token; every `letter-spacing` uses a `--ls-*` token
- Three hardcoded exceptions that intentionally stay: `clamp(200px, 28vw, 380px)` in CollaborateTeaser (decorative oversized letter), `font-size: 88px` and `font-size: 64px` in Manifesto `.ornament` (decorative quote mark that exceeds the token scale)
- Inside `@media` override blocks, prefer static tokens (`--text-xs` through `--text-2xl`) over display tokens when replacing a simple px value. Replacing a clamp with a display token is fine.

## Reference: Token Mapping Tables

### Letter-Spacing

| Raw value | Token |
|---|---|
| 0.01em, 0.02em, 0.03em | `var(--ls-tight)` |
| 0.04em, 0.06em | `var(--ls-normal)` |
| 0.08em, 0.10em | `var(--ls-wide)` |
| 0.12em, 0.14em, 0.15em, 0.16em | `var(--ls-label)` |
| 0.18em | `var(--ls-eye)` |
| 0.20em, 0.22em, 0.28em, 0.32em | `var(--ls-loose)` |

### Font-Size

| Raw value | Token |
|---|---|
| 9px, 10px, 11px, 11.5px, 12px, 12.5px | `var(--text-xs)` |
| 13px, 14px | `var(--text-sm)` |
| 15px, 16px, 0.875rem | `var(--text-base)` |
| 17px, 18px, 1.25rem | `var(--text-lg)` |
| 20px | `var(--text-xl)` |
| 24px, 32px (in @media), 1.6rem, clamp(2rem, 4vw, 3rem) | `var(--text-2xl)` |
| clamp(17px, 1.6vw, 22px), clamp(19px, 1.6vw, 23px) | `var(--text-display-xs)` |
| clamp(14px, 1.1vw, 16px) | `var(--text-base)` |
| clamp(22px, 2.2vw, 32px), clamp(22px, 2.4vw, 34px), clamp(1.6rem, 3vw, 2rem) | `var(--text-display-sm)` |
| 3rem, clamp(26px, 3vw, 40px), clamp(28px, 3.2vw, 48px), clamp(28px, 7.5vw, 48px) | `var(--text-display-md)` |
| clamp(36px, 10vw, 52px) | `var(--text-display-lg)` |

---

### Task 1: Add Letter-Spacing Tokens to globals.css

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `--ls-tight`, `--ls-normal`, `--ls-wide`, `--ls-label`, `--ls-eye`, `--ls-loose` for use by all subsequent tasks

- [ ] **Step 1: Add 6 letter-spacing tokens to `:root`**

In `app/globals.css`, after the `--text-hero` line (line 29), add inside `:root`:

```css
  /* letter-spacing scale */
  --ls-tight:  0.02em;
  --ls-normal: 0.04em;
  --ls-wide:   0.08em;
  --ls-label:  0.12em;
  --ls-eye:    0.18em;
  --ls-loose:  0.22em;
```

- [ ] **Step 2: Update `.s-eye` to use the token**

In `app/globals.css`, the `.s-eye` rule has `letter-spacing: 0.18em;`. Replace it:

```css
  letter-spacing: var(--ls-eye);
```

- [ ] **Step 3: Verify**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: add letter-spacing tokens to globals.css"
```

---

### Task 2: Layout — Nav, Footer

**Files:**
- Modify: `components/layout/Nav.module.css`
- Modify: `components/layout/Footer.module.css`

**Interfaces:**
- Consumes: `--ls-*` tokens from Task 1

**Nav.module.css — exact replacements:**

| Line | Old value | New value |
|---|---|---|
| 33 | `font-size: clamp(22px, 2.4vw, 34px)` | `font-size: var(--text-display-sm)` |
| 125 | `font-size: 13px` | `font-size: var(--text-sm)` |
| 127 | `letter-spacing: 0.16em` | `letter-spacing: var(--ls-label)` |
| 145 | `font-size: 9px` | `font-size: var(--text-xs)` |
| 176 | `font-size: 12px` | `font-size: var(--text-xs)` |
| 178 | `letter-spacing: 0.16em` | `letter-spacing: var(--ls-label)` |
| 199 | `font-size: 11px` | `font-size: var(--text-xs)` |
| 201 | `letter-spacing: 0.22em` | `letter-spacing: var(--ls-loose)` |
| 246 | `font-size: 12px` | `font-size: var(--text-xs)` |
| 247 | `letter-spacing: 0.1em` | `letter-spacing: var(--ls-wide)` |
| 269 | `font-size: 15px` | `font-size: var(--text-base)` |
| 271 | `letter-spacing: 0.15em` | `letter-spacing: var(--ls-label)` |
| 290 | `font-size: 13px` | `font-size: var(--text-sm)` |

**Footer.module.css — exact replacements:**

| Line | Old value | New value |
|---|---|---|
| 19 | `font-size: 11px` | `font-size: var(--text-xs)` |
| 21 | `letter-spacing: 0.2em` | `letter-spacing: var(--ls-loose)` |
| 29 | `font-size: 13px` | `font-size: var(--text-sm)` |
| 41 | `font-size: 11px` | `font-size: var(--text-xs)` |
| 43 | `letter-spacing: 0.18em` | `letter-spacing: var(--ls-eye)` |
| 68 | `font-size: 12px` | `font-size: var(--text-xs)` |
| 70 | `letter-spacing: 0.22em` | `letter-spacing: var(--ls-loose)` |
| 84 | `font-size: 13px` | `font-size: var(--text-sm)` |
| 102 | `font-size: 12px` | `font-size: var(--text-xs)` |
| 114 | `font-size: 12px` | `font-size: var(--text-xs)` |

- [ ] **Step 1: Apply Nav.module.css replacements**

Read `components/layout/Nav.module.css` and apply the 13 substitutions from the table above using the Edit tool.

- [ ] **Step 2: Apply Footer.module.css replacements**

Read `components/layout/Footer.module.css` and apply the 10 substitutions from the table above using the Edit tool.

- [ ] **Step 3: Verify**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Nav.module.css components/layout/Footer.module.css
git commit -m "refactor: replace hardcoded typography values with tokens in layout"
```

---

### Task 3: Home — Hero, Ticker, BrandsGrid, HomeSectionLink, BrandStrip

**Files:**
- Modify: `components/home/Hero.module.css`
- Modify: `components/home/Ticker.module.css`
- Modify: `components/home/BrandsGrid.module.css`
- Modify: `components/home/HomeSectionLink.module.css`
- No changes: `components/home/BrandStrip.module.css` (only `font-weight: 400`, which has no token)

**Interfaces:**
- Consumes: `--ls-*` tokens from Task 1

**Hero.module.css:**

| Line | Old value | New value |
|---|---|---|
| 20 | `letter-spacing: 0.18em` | `letter-spacing: var(--ls-eye)` |
| 123 | `letter-spacing: 0.16em` | `letter-spacing: var(--ls-label)` |
| 142 | `font-size: clamp(28px, 7.5vw, 48px)` | `font-size: var(--text-display-md)` |

**Ticker.module.css:**

| Line | Old value | New value |
|---|---|---|
| 25 | `letter-spacing: 0.16em` | `letter-spacing: var(--ls-label)` |

**BrandsGrid.module.css:**

| Line | Old value | New value |
|---|---|---|
| 55 | `font-weight: 600` | `font-weight: 500` |
| 58 | `letter-spacing: 0.02em` | `letter-spacing: var(--ls-tight)` |

**HomeSectionLink.module.css:**

| Line | Old value | New value |
|---|---|---|
| 13 | `letter-spacing: 0.14em` | `letter-spacing: var(--ls-label)` |

- [ ] **Step 1: Apply all four files' replacements**

Read each file and apply the substitutions from the tables above.

- [ ] **Step 2: Verify**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home/Hero.module.css components/home/Ticker.module.css components/home/BrandsGrid.module.css components/home/HomeSectionLink.module.css
git commit -m "refactor: replace hardcoded typography values with tokens in home (Hero, Ticker, BrandsGrid, HomeSectionLink)"
```

---

### Task 4: Home — Manifesto, LujoTotal, LujoTotalDetail

**Files:**
- Modify: `components/home/Manifesto.module.css`
- Modify: `components/home/LujoTotal.module.css`
- Modify: `components/home/LujoTotalDetail.module.css`

**Interfaces:**
- Consumes: `--ls-*` tokens from Task 1

**Manifesto.module.css:**

| Line | Old value | New value |
|---|---|---|
| 98 | `letter-spacing: 0.01em` | `letter-spacing: var(--ls-tight)` |
| 172 | `letter-spacing: 0.03em` | `letter-spacing: var(--ls-tight)` |
| 300 | `font-size: 10px` | `font-size: var(--text-xs)` |
| 302 | `letter-spacing: 0.22em` | `letter-spacing: var(--ls-loose)` |
| 353 | `font-size: 11px` | `font-size: var(--text-xs)` |
| 355 | `letter-spacing: 0.1em` | `letter-spacing: var(--ls-wide)` |
| 375 | `font-size: clamp(36px, 10vw, 52px)` | `font-size: var(--text-display-lg)` |

Lines 57 (`font-size: 88px`) and 408 (`font-size: 64px`) are the `.ornament` decorative exception — do NOT change these.

**LujoTotal.module.css:**

| Line | Old value | New value |
|---|---|---|
| 22 | `letter-spacing: 0.2em` | `letter-spacing: var(--ls-loose)` |

**LujoTotalDetail.module.css:**

| Line | Old value | New value |
|---|---|---|
| 48 | `font-size: 3rem` | `font-size: var(--text-display-md)` |
| 50 | `letter-spacing: 0.02em` | `letter-spacing: var(--ls-tight)` |
| 106 | `letter-spacing: 0.28em` | `letter-spacing: var(--ls-loose)` |
| 147 | `letter-spacing: 0.32em` | `letter-spacing: var(--ls-loose)` |

- [ ] **Step 1: Apply all three files' replacements**

Read each file and apply the substitutions above. Verify lines 57 and 408 in Manifesto are left untouched.

- [ ] **Step 2: Verify**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home/Manifesto.module.css components/home/LujoTotal.module.css components/home/LujoTotalDetail.module.css
git commit -m "refactor: replace hardcoded typography values with tokens in Manifesto, LujoTotal, LujoTotalDetail"
```

---

### Task 5: Home — CollaborateTeaser, CategoryTeaser, PartnerValue

**Files:**
- Modify: `components/home/CollaborateTeaser.module.css`
- Modify: `components/home/CategoryTeaser.module.css`
- Modify: `components/home/PartnerValue.module.css`
- No changes: `components/home/PorQueNosotros.module.css` (only `font-weight: 400`)

**Interfaces:**
- Consumes: `--ls-*` tokens from Task 1

**CollaborateTeaser.module.css:**

Line 13 (`font-size: clamp(200px, 28vw, 380px)`) is the decorative exception — do NOT change this.
No other font-size or letter-spacing values to replace in this file.

**CategoryTeaser.module.css:**

| Line | Old value | New value |
|---|---|---|
| 112 | `letter-spacing: 0.06em` | `letter-spacing: var(--ls-normal)` |
| 122 | `letter-spacing: 0.04em` | `letter-spacing: var(--ls-normal)` |
| 137 | `font-size: 24px` | `font-size: var(--text-2xl)` |
| 194 | `font-size: 20px` | `font-size: var(--text-xl)` |
| 208 | `font-size: 18px` (inside `.navBtn`) | `font-size: var(--text-lg)` |

**PartnerValue.module.css:**

| Line | Old value | New value |
|---|---|---|
| 78 | `letter-spacing: 0.08em` | `letter-spacing: var(--ls-wide)` |
| 102 | `letter-spacing: 0.02em` | `letter-spacing: var(--ls-tight)` |

- [ ] **Step 1: Apply CategoryTeaser and PartnerValue replacements**

Read each file and apply the substitutions above. CollaborateTeaser needs no edits.

- [ ] **Step 2: Verify**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home/CategoryTeaser.module.css components/home/PartnerValue.module.css
git commit -m "refactor: replace hardcoded typography values with tokens in CategoryTeaser, PartnerValue"
```

---

### Task 6: Home — AffiliateEditorial, MetricsStrip, Newsletter, PaginasSpotlight, ServicesGrid, PrivacyPolicy

**Files:**
- Modify: `components/home/AffiliateEditorial.module.css`
- Modify: `components/home/MetricsStrip.module.css`
- Modify: `components/home/Newsletter.module.css`
- Modify: `components/home/PaginasSpotlight.module.css`
- Modify: `components/home/ServicesGrid.module.css`
- Modify: `components/home/PrivacyPolicy.module.css`
- No changes: `components/home/ConfianzaCredibilidad.module.css` (only `font-weight: 400`)

**Interfaces:**
- Consumes: `--ls-*` tokens from Task 1

**AffiliateEditorial.module.css:**

| Line | Old value | New value |
|---|---|---|
| 45 | `font-size: 12px` | `font-size: var(--text-xs)` |
| 46 | `letter-spacing: 0.15em` | `letter-spacing: var(--ls-label)` |
| 96 | `font-size: 12px` | `font-size: var(--text-xs)` |
| 98 | `letter-spacing: 0.15em` | `letter-spacing: var(--ls-label)` |
| 106 | `font-size: 17px` | `font-size: var(--text-lg)` |
| 134 | `font-size: 13px` | `font-size: var(--text-sm)` |
| 201 | `font-size: 32px` | `font-size: var(--text-2xl)` |
| 205 | `font-size: 11px` | `font-size: var(--text-xs)` |

**MetricsStrip.module.css:**

| Line | Old value | New value |
|---|---|---|
| 25 | `font-size: clamp(1.6rem, 3vw, 2rem)` | `font-size: var(--text-display-sm)` |
| 26 | `font-weight: 600` | `font-weight: 500` |
| 35 | `letter-spacing: 0.06em` | `letter-spacing: var(--ls-normal)` |

**Newsletter.module.css:**

| Line | Old value | New value |
|---|---|---|
| 58 | `letter-spacing: 0.22em` | `letter-spacing: var(--ls-loose)` |
| 79 | `letter-spacing: 0.1em` | `letter-spacing: var(--ls-wide)` |

**PaginasSpotlight.module.css:**

| Line | Old value | New value |
|---|---|---|
| 37 | `letter-spacing: 0.08em` | `letter-spacing: var(--ls-wide)` |
| 72 | `letter-spacing: 0.04em` | `letter-spacing: var(--ls-normal)` |

**ServicesGrid.module.css:**

| Line | Old value | New value |
|---|---|---|
| 38 | `letter-spacing: 0.18em` | `letter-spacing: var(--ls-eye)` |
| 66 | `letter-spacing: 0.2em` | `letter-spacing: var(--ls-loose)` |

**PrivacyPolicy.module.css:**

| Line | Old value | New value |
|---|---|---|
| 15 | `font-size: clamp(2rem, 4vw, 3rem)` | `font-size: var(--text-display-md)` |
| 28 | `font-size: 0.875rem` | `font-size: var(--text-base)` |
| 40 | `font-size: 1.25rem` | `font-size: var(--text-lg)` |

- [ ] **Step 1: Apply all six files' replacements**

Read each file and apply the substitutions above.

- [ ] **Step 2: Verify**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home/AffiliateEditorial.module.css components/home/MetricsStrip.module.css components/home/Newsletter.module.css components/home/PaginasSpotlight.module.css components/home/ServicesGrid.module.css components/home/PrivacyPolicy.module.css
git commit -m "refactor: replace hardcoded typography values with tokens in home (AffiliateEditorial, MetricsStrip, Newsletter, PaginasSpotlight, ServicesGrid, PrivacyPolicy)"
```

---

### Task 7: Brands — BrandsCapacidades, BrandsComoFunciona, BrandsCta, BrandsParaQuienEs

**Files:**
- Modify: `components/brands/BrandsCapacidades.module.css`
- Modify: `components/brands/BrandsComoFunciona.module.css`
- Modify: `components/brands/BrandsCta.module.css`
- Modify: `components/brands/BrandsParaQuienEs.module.css`
- No changes: `components/brands/BrandsFaq.module.css` (only `font-weight: 400`)

**Interfaces:**
- Consumes: `--ls-*` tokens from Task 1

**BrandsCapacidades.module.css:**

| Line | Old value | New value |
|---|---|---|
| 44 | `letter-spacing: 0.18em` | `letter-spacing: var(--ls-eye)` |

**BrandsComoFunciona.module.css:**

| Line | Old value | New value |
|---|---|---|
| 70 | `font-size: 12px` | `font-size: var(--text-xs)` |
| 72 | `letter-spacing: 0.15em` | `letter-spacing: var(--ls-label)` |
| 80 | `font-size: 17px` | `font-size: var(--text-lg)` |
| 108 | `font-size: 13px` | `font-size: var(--text-sm)` |

**BrandsCta.module.css:**

| Line | Old value | New value |
|---|---|---|
| 18 | `font-size: 17px` | `font-size: var(--text-lg)` |
| 26 | `font-size: 16px` | `font-size: var(--text-base)` |
| 41 | `font-size: 13px` | `font-size: var(--text-sm)` |
| 47 | `font-size: 15px` (`.subtitle`) | `font-size: var(--text-base)` |
| 48 | `font-size: 15px` (`.body`) | `font-size: var(--text-base)` |

**BrandsParaQuienEs.module.css:**

| Line | Old value | New value |
|---|---|---|
| 16 | `font-size: 17px` | `font-size: var(--text-lg)` |
| 27 | `font-size: 15px` (`.body`) | `font-size: var(--text-base)` |

- [ ] **Step 1: Apply all four files' replacements**

Read each file and apply the substitutions above.

- [ ] **Step 2: Verify**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/brands/BrandsCapacidades.module.css components/brands/BrandsComoFunciona.module.css components/brands/BrandsCta.module.css components/brands/BrandsParaQuienEs.module.css
git commit -m "refactor: replace hardcoded typography values with tokens in brands components"
```

---

### Task 8: Dominios — CategoryDropdown, DomainCard, DomainSearch, DominiosInsigniaAlt

**Files:**
- Modify: `components/dominios/CategoryDropdown.module.css`
- Modify: `components/dominios/DomainCard.module.css`
- Modify: `components/dominios/DomainSearch.module.css`
- Modify: `components/dominios/DominiosInsigniaAlt.module.css`

**Interfaces:**
- Consumes: `--ls-*` tokens from Task 1

**CategoryDropdown.module.css:**

| Line | Old value | New value |
|---|---|---|
| 17 | `font-size: 11.5px` | `font-size: var(--text-xs)` |
| 19 | `letter-spacing: 0.16em` | `letter-spacing: var(--ls-label)` |
| 87 | `font-size: 12.5px` | `font-size: var(--text-xs)` |
| 88 | `letter-spacing: 0.04em` | `letter-spacing: var(--ls-normal)` |

**DomainCard.module.css:**

| Line | Old value | New value |
|---|---|---|
| 26 | `font-size: 18px` | `font-size: var(--text-lg)` |
| 42 | `font-size: 9px` | `font-size: var(--text-xs)` |
| 44 | `letter-spacing: 0.18em` | `letter-spacing: var(--ls-eye)` |
| 62 | `font-size: 10px` | `font-size: var(--text-xs)` |
| 64 | `letter-spacing: 0.16em` | `letter-spacing: var(--ls-label)` |
| 71 | `font-size: 10px` | `font-size: var(--text-xs)` |
| 72 | `letter-spacing: 0.12em` | `letter-spacing: var(--ls-label)` |
| 86 | `font-size: 13px` | `font-size: var(--text-sm)` |
| 98 | `font-size: 11px` | `font-size: var(--text-xs)` |
| 100 | `letter-spacing: 0.16em` | `letter-spacing: var(--ls-label)` |

**DomainSearch.module.css:**

| Line | Old value | New value |
|---|---|---|
| 20 | `font-size: 14px` | `font-size: var(--text-sm)` |
| 41 | `font-size: 11px` | `font-size: var(--text-xs)` |

**DominiosInsigniaAlt.module.css:**

| Line | Old value | New value |
|---|---|---|
| 22 | `font-size: clamp(28px, 3.2vw, 48px)` | `font-size: var(--text-display-md)` |
| 28 | `font-size: 13px` | `font-size: var(--text-sm)` |
| 30 | `letter-spacing: 0.06em` | `letter-spacing: var(--ls-normal)` |
| 60 | `font-size: 13px` | `font-size: var(--text-sm)` |
| 61 | `letter-spacing: 0.04em` | `letter-spacing: var(--ls-normal)` |
| 88 | `font-size: 11px` | `font-size: var(--text-xs)` |
| 136 | `font-size: 14px` | `font-size: var(--text-sm)` |
| 142 | `font-size: 14px` | `font-size: var(--text-sm)` |
| 149 | `font-size: 11px` | `font-size: var(--text-xs)` |
| 150 | `letter-spacing: 0.06em` | `letter-spacing: var(--ls-normal)` |
| 204 | `letter-spacing: 0.22em` | `letter-spacing: var(--ls-loose)` |
| 202 | `font-size: 10px` | `font-size: var(--text-xs)` |
| 233 | `font-size: clamp(17px, 1.6vw, 22px)` | `font-size: var(--text-display-xs)` |
| 276 | `font-size: 15px` (`.domainName`) | `font-size: var(--text-base)` |

- [ ] **Step 1: Apply all four files' replacements**

Read each file and apply the substitutions above.

- [ ] **Step 2: Verify**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/dominios/CategoryDropdown.module.css components/dominios/DomainCard.module.css components/dominios/DomainSearch.module.css components/dominios/DominiosInsigniaAlt.module.css
git commit -m "refactor: replace hardcoded typography values with tokens in dominios components"
```

---

### Task 9: About + UI — MissionVision, WritersGrid, LanguageToggle

**Files:**
- Modify: `components/about/MissionVision.module.css`
- Modify: `components/about/WritersGrid.module.css`
- Modify: `components/ui/LanguageToggle.module.css`
- No changes: `components/ui/FloatingCertBadge.module.css` (no hardcoded typography values)

**Interfaces:**
- Consumes: `--ls-*` tokens from Task 1

**MissionVision.module.css:**

| Line | Old value | New value |
|---|---|---|
| 41 | `font-size: clamp(22px, 2.2vw, 32px)` | `font-size: var(--text-display-sm)` |
| 42 | `font-weight: 600` | `font-weight: 500` |
| 50 | `font-size: clamp(14px, 1.1vw, 16px)` | `font-size: var(--text-base)` |

**WritersGrid.module.css:**

| Line | Old value | New value |
|---|---|---|
| 14 | `font-size: clamp(26px, 3vw, 40px)` | `font-size: var(--text-display-md)` |
| 21 | `font-size: 15px` | `font-size: var(--text-base)` |
| 88 | `font-size: 10px` | `font-size: var(--text-xs)` |
| 90 | `letter-spacing: 0.28em` | `letter-spacing: var(--ls-loose)` |
| 98 | `font-size: clamp(19px, 1.6vw, 23px)` | `font-size: var(--text-display-xs)` |
| 122 | `font-size: 11px` | `font-size: var(--text-xs)` |
| 123 | `letter-spacing: 0.12em` | `letter-spacing: var(--ls-label)` |
| 151 | `font-size: 17px` | `font-size: var(--text-lg)` |

**LanguageToggle.module.css:**

| Line | Old value | New value |
|---|---|---|
| 12 | `letter-spacing: 0.12em` | `letter-spacing: var(--ls-label)` |

- [ ] **Step 1: Apply all three files' replacements**

Read each file and apply the substitutions above.

- [ ] **Step 2: Verify**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/about/MissionVision.module.css components/about/WritersGrid.module.css components/ui/LanguageToggle.module.css
git commit -m "refactor: replace hardcoded typography values with tokens in about and ui components"
```

---

### Task 10: Final Verification

**Files:** none

- [ ] **Step 1: Full build**

```bash
npm run build
```

Expected: successful static export with no errors.

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Audit sweep — confirm zero hardcoded values remain**

Run this command and confirm the output is empty (no results):

```bash
grep -rn "font-size: [0-9]" components --include="*.module.css" | grep -v "clamp(200px\|88px\|64px"
```

Then run this and confirm the output is empty:

```bash
grep -rn "letter-spacing: 0\." components --include="*.module.css"
```

Expected: both commands return no output.

- [ ] **Step 4: Visual spot-check**

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000` and visually check:
- Homepage hero, manifesto, metrics strip
- `/dominios` domain cards and search
- `/servicios` brands page capacidades and como funciona sections
- Nav and footer at both desktop and mobile widths

Confirm no sections look obviously broken (text too large/small, spacing off).

- [ ] **Step 5: Commit (if Step 3 audit found any stragglers)**

If the audit commands in Step 3 returned any remaining hardcoded values, fix and commit them before proceeding.
