'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { assetPath } from '@/lib/assetPath';
import styles from './DominiosInsigniaAlt.module.css';

type InsigniaCategory = {
  id: string;
  titleKey: string;
  image: string;
  imageAlt: string;
  domains: string[];
};

const CATEGORIES: InsigniaCategory[] = [
  {
    id: 'viajes',
    titleKey: 'dominiosInsignia.cat_viajes',
    image: '/images/travel.webp',
    imageAlt: 'dominiosInsignia.alt_viajes',
    domains: [
      'antiagingdelujo.com','aviaciondelujo.com','hotelesdelujo.com',
      'jetsdelujo.com','restaurantesdelujo.com','resortsdelujo.com',
      'saluddelujo.com','spasdelujo.com','turismodelujo.com',
      'viajesdelujo.com','vuelosdelujo.com','wellnessdelujo.com',
      'yatesdelujo.com','yogadelujo.com',
    ],
  },
  {
    id: 'autos',
    titleKey: 'dominiosInsignia.cat_autos',
    image: '/images/partner.webp',
    imageAlt: 'dominiosInsignia.alt_autos',
    domains: [
      'autosdelujo.com','autosdeportivos.com','carrosdelujo.com',
      'cochesdelujo.es','motosdelujo.com','motosdeportivas.com',
    ],
  },
  {
    id: 'joyeria',
    titleKey: 'dominiosInsignia.cat_joyeria',
    image: '/images/fashion.webp',
    imageAlt: 'dominiosInsignia.alt_joyeria',
    domains: [
      'anillodelujo.com','bellezadelujo.com','bolsosdelujo.com',
      'cremasdelujo.com','diamantesdelujo.com','esteticadelujo.com',
      'gemasdelujo.com','joyasdelujo.com','orodelujo.com',
      'perfumesdelujo.com','relojesdelujo.com','ropadelujo.com',
      'serumsdelujo.com','tratamientosdelujo.com','zapatosdelujo.com',
    ],
  },
  {
    id: 'arte',
    titleKey: 'dominiosInsignia.cat_arte',
    image: '/images/lujo-total.webp',
    imageAlt: 'dominiosInsignia.alt_arte',
    domains: [
      'artedelujo.com','bebidasdelujo.com','gourmetdelujo.com',
      'licoresdelujo.com','purosdelujo.com','ronesdelujo.com',
      'subastasdelujo.com','vinodelujo.com',
    ],
  },
  {
    id: 'deportes',
    titleKey: 'dominiosInsignia.cat_deportes',
    image: '/images/watches.webp',
    imageAlt: 'dominiosInsignia.alt_deportes',
    domains: [
      'baresdelujo.com','casinosdelujo.com','clubesdelujo.com',
      'deportesdelujo.com','golfdelujo.com','polodelujo.com','skidelujo.com',
    ],
  },
  {
    id: 'propiedades',
    titleKey: 'dominiosInsignia.cat_propiedades',
    image: '/images/realEstate.webp',
    imageAlt: 'dominiosInsignia.alt_propiedades',
    domains: [
      'casasdelujo.es','criptodelujo.com','decoraciondelujo.com',
      'finanzasdelujo.com','fondosdeoro.com','hogaresdelujo.com',
      'humanoidesdelujo.com','humanoidesia.com','inversionesdelujo.com',
      'mueblesdelujo.com','propiedadesdelujo.com','robotsdelujo.com',
      'segurosdelujo.com','viviendasdelujo.com',
    ],
  },
];

export default function DominiosInsigniaAlt() {
  const { t } = useI18n();

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <p className="s-eye">{t('dominiosInsigniaAlt.eyebrow')}</p>
        <h1 className={`s-title inv ${styles.h1}`}>
          {t('dominiosInsigniaAlt.title')} <em>{t('dominiosInsigniaAlt.titleEm')}</em>
        </h1>
        <p className={styles.tagline}>{t('dominiosInsigniaAlt.tagline')}</p>
      </div>

      {/* Category rows */}
      <div className={styles.rows}>
        {CATEGORIES.map((cat, index) => (
          <div
            key={cat.id}
            className={`${styles.row} ${index % 2 === 1 ? styles.rowReverse : ''}`}
          >
            {/* Image half */}
            <div className={styles.imageWrap}>
              <Image
                src={assetPath(cat.image)}
                alt={t(cat.imageAlt)}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.img}
                priority={index < 2}
              />
            </div>

            {/* Content half */}
            <div className={styles.content}>
              <p className={styles.catEye}>{t(cat.titleKey)}</p>
              <div className={styles.scrollMask}>
                <ul
                  className={styles.domainTrack}
                  style={{ animationDuration: `${Math.max(18, cat.domains.length * 2.5)}s` }}
                >
                  {[...cat.domains, ...cat.domains].map((domain, i) => (
                    <li key={`${domain}-${i}`}>
                      <Link
                        href={`/dominios/${encodeURIComponent(domain)}`}
                        className={styles.domainLink}
                      >
                        {domain}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
