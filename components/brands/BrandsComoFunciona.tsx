'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import { assetPath } from '@/lib/assetPath';
import styles from './BrandsComoFunciona.module.css';

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const STEPS = [
  { num: '01', titleKey: 'brandsComoFunciona.step1Title', descKey: 'brandsComoFunciona.step1Desc' },
  { num: '02', titleKey: 'brandsComoFunciona.step2Title', descKey: 'brandsComoFunciona.step2Desc' },
  { num: '03', titleKey: 'brandsComoFunciona.step3Title', descKey: 'brandsComoFunciona.step3Desc' },
  { num: '04', titleKey: 'brandsComoFunciona.step4Title', descKey: 'brandsComoFunciona.step4Desc' },
];

export default function BrandsComoFunciona() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number>(0);

  return (
    <section className={styles.section}>
      <div className={styles.outer}>
        <div className={styles.imgCol}>
          <Image
            src={assetPath('/images/hotel.webp')}
            alt=""
            fill
            className={styles.img}
          />
        </div>

        <RevealWrapper className={styles.content}>
          <div className="s-hd">
            <p className="s-eye lft">{t('brandsComoFunciona.eyebrow')}</p>
            <h2 className="s-title">{t('brandsComoFunciona.title')}</h2>
          </div>
          <hr className={styles.rule} />
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                className={styles.step}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <div className={styles.stepTop}>
                  <span className={styles.stepNum}>{s.num}</span>
                  <span className={`${styles.stepLabel}${open === i ? ` ${styles.stepLabelOpen}` : ''}`}>
                    {t(s.titleKey)}
                  </span>
                  <span className={`${styles.stepChev}${open === i ? ` ${styles.stepChevOpen}` : ''}`}>
                    <ChevronIcon />
                  </span>
                </div>
                <div className={`${styles.stepBody}${open === i ? ` ${styles.stepBodyOpen}` : ''}`}>
                  {t(s.descKey)}
                </div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
