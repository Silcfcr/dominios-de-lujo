'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './ServicesGrid.module.css';

const icons = {
  affiliate: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <circle cx="8" cy="16" r="4" />
      <circle cx="24" cy="8" r="4" />
      <circle cx="24" cy="24" r="4" />
      <line x1="12" y1="14" x2="20" y2="10" />
      <line x1="12" y1="18" x2="20" y2="22" />
    </svg>
  ),
  paginas: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <rect x="4" y="4" width="24" height="28" rx="1" />
      <line x1="10" y1="12" x2="22" y2="12" />
      <line x1="10" y1="17" x2="22" y2="17" />
      <line x1="10" y1="22" x2="17" y2="22" />
    </svg>
  ),
  rentals: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <rect x="3" y="10" width="26" height="16" rx="1" />
      <path d="M8 10V7a8 8 0 0 1 16 0v3" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  ),
};

export default function ServicesGrid() {
  const { t } = useI18n();

  const services = [
    {
      icon: icons.affiliate,
      title: t('services.s1Title'),
      desc: t('services.s1Desc'),
      cta: t('services.s1Cta'),
      href: '/servicios',
    },
    {
      icon: icons.paginas,
      title: t('services.s2Title'),
      desc: t('services.s2Desc'),
      cta: t('services.s2Cta'),
      href: 'https://paginasdelujo.com',
      external: true,
    },
    {
      icon: icons.rentals,
      title: t('services.s3Title'),
      desc: t('services.s3Desc'),
      cta: t('services.s3Cta'),
      href: '/servicios',
    },
  ];

  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className="s-hd">
        <p className="s-eye">{t('services.eyebrow')}</p>
        <h2 className="s-title">
          {t('services.title')} <em>{t('services.titleEm')}</em>
        </h2>
      </RevealWrapper>

      <div className={styles.grid}>
        {services.map((svc, i) => (
          <RevealWrapper key={i} delay={(i % 3) as 0 | 1 | 2} className={styles.card}>
            <div className={styles.icon}>{svc.icon}</div>
            <h3 className={styles.name}>{svc.title}</h3>
            <p className={styles.desc}>{svc.desc}</p>
            {svc.external ? (
              <a
                href={svc.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {svc.cta}
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 6h8M6 2l4 4-4 4" strokeWidth="1.5" stroke="currentColor" fill="none" />
                </svg>
              </a>
            ) : (
              <Link href={svc.href} className={styles.link}>
                {svc.cta}
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 6h8M6 2l4 4-4 4" strokeWidth="1.5" stroke="currentColor" fill="none" />
                </svg>
              </Link>
            )}
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
