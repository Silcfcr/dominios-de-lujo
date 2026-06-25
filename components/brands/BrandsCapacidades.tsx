'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './BrandsCapacidades.module.css';

const analyticsIcon = (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="18" width="5" height="10" />
    <rect x="13" y="12" width="5" height="16" />
    <rect x="23" y="6" width="5" height="22" />
    <polyline points="6.5,18 15.5,12 25.5,6" />
  </svg>
);

const visibilityIcon = (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="16" cy="6" r="3" />
    <circle cx="5" cy="26" r="3" />
    <circle cx="27" cy="26" r="3" />
    <line x1="16" y1="9" x2="6.5" y2="23" />
    <line x1="16" y1="9" x2="25.5" y2="23" />
    <line x1="8" y1="26" x2="24" y2="26" />
  </svg>
);

const editorialIcon = (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="6" y="2" width="20" height="28" rx="1" />
    <line x1="10" y1="10" x2="22" y2="10" />
    <line x1="10" y1="15" x2="22" y2="15" />
    <line x1="10" y1="20" x2="16" y2="20" />
    <polyline points="19,22 23,18 25,20 21,24 19,24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

const CARDS = [
  { eyebrowKey: 'brandsCapacidades.card1Eyebrow', titleKey: 'brandsCapacidades.card1Title', descKey: 'brandsCapacidades.card1Desc', icon: analyticsIcon },
  { eyebrowKey: 'brandsCapacidades.card2Eyebrow', titleKey: 'brandsCapacidades.card2Title', descKey: 'brandsCapacidades.card2Desc', icon: visibilityIcon },
  { eyebrowKey: 'brandsCapacidades.card3Eyebrow', titleKey: 'brandsCapacidades.card3Title', descKey: 'brandsCapacidades.card3Desc', icon: editorialIcon },
];

export default function BrandsCapacidades() {
  const { t } = useI18n();
  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className="s-hd">
        <p className="s-eye">{t('brandsCapacidades.eyebrow')}</p>
        <h2 className="s-title">{t('brandsCapacidades.title')}</h2>
      </RevealWrapper>
      <div className={styles.grid}>
        {CARDS.map((c, i) => (
          <RevealWrapper key={c.titleKey} delay={(i % 3) as 0 | 1 | 2} className={styles.card}>
            <div className={styles.icon}>{c.icon}</div>
            <p className={styles.cardEyebrow}>{t(c.eyebrowKey)}</p>
            <h3 className={styles.cardTitle}>{t(c.titleKey)}</h3>
            <p className={styles.cardDesc}>{t(c.descKey)}</p>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
