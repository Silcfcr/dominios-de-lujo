# Search Dropdown Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the below-fold pill results block with a floating dropdown anchored to the search input.

**Architecture:** Add `isOpen` boolean state to control dropdown visibility; blur/focus handlers on the input open and close it; `onMouseDown={e.preventDefault()}` on each dropdown item prevents the input's blur from firing before the Link navigation. The dropdown renders inside `searchWrap` (already `position: relative`) as an absolutely-positioned panel.

**Tech Stack:** Next.js 16, React, CSS Modules, `next/link`

---

### Task 1: Add `isOpen` state and input focus/blur handlers

**Files:**
- Modify: `components/dominios/DominiosInsigniaAlt.tsx`

- [ ] **Step 1: Add `isOpen` state after the existing `allDomains` state**

In `DominiosInsigniaAlt.tsx`, the two existing state declarations are at lines ~108-110:
```tsx
const [query, setQuery] = useState('');
const [allDomains, setAllDomains] = useState<string[]>([]);
```
Add one more:
```tsx
const [query, setQuery] = useState('');
const [allDomains, setAllDomains] = useState<string[]>([]);
const [isOpen, setIsOpen] = useState(false);
```

- [ ] **Step 2: Update the input element to wire open/close behaviour**

Find the `<input>` element (currently has `onChange={(e) => setQuery(e.target.value)}`). Replace it with:
```tsx
<input
  type="search"
  className={styles.searchInput}
  placeholder={t('dominios.searchPlaceholder')}
  value={query}
  onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
  onFocus={() => { if (query.trim()) setIsOpen(true); }}
  onBlur={() => setIsOpen(false)}
  aria-label={t('dominios.searchPlaceholder')}
/>
```

- [ ] **Step 3: Update the clear button to also close the dropdown**

Find the clear `<button>` (currently `onClick={() => setQuery('')}`). Replace with:
```tsx
<button
  className={styles.searchClear}
  onClick={() => { setQuery(''); setIsOpen(false); }}
  aria-label={t('dominios.clearSearch')}
>
  ✕
</button>
```

- [ ] **Step 4: Verify TypeScript is happy**
```bash
npx tsc --noEmit
```
Expected: no output (no errors).

- [ ] **Step 5: Commit**
```bash
git add components/dominios/DominiosInsigniaAlt.tsx
git commit -m "feat: add isOpen state + blur/focus handlers for search dropdown"
```

---

### Task 2: Add the dropdown JSX, remove the old pills block

**Files:**
- Modify: `components/dominios/DominiosInsigniaAlt.tsx`

- [ ] **Step 1: Remove the old results block**

Find and delete the entire block that starts with `{/* Search results (full list) */}` and ends with its closing `)}`. It looks like:
```tsx
{/* Search results (full list) */}
{q && (
  <div className={styles.results}>
    ...
  </div>
)}
```
Delete it entirely.

- [ ] **Step 2: Add the dropdown inside `searchWrap`**

The `searchWrap` div currently closes after the clear button. Add the dropdown before the closing `</div>` of `searchWrap`:
```tsx
        {isOpen && searchResults.length > 0 && (
          <div className={styles.dropdown}>
            {searchResults.slice(0, 20).map((domain) => {
              const { name, tld } = splitDomain(domain);
              return (
                <Link
                  key={domain}
                  href={`/dominios/${encodeURIComponent(domain)}`}
                  className={styles.dropdownItem}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <span className={styles.dropdownDomain}>{name}</span>
                  <span className={styles.dropdownTld}>{tld}</span>
                </Link>
              );
            })}
            {searchResults.length > 20 && (
              <p className={styles.dropdownMore}>
                + {searchResults.length - 20} {t('dominiosInsignia.results')}
              </p>
            )}
          </div>
        )}
```

The full `searchWrap` block should now look like:
```tsx
<div className={styles.searchWrap}>
  <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.3" />
    <line x1="13" y1="13" x2="18" y2="18" stroke="currentColor" strokeWidth="1.3" />
  </svg>
  <input
    type="search"
    className={styles.searchInput}
    placeholder={t('dominios.searchPlaceholder')}
    value={query}
    onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
    onFocus={() => { if (query.trim()) setIsOpen(true); }}
    onBlur={() => setIsOpen(false)}
    aria-label={t('dominios.searchPlaceholder')}
  />
  {query && (
    <button
      className={styles.searchClear}
      onClick={() => { setQuery(''); setIsOpen(false); }}
      aria-label={t('dominios.clearSearch')}
    >
      ✕
    </button>
  )}
  {isOpen && searchResults.length > 0 && (
    <div className={styles.dropdown}>
      {searchResults.slice(0, 20).map((domain) => {
        const { name, tld } = splitDomain(domain);
        return (
          <Link
            key={domain}
            href={`/dominios/${encodeURIComponent(domain)}`}
            className={styles.dropdownItem}
            onMouseDown={(e) => e.preventDefault()}
          >
            <span className={styles.dropdownDomain}>{name}</span>
            <span className={styles.dropdownTld}>{tld}</span>
          </Link>
        );
      })}
      {searchResults.length > 20 && (
        <p className={styles.dropdownMore}>
          + {searchResults.length - 20} {t('dominiosInsignia.results')}
        </p>
      )}
    </div>
  )}
</div>
```

- [ ] **Step 3: Verify TypeScript**
```bash
npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 4: Commit**
```bash
git add components/dominios/DominiosInsigniaAlt.tsx
git commit -m "feat: replace pill results block with floating dropdown"
```

---

### Task 3: Add dropdown CSS, remove old results CSS

**Files:**
- Modify: `components/dominios/DominiosInsigniaAlt.module.css`

- [ ] **Step 1: Remove the old results CSS**

Find and delete the entire `/* ── SEARCH RESULTS ──...*/` section, which contains these classes:
- `.results`
- `.resultsCount`
- `.resultsPills`
- `.pill`
- `.pill:hover`
- `.noResults`

- [ ] **Step 2: Add dropdown CSS in its place**

Insert the following block where the old results section was:
```css
/* ── DROPDOWN ────────────────────────────────────────── */
.dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--w);
  border: 1px solid rgba(176, 138, 58, 0.3);
  border-radius: 4px;
  box-shadow: 0 4px 24px rgba(26, 23, 20, 0.10);
  z-index: 100;
  overflow: hidden;
}

.dropdownItem {
  display: flex;
  align-items: baseline;
  gap: 2px;
  padding: 10px 16px;
  text-decoration: none;
  border-bottom: 1px solid var(--rule);
  transition: background 0.15s;
}

.dropdownItem:last-child {
  border-bottom: none;
}

.dropdownItem:hover {
  background: rgba(176, 138, 58, 0.06);
}

.dropdownDomain {
  font-family: var(--fd);
  font-size: 14px;
  color: var(--ink);
}

.dropdownTld {
  font-family: var(--fd);
  font-size: 14px;
  color: var(--gold);
}

.dropdownMore {
  padding: 8px 16px;
  font-family: var(--fb);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--ink3);
  text-align: center;
  /* no border-top: the last .dropdownItem already provides border-bottom */
}
```

- [ ] **Step 3: Verify TypeScript (catches CSS Module class name mismatches caught at build time)**
```bash
npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 4: Commit**
```bash
git add components/dominios/DominiosInsigniaAlt.module.css
git commit -m "style: add dropdown CSS, remove old pill results styles"
```

---

### Task 4: Manual verification

**Files:** none — observation only

- [ ] **Step 1: Open the dominios page in the browser**

Dev server is running. Open: `http://localhost:3000/dominios`

- [ ] **Step 2: Test dropdown appears on typing**

Type "bolso" — a dropdown should appear directly below the search input with results like `bolsos.ar`, `bolsos.do`, `bolsosdelujo.com`. The category sections (viajes, autos, etc.) should remain fully visible below.

- [ ] **Step 3: Test ranking order**

Type "anillos" — first results should be `anillos.ar`, `anillos.co`, `anillosdelujo.cl` etc. (starts-with). `mejoresanillos.com`, `marcasdeanillos.es` should appear at the bottom.

- [ ] **Step 4: Test overflow label**

Type "de" — many results. Only 20 should show, with a `+ N dominios` label at the bottom.

- [ ] **Step 5: Test close on blur**

Click outside the search box — dropdown should close. Query text should remain in the input. Click back into the input — dropdown should reopen showing the same results.

- [ ] **Step 6: Test clear button**

Click ✕ — query clears, dropdown closes.

- [ ] **Step 7: Test clicking a result**

Click any result — should navigate to `/dominios/[domain]`.

- [ ] **Step 8: Verify no TypeScript errors**
```bash
npx tsc --noEmit
```
Expected: no output.
