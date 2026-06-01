'use client';

import styles from './Ticker.module.css';

const ITEMS = [
  'Animales y Mascotas de Lujo',
  'Arte, Cultura y Coleccionismo de Lujo',
  'Autos, Movilidad y Transporte de Lujo',
  'Belleza, Salud, Bienestar y Perfumería',
  'Dominios Emocionales',
  'Entretenimiento, Eventos, Deportes y Experiencias',
  'Finanzas, Seguros y Protección de Lujo',
  'Gastronomía, Bebidas y Puros',
  'Hogar, Diseño e Interiorismo',
  'Jets y Aviación',
  'Joyería, Relojería y Metales Preciosos',
  'Moda, Accesorios y Alta Costura',
  'Momentos Especiales, Romance, Parejas y Regalos',
  'Náutica, Yates y Mundo Mar',
  'Propiedades y Bienes Raíces de Lujo',
  'Servicios, Profesionales y Expertos de Lujo',
  'Tecnología, IA, Innovación y Cripto',
  'Viajes, Turismo, Destinos y Alojamientos',
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
