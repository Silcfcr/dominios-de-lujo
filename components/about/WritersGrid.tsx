'use client';

import Image from 'next/image';
import { assetPath } from '@/lib/assetPath';
import RevealWrapper from '@/components/ui/RevealWrapper';
import styles from './WritersGrid.module.css';

type Writer = {
  name: string;
  vertical: string;
  quote: string;
  photo?: string;
};

const writers: Writer[] = [
  { name: 'Escritora Uno',    vertical: 'Moda & Estilo',      quote: 'El lujo es elegir con intención.' },
  { name: 'Escritora Dos',    vertical: 'Gastronomía',         quote: 'El lujo es saborear sin prisa.' },
  { name: 'Escritora Tres',   vertical: 'Viajes de Lujo',      quote: 'El lujo es llegar a lugares que te cambian.' },
  { name: 'Escritora Cuatro', vertical: 'Joyería & Relojes',   quote: 'El lujo es el tiempo que no se ve.' },
  { name: 'Escritora Cinco',  vertical: 'Arte & Cultura',      quote: 'El lujo es lo que permanece.' },
  { name: 'Escritora Seis',   vertical: 'Propiedades',         quote: 'El lujo es el espacio que te define.' },
];

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

export default function WritersGrid() {
  return (
    <section className={`sec ${styles.section}`}>
      <div className={styles.header}>
        <p className="s-eye">Voces del lujo</p>
        <h2 className={`s-title ${styles.heading}`}>Nuestros Escritores de Lujo</h2>
      </div>
      <div className={styles.grid}>
        {writers.map((writer, i) => (
          <RevealWrapper key={writer.name} delay={(i % 3) as 0 | 1 | 2} className={styles.card}>
            {writer.photo ? (
              <div className={styles.photoWrap}>
                <Image
                  src={assetPath(writer.photo)}
                  alt={writer.name}
                  fill
                  className={styles.photo}
                  sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className={styles.photoPlaceholder} aria-hidden="true">
                <span className={styles.initials}>{initials(writer.name)}</span>
              </div>
            )}
            <div className={styles.info}>
              <p className={styles.vertical}>{writer.vertical}</p>
              <h3 className={styles.name}>{writer.name}</h3>
              <p className={styles.quote}>{writer.quote}</p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
