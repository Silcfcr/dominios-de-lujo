# Affiliate Page Narrative Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the copy of `/servicios/afiliados` so it speaks with editorial authority to luxury brand managers evaluating affiliate approval — following the Audiencia → Autoridad → Escala narrative arc.

**Architecture:** Pure copy change — only `lib/i18n/es.json`, `lib/i18n/en.json`, and the three hardcoded stat numbers in `app/servicios/afiliados/page.tsx`. No structural, CSS, or component changes.

**Tech Stack:** Next.js static export, CSS Modules, i18n via flat JSON files in `lib/i18n/`

---

## File Map

| File | What changes |
|---|---|
| `app/servicios/afiliados/page.tsx` | 3 hardcoded stat numbers in the stats bar |
| `lib/i18n/es.json` | Keys in `servicios` namespace + `partnerValue.eyebrow` + `partnerValue.cta` |
| `lib/i18n/en.json` | Same keys as es.json |

**Nothing else changes.** No new keys. No new components. No CSS.

---

## Task 1: Stats bar — align numbers with home

The stats bar in `page.tsx` has three hardcoded numbers (`4.000+`, `20`, `146`) that contradict the home page. Replace with the scale-of-market stats used on the home (`+4.000`, `650M`, `50+`). Also update the labels in both JSON files.

**Files:**
- Modify: `app/servicios/afiliados/page.tsx:37-51`
- Modify: `lib/i18n/es.json` — keys `servicios.stat1Label`, `servicios.stat2Label`, `servicios.stat3Label`
- Modify: `lib/i18n/en.json` — same three keys

- [ ] **Step 1: Update the hardcoded numbers in page.tsx**

In `app/servicios/afiliados/page.tsx`, replace the stats bar block (lines 37–51):

```tsx
      {/* 2. Stats bar */}
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statNum}>+4.000</span>
          <span className={styles.statLabel}>{t('servicios.stat1Label')}</span>
        </div>
        <div className={styles.statDivider} aria-hidden="true" />
        <div className={styles.stat}>
          <span className={styles.statNum}>650M</span>
          <span className={styles.statLabel}>{t('servicios.stat2Label')}</span>
        </div>
        <div className={styles.statDivider} aria-hidden="true" />
        <div className={styles.stat}>
          <span className={styles.statNum}>50+</span>
          <span className={styles.statLabel}>{t('servicios.stat3Label')}</span>
        </div>
      </div>
```

- [ ] **Step 2: Update stat labels in es.json**

In `lib/i18n/es.json`, inside the `"servicios"` object, update:

```json
"stat1Label": "dominios premium en español",
"stat2Label": "hispanohablantes",
"stat3Label": "verticales de lujo",
```

- [ ] **Step 3: Update stat labels in en.json**

In `lib/i18n/en.json`, inside the `"servicios"` object, update:

```json
"stat1Label": "premium domains in Spanish",
"stat2Label": "Spanish speakers",
"stat3Label": "luxury verticals",
```

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/servicios/afiliados/page.tsx lib/i18n/es.json lib/i18n/en.json
git commit -m "feat: align affiliate page stats with home (4000/650M/50+)"
```

---

## Task 2: Hero copy

Replace "Servicio principal" eyebrow with brand-facing positioning. Shorten the 25-word title. Rewrite the sub to open with audience scale instead of platform features.

**Files:**
- Modify: `lib/i18n/es.json` — keys `servicios.affiliateEyebrow`, `servicios.affiliateHeroTitle`, `servicios.affiliateHeroSub`
- Modify: `lib/i18n/en.json` — same three keys

- [ ] **Step 1: Update hero keys in es.json**

In `lib/i18n/es.json`, inside `"servicios"`:

```json
"affiliateEyebrow": "Para marcas de lujo",
"affiliateHeroTitle": "El ecosistema editorial donde tu marca accede al consumidor hispanohablante de lujo.",
"affiliateHeroSub": "650 millones de hispanohablantes de alto poder adquisitivo. Un ecosistema editorial construido exclusivamente para ellos — y para las marcas que entienden su mundo.",
```

- [ ] **Step 2: Update hero keys in en.json**

In `lib/i18n/en.json`, inside `"servicios"`:

```json
"affiliateEyebrow": "For luxury brands",
"affiliateHeroTitle": "The editorial ecosystem where your brand reaches the Spanish-speaking luxury consumer.",
"affiliateHeroSub": "650 million high-net-worth Spanish speakers. An editorial ecosystem built exclusively for them — and for the brands that understand their world.",
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/es.json lib/i18n/en.json
git commit -m "feat: rewrite affiliate hero — brand-facing eyebrow and concise title"
```

---

## Task 3: Audiencia section (value proposition)

Rewrite the "Our platform" section to declare the audience with conviction — no comparisons, no performance marketing language. First pillar of the Audiencia → Autoridad → Escala arc.

**Files:**
- Modify: `lib/i18n/es.json` — keys `servicios.affiliateValueEyebrow`, `servicios.affiliateValueTitle`, `servicios.affiliateBody1`, `servicios.affiliateBody2`
- Modify: `lib/i18n/en.json` — same four keys

- [ ] **Step 1: Update audiencia keys in es.json**

In `lib/i18n/es.json`, inside `"servicios"`:

```json
"affiliateValueEyebrow": "La audiencia que define el lujo en español",
"affiliateValueTitle": "650 millones de hispanohablantes. Un solo ecosistema editorial pensado para ellos.",
"affiliateBody1": "El consumidor hispanohablante de alto poder adquisitivo elige el español por identidad, no por necesidad. Busca el lujo en su idioma, en entornos que comprenden su cultura y su estilo de vida. Este consumidor es el centro de todo lo que construimos en Dominios de Lujo.",
"affiliateBody2": "Con más de 4.000 dominios exactos de lujo y presencia en más de 50 verticales, Dominios de Lujo es el único ecosistema editorial construido específicamente para esta audiencia — en los momentos de mayor intención y con el estándar de calidad que los grandes consumidores de lujo esperan.",
```

- [ ] **Step 2: Update audiencia keys in en.json**

In `lib/i18n/en.json`, inside `"servicios"`:

```json
"affiliateValueEyebrow": "The audience that defines luxury in Spanish",
"affiliateValueTitle": "650 million Spanish speakers. One editorial ecosystem built for them.",
"affiliateBody1": "The high-net-worth Spanish-speaking consumer chooses Spanish by identity, not necessity. They search for luxury in their language, in environments that understand their culture and way of life. This consumer is the centre of everything we build at Dominios de Lujo.",
"affiliateBody2": "With over 4,000 exact-match luxury domains and presence across more than 50 verticals, Dominios de Lujo is the only editorial ecosystem built specifically for this audience — at the moments of highest intent, and to the quality standard that serious luxury consumers expect.",
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/es.json lib/i18n/en.json
git commit -m "feat: rewrite affiliate audiencia section — declarative, no performance language"
```

---

## Task 4: Editorial authority section (LujoTotal™ standard)

Shift from self-congratulation to identity declaration. LujoTotal™ as a quality standard that defines what DdL is — not a safety net, not a feature. Second pillar of the arc.

**Files:**
- Modify: `lib/i18n/es.json` — keys `servicios.editorialEyebrow`, `servicios.editorialBody`
- Modify: `lib/i18n/en.json` — same two keys

- [ ] **Step 1: Update editorial keys in es.json**

In `lib/i18n/es.json`, inside `"servicios"`:

```json
"editorialEyebrow": "El estándar LujoTotal™",
"editorialBody": "LujoTotal™ es el estándar de calidad bajo el que opera cada dominio, cada artículo y cada asociación de la plataforma. No es un sello que se solicita — es lo que somos. Cada pieza editorial es técnicamente rigurosa, culturalmente precisa y editorialmente coherente. Para las marcas que eligen estar aquí, la calidad no es una promesa. Es el punto de partida.",
```

- [ ] **Step 2: Update editorial keys in en.json**

In `lib/i18n/en.json`, inside `"servicios"`:

```json
"editorialEyebrow": "The LujoTotal™ Standard",
"editorialBody": "LujoTotal™ is the quality standard under which every domain, every article, and every brand partnership on the platform operates. It is not a certification that is applied for — it is what we are. Every editorial piece is technically rigorous, culturally accurate, and editorially consistent. For the brands that choose to be here, quality is not a promise. It is the starting point.",
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/es.json lib/i18n/en.json
git commit -m "feat: rewrite editorial authority section as LujoTotal™ identity declaration"
```

---

## Task 5: Scale section ("Por qué nosotros")

Rewrite section header and all four cards to speak with the confidence of a dominant market position. Third pillar of the arc.

**Files:**
- Modify: `lib/i18n/es.json` — keys `servicios.whyEyebrow`, `servicios.whyTitle`, `servicios.why1Title`–`why4Title`, `servicios.why1Desc`–`why4Desc`
- Modify: `lib/i18n/en.json` — same ten keys

- [ ] **Step 1: Update scale section keys in es.json**

In `lib/i18n/es.json`, inside `"servicios"`:

```json
"whyEyebrow": "Una escala sin equivalente",
"whyTitle": "El mayor portafolio de dominios exactos de lujo en español del mundo.",
"why1Title": "4.000+ activos editoriales de precisión",
"why1Desc": "Más de 4.000 dominios exactos, cada uno alineado con un momento preciso de búsqueda — desde 'joyería de lujo' hasta 'villas en Mallorca'. Una infraestructura editorial que ningún competidor puede replicar.",
"why2Title": "Una sola alianza. Todo el espectro del lujo.",
"why2Desc": "Propiedades, joyería, moda, gastronomía, viajes, náutica, aviación — más de 50 verticales bajo una sola asociación. Tu marca aparece donde tu consumidor ya está buscando.",
"why3Title": "La primera. Y la única.",
"why3Desc": "No existe una plataforma editorial equivalente en español. Dominios de Lujo es pionera en un espacio que apenas empieza a revelar su potencial. Las marcas que llegan primero no comparten el territorio.",
"why4Title": "Búsqueda orgánica. Intención real.",
"why4Desc": "Nuestra audiencia llega a través de la búsqueda orgánica con una necesidad concreta. No son navegantes casuales: son compradores activos de lujo en el momento exacto en que tu marca puede importar.",
```

- [ ] **Step 2: Update scale section keys in en.json**

In `lib/i18n/en.json`, inside `"servicios"`:

```json
"whyEyebrow": "A scale without equivalent",
"whyTitle": "The world's largest exact-match luxury domain portfolio in Spanish.",
"why1Title": "4,000+ precision editorial assets",
"why1Desc": "Over 4,000 exact-match domains, each aligned with a precise search moment — from 'luxury jewellery' to 'Mallorca villas'. An editorial infrastructure no competitor can replicate.",
"why2Title": "One partnership. The full luxury spectrum.",
"why2Desc": "Real estate, jewellery, fashion, gastronomy, travel, yachts, aviation — over 50 verticals under a single partnership. Your brand appears where your consumer is already searching.",
"why3Title": "The first. And the only.",
"why3Desc": "No equivalent editorial platform exists in Spanish. Dominios de Lujo is a pioneer in a space that is only beginning to reveal its potential. The brands that arrive first do not share the territory.",
"why4Title": "Organic search. Real intent.",
"why4Desc": "Our audience arrives through organic search with a concrete need. They are not casual browsers — they are active luxury buyers at the exact moment your brand can matter.",
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/es.json lib/i18n/en.json
git commit -m "feat: rewrite affiliate scale section — dominant market position tone"
```

---

## Task 6: PartnerValue — eyebrow and CTA

Two small copy changes to make the section speak to the brand manager before they become a partner, and align the CTA with the conversational tone of the rest of the page.

**Files:**
- Modify: `lib/i18n/es.json` — keys `partnerValue.eyebrow`, `partnerValue.cta`
- Modify: `lib/i18n/en.json` — same two keys

- [ ] **Step 1: Update partnerValue keys in es.json**

In `lib/i18n/es.json`, inside `"partnerValue"`:

```json
"eyebrow": "Lo que tu marca obtiene",
"cta": "Iniciar la conversación",
```

- [ ] **Step 2: Update partnerValue keys in en.json**

In `lib/i18n/en.json`, inside `"partnerValue"`:

```json
"eyebrow": "What your brand gets",
"cta": "Start the conversation",
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/es.json lib/i18n/en.json
git commit -m "feat: update partnerValue eyebrow and CTA to brand-manager voice"
```

---

## Task 7: Final visual verification

Confirm the full page renders correctly in both languages with no visual regressions.

**Files:** None — read-only verification.

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Expected: server starts on `http://localhost:3000`, no build errors.

- [ ] **Step 2: Review affiliate page in Spanish**

Open `http://localhost:3000/servicios/afiliados` and verify:

- Hero eyebrow reads "Para marcas de lujo" (not "Servicio principal")
- Hero title is a single clean sentence (~14 words)
- Stats bar shows `+4.000` / `650M` / `50+` with correct labels
- Value section eyebrow reads "La audiencia que define el lujo en español"
- Dark editorial section eyebrow reads "El estándar LujoTotal™"
- Why section eyebrow reads "Una escala sin equivalente"
- PartnerValue section eyebrow reads "Lo que tu marca obtiene"
- PartnerValue CTA reads "Iniciar la conversación"

- [ ] **Step 3: Toggle to English and verify**

Click the language toggle on the page and verify the English versions render correctly with the updated copy.

- [ ] **Step 4: Check home page stat consistency**

Open `http://localhost:3000` and confirm the home page stats (`+4.000 / 650M / 24`) are unchanged — we did not touch `affiliateIntro` keys.

- [ ] **Step 5: Final lint**

```bash
npm run lint
```

Expected: no errors or warnings introduced by this change.
