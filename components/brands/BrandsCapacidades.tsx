'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './BrandsCapacidades.module.css';

const CARDS = [
  { titleKey: 'brandsCapacidades.card1Title', descKey: 'brandsCapacidades.card1Desc' },
  { titleKey: 'brandsCapacidades.card2Title', descKey: 'brandsCapacidades.card2Desc' },
  { titleKey: 'brandsCapacidades.card3Title', descKey: 'brandsCapacidades.card3Desc' },
  { titleKey: 'brandsCapacidades.card4Title', descKey: 'brandsCapacidades.card4Desc' },
];

export default function BrandsCapacidades() {
  const { t } = useI18n();
  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className="s-hd">
        <p className="s-eye">{t('brandsCapacidades.eyebrow')}</p>
        <h2 className="s-title">{t('brandsCapacidades.title')}</h2>
      </RevealWrapper>
      <RevealWrapper className={styles.grid}>
        {CARDS.map((c) => (
          <div key={c.titleKey} className={styles.card}>
            <h3 className={styles.cardTitle}>{t(c.titleKey)}</h3>
            <p className={styles.cardDesc}>{t(c.descKey)}</p>
          </div>
        ))}
      </RevealWrapper>
    </section>
  );
}
