'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './ConfianzaCredibilidad.module.css';

const EditorialIcon = () => (
  <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="#B08A3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 36 L8 14 Q8 8 14 8 L34 8 Q40 8 40 14 L40 28 Q40 34 34 34 L20 34 Z"/>
    <line x1="16" y1="18" x2="32" y2="18"/>
    <line x1="16" y1="24" x2="26" y2="24"/>
  </svg>
);

const KeyIcon = () => (
  <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="#B08A3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="20" cy="20" r="10"/>
    <line x1="27" y1="27" x2="42" y2="42"/>
    <line x1="36" y1="36" x2="42" y2="30"/>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="#B08A3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="24,6 28.9,17.6 42,18.9 32.5,27.9 35.3,41 24,34.4 12.7,41 15.5,27.9 6,18.9 19.1,17.6"/>
  </svg>
);

export default function ConfianzaCredibilidad() {
  const { t } = useI18n();

  const pillars = [
    { titleKey: 'confianza.pill1Title', descKey: 'confianza.pill1Desc', icon: <EditorialIcon /> },
    { titleKey: 'confianza.pill2Title', descKey: 'confianza.pill2Desc', icon: <KeyIcon /> },
    { titleKey: 'confianza.pill3Title', descKey: 'confianza.pill3Desc', icon: <StarIcon /> },
  ];

  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className={styles.inner}>
        <div className="s-hd">
          <h2 className="s-title">{t('confianza.heading')}</h2>
          <p className={styles.body}>{t('confianza.body')}</p>
        </div>
        <div className={styles.pillars}>
          {pillars.map((p) => (
            <div key={p.titleKey} className={styles.pillar}>
              <div className={styles.pillarIcon}>{p.icon}</div>
              <h3 className={styles.pillarTitle}>{t(p.titleKey)}</h3>
              <p className={styles.pillarDesc}>{t(p.descKey)}</p>
            </div>
          ))}
        </div>
      </RevealWrapper>
    </section>
  );
}
