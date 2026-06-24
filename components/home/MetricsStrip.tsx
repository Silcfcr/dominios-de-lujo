'use client';
import { Fragment } from 'react';
import { useI18n } from '@/lib/i18n/context';
import styles from './MetricsStrip.module.css';

const METRICS = [
  { numKey: 'metricsStrip.m1Num', labelKey: 'metricsStrip.m1Label' },
  { numKey: 'metricsStrip.m2Num', labelKey: 'metricsStrip.m2Label' },
  { numKey: 'metricsStrip.m3Num', labelKey: 'metricsStrip.m3Label' },
  { numKey: 'metricsStrip.m4Num', labelKey: 'metricsStrip.m4Label' },
];

export default function MetricsStrip() {
  const { t } = useI18n();
  return (
    <div className={styles.strip}>
      {METRICS.map((m, i) => (
        <Fragment key={m.numKey}>
          {i > 0 && <div className={styles.divider} aria-hidden="true" />}
          <div className={styles.metric}>
            <span className={styles.num}>{t(m.numKey)}</span>
            <span className={styles.label}>{t(m.labelKey)}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
