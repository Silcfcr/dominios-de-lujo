'use client';

import { useI18n } from '@/lib/i18n/context';
import styles from './DomainSearch.module.css';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function DomainSearch({ value, onChange }: Props) {
  const { t } = useI18n();

  return (
    <div className={styles.wrap}>
      <svg className={styles.icon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.3" />
        <line x1="13" y1="13" x2="18" y2="18" stroke="currentColor" strokeWidth="1.3" />
      </svg>
      <input
        type="search"
        className={styles.input}
        placeholder={t('dominios.searchPlaceholder')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={t('dominios.searchPlaceholder')}
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')} aria-label={t('dominios.clearSearch')}>
          ✕
        </button>
      )}
    </div>
  );
}
