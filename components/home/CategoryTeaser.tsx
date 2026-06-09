'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { assetPath } from '@/lib/assetPath';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './CategoryTeaser.module.css';

const ITEMS = [
  {
    key: 'Viajes, Turismo, Destinos y Alojamientos',
    nameEs: 'Viajes, Wellness & Experiencias de Lujo',
    nameEn: 'Travel, Wellness & Luxury Experiences',
    image: '/images/spa.webp',
    phraseEn: 'Luxury is sleeping somewhere that changes your sense of time.',
    phraseEs: 'El lujo es dormir en un lugar que cambia tu sentido del tiempo.',
  },
  {
    key: 'Joyería, Relojería y Metales Preciosos',
    nameEs: 'Joyería, Moda & Belleza',
    nameEn: 'Jewellery, Fashion & Beauty',
    image: '/images/jewels.webp',
    phraseEn: 'Luxury is wearing something that survives generations.',
    phraseEs: 'El lujo es llevar algo que sobrevive generaciones.',
  },
  {
    key: 'Moda, Accesorios y Alta Costura',
    nameEs: 'Deportes & Entretenimiento',
    nameEn: 'Sports & Entertainment',
    image: '/images/golf.webp',
    phraseEn: 'Luxury is competing at a level most will never see.',
    phraseEs: 'El lujo es competir en un nivel que pocos verán.',
  },
  {
    key: 'Propiedades y Bienes Raíces de Lujo',
    nameEs: 'Propiedades, Finanzas & Innovación',
    nameEn: 'Properties, Finance & Innovation',
    image: '/images/yatch.webp',
    phraseEn: 'Luxury is owning a space that defines you.',
    phraseEs: 'El lujo es poseer un espacio que te define.',
  },
];

const N = ITEMS.length;
const INTERVAL = 5000;

export default function CategoryTeaser() {
  const { t, lang } = useI18n();
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

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
    if (i === active) return 'active';
    if (i === (active - 1 + N) % N) return 'prev';
    if (i === (active + 1) % N) return 'next';
    return 'hidden';
  };

  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className="s-hd">
        <p className="s-eye">{t('categoryTeaser.eyebrow')}</p>
        <h2 className="s-title">
          {t('categoryTeaser.title')} <em>{t('categoryTeaser.titleEm')}</em>
        </h2>
      </RevealWrapper>

      <div
        className={styles.stage}
        onMouseEnter={() => clearInterval(timerRef.current)}
        onMouseLeave={startTimer}
      >
        <button
          className={`${styles.navBtn} ${styles.navLeft}`}
          onClick={() => { advance(-1); startTimer(); }}
          aria-label={t('categoryTeaser.prevAriaLabel')}
        >
          ‹
        </button>

        <div className={styles.track}>
          {ITEMS.map((item, i) => {
            const pos = getPos(i);
            const name = lang === 'es' ? item.nameEs : item.nameEn;
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
                  src={assetPath(item.image)}
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
