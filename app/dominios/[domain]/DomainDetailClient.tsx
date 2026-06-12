'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { assetPath } from '@/lib/assetPath';
import type { Domain } from '@/lib/types';
import styles from './page.module.css';

let enDomainsCache: Domain[] | null = null;

async function fetchEnDomains(): Promise<Domain[]> {
  if (enDomainsCache) return enDomainsCache;
  const res = await fetch(assetPath('/data/domains_en.json'));
  if (!res.ok) throw new Error('Failed to fetch domains_en.json');
  const data = await res.json() as { domains: Domain[] };
  enDomainsCache = data.domains;
  return enDomainsCache;
}

export default function DomainDetailClient({ domain }: { domain: Domain }) {
  const { t, lang } = useI18n();
  const [displayDomain, setDisplayDomain] = useState<Domain>(domain);

  useEffect(() => {
    if (lang === 'es') {
      setDisplayDomain(domain);
      return;
    }
    fetchEnDomains()
      .then((domains) => {
        const en = domains.find(
          (d) => d.domain.toLowerCase() === domain.domain.toLowerCase()
        );
        setDisplayDomain(en ?? domain);
      })
      .catch(() => setDisplayDomain(domain));
  }, [lang, domain]);

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
                {displayDomain.flagship === 'yes' && (
                  <span className={styles.flagshipBadge}>{t('dominios.flagship')}</span>
                )}
                {displayDomain.affiliate_marketing === 'yes' && (
                  <span className={styles.affiliateBadge}>{t('dominios.affiliateReady')}</span>
                )}
              </div>
              <h1 className={styles.domainName}>{displayDomain.domain}</h1>
              <div className={styles.headerMeta}>
                <span className={styles.metaTag}>{displayDomain.category}</span>
                <span className={styles.metaSep}>·</span>
                <span className={styles.metaTag}>{displayDomain.country}</span>
              </div>
            </div>
            <div className={styles.headerRight}>
              <a
                href={`mailto:info@dominiosdelujo.com?subject=Consulta%20sobre%20${encodeURIComponent(displayDomain.domain)}`}
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
              <p className={styles.sectionText}>{displayDomain.description}</p>
            </div>

            {displayDomain.targeted_audience && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>{t('dominios.audience')}</h2>
                <p className={styles.sectionText}>{displayDomain.targeted_audience}</p>
              </div>
            )}

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('dominios.useCases')}</h2>
              <p className={styles.sectionText}>{displayDomain.use_cases}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
