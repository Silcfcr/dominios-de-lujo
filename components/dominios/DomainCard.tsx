'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import type { Domain } from '@/lib/types';
import styles from './DomainCard.module.css';

interface Props {
  domain: Domain;
}

export default function DomainCard({ domain }: Props) {
  const { t } = useI18n();

  return (
    <Link href={`/dominios/${encodeURIComponent(domain.domain)}`} className={styles.card}>
      <div className={styles.top}>
        <span className={styles.name}>{domain.domain}</span>
        <div className={styles.badges}>
          {domain.flagship === 'yes' && (
            <span className={styles.badgeFlagship}>{t('dominios.flagship')}</span>
          )}
        </div>
      </div>
      <div className={styles.meta}>
        <span className={styles.cat}>{domain.category}</span>
        <span className={styles.country}>{domain.country}</span>
      </div>
      <p className={styles.desc}>{domain.description.slice(0, 120)}…</p>
      <span className={styles.cta}>
        {t('dominios.details')}
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2 6h8M6 2l4 4-4 4" strokeWidth="1.3" stroke="currentColor" fill="none" />
        </svg>
      </span>
    </Link>
  );
}
