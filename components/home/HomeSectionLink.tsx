'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { assetPath } from '@/lib/assetPath';
import styles from './HomeSectionLink.module.css';

interface Props {
  labelKey: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function HomeSectionLink({ labelKey, href, imageSrc, imageAlt }: Props) {
  const { t } = useI18n();
  return (
    <div className={styles.wrap}>
      {imageSrc && (
        <Image
          src={assetPath(imageSrc)}
          alt={imageAlt ?? ''}
          width={200}
          height={161}
          style={{ objectFit: 'contain' }}
        />
      )}
      <Link href={href} className={styles.link}>
        {t(labelKey)}&nbsp;<span className={styles.arrow}>→</span>
      </Link>
    </div>
  );
}
