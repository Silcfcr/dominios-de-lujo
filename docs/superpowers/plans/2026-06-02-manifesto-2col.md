# Manifesto 2-Column Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Manifesto section's tall single-column layout with a 2-column grid — title/identity on the left, audio player + text on the right — to halve its desktop height.

**Architecture:** Two file changes only. `Manifesto.tsx` gains two wrapper divs (`.left`, `.right`) splitting existing elements. `Manifesto.module.css` replaces the centred flex column on `.inner` with a CSS grid, adds `.left`/`.right` column styles, and adjusts alignments throughout. No logic changes.

**Tech Stack:** React, CSS Modules, Next.js 16

---

## Files

| Action | Path |
|---|---|
| Modify | `components/home/Manifesto.tsx` |
| Modify | `components/home/Manifesto.module.css` |

---

## Task 1: Wrap TSX content into left and right column divs

**Files:**
- Modify: `components/home/Manifesto.tsx`

- [ ] **Step 1: Read the current file**

Open `components/home/Manifesto.tsx`. Inside the `<div className={styles.inner}>` block you will find these children in order:
1. `<span className={styles.ornament}>❝</span>`
2. `<p className={`s-eye ${styles.eyebrow}`}>…</p>`
3. `<h2 className={styles.title}>…</h2>`
4. `<div className={styles.rule} />`
5. `{/* Player */}` block — `<div className={styles.player}>…</div>`
6. `{/* Manifesto text */}` block — `<div className={`${styles.text}…`}>…</div>`

- [ ] **Step 2: Replace the inner children with two column wrappers**

Replace everything inside `<div className={styles.inner}>` (items 1–6 above) with:

```tsx
{/* Left column — identity */}
<div className={styles.left}>
  <span className={styles.ornament}>❝</span>

  <p className={`s-eye ${styles.eyebrow}`}>{t('manifesto.eyebrow')}</p>

  <h2 className={styles.title}>
    {t('manifesto.title')}<br />
    <em>{t('manifesto.titleEm')}</em>
  </h2>

  <div className={styles.rule} />
</div>

{/* Right column — player + text */}
<div className={styles.right}>
  {/* Player */}
  <div className={styles.player}>
    <button
      className={`${styles.playBtn} ${playing ? styles.playActive : ''}`}
      onClick={toggle}
      aria-label={t('manifesto.playLabel')}
    >
      <span className={styles.ring} />
      {playing ? (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="6,3 20,12 6,21" />
        </svg>
      )}
    </button>

    <div className={styles.playerBody}>
      <div className={styles.playerTop}>
        <div className={`${styles.wave} ${playing ? styles.waveOn : ''}`}>
          {[0,1,2,3,4].map(i => (
            <span key={i} className={styles.bar} style={{ '--i': i } as React.CSSProperties} />
          ))}
        </div>
        <span className={styles.playerLabel}>{t('manifesto.playLabel')}</span>
      </div>

      <div className={styles.progressWrap} onClick={onProgressClick} role="progressbar" aria-valuenow={progress}>
        <div className={styles.progressBg} />
        <div className={styles.progressFill} style={{ width: `${progress}%` }}>
          <span className={styles.dot} />
        </div>
      </div>

      <p className={styles.time}>
        {duration > 0
          ? `${fmt(currentTime)} / ${fmt(duration)}`
          : t('manifesto.comingSoon')}
      </p>
    </div>
  </div>

  {/* Manifesto text — fades in on play */}
  <div className={`${styles.text} ${textVisible ? styles.textVisible : ''}`}>
    {PARAS.map((key, i) => (
      <p
        key={key}
        className={`${styles.para} ${key === 'p5' ? styles.paraCoda : ''}`}
        style={{ '--i': i } as React.CSSProperties}
      >
        {t(`manifesto.${key}`)}
      </p>
    ))}
  </div>
</div>
```

The rest of the component (state, hooks, `<audio>` element) stays exactly as-is.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

---

## Task 2: Update CSS for 2-column grid layout

**Files:**
- Modify: `components/home/Manifesto.module.css`

- [ ] **Step 1: Update `.section` padding**

Find:
```css
.section {
  position: relative;
  background: var(--ink);
  padding: 120px 64px;
  overflow: hidden;
}
```

Replace with:
```css
.section {
  position: relative;
  background: var(--ink);
  padding: 80px 64px;
  overflow: hidden;
}
```

- [ ] **Step 2: Replace `.inner` with grid**

Find:
```css
.inner {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  opacity: 0;
  transform: translateY(24px);
  transition: opacity 1s ease, transform 1s ease;
}
```

Replace with:
```css
.inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 45fr 55fr;
  gap: 80px;
  align-items: start;

  opacity: 0;
  transform: translateY(24px);
  transition: opacity 1s ease, transform 1s ease;
}
```

- [ ] **Step 3: Add `.left` and `.right` column styles**

Add these two rules immediately after the `.visible .inner` rule:

```css
/* ── Two-column wrappers ─────────────────────────────────── */
.left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.right {
  display: flex;
  flex-direction: column;
}
```

- [ ] **Step 4: Fix `.rule` alignment**

Find:
```css
.rule {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin-bottom: 36px;
  width: 0;
  transition: width 1.2s 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
```

Replace with:
```css
.rule {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin-bottom: 36px;
  margin-left: 0;
  width: 0;
  transition: width 1.2s 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
```

- [ ] **Step 5: Remove max-width constraints from player and text**

Find:
```css
.player {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  padding: 24px 28px;
```

Replace with:
```css
.player {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 24px 28px;
```

Find:
```css
.text {
  width: 100%;
  max-width: 560px;
  margin-top: 56px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
```

Replace with:
```css
.text {
  width: 100%;
  margin-top: 56px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
```

- [ ] **Step 6: Left-align manifesto paragraphs**

Find:
```css
.para {
  font-family: var(--fb);
  font-size: 15px;
  line-height: 2;
  color: rgba(250, 247, 242, 0.55);
  white-space: pre-line;
  text-align: center;
```

Replace with:
```css
.para {
  font-family: var(--fb);
  font-size: 15px;
  line-height: 2;
  color: rgba(250, 247, 242, 0.55);
  white-space: pre-line;
  text-align: left;
```

Find:
```css
.paraCoda {
  font-family: var(--fd);
  font-size: clamp(15px, 1.4vw, 18px);
  font-style: italic;
  color: var(--glt);
  letter-spacing: 0.03em;
  line-height: 1.7;
}
```

Replace with:
```css
.paraCoda {
  font-family: var(--fd);
  font-size: clamp(15px, 1.4vw, 18px);
  font-style: italic;
  color: var(--glt);
  letter-spacing: 0.03em;
  line-height: 1.7;
  text-align: left;
}
```

- [ ] **Step 7: Update mobile breakpoint**

Find the `@media (max-width: 768px)` block:
```css
@media (max-width: 768px) {
  .section {
    padding: 80px 24px;
  }

  .title {
    font-size: clamp(36px, 10vw, 52px);
  }

  .player {
    max-width: 100%;
    padding: 20px;
    gap: 16px;
  }
}
```

Replace with:
```css
@media (max-width: 768px) {
  .section {
    padding: 80px 24px;
  }

  .inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .title {
    font-size: clamp(36px, 10vw, 52px);
  }

  .player {
    padding: 20px;
    gap: 16px;
  }
}
```

- [ ] **Step 8: Visual check in dev server**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- Manifesto section is noticeably shorter on desktop (≥769px)
- Title and ornament appear in the left column, player in the right column
- Click play: manifesto text fades in staggered in the right column
- Resize to ≤768px: columns stack vertically, left col (title) above right col (player)
- All existing fade-in animations still work

- [ ] **Step 9: Build check**

```bash
npm run build
```

Expected: completes with no errors.

- [ ] **Step 10: Commit**

```bash
git add components/home/Manifesto.tsx components/home/Manifesto.module.css
git commit -m "feat: manifesto 2-column layout — title left, player right"
```
