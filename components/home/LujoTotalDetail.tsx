'use client';

import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './LujoTotalDetail.module.css';

const CONTACT_EMAIL = 'mailto:info@dominiosdelujo.com?subject=LujoTotal™%20—%20Consulta';

const PRINCIPLES = [
  { num: '01', titleKey: 'lujototalPage.p1Title', descKey: 'lujototalPage.p1Desc' },
  { num: '02', titleKey: 'lujototalPage.p2Title', descKey: 'lujototalPage.p2Desc' },
  { num: '03', titleKey: 'lujototalPage.p3Title', descKey: 'lujototalPage.p3Desc' },
  { num: '04', titleKey: 'lujototalPage.p4Title', descKey: 'lujototalPage.p4Desc' },
  { num: '05', titleKey: 'lujototalPage.p5Title', descKey: 'lujototalPage.p5Desc' },
  { num: '06', titleKey: 'lujototalPage.p6Title', descKey: 'lujototalPage.p6Desc' },
  { num: '07', titleKey: 'lujototalPage.p7Title', descKey: 'lujototalPage.p7Desc' },
];

export default function LujoTotalDetail() {
  const { t } = useI18n();

  return (
    <>
      {/* Principles */}
      <section className={styles.principles}>
        <RevealWrapper className={styles.inner}>
          <div className={styles.sectionHead}>
            <p className="s-eye">{t('lujototalPage.principlesEyebrow')}</p>
            <h2 className={`s-title ${styles.sectionTitle}`}>
              {t('lujototalPage.principlesTitle')} <em>{t('lujototalPage.principlesTitleEm')}</em>
            </h2>
          </div>
          <div className={styles.principlesGrid}>
            {PRINCIPLES.map((p) => (
              <div key={p.num} className={styles.principle}>
                <span className={styles.principleNum}>{p.num}</span>
                <h3 className={styles.principleTitle}>{t(p.titleKey)}</h3>
                <p className={styles.principleDesc}>{t(p.descKey)}</p>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <RevealWrapper className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            {t('lujototalPage.ctaTitle')}
            {t('lujototalPage.ctaTitleEm') && <> <em>{t('lujototalPage.ctaTitleEm')}</em></>}
          </h2>
          <p className={styles.ctaBody}>{t('lujototalPage.ctaBody')}</p>
          <a href={CONTACT_EMAIL} className="btn-gold">
            {t('lujototalPage.ctaContact')}
          </a>
        </RevealWrapper>
      </section>

      {/* Disclosure */}
      <div className={styles.disclosure}>
        <p className={styles.disclosureText}>{t('lujototalPage.disclosure')}</p>
        <p className={styles.disclosureText}>{t('lujototalPage.disclosure2')}</p>
      </div>
    </>
  );
}
