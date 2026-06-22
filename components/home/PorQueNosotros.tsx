'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './PorQueNosotros.module.css';

export default function PorQueNosotros() {
  const { t } = useI18n();

  const features = [
    { titleKey: 'porquenosotros.feat1Title', descKey: 'porquenosotros.feat1Desc' },
    { titleKey: 'porquenosotros.feat2Title', descKey: 'porquenosotros.feat2Desc' },
    { titleKey: 'porquenosotros.feat3Title', descKey: 'porquenosotros.feat3Desc' },
    { titleKey: 'porquenosotros.feat4Title', descKey: 'porquenosotros.feat4Desc' },
  ];

  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className={styles.inner}>
        <div>
          <h2 className={`s-title ${styles.heading}`}>{t('porquenosotros.heading')}</h2>
          <p className={styles.body}>{t('porquenosotros.body')}</p>
        </div>
        <div className={styles.right}>
          {features.map((f) => (
            <div key={f.titleKey} className={styles.feat}>
              <h3 className={styles.featTitle}>{t(f.titleKey)}</h3>
              <p className={styles.featDesc}>{t(f.descKey)}</p>
            </div>
          ))}
        </div>
      </RevealWrapper>
    </section>
  );
}
