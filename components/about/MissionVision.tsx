'use client';

import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { assetPath } from '@/lib/assetPath';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './MissionVision.module.css';

const TargetIcon = () => (
  <svg className={styles.icon} viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="20" cy="20" r="11" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="20" cy="20" r="4" fill="currentColor" />
  </svg>
);

const EyeIcon = () => (
  <svg className={styles.icon} viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <path
      d="M4 20C4 20 10 8 20 8C30 8 36 20 36 20C36 20 30 32 20 32C10 32 4 20 4 20Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="20" cy="20" r="2" fill="currentColor" />
  </svg>
);

export default function MissionVision() {
  const { t } = useI18n();

  return (
    <section className={`sec ${styles.section}`}>
      <div className={styles.grid}>
        <RevealWrapper delay={0} className={styles.card}>
          <TargetIcon />
          <h2 className={styles.cardTitle}>{t('nosotros.missionTitle')}</h2>
          <p className={styles.cardBody}>{t('nosotros.missionBody')}</p>
        </RevealWrapper>

        <RevealWrapper delay={1} className={styles.imageWrap}>
          <Image
            src={assetPath('/images/partner.jpg')}
            alt=""
            fill
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </RevealWrapper>

        <RevealWrapper delay={2} className={styles.card}>
          <EyeIcon />
          <h2 className={styles.cardTitle}>{t('nosotros.visionTitle')}</h2>
          <p className={styles.cardBody}>{t('nosotros.visionBody')}</p>
        </RevealWrapper>
      </div>
    </section>
  );
}
