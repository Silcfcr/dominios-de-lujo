'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { assetPath } from '@/lib/assetPath';
import styles from './Footer.module.css';

const CONTACT_EMAIL = 'mailto:contacto@dominiosdelujo.com?subject=Consulta%20%E2%80%94%20Dominios%20de%20Lujo';

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Col 1: Brand */}
        <div className={styles.brand}>
          <Image
            src={assetPath('/images/logo.png')}
            alt="Dominios de Lujo"
            width={140}
            height={48}
            className={styles.logo}
            style={{ objectFit: 'contain', height: '42px', width: 'auto' }}
          />
          <p className={styles.slogan}>{t('footer.slogan')}</p>
          <p className={styles.tagline}>{t('footer.tagline')}</p>
        </div>

        {/* Col 2: Dominios */}
        <div>
          <h4 className={styles.colHead}>{t('footer.colDominios')}</h4>
          <ul className={styles.colList}>
            <li><Link href="/dominios">{t('footer.portfolio')}</Link></li>
            <li><Link href="/dominios">{t('footer.categories')}</Link></li>
            <li><Link href="/dominios?flag=yes">{t('footer.flagship')}</Link></li>
          </ul>
        </div>

        {/* Col 3: Servicios */}
        <div>
          <h4 className={styles.colHead}>{t('footer.colServicios')}</h4>
          <ul className={styles.colList}>
            <li><Link href="/servicios">{t('footer.affiliate')}</Link></li>
            <li><a href="https://paginasdelujo.com" target="_blank" rel="noopener noreferrer">{t('footer.paginas')}</a></li>
            <li><Link href="/servicios">{t('footer.rentals')}</Link></li>
            <li><Link href="/servicios">{t('footer.lujototal')}</Link></li>
          </ul>
        </div>

        {/* Col 4: Compañía */}
        <div>
          <h4 className={styles.colHead}>{t('footer.colCompania')}</h4>
          <ul className={styles.colList}>
            <li><Link href="/colaborar">{t('footer.collaborate')}</Link></li>
            <li><a href={CONTACT_EMAIL}>{t('footer.contact')}</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bot}>
        <p className={styles.copy}>
          © {year} Dominios de Lujo. {t('footer.rights')}
        </p>
        <div className={styles.legal}>
          <a href="#">{t('footer.privacy')}</a>
          <span className={styles.dot}>·</span>
          <a href="#">{t('footer.terms')}</a>
        </div>
      </div>
    </footer>
  );
}
