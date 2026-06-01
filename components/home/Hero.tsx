'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useI18n();

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
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format&fit=crop"
          alt="Luxury real estate"
          fill
          sizes="50vw"
          className={styles.img}
          priority
        />
        <div className={styles.overlay} />
        <div className={styles.badge}>
          <span className={styles.badgeNum}>3.000+</span>
          <span className={styles.badgeTxt}>{t('hero.badgeTxt')}</span>
        </div>
      </div>
    </section>
  );
}
