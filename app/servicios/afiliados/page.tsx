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
      <div className={styles.header}>
        <p className="s-eye">{t('servicios.affiliateEyebrow')}</p>
        <h1 className="s-title">{t('servicios.affiliateTitle')}</h1>
      </div>

      <section className={`sec ${styles.serviceSection}`}>
        <RevealWrapper className={styles.serviceCols}>
          <div className={styles.serviceIcon}>{affiliateIcon}</div>
          <div className={styles.serviceContent}>
            <p className={styles.serviceBody}>{t('servicios.affiliateBody1')}</p>
            <p className={styles.serviceBody}>{t('servicios.affiliateBody2')}</p>
            <div className={styles.editorialBlock}>
              <p className={styles.editorialEye}>{t('servicios.editorialEyebrow')}</p>
              <p className={styles.editorialText}>{t('servicios.editorialBody')}</p>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>3.000+</span>
                <span className={styles.statLabel}>{t('servicios.stat1Label')}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>20</span>
                <span className={styles.statLabel}>{t('servicios.stat2Label')}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>146</span>
                <span className={styles.statLabel}>{t('servicios.stat3Label')}</span>
              </div>
            </div>
            <a href={CONTACT} className="btn-dark">{t('servicios.affiliateCta')}</a>
          </div>
        </RevealWrapper>
      </section>

      <PartnerValue />
    </div>
  );
}
