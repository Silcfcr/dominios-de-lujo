'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import es from './es.json';
import en from './en.json';

type Lang = 'es' | 'en';
type Translations = typeof es;

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Translations> = { es, en };

const I18nContext = createContext<I18nContextValue>({
  lang: 'es',
  setLang: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  useEffect(() => {
    const stored = localStorage.getItem('ddl-lang') as Lang | null;
    if (stored === 'es' || stored === 'en') setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('ddl-lang', l);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any = translations[lang];
      for (const k of keys) {
        if (value == null) break;
        value = value[k];
      }
      if (typeof value === 'string') return value;
      // fallback to Spanish
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fallback: any = translations['es'];
      for (const k of keys) {
        if (fallback == null) break;
        fallback = fallback[k];
      }
      return typeof fallback === 'string' ? fallback : key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
