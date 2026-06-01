'use client';

import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './PaginasSpotlight.module.css';

export default function PaginasSpotlight() {
  const { t } = useI18n();

  return (
    <section className={`sec ${styles.section}`}>
      <div className={styles.inner}>
        <RevealWrapper className={styles.content}>
          <p className="s-eye lft">{t('paginasSpotlight.eyebrow')}</p>
          <h2 className={`s-title ${styles.title}`}>
            {t('paginasSpotlight.title')} <em>{t('paginasSpotlight.titleEm')}</em>
          </h2>
          <p className={styles.body}>{t('paginasSpotlight.body')}</p>
          <div className={styles.examples}>
            {['spadelujo.com/mi-spa', 'chefexclusivo.com/mario', 'villadelujo.com/marbella'].map((ex) => (
              <span key={ex} className={styles.exampleTag}>{ex}</span>
            ))}
          </div>
          <a
            href="https://paginasdelujo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark"
          >
            {t('paginasSpotlight.cta')}
          </a>
        </RevealWrapper>

        <RevealWrapper delay={1} className={styles.visual}>
          <div className={styles.mockup}>
            <div className={styles.mockupBar}>
              <span className={styles.mockupDot} />
              <span className={styles.mockupDot} />
              <span className={styles.mockupDot} />
              <span className={styles.mockupUrl}>paginasdelujo.com</span>
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.mockupHeader}>
                <div className={styles.mockupLine} style={{ width: '60%', height: '18px' }} />
                <div className={styles.mockupLine} style={{ width: '40%', height: '12px', marginTop: '8px' }} />
              </div>
              <div className={styles.mockupImg} />
              <div className={styles.mockupLines}>
                <div className={styles.mockupLine} style={{ width: '100%', height: '10px' }} />
                <div className={styles.mockupLine} style={{ width: '85%', height: '10px', marginTop: '6px' }} />
                <div className={styles.mockupLine} style={{ width: '70%', height: '10px', marginTop: '6px' }} />
              </div>
              <div className={styles.mockupBtn} />
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
