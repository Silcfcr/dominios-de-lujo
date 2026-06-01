'use client';

import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './BrandStrip.module.css';

const icons = {
  reach: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <circle cx="16" cy="16" r="13" />
      <path d="M3 16h26M16 3c-4 6-4 14 0 26M16 3c4 6 4 14 0 26" />
    </svg>
  ),
  domain: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <rect x="3" y="8" width="26" height="18" rx="1" />
      <path d="M3 14h26M11 8V6M21 8V6" />
    </svg>
  ),
  cert: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M16 3l2.5 7.5H26l-6.5 4.7 2.5 7.5L16 18.3l-6 4.4 2.5-7.5L6 10.5h7.5z" />
    </svg>
  ),
};

export default function BrandStrip() {
  const { t } = useI18n();

  const cols = [
    { icon: icons.reach, title: t('brandStrip.col1Title'), desc: t('brandStrip.col1Desc') },
    { icon: icons.domain, title: t('brandStrip.col2Title'), desc: t('brandStrip.col2Desc') },
    { icon: icons.cert, title: t('brandStrip.col3Title'), desc: t('brandStrip.col3Desc') },
  ];

  return (
    <section className={styles.section}>
      <RevealWrapper className={styles.hd}>
        <p className="s-eye">{t('brandStrip.eyebrow')}</p>
        <h2 className="s-title">
          {t('brandStrip.title')} <em>{t('brandStrip.titleEm')}</em>
        </h2>
      </RevealWrapper>

      <div className={styles.cols}>
        {cols.map((col, i) => (
          <RevealWrapper key={i} delay={(i % 3) as 0 | 1 | 2} className={styles.col}>
            <div className={styles.icon}>{col.icon}</div>
            <h3 className={styles.colTitle}>{col.title}</h3>
            <p className={styles.colDesc}>{col.desc}</p>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
