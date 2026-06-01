'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import type { Domain, DomainsData } from '@/lib/types';
import styles from './page.module.css';

export default function DomainDetailPage({ params }: { params: Promise<{ domain: string }> }) {
  const { t } = useI18n();
  const { domain: domainParam } = use(params);
  const [domain, setDomain] = useState<Domain | null>(null);
  const [loading, setLoading] = useState(true);

  const domainName = decodeURIComponent(domainParam);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/data/domains.json`)
      .then((r) => r.json() as Promise<DomainsData>)
      .then((data) => {
        const found = data.domains.find(
          (d) => d.domain.toLowerCase() === domainName.toLowerCase()
        );
        setDomain(found ?? null);
        setLoading(false);
      });
  }, [domainName]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <span>{t('dominios.loading')}</span>
      </div>
    );
  }

  if (!domain) {
    return (
      <div className={styles.notFound}>
        <h1>{t('dominios.notFound')}</h1>
        <Link href="/dominios" className="btn-dark" style={{ marginTop: '24px', display: 'inline-block' }}>
          {t('dominios.back')}
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/dominios" className={styles.back}>
          ← {t('dominios.back')}
        </Link>

        <div className={styles.card}>
          {/* Header */}
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

          {/* Body */}
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
