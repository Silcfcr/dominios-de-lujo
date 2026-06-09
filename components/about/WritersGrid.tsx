'use client';

import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './WritersGrid.module.css';

type Writer = {
  name: string;
  vertical: string;
  quote: string;
};

function WriterCard({ writer, ariaHidden }: { writer: Writer; ariaHidden?: boolean }) {
  return (
    <div className={styles.card} aria-hidden={ariaHidden || undefined}>
      <p className={styles.vertical}>{writer.vertical}</p>
      <p className={styles.quote}>{writer.quote}</p>
      <p className={styles.name}>{writer.name}</p>
    </div>
  );
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

  const reversed = [...writers].reverse();

  return (
    <section className={styles.section}>
      <RevealWrapper className={styles.header}>
        <p className="s-eye">{t('writersGrid.eyebrow')}</p>
        <h2 className={`s-title ${styles.heading}`}>{t('writersGrid.heading')}</h2>
        <p className={styles.sub}>{t('writersGrid.sub')}</p>
      </RevealWrapper>

      <div className={styles.tracks}>
        <div className={styles.track}>
          <div className={styles.trackInner}>
            {writers.map((w, i) => <WriterCard key={i} writer={w} />)}
            {writers.map((w, i) => <WriterCard key={`c-${i}`} writer={w} ariaHidden />)}
          </div>
        </div>
        <div className={`${styles.track} ${styles.trackReverse}`}>
          <div className={styles.trackInner}>
            {reversed.map((w, i) => <WriterCard key={i} writer={w} />)}
            {reversed.map((w, i) => <WriterCard key={`c-${i}`} writer={w} ariaHidden />)}
          </div>
        </div>
      </div>
    </section>
  );
}
