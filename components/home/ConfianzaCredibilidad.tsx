'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './ConfianzaCredibilidad.module.css';

export default function ConfianzaCredibilidad() {
  const { t } = useI18n();

  const pillars = [
    { titleKey: 'confianza.pill1Title', descKey: 'confianza.pill1Desc' },
    { titleKey: 'confianza.pill2Title', descKey: 'confianza.pill2Desc' },
    { titleKey: 'confianza.pill3Title', descKey: 'confianza.pill3Desc' },
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
              <h3 className={styles.pillarTitle}>{t(p.titleKey)}</h3>
              <p className={styles.pillarDesc}>{t(p.descKey)}</p>
            </div>
          ))}
        </div>
        <div className={styles.logoGrid} />
      </RevealWrapper>
    </section>
  );
}
