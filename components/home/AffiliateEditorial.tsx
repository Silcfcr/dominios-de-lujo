'use client';

import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './AffiliateEditorial.module.css';

export default function AffiliateEditorial() {
  const { t } = useI18n();

  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className={styles.inner}>
        <p className={styles.para}>
          {t('affiliateIntro.p1a')}<strong>{t('affiliateIntro.p1b')}</strong>{t('affiliateIntro.p1c')}
        </p>
        <p className={styles.para}>
          {t('affiliateIntro.p2a')}<strong>{t('affiliateIntro.p2b')}</strong>{t('affiliateIntro.p2c')}
        </p>
        <p className={styles.para}>
          {t('affiliateIntro.p3a')}<strong>{t('affiliateIntro.p3b')}</strong>{t('affiliateIntro.p3c')}
        </p>
      </RevealWrapper>
    </section>
  );
}
