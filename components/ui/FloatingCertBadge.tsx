import Image from 'next/image';
import Link from 'next/link';
import { assetPath } from '@/lib/assetPath';
import styles from './FloatingCertBadge.module.css';

export default function FloatingCertBadge() {
  return (
    <Link href="/lujototal" className={styles.badge}>
      <Image
        src={assetPath('/images/lujo-total.webp')}
        alt="LujoTotal™ certification"
        width={84}
        height={84}
        style={{ height: '72px', width: 'auto' }}
      />
    </Link>
  );
}
