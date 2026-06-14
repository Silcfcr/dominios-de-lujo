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
        <div className={styles.leftCol}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{t('stats.stat1Num')}</span>
              <span className={styles.statLabel}>{t('stats.stat1Label')}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{t('stats.stat2Num')}</span>
              <span className={styles.statLabel}>{t('stats.stat2Label')}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{t('stats.stat3Num')}</span>
              <span className={styles.statLabel}>{t('stats.stat3Label')}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{t('stats.stat4Num')}</span>
              <span className={styles.statLabel}>{t('stats.stat4Label')}</span>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <p className="s-eye lft">{t('affiliateIntro.eyebrow')}</p>
          <h2 className="s-title inv">{t('affiliateIntro.heading')}</h2>
          <hr className={styles.rule} />
          <p className={styles.para}>
            {t('affiliateIntro.p1a')}<em>{t('affiliateIntro.p1b')}</em>{t('affiliateIntro.p1c')}
          </p>
          <p className={styles.para}>
            {t('affiliateIntro.p2a')}<em>{t('affiliateIntro.p2b')}</em>{t('affiliateIntro.p2c')}
          </p>
          <p className={styles.para}>
            {t('affiliateIntro.p3a')}<em>{t('affiliateIntro.p3b')}</em>{t('affiliateIntro.p3c')}
          </p>
          <div className={styles.cta}>
            <Link href="/brands" className="btn-gold">
              {t('affiliateIntro.cta')}
            </Link>
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
