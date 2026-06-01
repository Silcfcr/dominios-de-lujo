'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './CategoryTeaser.module.css';

const ITEMS = [
  {
    key: 'Propiedades y Bienes Raíces de Lujo',
    nameEn: 'Luxury Properties & Real Estate',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop',
    phraseEn: 'Luxury is owning a space that defines you.',
    phraseEs: 'El lujo es poseer un espacio que te define.',
  },
  {
    key: 'Joyería, Relojería y Metales Preciosos',
    nameEn: 'Jewellery, Watches & Precious Metals',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80&auto=format&fit=crop',
    phraseEn: 'Luxury is wearing something that survives generations.',
    phraseEs: 'El lujo es llevar algo que sobrevive generaciones.',
  },
  {
    key: 'Viajes, Turismo, Destinos y Alojamientos',
    nameEn: 'Travel, Tourism & Destinations',
    image: 'https://images.unsplash.com/photo-1602002418082-dd75b15f3445?w=800&q=80&auto=format&fit=crop',
    phraseEn: 'Luxury is sleeping somewhere that changes your sense of time.',
    phraseEs: 'El lujo es dormir en un lugar que cambia tu sentido del tiempo.',
  },
  {
    key: 'Moda, Accesorios y Alta Costura',
    nameEn: 'Fashion, Accessories & Haute Couture',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop',
    phraseEn: "Luxury is dressing for who you're becoming.",
    phraseEs: 'El lujo es vestirte para quien estás llegando a ser.',
  },
];

const N        = ITEMS.length;
const INTERVAL = 5000;

export default function CategoryTeaser() {
  const { t, lang } = useI18n();
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const advance = useCallback((dir: 1 | -1) => {
    setActive(i => (i + dir + N) % N);
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => advance(1), INTERVAL);
  }, [advance]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const getPos = (i: number): 'active' | 'prev' | 'next' | 'hidden' => {
    if (i === active)                   return 'active';
    if (i === (active - 1 + N) % N)    return 'prev';
    if (i === (active + 1) % N)        return 'next';
    return 'hidden';
  };

  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className="s-hd">
        <p className="s-eye">{t('categoryTeaser.eyebrow')}</p>
        <h2 className="s-title">
          {t('categoryTeaser.title')} <em>{t('categoryTeaser.titleEm')}</em>
        </h2>
        <p className="s-sub">{t('categoryTeaser.sub')}</p>
      </RevealWrapper>

      <div
        className={styles.stage}
        onMouseEnter={() => clearInterval(timerRef.current)}
        onMouseLeave={startTimer}
      >
        <button
          className={`${styles.navBtn} ${styles.navLeft}`}
          onClick={() => { advance(-1); startTimer(); }}
          aria-label="Previous category"
        >
          ‹
        </button>

        <div className={styles.track}>
          {ITEMS.map((item, i) => {
            const pos    = getPos(i);
            const name   = lang === 'es' ? item.key : item.nameEn;
            const phrase = lang === 'es' ? item.phraseEs : item.phraseEn;
            return (
              <Link
                key={item.key}
                href={`/dominios?category=${encodeURIComponent(item.key)}`}
                className={`${styles.card} ${styles[pos]}`}
                tabIndex={pos === 'active' ? 0 : -1}
                aria-hidden={pos !== 'active'}
              >
                <Image
                  src={item.image}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, 52vw"
                  className={styles.img}
                  priority={i === 0}
                />
                <div className={styles.overlay} />
                <div className={styles.info}>
                  <h3 className={styles.name}>{name}</h3>
                  <p className={styles.phrase}>{phrase}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <button
          className={`${styles.navBtn} ${styles.navRight}`}
          onClick={() => { advance(1); startTimer(); }}
          aria-label="Next category"
        >
          ›
        </button>
      </div>

      <div className={styles.cta}>
        <Link href="/dominios" className="btn-dark">{t('categoryTeaser.cta')}</Link>
      </div>
    </section>
  );
}
