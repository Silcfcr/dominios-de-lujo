'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { assetPath } from '@/lib/assetPath';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './PartnerValue.module.css';

const ITEMS = [
  { titleKey: 'partnerValue.item1Title', descKey: 'partnerValue.item1Desc', subKey: 'partnerValue.item1Sub' },
  { titleKey: 'partnerValue.item2Title', descKey: 'partnerValue.item2Desc', subKey: 'partnerValue.item2Sub' },
  { titleKey: 'partnerValue.item3Title', descKey: 'partnerValue.item3Desc', subKey: 'partnerValue.item3Sub' },
  { titleKey: 'partnerValue.item4Title', descKey: 'partnerValue.item4Desc', subKey: 'partnerValue.item4Sub' },
  { titleKey: 'partnerValue.item5Title', descKey: 'partnerValue.item5Desc', subKey: 'partnerValue.item5Sub' },
];

const CONTACT = 'mailto:info@dominiosdelujo.com?subject=Partner%20Application%20%E2%80%94%20Dominios%20de%20Lujo';

export default function PartnerValue() {
  const { t } = useI18n();
  const [open, setOpen] = useState(0);

  return (
    <section className={`sec ${styles.section}`}>
      <RevealWrapper className={`s-hd ${styles.header}`}>
        <p className="s-eye">{t('partnerValue.eyebrow')}</p>
        <h2 className="s-title">{t('partnerValue.title')}</h2>
        <p className={`s-sub ${styles.subtitle}`}>{t('partnerValue.subtitle')}</p>
      </RevealWrapper>

      <div className={styles.grid}>

        {/* ── Left: static image (6 cols) ── */}
        <div className={styles.imgPanel}>
          <Image
            src={assetPath('/images/partner.webp')}
            alt="Partner with Dominios de Lujo"
            fill
            sizes="50vw"
            className={styles.img}
            priority
          />
        </div>

        {/* ── Right: accordion (6 cols) ── */}
        <div className={styles.accordion}>
          <div className={styles.list}>
            {ITEMS.map((item, i) => {
              const isOpen = open === i;
              const title = t(item.titleKey);
              const desc  = t(item.descKey);
              const sub   = t(item.subKey);

              return (
                <div
                  key={i}
                  className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
                >
                  <button
                    className={styles.trigger}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.num}>0{i + 1}</span>
                    <span className={styles.meta}>
                      <span className={styles.name}>{title}</span>
                      <span className={styles.subtext}>{sub}</span>
                    </span>
                  </button>

                  <div className={`${styles.body} ${isOpen ? styles.bodyOpen : ''}`}>
                    <div>
                      <p className={styles.desc}>{desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.ctaWrap}>
            <a href={CONTACT} className="btn-dark">{t('partnerValue.cta')}</a>
          </div>
        </div>

      </div>
    </section>
  );
}
