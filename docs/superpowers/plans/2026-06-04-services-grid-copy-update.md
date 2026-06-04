# ServicesGrid Copy Update — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the homepage ServicesGrid section with new heading, per-card audience eyebrow labels, and revised card copy in both ES and EN.

**Architecture:** Three-part change — update both i18n JSON files with new keys and copy, add an `eyebrow` field to the service objects in the component, render it in JSX between the icon and the title, and add a CSS rule for the card-level eyebrow label.

**Tech Stack:** Next.js 16 static export, CSS Modules, flat i18n JSON (es.json / en.json), no test suite.

---

## Files

| Action | File |
|---|---|
| Modify | `lib/i18n/es.json` — update `services` block |
| Modify | `lib/i18n/en.json` — update `services` block |
| Modify | `components/home/ServicesGrid.tsx` — add `eyebrow` field + render |
| Modify | `components/home/ServicesGrid.module.css` — add `.cardEyebrow` |

---

### Task 1: Update ES i18n — services block

**Files:**
- Modify: `lib/i18n/es.json` (services section, lines 68–81)

- [ ] **Step 1: Replace the entire `services` block in `lib/i18n/es.json`**

Find the `"services"` key (currently starts at line 68) and replace its entire contents with:

```json
"services": {
  "eyebrow": "Lo que ofrecemos",
  "title": "Una plataforma,",
  "titleEm": "tres audiencias.",
  "s1Eyebrow": "Para marcas y redes afiliadas",
  "s1Title": "Plataforma Editorial de Afiliados",
  "s1Desc": "Publica contenido editorial de lujo en nuestra red de 3.000+ dominios exactos. Llega a consumidores hispanohablantes de alto poder adquisitivo en el momento de intención de compra.",
  "s1Cta": "Conocer más",
  "s2Eyebrow": "Para profesionales y negocios de lujo",
  "s2Title": "PaginasDeLujo.com",
  "s2Desc": "Tu consulta, spa, hotel, restaurante o boutique merece una identidad digital impecable. Una página profesional en un dominio de lujo exclusivo comunica calidad antes de que alguien lea una sola palabra. Reclama tu presencia y preséntate al mundo con el estándar que tus clientes esperan.",
  "s2Cta": "Explorar plataforma",
  "s3Eyebrow": "Para marcas en campaña",
  "s3Title": "Alquileres y Publicidad Premium",
  "s3Desc": "El dominio exacto que tu campaña necesita — disponible solo durante el tiempo que lo necesites. Visibilidad premium en el momento exacto que importa.",
  "s3Cta": "Ver opciones"
},
```

- [ ] **Step 2: Verify JSON is valid**

```bash
node -e "JSON.parse(require('fs').readFileSync('lib/i18n/es.json','utf8')); console.log('valid')"
```

Expected output: `valid`

- [ ] **Step 3: Commit**

```bash
git add lib/i18n/es.json
git commit -m "feat: update services section ES copy with new heading and audience eyebrows"
```

---

### Task 2: Update EN i18n — services block

**Files:**
- Modify: `lib/i18n/en.json` (services section)

- [ ] **Step 1: Replace the entire `services` block in `lib/i18n/en.json`**

Find the `"services"` key and replace its entire contents with:

```json
"services": {
  "eyebrow": "What we offer",
  "title": "One platform,",
  "titleEm": "three audiences.",
  "s1Eyebrow": "For brands and affiliate networks",
  "s1Title": "Editorial Affiliate Platform",
  "s1Desc": "Publish luxury editorial content across our network of 3,000+ exact-match domains. Reach high-net-worth Spanish-speaking consumers at the precise moment of purchase intent.",
  "s1Cta": "Learn more",
  "s2Eyebrow": "For luxury professionals and businesses",
  "s2Title": "PaginasDeLujo.com",
  "s2Desc": "Your practice, spa, hotel, restaurant, or boutique deserves an impeccable digital identity. A professional page on an exclusive luxury domain communicates quality before anyone reads a word. Claim your presence and present yourself to the world at the standard your clients expect.",
  "s2Cta": "Explore platform",
  "s3Eyebrow": "For brands in campaign",
  "s3Title": "Rentals & Premium Advertising",
  "s3Desc": "The exact domain your campaign needs — available only for as long as you need it. Premium visibility at precisely the moment that matters.",
  "s3Cta": "View options"
},
```

- [ ] **Step 2: Verify JSON is valid**

```bash
node -e "JSON.parse(require('fs').readFileSync('lib/i18n/en.json','utf8')); console.log('valid')"
```

Expected output: `valid`

- [ ] **Step 3: Commit**

```bash
git add lib/i18n/en.json
git commit -m "feat: update services section EN copy with new heading and audience eyebrows"
```

---

### Task 3: Add CSS rule for card eyebrow label

**Files:**
- Modify: `components/home/ServicesGrid.module.css`

- [ ] **Step 1: Add `.cardEyebrow` rule before the `.name` rule**

Open `components/home/ServicesGrid.module.css`. After the `.icon svg` block (ends around line 32) and before the `.name` block (starts around line 34), insert:

```css
.cardEyebrow {
  font-family: var(--fb);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 8px;
}
```

Also add to the `@media (max-width: 900px)` block at the bottom — no change needed there; the eyebrow inherits `text-align: center` from `.card` on mobile.

- [ ] **Step 2: Commit**

```bash
git add components/home/ServicesGrid.module.css
git commit -m "feat: add cardEyebrow CSS rule to ServicesGrid"
```

---

### Task 4: Update ServicesGrid component to render eyebrow

**Files:**
- Modify: `components/home/ServicesGrid.tsx`

- [ ] **Step 1: Add `eyebrow` field to each service object**

In `ServicesGrid.tsx`, update the `services` array (starting around line 38). Replace the entire array with:

```tsx
const services = [
  {
    icon: icons.affiliate,
    eyebrow: t('services.s1Eyebrow'),
    title: t('services.s1Title'),
    desc: t('services.s1Desc'),
    cta: t('services.s1Cta'),
    href: '/servicios',
  },
  {
    icon: icons.paginas,
    eyebrow: t('services.s2Eyebrow'),
    title: t('services.s2Title'),
    desc: t('services.s2Desc'),
    cta: t('services.s2Cta'),
    href: 'https://paginasdelujo.com',
    external: true,
  },
  {
    icon: icons.rentals,
    eyebrow: t('services.s3Eyebrow'),
    title: t('services.s3Title'),
    desc: t('services.s3Desc'),
    cta: t('services.s3Cta'),
    href: '/servicios',
  },
];
```

- [ ] **Step 2: Render the eyebrow between the icon and the title**

In the JSX map block, replace:

```tsx
<div className={styles.icon}>{svc.icon}</div>
<h3 className={styles.name}>{svc.title}</h3>
```

with:

```tsx
<div className={styles.icon}>{svc.icon}</div>
<p className={styles.cardEyebrow}>{svc.eyebrow}</p>
<h3 className={styles.name}>{svc.title}</h3>
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/home/ServicesGrid.tsx
git commit -m "feat: render audience eyebrow label per card in ServicesGrid"
```

---

### Task 5: Visual verification

**Files:** none

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:3000` and scroll to the ServicesGrid section.

- [ ] **Step 2: Check each of these in the browser**

  - Heading reads: "Una plataforma, *tres audiencias.*" (italic em)
  - Card 1 shows small gold uppercase label "PARA MARCAS Y REDES AFILIADAS" above "Plataforma Editorial de Afiliados"
  - Card 2 shows "PARA PROFESIONALES Y NEGOCIOS DE LUJO" above "PaginasDeLujo.com" with the longer 3-sentence description
  - Card 3 shows "PARA MARCAS EN CAMPAÑA" above "Alquileres y Publicidad Premium"
  - Toggle language to EN — all copy switches correctly
  - On mobile (≤900px): eyebrow labels are centered along with the rest of the card

- [ ] **Step 3: Build to catch any static export issues**

```bash
npm run build
```

Expected: exits with `Export successful` and no errors.
