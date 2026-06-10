'use client';

import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import PartnerValue from '@/components/home/PartnerValue';
import styles from './page.module.css';

const CONTACT = 'mailto:info@dominiosdelujo.com?subject=Consulta%20Servicios%20%E2%80%94%20Dominios%20de%20Lujo';

const affiliateIcon = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
    <circle cx="12" cy="24" r="6" />
    <circle cx="36" cy="12" r="6" />
    <circle cx="36" cy="36" r="6" />
    <line x1="18" y1="21" x2="30" y2="15" />
    <line x1="18" y1="27" x2="30" y2="33" />
  </svg>
);

export default function AfiliadosPage() {
  const { t } = useI18n();

  return (
    <div className={styles.page}>

      {/* 1. Hero */}
      <section className={styles.hero}>
        <div className={styles.heroIcon}>{affiliateIcon}</div>
        <p className="s-eye">{t('servicios.affiliateEyebrow')}</p>
        <h1 className={styles.heroTitle}>{t('servicios.affiliateHeroTitle')}</h1>
        <p className={styles.heroSub}>{t('servicios.affiliateHeroSub')}</p>
        <a href={CONTACT} className="btn-dark">{t('servicios.affiliateCta')}</a>
      </section>

      {/* 2. Stats bar */}
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statNum}>+4.000</span>
          <span className={styles.statLabel}>{t('servicios.stat1Label')}</span>
        </div>
        <div className={styles.statDivider} aria-hidden="true" />
        <div className={styles.stat}>
          <span className={styles.statNum}>650M</span>
          <span className={styles.statLabel}>{t('servicios.stat2Label')}</span>
        </div>
        <div className={styles.statDivider} aria-hidden="true" />
        <div className={styles.stat}>
          <span className={styles.statNum}>50+</span>
          <span className={styles.statLabel}>{t('servicios.stat3Label')}</span>
        </div>
      </div>

      {/* 3. Value proposition */}
      <section className={`sec ${styles.valueSection}`}>
        <RevealWrapper className={styles.valueInner}>
          <p className="s-eye">{t('servicios.affiliateValueEyebrow')}</p>
          <h2 className={styles.valueTitle}>{t('servicios.affiliateValueTitle')}</h2>
          <p className={styles.valueBody}>{t('servicios.affiliateBody1')}</p>
          <p className={styles.valueBody}>{t('servicios.affiliateBody2')}</p>
        </RevealWrapper>
      </section>

      {/* 4. Editorial authority */}
      <section className={styles.editorialSection}>
        <RevealWrapper className={styles.editorialInner}>
          <span className={styles.editorialEye}>{t('servicios.editorialEyebrow')}</span>
          <p className={styles.editorialText}>{t('servicios.editorialBody')}</p>
        </RevealWrapper>
      </section>

      {/* 5. Why us */}
      <section className={`sec ${styles.whySection}`}>
        <RevealWrapper>
          <p className="s-eye">{t('servicios.whyEyebrow')}</p>
          <h2 className="s-title">{t('servicios.whyTitle')}</h2>
        </RevealWrapper>
        <RevealWrapper className={styles.whyGrid}>
          {([
            { num: '01', titleKey: 'servicios.why1Title', descKey: 'servicios.why1Desc' },
            { num: '02', titleKey: 'servicios.why2Title', descKey: 'servicios.why2Desc' },
            { num: '03', titleKey: 'servicios.why3Title', descKey: 'servicios.why3Desc' },
            { num: '04', titleKey: 'servicios.why4Title', descKey: 'servicios.why4Desc' },
          ] as const).map(({ num, titleKey, descKey }) => (
            <div key={num} className={styles.whyCard}>
              <span className={styles.whyNum}>{num}</span>
              <h3 className={styles.whyCardTitle}>{t(titleKey)}</h3>
              <p className={styles.whyCardDesc}>{t(descKey)}</p>
            </div>
          ))}
        </RevealWrapper>
      </section>

      {/* 6. Partner value */}
      <PartnerValue />
    </div>
  );
}
