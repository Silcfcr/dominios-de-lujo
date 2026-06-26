'use client';
import { useI18n } from '@/lib/i18n/context';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './BrandsFaq.module.css';

const FAQ_ITEMS = [
  { q: 'brandsFaq.q1', a: 'brandsFaq.a1' },
  { q: 'brandsFaq.q2', a: 'brandsFaq.a2' },
  { q: 'brandsFaq.q3', a: 'brandsFaq.a3' },
  { q: 'brandsFaq.q4', a: 'brandsFaq.a4' },
];

export default function BrandsFaq() {
  const { t } = useI18n();
  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className="s-hd">
        <h2 className="s-title">{t('brandsFaq.heading')}</h2>
      </RevealWrapper>
      <RevealWrapper className={styles.list}>
        {FAQ_ITEMS.map((item, i) => (
          <div key={item.q} className={styles.item}>
            <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className={styles.question}>{t(item.q)}</h3>
              <p className={styles.answer}>{t(item.a)}</p>
            </div>
          </div>
        ))}
      </RevealWrapper>
    </section>
  );
}
