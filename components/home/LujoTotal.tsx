'use client';

import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { assetPath } from '@/lib/assetPath';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './LujoTotal.module.css';

export default function LujoTotal() {
  const { t } = useI18n();

  return (
    <section className={styles.section}>
      <RevealWrapper className={styles.inner}>
        <div className={styles.mark}>
          <Image
            src={assetPath('/images/lujo-total.webp')}
            alt="LujoTotal™ certification"
            width={260}
            height={209}
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div>
          <p className={styles.eyebrow}>{t('lujototal.eyebrow')}</p>
          <h2 className={styles.title}>
            {t('lujototal.title')} <em>{t('lujototal.titleEm')}</em>
          </h2>
          <p className={styles.body}>{t('lujototal.body1')}</p>
          <p className={styles.body}>{t('lujototal.body2')}</p>
        </div>
      </RevealWrapper>
    </section>
  );
}
