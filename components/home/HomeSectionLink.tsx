'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import styles from './HomeSectionLink.module.css';

interface Props {
  labelKey: string;
  href: string;
}

export default function HomeSectionLink({ labelKey, href }: Props) {
  const { t } = useI18n();
  return (
    <div className={styles.wrap}>
      <Link href={href} className={styles.link}>
        {t(labelKey)}&nbsp;<span className={styles.arrow}>→</span>
      </Link>
    </div>
  );
}
