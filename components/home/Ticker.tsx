'use client';

import styles from './Ticker.module.css';

const ITEMS = [
  'antiagingdelujo.com','aviaciondelujo.com','hotelesdelujo.com',
  'jetsdelujo.com','restaurantesdelujo.com','resortsdelujo.com',
  'saluddelujo.com','spasdelujo.com','turismodelujo.com',
  'viajesdelujo.com','vuelosdelujo.com','wellnessdelujo.com',
  'yatesdelujo.com','yogadelujo.com',
  'autosdelujo.com','autosdeportivos.com','carrosdelujo.com',
  'cochesdelujo.es','motosdelujo.com','motosdeportivas.com',
  'anillodelujo.com','bellezadelujo.com','bolsosdelujo.com',
  'cremasdelujo.com','diamantesdelujo.com','esteticadelujo.com',
  'gemasdelujo.com','joyasdelujo.com','orodelujo.com',
  'perfumesdelujo.com','relojesdelujo.com','ropadelujo.com',
  'serumsdelujo.com','tratamientosdelujo.com','zapatosdelujo.com',
  'artedelujo.com','bebidasdelujo.com','gourmetdelujo.com',
  'licoresdelujo.com','purosdelujo.com','ronesdelujo.com',
  'subastasdelujo.com','vinodelujo.com',
  'baresdelujo.com','casinosdelujo.com','clubesdelujo.com',
  'deportesdelujo.com','golfdelujo.com','polodelujo.com','skidelujo.com',
  'casasdelujo.es','criptodelujo.com','decoraciondelujo.com',
  'finanzasdelujo.com','fondosdeoro.com','hogaresdelujo.com',
  'humanoidesdelujo.com','humanoidesia.com','inversionesdelujo.com',
  'mueblesdelujo.com','propiedadesdelujo.com','robotsdelujo.com',
  'segurosdelujo.com','viviendasdelujo.com',
];

function Diamond() {
  return <span className={styles.diamond} aria-hidden="true" />;
}

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            <Diamond />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
