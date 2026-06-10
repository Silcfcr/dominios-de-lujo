'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './AffiliateEditorial.module.css';

export default function AffiliateEditorial() {
  const { t } = useI18n();

  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className={styles.inner}>
        <p className="s-eye">{t('affiliateIntro.eyebrow')}</p>
        <h2 className="s-title inv">{t('affiliateIntro.heading')}</h2>
        <hr className={styles.rule} />

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{t('affiliateIntro.stat1Num')}</span>
            <span className={styles.statLabel}>{t('affiliateIntro.stat1Label')}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{t('affiliateIntro.stat2Num')}</span>
            <span className={styles.statLabel}>{t('affiliateIntro.stat2Label')}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{t('affiliateIntro.stat3Num')}</span>
            <span className={styles.statLabel}>{t('affiliateIntro.stat3Label')}</span>
          </div>
        </div>

        <p className={styles.para}>
          {t('affiliateIntro.p1a')}<strong>{t('affiliateIntro.p1b')}</strong>{t('affiliateIntro.p1c')}
        </p>
        <p className={styles.para}>
          {t('affiliateIntro.p2a')}<strong>{t('affiliateIntro.p2b')}</strong>{t('affiliateIntro.p2c')}
        </p>
        <p className={styles.para}>
          {t('affiliateIntro.p3a')}<strong>{t('affiliateIntro.p3b')}</strong>{t('affiliateIntro.p3c')}
        </p>
        <div className={styles.cta}>
          <Link href="/servicios/afiliados" className="btn-gold">
            {t('affiliateIntro.cta')}
          </Link>
        </div>
      </RevealWrapper>
    </section>
  );
}
