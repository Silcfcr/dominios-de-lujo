'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './BrandsParaQuienEs.module.css';

export default function BrandsParaQuienEs() {
  const { t } = useI18n();
  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className={styles.inner}>
        <p className="s-eye lft">{t('brandsParaQuienEs.eyebrow')}</p>
        <h2 className={`s-title ${styles.heading}`}>{t('brandsParaQuienEs.title')}</h2>
        <p className={styles.body}>{t('brandsParaQuienEs.body1')}</p>
        <p className={styles.body}>{t('brandsParaQuienEs.body2')}</p>
      </RevealWrapper>
    </section>
  );
}
