'use client';

import { useI18n } from '@/lib/i18n/context';
import styles from './LanguageToggle.module.css';

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <div className={styles.toggle}>
      <button
        className={lang === 'es' ? styles.active : styles.btn}
        onClick={() => setLang('es')}
        aria-label="Español"
      >
        ES
      </button>
      <span className={styles.sep}>|</span>
      <button
        className={lang === 'en' ? styles.active : styles.btn}
        onClick={() => setLang('en')}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
