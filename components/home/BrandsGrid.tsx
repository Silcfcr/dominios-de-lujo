'use client';

import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './BrandsGrid.module.css';

type Brand = {
  initials: string;
  name: string;
  descKey: string;
};

export default function BrandsGrid() {
  const { t } = useI18n();

  const brands: Brand[] = [
    { initials: 'BL',  name: 'Belleza de Lujo',  descKey: 'brandsGrid.b1Desc' },
    { initials: 'PL',  name: 'Perfumes de Lujo', descKey: 'brandsGrid.b2Desc' },
    { initials: 'ME',  name: 'Moda Exclusiva',   descKey: 'brandsGrid.b3Desc' },
    { initials: 'PDL', name: 'PaginasDeLujo',    descKey: 'brandsGrid.b4Desc' },
  ];

  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className={styles.hd}>
        <p className="s-eye">{t('brandsGrid.eyebrow')}</p>
        <h2 className="s-title">{t('brandsGrid.heading')}</h2>
        <p className={styles.sub}>{t('brandsGrid.sub')}</p>
      </RevealWrapper>
      <RevealWrapper className={styles.grid}>
        {brands.map((brand, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.placeholder} aria-label={brand.name}>
              {brand.initials}
            </div>
            <p className={styles.brandName}>{brand.name}</p>
            <p className={styles.desc}>{t(brand.descKey)}</p>
            <span className={styles.badge}>{t('brandsGrid.soon')}</span>
          </div>
        ))}
      </RevealWrapper>
    </section>
  );
}
