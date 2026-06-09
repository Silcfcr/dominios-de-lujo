import DominiosInsignia from '@/components/dominios/DominiosInsignia';

export const metadata = {
  title: 'Dominios Insignia — Dominios de Lujo',
  description: 'Los dominios más estratégicos de nuestra red, organizados por vertical. Cada nombre es una marca en potencia.',
};

export default function DominiosPage() {
  return <DominiosInsignia />;
}

/* ── LEGACY list view — preserved for reference ────────────────────

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n/context';
import DomainCard from '@/components/dominios/DomainCard';
import DomainSearch from '@/components/dominios/DomainSearch';
import CategoryDropdown from '@/components/dominios/CategoryDropdown';
import type { Domain, DomainsData, CategoriesData } from '@/lib/types';
import styles from './page.module.css';

const PAGE_SIZE = 24;

function DominiosContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [allDomains, setAllDomains] = useState<Domain[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const initCategory = searchParams.get('category') ?? '';
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initCategory);
  const [page, setPage] = useState(1);
  const [showFlagship, setShowFlagship] = useState(searchParams.get('flag') === 'yes');

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/data/domains.json`).then((r) => r.json() as Promise<DomainsData>),
      fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/data/categories.json`).then((r) => r.json() as Promise<CategoriesData>),
    ]).then(([domainsData, catData]) => {
      setAllDomains(domainsData.domains);
      setCategories(catData.categories.map((c) => c.name));
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let result = allDomains;
    if (activeCategory) {
      result = result.filter((d) => d.category === activeCategory);
    }
    if (showFlagship) {
      result = result.filter((d) => d.flagship === 'yes');
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((d) => d.domain.toLowerCase().includes(q));
    }
    return result;
  }, [allDomains, activeCategory, showFlagship, query]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCategory = useCallback((cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  }, []);

  const handleQuery = useCallback((q: string) => {
    setQuery(q);
    setPage(1);
  }, []);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sideTitle}>{t('dominios.allCategories')}</h2>

        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${!activeCategory && !showFlagship ? styles.filterActive : ''}`}
            onClick={() => { handleCategory(''); setShowFlagship(false); }}
          >
            {t('dominios.allCategories')}
            <span className={styles.filterCount}>{allDomains.length}</span>
          </button>

          <button
            className={`${styles.filterBtn} ${showFlagship ? styles.filterActive : ''}`}
            onClick={() => { setShowFlagship(!showFlagship); setActiveCategory(''); setPage(1); }}
          >
            ★ {t('dominios.flagship')}
          </button>

          <div className={styles.divider} />

          {categories.map((cat) => {
            const count = allDomains.filter((d) => d.category === cat).length;
            return (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
                onClick={() => { handleCategory(cat); setShowFlagship(false); }}
              >
                <span className={styles.filterLabel}>{cat}</span>
                <span className={styles.filterCount}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.mobileFilters}>
          <button
            className={`${styles.filterBtn} ${showFlagship ? styles.filterActive : ''} ${styles.flagshipMobile}`}
            onClick={() => { setShowFlagship(!showFlagship); setActiveCategory(''); setPage(1); }}
          >
            ★ {t('dominios.flagship')}
          </button>
          <CategoryDropdown
            categories={categories}
            value={activeCategory}
            onChange={(cat) => { handleCategory(cat); setShowFlagship(false); }}
            allLabel={t('dominios.allCategories')}
          />
        </div>
      </aside>

      <div className={styles.main}>
        <div className={styles.topBar}>
          <DomainSearch value={query} onChange={handleQuery} />
          <p className={styles.count}>
            {filtered.length} {t('dominios.domains')}
          </p>
        </div>

        {loading ? (
          <div className={styles.loadingGrid}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : paged.length === 0 ? (
          <p className={styles.empty}>{t('dominios.noResults')}</p>
        ) : (
          <div className={styles.grid}>
            {paged.map((domain) => (
              <DomainCard key={domain.domain} domain={domain} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              {t('dominios.prev')}
            </button>
            <span className={styles.pageInfo}>
              {page} / {totalPages}
            </span>
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              {t('dominios.next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function LegacyDominiosPage() {
  const { t } = useI18n();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className="s-eye">{t('dominios.title')}</p>
        <h1 className={`s-title ${styles.h1}`}>{t('dominios.sub')}</h1>
      </div>
      <Suspense fallback={<div className={styles.loading}>{t('dominios.loading')}</div>}>
        <DominiosContent />
      </Suspense>
    </div>
  );
}

────────────────────────────────────────────────────────────────── */
