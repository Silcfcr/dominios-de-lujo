'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import LanguageToggle from '@/components/ui/LanguageToggle';
import styles from './Nav.module.css';

const CONTACT_EMAIL = 'mailto:contacto@dominiosdelujo.com?subject=Consulta%20%E2%80%94%20Dominios%20de%20Lujo';

export default function Nav() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const links = [
    { href: '/', label: t('nav.inicio') },
    { href: '/dominios', label: t('nav.dominios') },
    { href: '/servicios', label: t('nav.servicios') },
    { href: '/colaborar', label: t('nav.colaborar') },
  ];

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        {/* Row 1 */}
        <div className={styles.r1}>
          <Link href="/" className={styles.logoMark} aria-label="Dominios de Lujo — inicio">
            <Image src="/images/logo.png" alt="Dominios de Lujo" width={120} height={44} priority style={{ height: '36px', width: 'auto' }} />
          </Link>
          <Link href="/" className={styles.wordmark}>
            DOMINIOS DE LUJO
          </Link>
          <div className={styles.r1Right}>
            <LanguageToggle />
            <a href={CONTACT_EMAIL} className={styles.iconBtn} aria-label={t('nav.contacto')}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <button
              className={styles.ham}
              onClick={() => setDrawerOpen(true)}
              aria-label="Menú"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Row 2 — desktop links */}
        <div className={styles.r2}>
          <ul className={styles.links}>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={CONTACT_EMAIL} className={styles.link}>
                {t('nav.contacto')}
              </a>
            </li>
          </ul>
        </div>

        {/* Row 3 */}
        <div className={styles.r3}>
          <span className={styles.slogan}>Luxury With Purpose</span>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`${styles.drwBg} ${drawerOpen ? styles.drwBgOn : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside className={`${styles.drw} ${drawerOpen ? styles.drwOn : ''}`} aria-label="Menú de navegación">
        <button className={styles.drwClose} onClick={() => setDrawerOpen(false)}>
          Cerrar ✕
        </button>
        <div className={styles.drwLogo}>
          <Image src="/images/logo.png" alt="Dominios de Lujo" width={120} height={40} style={{ objectFit: 'contain', height: '32px', width: 'auto' }} />
        </div>
        <nav>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={styles.drwLink} onClick={() => setDrawerOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a href={CONTACT_EMAIL} className={styles.drwLink} onClick={() => setDrawerOpen(false)}>
            {t('nav.contacto')}
          </a>
        </nav>
        <div className={styles.drwFooter}>
          <LanguageToggle />
        </div>
      </aside>
    </>
  );
}
