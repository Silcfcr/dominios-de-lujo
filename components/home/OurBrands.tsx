'use client';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import { assetPath } from '@/lib/assetPath';
import styles from './OurBrands.module.css';

const BRANDS = [
  {
    src: '/images/logos/Color logo - no background.webp',
    alt: 'Anillos de Lujo',
    descKey: 'ourBrands.brand1Desc',
  },
  {
    src: '/images/logos/Color logo - no background (1).webp',
    alt: 'Turismo de Lujo',
    descKey: 'ourBrands.brand2Desc',
  },
  {
    src: '/images/logos/belleza_de_lujo_cream_gold.webp',
    alt: 'Belleza de Lujo',
    descKey: 'ourBrands.brand3Desc',
  },
  {
    src: '/images/logos/logo-white.webp',
    alt: 'Páginas de Lujo',
    descKey: 'ourBrands.brand4Desc',
  },
  {
    src: '/images/logos/ModaDeLujo LOGO_Mesa de trabajo 1.webp',
    alt: 'Moda de Lujo',
    descKey: 'ourBrands.brand5Desc',
  },
  {
    src: '/images/logos/medioquesi-black.webp',
    alt: 'Medio Que Sí',
    descKey: 'ourBrands.brand6Desc',
  },
];

export default function OurBrands() {
  const { t } = useI18n();

  return (
    <section className={styles.section}>
      <RevealWrapper className={styles.hd}>
        <p className="s-eye">{t('ourBrands.eyebrow')}</p>
        <h2 className="s-title">
          {t('ourBrands.title')} <em>{t('ourBrands.titleEm')}</em>
        </h2>
        <p className={styles.sub}>{t('ourBrands.sub')}</p>
      </RevealWrapper>

      <div className={styles.grid}>
        {BRANDS.map((brand, i) => (
          <RevealWrapper
            key={brand.alt}
            delay={(i % 3) as 0 | 1 | 2}
            className={styles.card}
          >
            <div className={styles.logoWrap}>
              <Image
                src={assetPath(brand.src)}
                alt={brand.alt}
                height={56}
                width={200}
                className={styles.logo}
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
            <p className={styles.desc}>{t(brand.descKey)}</p>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
