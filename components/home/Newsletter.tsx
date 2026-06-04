'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    window.location.href = `mailto:info@dominiosdelujo.com?subject=Suscripci%C3%B3n%20Newsletter&body=Suscribir%20email%3A%20${encodeURIComponent(email)}`;
  };

  return (
    <section className={`sec-sm ${styles.section}`}>
      <RevealWrapper className={styles.inner}>
        <p className="s-eye">{t('newsletter.eyebrow')}</p>
        <h2 className={`s-title ${styles.title}`}>
          {t('newsletter.title')} <em>{t('newsletter.titleEm')}</em>
        </h2>
        <p className={styles.sub}>{t('newsletter.sub')}</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            className={styles.input}
            placeholder={t('newsletter.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label={t('newsletter.placeholder')}
          />
          <button type="submit" className={styles.btn}>
            {t('newsletter.btn')}
          </button>
        </form>

        <p className={styles.privacy}>{t('newsletter.privacy')}</p>
      </RevealWrapper>
    </section>
  );
}
