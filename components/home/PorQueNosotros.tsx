'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './PorQueNosotros.module.css';

const GlobeIcon = () => (
  <svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="#B08A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="18"/>
    <ellipse cx="24" cy="24" rx="7" ry="18"/>
    <line x1="6" y1="24" x2="42" y2="24"/>
    <path d="M9 15 Q24 20 39 15"/>
    <path d="M9 33 Q24 28 39 33"/>
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="#B08A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="18"/>
    <circle cx="24" cy="24" r="11"/>
    <circle cx="24" cy="24" r="4"/>
    <line x1="38" y1="10" x2="28" y2="20"/>
    <polyline points="34,10 38,10 38,14"/>
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="#B08A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 28a8 8 0 0 0 11.3 0l5.7-5.7a8 8 0 0 0-11.3-11.3l-3 3"/>
    <path d="M28 20a8 8 0 0 0-11.3 0l-5.7 5.7a8 8 0 0 0 11.3 11.3l3-3"/>
  </svg>
);

const HexIcon = () => (
  <svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="#B08A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="24,6 42,18 42,30 24,42 6,30 6,18"/>
    <line x1="6" y1="18" x2="42" y2="18"/>
    <line x1="6" y1="30" x2="42" y2="30"/>
    <line x1="24" y1="6" x2="24" y2="42"/>
  </svg>
);

export default function PorQueNosotros() {
  const { t } = useI18n();

  const features = [
    { titleKey: 'porquenosotros.feat1Title', descKey: 'porquenosotros.feat1Desc', icon: <GlobeIcon /> },
    { titleKey: 'porquenosotros.feat2Title', descKey: 'porquenosotros.feat2Desc', icon: <TargetIcon /> },
    { titleKey: 'porquenosotros.feat3Title', descKey: 'porquenosotros.feat3Desc', icon: <LinkIcon /> },
    { titleKey: 'porquenosotros.feat4Title', descKey: 'porquenosotros.feat4Desc', icon: <HexIcon /> },
  ];

  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className={styles.inner}>
        <div className="s-hd">
          <h2 className="s-title">{t('porquenosotros.heading')}</h2>
          <p className={styles.body}>{t('porquenosotros.body')}</p>
        </div>
        <div className={styles.featGrid}>
          {features.map((f) => (
            <div key={f.titleKey} className={styles.featItem}>
              <div className={styles.featIcon}>{f.icon}</div>
              <h3 className={styles.featTitle}>{t(f.titleKey)}</h3>
              <p className={styles.featDesc}>{t(f.descKey)}</p>
            </div>
          ))}
        </div>
      </RevealWrapper>
    </section>
  );
}
