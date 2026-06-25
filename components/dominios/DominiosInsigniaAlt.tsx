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

function scoreMatch(domain: string, q: string): number {
  const name = domain.slice(0, domain.lastIndexOf('.')).toLowerCase();
  if (name === q) return 3;
  if (name.startsWith(q)) return 2;
  return 1;
}

function splitDomain(full: string): { name: string; tld: string } {
  const idx = full.lastIndexOf('.');
  return { name: full.slice(0, idx), tld: full.slice(idx) };
}

const CATEGORIES: InsigniaCategory[] = [
  {
    id: 'viajes',
    titleKey: 'dominiosInsignia.cat_viajes',
    image: '/images/destinations.webp',
    imageAlt: 'dominiosInsignia.alt_viajes',
    domains: [
      'antiagingdelujo.com','aviaciondelujo.com','hotelesdelujo.com',
      'jetsdelujo.com','restaurantesdelujo.com','resortsdelujo.com',
      'retirosdelujo.com','saluddelujo.com','spasdelujo.com',
      'turismodelujo.com','viajesdelujo.com','vuelosdelujo.com',
      'wellnessdelujo.com','yatesdelujo.com','yogadelujo.com',
      'nuevayorkdelujo.com','parisdelujo.com','londresdelujo.com',
      'espanadelujo.com','italiadelujo.com',
      'lunademieldelujo.com','serviciosdelujo.com',
    ],
  },
  {
    id: 'eventos',
    titleKey: 'dominiosInsignia.cat_eventos',
    image: '/images/events.webp',
    imageAlt: 'dominiosInsignia.alt_eventos',
    domains: [
      'matrimoniosdelujo.com','regalosdelujo.com',
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
      'artedelujo.com','bebidasdelujo.com','gastronomiadelujo.com',
      'gourmetdelujo.com','licoresdelujo.com','purosdelujo.com',
      'ronesdelujo.com','subastasdelujo.com','vinodelujo.com',
      'whiskydelujo.com',
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
      'fincasdelujo.com','finanzasdelujo.com','fondosdeoro.com',
      'hogaresdelujo.com','humanoidesdelujo.com','humanoidesia.com',
      'inversionesdelujo.com','mansionesdelujo.com','mueblesdelujo.com',
      'patrimoniosdelujo.com','propiedadesdelujo.com',
      'robotsdelujo.com','segurosdelujo.com','viviendasdelujo.com',
    ],
  },
];

export default function DominiosInsigniaAlt() {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [allDomains, setAllDomains] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch(assetPath('/data/search-index.json'))
      .then((r) => r.json())
      .then(setAllDomains)
      .catch(() => {});
  }, []);

  const q = query.trim().toLowerCase();
  const searchResults = q
    ? [...new Set(allDomains)]
        .filter((d) => d.toLowerCase().includes(q))
        .sort((a, b) => scoreMatch(b, q) - scoreMatch(a, q))
    : [];

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <p className="s-eye">{t('dominiosInsigniaAlt.eyebrow')}</p>
        <h1 className={`s-title ${styles.h1}`}>
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
            onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
            onFocus={() => { if (query.trim()) setIsOpen(true); }}
            onBlur={() => setIsOpen(false)}
            aria-label={t('dominios.searchPlaceholder')}
          />
          {query && (
            <button
              className={styles.searchClear}
              onClick={() => { setQuery(''); setIsOpen(false); }}
              aria-label={t('dominios.clearSearch')}
            >
              ✕
            </button>
          )}
          {isOpen && searchResults.length > 0 && (
            <div className={styles.dropdown}>
              {searchResults.slice(0, 20).map((domain) => {
                const { name, tld } = splitDomain(domain);
                return (
                  <Link
                    key={domain}
                    href={`/dominios/${encodeURIComponent(domain)}`}
                    className={styles.dropdownItem}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <span className={styles.dropdownDomain}>{name}</span>
                    <span className={styles.dropdownTld}>{tld}</span>
                  </Link>
                );
              })}
              {searchResults.length > 20 && (
                <p className={styles.dropdownMore}>
                  + {searchResults.length - 20} {t('dominiosInsigniaAlt.results')}
                </p>
              )}
            </div>
          )}
        </div>
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
                style={cat.imagePosition ? { objectPosition: cat.imagePosition } : undefined}
                priority={index < 2}
              />
            </div>

            {/* Content half */}
            <div className={styles.content}>
              <p className={styles.catEye}>{t(cat.titleKey)}</p>
              <div className={styles.domainGrid}>
                {cat.domains.map((domain) => {
                  const { name, tld } = splitDomain(domain);
                  return (
                    <Link key={domain} href={`/dominios/${encodeURIComponent(domain)}`} className={styles.domainItem}>
                      <p className={styles.domainName}>
                        {name}<span className={styles.domainTld}>{tld}</span>
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
