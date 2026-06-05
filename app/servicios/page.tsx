'use client';

import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
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

const paginasIcon = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
    <rect x="6" y="6" width="36" height="42" rx="1" />
    <line x1="14" y1="18" x2="34" y2="18" />
    <line x1="14" y1="25" x2="34" y2="25" />
    <line x1="14" y1="32" x2="24" y2="32" />
  </svg>
);

const rentalsIcon = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
    <rect x="4" y="14" width="40" height="26" rx="1" />
    <path d="M12 14V10a12 12 0 0 1 24 0v4" />
    <circle cx="24" cy="27" r="3" />
  </svg>
);

export default function ServiciosPage() {
  const { t } = useI18n();

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <p className="s-eye">{t('servicios.eyebrow')}</p>
        <h1 className="s-title">
          {t('servicios.title')} <em>{t('servicios.titleEm')}</em>
        </h1>
        <p className={`s-sub ${styles.headerSub}`}>{t('servicios.sub')}</p>
      </div>

      {/* Service 1: Affiliate */}
      <section className={`sec ${styles.serviceSection} ${styles.lightBg}`}>
        <RevealWrapper className={styles.serviceCols}>
          <div className={styles.serviceIcon}>{affiliateIcon}</div>
          <div className={styles.serviceContent}>
            <p className={styles.serviceEye}>{t('servicios.affiliateEyebrow')}</p>
            <h2 className={styles.serviceTitle}>{t('servicios.affiliateTitle')}</h2>
            <p className={styles.serviceBody}>{t('servicios.affiliateBody1')}</p>
            <p className={styles.serviceBody}>{t('servicios.affiliateBody2')}</p>
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
            <div className={styles.ctaRow}>
              <a href={CONTACT} className="btn-dark">{t('servicios.affiliateCta')}</a>
              <a href="/servicios/afiliados" className="btn-outline">{t('servicios.affiliateDetailCta')}</a>
            </div>
          </div>
        </RevealWrapper>
      </section>

      {/* Service 2: PaginasDeLujo */}
      <section id="paginas" className={`sec ${styles.serviceSection} ${styles.darkBg}`}>
        <RevealWrapper className={`${styles.serviceCols} ${styles.serviceColsReverse}`}>
          <div className={`${styles.serviceIcon} ${styles.serviceIconDark}`}>{paginasIcon}</div>
          <div className={styles.serviceContent}>
            <p className={`${styles.serviceEye} ${styles.serviceEyeLight}`}>{t('servicios.paginasEyebrow')}</p>
            <h2 className={`${styles.serviceTitle} ${styles.serviceTitleLight}`}>{t('servicios.paginasTitle')}</h2>
            <p className={`${styles.serviceBody} ${styles.serviceBodyLight}`}>{t('servicios.paginasBody1')}</p>
            <p className={`${styles.serviceBody} ${styles.serviceBodyLight}`}>{t('servicios.paginasBody2')}</p>
            <div className={styles.examplesRow}>
              {['spadelujo.com/el-spa-de-nati', 'esteticadelujo.com/bella-by-sofia', 'bellezadelujo.com/luna-beauty'].map((ex) => (
                <span key={ex} className={styles.exTag}>{ex}</span>
              ))}
            </div>
            <a
              href="https://paginasdelujo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              {t('servicios.paginasCta')}
            </a>
          </div>
        </RevealWrapper>
      </section>

      {/* Service 3: Rentals */}
      <section id="alquileres" className={`sec ${styles.serviceSection} ${styles.lightBg}`}>
        <RevealWrapper className={styles.serviceCols}>
          <div className={styles.serviceIcon}>{rentalsIcon}</div>
          <div className={styles.serviceContent}>
            <p className={styles.serviceEye}>{t('servicios.rentalsEyebrow')}</p>
            <h2 className={styles.serviceTitle}>{t('servicios.rentalsTitle')}</h2>
            <p className={styles.serviceBody}>{t('servicios.rentalsBody')}</p>
            <a href={CONTACT} className="btn-outline">{t('servicios.rentalsCta')}</a>
          </div>
        </RevealWrapper>
      </section>
    </div>
  );
}
