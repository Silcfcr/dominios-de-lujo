'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import type { Domain } from '@/lib/types';
import styles from './page.module.css';

export default function DomainDetailClient({ domain }: { domain: Domain }) {
  const { t } = useI18n();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/dominios" className={styles.back}>
          ← {t('dominios.back')}
        </Link>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.badges}>
                {domain.flagship === 'yes' && (
                  <span className={styles.flagshipBadge}>{t('dominios.flagship')}</span>
                )}
                {domain.affiliate_marketing === 'yes' && (
                  <span className={styles.affiliateBadge}>{t('dominios.affiliateReady')}</span>
                )}
              </div>
              <h1 className={styles.domainName}>{domain.domain}</h1>
              <div className={styles.headerMeta}>
                <span className={styles.metaTag}>{domain.category}</span>
                <span className={styles.metaSep}>·</span>
                <span className={styles.metaTag}>{domain.country}</span>
              </div>
            </div>
            <div className={styles.headerRight}>
              <a
                href={`mailto:contacto@dominiosdelujo.com?subject=Consulta%20sobre%20${encodeURIComponent(domain.domain)}`}
                className="btn-dark"
              >
                {t('nav.contacto')}
              </a>
            </div>
          </div>

          <div className={styles.rule} />

          <div className={styles.body}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('dominios.description')}</h2>
              <p className={styles.sectionText}>{domain.description}</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('dominios.audience')}</h2>
              <p className={styles.sectionText}>{domain.targeted_audience}</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('dominios.useCases')}</h2>
              <p className={styles.sectionText}>{domain.use_cases}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
