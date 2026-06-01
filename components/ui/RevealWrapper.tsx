'use client';

import { useEffect, useRef, ReactNode, ElementType } from 'react';

interface Props {
  children: ReactNode;
  delay?: 0 | 1 | 2;
  className?: string;
  as?: ElementType;
}

const delayClass: Record<0 | 1 | 2, string> = {
  0: 'reveal',
  1: 'reveal2',
  2: 'reveal3',
};

export default function RevealWrapper({ children, delay = 0, className = '', as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('vis');
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cls = [delayClass[delay], className].filter(Boolean).join(' ');

  return (
    <Tag ref={ref} className={cls}>
      {children}
    </Tag>
  );
}
