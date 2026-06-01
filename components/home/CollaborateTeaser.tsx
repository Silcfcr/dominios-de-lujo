'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './CollaborateTeaser.module.css';

const icons = {
  writer: (
    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M14 28l-4 1 1-4L26 10a3 3 0 0 1 4 4L14 28z" />
      <line x1="8" y1="32" x2="28" y2="32" />
    </svg>
  ),
  editor: (
    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <rect x="4" y="4" width="28" height="28" rx="1" />
      <line x1="10" y1="13" x2="26" y2="13" />
      <line x1="10" y1="18" x2="26" y2="18" />
      <line x1="10" y1="23" x2="19" y2="23" />
    </svg>
  ),
  influencer: (
    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <circle cx="18" cy="12" r="5" />
      <path d="M8 30c0-5.5 4.5-10 10-10s10 4.5 10 10" />
      <path d="M26 8l2-3M29 14l3-1M27 20l3 1" />
    </svg>
  ),
};

export default function CollaborateTeaser() {
  const { t } = useI18n();

  const roles = [
    { icon: icons.writer, title: t('collaborateTeaser.w1Title'), desc: t('collaborateTeaser.w1Desc') },
    { icon: icons.editor, title: t('collaborateTeaser.w2Title'), desc: t('collaborateTeaser.w2Desc') },
    { icon: icons.influencer, title: t('collaborateTeaser.w3Title'), desc: t('collaborateTeaser.w3Desc') },
  ];

  return (
    <section className={`sec ${styles.section}`}>
      <div className={styles.wm} aria-hidden="true">LUJO</div>

      <div className={styles.inner}>
        <RevealWrapper className="s-hd">
          <p className="s-eye">{t('collaborateTeaser.eyebrow')}</p>
          <h2 className="s-title">
            {t('collaborateTeaser.title')} <em>{t('collaborateTeaser.titleEm')}</em>
          </h2>
        </RevealWrapper>

        <div className={styles.grid}>
          {roles.map((role, i) => (
            <RevealWrapper key={i} delay={(i % 3) as 0 | 1 | 2} className={styles.card}>
              <div className={styles.icon}>{role.icon}</div>
              <h3 className={styles.cardTitle}>{role.title}</h3>
              <p className={styles.cardDesc}>{role.desc}</p>
            </RevealWrapper>
          ))}
        </div>

        <RevealWrapper delay={2} className={styles.cta}>
          <Link href="/colaborar" className="btn-dark">{t('collaborateTeaser.cta')}</Link>
        </RevealWrapper>
      </div>
    </section>
  );
}
