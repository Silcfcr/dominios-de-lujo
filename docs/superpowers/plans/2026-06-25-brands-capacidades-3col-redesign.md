# BrandsCapacidades 3-Column Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the "Promoción en redes sociales" card from BrandsCapacidades and redesign the grid from a 2-column bordered layout to a 3-column ServicesGrid-style layout with gold line icons and per-card eyebrows.

**Architecture:** Four files change — both i18n JSON files get card4 keys removed and per-card eyebrow keys added; the TSX component gets a new CARDS data structure with inline SVG icons and eyebrow keys; the CSS module is fully replaced with the ServicesGrid pattern (rule-separator grid, Cormorant titles, Lora descriptions, hover effect).

**Tech Stack:** Next.js 16 static export, CSS Modules, React, TypeScript, i18n via `lib/i18n/context.tsx`

## Global Constraints

- No test suite exists — verification is TypeScript type-check (`npx tsc --noEmit`) + visual check via `npm run dev`
- No inline styles; all styling via CSS Modules
- Every visible string must exist in both `lib/i18n/es.json` and `lib/i18n/en.json`
- No CTA links on cards
- No em dashes in any content
- Follow existing CSS custom property tokens: `--fd` (Cormorant), `--fb` (Lora), `--gold`, `--ink`, `--ink3`, `--rule`, `--w`, `--c`, `--c2`, `--text-xs`, `--text-base`, `--text-xl`, `--lh-snug`, `--lh-relaxed`

---

### Task 1: Update i18n files

**Files:**
- Modify: `lib/i18n/es.json`
- Modify: `lib/i18n/en.json`

**Interfaces:**
- Produces: i18n keys `brandsCapacidades.card1Eyebrow`, `brandsCapacidades.card2Eyebrow`, `brandsCapacidades.card3Eyebrow` in both files; `card4Title` and `card4Desc` removed from both files

- [ ] **Step 1: Remove card4 keys and add eyebrow keys in `es.json`**

Open `lib/i18n/es.json`. Inside the `brandsCapacidades` object:

Remove these two lines:
```json
"card4Title": "Promoción en redes sociales",
"card4Desc": "Extendemos su presencia con promoción activa en redes sociales para maximizar el alcance de cada campaña."
```

Add these three lines after `card3Desc`:
```json
"card1Eyebrow": "Analítica",
"card2Eyebrow": "Visibilidad",
"card3Eyebrow": "Editorial"
```

The `brandsCapacidades` block in `es.json` should now look like:
```json
"brandsCapacidades": {
  "eyebrow": "Lo que recibe su marca",
  "title": "Las capacidades de la plataforma a su servicio",
  "card1Title": "Inteligencia y analítica de rendimiento",
  "card1Desc": "Acceso completo a métricas de tráfico, clics, conversiones y rendimiento para optimizar resultados en tiempo real.",
  "card1Eyebrow": "Analítica",
  "card2Title": "Visibilidad Multicanal",
  "card2Desc": "Conecta con consumidores de alto valor a través de un ecosistema de contenido premium y dominios especializados. Aumente la visibilidad de su marca, fortalezca los puntos de contacto con el cliente y acompañe su proceso de decisión de compra dentro del mundo del lujo.",
  "card2Eyebrow": "Visibilidad",
  "card3Title": "Contenido editorial y posicionamiento",
  "card3Desc": "Creamos contenido editorial de lujo que respalda nuevos verticales o dominios y construye visibilidad sostenida.",
  "card3Eyebrow": "Editorial"
}
```

- [ ] **Step 2: Remove card4 keys and add eyebrow keys in `en.json`**

Open `lib/i18n/en.json`. Inside the `brandsCapacidades` object:

Remove these two lines:
```json
"card4Title": "Social Media Promotion",
"card4Desc": "We extend your presence beyond the editorial ecosystem with active social media promotion across multiple channels to maximise the reach of every campaign."
```

Add these three lines after `card3Desc`:
```json
"card1Eyebrow": "Analytics",
"card2Eyebrow": "Visibility",
"card3Eyebrow": "Editorial"
```

The `brandsCapacidades` block in `en.json` should now look like:
```json
"brandsCapacidades": {
  "eyebrow": "What your brand receives",
  "title": "Platform capabilities at your service",
  "card1Title": "Performance Intelligence & Analytics",
  "card1Desc": "Full access to traffic, clicks, conversions, affiliate performance, and campaign insights. Complete visibility to measure, compare, and optimise results in real time.",
  "card1Eyebrow": "Analytics",
  "card2Title": "Multichannel Visibility",
  "card2Desc": "Amplify your brand presence across our luxury ecosystem through strategically connected content, recommendations, and placements that help you reach high-intent audiences at multiple stages of the customer journey.",
  "card2Eyebrow": "Visibility",
  "card3Title": "Editorial Content & Strategic Positioning",
  "card3Desc": "For new verticals or domains, we collaborate with your brand to create luxury editorial content that supports the launch and builds long-term visibility.",
  "card3Eyebrow": "Editorial"
}
```

- [ ] **Step 3: Verify JSON is valid**

Run:
```bash
node -e "JSON.parse(require('fs').readFileSync('lib/i18n/es.json','utf8')); console.log('es.json OK')"
node -e "JSON.parse(require('fs').readFileSync('lib/i18n/en.json','utf8')); console.log('en.json OK')"
```

Expected output:
```
es.json OK
en.json OK
```

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/es.json lib/i18n/en.json
git commit -m "feat: update brandsCapacidades i18n for 3-col redesign"
```

---

### Task 2: Rewrite BrandsCapacidades component and CSS

**Files:**
- Modify: `components/brands/BrandsCapacidades.tsx`
- Modify: `components/brands/BrandsCapacidades.module.css`

**Interfaces:**
- Consumes: i18n keys from Task 1 (`card1Eyebrow`, `card2Eyebrow`, `card3Eyebrow`, `card1Title` through `card3Title`, `card1Desc` through `card3Desc`, `eyebrow`, `title`)
- Produces: `BrandsCapacidades` default export, visual 3-column grid on the brands page

- [ ] **Step 1: Replace `BrandsCapacidades.tsx` with the new implementation**

Write the full file content:

```tsx
'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './BrandsCapacidades.module.css';

const analyticsIcon = (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="18" width="5" height="10" />
    <rect x="13" y="12" width="5" height="16" />
    <rect x="23" y="6" width="5" height="22" />
    <polyline points="6.5,18 15.5,12 25.5,6" />
  </svg>
);

const visibilityIcon = (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="16" cy="6" r="3" />
    <circle cx="5" cy="26" r="3" />
    <circle cx="27" cy="26" r="3" />
    <line x1="16" y1="9" x2="6.5" y2="23" />
    <line x1="16" y1="9" x2="25.5" y2="23" />
    <line x1="8" y1="26" x2="24" y2="26" />
  </svg>
);

const editorialIcon = (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="6" y="2" width="20" height="28" rx="1" />
    <line x1="10" y1="10" x2="22" y2="10" />
    <line x1="10" y1="15" x2="22" y2="15" />
    <line x1="10" y1="20" x2="16" y2="20" />
    <polyline points="19,22 23,18 25,20 21,24 19,24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

const CARDS = [
  { eyebrowKey: 'brandsCapacidades.card1Eyebrow', titleKey: 'brandsCapacidades.card1Title', descKey: 'brandsCapacidades.card1Desc', icon: analyticsIcon },
  { eyebrowKey: 'brandsCapacidades.card2Eyebrow', titleKey: 'brandsCapacidades.card2Title', descKey: 'brandsCapacidades.card2Desc', icon: visibilityIcon },
  { eyebrowKey: 'brandsCapacidades.card3Eyebrow', titleKey: 'brandsCapacidades.card3Title', descKey: 'brandsCapacidades.card3Desc', icon: editorialIcon },
];

export default function BrandsCapacidades() {
  const { t } = useI18n();
  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className="s-hd">
        <p className="s-eye">{t('brandsCapacidades.eyebrow')}</p>
        <h2 className="s-title">{t('brandsCapacidades.title')}</h2>
      </RevealWrapper>
      <div className={styles.grid}>
        {CARDS.map((c, i) => (
          <RevealWrapper key={c.titleKey} delay={(i % 3) as 0 | 1 | 2} className={styles.card}>
            <div className={styles.icon}>{c.icon}</div>
            <p className={styles.cardEyebrow}>{t(c.eyebrowKey)}</p>
            <h3 className={styles.cardTitle}>{t(c.titleKey)}</h3>
            <p className={styles.cardDesc}>{t(c.descKey)}</p>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace `BrandsCapacidades.module.css` with the new styles**

Write the full file content:

```css
.section {
  background: var(--c2);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--rule);
  max-width: 1100px;
  margin: 48px auto 0;
}

.card {
  background: var(--w);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  transition: background 0.3s;
}

.card:hover {
  background: var(--c);
}

.icon {
  margin-bottom: 24px;
}

.icon svg {
  width: 32px;
  height: 32px;
  color: var(--gold);
}

.cardEyebrow {
  font-family: var(--fb);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 8px;
}

.cardTitle {
  font-family: var(--fd);
  font-size: var(--text-xl);
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 12px;
  line-height: var(--lh-snug);
}

.cardDesc {
  font-family: var(--fb);
  font-size: var(--text-base);
  line-height: var(--lh-relaxed);
  color: var(--ink3);
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
    margin: 32px 0 0;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 28px 20px;
  }
}
```

- [ ] **Step 3: Run TypeScript type-check**

```bash
npx tsc --noEmit
```

Expected: no errors. If errors appear, fix them before continuing.

- [ ] **Step 4: Start dev server and visually verify**

```bash
npm run dev
```

Navigate to `http://localhost:3000/brands` (or `http://localhost:3000/dominios-de-lujo/brands` if using the base path prefix).

Check:
- Three cards appear side by side in a 3-column grid separated by thin rule lines
- Each card shows: gold SVG icon, gold uppercase eyebrow, Cormorant display title, Lora body text
- Hovering a card shifts its background from white to `--c` (cream)
- The "Promoción en redes sociales" card is gone
- No fourth card appears
- Language toggle works (switch to EN and verify English labels)
- On a narrow viewport (< 900px) cards stack vertically

- [ ] **Step 5: Commit**

```bash
git add components/brands/BrandsCapacidades.tsx components/brands/BrandsCapacidades.module.css
git commit -m "feat: redesign BrandsCapacidades to 3-col ServicesGrid layout with icons"
```
