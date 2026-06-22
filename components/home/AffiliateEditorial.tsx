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
          <p className={styles.body}>{t('affiliateIntro.body')}</p>
          <ol className={styles.steps}>
            <li className={styles.step}>
              <span className={styles.stepNum}>01</span>
              <div className={styles.stepContent}>
                <strong className={styles.stepTitle}>{t('affiliateIntro.step1Title')}</strong>
                <p className={styles.stepDesc}>{t('affiliateIntro.step1Desc')}</p>
              </div>
            </li>
            <li className={styles.step}>
              <span className={styles.stepNum}>02</span>
              <div className={styles.stepContent}>
                <strong className={styles.stepTitle}>{t('affiliateIntro.step2Title')}</strong>
                <p className={styles.stepDesc}>{t('affiliateIntro.step2Desc')}</p>
              </div>
            </li>
            <li className={styles.step}>
              <span className={styles.stepNum}>03</span>
              <div className={styles.stepContent}>
                <strong className={styles.stepTitle}>{t('affiliateIntro.step3Title')}</strong>
                <p className={styles.stepDesc}>{t('affiliateIntro.step3Desc')}</p>
              </div>
            </li>
            <li className={styles.step}>
              <span className={styles.stepNum}>04</span>
              <div className={styles.stepContent}>
                <strong className={styles.stepTitle}>{t('affiliateIntro.step4Title')}</strong>
                <p className={styles.stepDesc}>{t('affiliateIntro.step4Desc')}</p>
              </div>
            </li>
          </ol>
          <div className={styles.cta}>
            <Link href="/brands" className="btn-gold">{t('affiliateIntro.cta')}</Link>
            <p className={styles.note}>{t('affiliateIntro.note')}</p>
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
