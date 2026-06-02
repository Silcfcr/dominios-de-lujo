'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { assetPath } from '@/lib/assetPath';
import styles from './Hero.module.css';

const IMAGES = [
  { src: '/images/realEstate.webp', alt: 'Luxury real estate' },
  { src: '/images/watches.webp',    alt: 'Luxury watches' },
  { src: '/images/travel.webp',     alt: 'Luxury travel' },
  { src: '/images/fashion.webp',    alt: 'Luxury fashion' },
];

const INTERVAL = 4500;

export default function Hero() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive(i => (i + 1) % IMAGES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <p className={styles.eyebrow}>{t('hero.eyebrow')}</p>
        <h1 className={styles.h1}>
          {t('hero.h1a')}<br />
          {t('hero.h1b')}<br />
          <em>{t('hero.h1em')}</em>
        </h1>
        <div className={styles.rule} />
        <p className={styles.sub}>{t('hero.sub')}</p>
        <div className={styles.ctas}>
          <Link href="/dominios" className="btn-dark">{t('hero.cta1')}</Link>
          <Link href="/servicios" className="btn-outline">{t('hero.cta2')}</Link>
        </div>
      </div>

      <div className={styles.right}>
        {IMAGES.map((img, i) => (
          <div
            key={img.src}
            className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}
          >
            <Image
              src={assetPath(img.src)}
              alt={img.alt}
              fill
              sizes="50vw"
              className={styles.img}
              priority={i === 0}
            />
          </div>
        ))}
        <div className={styles.overlay} />
        <div className={styles.badge}>
          <span className={styles.badgeNum}>3.000+</span>
          <span className={styles.badgeTxt}>{t('hero.badgeTxt')}</span>
        </div>
      </div>
    </section>
  );
}
