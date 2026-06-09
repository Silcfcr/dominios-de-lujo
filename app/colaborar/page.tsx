'use client';

import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './page.module.css';

function mailtoFor(_role: string, subject: string) {
  return `mailto:info@dominiosdelujo.com?subject=${encodeURIComponent(subject)}`;
}

const writerIcon = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
    <path d="M20 40l-6 2 2-6L34 14a4 4 0 0 1 6 6L20 40z" />
    <line x1="10" y1="44" x2="38" y2="44" />
  </svg>
);

const influencerIcon = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
    <circle cx="24" cy="16" r="7" />
    <path d="M10 42c0-7.7 6.3-14 14-14s14 6.3 14 14" />
    <path d="M36 10l3-4M40 18l4-1M37 28l4 1" />
  </svg>
);

export default function ColaborarPage() {
  const { t } = useI18n();

  const roles = [
    {
      icon: writerIcon,
      number: '01',
      eyebrow: t('colaborar.writersEyebrow'),
      title: t('colaborar.writersTitle'),
      body: t('colaborar.writersBody'),
      cta: t('colaborar.writersCta'),
      mailto: mailtoFor('writer', 'Aplicación Redactor — Dominios de Lujo'),
    },
    {
      icon: influencerIcon,
      number: '02',
      eyebrow: t('colaborar.influencersEyebrow'),
      title: t('colaborar.influencersTitle'),
      body: t('colaborar.influencersBody'),
      cta: t('colaborar.influencersCta'),
      mailto: mailtoFor('influencer', 'Colaboración Influencer — Dominios de Lujo'),
    },
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <p className="s-eye">{t('colaborar.eyebrow')}</p>
          <h1 className={`s-title ${styles.h1}`}>{t('colaborar.title')}</h1>
          <p className={`s-sub ${styles.sub}`}>{t('colaborar.sub')}</p>
        </div>
      </div>

      {/* Writers Intro */}
      <RevealWrapper className={styles.writersIntro}>
        <div className={styles.writersIntroInner}>
          <div className={styles.writersIntroLeft}>
            <h2 className={styles.writersIntroTitle}>{t('colaborar.wiHeading')}</h2>
          </div>
          <div>
            <p className={styles.writersIntroPara}>{t('colaborar.wiP1')}</p>
            <p className={styles.writersIntroPara}>{t('colaborar.wiP2')}</p>
            <p className={styles.writersIntroPara}>{t('colaborar.wiP3')}</p>
            <p className={styles.writersIntroPara}>{t('colaborar.wiP4')}</p>
          </div>
        </div>
      </RevealWrapper>

      {/* Roles */}
      <div className={styles.roles}>
        {roles.map((role, i) => (
          <RevealWrapper key={i} delay={(i % 2) as 0 | 1} className={styles.role}>
            <span className={styles.roleNumber}>{role.number}</span>
            <div className={styles.roleTop}>
              <div className={styles.roleIcon}>{role.icon}</div>
              <div>
                <p className={styles.roleEye}>{role.eyebrow}</p>
                <h2 className={styles.roleTitle}>{role.title}</h2>
              </div>
            </div>
            <p className={styles.roleBody}>{role.body}</p>
            <a href={role.mailto} className="btn-dark">{role.cta}</a>
          </RevealWrapper>
        ))}
      </div>

    </div>
  );
}
