'use client';

import { useI18n } from '@/lib/i18n/context';
import styles from './PrivacyPolicy.module.css';

export default function PrivacyPolicy() {
  const { t } = useI18n();

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h1>{t('privacy.title')}</h1>

        <div className={styles.meta}>
          <p className={styles.metaLine}>{t('privacy.effectiveDate')}</p>
          <p className={styles.metaLine}>{t('privacy.website')}</p>
          <p className={styles.metaLine}>{t('privacy.owner')}</p>
        </div>

        <hr className={styles.divider} />

        <h2>{t('privacy.introTitle')}</h2>
        <p>{t('privacy.intro')}</p>

        <h2>{t('privacy.collectTitle')}</h2>
        <ul>
          <li>{t('privacy.collectPersonal')}</li>
          <li>{t('privacy.collectUsage')}</li>
          <li>{t('privacy.collectAggregated')}</li>
        </ul>

        <h2>{t('privacy.useTitle')}</h2>
        <p>{t('privacy.useBody')}</p>

        <h2>{t('privacy.sharingTitle')}</h2>
        <p>{t('privacy.sharingBody1')}</p>
        <p>{t('privacy.sharingBody2')}</p>
        <p>{t('privacy.noSell')}</p>

        <h2>{t('privacy.cookiesTitle')}</h2>
        <p>{t('privacy.cookiesBody')}</p>

        <h2>{t('privacy.rightsTitle')}</h2>
        <p>{t('privacy.rightsBody')}</p>
        <p>{t('privacy.californiaRights')}</p>
        <p>{t('privacy.rightsContact')}</p>

        <h2>{t('privacy.retentionTitle')}</h2>
        <p>{t('privacy.retentionBody')}</p>

        <h2>{t('privacy.securityTitle')}</h2>
        <p>{t('privacy.securityBody')}</p>

        <h2>{t('privacy.internationalTitle')}</h2>
        <p>{t('privacy.internationalBody')}</p>

        <h2>{t('privacy.childrenTitle')}</h2>
        <p>{t('privacy.childrenBody')}</p>

        <h2>{t('privacy.changesTitle')}</h2>
        <p>{t('privacy.changesBody')}</p>

        <h2>{t('privacy.contactTitle')}</h2>
        <p>{t('privacy.contactBody')}</p>
      </div>
    </section>
  );
}
