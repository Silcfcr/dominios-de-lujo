import Manifesto from '@/components/home/Manifesto';
import AboutSubNav from '@/components/about/AboutSubNav';

export const metadata = {
  title: 'Nuestro Manifiesto | Dominios de Lujo',
  description: 'El Manifiesto del Lujo de Dominios de Lujo — donde el lujo tiene voz propia.',
};

export default function ManifestoPage() {
  return (
    <>
      <AboutSubNav />
      <Manifesto />
    </>
  );
}
