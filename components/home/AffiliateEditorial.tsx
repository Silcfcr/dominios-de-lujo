'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './AffiliateEditorial.module.css';

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

export default function AffiliateEditorial() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number>(0);

  const steps = [
    { num: '01', titleKey: 'affiliateIntro.step1Title', descKey: 'affiliateIntro.step1Desc' },
    { num: '02', titleKey: 'affiliateIntro.step2Title', descKey: 'affiliateIntro.step2Desc' },
    { num: '03', titleKey: 'affiliateIntro.step3Title', descKey: 'affiliateIntro.step3Desc' },
    { num: '04', titleKey: 'affiliateIntro.step4Title', descKey: 'affiliateIntro.step4Desc' },
  ];

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
          <h2 className="s-title">{t('affiliateIntro.heading')}</h2>
          <hr className={styles.rule} />
          <p className={styles.body}>{t('affiliateIntro.body')}</p>

          <div className={styles.steps}>
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={styles.step}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <div className={styles.stepTop}>
                  <span className={styles.stepNum}>{step.num}</span>
                  <span className={`${styles.stepLabel}${open === i ? ` ${styles.stepLabelOpen}` : ''}`}>
                    {t(step.titleKey)}
                  </span>
                  <span className={`${styles.stepChev}${open === i ? ` ${styles.stepChevOpen}` : ''}`}>
                    <ChevronIcon />
                  </span>
                </div>
                <div className={`${styles.stepBody}${open === i ? ` ${styles.stepBodyOpen}` : ''}`}>
                  {t(step.descKey)}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cta}>
            <Link href="/brands" className="btn-dark">{t('affiliateIntro.cta')}</Link>
            <p className={styles.note}>{t('affiliateIntro.note')}</p>
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
