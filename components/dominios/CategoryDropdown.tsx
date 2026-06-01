'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './CategoryDropdown.module.css';

interface Props {
  categories: string[];
  value: string;
  onChange: (cat: string) => void;
  allLabel: string;
}

export default function CategoryDropdown({ categories, value, onChange, allLabel }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const label = value || allLabel;

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.open : ''} ${value ? styles.active : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.label}>{label}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          viewBox="0 0 12 7"
          aria-hidden="true"
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className={styles.panel} role="listbox">
          <button
            type="button"
            role="option"
            aria-selected={!value}
            className={`${styles.option} ${!value ? styles.optionActive : ''}`}
            onClick={() => { onChange(''); setOpen(false); }}
          >
            {allLabel}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="option"
              aria-selected={value === cat}
              className={`${styles.option} ${value === cat ? styles.optionActive : ''}`}
              onClick={() => { onChange(cat); setOpen(false); }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
