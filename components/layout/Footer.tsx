'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { assetPath } from '@/lib/assetPath';
import styles from './Footer.module.css';

const CONTACT_EMAIL = 'mailto:info@dominiosdelujo.com?subject=Consulta%20%E2%80%94%20Dominios%20de%20Lujo';

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Col 1: Brand */}
        <div className={styles.brand}>
          <Image
            src={assetPath('/images/logo.webp')}
            alt="DominiosDeLujo"
            width={140}
            height={48}
            className={styles.logo}
            style={{ objectFit: 'contain', height: '42px', width: 'auto' }}
          />
          <p className={styles.slogan}>{t('footer.slogan')}</p>
          <p className={styles.tagline}>{t('footer.tagline')}</p>
          <div className={styles.social}>
            <p className={styles.followUs}>{t('footer.followUs')}</p>
            <div className={styles.socialIcons}>
              <a
                href="https://www.linkedin.com/company/dominiosdelujo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.ariaLinkedin')}
                className={styles.socialLink}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/lujototal.oficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.ariaInstagram')}
                className={styles.socialLink}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@lujototal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.ariaTiktok')}
                className={styles.socialLink}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.84a8.17 8.17 0 0 0 4.78 1.52V6.92a4.85 4.85 0 0 1-1.01-.23z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Col 2: Dominios */}
        <div>
          <h4 className={styles.colHead}>{t('footer.colDominios')}</h4>
          <ul className={styles.colList}>
            <li><Link href="/dominios">{t('footer.portfolio')}</Link></li>
          </ul>
        </div>

        {/* Col 3: Para Marcas */}
        <div>
          <h4 className={styles.colHead}>{t('footer.colMarcas')}</h4>
          <ul className={styles.colList}>
            <li><Link href="/brands">{t('footer.forBrands')}</Link></li>
            <li><Link href="/lujototal">{t('footer.lujototal')}</Link></li>
          </ul>
        </div>

        {/* Col 4: Compañía */}
        <div>
          <h4 className={styles.colHead}>{t('footer.colCompania')}</h4>
          <ul className={styles.colList}>
            <li><Link href="/nosotros">{t('footer.about')}</Link></li>
            <li><Link href="/colaborar">{t('footer.collaborate')}</Link></li>
            <li><a href={CONTACT_EMAIL}>{t('footer.contact')}</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bot}>
        <p className={styles.copy}>
          © {year} DominiosDeLujo. {t('footer.rights')}
        </p>
        <div className={styles.legal}>
          <Link href="/privacidad">{t('footer.legal')}</Link>
        </div>
      </div>
    </footer>
  );
}
