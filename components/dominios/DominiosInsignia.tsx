'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { assetPath } from '@/lib/assetPath';
import DomainSearch from '@/components/dominios/DomainSearch';
import styles from './DominiosInsignia.module.css';

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
      'baresdelujo.com','casinosdelujo.com','clubsdelujo.com',
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

export default function DominiosInsignia() {
  const { t } = useI18n();
  const [query, setQuery] = useState<string>('');

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES
      .map((cat) => ({
        ...cat,
        domains: q
          ? cat.domains.filter((d) => d.toLowerCase().includes(q))
          : cat.domains,
      }))
      .filter((cat) => cat.domains.length > 0);
  }, [query]);

  const totalVisible = filteredCategories.reduce((sum, c) => sum + c.domains.length, 0);

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.header}>
        <p className="s-eye">{t('dominiosInsignia.eyebrow')}</p>
        <h1 className={`s-title ${styles.h1}`}>
          {t('dominiosInsignia.title')} <em>{t('dominiosInsignia.titleEm')}</em>
        </h1>
        <p className={styles.sub}>{t('dominiosInsignia.sub')}</p>
      </div>

      {/* Search band */}
      <div className={styles.searchBand}>
        <div className={styles.searchInner}>
          <DomainSearch value={query} onChange={setQuery} />
          {query && (
            <p className={styles.searchCount}>
              {totalVisible} {t('dominiosInsignia.results')}
            </p>
          )}
        </div>
      </div>

      {/* Category grid */}
      <div className={styles.grid}>
        {filteredCategories.length === 0 ? (
          <p className={styles.empty}>{t('dominios.noResults')}</p>
        ) : (
          filteredCategories.map((cat, index) => (
            <article key={cat.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={assetPath(cat.image)}
                  alt={t(cat.imageAlt)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.img}
                  priority={index < 2}
                />
                <div className={styles.overlay} />
                <h2 className={styles.catTitle}>{t(cat.titleKey)}</h2>
              </div>
              <div className={styles.pillsWrap}>
                {cat.domains.map((domain) => (
                  <Link
                    key={domain}
                    href={`/dominios/${encodeURIComponent(domain)}`}
                    className={styles.pill}
                  >
                    {domain}
                  </Link>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
