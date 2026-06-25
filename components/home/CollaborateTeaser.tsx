'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './CollaborateTeaser.module.css';

export default function CollaborateTeaser() {
  const { t } = useI18n();

  return (
    <section className={`sec ${styles.section}`}>
      <div className={styles.wm} aria-hidden="true">LUJO</div>

      <div className={styles.inner}>
        <RevealWrapper className="s-hd">
          <p className="s-eye">{t('collaborateTeaser.eyebrow')}</p>
          <h2 className="s-title">
            {t('collaborateTeaser.title')} <em>{t('collaborateTeaser.titleEm')}</em>
          </h2>
          <p className={styles.subtitle}>{t('collaborateTeaser.subtitle')}</p>
        </RevealWrapper>

        <RevealWrapper delay={1} className={styles.cta}>
          <Link href="/colaborar" className="btn-dark">{t('collaborateTeaser.cta')}</Link>
        </RevealWrapper>
      </div>
    </section>
  );
}
