import Image from 'next/image';
import Link from 'next/link';
import { assetPath } from '@/lib/assetPath';
import styles from './FloatingCertBadge.module.css';

export default function FloatingCertBadge() {
  return (
    <Link href="/nosotros#lujototal" className={styles.badge}>
      <Image
        src={assetPath('/images/lujo-total.webp')}
        alt="LujoTotal™ certification"
        width={72}
        height={72}
        style={{ objectFit: 'contain' }}
      />
    </Link>
  );
}
