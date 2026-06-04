'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n/context';
import styles from './AboutSubNav.module.css';

const LINKS = [
  { href: '/nosotros', key: 'subnav.about' },
  { href: '/manifiesto', key: 'subnav.manifesto' },
  { href: '/lujototal', key: 'subnav.lujototal' },
] as const;

export default function AboutSubNav() {
  const { t } = useI18n();
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="About section navigation">
      <ul className={styles.list}>
        {LINKS.map(({ href, key }) => {
          const active = pathname === href || pathname === `/dominios-de-lujo${href}`;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.link} ${active ? styles.active : ''}`}
              >
                {t(key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
