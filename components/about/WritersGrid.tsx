'use client';

import Image from 'next/image';
import { assetPath } from '@/lib/assetPath';
import RevealWrapper from '@/components/ui/RevealWrapper';
import { useI18n } from '@/lib/i18n/context';
import styles from './WritersGrid.module.css';

type Writer = {
  name: string;
  vertical: string;
  quote: string;
  photo?: string;
};

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

export default function WritersGrid() {
  const { t } = useI18n();

  const writers: Writer[] = [
    { name: t('writersGrid.w1Name'), vertical: t('writersGrid.w1Vertical'), quote: t('writersGrid.w1Quote') },
    { name: t('writersGrid.w2Name'), vertical: t('writersGrid.w2Vertical'), quote: t('writersGrid.w2Quote') },
    { name: t('writersGrid.w3Name'), vertical: t('writersGrid.w3Vertical'), quote: t('writersGrid.w3Quote') },
    { name: t('writersGrid.w4Name'), vertical: t('writersGrid.w4Vertical'), quote: t('writersGrid.w4Quote') },
    { name: t('writersGrid.w5Name'), vertical: t('writersGrid.w5Vertical'), quote: t('writersGrid.w5Quote') },
    { name: t('writersGrid.w6Name'), vertical: t('writersGrid.w6Vertical'), quote: t('writersGrid.w6Quote') },
  ];

  return (
    <section className={`sec ${styles.section}`}>
      <div className={styles.header}>
        <p className="s-eye">{t('writersGrid.eyebrow')}</p>
        <h2 className={`s-title ${styles.heading}`}>{t('writersGrid.heading')}</h2>
      </div>
      <div className={styles.grid}>
        {writers.map((writer, i) => (
          <RevealWrapper key={writer.name} delay={(i % 3) as 0 | 1 | 2} className={styles.card}>
            {writer.photo ? (
              <div className={styles.photoWrap}>
                <Image
                  src={assetPath(writer.photo)}
                  alt={writer.name}
                  fill
                  className={styles.photo}
                  sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className={styles.photoPlaceholder} aria-hidden="true">
                <span className={styles.initials}>{initials(writer.name)}</span>
              </div>
            )}
            <div className={styles.info}>
              <p className={styles.vertical}>{writer.vertical}</p>
              <h3 className={styles.name}>{writer.name}</h3>
              <p className={styles.quote}>{writer.quote}</p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
