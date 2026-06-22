'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './BrandsComoFunciona.module.css';

const STEPS = [
  { num: '01', titleKey: 'brandsComoFunciona.step1Title', descKey: 'brandsComoFunciona.step1Desc' },
  { num: '02', titleKey: 'brandsComoFunciona.step2Title', descKey: 'brandsComoFunciona.step2Desc' },
  { num: '03', titleKey: 'brandsComoFunciona.step3Title', descKey: 'brandsComoFunciona.step3Desc' },
  { num: '04', titleKey: 'brandsComoFunciona.step4Title', descKey: 'brandsComoFunciona.step4Desc' },
];

export default function BrandsComoFunciona() {
  const { t } = useI18n();
  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className="s-hd">
        <p className="s-eye">{t('brandsComoFunciona.eyebrow')}</p>
        <h2 className="s-title">{t('brandsComoFunciona.title')}</h2>
      </RevealWrapper>
      <RevealWrapper className={styles.steps}>
        {STEPS.map((s) => (
          <div key={s.num} className={styles.step}>
            <span className={styles.stepNum}>{s.num}</span>
            <div className={styles.stepContent}>
              <strong className={styles.stepTitle}>{t(s.titleKey)}</strong>
              <p className={styles.stepDesc}>{t(s.descKey)}</p>
            </div>
          </div>
        ))}
      </RevealWrapper>
    </section>
  );
}
