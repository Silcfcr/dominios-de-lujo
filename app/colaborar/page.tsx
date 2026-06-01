'use client';

import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { assetPath } from '@/lib/assetPath';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './page.module.css';

function mailtoFor(role: string, subject: string) {
  return `mailto:contacto@dominiosdelujo.com?subject=${encodeURIComponent(subject)}`;
}

const writerIcon = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
    <path d="M20 40l-6 2 2-6L34 14a4 4 0 0 1 6 6L20 40z" />
    <line x1="10" y1="44" x2="38" y2="44" />
  </svg>
);

const editorIcon = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
    <rect x="6" y="6" width="36" height="36" rx="1" />
    <line x1="14" y1="18" x2="34" y2="18" />
    <line x1="14" y1="25" x2="34" y2="25" />
    <line x1="14" y1="32" x2="26" y2="32" />
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
      eyebrow: t('colaborar.writersEyebrow'),
      title: t('colaborar.writersTitle'),
      body: t('colaborar.writersBody'),
      cta: t('colaborar.writersCta'),
      mailto: mailtoFor('writer', 'Aplicación Redactor — Dominios de Lujo'),
    },
    {
      icon: editorIcon,
      eyebrow: t('colaborar.editorsEyebrow'),
      title: t('colaborar.editorsTitle'),
      body: t('colaborar.editorsBody'),
      cta: t('colaborar.editorsCta'),
      mailto: mailtoFor('editor', 'Aplicación Editor — Dominios de Lujo'),
    },
    {
      icon: influencerIcon,
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
        <p className="s-eye">{t('colaborar.eyebrow')}</p>
        <h1 className={`s-title ${styles.h1}`}>{t('colaborar.title')}</h1>
        <p className={`s-sub ${styles.sub}`}>{t('colaborar.sub')}</p>
      </div>

      {/* Roles */}
      <div className={styles.roles}>
        {roles.map((role, i) => (
          <RevealWrapper key={i} delay={(i % 3) as 0 | 1 | 2} className={styles.role}>
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

      {/* Values section */}
      <RevealWrapper className={styles.values}>
        <div className={styles.valuesInner}>
          <Image
            src={assetPath('/images/lujototal-cert.png')}
            alt="LujoTotal™"
            width={100}
            height={100}
            className={styles.certImage}
            style={{ objectFit: 'contain' }}
          />
          <p className="s-eye">{t('lujototal.eyebrow')}</p>
          <h2 className={`s-title ${styles.valuesTitle}`}>
            Calidad editorial,<br /><em>sin compromiso.</em>
          </h2>
          <p className={styles.valuesBody}>
            Todos los colaboradores trabajan bajo el estándar LujoTotal™ — el sello de excelencia que unifica nuestra red editorial. Rigor, elegancia y autenticidad son nuestros valores fundamentales.
          </p>
        </div>
      </RevealWrapper>
    </div>
  );
}
