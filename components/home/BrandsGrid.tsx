'use client';

import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import { assetPath } from '@/lib/assetPath';
import styles from './BrandsGrid.module.css';

type Brand = {
  src: string;
  alt: string;
  descKey: string;
  invert?: boolean;
};

export default function BrandsGrid() {
  const { t } = useI18n();

  const brands: Brand[] = [
    { src: '/images/brands/ddl-logo.svg',     alt: 'Dominios de Lujo', descKey: 'brandsGrid.b1Desc' },
    { src: '/images/brands/me-dijo-que-si.png', alt: 'Me Dijo Que Sí', descKey: 'brandsGrid.b2Desc' },
    { src: '/images/brands/brand-3-logo.png', alt: '',                 descKey: 'brandsGrid.b3Desc' },
    { src: '/images/brands/casasen-logo.png', alt: 'Casasen',          descKey: 'brandsGrid.b4Desc' },
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
            <img
              src={assetPath(brand.src)}
              alt={brand.alt}
              className={brand.invert ? `${styles.logo} ${styles.invert}` : styles.logo}
            />
            <p className={styles.desc}>{t(brand.descKey)}</p>
            <span className={styles.badge}>{t('brandsGrid.soon')}</span>
          </div>
        ))}
      </RevealWrapper>
    </section>
  );
}
