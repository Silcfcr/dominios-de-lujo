# Category Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static 4-card grid in `CategoryTeaser` with an auto-advancing, infinitely-looping centered-spotlight carousel showing image + category name + phrase.

**Architecture:** All 4 cards are rendered as `position: absolute` children of a shared track container. Each card is assigned a CSS class (`active`, `prev`, `next`, `hidden`) based on its distance from the current index. Transitions on `left`, `width`, and `opacity` animate between states. A `setInterval` advances the index every 5 s; arrow buttons trigger immediate advances and reset the timer.

**Tech Stack:** React (useState, useEffect, useRef, useCallback), Next.js `next/image`, CSS Modules, existing `useI18n` hook.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `components/home/CategoryTeaser.tsx` | Rewrite | Carousel state, timer, card rendering |
| `components/home/CategoryTeaser.module.css` | Rewrite | Spotlight layout, card positions, overlay, arrows, mobile |

No new files. No new dependencies.

---

### Task 1: Rewrite `CategoryTeaser.tsx`

**Files:**
- Modify: `components/home/CategoryTeaser.tsx`

> No test framework is configured in this project. Verify visually in the browser after Task 2.

- [ ] **Step 1: Replace the file with the carousel implementation**

```tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './CategoryTeaser.module.css';

const ITEMS = [
  {
    key: 'Propiedades y Bienes Raíces de Lujo',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop',
    phraseEn: 'Luxury is owning a space that defines you.',
    phraseEs: 'El lujo es poseer un espacio que te define.',
  },
  {
    key: 'Joyería, Relojería y Metales Preciosos',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80&auto=format&fit=crop',
    phraseEn: 'Luxury is wearing something that survives generations.',
    phraseEs: 'El lujo es llevar algo que sobrevive generaciones.',
  },
  {
    key: 'Viajes, Turismo, Destinos y Alojamientos',
    image: 'https://images.unsplash.com/photo-1602002418082-dd75b15f3445?w=800&q=80&auto=format&fit=crop',
    phraseEn: 'Luxury is sleeping somewhere that changes your sense of time.',
    phraseEs: 'El lujo es dormir en un lugar que cambia tu sentido del tiempo.',
  },
  {
    key: 'Moda, Accesorios y Alta Costura',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop',
    phraseEn: "Luxury is dressing for who you're becoming.",
    phraseEs: 'El lujo es vestirte para quien estás llegando a ser.',
  },
];

const N        = ITEMS.length;
const INTERVAL = 5000;

export default function CategoryTeaser() {
  const { t, lang } = useI18n();
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const advance = useCallback((dir: 1 | -1) => {
    setActive(i => (i + dir + N) % N);
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => advance(1), INTERVAL);
  }, [advance]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const getPos = (i: number): 'active' | 'prev' | 'next' | 'hidden' => {
    if (i === active)                   return 'active';
    if (i === (active - 1 + N) % N)    return 'prev';
    if (i === (active + 1) % N)        return 'next';
    return 'hidden';
  };

  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className="s-hd">
        <p className="s-eye">{t('categoryTeaser.eyebrow')}</p>
        <h2 className="s-title">
          {t('categoryTeaser.title')} <em>{t('categoryTeaser.titleEm')}</em>
        </h2>
        <p className="s-sub">{t('categoryTeaser.sub')}</p>
      </RevealWrapper>

      <div
        className={styles.stage}
        onMouseEnter={() => clearInterval(timerRef.current)}
        onMouseLeave={startTimer}
      >
        <button
          className={`${styles.navBtn} ${styles.navLeft}`}
          onClick={() => { advance(-1); startTimer(); }}
          aria-label="Previous category"
        >
          ‹
        </button>

        <div className={styles.track}>
          {ITEMS.map((item, i) => {
            const pos    = getPos(i);
            const phrase = lang === 'es' ? item.phraseEs : item.phraseEn;
            return (
              <Link
                key={item.key}
                href={`/dominios?category=${encodeURIComponent(item.key)}`}
                className={`${styles.card} ${styles[pos]}`}
                tabIndex={pos === 'active' ? 0 : -1}
                aria-hidden={pos !== 'active'}
              >
                <Image
                  src={item.image}
                  alt={item.key}
                  fill
                  sizes="(max-width: 768px) 100vw, 52vw"
                  className={styles.img}
                  priority={i === 0}
                />
                <div className={styles.overlay} />
                <div className={styles.info}>
                  <h3 className={styles.name}>
                    {t(`categories.${item.key}`) || item.key}
                  </h3>
                  <p className={styles.phrase}>{phrase}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <button
          className={`${styles.navBtn} ${styles.navRight}`}
          onClick={() => { advance(1); startTimer(); }}
          aria-label="Next category"
        >
          ›
        </button>
      </div>

      <div className={styles.cta}>
        <Link href="/dominios" className="btn-dark">{t('categoryTeaser.cta')}</Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/CategoryTeaser.tsx
git commit -m "feat: carousel state and data for CategoryTeaser"
```

---

### Task 2: Rewrite `CategoryTeaser.module.css`

**Files:**
- Modify: `components/home/CategoryTeaser.module.css`

- [ ] **Step 1: Replace the file with carousel styles**

```css
.section {
  background: var(--c);
}

/* ── Stage ──────────────────────────────────────────────── */
.stage {
  position: relative;
  height: 520px;
  margin-bottom: 52px;
}

/* ── Track ──────────────────────────────────────────────── */
.track {
  position: relative;
  width: 100%;
  height: 100%;
}

/* ── Cards ──────────────────────────────────────────────── */
.card {
  position: absolute;
  top: 0;
  height: 100%;
  overflow: hidden;
  display: block;
  transition:
    left    0.6s cubic-bezier(0.4, 0, 0.2, 1),
    width   0.6s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Spotlight positions:
   prev  1%–23%   (22% wide, 1% gap to active)
   active 25%–75%  (50% wide, centred)
   next  77%–99%  (22% wide, 2% gap from active) */
.active {
  left: 25%;
  width: 50%;
  opacity: 1;
  z-index: 2;
  pointer-events: auto;
}

.prev {
  left: 1%;
  width: 22%;
  opacity: 0.5;
  z-index: 1;
  pointer-events: none;
}

.next {
  left: 77%;
  width: 22%;
  opacity: 0.5;
  z-index: 1;
  pointer-events: none;
}

.hidden {
  left: 25%;
  width: 0;
  opacity: 0;
  z-index: 0;
  pointer-events: none;
}

/* ── Image ──────────────────────────────────────────────── */
.img {
  object-fit: cover;
  transition: transform 0.7s ease;
}

.active:hover .img {
  transform: scale(1.03);
}

/* ── Overlay + text ─────────────────────────────────────── */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.78) 0%,
    rgba(0, 0, 0, 0.12) 55%,
    transparent 100%
  );
  z-index: 1;
}

.info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px 36px;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.35s ease 0s;
}

.active .info {
  opacity: 1;
  transition: opacity 0.45s ease 0.3s; /* delay until card finishes expanding */
}

.name {
  font-family: var(--fd);
  font-size: clamp(18px, 2.2vw, 32px);
  font-weight: 300;
  color: var(--w);
  letter-spacing: 0.06em;
  line-height: 1.2;
  margin-bottom: 10px;
}

.phrase {
  font-family: var(--fb);
  font-size: 13px;
  font-style: italic;
  color: var(--glt);
  letter-spacing: 0.04em;
  line-height: 1.5;
}

/* ── Nav buttons ────────────────────────────────────────── */
.navBtn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 1;
  color: var(--ink2);
  background: var(--w);
  border: 1px solid var(--rule);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

.navBtn:hover {
  color: var(--gold);
  border-color: var(--gold);
}

.navLeft  { left:  0; }
.navRight { right: 0; }

/* ── CTA ────────────────────────────────────────────────── */
.cta {
  text-align: center;
}

/* ── Mobile ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .stage {
    height: 440px;
    margin-bottom: 36px;
  }

  .active {
    left: 6%;
    width: 88%;
  }

  .prev,
  .next {
    opacity: 0;
    pointer-events: none;
  }

  .navLeft  { left:  4px; }
  .navRight { right: 4px; }

  .navBtn {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }

  .info {
    padding: 24px 20px;
  }
}
```

- [ ] **Step 2: Verify in the browser**

Open `http://localhost:3000`. The section previously showing 4 static image cards should now show:
- A large centered card with a full-bleed image, gradient overlay, category name in white Cormorant, and phrase in gold italic Lora
- Two smaller dimmed cards peeking left and right
- `‹` and `›` arrow buttons at the vertical midpoint of the stage
- Cards auto-advance every 5 s
- Hover pauses the timer; mouse-out resumes it
- Arrow clicks advance immediately

Check mobile at < 768px: only the center card should be visible, arrows remain.

- [ ] **Step 3: Commit**

```bash
git add components/home/CategoryTeaser.module.css
git commit -m "feat: centered spotlight carousel for CategoryTeaser"
```
