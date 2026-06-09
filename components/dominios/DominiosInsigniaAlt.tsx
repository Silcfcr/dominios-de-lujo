'use client';

import { useState, useEffect } from 'react';
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
  imagePosition?: string;
  domains: string[];
};

const CATEGORIES: InsigniaCategory[] = [
  {
    id: 'viajes',
    titleKey: 'dominiosInsignia.cat_viajes',
    image: '/images/destinations.webp',
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
    image: '/images/cars.webp',
    imageAlt: 'dominiosInsignia.alt_autos',
    domains: [
      'autosdelujo.com','autosdeportivos.com','carrosdelujo.com',
      'cochesdelujo.es','motosdelujo.com','motosdeportivas.com',
    ],
  },
  {
    id: 'joyeria',
    titleKey: 'dominiosInsignia.cat_joyeria',
    image: '/images/perfumes.webp',
    imageAlt: 'dominiosInsignia.alt_joyeria',
    imagePosition: 'center 15%',
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
    image: '/images/wine.webp',
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
    image: '/images/sports&entertainment.webp',
    imageAlt: 'dominiosInsignia.alt_deportes',
    domains: [
      'baresdelujo.com','casinosdelujo.com','clubesdelujo.com',
      'deportesdelujo.com','golfdelujo.com','polodelujo.com','skidelujo.com',
    ],
  },
  {
    id: 'propiedades',
    titleKey: 'dominiosInsignia.cat_propiedades',
    image: '/images/propiedades2.webp',
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
  const [query, setQuery] = useState('');
  const [allDomains, setAllDomains] = useState<string[]>([]);

  useEffect(() => {
    fetch(assetPath('/data/search-index.json'))
      .then((r) => r.json())
      .then(setAllDomains)
      .catch(() => {});
  }, []);

  const q = query.trim().toLowerCase();
  const searchResults = q ? allDomains.filter((d) => d.toLowerCase().includes(q)) : [];
  const visibleCategories = q ? [] : CATEGORIES;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <p className="s-eye">{t('dominiosInsigniaAlt.eyebrow')}</p>
        <h1 className={`s-title inv ${styles.h1}`}>
          {t('dominiosInsigniaAlt.title')} <em>{t('dominiosInsigniaAlt.titleEm')}</em>
        </h1>
        <p className={styles.tagline}>{t('dominiosInsigniaAlt.tagline')}</p>
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.3" />
            <line x1="13" y1="13" x2="18" y2="18" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          <input
            type="search"
            className={styles.searchInput}
            placeholder={t('dominios.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t('dominios.searchPlaceholder')}
          />
          {query && (
            <button className={styles.searchClear} onClick={() => setQuery('')} aria-label={t('dominios.clearSearch')}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Search results (full list) */}
      {q && (
        <div className={styles.results}>
          {searchResults.length === 0 ? (
            <p className={styles.noResults}>{t('dominios.noResults')}</p>
          ) : (
            <>
              <p className={styles.resultsCount}>{searchResults.length} {t('dominiosInsignia.results')}</p>
              <div className={styles.resultsPills}>
                {searchResults.map((domain) => (
                  <Link key={domain} href={`/dominios/${encodeURIComponent(domain)}`} className={styles.pill}>
                    {domain}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Category rows */}
      {!q && <div className={styles.rows}>
        {visibleCategories.map((cat, index) => (
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
                style={cat.imagePosition ? { objectPosition: cat.imagePosition } : undefined}
                priority={index < 2}
              />
            </div>

            {/* Content half */}
            <div className={styles.content}>
              <p className={styles.catEye}>{t(cat.titleKey)}</p>
              {(() => {
                const third = Math.ceil(cat.domains.length / 3);
                const row2 = [...cat.domains.slice(third), ...cat.domains.slice(0, third)];
                const row3 = [...cat.domains.slice(third * 2), ...cat.domains.slice(0, third * 2)];
                const dur = Math.max(25, cat.domains.length * 3.5);
                return (
                  <div className={styles.scrollMask}>
                    <div className={styles.pillTrack} style={{ animationDuration: `${dur}s` }}>
                      {[...cat.domains, ...cat.domains].map((domain, i) => (
                        <Link key={`r1-${domain}-${i}`} href={`/dominios/${encodeURIComponent(domain)}`} className={styles.pill}>
                          {domain}
                        </Link>
                      ))}
                    </div>
                    <div className={`${styles.pillTrack} ${styles.pillTrackReverse}`} style={{ animationDuration: `${dur + 5}s` }}>
                      {[...row2, ...row2].map((domain, i) => (
                        <Link key={`r2-${domain}-${i}`} href={`/dominios/${encodeURIComponent(domain)}`} className={styles.pill}>
                          {domain}
                        </Link>
                      ))}
                    </div>
                    <div className={styles.pillTrack} style={{ animationDuration: `${dur - 5}s` }}>
                      {[...row3, ...row3].map((domain, i) => (
                        <Link key={`r3-${domain}-${i}`} href={`/dominios/${encodeURIComponent(domain)}`} className={styles.pill}>
                          {domain}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
}
