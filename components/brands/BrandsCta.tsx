'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './BrandsCta.module.css';

const CONTACT = 'mailto:info@dominiosdelujo.com?subject=Consulta%20%E2%80%94%20Dominios%20de%20Lujo';

export default function BrandsCta() {
  const { t } = useI18n();
  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className={styles.inner}>
        <p className="s-eye">{t('brandsCta.eyebrow')}</p>
        <h2 className={`s-title ${styles.title}`}>{t('brandsCta.title')}</h2>
        <p className={styles.subtitle}>{t('brandsCta.subtitle')}</p>
        <p className={styles.body}>{t('brandsCta.body')}</p>
        <div className={styles.cta}>
          <a href={CONTACT} className="btn-gold">{t('brandsCta.cta')}</a>
          <p className={styles.note}>{t('brandsCta.note')}</p>
        </div>
      </RevealWrapper>
    </section>
  );
}
