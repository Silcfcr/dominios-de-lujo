'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './ConfianzaCredibilidad.module.css';

const ReviewIcon = () => (
  <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="#B08A3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="6" width="28" height="36" rx="2"/>
    <line x1="16" y1="20" x2="32" y2="20"/>
    <line x1="16" y1="27" x2="32" y2="27"/>
    <polyline points="16,35 20,39 30,31"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="#B08A3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 6 L40 14 L40 26 Q40 36 24 44 Q8 36 8 26 L8 14 Z"/>
    <path d="M24 18 L30 24 L24 30 L18 24 Z"/>
  </svg>
);

const BadgeIcon = () => (
  <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="#B08A3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="20" r="14"/>
    <circle cx="24" cy="20" r="8"/>
    <line x1="18" y1="32" x2="14" y2="44"/>
    <line x1="30" y1="32" x2="34" y2="44"/>
    <line x1="14" y1="44" x2="24" y2="38"/>
    <line x1="34" y1="44" x2="24" y2="38"/>
  </svg>
);

export default function ConfianzaCredibilidad() {
  const { t } = useI18n();

  const pillars = [
    { titleKey: 'confianza.pill1Title', descKey: 'confianza.pill1Desc', icon: <ReviewIcon /> },
    { titleKey: 'confianza.pill2Title', descKey: 'confianza.pill2Desc', icon: <ShieldIcon /> },
    { titleKey: 'confianza.pill3Title', descKey: 'confianza.pill3Desc', icon: <BadgeIcon /> },
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
